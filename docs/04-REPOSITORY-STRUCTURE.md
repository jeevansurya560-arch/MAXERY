# MAXERY — Repository Structure

**Document Identifier:** `DOC-04`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Engineering Directory Standards & Layout

---

## 1. Master Repository Directory Tree

```text
MAXERY/
├── apps/
│   ├── web/                              # Next.js Frontend Application (Port 3000)
│   │   ├── public/                       # Static public assets (SVGs, icons, logos)
│   │   │   ├── branding/                 # Brand assets and logos
│   │   │   ├── icons/                    # Emergency and UI icons
│   │   │   └── images/                   # Static instructional diagrams
│   │   ├── src/
│   │   │   ├── app/                      # Next.js App Router root
│   │   │   │   ├── (public)/             # Unauthenticated public informational pages
│   │   │   │   │   ├── page.jsx          # Public landing page with emergency overview
│   │   │   │   │   ├── how-it-works/     # Detailed operational workflow explanation
│   │   │   │   │   ├── safety/           # Safety disclosures & medical disclaimers
│   │   │   │   │   ├── privacy/          # Draft statutory privacy policy
│   │   │   │   │   ├── terms/            # Draft terms of service & responder conduct
│   │   │   │   │   ├── accessibility/    # WCAG 2.1 AA accessibility statement
│   │   │   │   │   └── contact/          # Support, contact & grievance details
│   │   │   │   ├── (auth)/               # Authentication interfaces
│   │   │   │   │   ├── login/            # Secure login form (email + password)
│   │   │   │   │   ├── register/         # Account registration
│   │   │   │   │   └── account-recovery/ # Account recovery & emergency PIN reset
│   │   │   │   ├── (patient)/            # Patient portal (protected)
│   │   │   │   │   ├── dashboard/        # Patient overview & QR identifier status
│   │   │   │   │   ├── profile/          # Demographics & primary language
│   │   │   │   │   ├── medical-information/ # Allergies, medications, condition records
│   │   │   │   │   ├── emergency-contacts/  # Primary/secondary trusted contact configuration
│   │   │   │   │   ├── emergency-id/     # QR card preview, download & token revoke
│   │   │   │   │   └── privacy-settings/ # DPDPA consent, export & deletion requests
│   │   │   │   ├── (responder)/          # Authorized responder field app (protected)
│   │   │   │   │   ├── dashboard/        # Responder quick actions & active cases
│   │   │   │   │   ├── identify/         # High-speed QR scanner & token input
│   │   │   │   │   ├── cases/            # Unidentified patient registry & creation
│   │   │   │   │   ├── patient-records/  # Active emergency record view
│   │   │   │   │   └── notifications/    # Alert broadcasts & triage notifications
│   │   │   │   ├── (admin)/              # Institutional administrator portal (protected)
│   │   │   │   │   ├── dashboard/        # System health & institutional caseload
│   │   │   │   │   ├── organisations/    # Ambulance & hospital unit configuration
│   │   │   │   │   ├── users/            # Responder credentialing & role management
│   │   │   │   │   ├── audit/            # Immutable audit trail explorer
│   │   │   │   │   └── security/         # Security posture & anomalous access alerts
│   │   │   │   ├── layout.jsx            # Root HTML layout with navigation & footer
│   │   │   │   ├── loading.jsx           # Global fallback loading skeleton
│   │   │   │   ├── error.jsx             # Global error boundary
│   │   │   │   ├── not-found.jsx         # Custom 404 page
│   │   │   │   └── globals.css           # Vanilla CSS tokens, dark mode, high contrast
│   │   │   ├── components/               # Presentation components
│   │   │   │   ├── ui/                   # Buttons, badges, modals, cards, alerts
│   │   │   │   ├── layout/               # Header, navigation, footer, containers
│   │   │   │   ├── forms/                # Form inputs, labels, validation messages
│   │   │   │   └── feedback/             # Toast alerts, spinners, confirmation dialogs
│   │   │   ├── features/                 # Domain-specific UI features
│   │   │   │   ├── authentication/       # Auth state, login widgets
│   │   │   │   ├── patient-profile/      # Patient summary cards
│   │   │   │   ├── emergency-contacts/   # Contact list with direct-dial buttons
│   │   │   │   ├── emergency-id/         # SVG QR renderer & token printable cards
│   │   │   │   ├── identification/       # Responder scanning viewport & token parser
│   │   │   │   ├── cases/                # Case timeline, status change widgets
│   │   │   │   └── privacy/              # DPDPA request submission forms
│   │   │   ├── services/                 # API client utilities (fetch wrappers)
│   │   │   ├── hooks/                    # Custom React hooks (useAuth, useSocket)
│   │   │   ├── context/                  # Global React context providers
│   │   │   ├── styles/                   # Additional modular CSS stylesheets
│   │   │   └── utils/                    # Client-side string, date & error formatters
│   │   ├── next.config.mjs               # Next.js configuration
│   │   ├── eslint.config.mjs             # Next.js ESLint configuration
│   │   └── package.json                  # Frontend package manifest
│   │
│   └── api/                              # Fastify Dedicated API Backend (Port 4000)
│       ├── src/
│       │   ├── app.js                    # Fastify app factory & plugin registration
│       │   ├── server.js                 # HTTP listener & process lifecycle handler
│       │   ├── config/                   # Zod-validated environment configuration
│       │   ├── plugins/                  # Core Fastify plugins (Prisma, JWT, RateLimit, Audit)
│       │   ├── middleware/               # Route-level authorization guards
│       │   ├── modules/                  # Modular monolith domain modules
│       │   │   ├── auth/                 # Sign-in, sign-up, session refresh
│       │   │   ├── users/                # User profile & credentials
│       │   │   ├── organisations/        # EMS fleets, hospitals, dispatchers
│       │   │   ├── patients/             # Patient profiles, blood group, donor status
│       │   │   ├── patient-identifiers/  # Cryptographic opaque tokens & QR lifecycle
│       │   │   ├── medical-information/  # Allergies, medications, verification status
│       │   │   ├── emergency-contacts/   # Contact management & outreach logging
│       │   │   ├── identification/       # Emergency token lookup & access validation
│       │   │   ├── unidentified-cases/   # Unidentified case registry & events
│       │   │   ├── access-control/       # Granular RBAC & break-glass authorization
│       │   │   ├── consent/              # DPDPA consent record management
│       │   │   ├── notifications/        # Case alert dispatchers
│       │   │   ├── privacy-requests/     # Statutory SAR, rectification & deletion
│       │   │   ├── audit/                # Immutable audit log ingestion & querying
│       │   │   └── health/               # Readiness, liveness, DB & memory health
│       │   ├── realtime/                 # Socket.IO infrastructure
│       │   │   ├── socket-server.js      # Socket.IO server initialization
│       │   │   ├── authentication.js     # WebSocket JWT handshake verification
│       │   │   ├── room-authorisation.js # Role-based room joining rules
│       │   │   └── event-handlers/       # Case & notification event listeners
│       │   ├── jobs/                     # Reliable background tasks
│       │   │   ├── outbox-publisher.js   # Transactional outbox polling & dispatch
│       │   │   ├── notification-worker.js# Async outreach worker
│       │   │   └── retention-worker.js   # Automated data retention lifecycle runner
│       │   ├── infrastructure/           # Low-level service connectors
│       │   │   ├── database/             # Prisma client instance & transaction helpers
│       │   │   ├── cache/                # Redis connection & fallback handlers
│       │   │   ├── logging/              # Redacted structured logger
│       │   │   └── monitoring/           # Prometheus/metrics collectors
│       │   ├── security/                 # Cryptographic hashing & token utilities
│       │   └── utils/                    # General backend helpers & response formatters
│       ├── tests/                        # Vitest backend automated test suites
│       │   ├── unit/                     # Business logic, token generation, hashing
│       │   ├── integration/              # Fastify route testing via .inject()
│       │   └── security/                 # Rate-limit, auth bypass, injection tests
│       ├── package.json                  # Backend package manifest
│       └── .env.example                  # Backend environment template
│
├── packages/
│   └── shared/                           # Shared Domain Library (@maxery/shared)
│       ├── src/
│       │   ├── schemas/                  # Zod validation schemas for all inputs/entities
│       │   ├── constants/                # API paths, event names, legal disclaimers
│       │   ├── enums/                    # Domain enums (roles, statuses, urgency levels)
│       │   ├── api-contracts/            # Standard success & error response factories
│       │   └── index.js                  # Shared entry point re-exporting all modules
│       └── package.json                  # Shared package manifest
│
├── prisma/
│   ├── schema.prisma                     # Declarative PostgreSQL schema & relationships
│   ├── migrations/                       # Deterministic SQL migration files
│   └── seed.js                           # Safe synthetic dev seed script (with prod guard)
│
├── docs/                                 # Complete Technical & Statutory Documentation
│   ├── 00-PROJECT-OVERVIEW.md
│   ├── ... (All 33 complete specifications)
│   └── 32-ARCHITECTURE-DECISION-RECORDS.md
│
├── infra/
│   ├── docker/                           # Dockerfiles for staging/production builds
│   ├── scripts/                          # Automated database wait-for & backup scripts
│   └── monitoring/                       # Health check & logging configurations
│
├── tests/
│   ├── e2e/                              # Playwright end-to-end browser test suites
│   ├── accessibility/                    # Automated axe-core accessibility checks
│   ├── architecture/                     # Architecture & boundary linting checks
│   └── fixtures/                         # Synthetic test fixtures & mock responses
│
├── scripts/
│   ├── setup.js                          # Local development environment bootstrap
│   ├── check-environment.js              # Environment diagnostic & validation runner
│   └── verify-architecture.js            # Monorepo boundary & dependency checker
│
├── .github/
│   └── workflows/
│       ├── ci.yml                        # GitHub Actions CI (lint, test, build)
│       └── security-checks.yml           # Dependency & secret vulnerability scanner
│
├── .editorconfig                         # Uniform cross-editor indentation & charset
├── .gitignore                            # Comprehensive git ignore rules
├── .prettierrc.json                      # Prettier code formatting rules
├── eslint.config.js                      # Root ESLint 9 Flat Config
├── package.json                          # Monorepo root workspace configuration
├── docker-compose.yml                    # Local infrastructure (Postgres 16, Redis 7)
├── .env.example                          # Root environment template
└── README.md                             # Primary repository orientation & setup guide
```
