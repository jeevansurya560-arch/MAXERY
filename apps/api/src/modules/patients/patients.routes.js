import {
  UpdatePatientProfileSchema,
  CreateEmergencyContactSchema,
  CreateMedicalInformationSchema,
  successResponse,
  errorResponse,
  IdentifierType,
  IdentifierStatus,
  MedicalInfoSource,
  VerificationStatus,
} from '@maxery/shared';
import { generateOpaqueToken, hashToken } from '../../security/crypto.js';

export default async function patientsRoutes(fastify) {
  const patientAuth = [fastify.authenticate];

  // Helper to ensure patient profile exists for user
  async function getOrCreatePatient(userId) {
    let patient = await fastify.prisma.patient.findUnique({
      where: { userId },
    });
    if (!patient) {
      patient = await fastify.prisma.patient.create({
        data: {
          userId,
          isActive: true,
        },
      });
    }
    return patient;
  }

  // GET /api/v1/patients/me — Get full patient dashboard data
  fastify.get('/patients/me', { preHandler: patientAuth }, async (request, reply) => {
    const patient = await fastify.prisma.patient.findUnique({
      where: { userId: request.user.id },
      include: {
        identifiers: {
          where: { status: { in: ['ACTIVE', 'REVOKED'] } },
          orderBy: { createdAt: 'desc' },
        },
        medicalInformation: {
          where: { isCurrentlyActive: true },
          orderBy: { createdAt: 'desc' },
        },
        emergencyContacts: {
          orderBy: { priority: 'asc' },
        },
        consentRecords: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!patient) {
      const created = await getOrCreatePatient(request.user.id);
      return reply.send(
        successResponse({
          patient: {
            ...created,
            identifiers: [],
            medicalInformation: [],
            emergencyContacts: [],
          },
        })
      );
    }

    return reply.send(successResponse({ patient }));
  });

  // PUT /api/v1/patients/me — Update patient demographics & emergency notes
  fastify.put('/patients/me', { preHandler: patientAuth }, async (request, reply) => {
    const parseResult = UpdatePatientProfileSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply
        .code(400)
        .send(errorResponse('Validation error', 'VALIDATION_ERROR', parseResult.error.format()));
    }

    const patient = await getOrCreatePatient(request.user.id);
    const { dateOfBirth, bloodGroup, organDonorStatus, advanceDirectiveNote, preferredName } = parseResult.data;

    const updated = await fastify.prisma.patient.update({
      where: { id: patient.id },
      data: {
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        bloodGroup: bloodGroup !== undefined ? bloodGroup : undefined,
        isOrganDonor: organDonorStatus !== undefined ? organDonorStatus : undefined,
        emergencyNotes: advanceDirectiveNote !== undefined ? advanceDirectiveNote : undefined,
        advanceDirectiveNote: advanceDirectiveNote !== undefined ? advanceDirectiveNote : undefined,
        preferredName: preferredName !== undefined ? preferredName : undefined,
      },
    });

    await fastify.recordAudit({
      userId: request.user.id,
      action: 'PATIENT_PROFILE_UPDATED',
      entityType: 'Patient',
      entityId: updated.id,
      ipAddress: request.ip,
      userAgent: request.headers['user-agent'],
    });

    return reply.send(successResponse({ patient: updated }));
  });

  // POST /api/v1/patients/identifiers — Issue a new opaque random QR identifier
  fastify.post('/patients/identifiers', { preHandler: patientAuth }, async (request, reply) => {
    const patient = await getOrCreatePatient(request.user.id);
    const { label = 'Emergency Card', expiresInDays } = request.body || {};

    const publicToken = generateOpaqueToken('MX-QR');
    const tokenHash = hashToken(publicToken);

    const expiresAt = expiresInDays
      ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
      : null;

    const identifier = await fastify.prisma.patientIdentifier.create({
      data: {
        patientId: patient.id,
        identifierType: IdentifierType.QR_CODE,
        label,
        publicToken,
        tokenHash,
        status: IdentifierStatus.ACTIVE,
        expiresAt,
      },
    });

    await fastify.recordAudit({
      userId: request.user.id,
      action: 'IDENTIFIER_ISSUED',
      entityType: 'PatientIdentifier',
      entityId: identifier.id,
      ipAddress: request.ip,
      userAgent: request.headers['user-agent'],
    });

    return reply.code(201).send(
      successResponse({
        identifier: {
          id: identifier.id,
          label: identifier.label,
          publicToken: identifier.publicToken,
          status: identifier.status,
          expiresAt: identifier.expiresAt,
          createdAt: identifier.createdAt,
        },
      })
    );
  });

  // DELETE /api/v1/patients/identifiers/:id — Revoke identifier
  fastify.delete('/patients/identifiers/:id', { preHandler: patientAuth }, async (request, reply) => {
    const { id } = request.params;
    const { reason = 'Revoked by patient' } = request.body || {};

    const patient = await getOrCreatePatient(request.user.id);
    const identifier = await fastify.prisma.patientIdentifier.findFirst({
      where: { id, patientId: patient.id },
    });

    if (!identifier) {
      return reply.code(404).send(errorResponse('Identifier not found', 'NOT_FOUND'));
    }

    const revoked = await fastify.prisma.patientIdentifier.update({
      where: { id },
      data: {
        status: IdentifierStatus.REVOKED,
        revokedAt: new Date(),
        revocationReason: reason,
      },
    });

    await fastify.recordAudit({
      userId: request.user.id,
      action: 'IDENTIFIER_REVOKED',
      entityType: 'PatientIdentifier',
      entityId: identifier.id,
      ipAddress: request.ip,
      userAgent: request.headers['user-agent'],
      metadata: { reason },
    });

    return reply.send(successResponse({ identifier: revoked }));
  });

  // POST /api/v1/patients/contacts — Add emergency contact
  fastify.post('/patients/contacts', { preHandler: patientAuth }, async (request, reply) => {
    const parseResult = CreateEmergencyContactSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply
        .code(400)
        .send(errorResponse('Validation error', 'VALIDATION_ERROR', parseResult.error.format()));
    }

    const patient = await getOrCreatePatient(request.user.id);
    const data = parseResult.data;

    const contact = await fastify.prisma.emergencyContact.create({
      data: {
        patientId: patient.id,
        fullName: data.fullName,
        relationship: data.relationship,
        primaryPhone: data.phone,
        phone: data.phone,
        alternatePhone: data.alternatePhone || null,
        email: data.email || null,
        priority: data.priority,
        safetyStatus: data.safetyStatus,
        safetyNote: data.safetyNote || null,
        isVerified: false,
      },
    });

    return reply.code(201).send(successResponse({ contact }));
  });

  // POST /api/v1/patients/medical-info — Add medical information
  fastify.post('/patients/medical-info', { preHandler: patientAuth }, async (request, reply) => {
    const parseResult = CreateMedicalInformationSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply
        .code(400)
        .send(errorResponse('Validation error', 'VALIDATION_ERROR', parseResult.error.format()));
    }

    const patient = await getOrCreatePatient(request.user.id);
    const data = parseResult.data;

    const entry = await fastify.prisma.medicalInformation.create({
      data: {
        patientId: patient.id,
        category: data.type,
        type: data.type,
        name: data.name,
        summary: data.name,
        details: data.detail || null,
        detail: data.detail || null,
        severity: data.severity || null,
        source: data.source || MedicalInfoSource.SELF_REPORTED,
        verificationStatus: VerificationStatus.UNVERIFIED,
        isCurrentlyActive: data.isCurrentlyActive !== undefined ? data.isCurrentlyActive : true,
      },
    });

    return reply.code(201).send(successResponse({ entry }));
  });
}
