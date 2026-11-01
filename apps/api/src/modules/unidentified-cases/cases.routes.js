import {
  AddCaseEventSchema,
  successResponse,
  errorResponse,
  CaseStatus,
  AuditAction,
} from '@maxery/shared';
import { requireRole } from '../../middleware/authorize.js';

export default async function casesRoutes(fastify) {
  // Pre-handler for all case routes: requires authenticated responder, dispatcher, or admin
  const caseAuth = [
    fastify.authenticate,
    requireRole('RESPONDER', 'DISPATCHER', 'ADMIN', 'AUDITOR'),
  ];

  // POST /api/v1/cases — Create new unidentified patient case
  fastify.post('/cases', { preHandler: caseAuth }, async (request, reply) => {
    // Support both CreateCaseSchema and flexible case fields
    const body = request.body || {};
    const idempotencyKey = body.idempotencyKey || null;

    if (idempotencyKey) {
      const existing = await fastify.prisma.unidentifiedCase.findUnique({
        where: { idempotencyKey },
      });
      if (existing) {
        return reply.send(successResponse({ case: existing }, { idempotent: true }));
      }
    }

    const locationFound = body.locationFound || body.location || 'Unknown Emergency Scene';
    const urgency = body.urgency || body.urgencyLevel || 'URGENT';
    const responderId = request.user.id;
    const orgId = request.user.organisationId || null;

    // Generate human-readable case number: CASE-YYYY-XXXX
    const currentYear = new Date().getFullYear();
    const count = await fastify.prisma.unidentifiedCase.count();
    const caseNumber = `CASE-${currentYear}-${String(count + 1).padStart(4, '0')}`;

    const newCase = await fastify.prisma.$transaction(async (tx) => {
      const created = await tx.unidentifiedCase.create({
        data: {
          caseNumber,
          title: body.title || `Unidentified Incident at ${locationFound}`,
          description: body.description || body.notes || 'Emergency response in progress',
          status: CaseStatus.OPEN_UNIDENTIFIED,
          urgency,
          urgencyLevel: urgency,
          location: locationFound,
          locationFound,
          hospitalName: body.hospitalName || null,
          estimatedAge: body.estimatedAge || null,
          estimatedGender: body.estimatedGender || null,
          physicalDescription: body.physicalDescription || null,
          clothingDescription: body.clothingDescription || null,
          distinguishingFeatures: body.distinguishingFeatures || null,
          notes: body.notes || null,
          gpsLatitude: body.gpsLatitude || null,
          gpsLongitude: body.gpsLongitude || null,
          idempotencyKey,
          createdByUserId: responderId,
          originOrganisationId: orgId,
          currentOrganisationId: orgId,
        },
      });

      // Append initial CaseEvent
      await tx.caseEvent.create({
        data: {
          caseId: created.id,
          userId: responderId,
          eventType: 'CASE_OPENED',
          description: `Unidentified patient case opened by ${request.user.fullName} at ${locationFound}`,
          metadata: {
            urgency,
            initialHospital: body.hospitalName || 'Not specified',
          },
        },
      });

      // Record Audit Event
      await tx.auditEvent.create({
        data: {
          userId: responderId,
          organisationId: orgId,
          action: AuditAction.CASE_CREATED,
          entityType: 'UnidentifiedCase',
          entityId: created.id,
          ipAddress: request.ip,
          userAgent: request.headers['user-agent'],
        },
      });

      // Insert Transactional Outbox Event
      await tx.outboxEvent.create({
        data: {
          eventType: 'case.created',
          aggregateType: 'UnidentifiedCase',
          aggregateId: created.id,
          payload: {
            caseId: created.id,
            caseNumber: created.caseNumber,
            urgency,
            location: locationFound,
            hospitalName: created.hospitalName,
            createdAt: created.createdAt.toISOString(),
          },
          status: 'PENDING',
        },
      });

      return created;
    });

    return reply.code(201).send(successResponse({ case: newCase }));
  });

  // GET /api/v1/cases — List cases with filtering and pagination
  fastify.get('/cases', { preHandler: caseAuth }, async (request, reply) => {
    const { status, urgency, limit = 50, offset = 0 } = request.query || {};

    const where = {};
    if (status) where.status = status;
    if (urgency) where.urgency = urgency;

    const [cases, total] = await Promise.all([
      fastify.prisma.unidentifiedCase.findMany({
        where,
        take: Math.min(Number(limit), 100),
        skip: Number(offset),
        orderBy: { createdAt: 'desc' },
        include: {
          createdBy: {
            select: { id: true, fullName: true, badgeNumber: true },
          },
        },
      }),
      fastify.prisma.unidentifiedCase.count({ where }),
    ]);

    return reply.send(
      successResponse({
        cases,
        pagination: {
          total,
          limit: Number(limit),
          offset: Number(offset),
        },
      })
    );
  });

  // GET /api/v1/cases/:id — Detailed case view with events and contact attempts
  fastify.get('/cases/:id', { preHandler: caseAuth }, async (request, reply) => {
    const { id } = request.params;

    const caseItem = await fastify.prisma.unidentifiedCase.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: { id: true, fullName: true, role: true, badgeNumber: true },
        },
        originOrganisation: true,
        currentOrganisation: true,
        resolvedPatient: {
          select: { id: true, publicCode: true, bloodGroup: true },
        },
        events: {
          orderBy: { createdAt: 'asc' },
          include: {
            user: { select: { id: true, fullName: true } },
          },
        },
        contactAttempts: {
          orderBy: { attemptTimestamp: 'desc' },
          include: {
            emergencyContact: true,
            responder: { select: { id: true, fullName: true } },
          },
        },
      },
    });

    if (!caseItem) {
      return reply.code(404).send(errorResponse('Case not found', 'NOT_FOUND'));
    }

    return reply.send(successResponse({ case: caseItem }));
  });

  // PATCH /api/v1/cases/:id/status — Transition case status
  fastify.patch('/cases/:id/status', { preHandler: caseAuth }, async (request, reply) => {
    const { id } = request.params;
    const { status, patientId, notes } = request.body || {};

    if (!status) {
      return reply.code(400).send(errorResponse('Status is required', 'VALIDATION_ERROR'));
    }

    const existing = await fastify.prisma.unidentifiedCase.findUnique({
      where: { id },
    });

    if (!existing) {
      return reply.code(404).send(errorResponse('Case not found', 'NOT_FOUND'));
    }

    const updated = await fastify.prisma.$transaction(async (tx) => {
      const data = {
        status,
        version: { increment: 1 },
      };

      if (status === CaseStatus.RESOLVED_IDENTIFIED) {
        data.resolvedAt = new Date();
        if (patientId) data.resolvedPatientId = patientId;
      }

      const caseRecord = await tx.unidentifiedCase.update({
        where: { id },
        data,
      });

      await tx.caseEvent.create({
        data: {
          caseId: id,
          userId: request.user.id,
          eventType: 'STATUS_CHANGED',
          description: `Case status changed from ${existing.status} to ${status}. ${notes || ''}`.trim(),
        },
      });

      await tx.auditEvent.create({
        data: {
          userId: request.user.id,
          action: AuditAction.CASE_UPDATED,
          entityType: 'UnidentifiedCase',
          entityId: id,
          ipAddress: request.ip,
          userAgent: request.headers['user-agent'],
          metadata: { oldStatus: existing.status, newStatus: status, notes },
        },
      });

      await tx.outboxEvent.create({
        data: {
          eventType: 'case.status_updated',
          aggregateType: 'UnidentifiedCase',
          aggregateId: id,
          payload: {
            caseId: id,
            caseNumber: existing.caseNumber,
            status,
            resolvedAt: caseRecord.resolvedAt?.toISOString() || null,
          },
          status: 'PENDING',
        },
      });

      return caseRecord;
    });

    return reply.send(successResponse({ case: updated }));
  });

  // POST /api/v1/cases/:id/events — Add event to case timeline
  fastify.post('/cases/:id/events', { preHandler: caseAuth }, async (request, reply) => {
    const { id } = request.params;
    const parseResult = AddCaseEventSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply
        .code(400)
        .send(errorResponse('Invalid event payload', 'VALIDATION_ERROR', parseResult.error.format()));
    }

    const { eventType, description } = parseResult.data;

    const event = await fastify.prisma.caseEvent.create({
      data: {
        caseId: id,
        userId: request.user.id,
        eventType,
        description,
      },
    });

    return reply.code(201).send(successResponse({ event }));
  });
}
