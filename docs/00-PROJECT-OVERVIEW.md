# MAXERY — Project Overview

**Document Identifier:** `DOC-00`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Core Governance & Project Definition  
**Target Platform:** Web & Mobile Web (Emergency Responder & Citizen Workflows)

---

## 1. Executive Summary

**MAXERY** is a secure emergency identification, vital medical information access, and trusted-contact coordination platform. It is engineered specifically for time-critical, high-stress emergency environments where individuals are incapacitated, disoriented, unconscious, or otherwise unable to articulate their identity, medical conditions, or emergency contacts.

In acute incidents—such as road traffic collisions, industrial accidents, acute cardiac events, severe hypoglycemia, or mass transit disruptions—paramedics, emergency medical technicians (EMTs), triage nurses, and law enforcement officers face the "unidentified patient problem." Minutes lost identifying a patient, discovering lethal drug allergies (e.g., penicillin anaphylaxis), or locating family members can result in preventable mortality, clinical errors, and severe psychological distress for relatives.

MAXERY bridges this life-safety gap through an audited, multi-tiered identification architecture combined with real-time case coordination and strict statutory data protection.

---

## 2. Core Mission & Founding Principles

### 2.1 The Mission
To ensure that any individual requiring acute emergency assistance can be swiftly and securely identified by verified responders, their critical medical constraints immediately recognized, their loved ones notified, and their privacy uncompromisingly protected under the law.

### 2.2 Inviolable Principles
1. **Safety First, Technology Second:** MAXERY is an identification and coordination aid; it does not practice medicine, provide clinical triage, or replace prompt emergency transport and physician care.
2. **Zero-Knowledge Identifiers:** Patient identifiers (such as physical QR codes or emergency cards) contain **no Personal Identifiable Information (PII)** and **no Protected Health Information (PHI)**. They contain only cryptographically unguessable, opaque random tokens that require authenticated, audited backend resolution.
3. **Strict Hierarchy of Identification:** Responders must follow a verified sequence:
   - *Tier 1 (Primary):* MAXERY Secure QR Token Lookup.
   - *Tier 1 (Primary):* On-device accessible Phone Medical ID inspection.
   - *Tier 2 (Restricted/Future):* Human-reviewed facial feature review (strictly controlled; non-operational in current release).
   - *Tier 2 (Restricted/Future):* External biometric matching (Aadhaar/fingerprint; strictly controlled; non-operational in current release).
   - *Fallback:* Structured Unidentified-Patient Case Management.
4. **Responders Never Face a Dead End:** If identification fails, is revoked, or cannot be established, the system immediately routes the responder into an active **Unidentified Case Registry**, ensuring care coordination, patient tracking, and contact investigation continue without delay.
5. **Privacy by Design:** Strict adherence to the Indian Digital Personal Data Protection Act, 2023 (DPDPA 2023), the Information Technology Act, 2000, and CERT-In directions. Every emergency lookup is immutably logged with the responder's identity, timestamp, organization, and GPS coordinates (where authorized).

---

## 3. The Problems MAXERY Solves

| Problem in Current Emergency Response | How MAXERY Solves It |
|---|---|
| **Unknown Lethal Allergies & Conditions**<br>Unconscious patients cannot report asthma, hemophilia, type 1 diabetes, or penicillin allergies. | Opaque QR code resolves to verified, critical medical constraints within seconds, displaying source attribution (Physician Verified vs. Self-Reported). |
| **Delayed Family Notification**<br>Hospitals spend hours or days searching for next of kin while patients lie unidentified in ICU. | Hierarchical trusted contacts with prioritized phone numbers and structured attempt tracking ensure rapid notification. |
| **Unidentified Patient Black Hole**<br>Patients who cannot be identified are logged as "Unknown Male/Female" on whiteboards with no cross-agency visibility. | Real-time Unidentified Case Registry tracks clothing, physical traits, location found, and triage hospital across authorized dispatchers. |
| **Data Scraping & Privacy Insecurity**<br>Traditional medical alert bracelets display full names, phone numbers, and diseases to anyone walking by. | No PII on the physical artifact. Scanning requires backend authentication and generates an auditable access event. |
| **False Claims & Commercial Exploitation**<br>Commercial apps claim AI facial identification or government partnerships without authorization. | MAXERY enforces an honest technical boundary. Restricted features are explicitly gated, and government/hospital integrations require authentic MOUs. |

---

## 4. Key Target Users & Personas

1. **The Registered Citizen / Patient:**
   - Registers self and dependents.
   - Records emergency medical notes, allergies, and blood group.
   - Designates and orders trusted emergency contacts.
   - Downloads/orders secure physical QR emergency cards or wristbands.
   - Retains full rights under DPDPA (data export, correction, revocation, and grievance redressal).

2. **The Authorized Emergency Responder:**
   - Paramedic, EMT, ambulance driver, emergency physician, or police officer.
   - Scans QR token or creates an unidentified case.
   - Views restricted emergency summary (allergies, medications, blood group).
   - Directly triggers contact attempts and logs communication outcomes.
   - Operates under high-contrast, high-speed, mobile-optimized interfaces.

3. **The Dispatcher / Hospital Administrator:**
   - Manages institutional emergency desks, triage intakes, and responder rosters.
   - Monitors open unidentified cases within their jurisdiction.
   - Coordinates cross-facility patient identification transfers.

4. **The Privacy & Compliance Officer:**
   - Reviews system audit logs, access anomalies, and emergency access requests.
   - Processes statutory privacy requests (SAR, rectification, erasure).
   - Maintains regulatory reporting readiness for CERT-In and the Data Protection Board of India.

---

## 5. Scope & Delivery Boundaries

### In Scope for Initial Release Foundation:
- Complete system and database design for all 15 core entities.
- Monolithic modular architecture using Node.js Fastify + Next.js App Router.
- Opaque QR token generation and authenticated emergency lookup workflow.
- Source-attributed medical constraint storage (`PHYSICIAN_DOCUMENTED`, `SELF_REPORTED`).
- Priority-ordered emergency contact management with attempt logging.
- Unidentified case lifecycle (`OPEN_UNIDENTIFIED` to `RESOLVED_IDENTIFIED`).
- Tamper-evident audit event recording.
- Full statutory documentation, threat models, and Indian legal compliance drafts.

### Explicitly Out of Scope (Non-Operational in Initial Release):
- Live AI/ML automated facial recognition surveillance.
- Direct live database querying of UIDAI/Aadhaar or ABHA APIs (requires regulatory approvals).
- Autonomous SMS/telephony gateways without contracted enterprise aggregators.
- Native mobile hardware camera drivers (browser HTML5 scanner used).
- Clinical diagnosis, triage scoring, or prescription systems.

---

## 6. Document Navigation Map

All design decisions, contracts, and policies are detailed across the 32 numbered specifications in the `docs/` directory:
- **01–04:** Requirements, Architecture, Stack, Structure
- **05–07:** Database Design, API Specification, Role Permissions
- **08–10:** Identification, Cases, Trusted Contacts
- **11–14:** Realtime, Caching, Security Architecture, Threat Model
- **15–22:** Legal, Privacy, Compliance, Emergency Access, Biometrics, Incident Response
- **23–24:** UI/UX, Design Systems, Accessibility
- **25–28:** Testing, Deployment, Backup, Implementation Roadmap
- **29–32:** Environment, Logging, Assumptions, ADRs
