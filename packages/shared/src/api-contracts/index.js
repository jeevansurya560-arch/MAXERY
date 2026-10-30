/**
 * Standard API response envelope factories.
 *
 * All API responses from the Fastify backend use one of these two shapes.
 * The frontend should only need to check `response.success`.
 */

export function successResponse(data, meta = {}) {
  return {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  };
}

export function paginatedResponse(data, pagination, meta = {}) {
  return {
    success: true,
    data,
    pagination, // { page, pageSize, total, totalPages }
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  };
}

/**
 * @param {string} message - Human-readable error description
 * @param {string} code    - Machine-readable error code (e.g., 'UNAUTHORIZED', 'NOT_FOUND')
 * @param {object|null} details - Optional field-level validation errors
 */
export function errorResponse(message, code = 'BAD_REQUEST', details = null) {
  return {
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  };
}

// Standard error codes used across all modules
export const ErrorCode = Object.freeze({
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  UNPROCESSABLE: 'UNPROCESSABLE',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  TOKEN_INVALID: 'TOKEN_INVALID', // Uniform QR lookup failure — never expose the real reason
  LOOKUP_SESSION_EXPIRED: 'LOOKUP_SESSION_EXPIRED',
  CASE_ALREADY_EXISTS: 'CASE_ALREADY_EXISTS', // Idempotency conflict
  CONTACT_RESTRICTED: 'CONTACT_RESTRICTED',   // Safety-blocked contact attempt
});
