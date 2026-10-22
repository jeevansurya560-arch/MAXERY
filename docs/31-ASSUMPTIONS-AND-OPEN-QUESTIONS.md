# MAXERY — Assumptions & Open Questions

**Document Identifier:** `DOC-31`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Risk Governance & Project Boundaries  
**Principle:** Radical Honesty on Technical, Operational & Statutory Limits

---

## 1. Explicit Architectural Assumptions

1. **Target Deployment Jurisdiction:** The initial legal, regulatory, and privacy baseline is tailored to the **Republic of India**, specifically aligning with the *Digital Personal Data Protection Act, 2023 (DPDPA)*, the *Information Technology Act, 2000*, and *CERT-In Cybersecurity Directions*.
2. **Connectivity in Field Emergencies:** While responders frequently face degraded 4G/5G mobile connectivity, MAXERY assumes mobile browser web connectivity is available at the scene or upon arrival at the receiving hospital. Offline native caching with cryptographic key storage is deferred to future dedicated mobile applications.
3. **Dedicated Backend Model:** Next.js is utilized exclusively as a presentation client; Fastify is the dedicated API server. There are no Next.js API routes acting as a second backend.

---

## 2. Documented Non-Operational Boundaries (Zero Fake Functionality)

1. **No External Government Biometric Queries:** MAXERY has no active data integration with the Unique Identification Authority of India (UIDAI / Aadhaar) or national police AFIS databases.
2. **No Live ABHA Integration:** No electronic health record sync with Ayushman Bharat Digital Mission (ABDM) has been certified.
3. **No Automatic Lock-Screen Phone Sync:** Phone Medical ID details require human responder inspection; there is no automated background sync with Apple HealthKit or Google Health Connect.
4. **No Automated Telephony Aggregator:** In development and initial release, phone outreach triggers standard device dialers (`tel:+91...`); enterprise cloud telephony (Twilio / Exotel) is not active without an enterprise account.

---

## 3. Open Questions for Legal Counsel & Partner Agencies

| Question ID | Subject Area | Open Issue / Decision Required | Stakeholder |
|---|---|---|---|
| **OQ-001** | **Statutory Notice Rules** | What specific language formats and regional languages (under the Eighth Schedule) will the Central Government mandate under upcoming DPDPA 2023 Rules? | Indian Legal Counsel |
| **OQ-002** | **Good Samaritan Protections** | How do state-level Good Samaritan laws (e.g., Karnataka Good Samaritan and Medical Professional Protection Act) protect first responders who scan a MAXERY QR card in good faith? | State Health Departments |
| **OQ-003** | **Minors & Dependent Consent** | What specific verifiable parental consent mechanism will be mandated for registering children under 18 years of age under Section 9 of DPDPA 2023? | Indian Legal Counsel |
| **OQ-004** | **Police & Medico-Legal Intimation** | In fatal unidentified patient incidents, what standardized digital export format is required for state police inquest reports? | State Police / Forensic Experts |
