/**
 * MAXERY — Synthetic Development Seed
 *
 * SECURITY: This script creates SYNTHETIC TEST DATA ONLY.
 * It is blocked in production (NODE_ENV=production) by an explicit guard.
 *
 * Passwords use per-record random salts via crypto.scrypt — NOT fixed salts.
 * The output hash format is "hash:salt" (both base64), matching the production
 * auth module's expected format.
 */

import { PrismaClient } from '@prisma/client';
import crypto from 'node:crypto';
import { promisify } from 'node:util';

const prisma = new PrismaClient();
const scrypt = promisify(crypto.scrypt);

/**
 * Hash a password with a random salt using scrypt.
 * Format: "<hashBase64>:<saltBase64>"
 * This matches what apps/api/src/security/crypto.js will produce.
 */
async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = await scrypt(password, salt, 64);
  return `${hash.toString('base64')}:${salt.toString('base64')}`;
}

/**
 * Generate a synthetic QR token hash for the seed.
 * In production, crypto.randomBytes(24) → base64url is the raw token and only
 * the SHA-256 hash is stored. For the seed, we use a fixed known plaintext so
 * developers can test QR lookup without scanning a physical code.
 *
 * shortcut: seed uses a known plaintext token, real issuance uses randomBytes(24).
 */
const DEV_QR_RAW_TOKEN = 'MAXERY-DEMO-TOKEN-2026-BASE64URL';
const DEV_QR_TOKEN_HASH = crypto.createHash('sha256').update(DEV_QR_RAW_TOKEN, 'utf8').digest('hex');

async function main() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'SECURITY VIOLATION: Seeding synthetic test data is strictly prohibited in production!',
    );
  }

  console.info('[SEED] Seeding synthetic development data for MAXERY...');
  console.info('[SEED] Dev QR raw token:', DEV_QR_RAW_TOKEN);
  console.info('[SEED] Dev QR token hash (stored in DB):', DEV_QR_TOKEN_HASH);

  // 1. Synthetic Organisation
  const testOrg = await prisma.organisation.upsert({
    where: { code: 'ORG-BLR-EMS-01' },
    update: {},
    create: {
      name: 'Bengaluru Central Emergency Medical Services',
      code: 'ORG-BLR-EMS-01',
      type: 'AMBULANCE_SERVICE',
      contactEmail: 'dispatch@blr-ems.test.local',
      contactPhone: '+918022000001',
      address: '100 Emergency Corridor Road, Bengaluru, Karnataka 560001',
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'IN',
      jurisdiction: 'Karnataka Central District',
      isVerified: true,
      isActive: true,
    },
  });
  console.info(`[SEED] Organisation: ${testOrg.name}`);

  // 2. Synthetic Responder User
  const responder = await prisma.user.upsert({
    where: { email: 'responder@test-maxery.local' },
    update: {},
    create: {
      email: 'responder@test-maxery.local',
      passwordHash: await hashPassword('ResponderPass123!'),
      firstName: 'Priya',
      lastName: 'Sharma',
      phone: '+919876543210',
      badgeNumber: 'EMS-KA-4412',
      isActive: true,
      memberships: {
        create: {
          organisationId: testOrg.id,
          role: 'RESPONDER',
        },
      },
    },
  });
  console.info(`[SEED] Responder: ${responder.firstName} ${responder.lastName}`);

  // 3. Synthetic Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@test-maxery.local' },
    update: {},
    create: {
      email: 'admin@test-maxery.local',
      passwordHash: await hashPassword('AdminPass123!'),
      firstName: 'Rajiv',
      lastName: 'Verma',
      phone: '+919876500001',
      isActive: true,
    },
  });
  console.info(`[SEED] Admin: ${admin.firstName} ${admin.lastName}`);

  // 4. Synthetic Patient with User account
  const patientUser = await prisma.user.upsert({
    where: { email: 'patient@test-maxery.local' },
    update: {},
    create: {
      email: 'patient@test-maxery.local',
      passwordHash: await hashPassword('PatientPass123!'),
      firstName: 'Arjun',
      lastName: 'Reddy',
      phone: '+919876511111',
      isActive: true,
    },
  });
  console.info(`[SEED] Patient user: ${patientUser.firstName} ${patientUser.lastName}`);

  // 5. Patient profile (linked to user account)
  const existingPatient = await prisma.patient.findUnique({
    where: { userId: patientUser.id },
  });

  let patient = existingPatient;
  if (!patient) {
    patient = await prisma.patient.create({
      data: {
        userId: patientUser.id,
        preferredName: 'Arjun',
        dateOfBirth: new Date('1994-06-15T00:00:00.000Z'),
        bloodGroup: 'O+',
        biologicalSex: 'Male',
        primaryLanguage: 'Kannada, English',
        isOrganDonor: true,
        emergencyNotes: 'Carries emergency inhaler in shoulder bag. Severe Penicillin allergy.',
        isActive: true,
      },
    });
    console.info(`[SEED] Created patient profile: ${patient.id}`);

    // 6. QR Identifier — ONLY tokenHash stored, never the raw token
    await prisma.patientIdentifier.create({
      data: {
        patientId: patient.id,
        identifierType: 'QR_CODE',
        label: 'Wallet card (dev demo)',
        tokenHash: DEV_QR_TOKEN_HASH,
        status: 'ACTIVE',
      },
    });
    console.info(`[SEED] Attached QR identifier (hash: ${DEV_QR_TOKEN_HASH.slice(0, 16)}...)`);

    // 7. Medical Information with provenance
    await prisma.medicalInformation.createMany({
      data: [
        {
          patientId: patient.id,
          category: 'ALLERGY',
          name: 'Penicillin',
          detail: 'Severe anaphylaxis. Patient experiences bronchospasm and facial swelling.',
          severity: 'LIFE_THREATENING',
          source: 'PHYSICIAN_DOCUMENTED',
          sourceReference: 'Bowring Hospital Record #BH-2019-009871',
          verificationStatus: 'VERIFIED',
          verifiedByUserId: admin.id,
          verifiedAt: new Date(),
          recordedAt: new Date('2019-03-10T00:00:00.000Z'),
          isCurrentlyActive: true,
        },
        {
          patientId: patient.id,
          category: 'CONDITION',
          name: 'Asthma (Mild Persistent)',
          detail: 'Triggered by cold air and vigorous exercise.',
          severity: 'MILD',
          source: 'SELF_REPORTED',
          verificationStatus: 'PENDING_REVIEW',
          recordedAt: new Date(),
          isCurrentlyActive: true,
        },
        {
          patientId: patient.id,
          category: 'MEDICATION',
          name: 'Salbutamol 100mcg Inhaler',
          detail: 'Use as needed for acute asthma symptoms. 2 puffs maximum.',
          source: 'PHYSICIAN_DOCUMENTED',
          verificationStatus: 'VERIFIED',
          verifiedByUserId: admin.id,
          verifiedAt: new Date(),
          isCurrentlyActive: true,
        },
      ],
    });

    // 8. Emergency Contacts — with safety status
    await prisma.emergencyContact.createMany({
      data: [
        {
          patientId: patient.id,
          fullName: 'Kavitha Reddy',
          relationship: 'Sibling (Sister)',
          primaryPhone: '+919448012345',
          priority: 'PRIMARY',
          safetyStatus: 'SAFE',
          notifyOnEmergency: true,
          consentToContact: true,
          languagesSpoken: ['Kannada', 'English'],
          isActive: true,
        },
        {
          patientId: patient.id,
          fullName: 'Arun Reddy',
          relationship: 'Sibling (Brother)',
          primaryPhone: '+919448067890',
          priority: 'SECONDARY',
          safetyStatus: 'SAFE',
          notifyOnEmergency: true,
          consentToContact: true,
          languagesSpoken: ['Kannada', 'English', 'Hindi'],
          isActive: true,
        },
      ],
    });

    // 9. Consent Records (DPDPA 2023)
    await prisma.consentRecord.create({
      data: {
        patientId: patient.id,
        consentType: 'EMERGENCY_ACCESS',
        granted: true,
        purpose:
          'Authorized emergency responder verification and medical data disclosure during incapacitation or acute distress.',
        legalBasis: 'DPDPA 2023 §7(a) — Consent for processing sensitive personal data',
        validFrom: new Date(),
      },
    });
    console.info(`[SEED] Patient profile, QR, medical data, contacts, and consent created.`);
  }

  // 10. Synthetic Unidentified Case
  const existingCase = await prisma.unidentifiedCase.findFirst({
    where: { caseNumber: 'CASE-2026-0001' },
  });

  if (!existingCase) {
    const demoIdempotencyKey = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
    const unIdCase = await prisma.unidentifiedCase.create({
      data: {
        caseNumber: 'CASE-2026-0001',
        status: 'OPEN_UNIDENTIFIED',
        urgency: 'URGENT',
        createdByUserId: responder.id,
        originOrganisationId: testOrg.id,
        currentOrganisationId: testOrg.id,
        estimatedAge: '25-35 years',
        estimatedGender: 'Female',
        physicalDescription: 'Approx 165cm, medium build, dark hair.',
        clothingDescription: 'Blue running jacket, black sports leggings, grey trainers.',
        distinguishingFeatures: 'Small scar over left eyebrow, silver ring on right index finger.',
        locationFound: 'Near Cubbon Park Metro Station Exit B, Bengaluru',
        hospitalName: 'Bowring & Lady Curzon Hospital Emergency Ward',
        notes: 'Found unresponsive by transit security at 06:45 IST.',
        idempotencyKey: demoIdempotencyKey,
        version: 1,
      },
    });

    await prisma.caseEvent.create({
      data: {
        caseId: unIdCase.id,
        userId: responder.id,
        eventType: 'CASE_OPENED',
        description: 'Case registered by first responder upon arrival at triage.',
        metadata: { triageCategory: 'Yellow', method: 'MANUAL_REGISTRATION' },
      },
    });
    console.info(`[SEED] Unidentified case: ${unIdCase.caseNumber}`);
  }

  // 11. Audit Event for seed run
  await prisma.auditEvent.create({
    data: {
      userId: admin.id,
      organisationId: testOrg.id,
      action: 'DEV_SEED_INITIALIZED',
      entityType: 'SYSTEM',
      metadata: { environment: 'development', syntheticDataOnly: true },
    },
  });

  console.info('[SEED] Synthetic development seed complete.');
}

main()
  .catch((e) => {
    console.error('[SEED] Failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
