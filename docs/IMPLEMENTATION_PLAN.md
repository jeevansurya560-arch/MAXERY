# MAXERY — Implementation Plan

**Version:** 1.0  
**Date:** 2026-10-30  
**Status:** Active — Phases 0–2 in progress

---

## Phase Status

| Phase | Description | Status |
|---|---|---|
| 0 | Repository audit, architecture corrections, docs | ✅ Complete |
| 1 | Monorepo corrections, shared contracts, env config | 🔄 In Progress |
| 2 | Database schema, migrations, seed data | 🔄 In Progress |
| 3 | Authentication, sessions, RBAC, audit infrastructure | ⏳ Pending |
| 4 | Patient profile, medical information, emergency contacts | ⏳ Pending |
| 5 | QR issuance, revocation, authorized identification | ⏳ Pending |
| 6 | Unidentified cases, assignments, handover | ⏳ Pending |
| 7 | Transactional outbox and real-time infrastructure | ⏳ Pending |
| 8 | Patient, responder, organization frontend portals | ⏳ Pending |
| 9 | Privacy workflows, admin functionality | ⏳ Pending |
| 10 | Automated testing, security review, production build | ⏳ Pending |

---

## Phase 0 — Audit Outputs

**Deliverables:**
- `docs/PROJECT_AUDIT.md` ✅
- `docs/ARCHITECTURE.md` ✅
- `docs/IMPLEMENTATION_PLAN.md` ✅ (this file)

**Critical findings addressed in Phase 1 & 2:**
- Remove `publicToken` plaintext storage from `PatientIdentifier`
- Add `Session`, `IdempotencyRecord`, `CaseAssignment`, `CaseTransfer`, `LookupSession` models
- Extend `MedicalInformation` with full provenance fields
- Extend `EmergencyContact` with domestic safety fields
- Fix JWT secret hardcoded fallback (fail-fast)
- Add `"type": "module"` to root `package.json`
- Update all Zod schemas to match corrected database design

---

## Phase 1 — Monorepo, Shared Contracts & Configuration

### Files Modified
- `package.json` — Add `"type": "module"`, add `@fastify/csrf-protection`, `@fastify/cookie` to api deps
- `packages/shared/src/enums/index.js` — Add `ContactSafetyStatus`, `MedicalSourceType`, extended `PrivacyRequestStatus`, `LookupSessionStatus`
- `packages/shared/src/schemas/index.js` — Complete rewrite to match corrected DB schema
- `packages/shared/src/constants/index.js` — Add missing socket events
- `apps/api/src/config/index.js` — Remove JWT fallback secret; fail-fast if unset
- `apps/api/package.json` — Add `@fastify/cookie`, `@fastify/csrf-protection`
- `apps/web/next.config.mjs` — Create Next.js config
- `apps/web/.env.example` — Create web env template

### Acceptance Criteria
- `npm run lint` passes
- Zero TypeScript files exist
- Shared schemas export without errors

---

## Phase 2 — Database Schema, Migrations & Seed Data

### Files Modified
- `prisma/schema.prisma` — Complete corrected schema with all 20 entities
- `prisma/seed.js` — Updated to reflect new schema (Session, LookupSession removed from seed; uses random salts for passwords)
- `.env` / `apps/api/.env` — Created from examples

### New Entities
- `Session` — Server-managed opaque session tokens
- `LookupSession` — Short-lived ephemeral emergency record context
- `IdempotencyRecord` — Duplicate-request protection
- `CaseAssignment` — Explicit case assignment lifecycle
- `CaseTransfer` — Cross-organization handover with acknowledgement

### Modified Entities
- `PatientIdentifier` — Remove `publicToken`, keep only `tokenHash`
- `MedicalInformation` — Add 8 provenance/currency fields
- `EmergencyContact` — Add 4 domestic safety fields
- `UnidentifiedCase` — Add `idempotencyKey`, `version`, `currentOrganisationId`

### Acceptance Criteria
- `npm run db:generate` — Prisma client generates without errors
- `npm run db:push` — Schema applies cleanly to Postgres 16
- `npm run db:seed` — Synthetic data inserts without errors
- All foreign key constraints satisfied
- Unique constraints enforced (tokenHash, session hash, idempotency key)

---

## Phase 3 — Backend Security Foundation

### Planned Files
```
apps/api/src/
├── app.js
├── server.js
├── plugins/
│   ├── prisma.js
│   ├── auth.js           (cookie + session plugin)
│   ├── helmet.js
│   ├── cors.js
│   ├── rate-limit.js
│   └── logger.js         (structured, allowlisted fields)
├── middleware/
│   ├── authenticate.js   (session lookup from Session table)
│   ├── authorize.js      (ROLE × ORG × RESOURCE × ACTION)
│   └── audit.js
├── security/
│   ├── crypto.js         (randomBytes, SHA-256, scrypt)
│   └── session.js        (session creation, renewal, revocation)
└── modules/
    ├── auth/routes.js
    └── health/routes.js
```

### Acceptance Criteria
- `GET /api/v1/health` returns 200 with DB status
- `POST /api/v1/auth/login` issues session cookie and returns user info
- `POST /api/v1/auth/logout` invalidates session server-side
- Unauthenticated requests to protected routes → 401
- Wrong role → 403
- Cross-tenant access → 403
- Rate limiting → 429 after threshold
- No raw tokens or passwords appear in logs

---

## Phase 4 — Patient Profile, Medical Information & Emergency Contacts

### Planned Files
```
apps/api/src/modules/
├── patients/routes.js
├── medical-information/routes.js
└── emergency-contacts/routes.js
```

---

## Phase 5 — QR Issuance, Revocation & Authorized Identification

### Planned Files
```
apps/api/src/modules/
├── patient-identifiers/routes.js
└── identification/routes.js
apps/api/src/security/
└── lookup-session.js     (ephemeral context creation, Redis or DB-backed)
```

---

## Phase 6 — Unidentified Cases, Assignments & Handover

### Planned Files
```
apps/api/src/modules/
├── unidentified-cases/routes.js
├── case-assignments/routes.js
├── case-transfers/routes.js
└── contact-attempts/routes.js
```

---

## Phase 7 — Transactional Outbox & Real-Time Infrastructure

### Planned Files
```
apps/api/src/
├── realtime/
│   ├── socket-server.js
│   └── room-authorization.js
└── jobs/
    └── outbox-publisher.js
```

---

## Phase 8 — Frontend Portals

### Planned Structure
```
apps/web/src/
├── app/
│   ├── globals.css           (design system tokens)
│   ├── layout.jsx
│   ├── page.jsx              (public landing)
│   ├── (auth)/login/page.jsx
│   ├── (auth)/register/page.jsx
│   ├── (patient)/dashboard/page.jsx
│   ├── (patient)/emergency-id/page.jsx
│   ├── (patient)/medical-information/page.jsx
│   ├── (patient)/emergency-contacts/page.jsx
│   ├── (patient)/privacy-settings/page.jsx
│   ├── (responder)/dashboard/page.jsx
│   ├── (responder)/identify/page.jsx
│   ├── (responder)/records/[id]/page.jsx  (lookup session ID, NOT raw token)
│   ├── (responder)/cases/page.jsx
│   ├── (responder)/cases/new/page.jsx
│   └── (responder)/cases/[id]/page.jsx
├── components/
│   ├── ui/
│   └── forms/
└── services/
    ├── api.js
    └── socket.js
```

---

## Phase 9 — Privacy & Admin

### Planned Files
```
apps/api/src/modules/
├── privacy/routes.js
├── audit/routes.js
└── organisations/routes.js

apps/web/src/app/
├── (admin)/dashboard/page.jsx
├── (admin)/organisations/page.jsx
├── (admin)/users/page.jsx
└── (admin)/audit/page.jsx
```

---

## Phase 10 — Automated Testing & Security Review

### Test Files
```
apps/api/tests/
├── unit/
│   ├── crypto.test.js
│   ├── schemas.test.js
│   └── authorization.test.js
├── integration/
│   ├── auth.test.js
│   ├── identification.test.js
│   ├── cases.test.js
│   └── audit.test.js
└── security/
    ├── cross-tenant.test.js
    ├── rate-limit.test.js
    └── session-expiry.test.js
```

---

## Definition of Done

The MVP is complete only when all 20 Definition of Done items from the master engineering spec are satisfied. See `docs/PROJECT_AUDIT.md` for the full list. Production deployment requires additional engineering, security, clinical workflow, privacy, and legal reviews.
