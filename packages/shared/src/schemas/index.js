import { z } from 'zod';
import {
  UserRole,
  MedicalInfoSource,
  ContactPriority,
  ContactOutcome,
  CaseStatus,
  UrgencyLevel,
  PrivacyRequestType,
} from '../enums/index.js';

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address').max(255),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128),
});

export const registerSchema = z.object({
  email: z.string().trim().email('Invalid email address').max(255),
  password: z.string().min(12, 'Password must be at least 12 characters').max(128),
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  role: z.enum([UserRole.RESPONDER, UserRole.PATIENT, UserRole.DISPATCHER]).default(UserRole.RESPONDER),
  phone: z.string().trim().min(8).max(20).optional(),
});

// Identifier / QR Lookup
export const identifierLookupSchema = z.object({
  token: z
    .string()
    .trim()
    .min(16, 'Identifier token must be at least 16 characters')
    .max(128, 'Identifier token is too long')
    .regex(/^[A-Za-z0-9_-]+$/, 'Invalid token format; opaque alphanumeric characters only'),
  accessReason: z.string().trim().min(3).max(255).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

// Emergency Contact
export const emergencyContactSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  relationship: z.string().trim().min(2).max(60),
  primaryPhone: z
    .string()
    .trim()
    .min(8, 'Primary phone must be at least 8 digits')
    .max(20)
    .regex(/^\+?[0-9\s\-()]+$/, 'Invalid phone number format'),
  alternatePhone: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .regex(/^\+?[0-9\s\-()]+$/, 'Invalid phone number format')
    .optional()
    .nullable(),
  priority: z.enum([ContactPriority.PRIMARY, ContactPriority.SECONDARY, ContactPriority.TERTIARY]).default(ContactPriority.PRIMARY),
  notes: z.string().trim().max(500).optional().nullable(),
});

// Medical Information
export const medicalInfoSchema = z.object({
  category: z.string().trim().min(2).max(100), // e.g. "ALLERGY", "MEDICATION", "CHRONIC_CONDITION"
  summary: z.string().trim().min(2).max(255),
  details: z.string().trim().max(2000).optional().nullable(),
  source: z.enum([
    MedicalInfoSource.SELF_REPORTED,
    MedicalInfoSource.FAMILY_REPORTED,
    MedicalInfoSource.PHYSICIAN_DOCUMENTED,
    MedicalInfoSource.DEVICE_MEDICAL_ID,
  ]).default(MedicalInfoSource.SELF_REPORTED),
});

// Unidentified Case
export const unidentifiedCaseSchema = z.object({
  estimatedAge: z.string().trim().max(50).optional().nullable(),
  estimatedGender: z.string().trim().max(30).optional().nullable(),
  physicalDescription: z.string().trim().max(2000).optional().nullable(),
  clothingDescription: z.string().trim().max(1000).optional().nullable(),
  distinguishingFeatures: z.string().trim().max(1000).optional().nullable(), // scars, tattoos, jewelry
  locationFound: z.string().trim().min(3, 'Location found is required').max(255),
  hospitalName: z.string().trim().max(255).optional().nullable(),
  urgency: z.enum([UrgencyLevel.CRITICAL, UrgencyLevel.URGENT, UrgencyLevel.STABLE, UrgencyLevel.UNKNOWN]).default(UrgencyLevel.URGENT),
  notes: z.string().trim().max(2000).optional().nullable(),
});

export const updateCaseStatusSchema = z.object({
  status: z.enum([
    CaseStatus.OPEN_UNIDENTIFIED,
    CaseStatus.INVESTIGATING,
    CaseStatus.PROVISIONALLY_IDENTIFIED,
    CaseStatus.RESOLVED_IDENTIFIED,
    CaseStatus.CLOSED_UNRESOLVED,
  ]),
  notes: z.string().trim().max(1000).optional(),
});

// Contact Attempt Recording
export const contactAttemptSchema = z.object({
  emergencyContactId: z.string().uuid('Invalid contact ID'),
  method: z.string().trim().min(2).max(50), // e.g. "PHONE_CALL", "DIRECT_ALERT"
  outcome: z.enum([
    ContactOutcome.CONNECTED_AWARE,
    ContactOutcome.NO_ANSWER,
    ContactOutcome.VOICEMAIL_LEFT,
    ContactOutcome.WRONG_NUMBER,
    ContactOutcome.BUSY,
    ContactOutcome.CALL_FAILED,
  ]),
  notes: z.string().trim().max(1000).optional().nullable(),
});

// Privacy Request Schema (DPDPA 2023 alignment)
export const privacyRequestSchema = z.object({
  requestType: z.enum([
    PrivacyRequestType.ACCESS_EXPORT,
    PrivacyRequestType.RECTIFICATION,
    PrivacyRequestType.ERASURE_FORGOTTEN,
    PrivacyRequestType.RESTRICTION,
  ]),
  reason: z.string().trim().min(5, 'Reason must be provided').max(1000),
});
