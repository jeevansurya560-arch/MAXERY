# MAXERY — Secure Emergency Identification & Trusted-Contact Coordination Platform

[![CI Pipeline](https://github.com/jeevansurya560-arch/MAXERY/actions/workflows/ci.yml/badge.svg)](https://github.com/jeevansurya560-arch/MAXERY/actions/workflows/ci.yml)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![Fastify](https://img.shields.io/badge/Fastify-v5-black.svg)](https://fastify.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **LIFE-SAFETY DISCLAIMER:**  
> MAXERY is an emergency identification and contact coordination platform. It does not provide medical advice, diagnosis, or clinical triage, and does **NOT** replace emergency medical services, paramedic care, or hospital transport. In any acute medical emergency, immediately contact national emergency services (e.g., dial **112** in India).

---

## 1. Project Overview & Mission

**MAXERY** is engineered to eliminate critical minutes lost during acute medical emergencies when an individual is incapacitated, disoriented, or unconscious and cannot articulate their identity, lethal drug allergies (e.g., Penicillin anaphylaxis), or emergency contacts.

### The Inviolable Core Principles
1. **Zero-PII Identifiers:** Physical QR codes, wristbands, and cards encode **zero raw Personal Identifiable Information (PII)** and **zero Protected Health Information (PHI)**. They contain solely cryptographically unguessable, opaque random tokens requiring authenticated, audited backend resolution.
2. **Strict Hierarchy of Identification:**
   - **Tier 1 (Primary):** MAXERY Secure QR Token Lookup.
   - **Tier 1 (Primary):** Accessible Phone Medical ID Inspection (lock-screen).
   - **Tier 2 (Restricted / Future):** Human-reviewed facial feature review (non-operational in current release).
   - **Tier 2 (Restricted / Future):** Biometric fingerprint matching (non-operational in current release).
   - **Mandatory Fallback:** Unidentified-Patient Case Management.
3. **Responders Never Face a Dead End:** If identification fails or is unavailable, responders immediately transition to creating and tracking an active case in the **Unidentified Case Registry**, ensuring patient tracking and triage coordination continue without delay.
4. **Statutory Privacy by Design:** Fully designed for compliance with the Indian **Digital Personal Data Protection Act, 2023 (DPDPA)**, the **Information Technology Act, 2000**, and **CERT-In Cybersecurity Directions**.

---

## 2. Technology Stack

- **Frontend:** Next.js 15 (App Router) + React (JavaScript and JSX only — **Zero TypeScript**).
- **Backend:** Node.js (v20+ LTS) + Fastify (v5) modular monolith (dedicated REST & Socket.IO server).
- **Database & ORM:** PostgreSQL 16 + Prisma ORM 6.
- **Validation Engine:** Zod (shared across frontend forms and backend routes via `@maxery/shared`).
- **Real-Time Layer:** Socket.IO v4 with Transactional Outbox Pattern.
- **Cache & Throttling:** Redis 7 (strictly for rate-limiting counters and JWT revocation — **no PHI caching**).
- **Monorepo:** npm workspaces (`apps/web`, `apps/api`, `packages/shared`).
- **Testing:** Vitest (unit/integration) and Playwright (end-to-end & accessibility).
- **Code Quality:** ESLint 9 (Flat Config) and Prettier 3.

---

## 3. Repository Architecture

```text
MAXERY/
├── apps/
│   ├── web/               # Next.js Presentation Frontend (Port 3000)
│   └── api/               # Fastify Dedicated API & Socket.IO Backend (Port 4000)
├── packages/
│   └── shared/            # Shared Zod Schemas, Enums, Constants, Contracts (@maxery/shared)
├── prisma/
│   ├── schema.prisma      # Authoritative PostgreSQL Relational Schema (15 Entities)
│   ├── migrations/        # Deterministic SQL Migrations
│   └── seed.js            # Safe Synthetic Development Seed Script (with Prod Guard)
├── docs/                  # 33 Complete Architecture & Statutory Specifications
├── infra/                 # Dockerfiles, scripts, monitoring configurations
├── tests/                 # Playwright E2E and axe-core accessibility test suites
├── scripts/               # Setup and environment diagnostics
├── docker-compose.yml     # Local PostgreSQL 16 & Redis 7 services
└── package.json           # Root workspace configuration
```

---

## 4. Complete Documentation Index (`docs/`)

The platform is fully specified across 33 comprehensive architectural documents before code implementation:

| Doc ID | Specification Document | Description |
|---|---|---|
| `DOC-00` | [00-PROJECT-OVERVIEW.md](file:///c:/Users/user/Desktop/MAXERY/docs/00-PROJECT-OVERVIEW.md) | Mission, problem statement, core principles, target personas. |
| `DOC-01` | [01-PRODUCT-REQUIREMENTS.md](file:///c:/Users/user/Desktop/MAXERY/docs/01-PRODUCT-REQUIREMENTS.md) | Functional (`FR-xxx`) and Non-Functional (`NFR-xxx`) requirements. |
| `DOC-02` | [02-SYSTEM-ARCHITECTURE.md](file:///c:/Users/user/Desktop/MAXERY/docs/02-SYSTEM-ARCHITECTURE.md) | Modular monolith architecture, data flows, trust boundaries. |
| `DOC-03` | [03-TECHNOLOGY-STACK.md](file:///c:/Users/user/Desktop/MAXERY/docs/03-TECHNOLOGY-STACK.md) | Technology choices, versions, and stack prohibitions. |
| `DOC-04` | [04-REPOSITORY-STRUCTURE.md](file:///c:/Users/user/Desktop/MAXERY/docs/04-REPOSITORY-STRUCTURE.md) | Complete directory layout and file responsibilities. |
| `DOC-05` | [05-DATABASE-DESIGN.md](file:///c:/Users/user/Desktop/MAXERY/docs/05-DATABASE-DESIGN.md) | ER diagram, 15 entity definitions, indexes, transaction boundaries. |
| `DOC-06` | [06-API-SPECIFICATION.md](file:///c:/Users/user/Desktop/MAXERY/docs/06-API-SPECIFICATION.md) | Versioned `/api/v1` REST contracts, envelopes, and rate limits. |
| `DOC-07` | [07-USER-ROLES-AND-PERMISSIONS.md](file:///c:/Users/user/Desktop/MAXERY/docs/07-USER-ROLES-AND-PERMISSIONS.md) | Granular RBAC permissions matrix and security enforcement rules. |
| `DOC-08` | [08-IDENTIFICATION-WORKFLOWS.md](file:///c:/Users/user/Desktop/MAXERY/docs/08-IDENTIFICATION-WORKFLOWS.md) | 4-tier identification hierarchy and fallback case workflow. |
| `DOC-09` | [09-EMERGENCY-CASE-WORKFLOWS.md](file:///c:/Users/user/Desktop/MAXERY/docs/09-EMERGENCY-CASE-WORKFLOWS.md) | Unidentified patient state machine and clinical triage rules. |
| `DOC-10` | [10-TRUSTED-CONTACTS.md](file:///c:/Users/user/Desktop/MAXERY/docs/10-TRUSTED-CONTACTS.md) | Contact priority tiers, attempt tracking, domestic safety rules. |
| `DOC-11` | [11-REALTIME-ARCHITECTURE.md](file:///c:/Users/user/Desktop/MAXERY/docs/11-REALTIME-ARCHITECTURE.md) | Socket.IO event contracts, room authorization, transactional outbox. |
| `DOC-12` | [12-CACHING-STRATEGY.md](file:///c:/Users/user/Desktop/MAXERY/docs/12-CACHING-STRATEGY.md) | Redis scope, PHI caching prohibition, failure degradation. |
| `DOC-13` | [13-SECURITY-ARCHITECTURE.md](file:///c:/Users/user/Desktop/MAXERY/docs/13-SECURITY-ARCHITECTURE.md) | Defense-in-depth, crypto standards, planned vs verified controls. |
| `DOC-14` | [14-THREAT-MODEL.md](file:///c:/Users/user/Desktop/MAXERY/docs/14-THREAT-MODEL.md) | STRIDE attack scenarios, stolen QR cards, insider misuse mitigations. |
| `DOC-15` | [15-PRIVACY-POLICY-DRAFT.md](file:///c:/Users/user/Desktop/MAXERY/docs/15-PRIVACY-POLICY-DRAFT.md) | Statutory draft privacy policy aligned with Indian DPDPA 2023. |
| `DOC-16` | [16-TERMS-AND-CONDITIONS-DRAFT.md](file:///c:/Users/user/Desktop/MAXERY/docs/16-TERMS-AND-CONDITIONS-DRAFT.md) | Terms of service, emergency disclaimers, responder conduct code. |
| `DOC-17` | [17-CONSENT-AND-PRIVACY-NOTICES.md](file:///c:/Users/user/Desktop/MAXERY/docs/17-CONSENT-AND-PRIVACY-NOTICES.md) | Statutory notice templates under Sections 5, 6, and 7 of DPDPA. |
| `DOC-18` | [18-EMERGENCY-ACCESS-POLICY.md](file:///c:/Users/user/Desktop/MAXERY/docs/18-EMERGENCY-ACCESS-POLICY.md) | Break-glass emergency lookup authorization and post-incident audits. |
| `DOC-19` | [19-BIOMETRIC-IDENTIFICATION-POLICY.md](file:///c:/Users/user/Desktop/MAXERY/docs/19-BIOMETRIC-IDENTIFICATION-POLICY.md) | Non-operational status declaration and anti-surveillance rules. |
| `DOC-20` | [20-DATA-RETENTION-AND-DELETION.md](file:///c:/Users/user/Desktop/MAXERY/docs/20-DATA-RETENTION-AND-DELETION.md) | Retention schedules, erasure workflows, CERT-In log retention. |
| `DOC-21` | [21-INCIDENT-RESPONSE-PLAN.md](file:///c:/Users/user/Desktop/MAXERY/docs/21-INCIDENT-RESPONSE-PLAN.md) | Severity matrix, containment, mandatory CERT-In 6-hour reporting. |
| `DOC-22` | [22-GRIEVANCE-AND-PRIVACY-REQUESTS.md](file:///c:/Users/user/Desktop/MAXERY/docs/22-GRIEVANCE-AND-PRIVACY-REQUESTS.md) | Grievance redressal SLAs and escalation to Data Protection Board. |
| `DOC-23` | [23-UI-UX-SPECIFICATION.md](file:///c:/Users/user/Desktop/MAXERY/docs/23-UI-UX-SPECIFICATION.md) | Visual tokens, high-acuity screen states, responsive viewports. |
| `DOC-24` | [24-ACCESSIBILITY-REQUIREMENTS.md](file:///c:/Users/user/Desktop/MAXERY/docs/24-ACCESSIBILITY-REQUIREMENTS.md) | WCAG 2.1 AA compliance, 7:1 contrast, glove-friendly touch targets. |
| `DOC-25` | [25-TESTING-STRATEGY.md](file:///c:/Users/user/Desktop/MAXERY/docs/25-TESTING-STRATEGY.md) | Unit, integration, E2E test matrix, synthetic test data rules. |
| `DOC-26` | [26-DEPLOYMENT-PLAN.md](file:///c:/Users/user/Desktop/MAXERY/docs/26-DEPLOYMENT-PLAN.md) | Production topology, Docker orchestration, zero-downtime migrations. |
| `DOC-27` | [27-BACKUP-AND-RECOVERY.md](file:///c:/Users/user/Desktop/MAXERY/docs/27-BACKUP-AND-RECOVERY.md) | RPO < 5 min, RTO < 30 min, WAL archiving, monthly restore drills. |
| `DOC-28` | [28-IMPLEMENTATION-ROADMAP.md](file:///c:/Users/user/Desktop/MAXERY/docs/28-IMPLEMENTATION-ROADMAP.md) | 8-phase gate-checked roadmap with Definition of Done. |
| `DOC-29` | [29-ENVIRONMENT-CONFIGURATION.md](file:///c:/Users/user/Desktop/MAXERY/docs/29-ENVIRONMENT-CONFIGURATION.md) | Master environment variables schema and production checklist. |
| `DOC-30` | [30-ERROR-HANDLING-AND-LOGGING.md](file:///c:/Users/user/Desktop/MAXERY/docs/30-ERROR-HANDLING-AND-LOGGING.md) | Standardized error codes and automated PII/PHI log redaction. |
| `DOC-31` | [31-ASSUMPTIONS-AND-OPEN-QUESTIONS.md](file:///c:/Users/user/Desktop/MAXERY/docs/31-ASSUMPTIONS-AND-OPEN-QUESTIONS.md) | Honest boundaries, non-operational boundaries, open legal questions. |
| `DOC-32` | [32-ARCHITECTURE-DECISION-RECORDS.md](file:///c:/Users/user/Desktop/MAXERY/docs/32-ARCHITECTURE-DECISION-RECORDS.md) | 7 Michael Nygard ADRs documenting key technical choices. |

---

## 5. Local Development Quickstart

### Prerequisites
- **Node.js:** `>= 20.0.0 LTS`
- **npm:** `>= 10.0.0`
- **Docker Compose:** (For local PostgreSQL 16 & Redis 7) or locally installed PostgreSQL 16.

### Setup Instructions
```bash
# 1. Clone and enter repository
cd MAXERY

# 2. Initialize environment files from templates
npm run setup

# 3. Start local infrastructure containers (if using Docker)
docker compose up -d

# 4. Install workspace dependencies
npm install

# 5. Generate Prisma Client and apply schema
npm run db:generate
npm run db:push

# 6. Seed synthetic development data (guarded against production)
npm run db:seed

# 7. Start both Frontend (3000) and API Backend (4000) in watch mode
npm run dev
```

### Verification & Automated Testing
```bash
# Run environment diagnostics
npm run check:env

# Run Vitest test suites
npm run test

# Run ESLint across all workspaces
npm run lint
```
