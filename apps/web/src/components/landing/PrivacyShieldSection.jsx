import StatusBadge from '../ui/StatusBadge';

export default function PrivacyShieldSection() {
  const securityPillars = [
    {
      roman: 'I',
      title: 'Cryptographic Tokenization',
      subtitle: 'Zero Exposed PII',
      description:
        'Physical tokens and QR codes contain only a high-entropy pseudorandom string. A lost wristband reveals zero residential addresses, phone numbers, or government identifiers.',
      badge: 'gold',
    },
    {
      roman: 'II',
      title: 'Purpose-Limited Clinical Views',
      subtitle: 'Field Necessity Principle',
      description:
        'First responders only see high-acuity life-critical data: blood group, lethal contraindications, and emergency contact dialer. Full medical charts are strictly sequestered.',
      badge: 'cyan',
    },
    {
      roman: 'III',
      title: 'DPDPA 2023 Citizen Sovereignty',
      subtitle: 'Instant Token Revocation',
      description:
        'Citizens maintain full legal sovereignty under India’s Digital Personal Data Protection Act 2023. Tokens can be revoked, rotated, or permanently deleted in real time.',
      badge: 'gold',
    },
    {
      roman: 'IV',
      title: 'Immutable SHA-256 Audit Trail',
      subtitle: 'Accountable Chain of Custody',
      description:
        'Every scan, hospital triage lookup, and contact dispatch writes a cryptographic log with responder badge, timestamp, and geohash. Unauthorized snooping is mathematically deterred.',
      badge: 'neutral',
    },
  ];

  return (
    <section className="section-wrapper" style={{ background: 'var(--color-near-black)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="section-eyebrow">
            ✦ STATUTORY DATA SOVEREIGNTY ✦
          </div>
          <h2 className="font-neoclassical text-gold-foil" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)' }}>
            The Statutory Privacy Codex
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: '1rem auto 0 auto', color: 'var(--color-warm-ivory-dim)' }}>
            MAXERY balances instantaneous life-saving field triage with strict statutory privacy protections under India&apos;s DPDPA 2023 and global health data sovereignty.
          </p>
        </div>

        {/* 4-Pillar Grid */}
        <div className="grid-2" style={{ gap: '1.5rem' }}>
          {securityPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="card-soft"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'var(--color-near-black-card)',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-clinical-sm)',
              }}
            >
              {/* Subtle watermark Roman Numeral */}
              <div
                style={{
                  position: 'absolute',
                  top: -8,
                  right: 14,
                  fontFamily: 'var(--font-neoclassical)',
                  fontSize: '4rem',
                  fontWeight: 700,
                  color: 'rgba(245, 241, 234, 0.03)',
                  pointerEvents: 'none',
                  lineHeight: 1,
                }}
              >
                {pillar.roman}
              </div>

              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <StatusBadge variant={pillar.badge}>{pillar.subtitle}</StatusBadge>
                  <span
                    style={{
                      fontFamily: 'var(--font-neoclassical)',
                      fontSize: '0.8125rem',
                      color: 'var(--color-muted-gold)',
                      letterSpacing: '0.08em',
                      fontWeight: 700,
                    }}
                  >
                    CODEX {pillar.roman}
                  </span>
                </div>

                <h3 className="font-neoclassical" style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: 'var(--color-warm-ivory)', letterSpacing: '0.02em' }}>
                  {pillar.title}
                </h3>

                <p style={{ fontSize: '0.9375rem', color: 'var(--color-warm-ivory-dim)', lineHeight: 1.65 }}>
                  {pillar.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border-hairline)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
                  color: 'var(--color-warm-ivory-muted)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                }}
              >
                <span style={{ color: 'var(--color-verified)' }}>✓</span>
                <span>Statutory Sovereign Compliance Guaranteed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
