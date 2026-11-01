import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
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
