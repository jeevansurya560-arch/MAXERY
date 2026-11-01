import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';

import { config } from './config/index.js';
import { errorResponse, API_PREFIX } from '@maxery/shared';

import prismaPlugin from './plugins/prisma.js';
import jwtPlugin from './plugins/jwt.js';
import auditPlugin from './plugins/audit.js';

import healthRoutes from './modules/health/health.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import identificationRoutes from './modules/identification/identification.routes.js';
import casesRoutes from './modules/unidentified-cases/cases.routes.js';
import contactsRoutes from './modules/emergency-contacts/contacts.routes.js';
import patientsRoutes from './modules/patients/patients.routes.js';
import privacyRoutes from './modules/privacy-requests/privacy.routes.js';
import auditRoutes from './modules/audit/audit.routes.js';
import { authHandler } from './infrastructure/auth/better-auth.js';

export async function buildApp(opts = {}) {
  const app = Fastify({
    logger:
      opts.logger !== undefined
        ? opts.logger
        : {
            level: config.NODE_ENV === 'test' ? 'silent' : 'info',
            redact: [
              'req.headers.authorization',
              'req.headers.cookie',
              '*.password',
              '*.passwordHash',
              '*.primaryPhone',
            ],
          },
    ...opts,
  });

  // 1. Security & Header Plugins
  await app.register(fastifyCors, {
    origin: config.CORS_ORIGIN,
    credentials: true,
  });

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: config.NODE_ENV === 'production',
  });

  await app.register(fastifyRateLimit, {
    max: 300,
    timeWindow: '1 minute',
  });

  // 2. Core Foundation Plugins
  await app.register(prismaPlugin);
  await app.register(jwtPlugin);
  await app.register(auditPlugin);

  // 3. Centralized Error Handler
  app.setErrorHandler((error, request, reply) => {
    app.log.error(error);

    if (error.validation) {
      return reply.code(400).send(
        errorResponse(
          error.message || 'Validation error',
          'VALIDATION_ERROR',
          error.validation
        )
      );
    }

    if (error.statusCode === 429) {
      return reply.code(429).send(
        errorResponse('Too many requests, please slow down', 'RATE_LIMIT_EXCEEDED')
      );
    }

    const statusCode = error.statusCode || 500;
    const message =
      statusCode === 500 && config.NODE_ENV === 'production'
        ? 'Internal server error'
        : error.message || 'An unexpected error occurred';

    return reply.code(statusCode).send(
      errorResponse(message, error.code || 'INTERNAL_ERROR')
    );
  });

  // 4. Mount Better Auth Lifecycle Endpoints (/api/auth/*)
  app.all('/api/auth/*', (request, reply) => {
    reply.hijack();
    authHandler(request.raw, reply.raw);
  });

  // 5. Register Domain Route Modules under /api/v1
  await app.register(
    async (apiV1) => {
      await apiV1.register(healthRoutes);
      await apiV1.register(authRoutes);
      await apiV1.register(identificationRoutes);
      await apiV1.register(casesRoutes);
      await apiV1.register(contactsRoutes);
      await apiV1.register(patientsRoutes);
      await apiV1.register(privacyRoutes);
      await apiV1.register(auditRoutes);
    },
    { prefix: API_PREFIX }
  );

  return app;
}
