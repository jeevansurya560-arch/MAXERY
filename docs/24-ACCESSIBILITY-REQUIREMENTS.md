# MAXERY — Accessibility & Usability Requirements

**Document Identifier:** `DOC-24`  
**Status:** DRAFT FOR INITIAL REVIEW  
**Classification:** Accessibility Standards & Compliance  
**Standard:** Web Content Accessibility Guidelines (WCAG) 2.1 Level AA

---

## 1. Field Usability & Ambient Contrast Standards

Emergency software must function flawlessly in extreme physical conditions:

1. **High Sunlight Contrast:**
   - Text elements must achieve a minimum contrast ratio of **7:1** against backgrounds (exceeding WCAG AA minimum of 4.5:1).
   - High-acuity alert badges use bold, pure white text (`#ffffff`) on saturated red (`#ef4444`) or dark navy (`#0f172a`).
2. **Glove-Friendly Touch Targets:**
   - All interactive touch targets (buttons, inputs, call triggers) must have a minimum bounding box of **48px by 48px** with at least 8px spacing between adjacent touch elements to prevent accidental touches by responders wearing medical nitrile gloves.
3. **Audio & Haptic Feedback:**
   - QR code scan success triggers a distinct haptic vibration and optional audible tone, confirming resolution without requiring the responder to look down at the screen during patient stabilization.

---

## 2. Keyboard Navigation & Screen Reader Support

1. **Full Keyboard Operability:**
   - Every interactive flow (including QR token input, case creation, and contact outreach logging) must be fully navigable via keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Esc`).
   - Visible, high-contrast focus rings (`3px solid #38bdf8`) must indicate the active element without relying solely on color.
2. **Semantic HTML5 & ARIA Attributes:**
   - Strict use of semantic landmarks (`<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`).
   - Dynamic real-time alerts (such as incoming unidentified cases) must use ARIA live regions:
     ```html
     <div role="status" aria-live="polite" class="sr-only">New unidentified case received</div>
     ```
3. **Screen Reader Testing:**
   - Automated accessibility test suites utilizing `axe-core` and Playwright ensure zero critical WCAG violations across all viewports.
