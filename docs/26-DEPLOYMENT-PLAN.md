# MAXERY — Deployment & Infrastructure Plan

**Document Identifier:** `DOC-26`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** DevOps & Production Infrastructure  
**Target Architecture:** Containerized Linux (Docker Engine / Managed PostgreSQL 16)

---

## 1. Production Deployment Topology

```text
+-----------------------------------------------------------------------------------+
| INTERNET (TLS 1.3 / HTTPS PORT 443)                                               |
+-----------------------------------------------------------------------------------+
                                   |
+-----------------------------------------------------------------------------------+
| REVERSE PROXY / LOAD BALANCER (Nginx / Cloudflare)                                |
| - SSL/TLS Termination, DDoS Mitigation, Rate Limiting                             |
| - Route /api/* and /socket.io/* to Fastify Backend Container                      |
| - Route all other traffic to Next.js Web Frontend Container                       |
+-----------------------------------------------------------------------------------+
                  |                                                 |
                  v                                                 v
+----------------------------------+             +----------------------------------+
| Fastify API Backend Container    |             | Next.js Web Frontend Container   |
| (apps/api - Port 4000)           |             | (apps/web - Port 3000)           |
| - Node.js v20 LTS Alpine         |             | - Node.js v20 LTS Alpine         |
+----------------------------------+             +----------------------------------+
                  |                                                 |
                  +------------------------+------------------------+
                                           |
+-----------------------------------------------------------------------------------+
| SECURE PRIVATE SUBNET (VPC)                                                       |
|                                                                                   |
| +------------------------------------+     +------------------------------------+ |
| | PostgreSQL 16 Enterprise Database  |     | Redis 7 Supplementary Cache        | |
| | - Managed RDS / High Availability  |     | - Rate Limits & PubSub             | |
| | - Automated Daily Backups (WAL)    |     +------------------------------------+ |
| +------------------------------------+                                            |
+-----------------------------------------------------------------------------------+
```

---

## 2. Zero-Downtime Migration Strategy

Database schema migrations are executed using Prisma Migrate in a dedicated release container step before rolling out new application code:

1. **Step 1 (Pre-Deployment Migration):**
   ```bash
   npx prisma migrate deploy
   ```
   *Rule:* Migrations must be backward-compatible (expand before contract). Column deletions or renames must occur across two separate releases.
2. **Step 2 (Rolling Container Update):**
   - New Fastify API containers spin up and pass internal health checks (`GET /api/v1/health`).
   - Traffic shifts gracefully to new containers; old containers complete existing requests before termination.
3. **Step 3 (Outbox Publisher Reconnection):**
   - Background worker resumes polling from the shared PostgreSQL `OutboxEvent` table with zero lost updates.
