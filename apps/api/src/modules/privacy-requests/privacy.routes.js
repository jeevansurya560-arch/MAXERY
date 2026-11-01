import { CreatePrivacyRequestSchema, successResponse, errorResponse } from '@maxery/shared';

export default async function privacyRoutes(fastify) {
  const authGuard = [fastify.authenticate];

  // POST /api/v1/privacy/requests — Submit DPDPA statutory request
  fastify.post('/privacy/requests', { preHandler: authGuard }, async (request, reply) => {
    const parseResult = CreatePrivacyRequestSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply
        .code(400)
        .send(errorResponse('Validation error', 'VALIDATION_ERROR', parseResult.error.format()));
    }

    const { requestType, detail } = parseResult.data;
    const patient = await fastify.prisma.patient.findUnique({
      where: { userId: request.user.id },
    });

    const privacyReq = await fastify.prisma.privacyRequest.create({
      data: {
        userId: request.user.id,
        patientId: patient ? patient.id : null,
        requestType,
        reason: detail,
        status: 'PENDING',
      },
    });

    await fastify.recordAudit({
      userId: request.user.id,
      action: 'PRIVACY_REQUEST_SUBMITTED',
      entityType: 'PrivacyRequest',
      entityId: privacyReq.id,
      ipAddress: request.ip,
      userAgent: request.headers['user-agent'],
      metadata: { requestType },
    });

    return reply.code(201).send(successResponse({ request: privacyReq }));
  });

  // GET /api/v1/privacy/requests — List own privacy requests
  fastify.get('/privacy/requests', { preHandler: authGuard }, async (request, reply) => {
    const requests = await fastify.prisma.privacyRequest.findMany({
      where: { userId: request.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return reply.send(successResponse({ requests }));
  });
}
