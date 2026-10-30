# MAXERY — Project Audit

**Auditor:** Engineering Lead  
**Date:** 2026-10-30  
**Repository:** MAXERY — Secure Emergency Identification & Trusted-Contact Coordination Platform  
**Status:** Phase 0 — Pre-Implementation Audit

---

## Audit Summary

The repository is a well-structured **pre-implementation scaffold**. All 33 architectural
specification documents exist and are coherent. The monorepo workspace is correctly configured.
The shared contract library, Prisma schema, seed script, and API configuration module are the
only executable code present. No functional backend server, no frontend pages, and no
automated tests exist yet.

---

## 1. Existing Working Functionality

| Item | Status | Notes |
|---|---|---|
| npm workspaces (`apps/*`, `packages/*`) | WORKING | Correctly defined in root `package.json`. |
| ESLint 9 Flat Config | WORKING | Covers `.js`, `.mjs`, `.jsx`; correctly excludes build dirs. |
| Prettier 3 | WORKING | Config present at `.prettierrc.json`. |
| EditorConfig | WORKING | `.editorconfig` present. |
| Docker Compose (Postgres 16 + Redis 7) | WORKING | `docker-compose.yml` with health checks. Local port 5432 not currently listening. |
| `.env.example` templates (root + api) | WORKING | Provides all required variables. |
| `scripts/setup.js` | WORKING | Copies `.env.example` → `.env` for each workspace. |
| `scripts/check-environment.js` | WORKING | Node version check + .env file existence check. |
| `packages/shared` exports | WORKING | Correctly exports `enums`, `constants`, `schemas`, `api-contracts` as separate sub-paths. |
| `packages/shared/src/enums/index.js` | WORKING | All 14 domain enums correctly defined. |
| `packages/shared/src/constants/index.js` | WORKING | Socket event names, API prefix, disclaimers, security limits. |
| `packages/shared/src/api-contracts/index.js` | WORKING | `successResponse()` and `errorResponse()` factories. |
| `packages/shared/src/schemas/index.js` | PARTIAL | 10 Zod schemas present; several have structural deficiencies (see below). |
| `apps/api/src/config/index.js` | WORKING | Zod-validated environment configuration with dotenv loading. |
| `prisma/schema.prisma` | PARTIAL | 15 entities defined with correct relationships. Several security and provenance gaps (see below). |
| `prisma/seed.js` | PARTIAL | Creates synthetic data correctly. Uses insecure fixed-salt scrypt. |
| `.github/workflows/ci.yml` | WORKING | Verifies zero TypeScript, 33 docs present, runs check-environment. |
| GitHub CI security workflow | WORKING | `security-checks.yml` present. |
| All 33 `docs/*.md` specifications | WORKING | Complete design documentation. |

---

## 2. Incomplete Functionality

| Item | Classification | Details |
|---|---|---|
| `apps/api/src/server.js` | CRITICAL | Does not exist. No Fastify server can start. |
| `apps/api/src/app.js` | CRITICAL | Does not exist. No Fastify app factory. |
| `apps/api/src/plugins/` | CRITICAL | Entirely absent. No JWT, Helmet, CORS, rate-limit, Prisma, or logger plugins. |
| `apps/api/src/modules/` | CRITICAL | Entirely absent. No REST route handlers exist. |
| `apps/api/src/realtime/` | CRITICAL | Entirely absent. No Socket.IO server. |
| `apps/api/src/jobs/` | CRITICAL | Entirely absent. No transactional outbox publisher. |
| `apps/api/src/security/` | CRITICAL | Entirely absent. No token generator, hasher, or sanitizer. |
| `apps/api/src/middleware/` | CRITICAL | Entirely absent. No authentication or authorization guards. |
| `apps/web/src/` | CRITICAL | Entirely absent. No Next.js pages, layouts, or components. |
| `prisma/migrations/` | HIGH | No migrations directory. Schema has never been applied with `prisma migrate dev`. |
| `Session` model in Prisma | CRITICAL | Missing. Sessions must be server-managed. |
| `IdempotencyRecord` model | HIGH | Missing. Case creation lacks duplicate-request protection. |
| `CaseAssignment` model | HIGH | Missing. No explicit case ownership record. |
| `CaseTransfer` / handover | HIGH | Missing. No transfer workflow support. |
| Automated tests (`tests/`, `apps/api/tests/`) | CRITICAL | Zero test files exist. |
| `apps/web/.env.example` | LOW | Referenced in `setup.js` but the file does not exist. |
| `next.config.mjs` | HIGH | Referenced in docs but file not present in `apps/web/`. |

---

## 3. Security Problems

| Finding | Classification | Details |
|---|---|---|
| **Raw QR token stored in DB** | CRITICAL | `PatientIdentifier.publicToken` stores the raw token in PostgreSQL. If the database is compromised, all active QR tokens are immediately exposed. Only the SHA-256 hash (`tokenHash`) should be stored. |
| **Fixed salt in seed scrypt** | HIGH | `prisma/seed.js` uses `crypto.scryptSync(password, 'maxery_dev_salt_fixed', 64)`. This is acceptable for deterministic synthetic seed data only. Production password hashing must use a unique random per-password salt. Seed comment says this; real auth module must enforce it. |
| **JWT default secret in config** | CRITICAL | `apps/api/src/config/index.js` line 28: `JWT_SECRET: process.env.JWT_SECRET || 'maxery_default_dev_secret_key_minimum_32_chars_long'`. A hardcoded fallback secret means any service without `JWT_SECRET` set silently uses a known, public, insecure key. This must fail-fast instead. |
| **No CSRF protection planned** | HIGH | Cookie-authenticated sessions require CSRF tokens or SameSite=Strict + Origin header validation for all state-changing requests. |
| **Anonymous QR scan endpoint** | HIGH | The API specification includes no guard preventing an unauthenticated request from receiving any confirmation of a token's existence. Uniform error responses for all lookup failures (invalid, revoked, expired) are required. |
| **No session model** | CRITICAL | Without a `Session` table, server-side revocation is impossible. A compromised or logged-out JWT remains valid until expiry. |
| **Token URL exposure** | HIGH | `DOC-04` references route `/responder/patient-records/[token]` — the raw QR token would appear in browser URLs, history, analytics, and referrer headers. Route must use an ephemeral lookup session ID instead. |
| **No log redaction implementation** | HIGH | Planned in docs but no redaction plugin or allowlist-based logger exists. |
| **No rate-limiting implementation** | HIGH | Planned but not implemented. All endpoints are currently unprotected. |

---

## 4. Database Design Problems

| Finding | Classification | Details |
|---|---|---|
| **`publicToken` stored in plaintext** | CRITICAL | `PatientIdentifier` should store only `tokenHash` (SHA-256). The field `publicToken` must be removed from the persistent record or replaced with the hash field only. |
| **No `Session` table** | CRITICAL | Required for server-side session management, idle timeouts, and immediate revocation. |
| **No `IdempotencyRecord` table** | HIGH | Required for safe concurrent case creation without duplicate case numbers. |
| **No `CaseAssignment` table** | HIGH | Current `UnidentifiedCase` has only `responderUserId` — no explicit assignment lifecycle. |
| **No `CaseTransfer` table** | HIGH | No cross-organization handover record. |
| **`MedicalInformation` missing provenance fields** | HIGH | Missing: `verificationMethod`, `sourceReference`, `recordedAt`, `lastReviewedAt`, `effectiveFrom`, `effectiveUntil`, `isActive`, `disputedAt`. |
| **`EmergencyContact` missing safety fields** | HIGH | Missing: `contactSafetyStatus`, `restrictionReasonCategory`, `safeContactWindow`, `lastVerifiedAt`. |
| **Seed uses scrypt with fixed salt** | MEDIUM | Acceptable for dev only; must be blocked in production. Seed already has `NODE_ENV === 'production'` guard — this is correct. |
| **No `IdentificationAttempt.accessReason` index** | LOW | High-frequency lookups and audit queries would benefit from indexed `responderUserId + createdAt`. |
| **`User.passwordHash` stores fixed-salt hash in seed** | MEDIUM | No issue in production if proper random-salt hashing is used. Seed comment explains this. |

---

## 5. Duplicate Code

| Finding | Classification | Details |
|---|---|---|
| `zod` appears in `packages/shared/package.json` AND `apps/api/package.json` | LOW | Both workspaces need Zod. This is acceptable — `@maxery/shared` uses Zod internally, and `apps/api` uses it for route validation. npm workspaces may hoist appropriately. |
| No other duplication found (codebase is pre-implementation) | — | — |

---

## 6. Missing Components

| Component | Classification |
|---|---|
| `apps/api/src/server.js` | CRITICAL |
| `apps/api/src/app.js` | CRITICAL |
| `apps/api/src/plugins/` (all plugins) | CRITICAL |
| `apps/api/src/modules/` (all route modules) | CRITICAL |
| `apps/api/src/security/crypto.js` | CRITICAL |
| `apps/api/src/middleware/authenticate.js` | CRITICAL |
| `apps/api/src/middleware/authorize.js` | CRITICAL |
| `apps/api/src/jobs/outbox-publisher.js` | HIGH |
| `apps/api/src/realtime/socket-server.js` | HIGH |
| `apps/web/src/app/` (all pages) | HIGH |
| `apps/web/next.config.mjs` | HIGH |
| `Prisma Session model` | CRITICAL |
| `Prisma IdempotencyRecord model` | HIGH |
| `Prisma CaseAssignment model` | HIGH |
| `Prisma CaseTransfer model` | HIGH |
| All automated test suites | CRITICAL |
| `docs/PRIVACY_AND_DATA_HANDLING.md` | HIGH |

---

## 7. Dependency Problems

| Finding | Classification | Details |
|---|---|---|
| Root `package.json` has no `"type": "module"` | MEDIUM | `scripts/check-environment.js` and `scripts/setup.js` use ES module syntax. Node.js 24 emits a reparsing performance warning. Add `"type": "module"` to root `package.json`. |
| `apps/web/package.json` has no `zod` dependency | LOW | If forms ever validate client-side with `@maxery/shared` Zod schemas, the package is an indirect dependency only. Acceptable for now. |
| No password hashing library listed | HIGH | `apps/api/package.json` has no `bcrypt`, `argon2`, or equivalent. Node's native `crypto.scrypt` works but requires careful salt management. Recommend sticking with native `crypto.scrypt` to avoid new dependencies, with correct per-password random salts. |
| No CSRF library listed | HIGH | `@fastify/csrf-protection` is not in `apps/api/package.json`. Must be added when cookie-based sessions are implemented. |
| `npm install` has never been run | MEDIUM | No `node_modules/` or `package-lock.json` present. Running `npm install` is required before any other command. |

---

## 8. Build and Runtime Problems

| Finding | Classification | Details |
|---|---|---|
| No Fastify server — `npm run dev:api` fails | CRITICAL | `package.json` script `dev:api` invokes `node --watch src/server.js`, which does not exist. |
| `npm run dev:web` fails | CRITICAL | Next.js app has no source files — `next dev` will error with no root layout. |
| `npm run test` fails | HIGH | No test files exist; Vitest runner finds nothing. |
| `npm run db:push` will fail without a running Postgres | HIGH | Port 5432 is not reachable in the current environment. Docker must be started. |
| Root `package.json` missing `"type": "module"` causes Node.js warning | MEDIUM | Harmless but noisy. |

---

## 9. Recommended Corrections (Priority Order)

1. **(CRITICAL)** Remove `publicToken` from `PatientIdentifier`; keep only `tokenHash` (SHA-256).
2. **(CRITICAL)** Add `Session` model to Prisma schema.
3. **(CRITICAL)** Remove hardcoded JWT secret fallback — fail-fast if `JWT_SECRET` is unset.
4. **(CRITICAL)** Add `server.js`, `app.js`, all plugins, middleware, and modules to `apps/api/src/`.
5. **(CRITICAL)** Add automated unit and integration tests.
6. **(HIGH)** Add `IdempotencyRecord`, `CaseAssignment`, `CaseTransfer` models.
7. **(HIGH)** Extend `MedicalInformation` with full provenance fields.
8. **(HIGH)** Extend `EmergencyContact` with safety status fields.
9. **(HIGH)** Add `"type": "module"` to root `package.json`.
10. **(HIGH)** Add `apps/web/next.config.mjs` and `apps/web/.env.example`.
11. **(HIGH)** Add `@fastify/csrf-protection` and `@fastify/cookie` to `apps/api`.
12. **(HIGH)** Replace JWT-based sessions with server-managed opaque session tokens in `Session` table.
13. **(MEDIUM)** Create `prisma/migrations/` by running `prisma migrate dev --name init`.
14. **(MEDIUM)** Add `docs/PRIVACY_AND_DATA_HANDLING.md`.
15. **(LOW)** Delete/rename route pattern `[token]` → `[lookupId]` in frontend architecture.
