export const APP_NAME = 'MAXERY';

export const API_VERSION = 'v1';
export const API_PREFIX = `/api/${API_VERSION}`;

export const SOCKET_EVENTS = Object.freeze({
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  AUTHENTICATE: 'authenticate',
  AUTHENTICATED: 'authenticated',
  UNAUTHORIZED: 'unauthorized',
  JOIN_CASE_ROOM: 'case:join',
  LEAVE_CASE_ROOM: 'case:leave',
  CASE_CREATED: 'case.created',
  CASE_STATUS_UPDATED: 'case.status_updated',
  CASE_ASSIGNED: 'case.assigned',
  CONTACT_ATTEMPT_UPDATED: 'contact.attempt_updated',
  NOTIFICATION_CREATED: 'notification.created',
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
});

export const SECURITY_LIMITS = Object.freeze({
  MIN_PASSWORD_LENGTH: 12,
  MAX_PASSWORD_LENGTH: 128,
  MAX_LOGIN_ATTEMPTS: 5,
  LOGIN_ATTEMPT_WINDOW_SEC: 900, // 15 min
  IDENTIFIER_LOOKUP_RATE_LIMIT: 30, // 30 per min
});
