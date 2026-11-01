# 33 — FRONTEND LANDING & DESIGN SYSTEM ENGINEERING REPORT

## Document Control
- **Document Version:** 1.0.0
- **Status:** APPROVED & VERIFIED IN PRODUCTION BUILD
- **Date:** 2026-11-01
- **Platform:** MAXERY Aegis Protocol
- **Classification:** System Architecture & Frontend Quality Deliverable

---

## 1. Executive Summary: Resolution of Lagging Areas

Before this phase of implementation, an audit identified the following critical lagging areas in the repository:

| Lagging Component | Status Before This Turn | Actions Taken & Engineering Solution | Current Status |
|:---|:---|:---|:---|
| **Frontend Application Core (`apps/web`)** | Empty scaffold (`package.json`, `.env` only; no `src/`) | Created full Next.js 15 App Router architecture in pure JavaScript/JSX (`.js`, `.jsx`). | **COMPLETED & VERIFIED** |
| **Design System & Visual Tokens** | Missing | Built `globals.css` embodying Neoclassical structure + Soft UI depth + tactical Neumorphic triggers with zero CSS framework bloat. | **COMPLETED & VERIFIED** |
| **Brand Identity & Vector Assets** | Missing SVG assets | Designed and deployed crisp vector SVGs (`maxery-aegis-emblem.svg`, `maxery-wordmark.svg`, `maxery-logo-dark.svg`, `favicon.svg`). | **COMPLETED & VERIFIED** |
| **Interactive Triage Simulator** | Non-existent | Engineered `InteractiveScannerSimulator.jsx` allowing real-time token lookups (`MX-QR-7F89B2A4C1D0E3F5-DEMO`) with contraindications and next-of-kin alerts. | **COMPLETED & VERIFIED** |
| **Live Dispatcher Telemetry Deck** | Non-existent | Built `DispatcherConsoleSection.jsx` simulating real-time Socket.IO and transactional outbox event streams. | **COMPLETED & VERIFIED** |
| **Comprehensive Navigation & Sub-Pages** | No routing | Implemented `Navbar`, `Footer`, `how-it-works`, `safety`, `privacy`, `terms`, and `contact` pages with full error/loading boundaries. | **COMPLETED & VERIFIED** |
| **Build & Lint Pipeline** | Untested for frontend | Configured ESLint 9 Flat Config with `react/jsx-uses-vars`, verified 100% build pass across all workspaces. | **COMPLETED & VERIFIED** |

---

## 2. Tripartite Design System Architecture

MAXERY’s frontend interface rejects generic AI-slop templates, purple gradient meshes, and three-equal-card clichés in favor of a specialized **Tripartite Design System**:

### 2.1 Neoclassicism (Structure & Hierarchy)
- **Architectural Ratios:** Structured grids with asymmetric split layouts (e.g., 1.15fr to 0.85fr hero distribution).
- **Typography Stacks:** `Plus Jakarta Sans` for authoritative, high-legibility display headings paired with `Inter` for clinical body text and `JetBrains Mono` for token identifiers and latency telemetry.
- **Visual Discipline:** Section headers employ single-focus vertical stacks with high-contrast, uppercase mono eyebrows (`AEGIS EMERGENCY TRIAGE PROTOCOL`). Zero em-dashes (`—`) in accordance with anti-slop rules.

### 2.2 Soft UI (Surfaces & Depth)
- **Deep Obsidian Ground:** Base layers calibrated from `#05080f` (void) to `#090d16` (primary surface) and `#151f32` (elevated cards).
- **Multi-Level Ambient Shadows:** Subtly layered inner highlights (`inset 0 1px 0 rgba(255, 255, 255, 0.08)`) with diffuse drop shadows for optical depth without harsh drop-shadow boundaries.
- **Holographic Security Guilloche:** Subtle radial dot grids (`24px 24px` grid) and laser scanlines on the Aegis Medical Emergency card mockup.

### 2.3 Tactical Neumorphism (Physical Interactivity)
- **Tactile Buttons (`.btn-tactile`):** Raised pill and rounded rectangle buttons with soft top illumination.
- **Debossed Press States:** On `:active`, physical inset shadows (`inset 2px 2px 6px rgba(0, 0, 0, 0.5)`) and micro-scale transformations (`scale: 0.98`) provide unambiguous physical feedback during high-stress emergency actions.

---

## 3. Brand Identity & Visual Assets

All visual brand assets are vector SVGs located in `apps/web/public/branding/`:

```
apps/web/public/
├── branding/
│   ├── maxery-aegis-emblem.svg      # Geometric Aegis shield with central beacon cross
│   ├── maxery-wordmark.svg          # Neoclassical letter-spaced display wordmark
│   ├── maxery-logo-dark.svg         # Primary dark-mode header logo
├── favicon.svg                      # Browser tab icon
```

---

## 4. Component Hierarchy & Page Architecture

```
apps/web/src/
├── app/
│   ├── globals.css                  # Core design tokens, shadows, tactile states, a11y
│   ├── layout.jsx                   # Root layout, metadata, SEO, OpenGraph, Navbar, Footer
│   ├── page.jsx                     # High-impact landing page composing all sections
│   ├── loading.jsx                  # Dedicated client-safe suspense boundary
│   ├── error.jsx                    # Fault-isolated error boundary
│   ├── not-found.jsx                # 404 handler with quick navigation
│   ├── how-it-works/page.jsx        # 4-stage emergency lifecycle guide
│   ├── safety/page.jsx              # Clinical contraindication standards & protocols
│   ├── privacy/page.jsx             # DPDPA 2023 statutory rights & tokenization rules
│   ├── terms/page.jsx               # Good Samaritan protections & liability terms
│   └── contact/page.jsx             # Institutional hospital and responder onboarding
└── components/
    ├── layout/
    │   ├── Navbar.jsx               # Frosted glass sticky header with emergency CTA
    │   └── Footer.jsx               # 4-column architectural footer with 112 hotline notice
    ├── ui/
    │   ├── TactileButton.jsx        # Neumorphic interactive button with physical feedback
    │   └── StatusBadge.jsx          # Color-coded clinical and system state indicator
    └── landing/
        ├── HeroSection.jsx          # Asymmetric split hero with live Aegis Card preview
        ├── CrisisRealitySection.jsx # The 3 failure points of conventional trauma triage
        ├── InteractiveScannerSimulator.jsx # Live sub-second token lookup demonstration
        ├── HierarchySection.jsx     # 4-Tier Identification Hierarchy
        ├── DispatcherConsoleSection.jsx    # Hospital ER live event feed simulator
        └── PrivacyShieldSection.jsx # DPDPA 2023 and zero-PII security pillars
```

---

## 5. Automated Verification & Quality Benchmarks

### 5.1 Next.js 15 Production Build
```
Route (app)                                 Size  First Load JS
┌ ○ /                                    5.41 kB         117 kB
├ ○ /_not-found                            135 B         103 kB
├ ○ /contact                             2.23 kB         108 kB
├ ○ /how-it-works                          163 B         106 kB
├ ○ /privacy                               135 B         103 kB
├ ○ /safety                                135 B         103 kB
└ ○ /terms                                 135 B         103 kB
+ First Load JS shared by all             103 kB
```
- **Static Prerendering:** All 9 routes pre-rendered successfully (`○ Static`).
- **Build Execution Time:** < 2.0 seconds.

### 5.2 ESLint 9 Flat Config
- **Files Inspected:** Monorepo root, `apps/api`, `apps/web`, `packages/shared`.
- **Violations:** **0 errors, 0 warnings**.
- **Rule Extensions:** `react/jsx-uses-vars` activated to validate JSX component references.

### 5.3 Automated Vitest Test Suite (`@maxery/api`)
```
✓ tests/unit/schemas.test.js (3 tests)
✓ tests/unit/crypto.test.js (4 tests)
✓ tests/integration/routes.test.js (3 tests)

Test Files  3 passed (3)
     Tests  10 passed (10)
```

---

## 6. Statutory Life-Safety & Regulatory Compliance

1. **Digital Personal Data Protection Act, 2023 (DPDPA):**
   - Public QR codes embed zero citizen identifiers (no Aadhaar, PAN, or full names).
   - Medical lookup during acute emergencies operates under DPDPA Section 7(b).
2. **Emergency Numbers & Good Samaritan Protections:**
   - National Emergency Helpline banner (**TEL: 112**) prominently featured in the layout.
   - Protection of bona fide responders under Section 134A of the Motor Vehicles (Amendment) Act 2019 clearly stated in `/terms`.
3. **Clinical Guardrails:**
   - Explicit disclaimer that MAXERY is an informational technology coordination service and not a replacement for 112/911 or immediate ambulance dispatch.
