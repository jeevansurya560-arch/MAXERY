# MAXERY — Implementation Roadmap

**Document Identifier:** `DOC-28`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Engineering Roadmap & Milestones  
**Governance:** Gate-Checked Phased Delivery

---

## 1. Staged Implementation Sequence

```
+-----------------------------------------------------------------------------------+
| PHASE 0: COMPLETE DOCUMENTATION BEFORE CODE [CURRENT STAGE]                      |
| - 33 Master specifications, architecture diagrams, legal drafts, ADRs             |
| - Approval Gate: Explicit sign-off required prior to Phase 1                      |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
| PHASE 1: REPOSITORY FOUNDATION & WORKSPACE BOOTSTRAP                              |
| - npm workspaces setup, ESLint 9 Flat Config, Prettier, EditorConfig, .env templates |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
| PHASE 2: RUNNABLE APPLICATION SKELETONS & HEALTH CHECKS                           |
| - Next.js 15 frontend on Port 3000 (Vanilla CSS tokens, root layout)               |
| - Fastify backend on Port 4000 (GET /api/v1/health probe)                         |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
| PHASE 3: AUTHORITATIVE PERSISTENCE & PRISMA ENGINE                                |
| - PostgreSQL 16 container, Prisma 6 schema with 15 entities & indexes              |
| - Deterministic synthetic dev seed script with production safety check            |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
| PHASE 4: SHARED DOMAIN CONTRACTS & VALIDATION                                     |
| - @maxery/shared library with Zod schemas, enums, constants & API envelopes       |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
| PHASE 5: SECURITY FOUNDATIONS & AUTHENTICATION SCAFFOLDING                        |
| - Fastify JWT plugin, password derivation, rate limiters, audit logging engine    |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
| PHASE 6: CORE EMERGENCY DATA WORKFLOWS                                            |
| - Patient registration, opaque QR lookup, unidentified cases, contact logging     |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
| PHASE 7: REAL-TIME COLLABORATION & RELIABILITY                                    |
| - Authenticated Socket.IO rooms, transactional outbox background worker           |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
| PHASE 8: AUTOMATED VERIFICATION & QUALITY AUDIT                                   |
| - Vitest unit & integration tests, Playwright E2E audits, CI pipeline validation  |
+-----------------------------------------------------------------------------------+
```

---

## 2. Definition of Done (DoD) per Phase

- **Phase 0:** All 33 documentation files written completely with zero placeholder stubs, verified for cross-document consistency, and formally presented for approval.
- **Phases 1-3:** `npm install` passes cleanly across all workspaces; `npx prisma db push` or `prisma migrate dev` executes without SQL errors; `npm run db:seed` inserts synthetic dev test data.
- **Phases 4-6:** Fastify routes respond with valid JSON adhering to standard response envelopes; Zod validation blocks malformed inputs; audit logs record sensitive reads and writes.
- **Phases 7-8:** Socket.IO events fire reliably via outbox polling; Vitest passes 100% of tests; no TypeScript files exist in the monorepo.
