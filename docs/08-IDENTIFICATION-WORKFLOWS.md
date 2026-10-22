# MAXERY — Identification Workflows & Hierarchy

**Document Identifier:** `DOC-08`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Operational Field Protocol & System Hierarchy  
**Scope:** Field Responder Identification Sequence

---

## 1. The Mandatory Identification Hierarchy

To protect human life, eliminate clinical misidentification, and uphold strict data privacy, emergency responders must strictly adhere to the following sequence:

```
+-----------------------------------------------------------------------------------+
| PRIMARY METHOD 1: MAXERY Secure QR Code Token Lookup                              |
| - Scan physical emergency card, wristband, or sticker                             |
| - Resolves opaque, unguessable token via authenticated backend                    |
+-----------------------------------------------------------------------------------+
                                         | (If absent, damaged, or unreadable)
                                         v
+-----------------------------------------------------------------------------------+
| PRIMARY METHOD 2: Accessible Phone Medical ID Inspection                          |
| - Inspect on-device Medical ID made accessible via lock-screen                    |
| - Manual entry into MAXERY with source marked: 'DEVICE_MEDICAL_ID'                |
+-----------------------------------------------------------------------------------+
                                         | (If device missing, discharged, or locked)
                                         v
+-----------------------------------------------------------------------------------+
| BACKUP METHOD 3 (RESTRICTED / FUTURE): Human-Reviewed Facial Feature Comparison   |
| - NOT OPERATIONAL IN INITIAL RELEASE                                              |
| - Subject to statutory permissions, explicit consent, and strict human review    |
+-----------------------------------------------------------------------------------+
                                         | (If unavailable or inconclusive)
                                         v
+-----------------------------------------------------------------------------------+
| BACKUP METHOD 4 (RESTRICTED / FUTURE): Biometric Matching (Fingerprint/Iris)      |
| - NOT OPERATIONAL IN INITIAL RELEASE                                              |
| - Requires verified institutional integrations (e.g. state police/forensic)       |
+-----------------------------------------------------------------------------------+
                                         | (If identity remains unconfirmed)
                                         v
+-----------------------------------------------------------------------------------+
| MANDATORY FALLBACK: Unidentified-Patient Case Creation                            |
| - Open active case in Unidentified Case Registry                                  |
| - Log physical description, clothing, location found, and triage hospital         |
| - Care and coordination proceed without delay                                     |
+-----------------------------------------------------------------------------------+
```

---

## 2. Detailed Method Specifications

### 2.1 Primary Method 1: MAXERY Secure QR Code Token

#### 2.1.1 Architectural Rules
- The physical QR code encodes **only an opaque HTTPS URL** with a cryptographically unguessable random token (e.g., `https://maxery.org/id/MX-QR-7F89B2A4C1D0E3F5-DEMO`).
- **PROHIBITION:** The QR code must NEVER contain the patient's name, phone number, address, blood group, or medical conditions in raw format.
- A physical QR code is **never an automatic authorization** to view data. The backend requires the responder to authenticate, captures an emergency `accessReason`, logs the responder's identity and GPS coordinates, and applies strict rate limits.

#### 2.1.2 Token Lifecycle
1. **Generation:** Cryptographically secure 32-character token generated via `node:crypto.randomBytes()`. Stored with an associated SHA-256 hash in PostgreSQL.
2. **Active State:** Responder scans the code; server validates token status (`ACTIVE`), confirms patient profile is active, and returns emergency medical summary.
3. **Revocation:** If a card or wristband is lost, stolen, or damaged, the citizen or responder marks the identifier as `REVOKED` in the portal. Future lookups return `410 GONE / REVOKED`, preventing unauthorized access.
4. **Replacement:** System generates a new unguessable token and invalidates the previous one.

---

### 2.2 Primary Method 2: Accessible Phone Medical ID

#### 2.2.1 Operational Protocol
- Contemporary smartphones (iOS Medical ID, Android Emergency Information) allow citizens to configure accessible emergency details on their lock screens.
- Where an accessible device is present, responders may inspect this information for immediate on-scene guidance.

#### 2.2.2 Honest System Boundaries & Integration Truth
- **NO AUTOMATIC SYNCHRONIZATION:** MAXERY does NOT claim automatic background sync with Apple HealthKit or Google Health services.
- If a responder transcribes information from a lock-screen Medical ID into a MAXERY case, the provenance source must be explicitly marked as:
  `source: "DEVICE_MEDICAL_ID"` and `verificationStatus: "UNVERIFIED"`.

---

### 2.3 Backup Methods 3 & 4: Restricted / Future Biometric Capabilities

#### 2.3.1 Honest Boundary & Non-Operational Status
- Automated facial recognition and direct fingerprint database querying are **RESTRICTED AND NON-OPERATIONAL** in this release.
- **NO AADHAAR / UIDAI / ABHA INTEGRATION:** The system does not possess direct live hooks into national government biometric registries.
- MAXERY will never implement unrestricted automated facial surveillance. Any future biometric review must:
  1. Operate strictly under explicit statutory authorization under Indian law.
  2. Utilize human-in-the-loop expert review rather than automated similarity score acceptance.
  3. Never store raw biometric images or templates without certified hardware encryption modules.

---

### 2.4 Mandatory Fallback: Unidentified-Patient Case Registry

#### 2.4.1 Zero-Block Principle
- **Failure of identification must NEVER block emergency medical care or hospital triage.**
- If no token is found, or if a token is damaged, expired, or disputed, the responder immediately selects **"Create Unidentified Case"**.
- This generates a case record (`CASE-YYYY-XXXX`) tracking:
  - Estimated physical characteristics (age, gender, height, build).
  - Clothing and personal effects (jewelry, watch, bag).
  - Distinguishing marks (scars, surgical incisions, tattoos).
  - Scene details (location found, transit stop, mile marker).
  - Receiving hospital triage ward.
- The case is broadcast via Socket.IO to hospital emergency departments and regional dispatchers.
- When the patient's identity is subsequently verified (e.g., via visiting family or later regaining consciousness), the case is transitioned to `RESOLVED_IDENTIFIED` and linked to the patient record.
