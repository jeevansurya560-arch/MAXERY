# MAXERY — Product Requirements Specification

**Document Identifier:** `DOC-01`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Core Requirements  
**Requirement ID Prefix:** `FR-xxx` (Functional), `NFR-xxx` (Non-Functional)

---

## 1. Product Purpose & Intended Users

MAXERY is built to eliminate identification delays, medical contraindication errors, and next-of-kin communication failures during acute human emergencies.

### User Classes
1. **Citizens / Patients:** Individuals who register to protect themselves and their families during emergencies.
2. **Authorized Responders:** Accredited medical (EMTs, paramedics, doctors) and safety personnel (fire, police) responding to emergencies.
3. **Dispatchers & Institutional Admins:** Central control room operators coordinating fleet response and hospital triage beds.
4. **Platform Compliance Auditors:** Officers responsible for ensuring access legitimacy and legal compliance under the DPDPA 2023.

---

## 2. Core User Journeys

### User Journey 1: Citizen Enrollment & Profile Configuration
- Citizen signs up with email and mobile number.
- Patient enters blood group, primary language, organ donor status, critical allergies (e.g., Penicillin, Latex), and active medications.
- Patient nominates at least two emergency contacts with phone numbers and relationships.
- Patient reviews statutory privacy notice under Section 5 & 6 of DPDPA 2023 and grants explicit emergency access consent.
- System generates a secure, opaque random QR identifier token. The patient can download or print this emergency card.

### User Journey 2: Emergency Responder Identifies Patient via QR
- First responder arrives on scene with an incapacitated or unconscious individual.
- Responder notices a MAXERY emergency card/wristband with a QR code.
- Responder accesses MAXERY via mobile browser, enters authentication/PIN or scans the token.
- System validates token validity, checks revocation status, records responder ID and GPS location, and returns emergency medical constraints.
- Responder immediately observes severe allergies and dials the primary trusted contact directly through the interface.
- Responder logs the outcome of the phone call (`CONNECTED_AWARE`, `NO_ANSWER`, etc.).

### User Journey 3: Fallback Unidentified-Patient Case Creation
- An incapacitated patient has no physical QR card, unlocked device, or physical credentials.
- Responder opens "Create Unidentified Case" in MAXERY.
- Responder records estimated age, gender, clothing description, distinguishing marks (scars, tattoos), and location found.
- System issues a unique case number (`CASE-YYYY-XXXX`) and broadcasts the case event to hospital and regional dispatchers in real time.
- Responders and triage nurses update the case timeline as investigations continue, without blocking medical treatment.
- When identity is established later, the case status is transitioned to `RESOLVED_IDENTIFIED` and linked to the patient record.

---

## 3. Functional Requirements (FR)

### Module 1: Patient Profile & Identification Tokens
- **`FR-001` Profile Creation:** The system must allow users to create a patient profile containing blood group, organ donor preference, primary language, and emergency notes.
- **`FR-002` Opaque Token Generation:** The system must generate cryptographically secure, 32-character minimum opaque alphanumeric tokens for patient identification artifacts.
- **`FR-003` Zero-PII QR Standard:** Physical QR codes must encode solely a secure URL with the opaque token. QR codes must never encode patient names, phone numbers, addresses, or medical conditions in raw text.
- **`FR-004` Token Revocation & Replacement:** A patient or authorized admin must be able to revoke a lost or stolen identifier immediately, marking its status as `REVOKED` and rendering future lookups invalid.
- **`FR-005` Token Expiry & Refresh:** Tokens must support optional expiry dates and reissue workflows.

### Module 2: Medical Information & Verification Labels
- **`FR-010` Medical Constraints Categorization:** The system must support medical entries grouped by `ALLERGY`, `MEDICATION`, `CHRONIC_CONDITION`, `SURGICAL_HISTORY`, and `IMPLANTED_DEVICE`.
- **`FR-011` Source Attribution:** Every medical entry must strictly record its origin: `SELF_REPORTED`, `FAMILY_REPORTED`, `PHYSICIAN_DOCUMENTED`, or `DEVICE_MEDICAL_ID`.
- **`FR-012` Verification States:** Medical entries must track verification states: `UNVERIFIED`, `PENDING_REVIEW`, `VERIFIED`, and `DISPUTED`.
- **`FR-013` Clinical Warning Redaction:** Lookups through emergency endpoints must emphasize life-critical contraindications (anaphylactic allergies, anticoagulants) with prominent visual warnings.

### Module 3: Trusted Emergency Contacts & Outreach
- **`FR-020` Contact Hierarchy:** The system must support at least three tiers of emergency contacts (`PRIMARY`, `SECONDARY`, `TERTIARY`).
- **`FR-021` Contact Validation:** Primary phone numbers must be validated according to E.164 standards.
- **`FR-022` Contact Attempt Logging:** Responders must be required to log outreach attempts with outcome codes (`CONNECTED_AWARE`, `NO_ANSWER`, `VOICEMAIL_LEFT`, `WRONG_NUMBER`, `BUSY`, `CALL_FAILED`).
- **`FR-023` Domestic Safety Gating:** The system must not broadcast automatic indiscriminate SMS alerts to all contacts if doing so could expose vulnerable patients to domestic safety risks.

### Module 4: Responder Identification Workflow
- **`FR-030` Authenticated Token Resolution:** The backend must authenticate and authorize any responder requesting patient data via token lookup.
- **`FR-031` Emergency Access Justification:** The system must capture an operational reason or confirmation of acute incapacitation before displaying unredacted medical or contact details.
- **`FR-032` Location Logging:** The system must record GPS latitude and longitude for all emergency lookups where the responder device permits geolocation.
- **`FR-033` Token Resolution Rate Limiting:** The backend must restrict token lookups to 30 requests per minute per IP/responder to prevent brute-force token enumeration.

### Module 5: Unidentified Patient Case Management
- **`FR-040` Fallback Case Initiation:** Responders must be able to create an unidentified case without requiring a patient match.
- **`FR-041` Descriptive Attributes:** Cases must record estimated age, estimated gender, physical description, clothing, distinguishing features, location found, and triage hospital.
- **`FR-042` Sequential Case Numbering:** The system must assign human-readable, unique case identifiers in the format `CASE-YYYY-XXXX`.
- **`FR-043` Case Event Timeline:** Every update, triage change, transfer, or outreach attempt must append an immutable `CaseEvent` to the case history.
- **`FR-044` Identity Resolution Transition:** When identity is confirmed, authorized responders must be able to link the case to a registered patient and set status to `RESOLVED_IDENTIFIED`.

### Module 6: Privacy, Consent & Statutory Rights
- **`FR-050` Consent Recording:** The system must store verifiable consent records including purpose, timestamp, IP address, and granted status.
- **`FR-051` Privacy Request Workflow:** Citizens must be able to submit requests for Data Access/Export, Rectification, Erasure, and Restriction.
- **`FR-052` Immutable Audit Logging:** All reads, exports, updates, and emergency lookups must be recorded in an append-only `AuditEvent` table.

---

## 4. Non-Functional Requirements (NFR)

### Performance & Latency
- **`NFR-001` Emergency Lookup Latency:** The p95 response time for resolving an opaque QR token to emergency medical constraints must not exceed 250 milliseconds under normal network conditions.
- **`NFR-002` API Throughput:** The backend API must sustain a minimum of 200 requests per second on baseline hardware without performance degradation.
- **`NFR-003` Database Query Optimization:** All lookups against tokens, user emails, and case numbers must utilize indexed fields with query execution times under 10 milliseconds.

### Security & Data Protection
- **`NFR-010` Zero Cleartext Storage:** Passwords must be hashed using scrypt, bcrypt, or Argon2id with high work factors. Sensitive patient tokens must maintain one-way SHA-256 hashes for lookup verification.
- **`NFR-011` TLS In Transit:** All HTTP and WebSocket communications must mandate TLS 1.3 in production environments.
- **`NFR-012` Secret Isolation:** Credentials, database passwords, and JWT signing keys must be injected via runtime environment variables and never checked into source control.
- **`NFR-013` Log Sanitization:** Application logs must automatically mask phone numbers, email addresses, and medical notes.

### Availability & Reliability
- **`NFR-020` High Availability Target:** 99.9% uptime for the emergency token resolution service.
- **`NFR-021` Transactional Outbox:** Critical events (case creation, status transitions) must be committed to the database in the same transaction as application state before being dispatched to message brokers or WebSockets.
- **`NFR-022` Graceful Degradation:** If real-time WebSockets or Redis caching is down, the core REST API and PostgreSQL database must remain fully operational.

### Usability & Accessibility
- **`NFR-030` WCAG 2.1 AA Compliance:** High visual contrast ratios (minimum 4.5:1 for normal text, 7:1 for emergency badges), accessible focus states, and screen reader compatibility.
- **`NFR-031` Zero Visual Distractions:** The emergency response interface must avoid complex animations, slow transitions, or cognitive overload during urgent patient care.
- **`NFR-032` Multi-Device Responsiveness:** Complete operational functionality across viewports from 360px mobile screens to 4K emergency room dispatch consoles.

---

## 5. Explicitly Out-of-Scope Items

1. **Autonomous Facial Recognition Surveillance:** No continuous scanning, mass CCTV integration, or automated identity assignment from video feeds.
2. **Direct Aadhaar / National Biometric Database Queries:** No scraping or unauthorized querying of UIDAI/Aadhaar databases.
3. **Clinical Diagnosis or Triage Scoring:** The software will not diagnose illnesses, recommend drug dosages, or assign clinical acuity scores.
4. **Autonomous Emergency Vehicle Dispatch:** The platform coordinates patient identity and records; it does not replace municipal 112/911 fleet CAD systems.

---

## 6. Success Criteria

1. **Zero Exposure of Raw PII on Physical Tokens:** 100% of physical cards use unguessable random tokens.
2. **Rapid Information Availability:** Responders can view verified allergies and emergency contacts within 3 taps on mobile.
3. **Complete Auditability:** 100% of emergency lookups generate permanent audit logs with responder ID, timestamp, and location.
4. **Reliable Unidentified Patient Tracking:** No unidentified patient is left untracked when QR identification is absent or fails.
