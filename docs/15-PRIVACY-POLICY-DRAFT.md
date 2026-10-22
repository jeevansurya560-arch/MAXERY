# MAXERY — Privacy Policy (Draft for Legal Review)

**Document Identifier:** `DOC-15`  
**Status:** DRAFT FOR FORMAL REVIEW BY QUALIFIED INDIAN LEGAL COUNSEL  
**Jurisdiction:** Republic of India (Applicable under Digital Personal Data Protection Act, 2023 & Information Technology Act, 2000)  
**Notice:** This document is an architectural draft template and does not constitute formal legal advice or finalized statutory disclosures.

---

## 1. Important Legal Notice & Scope

This draft Privacy Policy describes how the **MAXERY** platform ("MAXERY", "we", "us", or "our") processes, stores, and protects personal data and sensitive health-related constraints provided by Data Principals (registered citizens, patients, and their nominated trusted contacts) and processed by authorized Data Fiduciaries and Data Processors (emergency service providers, ambulance fleets, and hospitals).

**LEGAL DISCLAIMER:** Prior to production deployment in the Republic of India, this policy must be formally reviewed and certified by qualified advocates licensed by the Bar Council of India to ensure full conformity with rules notified under the **Digital Personal Data Protection Act, 2023 (DPDPA)** and the **Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011**.

---

## 2. Categories of Personal Data Collected

MAXERY collects only personal data strictly necessary to fulfill the vital life-safety purpose of emergency identification and contact coordination:

1. **Identity & Demographic Data:**
   - Account email, user full name, optional mobile number.
   - Date of birth (optional), blood group, primary languages spoken.
2. **Emergency Medical Information (Sensitive Personal Data):**
   - High-acuity drug and environmental allergies (e.g., Penicillin, Latex).
   - Chronic medical conditions (e.g., Asthma, Epilepsy, Type 1 Diabetes).
   - Life-critical medications (e.g., Anticoagulants, Insulin).
   - Provenance label (`SELF_REPORTED`, `PHYSICIAN_DOCUMENTED`).
3. **Trusted Emergency Contacts:**
   - Full names, phone numbers, and familial/support relationships of nominated contacts.
4. **Emergency Lookup Metadata (Automatically Generated):**
   - Identifier token scan timestamps, responder user ID, organizational affiliation, client IP address, and geographic location coordinates (where granted by responder device).

---

## 3. Lawful Basis for Processing (DPDPA 2023)

1. **Explicit Consent (Section 6, DPDPA 2023):**
   - Citizen registration, medical record storage, and trusted contact configuration are processed based on free, specific, informed, unconditional, and unambiguous consent granted by the Data Principal through an affirmative action.
2. **Medical Emergency Exemption (Section 7(c), DPDPA 2023):**
   - Access to emergency medical constraints by authorized responders during life-threatening medical emergencies or severe incapacitation is justified under Section 7(c) of the DPDPA 2023 (processing for responding to medical emergencies involving a threat to the life or immediate threat to the health of the Data Principal or any other individual).

---

## 4. Data Minimization & Zero-PII QR Tokens

- Physical QR codes, cards, and wristbands distributed by MAXERY encode solely an **opaque, unguessable cryptographic token**.
- Physical artifacts do not display the Data Principal's name, phone number, address, or medical diagnoses.
- Unauthenticated public scanning does not reveal sensitive health data.

---

## 5. Statutory Rights of Data Principals

In accordance with Chapter III of the DPDPA 2023, registered citizens retain the following enforceable rights:
1. **Right to Access Information (Section 11):** The right to obtain a summary of personal data processed, identities of all responders who accessed the record, and the purpose of processing.
2. **Right to Correction & Erasure (Section 12):** The right to correct inaccurate or misleading data, update medical summaries, and request complete erasure of personal data (subject to legal retention requirements).
3. **Right of Grievance Redressal (Section 13):** The right to submit grievances regarding personal data processing to the Data Protection Officer / Grievance Officer, with escalation rights to the Data Protection Board of India.
4. **Right to Nominate (Section 14):** The right to nominate an individual who, in the event of death or incapacity, shall exercise the Data Principal's rights.

---

## 6. Retention and Data Disposal

- Personal data is retained only for the duration that the Data Principal maintains an active MAXERY account.
- Upon an approved erasure request, personal medical data and emergency contacts are permanently deleted from active database tables within thirty (30) business days.
- Immutable security audit logs (`AuditEvent`, `IdentificationAttempt`) are retained for statutory compliance periods mandated by Indian cybersecurity regulations (e.g., CERT-In directives).

---

## 7. Draft Grievance Redressal Contact

*(To be designated upon formal organizational incorporation in India)*  
- **Designation:** Grievance Officer / Data Protection Officer (Draft)  
- **Office Address:** [Corporate Office Address in India — To Be Formalized]  
- **Email:** `grievance@maxery.org.in` (Placeholder — Pending Incorporation)
