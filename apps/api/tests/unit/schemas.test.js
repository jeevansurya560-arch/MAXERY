import { describe, it, expect } from 'vitest';
import {
  LoginSchema,
  TokenLookupSchema,
  RegisterSchema,
} from '@maxery/shared';

describe('Shared Zod Schemas Validation', () => {
  it('validates correct login credentials and rejects malformed inputs', () => {
    const valid = LoginSchema.safeParse({
      email: 'responder@test-maxery.local',
      password: 'StrongPassword123!',
    });
    expect(valid.success).toBe(true);

    const invalid = LoginSchema.safeParse({
      email: 'not-an-email',
      password: '',
    });
    expect(invalid.success).toBe(false);
  });

  it('validates emergency token lookup requiring minimum 10 char token and accessReason', () => {
    const valid = TokenLookupSchema.safeParse({
      token: 'MX-QR-7F89B2A4C1D0E3F5-DEMO',
      accessReason: 'Patient found unconscious at traffic accident',
      gpsLatitude: 12.9716,
      gpsLongitude: 77.5946,
    });
    expect(valid.success).toBe(true);

    const invalid = TokenLookupSchema.safeParse({
      token: 'short', // less than 10
      accessReason: '',
    });
    expect(invalid.success).toBe(false);
  });

  it('rejects passwords that do not match in registration schema', () => {
    const result = RegisterSchema.safeParse({
      email: 'citizen@test-maxery.local',
      password: 'ValidPassword123!',
      confirmPassword: 'MismatchPassword123!',
      firstName: 'Ramesh',
      lastName: 'Kumar',
      role: 'PATIENT',
    });
    expect(result.success).toBe(false);
  });
});
