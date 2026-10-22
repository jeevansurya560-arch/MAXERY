# MAXERY — Trusted Contacts Specification

**Document Identifier:** `DOC-10`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Core Functional & Safety Policy  
**Module:** Emergency Contact Coordination

---

## 1. Contact Hierarchy & Data Minimization

Patients may configure trusted individuals to be notified during medical incapacitation. To prevent data leakage and maintain security, contact entries strictly store only necessary operational fields:

1. **Full Name:** Legal or familiar name of the contact.
2. **Relationship:** Sibling, Spouse, Parent/Guardian, Adult Child, Close Friend, Case Worker.
3. **Primary Phone:** E.164 validated mobile number.
4. **Alternate Phone:** Optional secondary number or landline.
5. **Priority Order:**
   - `PRIMARY`: Contacted first by first responders.
   - `SECONDARY`: Contacted if primary does not answer after 2 attempts.
   - `TERTIARY`: Final emergency backup.
6. **Verification State:** Flag indicating whether the contact's phone has completed SMS OTP ownership verification.
7. **Consent Status:** `OPTED_IN` or `RESTRICTED`.

---

## 2. Responder Outreach & Attempt Tracking

### 2.1 Structured Outreach Protocol
When a responder resolves an emergency identifier, MAXERY presents the primary contact with a direct one-tap calling trigger. To maintain an auditable timeline, responders are required to record the result of the interaction:

| Outcome Code | Meaning & Next Action |
|---|---|
| `CONNECTED_AWARE` | Contact answered, informed of emergency, and confirmed situation. No further calls needed. |
| `NO_ANSWER` | Phone rang without response. Responder waits 2 minutes or proceeds to `SECONDARY` contact. |
| `VOICEMAIL_LEFT` | Urgent voicemail left with hospital emergency ward contact. Responder proceeds to `SECONDARY`. |
| `WRONG_NUMBER` | Contact disclaims knowledge of patient. Number flagged as erroneous; responder escalates to `SECONDARY`. |
| `BUSY` | Line busy. Immediate redial or proceed to secondary contact. |
| `CALL_FAILED` | Network unreachable, out of coverage, or operator error. |

### 2.2 Immutable Attempt Logging
Every call attempt is written to `ContactAttempt` with a timestamp, responder user ID, contact ID, and operational notes. This creates an indisputable record for hospital social workers, police, and family members.

---

## 3. Domestic Safety & Privacy Safeguards

### 3.1 Prohibition of Indiscriminate Automated Blasts
- **CRITICAL SAFETY DIRECTIVE:** The system must NEVER automatically broadcast indiscriminate SMS or push alerts to every contact on a patient's list simultaneously upon a scan.
- **Safety Rationale:** In domestic violence, stalking, or estranged family scenarios, an automated broadcast alerting an abusive relative of a vulnerable patient's emergency room location presents an acute physical danger to the patient.

### 3.2 Controlled Human Outreach
- All contact attempts are mediated by the authorized human responder on scene or the hospital social worker, who exercises situational judgment before disclosing patient location.
