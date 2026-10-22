# MAXERY — UI/UX Specification

**Document Identifier:** `DOC-23`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Interface Design Standards & Screen Specifications  
**Design Philosophy:** High-Acuity Calm, Rapid Legibility, Extreme Accessibility, Zero Friction

---

## 1. Visual Design Principles & Color Tokens

Emergency software is used under severe psychological stress, bright sunlight, rain, moving ambulance cabins, or dimly lit triage bays. The interface must prioritize **instant legibility over decorative flair**.

### Design Tokens (`globals.css` Core Palette):
- **Primary Navy / Trust:** `#0f172a` (Background / Deep Slate) & `#1e293b` (Card Surfaces)
- **Life Safety Red (High-Acuity Alert):** `#ef4444` (Severe Allergies, Critical Status)
- **Emergency Amber / Caution:** `#f59e0b` (Unverified Info, Investigating Status)
- **Clinical Emerald / Verified:** `#10b981` (Verified Data, Active Tokens, Resolved Cases)
- **High-Contrast Text:** `#f8fafc` (Primary White, 15:1 contrast against `#0f172a`)
- **Muted Label Text:** `#94a3b8` (Secondary Slate, 7:1 contrast)
- **Focus Indicator:** `#38bdf8` (3px solid cyan outline for keyboard navigation)

---

## 2. Global Site Map & Navigation Tree

```text
Public Portal (Unauthenticated)
├── /                                Landing page: Overview, Hierarchy, Disclaimers
├── /how-it-works                    Step-by-step citizen & responder journeys
├── /safety                          Medical disclaimers & non-operational limitations
├── /privacy                         Draft statutory privacy policy (DPDPA 2023)
├── /terms                           Draft terms of service & responder conduct
├── /accessibility                   WCAG 2.1 AA statement & keyboard shortcut guide
└── /contact                         Support, emergency contact & grievance officer

Authentication
├── /login                           Email + password login with account lockouts
├── /register                        Citizen/Responder signup with DPDPA consent checkbox
└── /account-recovery                Account recovery & emergency PIN reset

Patient Portal (Role: PATIENT)
├── /dashboard                       Active QR card status, quick profile metrics
├── /profile                         Personal demographics, blood group, languages
├── /medical-information             Add/edit allergies, chronic conditions, medications
├── /emergency-contacts              Add/reorder primary, secondary, tertiary contacts
├── /emergency-id                    SVG QR token preview, printable cards, revoke button
└── /privacy-settings                Download data export, submit DPDPA erasure request

Responder Field Portal (Role: RESPONDER)
├── /dashboard                       Incident shortcuts, active cases in jurisdiction
├── /identify                        High-speed QR camera scanner & manual token input
├── /cases                           Unidentified patient registry & intake form
├── /cases/[id]                      Case timeline, live events, contact attempt dialer
└── /notifications                   Emergency broadcast alerts from dispatch

Institutional Admin (Role: ADMIN)
├── /dashboard                       Institutional caseload & responder rosters
├── /organisations                   Hospital/EMS unit profile & station metadata
├── /users                           Responder account verification & credentialing
├── /audit                           Searchable immutable audit event explorer
└── /security                        Anomalous access detection & security posture
```

---

## 3. Screen Specifications & State Management

### 3.1 Screen: Emergency QR Scanner & Token Lookup (`/identify`)
- **Primary Purpose:** Field identification in seconds.
- **Key Elements:**
  - Full-width HTML5 camera viewfinder with scanning reticle.
  - High-visibility manual token input field for damaged or smudged QR codes.
  - Mandatory "Operational Reason" input (e.g., "Unconscious patient on scene").
  - Geolocation attestation toggle (auto-detects GPS coordinates).
- **States:**
  - *Scanning:* Animated reticle with high-contrast corner brackets.
  - *Resolving:* Non-blocking spinner with "Validating cryptographic token..."
  - *Success (Patient Found):* Instant transition to High-Acuity Medical Summary.
  - *Failure (Token Inactive / Not Found):* Prominent Red Alert: "Identifier Inactive or Revoked" with a prominent primary button: **"Open Unidentified Case Now"**.

### 3.2 Screen: High-Acuity Medical Summary (`/patient-records/[id]`)
- **Key Elements:**
  - **Banner 1 (Red High-Alert):** Severe Drug Allergies (e.g., "PENICILLIN - ANAPHYLAXIS RISK") with physician verification badge.
  - **Banner 2 (Amber Alert):** Blood Group (`O_POSITIVE`) and active medications (e.g., "Warfarin / Blood Thinners").
  - **Section 3 (Direct Outreach):** Primary contact card with large, one-tap green **"Call Kavitha R. (Sister)"** button.
  - **Section 4 (Log Outcome):** Quick dropdown to record outcome (`CONNECTED_AWARE`, `NO_ANSWER`, etc.) directly from the call screen.

### 3.3 Screen: Unidentified Case Registry (`/cases`)
- **Key Elements:**
  - Real-time case cards showing Case Number, Urgency Badge, Estimated Age/Gender, Location Found, and Time Elapsed.
  - Instant live updates powered by Socket.IO (`case.created`, `case.status_updated`).
  - Search and filter bar by hospital name, urgency level, and date.
