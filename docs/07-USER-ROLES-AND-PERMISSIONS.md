# MAXERY — User Roles & Permissions Matrix

**Document Identifier:** `DOC-07`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Security & Access Control Policy  
**Enforcement Mechanism:** Server-Side Fastify Route Middleware & Prisma Query Filters

---

## 1. Role Definitions

| Role | Domain Scope | Primary Operational Responsibility |
|---|---|---|
| **`PATIENT`** | Self & Nominated Dependents | Manages own medical constraints, blood group, emergency contacts, downloads/revokes physical QR tokens, and exercises DPDPA rights. |
| **`RESPONDER`** | Field Emergency Incidents | Field paramedic, EMT, or officer. Resolves emergency QR tokens, views critical contraindications, logs contact attempts, and manages unidentified cases. |
| **`DISPATCHER`** | Regional / Institutional | Central operations desk. Monitors active unidentified cases, coordinates ambulance fleets, and broadcasts hospital capacity. |
| **`ADMIN`** | Institutional / Hospital Unit | Hospital or EMS agency administrator. Verifies responder credentials, audits departmental lookups, and manages institutional memberships. |
| **`PLATFORM_AUDITOR`** | System Compliance | Independent officer overseeing statutory data governance, CERT-In compliance, and access abuse investigations. |

---

## 2. Granular Permissions Matrix

| Entity / Operation | `PATIENT` (Own Records) | `RESPONDER` (Active Emergency) | `DISPATCHER` (Jurisdiction) | `ADMIN` (Organisation) | `PLATFORM_AUDITOR` |
|---|---|---|---|---|---|
| **User Account** | Read/Update Self | Read Self | Read Self | Manage Agency Users | Read All (Auditing) |
| **Patient Profile** | Full Control | Read Redacted (via Token) | Read Redacted (via Token) | No Direct Access | Audit Log View Only |
| **Medical Information** | Create/Update/Delete | Read Active (via Token) | Read Active (via Token) | Verify (Clinical Admins) | Audit Log View Only |
| **Emergency Contacts** | Create/Update/Delete | Read & Call (via Token) | Read & Call (via Case) | No Direct Access | Audit Log View Only |
| **QR Identifier Token** | Generate / Revoke | Lookup / Resolve | Lookup / Resolve | Revoke Compromised | Audit Log View Only |
| **Unidentified Case** | No Access | Create / Update Status | View All / Assign | View Departmental | Read All (Auditing) |
| **Case Events** | No Access | Append Event | Append Event | Read Departmental | Read All (Auditing) |
| **Contact Attempt Log** | View Own Contacts | Record Attempt | Record Attempt | Read Departmental | Read All (Auditing) |
| **Audit Logs** | View Own Access Logs | No Access | No Access | Read Agency Logs | Full Read Access |
| **Consent Records** | Grant / Revoke | Read (Verification) | Read (Verification) | Read Verification | Read All |
| **Privacy Requests** | Submit / Track Self | No Access | No Access | No Access | Process & Audit |

---

## 3. Security Boundaries & Enforcement Rules

### 3.1 Server-Side Enforcement Rule
- Client-side route guards, hidden buttons, and CSS visibility styles are **purely ergonomic aids**.
- Every single read, write, update, and delete operation is evaluated by Fastify backend middleware.
- Prisma queries enforce ownership scoping:
  ```javascript
  // Example patient ownership query
  await prisma.patient.findFirst({
    where: { id: patientId, userId: request.user.id }
  });
  ```

### 3.2 Emergency Break-Glass & Auditing
- Emergency responder lookups against tokens do not bypass access controls; they invoke a **Restricted Emergency Access Protocol**.
- Every lookup requires an active, authenticated `RESPONDER` session and captures an operational `accessReason`.
- The event generates an immutable `AuditEvent` and alerts the patient or their registered contact (where configured).

### 3.3 Strict Prohibitions
1. **No Administrative Master Bypass:** System administrators cannot browse raw patient medical databases without an audited legal warrant or compliance mandate.
2. **No Bulk Export of Patient Records:** Emergency endpoints only return data for one specific scanned token at a time. Bulk enumeration is blocked by database constraints and rate limiters.
3. **No Modification of Audit Logs:** The `AuditEvent` table is strictly append-only. No `UPDATE` or `DELETE` SQL permissions are granted to the application database user.
