import { successResponse } from '@maxery/shared';
import { requireRole } from '../../middleware/authorize.js';

export default async function auditRoutes(fastify) {
  fastify.get(
    '/audit',
    {
      preHandler: [fastify.authenticate, requireRole('ADMIN', 'AUDITOR')],
    },
    async (request, reply) => {
      const { action, entityType, limit = 50, offset = 0 } = request.query || {};

      const where = {};
      if (action) where.action = action;
      if (entityType) where.entityType = entityType;

      const [events, total] = await Promise.all([
        fastify.prisma.auditEvent.findMany({
          where,
          take: Math.min(Number(limit), 100),
          skip: Number(offset),
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: { id: true, fullName: true, email: true, role: true },
            },
          },
        }),
        fastify.prisma.auditEvent.count({ where }),
      ]);

      return reply.send(
        successResponse({
          events,
          pagination: {
            total,
            limit: Number(limit),
            offset: Number(offset),
          },
        })
      );
    }
  );
}
