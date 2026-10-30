# MAXERY — Architecture Document

**Version:** 1.0  
**Date:** 2026-10-30  
**Classification:** Engineering Reference

---

## 1. System Overview

MAXERY is a **modular monolith** organized as an npm workspaces repository.

```
maxery-monorepo/
├── apps/api/          @maxery/api   — Fastify 5 REST + Socket.IO API (Port 4000)
├── apps/web/          @maxery/web   — Next.js 15 App Router Frontend (Port 3000)
└── packages/shared/   @maxery/shared — Shared Zod schemas, enums, constants
```

---

## 2. Architectural Principles

1. **Decoupled presentation:** Next.js functions exclusively as a presentation client. No Next.js API routes exist. The Fastify backend is the sole API authority.
2. **PostgreSQL as the authoritative source of truth:** Redis is optional and ephemeral only. No PHI or PII is cached in Redis.
3. **Transactional outbox for reliable real-time delivery:** State mutations and outbox events are committed atomically in PostgreSQL before being dispatched to Socket.IO.
4. **Zero-PII physical identifiers:** QR codes encode only an opaque HTTPS URL with a cryptographically random token. The database stores only the SHA-256 hash of the token.
5. **Pure JavaScript and JSX only:** No TypeScript. Runtime validation is provided exclusively by Zod.
6. **Defense in depth:** Every layer (network, identity, application, data) enforces independent security controls.

---

## 3. Component Responsibilities

### 3.1 `@maxery/api` — Fastify Backend
- Authoritative business logic, validation, authentication, authorization.
- Enforces tenant scoping on every database query.
- Records audit events and outbox events within database transactions.
- Runs the transactional outbox background publisher.
- Mounts Socket.IO on the same HTTP server.

### 3.2 `@maxery/web` — Next.js Frontend
- Server-side rendering of static public pages.
- Client-side authenticated portals for patients, responders, admins.
- Communicates exclusively with the Fastify API via fetch.
- Connects to Socket.IO for real-time updates.
- Stores zero sensitive data in localStorage or IndexedDB.

### 3.3 `@maxery/shared` — Shared Contracts
- Zod validation schemas consumed by both frontend forms and backend route validation.
- Domain enums.
- API response envelope factories.
- Socket event name constants.

---

## 4. Security Architecture

```
ZONE 1 — Public Internet
  ↓ TLS 1.3
ZONE 2 — Reverse Proxy (Nginx / Cloudflare)
  Rate limiting, DDoS mitigation, HTTPS header enforcement
  ↓ Internal network
ZONE 3 — Application Server (Fastify)
  Session verification, RBAC × tenant scoping
  Zod input validation
  Audit logging engine
  ↓ Authenticated connection
ZONE 4 — PostgreSQL 16 (private subnet, AES-256 at rest)
  Application user has no UPDATE/DELETE on AuditEvent
ZONE 4 — Redis 7 (optional, rate-limit counters only)
```

### 4.1 Session Management
- Sessions are opaque, cryptographically random identifiers stored as SHA-256 hashes in the `Session` table.
- Session cookies are HttpOnly, Secure (production), SameSite=Strict, with server-side idle and absolute timeouts.
- Logout invalidates the session server-side immediately.
- CSRF tokens protect all cookie-authenticated state-changing requests.

### 4.2 Token Flow
```
Generate: crypto.randomBytes(24) → base64url → RAW_TOKEN (returned to patient once)
Store:    SHA-256(RAW_TOKEN) → tokenHash column (never plaintext)
Lookup:   Incoming token → SHA-256 → query by tokenHash
```

### 4.3 Authorization Model
```
Authorization = ROLE × ORGANIZATION × RESOURCE × ACTION

Every protected query enforces:
  1. Authenticated session
  2. Active account
  3. Organization membership verified from session (not from request body)
  4. Role permits the action
  5. Resource is within the tenant scope
```

### 4.4 Audit Immutability
- The PostgreSQL application user has `INSERT` only on `AuditEvent`.
- No application code path issues `UPDATE` or `DELETE` against `AuditEvent`.
- Audit events for critical operations are written in the same transaction as the operation.

---

## 5. Database Entity Overview

| Entity | Purpose |
|---|---|
| `User` | All platform users (patients, responders, admins) |
| `Organisation` | Hospitals, ambulance services, dispatch agencies |
| `OrganisationMembership` | User-to-organization role mapping |
| `Session` | Server-managed sessions (opaque token hash) |
| `Patient` | Core emergency medical profile |
| `PatientIdentifier` | QR token hash + lifecycle (ACTIVE/REVOKED/EXPIRED/ROTATED) |
| `MedicalInformation` | Allergy/medication/condition with full provenance chain |
| `EmergencyContact` | Trusted contacts with domestic safety controls |
| `IdentificationAttempt` | Audit of every QR lookup with GPS and access reason |
| `LookupSession` | Ephemeral, short-lived authorized emergency record context |
| `UnidentifiedCase` | Cases for unidentified patients (CASE-YYYY-XXXX) |
| `CaseAssignment` | Explicit case assignment record with lifecycle |
| `CaseTransfer` | Cross-organization handover with acknowledgement |
| `CaseEvent` | Immutable timeline event appended to each case |
| `ContactAttempt` | Responder outreach log with outcome codes |
| `ConsentRecord` | DPDPA 2023 statutory consent records |
| `PrivacyRequest` | Data export, rectification, erasure requests |
| `AuditEvent` | Append-only immutable security audit log |
| `OutboxEvent` | Transactional outbox for reliable Socket.IO dispatch |
| `IdempotencyRecord` | Prevents duplicate creation on concurrent identical requests |

---

## 6. API Design

Base path: `/api/v1`

All responses use the standard envelope:
```json
{ "success": true, "data": {}, "meta": { "requestId": "...", "timestamp": "..." } }
{ "success": false, "error": { "code": "...", "message": "..." }, "meta": { "requestId": "..." } }
```

Modules:
- `GET /health` — Public readiness probe
- `POST /auth/register` `POST /auth/login` `POST /auth/logout` `GET /auth/me`
- `POST /identification/lookup-token` — Emergency QR resolution (Responder+)
- `GET|POST|PATCH /patients/me` — Patient self-management
- `GET|POST|PATCH|DELETE /patients/me/medical-information`
- `GET|POST|PATCH|DELETE /patients/me/emergency-contacts`
- `POST /patients/me/identifiers` — Issue new QR
- `POST /patients/me/identifiers/:id/revoke`
- `POST /cases` — Create unidentified case
- `GET|PATCH /cases/:id`
- `POST /cases/:id/events`
- `POST /cases/:id/contact-attempts`
- `POST /cases/:id/assignments`
- `POST /cases/:id/transfers`
- `POST /privacy/requests`
- `GET /audit` — Admin/Auditor only
- `GET|POST /organisations` — Admin only
- `GET|POST|DELETE /organisations/:id/members`

---

## 7. Real-Time Architecture

```
HTTP Route Handler
  ↓ BEGIN transaction
  ↓ Mutate domain entity
  ↓ INSERT CaseEvent
  ↓ INSERT AuditEvent (if critical)
  ↓ INSERT OutboxEvent (status=PENDING)
  ↓ COMMIT
  ↓ Return 201 to caller

Background Publisher (500ms poll)
  ↓ SELECT ... FOR UPDATE SKIP LOCKED LIMIT 50
  ↓ Mark status=PROCESSING
  ↓ emit() to authorized Socket.IO rooms
  ↓ Mark status=PUBLISHED
  ↓ On failure: increment retryCount, exponential nextRetryAt
  ↓ After 5 failures: status=FAILED (dead-letter)
```

Socket.IO rooms:
- `hospital:{orgId}` — Hospital receiving desks
- `dispatch:{regionId}` — Regional dispatchers
- `case:{caseId}` — Per-case update room
- `user:{userId}` — Personal security alerts

---

## 8. Known Limitations (Pre-Production)

1. Facial recognition and biometric matching are non-operational and must remain so.
2. No direct UIDAI / Aadhaar / ABHA integration.
3. Phone outreach uses device `tel:` URI — no telephony provider integration.
4. Offline-first mobile mode not implemented. Assumes mobile web connectivity.
5. Production deployment requires external security, clinical workflow, privacy, and legal review before go-live.
