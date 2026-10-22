# MAXERY — Testing Strategy & Verification Plan

**Document Identifier:** `DOC-25`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Quality Assurance & Automated Verification  
**Test Frameworks:** Vitest (Unit & Integration) + Playwright (End-to-End)

---

## 1. Testing Pyramid & Methodology

```text
       / \
      / E2E \       Playwright: Cross-browser workflows, mobile viewports, scanner UI
     /-------\
    / Integr. \     Vitest Fastify .inject(): API routes, DB transactions, outbox jobs
   /-----------\
  /    Unit     \   Vitest: Zod validation schemas, token crypto, rate limit logic
 /---------------\
```

---

## 2. Test Suites & Coverage Breakdown

### 2.1 Unit Testing (Vitest — Fast, In-Memory)
- **Path:** `apps/api/tests/unit/` and `packages/shared/tests/`
- **Scope:**
  - Zod schema validation (valid and invalid inputs for all 10 schemas).
  - Cryptographic token generation, unguessability, and SHA-256 hashing.
  - Password derivation (scrypt verification).
  - API response envelope factories (`successResponse`, `errorResponse`).

### 2.2 Integration Testing (Vitest Fastify `.inject()`)
- **Path:** `apps/api/tests/integration/`
- **Scope:**
  - Route execution without external network overhead using Fastify's native `.inject()` method.
  - Health check probe (`GET /api/v1/health`) verifying DB connectivity.
  - Auth workflows (login, invalid password rejection, JWT generation).
  - Emergency QR token lookup (active token success vs. revoked token 410).
  - Rate limiting verification (confirming 429 after 30 lookups).
  - Transactional integrity (verifying `AuditEvent` and `OutboxEvent` are created during lookups).

### 2.3 End-to-End & Accessibility Testing (Playwright)
- **Path:** `tests/e2e/` and `tests/accessibility/`
- **Scope:**
  - Landing page rendering, navigation links, and responsiveness across viewports (360px to 1920px).
  - Form validation states on login and registration pages.
  - Automated `axe-core` accessibility audits scanning for WCAG 2.1 AA violations.

---

## 3. Test Data Strategy & Safety Guardrails

1. **PROHIBITION:** Real patient data, live phone numbers, or genuine Aadhaar/national IDs must NEVER be used in test suites or fixtures.
2. **Deterministic Synthetic Fixtures:** All test users and patients use synthetic development fixtures:
   - Email domain: `@test-maxery.local`
   - Patient code: `PT-DEMO-XXXX`
   - Phone numbers: Valid E.164 reserved test ranges (e.g., `+91 94480 XXXXX`).
3. **Database Isolation:** Integration tests run against an isolated PostgreSQL test database (`maxery_test`), reset between runs or wrapped in rolled-back transactions.
