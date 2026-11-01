import fp from 'fastify-plugin';

async function auditPlugin(fastify) {
  fastify.decorate(
    'recordAudit',
    async function ({
      userId = null,
      organisationId = null,
      action,
      entityType,
      entityId = null,
      ipAddress = null,
      userAgent = null,
      metadata = null,
    }) {
      try {
        await fastify.prisma.auditEvent.create({
          data: {
            userId,
            organisationId,
            action,
            entityType,
            entityId: entityId ? String(entityId) : null,
            ipAddress,
            userAgent,
            metadata: metadata || undefined,
          },
        });
      } catch (err) {
        fastify.log.error({ err }, 'Failed to record audit event');
      }
    }
  );
}

export default fp(auditPlugin);
