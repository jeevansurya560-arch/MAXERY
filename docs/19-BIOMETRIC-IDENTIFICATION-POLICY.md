# MAXERY — Biometric & Advanced Identification Policy

**Document Identifier:** `DOC-19`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Advanced Identification Governance & Non-Operational Status  
**Scope:** Policy on Facial Review, Fingerprints, and External Biometric Systems

---

## 1. Executive Position & Non-Operational Declaration

**AUTOMATED FACIAL RECOGNITION SURVEILLANCE AND EXTERNAL BIOMETRIC DATABASE MATCHING ARE STRICTLY NON-OPERATIONAL IN THIS RELEASE.**

MAXERY does not claim:
1. Direct connection, query access, or data synchronization with the Unique Identification Authority of India (UIDAI / Aadhaar).
2. Live integration with national police or forensic fingerprint databases (e.g., NAFIS).
3. Integration with the Ayushman Bharat Digital Mission (ABDM / ABHA) without certified sandbox approval and formal execution of agreements.
4. Automated identity determination through algorithmic facial similarity scores.

Any future activation of biometric matching requires explicit regulatory approval, statutory authorization under Indian law, independent cryptographic audits, and formal policy revision.

---

## 2. Inviolable Safeguards for Future Biometric Capabilities

If, under future legal and regulatory frameworks, secondary biometric matching capabilities are introduced to identify unknown deceased or incapacitated patients:

### 2.1 Prohibition of Mass Surveillance
- MAXERY will NEVER implement or permit continuous, passive video surveillance scanning, CCTV harvesting, or crowd facial recognition.
- Identification tools may only be engaged as a point-in-time, targeted investigative procedure for an active unidentified-patient case.

### 2.2 Human-in-the-Loop Review Requirement
- An algorithmic match score or cosine distance metric **DOES NOT CONSTITUTE PROOF OF IDENTITY**.
- Algorithmic outputs must strictly be treated as "Candidate Leads" requiring multi-source corroboration and sign-off by a certified medical or forensic professional.

### 2.3 Strict Prohibition on Raw Biometric Storage
- The system must NEVER store unencrypted raw photographic face crops, high-resolution iris images, or raw fingerprint scans in database tables.
- All biometric processing must occur within hardware-isolated Trusted Execution Environments (TEEs) generating non-reversible, one-way cryptographic feature vectors that cannot be reconstructed into raw anatomical images.
