# MAXERY — Caching Strategy & Redis Scope

**Document Identifier:** `DOC-12`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Infrastructure & Performance Architecture  
**Cache Engine:** Redis 7 (Optional / Supplementary)

---

## 1. Core Caching Principles & Inviolable Guardrails

1. **PostgreSQL is Always Authoritative:** Redis is never used as the persistent or authoritative store for patient identities, medical constraints, contacts, or audit trails.
2. **ZERO PHI/PII in Cache:** **Medical information, drug allergies, patient names, and emergency contact phone numbers MUST NEVER BE STORED IN REDIS.** Even with TTLs, memory dumps or unencrypted Redis instances pose severe data leakage risks under DPDPA 2023.
3. **Graceful Degradation:** If Redis becomes unreachable, the entire platform must continue functioning normally by falling back to PostgreSQL and in-memory Fastify rate limiters.

---

## 2. Permitted Redis Use Cases & TTL Matrix

| Key Pattern | Data Stored | TTL | Justification & Eviction Strategy |
|---|---|---|---|
| `rl:ip:{ip_address}` | Request counter (Integer) | 60 seconds | High-throughput distributed rate limiting for public endpoints. Reset on expiration. |
| `rl:token:{responder_id}` | Lookup counter (Integer) | 60 seconds | Throttles emergency QR lookups to max 30/minute per responder. |
| `jwt:blacklist:{jti}` | Revoked JWT Token ID | Until Token Expiry (max 24h) | Immediate invalidation of compromised responder sessions. Checked on each request. |
| `ws:room:{room_id}:members` | Socket ID set | Ephemeral (Session) | Socket.IO Redis adapter for multi-instance cluster room broadcasting. |

---

## 3. Session Revocation & Immediate Invalidation

When an administrator revokes a responder's credentials or when a user logs out:
1. The user's `isActive` flag is updated to `false` in PostgreSQL.
2. The user's active JWT `jti` is pushed to Redis `jwt:blacklist:{jti}` with a TTL matching the token's remaining lifespan.
3. The Fastify JWT authentication hook queries the blacklist:
   ```javascript
   if (await redis.exists(`jwt:blacklist:${decoded.jti}`)) {
     throw new UnauthorizedError('Session has been revoked');
   }
   ```
4. If Redis is unavailable, the fallback check queries PostgreSQL `User.isActive` directly.

---

## 4. Failure Mode Handling (Redis Outage)

```
[Incoming Request]
       |
       v
[Fastify Rate Limiter]
       |
       +---> [Check Redis] ---> (ERROR / TIMEOUT > 200ms)
       |                            |
       |                            v
       +---------------------> [FALLBACK: In-Memory LRU Cache]
                                    |
                                    v
                               [Allow Request to Fastify Route]
```

- When Redis fails, a circuit breaker flips to in-memory mode.
- System metrics record a `CACHE_FALLBACK_ACTIVE` warning.
- Emergency patient identification and case creation continue without disruption.
