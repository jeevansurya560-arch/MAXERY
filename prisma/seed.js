import { PrismaClient } from '@prisma/client';
import crypto from 'node:crypto';

const prisma = new PrismaClient();

// In production, bcrypt or argon2 is used. For synthetic dev seeds, deterministic scrypt is used.
function hashPassword(password) {
  const salt = 'maxery_dev_salt_fixed';
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

async function main() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SECURITY VIOLATION: Seeding synthetic test data is strictly prohibited in production!');
  }

  console.info('Seeding synthetic development data for MAXERY...');

  // 1. Synthetic Organisation
  const testOrg = await prisma.organisation.upsert({
    where: { code: 'ORG-BLR-EMS-01' },
    update: {},
    create: {
      name: 'Bengaluru Central Emergency Medical Services',
      code: 'ORG-BLR-EMS-01',
      type: 'AMBULANCE_SERVICE',
      contactEmail: 'dispatch@blr-ems.test.local',
      contactPhone: '+91 80 2200 0001',
      address: '100 Emergency Corridor Road, Bengaluru, Karnataka 560001',
      jurisdiction: 'Karnataka Central District',
      isVerified: true,
      isActive: true,
    },
  });
  console.info(`[SEED] Created test organisation: ${testOrg.name}`);

  // 2. Synthetic Responder User
  const responderPasswordHash = hashPassword('ResponderPass123!');
  const responder = await prisma.user.upsert({
    where: { email: 'responder@test-maxery.local' },
    update: {},
    create: {
      email: 'responder@test-maxery.local',
      passwordHash: responderPasswordHash,
      fullName: 'Paramedic Priya Sharma',
      role: 'RESPONDER',
      phone: '+91 98765 43210',
      badgeNumber: 'EMS-KA-4412',
      isActive: true,
      memberships: {
        create: {
          organisationId: testOrg.id,
          roleInOrg: 'PARAMEDIC_FIRST_RESPONDER',
        },
      },
    },
  });
  console.info(`[SEED] Created test responder: ${responder.fullName}`);

  // 3. Synthetic Admin User
  const adminPasswordHash = hashPassword('AdminPass123!');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@test-maxery.local' },
    update: {},
    create: {
      email: 'admin@test-maxery.local',
      passwordHash: adminPasswordHash,
      fullName: 'System Auditor Rajiv Verma',
      role: 'ADMIN',
      phone: '+91 98765 00001',
      isActive: true,
    },
  });
  console.info(`[SEED] Created test admin: ${admin.fullName}`);

  // 4. Synthetic Patient Profile
  const patientPublicCode = 'PT-DEMO-2026-X79A';
  const existingPatient = await prisma.patient.findFirst({
    where: { publicCode: patientPublicCode },
  });

  let patient = existingPatient;
  if (!patient) {
    patient = await prisma.patient.create({
      data: {
        publicCode: patientPublicCode,
        dateOfBirth: new Date('1994-06-15T00:00:00.000Z'),
        bloodGroup: 'O_POSITIVE',
        gender: 'Male',
        primaryLanguage: 'Kannada, English',
        allergiesSummary: 'Severe Penicillin allergy (anaphylaxis risk)',
        conditionsSummary: 'Mild persistent asthma',
        medicationsSummary: 'Salbutamol inhaler as needed',
        isOrganDonor: true,
        emergencyNotes: 'Carries emergency inhaler in shoulder bag.',
        isActive: true,
      },
    });
    console.info(`[SEED] Created test patient code: ${patient.publicCode}`);

    // 5. Opaque QR Identifier
    // Notice: Random opaque string, NO PII inside token
    const opaqueToken = 'MX-QR-7F89B2A4C1D0E3F5-DEMO';
    await prisma.patientIdentifier.create({
      data: {
        patientId: patient.id,
        identifierType: 'QR_CODE',
        publicToken: opaqueToken,
        tokenHash: crypto.createHash('sha256').update(opaqueToken).digest('hex'),
        status: 'ACTIVE',
      },
    });
    console.info(`[SEED] Attached opaque QR token: ${opaqueToken}`);

    // 6. Medical Information Entries with Source and Verification
    await prisma.medicalInformation.createMany({
      data: [
        {
          patientId: patient.id,
          category: 'ALLERGY',
          summary: 'Penicillin - Severe Anaphylaxis',
          details: 'Patient experiences severe bronchospasm and facial swelling upon exposure to beta-lactam antibiotics.',
          source: 'PHYSICIAN_DOCUMENTED',
          verificationStatus: 'VERIFIED',
          verifiedByUserId: admin.id,
          verifiedAt: new Date(),
        },
        {
          patientId: patient.id,
          category: 'CHRONIC_CONDITION',
          summary: 'Asthma (Mild Persistent)',
          details: 'Triggered by cold air and vigorous exercise.',
          source: 'SELF_REPORTED',
          verificationStatus: 'PENDING_REVIEW',
        },
      ],
    });

    // 7. Emergency Contacts
    await prisma.emergencyContact.createMany({
      data: [
        {
          patientId: patient.id,
          fullName: 'Kavitha R. (Sister)',
          relationship: 'Sibling',
          primaryPhone: '+91 94480 12345',
          priority: 'PRIMARY',
          isVerified: true,
          consentStatus: 'OPTED_IN',
          notes: 'Speaks Kannada and English. Lives in Indiranagar, Bengaluru.',
        },
        {
          patientId: patient.id,
          fullName: 'Arun R. (Brother)',
          relationship: 'Sibling',
          primaryPhone: '+91 94480 67890',
          priority: 'SECONDARY',
          isVerified: false,
          consentStatus: 'OPTED_IN',
          notes: 'Available on WhatsApp call if roaming.',
        },
      ],
    });

    // 8. Consent Record
    await prisma.consentRecord.create({
      data: {
        patientId: patient.id,
        consentType: 'EMERGENCY_DATA_DISCLOSURE',
        granted: true,
        purpose: 'Authorized emergency responder verification during incapacitation or acute distress.',
      },
    });
  }

  // 9. Synthetic Unidentified Patient Case (Fallback workflow demonstration)
  const existingCase = await prisma.unidentifiedCase.findFirst({
    where: { caseNumber: 'CASE-2026-0001' },
  });

  if (!existingCase) {
    const unIdCase = await prisma.unidentifiedCase.create({
      data: {
        caseNumber: 'CASE-2026-0001',
        status: 'OPEN_UNIDENTIFIED',
        urgency: 'URGENT',
        responderUserId: responder.id,
        organisationId: testOrg.id,
        estimatedAge: '25-35 years',
        estimatedGender: 'Female',
        physicalDescription: 'Approx 165cm, medium build, dark hair tied in ponytail.',
        clothingDescription: 'Blue running jacket, black sports leggings, grey trainers.',
        distinguishingFeatures: 'Small scar over left eyebrow, silver ring on right index finger.',
        locationFound: 'Near Cubbon Park Metro Station Exit B, Bengaluru',
        hospitalName: 'Bowring & Lady Curzon Hospital Emergency Ward',
        notes: 'Found unresponsive by transit security at 06:45 IST. No physical ID or unlocked phone found.',
      },
    });

    await prisma.caseEvent.create({
      data: {
        caseId: unIdCase.id,
        userId: responder.id,
        eventType: 'CASE_OPENED',
        description: 'Case registered by first responder upon arrival at triage.',
        metadata: { triageCategory: 'Yellow' },
      },
    });
    console.info(`[SEED] Created fallback unidentified case: ${unIdCase.caseNumber}`);
  }

  // 10. Audit Event
  await prisma.auditEvent.create({
    data: {
      userId: responder.id,
      organisationId: testOrg.id,
      action: 'DEV_SEED_INITIALIZED',
      entityType: 'SYSTEM',
      metadata: { environment: 'development', syntheticDataOnly: true },
    },
  });

  console.info('Synthetic development seed complete.');
}

main()
  .catch((e) => {
    console.error('Failed to seed database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
