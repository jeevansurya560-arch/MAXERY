# 34 — AUTHENTICATION & DATABASE TECHNICAL AUDIT & ARCHITECTURE PLAN

## Document Control
- **Document Version:** 1.0.0
- **Status:** APPROVED & PROPOSED
- **Date:** 2026-11-01
- **Focus:** Google OAuth 2.0 + Neon PostgreSQL + Better Auth Architecture
- **Classification:** Core Infrastructure & Security Specification

---

## 1. Initial Technical Audit Findings

### 1.1 Existing Authentication Inspection
- **Current Mechanism:** `apps/api/src/modules/auth/auth.routes.js` implements username/password authentication using Node.js `crypto.scrypt` password hashing and `@fastify/jwt` token signing.
- **Session Handling:** Stateless JWTs are returned directly in the JSON response payload (`{ data: { token, user } }`). The database `Session` model defined in `prisma/schema.prisma` is currently unpopulated during login.
- **Token Invalidation:** Missing server-side session revocation (`/auth/logout`). If a token is compromised, it cannot be revoked before its 24-hour expiration.
- **Frontend State:** `apps/web` currently possesses no authentication UI, no Google sign-in triggers, and no session management context/hook (`useSession`).
- **Google OAuth:** No OAuth 2.0 client, consent screen integration, or OpenID Connect callback handlers exist in the codebase.

### 1.2 Supabase Dependency Audit
- **Inspection Result:** Comprehensive grep of code and configuration confirms **zero Supabase dependencies** (`@supabase/supabase-js`, Supabase Auth, or Supabase storage) exist in the repository.
- **Database Driver:** Prisma ORM is configured natively with the `postgresql` provider.
- **Migration Impact:** Because there is no existing Supabase database or proprietary Supabase Auth schema, migration to Neon PostgreSQL requires no data extraction or foreign RLS unwinding. It is a direct configuration of Neon’s pooled and direct PostgreSQL connection strings.

### 1.3 Database Schema & Access Patterns
- **Prisma Schema:** `prisma/schema.prisma` contains 19 models including `User`, `Organisation`, `Session`, `Patient`, `PatientIdentifier`, `UnidentifiedCase`, `AuditEvent`, and `OutboxEvent`.
- **User Identity:** The `User` model currently uses `id (UUID)`, `email (unique)`, `passwordHash`, `firstName`, `lastName`, `role`, and `isActive`.
- **Database Connection:** Currently targets local PostgreSQL (`postgresql://...`). Neon PostgreSQL migration requires adding `directUrl` for migrations and pooler support for application runtime queries.

### 1.4 Neon Compute Lifecycle & Wake-up Tolerance
- **Neon Architecture:** Neon Free Tier automatically suspends inactive compute instances after ~5 minutes. Resuming from suspension takes 1.0s to 3.5s upon the first incoming query.
- **Risk:** Without proper connection timeout parameters, initial cold queries can fail with `P1001: Can't reach database server`.
- **Solution:** Configure `connect_timeout=15&pool_timeout=15` on the pooled connection string, and implement graceful database connection retries in the Fastify Prisma plugin.

---

## 2. Authentication Architecture Decision: Better Auth vs. Native Hybrid

### 2.1 Evaluation of Better Auth
- **Compatibility:** `better-auth` v1.7.14 provides built-in Google OAuth 2.0, OpenID Connect profile extraction, session management via HttpOnly cookies, and native Prisma adapter support.
- **Architectural Boundary:**
  - Fastify (`apps/api`) serves as the single source of truth for all API requests on port 4000.
  - Better Auth is mounted on Fastify via `toNodeHandler(auth)` at `/api/auth/*`.
  - Next.js (`apps/web`) communicates with Fastify over CORS with credentials (`credentials: 'include'`).
  - Session cookies are issued as `HttpOnly; SameSite=Lax; Path=/` with `Secure` flag enabled in production.
- **Compliance with Project Rules:**
  - Preserves the **"Zero Next.js API Routes"** rule.
  - Preserves pure JavaScript (`.js`, `.jsx`) without introducing TypeScript.
  - Keeps database access exclusively on the Fastify server side.

---

## 3. Database Schema Evolution (Neon + Better Auth)

To support Google OAuth accounts, session persistence, and email verification alongside MAXERY’s existing clinical models, the `prisma/schema.prisma` schema is updated:

### 3.1 Schema Adjustments
1. **`User` Model:**
   - Add `name String?` (Better Auth standard name).
   - Add `emailVerified Boolean @default(false)`.
   - Add `image String?` (Google avatar URL).
   - Make `passwordHash String?` optional (Google OAuth users do not have a local password).
   - Add relation `accounts Account[]`.
2. **`Account` Model (New):**
   - Stores OAuth identities (`providerId = "google"`, `accountId = Google sub ID`, tokens, scopes).
   - Foreign key to `User` with `onDelete: Cascade`.
   - `@@unique([providerId, accountId])` prevents duplicate accounts.
3. **`Session` Model:**
   - Align with Better Auth: `token String @unique`, `expiresAt DateTime`, `ipAddress String?`, `userAgent String?`, `createdAt DateTime`, `updatedAt DateTime`.
4. **`Verification` Model (New):**
   - For email verification tokens and OAuth state management: `identifier String`, `value String`, `expiresAt DateTime`.

---

## 4. Google OAuth 2.0 Lifecycle & Security Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as Citizen / Responder
    participant Web as Next.js Web (Port 3000)
    participant API as Fastify API (Port 4000)
    participant Google as Google Identity Services
    participant DB as Neon PostgreSQL

    User->>Web: Clicks "Continue with Google"
    Web->>API: GET /api/auth/sign-in/social?provider=google
    API->>API: Generate PKCE & cryptographically random state
    API-->>Web: Redirect to accounts.google.com/o/oauth2/v2/auth
    Web->>Google: Authenticates & grants profile/email scope
    Google-->>API: Callback to /api/auth/callback/google?code=...&state=...
    API->>Google: Exchange authorization code for tokens (Server-to-Server)
    Google-->>API: Return id_token & user profile
    API->>DB: Atomic Transaction: Find or create User & Account
    API->>DB: Create persistent Session record
    API-->>Web: Set-Cookie: maxery_session=...; HttpOnly; SameSite=Lax; Path=/
    API-->>Web: 302 Redirect to / (or requested protected route)
    Web->>API: GET /api/auth/get-session (Cookie attached)
    API-->>Web: Return authenticated user profile & roles
```

---

## 5. Security & Isolation Directives

1. **HttpOnly Cookies:** Session tokens are delivered exclusively via `HttpOnly; SameSite=Lax` cookies. Zero JWTs or session secrets are stored in browser `localStorage`.
2. **Credential Segregation:**
   - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are stored only in `apps/api/.env` and platform secrets.
   - `GOOGLE_CLIENT_SECRET` is **never exposed** to `apps/web` or browser JavaScript.
3. **Safe Account Linking:** An existing email address is linked to Google OAuth only when Google has verified email ownership (`email_verified: true`).
4. **CORS Hardening:** Fastify allows explicit origin `http://localhost:3000` with `credentials: true`. Wildcard origins (`*`) are strictly prohibited with credentialed requests.

---

## 6. Phased Implementation Roadmap

- [ ] **Phase 1: Neon Database Configuration & Prisma Schema Migration**
  - Configure `DATABASE_URL` (pooled) and `DIRECT_URL` (direct) in `.env.example` and environment files.
  - Update `prisma/schema.prisma` with `Account`, `Verification`, and updated `User`/`Session`.
  - Add Neon connection retry and timeout handling in Prisma database infrastructure.
- [ ] **Phase 2: Better Auth Backend Integration on Fastify**
  - Install `better-auth` in `apps/api`.
  - Configure Better Auth instance with Prisma adapter and Google OAuth provider.
  - Mount Better Auth route handlers onto Fastify under `/api/auth/*`.
  - Connect authentication middleware to verify sessions on protected Fastify endpoints.
- [ ] **Phase 3: Frontend Authentication UI & Session Context**
  - Create `apps/web/src/lib/auth-client.js` exporting the Better Auth browser client.
  - Create `AuthModal.jsx` featuring the Google OAuth sign-in trigger, loading state, and error handling.
  - Integrate user profile / sign-in button into `Navbar.jsx`.
- [ ] **Phase 4: Automated Verification & Test Suite**
  - Add unit and integration tests verifying session verification, Google provider configurations, and protected route access.
  - Run lint and build checks.
- [ ] **Phase 5: Final Delivery Documentation**
  - Document all environment variables, migration steps, and deployment procedures.
