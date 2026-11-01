import { successResponse, errorResponse } from '@maxery/shared';

export default async function healthRoutes(fastify) {
  fastify.get('/health', async (_request, reply) => {
    try {
      await fastify.prisma.$queryRaw`SELECT 1`;

      return reply.send(
        successResponse({
          status: 'HEALTHY',
          uptimeSeconds: Math.floor(process.uptime()),
          services: {
            database: 'CONNECTED',
            redis: fastify.redis ? 'CONNECTED' : 'STANDALONE_IN_MEMORY',
          },
          version: '0.1.0',
        })
      );
    } catch (err) {
      fastify.log.error({ err }, 'Health check failed');
      return reply
        .code(503)
        .send(errorResponse('Database connectivity check failed', 'DATABASE_UNAVAILABLE'));
    }
  });
}
