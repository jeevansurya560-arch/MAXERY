import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../infrastructure/auth/better-auth.js';
import { config } from '../config/index.js';
import { errorResponse } from '@maxery/shared';

async function jwtPlugin(fastify) {
  await fastify.register(fastifyJwt, {
    secret: config.JWT_SECRET,
    sign: {
      expiresIn: '24h',
    },
  });

  fastify.decorate('authenticate', async function (request, reply) {
    // 1. Check for Better Auth session cookie
    try {
      if (request.headers.cookie) {
        const session = await auth.api.getSession({
          headers: fromNodeHeaders(request.headers),
        });

        if (session && session.user) {
          request.user = {
            id: session.user.id,
            email: session.user.email,
            role: session.user.role || 'RESPONDER',
            fullName:
              session.user.name ||
              `${session.user.firstName || ''} ${session.user.lastName || ''}`.trim() ||
              session.user.email,
            name: session.user.name || '',
          };
          return;
        }
      }
    } catch (_cookieErr) {
      // Fall through to Bearer JWT check
    }

    // 2. Check for Bearer JWT in Authorization header
    try {
      await request.jwtVerify();
    } catch (_err) {
      return reply
        .code(401)
        .send(errorResponse('Authentication required or invalid session token', 'UNAUTHORIZED'));
    }
  });
}

export default fp(jwtPlugin);
