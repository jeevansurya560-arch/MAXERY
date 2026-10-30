export const APP_NAME = 'MAXERY';

export const API_VERSION = 'v1';
export const API_PREFIX = `/api/${API_VERSION}`;

export const SOCKET_EVENTS = Object.freeze({
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  AUTHENTICATE: 'authenticate',
  AUTHENTICATED: 'authenticated',
  UNAUTHORIZED: 'unauthorized',
  // Case rooms
  JOIN_CASE_ROOM: 'case:join',
  LEAVE_CASE_ROOM: 'case:leave',
  CASE_CREATED: 'case.created',
  CASE_STATUS_UPDATED: 'case.status_updated',
  CASE_ASSIGNED: 'case.assigned',
  CASE_TRANSFERRED: 'case.transferred',
  CASE_TRANSFER_ACKNOWLEDGED: 'case.transfer_acknowledged',
  CASE_CLOSED: 'case.closed',
  // Contact attempts
  CONTACT_ATTEMPT_RECORDED: 'contact.attempt_recorded',
  // Identification
  QR_LOOKUP_ATTEMPTED: 'identification.lookup_attempted',
  QR_LOOKUP_SUCCESSFUL: 'identification.lookup_successful',
  // Security alerts
  SECURITY_ALERT: 'security.alert',
  SESSION_EXPIRY_WARNING: 'session.expiry_warning',
  // Notifications
  NOTIFICATION_CREATED: 'notification.created',
});

export const SOCKET_ROOMS = Object.freeze({
  hospital: (orgId) => `hospital:${orgId}`,
  dispatch: (regionId) => `dispatch:${regionId}`,
  case: (caseId) => `case:${caseId}`,
  user: (userId) => `user:${userId}`,
});

export const DISCLAIMERS = Object.freeze({
  EMERGENCY_CARE:
    'MAXERY is an emergency contact and identification platform. It does not provide medical care, clinical triage, or diagnostic advice, and does not replace emergency medical services.',
  IDENTIFICATION_LIMITS:
    'MAXERY does not guarantee identification. A QR code or medical identifier is an assistance tool subject to verification and server-side authorization.',
  NO_AFFILIATION:
    'MAXERY does not represent government emergency services, hospitals, or police departments unless an active authorized institutional agreement exists.',
  RESTRICTED_BIOMETRICS:
    'Facial recognition, fingerprint matching, and external government databases (such as Aadhaar or ABHA) are restricted/future concepts and are not operational in this release.',
  LIFE_SAFETY:
    'MAXERY is not a replacement for dialling emergency services (112 in India). Always call emergency services first.',
});

export const SECURITY_LIMITS = Object.freeze({
  MIN_PASSWORD_LENGTH: 12,
  MAX_PASSWORD_LENGTH: 128,
  MAX_LOGIN_ATTEMPTS: 5,
  LOGIN_ATTEMPT_WINDOW_SEC: 900,       // 15 min
  IDENTIFIER_LOOKUP_RATE_LIMIT: 30,   // 30 per min per responder
  CASE_CREATE_RATE_LIMIT: 10,         // 10 per min per responder
  LOOKUP_SESSION_TTL_SECONDS: 1800,   // 30 min — ephemeral emergency record access
  QR_TOKEN_BYTES: 24,                 // 24 random bytes → 32-char base64url
  SESSION_TOKEN_BYTES: 32,            // 32 random bytes → opaque session identifier
});

// MAXERY permission capability strings — the full authorization matrix is in docs/07.
// Format: 'resource:action'
export const PERMISSIONS = Object.freeze({
  PATIENT_READ_OWN: 'patient:read_own',
  PATIENT_WRITE_OWN: 'patient:write_own',
  PATIENT_READ_EMERGENCY: 'patient:read_emergency',  // Authorized responders only
  QR_ISSUE: 'identifier:issue',
  QR_REVOKE_OWN: 'identifier:revoke_own',
  MEDICAL_INFO_READ_OWN: 'medical_info:read_own',
  MEDICAL_INFO_WRITE_OWN: 'medical_info:write_own',
  MEDICAL_INFO_READ_EMERGENCY: 'medical_info:read_emergency',
  CONTACT_READ_OWN: 'contact:read_own',
  CONTACT_WRITE_OWN: 'contact:write_own',
  CONTACT_READ_EMERGENCY: 'contact:read_emergency',
  CASE_CREATE: 'case:create',
  CASE_READ_ORG: 'case:read_org',
  CASE_UPDATE_ORG: 'case:update_org',
  CASE_ASSIGN: 'case:assign',
  CASE_TRANSFER: 'case:transfer',
  CASE_CLOSE: 'case:close',
  AUDIT_READ: 'audit:read',
  ORG_MANAGE: 'org:manage',
  USER_MANAGE: 'user:manage',
  PRIVACY_REQUEST_SUBMIT_OWN: 'privacy:submit_own',
  PRIVACY_REQUEST_MANAGE: 'privacy:manage',
});
