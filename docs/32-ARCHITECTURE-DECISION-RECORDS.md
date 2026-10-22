# MAXERY — Architecture Decision Records (ADRs)

**Document Identifier:** `DOC-32`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Architectural Governance & Decision Log  
**Format:** Michael Nygard ADR Template

---

## ADR-001: Selection of Modular Monolith over Microservices

### Context
Emergency identification and trusted contact coordination require absolute transactional integrity, low latency, and operational reliability. Emergency lookups touch multiple domain entities atomically: patient records, identification attempts, immutable audit logs, and real-time outbox events.

### Options Considered
1. *Distributed Microservices (Kubernetes, gRPC, Event Bus)*: High operational overhead, distributed transaction complexity (Sagas), high deployment cost, network latency penalties.
2. *Serverless Functions (AWS Lambda / Vercel Functions)*: Cold start latency penalties (unacceptable during acute medical emergencies), complex database connection pooling limits.
3. *Modular Monolith (Node.js Fastify Monorepo with npm workspaces)*: Single deployable process, strict internal module boundaries, ACID transactions across PostgreSQL tables, zero distributed network latency.

### Decision
Adopt a **Modular Monolith** pattern within an `npm` workspaces monorepo (`apps/api`, `apps/web`, `packages/shared`).

### Consequences
- **Positive:** Immediate transactional consistency; simpler local development via Docker Compose; predictable sub-millisecond inter-module calls.
- **Negative:** Requires disciplined code review to prevent tight coupling between internal modules.

---

## ADR-002: Pure JavaScript & JSX over TypeScript

### Context
Project governance mandates strict adherence to JavaScript (ES modules) and JSX only, explicitly prohibiting `.ts` and `.tsx` files.

### Options Considered
1. *TypeScript with Full Compilation Pipeline*: Added compile-time type safety, but introduces transpilation overhead, type maintenance debt, and violates user mandate.
2. *Pure JavaScript with Zod Runtime Schema Validation & JSDoc*: Zero build-step transpile overhead, universal compatibility with Node.js LTS, and guaranteed runtime boundary validation.

### Decision
Enforce **Pure JavaScript and JSX** across all packages (`apps/web`, `apps/api`, `packages/shared`). All data validation is strictly executed at runtime using **Zod**.

### Consequences
- **Positive:** Instant build and reload times; zero compilation tooling issues; 100% adherence to project instructions.
- **Negative:** Requires rigorous automated test suites (Vitest) to catch runtime regressions.

---

## ADR-003: Dedicated Fastify API Server over Next.js API Routes

### Context
Next.js provides built-in API routes (`/src/app/api/...`), tempting teams to collapse frontend and backend into a single server.

### Options Considered
1. *Next.js Serverless API Routes*: Blurs separation of concerns, complicates long-running WebSocket connections, and creates vendor lock-in.
2. *Dedicated Fastify REST & WebSocket API (`apps/api`)*: Clean architectural boundary, high-throughput request handling, native plugin encapsulation, and first-class Socket.IO mounting.

### Decision
Use **Fastify** as the sole, authoritative API backend. Next.js is restricted exclusively to frontend presentation and static public page rendering.

### Consequences
- **Positive:** Clear network boundary; superior request throughput; WebSocket integration without serverless workarounds.
- **Negative:** Requires managing two separate running server ports (`3000` and `4000`) in development and production.

---

## ADR-004: Selection of Prisma ORM for PostgreSQL

### Context
The application requires reliable migrations, relational integrity, foreign key cascading, and type-safe query building in JavaScript.

### Options Considered
1. *Raw SQL / pg driver*: High flexibility, but error-prone manual schema migration management.
2. *Knex.js / Kysely*: Solid query builders, but lacks declarative relational modeling.
3. *Prisma ORM*: Declarative schema modeling (`schema.prisma`), automated SQL migrations (`prisma migrate`), rich relational queries, and safe runtime coercion.

### Decision
Adopt **Prisma ORM** as the primary data access layer for PostgreSQL 16.

### Consequences
- **Positive:** Deterministic schema migrations; visual relational data model; automated foreign key handling.
- **Negative:** Minor query generation overhead compared to hand-optimized raw SQL (mitigated by proper indexing).

---

## ADR-005: Socket.IO with Transactional Outbox Pattern for Real-Time State

### Context
When a field responder creates an unidentified case or updates a status, hospital triage desks and dispatchers need real-time updates. Direct in-memory event emission from HTTP handlers leads to message loss during crashes or network partitions.

### Options Considered
1. *Direct Socket.IO Broadcast in HTTP Route Handler*: Simple, but if the HTTP request commits to the DB and the socket crashes, the event is permanently lost.
2. *Distributed Kafka / RabbitMQ Cluster*: Overkill for initial foundation; adds heavy operational maintenance.
3. *Transactional Outbox Pattern with PostgreSQL Table & Poller*: Atomic database transaction guarantees zero event loss. Outbox publisher worker polls and dispatches events to Socket.IO rooms.

### Decision
Implement the **Transactional Outbox Pattern** using an `OutboxEvent` table in PostgreSQL.

### Consequences
- **Positive:** Guaranteed at-least-once delivery; zero lost case updates; zero external message broker dependency.
- **Negative:** Sub-second polling latency (typically 200–500ms) compared to direct in-memory broadcast.

---

## ADR-006: Strictly Opaque QR Identifier Tokens over Data-Encoded QR Codes

### Context
Many traditional emergency products encode the patient's name, blood group, allergies, and contact phone numbers directly inside the physical QR code string.

### Options Considered
1. *Data-Encoded QR Code (Raw Text / JSON)*: Works offline, but anyone walking past an unconscious patient can read their full medical history and phone number with any consumer camera phone. Catastrophic privacy violation under DPDPA 2023.
2. *Encrypted QR Code with Symmetric Key*: Requires distributing a shared decryption key to all responders nationwide, which will inevitably leak publicly.
3. *Cryptographically Unguessable Opaque Random Token*: Physical artifact encodes only a 32-character random string (e.g., `MX-QR-7F89B2A4C1D0E3F5-DEMO`). Backend authentication, authorization, and rate limiting required to resolve data.

### Decision
Mandate **Zero-PII Opaque Cryptographic Tokens** for all physical artifacts.

### Consequences
- **Positive:** Total privacy protection against casual snooping or stolen cards; instant server-side revocation capability.
- **Negative:** Requires cellular/internet connectivity on the responder's device to resolve the record.

---

## ADR-007: Scope of Redis Limited to Rate Limiting & Session Invalidation

### Context
Teams often default to caching patient profiles in Redis to accelerate read performance.

### Options Considered
1. *Full Caching of Patient Profiles in Redis*: Fast, but introduces memory persistence risks, cache invalidation bugs, and potential PHI exposure if Redis is improperly configured.
2. *PostgreSQL Sole Storage with Redis Strictly for Rate Limiting & Ephemeral State*: PostgreSQL handles indexed lookups in < 5ms. Redis is used solely for rate-limit counters and JWT blacklists. **ZERO PHI stored in Redis.**

### Decision
Restrict **Redis strictly to rate limiting counters, pub/sub coordination, and revoked token blacklists**.

### Consequences
- **Positive:** Eliminates PHI leakage risks from Redis memory dumps; guarantees zero stale medical data served during emergencies.
- **Negative:** Emergency token queries hit PostgreSQL directly (well within capacity given indexed UUID lookups).
