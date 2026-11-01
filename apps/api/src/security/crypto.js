import crypto from 'node:crypto';

/**
 * Hash password using Node.js scrypt with cryptographic salt.
 * Stores in salt:derivedKey format.
 */
export function hashPassword(password, customSalt = null) {
  const salt = customSalt || crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
}

/**
 * Timing-safe password verification supporting salt:hash and legacy dev-seed fixed salts.
 */
export function verifyPassword(password, storedHash) {
  if (!storedHash || typeof storedHash !== 'string') return false;

  if (!storedHash.includes(':')) {
    // Fallback support for fixed development seed salt
    const devDerived = crypto.scryptSync(password, 'maxery_dev_salt_fixed', 64).toString('hex');
    if (devDerived.length !== storedHash.length) return false;
    return crypto.timingSafeEqual(Buffer.from(devDerived), Buffer.from(storedHash));
  }

  const [salt, key] = storedHash.split(':');
  if (!salt || !key) return false;

  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  if (derivedKey.length !== key.length) return false;

  return crypto.timingSafeEqual(Buffer.from(derivedKey), Buffer.from(key));
}

/**
 * Generates cryptographically secure opaque token with zero PII/PHI.
 * Format: MX-QR-<32 CHAR HEX>
 */
export function generateOpaqueToken(prefix = 'MX-QR') {
  const randomPart = crypto.randomBytes(16).toString('hex').toUpperCase();
  return `${prefix}-${randomPart}`;
}

/**
 * Generates SHA-256 one-way hash of token for indexed database lookups.
 */
export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
