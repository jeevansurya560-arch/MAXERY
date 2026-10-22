# MAXERY — Error Handling & Logging Specification

**Document Identifier:** `DOC-30`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Operational Telemetry & Information Security  
**Engine:** Fastify Structured Logging & PII Masking Serializer

---

## 1. Structured Logging & PII/PHI Redaction Rules

In medical and emergency coordination software, application logs are a frequent vector for accidental data leakage. MAXERY enforces **strict automated log redaction**:

### Redacted Fields Matrix:
- **Authorization & Credentials:** `authorization`, `cookie`, `password`, `passwordHash`, `token`, `secret`.
- **Protected Health Information (PHI):** `allergies`, `conditions`, `medications`, `bloodGroup`, `emergencyNotes`.
- **Personal Identifiable Information (PII):** `email`, `primaryPhone`, `alternatePhone`, `fullName`.

### Fastify Redaction Configuration:
```javascript
const logger = pino({
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      '*.password',
      '*.passwordHash',
      '*.allergiesSummary',
      '*.conditionsSummary',
      '*.primaryPhone',
      '*.email'
    ],
    censor: '[CONFIDENTIAL-REDACTED]'
  }
});
```

---

## 2. Standardized Error Codes & HTTP Mapping

| Error Code | HTTP Status | Meaning & Client Action |
|---|---|---|
| `VALIDATION_ERROR` | `400 Bad Request` | Zod schema rejection; client must inspect `details` array for field-level errors. |
| `UNAUTHORIZED` | `401 Unauthorized` | Missing or expired JWT token; client must redirect to `/login`. |
| `FORBIDDEN` | `403 Forbidden` | Authenticated user lacks permission or organization membership. |
| `TOKEN_NOT_FOUND` | `404 Not Found` | Scanned emergency token does not exist in the database. |
| `TOKEN_REVOKED` | `410 Gone` | Emergency identifier has been permanently revoked by patient. |
| `RATE_LIMIT_EXCEEDED`| `429 Too Many Requests`| Request rate exceeded; client must wait before retrying. |
| `INTERNAL_ERROR` | `500 Server Error` | Unhandled server exception. Raw stack trace is masked from client response. |
