import {
  TokenLookupSchema,
  successResponse,
  errorResponse,
  DISCLAIMERS,
  AuditAction,
} from '@maxery/shared';
import { requireRole } from '../../middleware/authorize.js';

export default async function identificationRoutes(fastify) {
  // Rate limited emergency QR lookup endpoint
  fastify.post(
    '/identification/lookup-token',
    {
      preHandler: [
        fastify.authenticate,
        requireRole('RESPONDER', 'DISPATCHER', 'ADMIN', 'AUDITOR'),
      ],
      config: {
        rateLimit: {
          max: 30,
          timeWindow: '1 minute',
        },
      },
    },
    async (request, reply) => {
      const parseResult = TokenLookupSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply
          .code(400)
          .send(errorResponse('Invalid token lookup request', 'VALIDATION_ERROR', parseResult.error.format()));
      }

      const { token, accessReason, gpsLatitude, gpsLongitude } = parseResult.data;
      const responderId = request.user.id;
      const orgId = request.user.organisationId || null;

      // 1. Find identifier
      const identifier = await fastify.prisma.patientIdentifier.findFirst({
        where: { publicToken: token },
        include: {
          patient: {
            include: {
              medicalInformation: {
                where: { isCurrentlyActive: true },
              },
              emergencyContacts: {
                orderBy: { priority: 'asc' },
              },
            },
          },
        },
      });

      if (!identifier) {
        // Record failed attempt
        await fastify.prisma.identificationAttempt.create({
          data: {
            responderUserId: responderId,
            organisationId: orgId,
            identifierToken: token,
            status: 'FAILED_INVALID_TOKEN',
            failureReason: 'Token not found',
            accessReason,
            latitude: gpsLatitude,
            longitude: gpsLongitude,
          },
        });

        await fastify.recordAudit({
          userId: responderId,
          organisationId: orgId,
          action: 'QR_LOOKUP_FAILED_NOT_FOUND',
          entityType: 'PatientIdentifier',
          entityId: token,
          ipAddress: request.ip,
          userAgent: request.headers['user-agent'],
        });

        return reply
          .code(404)
          .send(errorResponse('Emergency identifier not found or unrecognized', 'IDENTIFIER_NOT_FOUND'));
      }

      // Check Revocation
      if (identifier.status === 'REVOKED') {
        await fastify.prisma.identificationAttempt.create({
          data: {
            responderUserId: responderId,
            organisationId: orgId,
            identifierToken: token,
            matchedPatientId: identifier.patientId,
            status: 'FAILED_REVOKED',
            failureReason: 'Token revoked by patient or administrator',
            accessReason,
            latitude: gpsLatitude,
            longitude: gpsLongitude,
          },
        });

        return reply
          .code(410)
          .send(errorResponse('This emergency identifier has been revoked', 'IDENTIFIER_REVOKED'));
      }

      // Check Expiration
      if (
        identifier.status === 'EXPIRED' ||
        (identifier.expiresAt && identifier.expiresAt < new Date())
      ) {
        await fastify.prisma.identificationAttempt.create({
          data: {
            responderUserId: responderId,
            organisationId: orgId,
            identifierToken: token,
            matchedPatientId: identifier.patientId,
            status: 'FAILED_EXPIRED',
            failureReason: 'Token expired',
            accessReason,
            latitude: gpsLatitude,
            longitude: gpsLongitude,
          },
        });

        return reply
          .code(410)
          .send(errorResponse('This emergency identifier has expired', 'IDENTIFIER_EXPIRED'));
      }

      // 2. Successful Match — Execute in transaction with audit and outbox
      const patient = identifier.patient;

      await fastify.prisma.$transaction(async (tx) => {
        // Record identification attempt
        await tx.identificationAttempt.create({
          data: {
            responderUserId: responderId,
            organisationId: orgId,
            identifierToken: token,
            matchedPatientId: patient.id,
            status: 'SUCCESS_MATCHED',
            accessReason,
            latitude: gpsLatitude,
            longitude: gpsLongitude,
          },
        });

        // Record audit event
        await tx.auditEvent.create({
          data: {
            userId: responderId,
            organisationId: orgId,
            action: AuditAction.QR_LOOKUP_SUCCESS,
            entityType: 'Patient',
            entityId: patient.id,
            ipAddress: request.ip,
            userAgent: request.headers['user-agent'],
            metadata: {
              accessReason,
              gpsLatitude,
              gpsLongitude,
            },
          },
        });

        // Insert Transactional Outbox Event
        await tx.outboxEvent.create({
          data: {
            eventType: 'token.scanned',
            aggregateType: 'Patient',
            aggregateId: patient.id,
            payload: {
              patientId: patient.id,
              publicCode: patient.publicCode,
              responderId,
              responderName: request.user.fullName,
              timestamp: new Date().toISOString(),
            },
            status: 'PENDING',
          },
        });
      });

      // Filter and redact medical constraints for emergency display
      const allergies = patient.medicalInformation
        .filter((m) => m.category === 'ALLERGY' || m.type === 'ALLERGY')
        .map((m) => ({
          id: m.id,
          summary: m.summary || m.name,
          details: m.details || m.detail,
          severity: m.severity,
          source: m.source,
          verificationStatus: m.verificationStatus,
        }));

      const conditionsAndMedications = patient.medicalInformation
        .filter((m) => m.category !== 'ALLERGY' && m.type !== 'ALLERGY')
        .map((m) => ({
          id: m.id,
          category: m.category || m.type,
          summary: m.summary || m.name,
          details: m.details || m.detail,
          source: m.source,
          verificationStatus: m.verificationStatus,
        }));

      const contacts = patient.emergencyContacts.map((c) => ({
        id: c.id,
        fullName: c.fullName,
        relationship: c.relationship,
        phone: c.primaryPhone || c.phone,
        alternatePhone: c.alternatePhone,
        priority: c.priority,
        isVerified: c.isVerified,
        notes: c.notes,
      }));

      return reply.send(
        successResponse({
          patientCode: patient.publicCode,
          bloodGroup: patient.bloodGroup,
          primaryLanguage: patient.primaryLanguage,
          isOrganDonor: patient.isOrganDonor,
          emergencyNotes: patient.emergencyNotes || patient.advanceDirectiveNote,
          allergies,
          conditions: conditionsAndMedications,
          contacts,
          disclaimer: DISCLAIMERS.EMERGENCY_CARE,
        })
      );
    }
  );
}
