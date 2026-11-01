import { describe, it, expect } from 'vitest';
import {
  hashPassword,
  verifyPassword,
  generateOpaqueToken,
  hashToken,
} from '../../src/security/crypto.js';

describe('Security Crypto Utilities', () => {
  it('hashes and correctly verifies passwords with unique salts', () => {
    const raw = 'SecureEmergencyPassword123!';
    const hash = hashPassword(raw);

    expect(hash).toContain(':');
    expect(verifyPassword(raw, hash)).toBe(true);
    expect(verifyPassword('WrongPassword!', hash)).toBe(false);
  });

  it('correctly verifies legacy/dev-seed fixed salt passwords', () => {
    // Uses fixed salt: maxery_dev_salt_fixed
    const devHash = hashPassword('ResponderPass123!', 'maxery_dev_salt_fixed').split(':')[1];
    expect(verifyPassword('ResponderPass123!', devHash)).toBe(true);
    expect(verifyPassword('WrongPass', devHash)).toBe(false);
  });

  it('generates opaque random tokens matching MX-QR standard with zero PII', () => {
    const token1 = generateOpaqueToken('MX-QR');
    const token2 = generateOpaqueToken('MX-QR');

    expect(token1).toMatch(/^MX-QR-[A-F0-9]{32}$/);
    expect(token2).toMatch(/^MX-QR-[A-F0-9]{32}$/);
    expect(token1).not.toBe(token2);
  });

  it('hashes opaque tokens deterministically via SHA-256', () => {
    const token = 'MX-QR-DEMO-TOKEN-FOR-TESTING';
    const hash1 = hashToken(token);
    const hash2 = hashToken(token);

    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(64);
  });
});
