import {
  successResponse,
  errorResponse,
  AuditAction,
  ContactOutcome,
} from '@maxery/shared';
import { requireRole } from '../../middleware/authorize.js';

export default async function contactsRoutes(fastify) {
  // POST /api/v1/cases/:id/contact-attempts
  fastify.post(
    '/cases/:id/contact-attempts',
    {
      preHandler: [
        fastify.authenticate,
        requireRole('RESPONDER', 'DISPATCHER', 'ADMIN', 'AUDITOR'),
      ],
    },
    async (request, reply) => {
      const { id: caseId } = request.params;
      const { emergencyContactId, contactId, method = 'PHONE_CALL', outcome, notes } = request.body || {};

      const targetContactId = emergencyContactId || contactId;
      if (!targetContactId) {
        return reply.code(400).send(errorResponse('Contact ID is required', 'VALIDATION_ERROR'));
      }

      if (!outcome || !Object.values(ContactOutcome).includes(outcome)) {
        return reply.code(400).send(
          errorResponse(
            `Invalid outcome. Allowed: ${Object.values(ContactOutcome).join(', ')}`,
            'VALIDATION_ERROR'
          )
        );
      }

      const contact = await fastify.prisma.emergencyContact.findUnique({
        where: { id: targetContactId },
      });

      if (!contact) {
        return reply.code(404).send(errorResponse('Emergency contact not found', 'NOT_FOUND'));
      }

      const attempt = await fastify.prisma.$transaction(async (tx) => {
        const createdAttempt = await tx.contactAttempt.create({
          data: {
            caseId,
            emergencyContactId: targetContactId,
            responderUserId: request.user.id,
            method,
            outcome,
            notes: notes || null,
          },
        });

        // Append to case events
        await tx.caseEvent.create({
          data: {
            caseId,
            userId: request.user.id,
            eventType: 'CONTACT_ATTEMPTED',
            description: `Contact outreach to ${contact.fullName} (${contact.relationship}) via ${method}: ${outcome}. ${notes || ''}`.trim(),
          },
        });

        // Audit log
        await tx.auditEvent.create({
          data: {
            userId: request.user.id,
            action: AuditAction.CONTACT_ATTEMPT_RECORDED,
            entityType: 'EmergencyContact',
            entityId: targetContactId,
            ipAddress: request.ip,
            userAgent: request.headers['user-agent'],
            metadata: { outcome, caseId },
          },
        });

        // Outbox event
        await tx.outboxEvent.create({
          data: {
            eventType: 'contact.attempt_updated',
            aggregateType: 'UnidentifiedCase',
            aggregateId: caseId,
            payload: {
              caseId,
              contactId: targetContactId,
              contactName: contact.fullName,
              outcome,
              timestamp: createdAttempt.attemptTimestamp.toISOString(),
            },
            status: 'PENDING',
          },
        });

        return createdAttempt;
      });

      return reply.code(201).send(successResponse({ attempt }));
    }
  );
}
