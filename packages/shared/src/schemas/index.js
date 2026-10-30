/**
 * @maxery/shared — Zod input validation schemas
 *
 * These schemas validate user-supplied input at API boundaries.
 * They are NOT database types; they describe what clients send.
 * All schemas use .strict() to reject unknown fields (prevents mass-assignment).
 */

import { z } from 'zod';
import { SECURITY_LIMITS } from '../constants/index.js';
import {
  MedicalInfoSource,
  ContactSafetyStatus,
  ContactPriority,
  UrgencyLevel,
  IdentifierType,
  PrivacyRequestType,
} from '../enums/index.js';

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

const phoneE164 = z
  .string()
  .regex(/^\+[1-9]\d{6,14}$/, 'Phone number must be in E.164 format (e.g., +919876543210)');

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format');

const password = z
  .string()
  .min(SECURITY_LIMITS.MIN_PASSWORD_LENGTH, `Password must be at least ${SECURITY_LIMITS.MIN_PASSWORD_LENGTH} characters`)
  .max(SECURITY_LIMITS.MAX_PASSWORD_LENGTH, `Password must be at most ${SECURITY_LIMITS.MAX_PASSWORD_LENGTH} characters`);

const cuid = z.string().cuid('Invalid resource ID format');

// ---------------------------------------------------------------------------
// Auth schemas
// ---------------------------------------------------------------------------

export const RegisterSchema = z
  .object({
    email: z.string().email('Valid email address required'),
    password,
    confirmPassword: z.string(),
    firstName: z.string().min(1).max(100).trim(),
    lastName: z.string().min(1).max(100).trim(),
    phone: phoneE164.optional(),
    // Patients self-register. Responders/Admins are provisioned by org admins.
    role: z.literal('PATIENT').default('PATIENT'),
  })
  .strict()
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const LoginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1),
  })
  .strict();

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: password,
    confirmNewPassword: z.string(),
  })
  .strict()
  .refine((d) => d.newPassword === d.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  })
  .refine((d) => d.currentPassword !== d.newPassword, {
    message: 'New password must differ from current password',
    path: ['newPassword'],
  });

// ---------------------------------------------------------------------------
// Patient profile schemas
// ---------------------------------------------------------------------------

export const UpdatePatientProfileSchema = z
  .object({
    preferredName: z.string().max(100).trim().optional(),
    dateOfBirth: isoDate.optional(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']).optional(),
    organDonorStatus: z.boolean().optional(),
    // Advance directive is a text note — not a clinical prescription
    advanceDirectiveNote: z.string().max(2000).trim().optional(),
  })
  .strict();

// ---------------------------------------------------------------------------
// Medical information schemas
// ---------------------------------------------------------------------------

export const CreateMedicalInformationSchema = z
  .object({
    type: z.enum(['ALLERGY', 'MEDICATION', 'CONDITION', 'SURGICAL_HISTORY', 'IMMUNIZATION']),
    name: z.string().min(1).max(200).trim(),
    detail: z.string().max(1000).trim().optional(),
    severity: z.enum(['MILD', 'MODERATE', 'SEVERE', 'LIFE_THREATENING']).optional(),
    source: z.nativeEnum(MedicalInfoSource),
    sourceReference: z.string().max(500).trim().optional(), // e.g., hospital record number
    verificationMethod: z.string().max(200).trim().optional(),
    effectiveFrom: isoDate.optional(),
    effectiveUntil: isoDate.optional(),
    isCurrentlyActive: z.boolean().default(true),
  })
  .strict();

export const UpdateMedicalInformationSchema = CreateMedicalInformationSchema.partial().strict();

// ---------------------------------------------------------------------------
// Emergency contact schemas
// ---------------------------------------------------------------------------

export const CreateEmergencyContactSchema = z
  .object({
    fullName: z.string().min(1).max(200).trim(),
    relationship: z.string().min(1).max(100).trim(),
    phone: phoneE164,
    alternatePhone: phoneE164.optional(),
    email: z.string().email().optional(),
    priority: z.nativeEnum(ContactPriority),
    // Patient declares the safety classification.
    // Responders cannot override this field — enforced server-side.
    safetyStatus: z.nativeEnum(ContactSafetyStatus).default(ContactSafetyStatus.SAFE),
    // Free-text reason visible only to internal case managers, not displayed to responders
    safetyNote: z.string().max(500).trim().optional(),
    languagesSpoken: z.array(z.string().max(50)).max(10).optional(),
    notifyOnEmergency: z.boolean().default(true),
    consentToContact: z.boolean().default(true),
  })
  .strict();

export const UpdateEmergencyContactSchema = CreateEmergencyContactSchema.partial().strict();

// ---------------------------------------------------------------------------
// Patient identifier (QR) schemas
// ---------------------------------------------------------------------------

export const IssueIdentifierSchema = z
  .object({
    type: z.nativeEnum(IdentifierType).default(IdentifierType.QR_CODE),
    label: z.string().max(100).trim().optional(), // e.g. "Wallet card", "Wristband"
    expiresInDays: z.number().int().min(1).max(3650).optional(), // null → no expiry
  })
  .strict();

export const RevokeIdentifierSchema = z
  .object({
    reason: z.string().min(1).max(500).trim(),
  })
  .strict();

// ---------------------------------------------------------------------------
// Identification lookup schema
// ---------------------------------------------------------------------------

export const TokenLookupSchema = z
  .object({
    // The raw QR token from the physical QR code (24 bytes, base64url)
    token: z.string().min(10).max(64).trim(),
    // Access reason is mandatory — feeds the audit trail
    accessReason: z.string().min(5).max(500).trim(),
    // Optional GPS coordinates from the responder's device
    gpsLatitude: z.number().min(-90).max(90).optional(),
    gpsLongitude: z.number().min(-180).max(180).optional(),
  })
  .strict();

// ---------------------------------------------------------------------------
// Unidentified case schemas
// ---------------------------------------------------------------------------

export const CreateCaseSchema = z
  .object({
    title: z.string().min(1).max(200).trim(),
    description: z.string().max(5000).trim(),
    urgencyLevel: z.nativeEnum(UrgencyLevel),
    location: z.string().min(1).max(500).trim(),
    gpsLatitude: z.number().min(-90).max(90).optional(),
    gpsLongitude: z.number().min(-180).max(180).optional(),
    // idempotencyKey prevents duplicate cases on mobile re-submissions
    idempotencyKey: z.string().uuid('idempotencyKey must be a UUID v4'),
  })
  .strict();

export const UpdateCaseSchema = z
  .object({
    title: z.string().min(1).max(200).trim().optional(),
    description: z.string().max(5000).trim().optional(),
    urgencyLevel: z.nativeEnum(UrgencyLevel).optional(),
    location: z.string().min(1).max(500).trim().optional(),
    notes: z.string().max(2000).trim().optional(),
  })
  .strict();

export const AddCaseEventSchema = z
  .object({
    eventType: z.string().min(1).max(100).trim(),
    description: z.string().min(1).max(2000).trim(),
    recordedAt: z.string().datetime({ offset: true }).optional(), // ISO 8601 — defaults to server time
  })
  .strict();

export const RecordContactAttemptSchema = z
  .object({
    contactId: cuid,
    outcome: z.string().min(1).max(100).trim(),
    notes: z.string().max(500).trim().optional(),
    attemptedAt: z.string().datetime({ offset: true }).optional(),
  })
  .strict();

export const AssignCaseSchema = z
  .object({
    assigneeUserId: cuid,
    note: z.string().max(500).trim().optional(),
  })
  .strict();

export const TransferCaseSchema = z
  .object({
    targetOrganisationId: cuid,
    reason: z.string().min(1).max(1000).trim(),
    patientConditionSummary: z.string().max(2000).trim().optional(),
  })
  .strict();

export const AcknowledgeTransferSchema = z
  .object({
    accept: z.boolean(),
    rejectionReason: z.string().max(500).trim().optional(),
  })
  .strict()
  .refine(
    (d) => d.accept || (d.rejectionReason && d.rejectionReason.length > 0),
    { message: 'rejectionReason is required when accept is false', path: ['rejectionReason'] },
  );

// ---------------------------------------------------------------------------
// Privacy request schemas
// ---------------------------------------------------------------------------

export const CreatePrivacyRequestSchema = z
  .object({
    requestType: z.nativeEnum(PrivacyRequestType),
    detail: z.string().min(5).max(2000).trim(),
  })
  .strict();

// ---------------------------------------------------------------------------
// Admin provisioning schemas
// ---------------------------------------------------------------------------

export const CreateOrganisationSchema = z
  .object({
    name: z.string().min(1).max(200).trim(),
    type: z.enum([
      'HOSPITAL',
      'AMBULANCE_SERVICE',
      'LAW_ENFORCEMENT',
      'FIRE_RESCUE',
      'EMERGENCY_SERVICES',
    ]),
    city: z.string().max(100).trim().optional(),
    state: z.string().max(100).trim().optional(),
    country: z.string().length(2).toUpperCase().default('IN'), // ISO 3166-1 alpha-2
    phone: phoneE164.optional(),
    email: z.string().email().optional(),
  })
  .strict();

export const ProvisionUserSchema = z
  .object({
    email: z.string().email(),
    firstName: z.string().min(1).max(100).trim(),
    lastName: z.string().min(1).max(100).trim(),
    role: z.enum(['RESPONDER', 'DISPATCHER', 'ADMIN', 'AUDITOR']),
    organisationId: cuid,
    // Temporary password — user must change on first login
    temporaryPassword: password,
    sendWelcomeEmail: z.boolean().default(false), // Email sending is not implemented in MVP
  })
  .strict();

export const AddOrganisationMemberSchema = z
  .object({
    userId: cuid,
    role: z.enum(['RESPONDER', 'DISPATCHER', 'ADMIN', 'AUDITOR']),
  })
  .strict();
