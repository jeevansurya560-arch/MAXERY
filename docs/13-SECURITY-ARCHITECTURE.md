# MAXERY — Security Architecture

**Document Identifier:** `DOC-13`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Information Security Architecture & Governance  
**Statutory Alignment:** Indian Information Technology Act, 2000, DPDPA 2023, and CERT-In Cybersecurity Directives

---

## 1. Security Architecture Principles

MAXERY operates in an environment handling high-consequence personal identifiers and emergency medical data. Security is built into every layer using defense-in-depth:

```
+-----------------------------------------------------------------------------------+
| LAYER 1: NETWORK & PERIMETER                                                      |
| - TLS 1.3 Strict Transport Security (HSTS)                                        |
| - CORS isolation (Next.js client restricted to dedicated Fastify domain)          |
| - Fastify Helmet security headers (CSP, X-Content-Type-Options, Frameguard)       |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
| LAYER 2: IDENTITY & SESSION GOVERNANCE                                            |
| - Strong password derivation using Scrypt / Argon2id (salt + work factor)         |
| - Signed, short-lived JWTs (15 min access, 24h refresh)                           |
| - Immediate session revocation capability via blacklist                           |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
| LAYER 3: APPLICATION & ACCESS CONTROL                                             |
| - Strict input sanitization via Zod schemas                                       |
| - Granular server-side Role-Based Access Control (RBAC)                           |
| - Token rate-limiting (30/min) preventing enumeration                             |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
| LAYER 4: DATA ENCRYPTION & SECRETS                                                |
| - Zero secrets committed to source control (runtime env injection)                |
| - Sensitive identifiers hashed via SHA-256 for lookup verification                |
| - PostgreSQL database encrypted at rest (AES-256)                                 |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
| LAYER 5: AUDITING & IMMUTABILITY                                                  |
| - Append-only AuditEvent table for all reads and mutations                        |
| - Log redaction engine stripping PII/PHI from application logs                    |
+-----------------------------------------------------------------------------------+
```

---

## 2. Authentication & Session Governance

### 2.1 Password Security
- Passwords must be a minimum of 12 characters (`registerSchema`).
- Derived using Node's native `crypto.scryptSync` (development) and Argon2id/Scrypt with minimum 64MB memory cost (production).
- Brute-force protection: Accounts lock after 5 consecutive failed login attempts for a 15-minute cool-down window.

### 2.2 JWT Token Lifecycle
- Tokens are signed with HMAC-SHA256 or asymmetric Ed25519 using a minimum 256-bit secret key.
- Payloads contain only standard claims (`sub`, `role`, `orgId`, `iat`, `exp`, `jti`). **No patient health details or phone numbers are embedded in JWTs.**

---

## 3. Rate Limiting & Throttling Matrix

| Endpoint Category | Fastify Rate Limit | Scope | Action on Exceeded |
|---|---|---|---|
| `POST /api/v1/auth/login` | 5 requests / 15 minutes | Client IP | 429 Too Many Requests + Audit Log |
| `POST /api/v1/identification/lookup-token` | 30 requests / 1 minute | Authenticated User + IP | 429 + Security Alert Flag |
| Public Static / Landing Routes | 120 requests / 1 minute | Client IP | 429 Too Many Requests |
| General API Endpoints | 300 requests / 1 minute | Authenticated User | 429 Too Many Requests |

---

## 4. Cryptographic Standards & Secret Management

1. **In-Transit:** TLS 1.3 enforced with modern cipher suites (`TLS_AES_128_GCM_SHA256`, `TLS_AES_256_GCM_SHA384`).
2. **At-Rest:** PostgreSQL storage volumes encrypted using AES-256-XTS at the OS/block volume layer.
3. **Secret Storage:** Managed via cloud KMS (AWS KMS, GCP KMS, or HashiCorp Vault) injected into the container environment at runtime.

---

## 5. Security Controls: Planned vs. Verified Matrix

| Control Objective | Implementation Strategy | Status in Current Setup | Verification Method |
|---|---|---|---|
| **Input Validation** | Zod schema validation on every route | Planned & Foundation Implemented | Vitest schema unit tests |
| **Password Hashing** | Native cryptographic scrypt/argon2 | Planned & Implemented | Auth login unit tests |
| **Rate Limiting** | Fastify rate limit plugin | Planned & Implemented | Automated load / 429 tests |
| **Audit Immutability** | Append-only PostgreSQL table | Planned & Schema Implemented | DB grant restriction tests |
| **TLS 1.3 Mandatory** | Nginx / Cloudflare reverse proxy | Planned for Staging/Prod | Infrastructure verification |
| **Secret Scanning** | Git pre-commit & GitHub Actions CI | Planned | CI pipeline execution |
