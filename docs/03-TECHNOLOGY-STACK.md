# MAXERY — Technology Stack Specification

**Document Identifier:** `DOC-03`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Engineering Standards & Tooling Selection

---

## 1. Approved Technology Matrix

| Layer | Selected Technology | Target Version | Primary Rationale & Constraints |
|---|---|---|---|
| **Frontend Framework** | Next.js (App Router) + React | 15.x / React 19.x | High-performance server rendering for public legal/safety pages, optimized static asset delivery, and modern client component ecosystem. |
| **Frontend Language** | JavaScript & JSX Only | ECMAScript 2024 | **STRICT PROHIBITION:** Zero TypeScript (`.ts` / `.tsx`). Uses standard ES modules and JSX to maintain low build overhead and maximum simplicity. |
| **Frontend Styling** | Vanilla Modern CSS | CSS Level 4 | Design tokens, custom properties, accessible focus styling, and fluid layouts in `globals.css`. No heavy utility frameworks unless explicitly mandated. |
| **Backend Runtime** | Node.js | v20.x / v22.x LTS | Stable enterprise long-term support with native ES module support (`"type": "module"`). |
| **Backend Framework** | Fastify | v5.x | High-throughput, low-overhead HTTP framework with built-in schema validation, encapsulation, and first-class async plugin lifecycle. Dedicated API backend. |
| **Real-Time Communication** | Socket.IO | v4.8.x | Resilient bidirectional communication with automatic fallback to HTTP long-polling, heartbeat monitoring, and authenticated room management. |
| **Relational Database** | PostgreSQL | v16.x | ACID-compliant, enterprise-grade relational storage with native JSONB support, robust transaction isolation, and high-concurrency connection handling. |
| **Data Access & ORM** | Prisma ORM | v6.x | Declarative data modeling, automated schema migrations (`prisma migrate`), safe type coercion, and fluent relational query construction. |
| **Contract & Schema Validation** | Zod | v3.24.x | Standardized validation engine shared between client forms and backend routes. Enforces strict input validation without TypeScript compilation dependencies. |
| **Cache & Ephemeral Coordination**| Redis (Optional) | v7.x | High-speed in-memory store utilized strictly for rate-limiting counters and ephemeral pub/sub. **Never stores authoritative patient or medical data.** |
| **Monorepo Management** | npm Workspaces | npm v10+ | Native multi-package coordination (`apps/web`, `apps/api`, `packages/shared`) without third-party monorepo complexity. |
| **Unit & Integration Testing** | Vitest | v3.x | Extremely fast test runner with native ES module support, built-in assertion utilities, and zero-config Fastify route testing. |
| **End-to-End Testing** | Playwright | v1.50.x | Cross-browser automated verification of emergency scanner flows, keyboard navigation, and responsive viewports. |
| **Code Formatting & Linting** | ESLint + Prettier | ESLint 9 (Flat Config), Prettier 3 | Automated enforcement of clean code, consistent indentation, and zero unused variables. |
| **Local Infrastructure** | Docker Compose | Compose v2 | Reproducible containerized PostgreSQL 16 and Redis 7 environments with automated health checks. |
| **Continuous Integration** | GitHub Actions | Actions v4 | Automated workflow running linting, schema validation, test suites, and build verification on every commit. |

---

## 2. Inviolable Stack Restrictions

1. **NO TypeScript:**
   - No `.ts`, `.tsx`, or `.d.ts` files may exist in the repository.
   - All runtime verification and schema contracts are achieved using **Zod** in pure JavaScript.
2. **Dedicated Fastify API (No Next.js API Routes):**
   - Next.js must strictly act as a presentation client.
   - The Fastify backend running on a separate port (default: 4000) handles all API requests (`/api/v1/...`).
3. **No Microservices or Kubernetes:**
   - The system is architected as a cohesive modular monolith. Microservice complexity is prohibited.
4. **No Unjustified Dependencies:**
   - Libraries must not be added for operations easily accomplished with Node.js standard libraries (e.g., `node:crypto`, `node:fs`, `node:path`).
5. **No Production Credentials or Secrets in Git:**
   - All secrets must be supplied via runtime environment variables.

---

## 3. Package Structure & Inter-Dependency Graph

```
maxery-monorepo (root)
├── packages/shared (@maxery/shared)
│   ├── No internal workspace dependencies
│   └── Exports schemas, enums, constants, contracts
│
├── apps/api (@maxery/api)
│   ├── Depends on: @maxery/shared
│   ├── Depends on: fastify, @fastify/*, @prisma/client, socket.io, zod
│   └── Dedicated API server
│
└── apps/web (@maxery/web)
    ├── Depends on: @maxery/shared
    ├── Depends on: next, react, react-dom
    └── Presentation & Web Application
```
