import StatusBadge from '../../components/ui/StatusBadge';

export const metadata = {
  title: 'Privacy Policy & DPDPA 2023 Compliance — MAXERY Aegis',
  description:
    'Comprehensive statutory privacy documentation, cryptographic tokenization architecture, and citizen data sovereignty under the Digital Personal Data Protection Act 2023.',
};

export default function PrivacyPage() {
  return (
    <div className="section-wrapper">
      <div className="container" style={{ maxWidth: 960 }}>
        {/* Header */}
        <div className="section-header centered">
          <div className="section-eyebrow" style={{ color: 'var(--color-gold)', letterSpacing: '0.22em' }}>
            ✦ STATUTORY DATA SOVEREIGNTY ✦
          </div>
          <h1 className="font-royal text-gold-foil" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
            Privacy Policy &amp; DPDPA 2023 Compliance
          </h1>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: '0 auto', color: 'var(--text-secondary)' }}>
            How MAXERY safeguards citizen personal information through zero-knowledge tokens, cryptographic pseudonymization, and strict emergency purpose limitation.
          </p>
        </div>

        {/* Content Modules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Section 1: Overview & Statutory Foundation */}
          <div
            className="card-soft"
            style={{
              background: 'linear-gradient(180deg, rgba(20, 16, 10, 0.8) 0%, rgba(10, 10, 14, 0.95) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.8)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <StatusBadge variant="gold">STATUTORY BASELINE</StatusBadge>
              <h2 className="font-royal" style={{ fontSize: '1.4rem', color: '#ffffff', letterSpacing: '0.02em' }}>
                1. DPDPA 2023 &amp; Legal Grounds
              </h2>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
              MAXERY operates in strict compliance with the <strong>Digital Personal Data Protection Act, 2023 (DPDPA)</strong> of India. Emergency processing of high-acuity medical contraindications is conducted under <strong>Section 7(b) of the DPDPA</strong>, which authorizes processing for responding to a medical emergency involving a threat to the life or immediate health of the Data Principal.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Outside of acute trauma events, all citizen data collection and profile maintenance operates exclusively on affirmative, verifiable, and freely given digital consent.
            </p>
          </div>

          {/* Section 2: Zero-PII Tokenization */}
          <div
            className="card-soft"
            id="tokenization"
            style={{
              background: 'linear-gradient(180deg, rgba(20, 16, 10, 0.8) 0%, rgba(10, 10, 14, 0.95) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.8)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <StatusBadge variant="cyan">CRYPTOGRAPHIC ISOLATION</StatusBadge>
              <h2 className="font-royal" style={{ fontSize: '1.4rem', color: '#ffffff', letterSpacing: '0.02em' }}>
                2. Zero-PII Public Tokenization
              </h2>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
              Physical emergency items (QR wristbands, wallet cards, NFC stickers) carry only an opaque cryptographically unguessable token string (e.g., <code>MX-QR-7F89B2A4...</code>).
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              <li>&bull; <strong>No Citizen Identifiers:</strong> Aadhaar numbers, PAN, voter cards, or passport numbers are never requested, stored, or linked.</li>
              <li>&bull; <strong>No Location Tracking:</strong> MAXERY does not track or store continuous GPS trails. Geohashes are recorded only upon a deliberate field scan by a responder.</li>
              <li>&bull; <strong>No Advertising or Monetization:</strong> Health data is strictly firewalled from commercial use, insurance profiling, or advertising networks.</li>
            </ul>
          </div>

          {/* Section 3: Citizen Rights */}
          <div
            className="card-soft"
            style={{
              background: 'linear-gradient(180deg, rgba(20, 16, 10, 0.8) 0%, rgba(10, 10, 14, 0.95) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.8)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <StatusBadge variant="gold">DATA PRINCIPAL RIGHTS</StatusBadge>
              <h2 className="font-royal" style={{ fontSize: '1.4rem', color: '#ffffff', letterSpacing: '0.02em' }}>
                3. Citizen Rights &amp; Token Erasure
              </h2>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
              In accordance with Section 11 and Section 12 of the DPDPA, every enrolled citizen has the unconditional right to:
            </p>
            <div className="grid-2" style={{ gap: '1rem' }}>
              <div style={{ background: 'rgba(212, 175, 55, 0.05)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <strong className="font-royal" style={{ color: 'var(--color-gold-light)' }}>Instant Revocation</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.5 }}>
                  Invalidate a lost physical QR wristband immediately through the citizen web console.
                </p>
              </div>
              <div style={{ background: 'rgba(212, 175, 55, 0.05)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <strong className="font-royal" style={{ color: 'var(--color-gold-light)' }}>Right to Erasure (Purge)</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.5 }}>
                  Permanently delete your medical profile, emergency contacts, and active tokens from all active databases.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Audit & Security */}
          <div
            className="card-soft"
            id="audit"
            style={{
              background: 'linear-gradient(180deg, rgba(20, 16, 10, 0.8) 0%, rgba(10, 10, 14, 0.95) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.8)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <StatusBadge variant="neutral">CRYPTOGRAPHIC LEDGER</StatusBadge>
              <h2 className="font-royal" style={{ fontSize: '1.4rem', color: '#ffffff', letterSpacing: '0.02em' }}>
                4. Immutable Audit Ledger
              </h2>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Every access request to a citizen profile generates an immutable, append-only audit entry containing the responder IP or verified ID, timestamp, and accessed fields. Any unauthorized or recreational inspection of health records is immediately detectable and subject to statutory penalties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
