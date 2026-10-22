# MAXERY — REST API Specification

**Document Identifier:** `DOC-06`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Interface Standards & Contracts  
**API Version:** `v1`  
**Base URL:** `/api/v1`

---

## 1. Global API Standards

### 1.1 Content Types & Encoding
- All requests and responses use `application/json` with UTF-8 encoding.
- Date/time values adhere to ISO 8601 extended format with UTC offset (e.g., `2026-10-22T21:45:00.000Z`).

### 1.2 Standard Success Response Envelope
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2026-10-22T21:45:00.000Z",
    "version": "v1"
  }
}
```

### 1.3 Standard Error Response Envelope
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid token format",
    "details": [
      { "field": "token", "issue": "Must be at least 16 characters" }
    ]
  },
  "meta": {
    "timestamp": "2026-10-22T21:45:00.000Z"
  }
}
```

---

## 2. Core Endpoint Specifications

### 2.1 System & Health Checks

#### `GET /api/v1/health`
- **Purpose:** System readiness, liveness, and database connectivity probe.
- **Authentication:** Public / Unauthenticated.
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "status": "HEALTHY",
      "uptimeSeconds": 3600,
      "services": {
        "database": "CONNECTED",
        "redis": "OPTIONAL_AVAILABLE"
      },
      "version": "0.1.0"
    }
  }
  ```

---

### 2.2 Authentication & User Sessions

#### `POST /api/v1/auth/login`
- **Purpose:** Authenticate user credentials and issue signed JWT.
- **Rate Limit:** 5 requests per 15 minutes per IP.
- **Request Body:**
  ```json
  {
    "email": "responder@test-maxery.local",
    "password": "SecurePassword123!"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "u-uuid-1",
        "email": "responder@test-maxery.local",
        "fullName": "Paramedic Priya Sharma",
        "role": "RESPONDER"
      }
    }
  }
  ```

#### `GET /api/v1/auth/me`
- **Purpose:** Fetch current authenticated user profile and memberships.
- **Authentication:** Bearer JWT required.

---

### 2.3 Emergency Identification & QR Resolution

#### `POST /api/v1/identification/lookup-token`
- **Purpose:** Primary emergency entry point. Resolves an opaque QR token to emergency medical constraints and emergency contacts.
- **Authentication:** Responder or Dispatcher JWT required.
- **Rate Limit:** 30 requests per minute per user/IP.
- **Request Body:**
  ```json
  {
    "token": "MX-QR-7F89B2A4C1D0E3F5-DEMO",
    "accessReason": "Patient unconscious at vehicle collision scene",
    "latitude": 12.9716,
    "longitude": 77.5946
  }
  ```
- **Validation Rules (Zod):**
  - `token`: String, min 16 chars, max 128 chars, alphanumeric + `_` + `-`.
  - `accessReason`: String, min 3 chars, max 255 chars.
- **Audit & Side Effects:**
  - Creates an `IdentificationAttempt` record with GPS coordinates and responder ID.
  - Appends an `AuditEvent(QR_LOOKUP_SUCCESS)`.
  - Emits an `OutboxEvent(token.scanned)`.
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "patientCode": "PT-DEMO-2026-X79A",
      "bloodGroup": "O_POSITIVE",
      "primaryLanguage": "Kannada, English",
      "isOrganDonor": true,
      "emergencyNotes": "Carries emergency inhaler in bag",
      "allergies": [
        {
          "summary": "Penicillin - Severe Anaphylaxis",
          "details": "Severe bronchospasm and facial swelling",
          "source": "PHYSICIAN_DOCUMENTED",
          "verificationStatus": "VERIFIED"
        }
      ],
      "conditions": [
        {
          "summary": "Asthma (Mild Persistent)",
          "source": "SELF_REPORTED",
          "verificationStatus": "PENDING_REVIEW"
        }
      ],
      "contacts": [
        {
          "id": "c-uuid-1",
          "fullName": "Kavitha R.",
          "relationship": "Sister",
          "primaryPhone": "+91 94480 12345",
          "priority": "PRIMARY",
          "isVerified": true
        }
      ],
      "disclaimer": "MAXERY is an emergency coordination tool. It does not replace emergency medical diagnosis or hospital care."
    }
  }
  ```

---

### 2.4 Unidentified Patient Case Management

#### `POST /api/v1/cases`
- **Purpose:** Initiates a new active case for an unidentified patient.
- **Authentication:** Responder, Dispatcher, or Admin JWT required.
- **Request Body:**
  ```json
  {
    "estimatedAge": "25-35 years",
    "estimatedGender": "Female",
    "physicalDescription": "Approx 165cm, medium build, dark hair",
    "clothingDescription": "Blue running jacket, black sports leggings",
    "distinguishingFeatures": "Small scar over left eyebrow",
    "locationFound": "Cubbon Park Metro Station Exit B, Bengaluru",
    "hospitalName": "Bowring & Lady Curzon Hospital",
    "urgency": "URGENT",
    "notes": "Found unresponsive at 06:45 IST"
  }
  ```
- **Side Effects:**
  - Generates sequential human-readable `caseNumber` (`CASE-2026-0002`).
  - Commits `UnidentifiedCase` and initial `CaseEvent(CASE_OPENED)` atomically.
  - Inserts `OutboxEvent(case.created)`.
  - Outbox worker pushes `case.created` to Socket.IO `hospital:{orgId}` room.

#### `PATCH /api/v1/cases/:id/status`
- **Purpose:** Transition case status (`INVESTIGATING`, `PROVISIONALLY_IDENTIFIED`, `RESOLVED_IDENTIFIED`, `CLOSED_UNRESOLVED`).
- **Request Body:**
  ```json
  {
    "status": "RESOLVED_IDENTIFIED",
    "patientId": "p-uuid-verified",
    "notes": "Positive match confirmed via family visual identification at hospital"
  }
  ```

---

### 2.5 Trusted Contact Outreach Logging

#### `POST /api/v1/cases/:id/contact-attempts`
- **Purpose:** Records a communication attempt made to an emergency contact.
- **Request Body:**
  ```json
  {
    "emergencyContactId": "c-uuid-1",
    "method": "PHONE_CALL",
    "outcome": "CONNECTED_AWARE",
    "notes": "Sister Kavitha notified; en route to Bowring Hospital emergency ward."
  }
  ```
- **Validation:** `outcome` must be one of `CONNECTED_AWARE`, `NO_ANSWER`, `VOICEMAIL_LEFT`, `WRONG_NUMBER`, `BUSY`, `CALL_FAILED`.
- **Side Effects:**
  - Inserts `ContactAttempt`.
  - Appends `CaseEvent(CONTACT_ATTEMPTED)`.
  - Triggers `OutboxEvent(contact.attempt_updated)`.

---

### 2.6 Privacy & DPDPA Statutory Endpoints

#### `POST /api/v1/privacy/requests`
- **Purpose:** Citizen submission of statutory requests under the Indian DPDPA 2023.
- **Authentication:** Authenticated Patient JWT.
- **Request Body:**
  ```json
  {
    "requestType": "ACCESS_EXPORT",
    "reason": "Requesting a portable copy of all stored emergency medical records"
  }
  ```
