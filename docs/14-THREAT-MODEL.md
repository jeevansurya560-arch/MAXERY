# MAXERY — Threat Model & Attack Vector Analysis

**Document Identifier:** `DOC-14`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Threat Modeling & Vulnerability Analysis  
**Methodology:** STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)

---

## 1. System Attack Surface & Assets at Risk

### Critical Assets:
1. **Patient Identifiers & Opaque Tokens** (Physical cards, wristbands).
2. **Protected Health Information (PHI)** (Allergies, chronic conditions, medications).
3. **Emergency Contacts (PII)** (Full names, mobile numbers, relationships).
4. **Responder Authentication Credentials** (JWTs, session tokens, passwords).
5. **Real-Time WebSocket Streams & Rooms** (Case updates, hospital assignments).
6. **Immutable Audit Trails** (`AuditEvent`, `IdentificationAttempt`).

---

## 2. Threat Analysis & Mitigations (STRIDE Matrix)

### 2.1 Threat Scenario 1: Stolen or Found Physical QR Code Artifact
- **Threat Category:** Information Disclosure / Spoofing.
- **Attack Vector:** An attacker finds a lost MAXERY physical emergency wristband on the street and attempts to read it using a standard smartphone camera.
- **Impact:** Potential unauthorized disclosure of the patient's identity and medical conditions.
- **Mitigation:**
  1. The QR code contains **no raw patient data**; it encodes only an opaque token (e.g., `MX-QR-7F89B2A4C1D0E3F5-DEMO`).
  2. Scanning the URL in a generic browser does NOT return the patient's record. It routes to an authenticated portal requiring **responder credentials**.
  3. Unauthenticated public scans present only a "Lost Emergency Card" recovery dialogue with zero patient identity disclosed.
  4. The citizen can immediately mark the card as `REVOKED` from their portal, permanently invalidating the token.

### 2.2 Threat Scenario 2: Compromised Responder Account
- **Threat Category:** Elevation of Privilege / Information Disclosure.
- **Attack Vector:** A rogue actor obtains a responder's credentials and attempts to scan tokens or query records remotely from an unverified location.
- **Impact:** Unauthorized viewing of patient emergency records.
- **Mitigation:**
  1. Mandatory operational justification (`accessReason`) required on every lookup.
  2. GPS coordinates and client IP recorded in immutable `IdentificationAttempt`.
  3. Rate limiting restricts lookups to 30/minute, blocking automated harvesting.
  4. Administrator can instantly revoke the user session and blacklist active JWTs in Redis.
  5. Audit anomalies (e.g., responder scanning tokens outside their geographical jurisdiction) trigger automated compliance alerts.

### 2.3 Threat Scenario 3: Organization Isolation Failure (Tenant Bleed)
- **Threat Category:** Information Disclosure / Elevation of Privilege.
- **Attack Vector:** Hospital A attempts to view active unidentified cases or responder logs belonging exclusively to Hospital B in a different city.
- **Impact:** Breach of jurisdictional boundaries and confidentiality.
- **Mitigation:**
  1. Fastify middleware enforces organization-level filtering at the SQL query level:
     ```javascript
     where: { organisationId: request.user.organisationId }
     ```
  2. Multi-tenant tests in Vitest verify that cross-organization query attempts strictly return `403 FORBIDDEN` or empty result sets.

### 2.4 Threat Scenario 4: Unauthorized Socket.IO Room Eavesdropping
- **Threat Category:** Information Disclosure.
- **Attack Vector:** A compromised web client sends arbitrary `socket.emit('case:join', { caseId: 'target-case' })` to listen to live dispatch feeds.
- **Impact:** Eavesdropping on ongoing emergency patient movements.
- **Mitigation:**
  1. Socket.IO connection requires valid JWT authentication during the initial handshake.
  2. The server strictly validates user roles and organization access before admitting the socket to any room.
  3. Real-time payloads contain only opaque IDs and status flags, never names or phone numbers.

### 2.5 Threat Scenario 5: Database Backup Exposure
- **Threat Category:** Information Disclosure.
- **Attack Vector:** An unencrypted database backup file (`.pgdump`) is leaked or improperly stored in a public cloud bucket.
- **Impact:** Catastrophic disclosure of full system records.
- **Mitigation:**
  1. Backups are encrypted with AES-256-GCM using dedicated asymmetric keys prior to storage.
  2. Backup buckets enforce strict object locking (WORM), private access policies, and automated deletion lifecycles.
  3. Password hashes are non-reversible (Argon2id/Scrypt).

### 2.6 Threat Scenario 6: Malicious or False Identification Claim
- **Threat Category:** Tampering / Clinical Harm.
- **Attack Vector:** An unauthorized individual claims an unidentified patient is their relative to gain access or misdirect medical care.
- **Impact:** Clinical error or patient abduction.
- **Mitigation:**
  1. Status transitions to `RESOLVED_IDENTIFIED` require physical clinical verification and recording the verifying clinician's user ID.
  2. All provisional leads remain in `PROVISIONALLY_IDENTIFIED` status until documented verification is logged.
