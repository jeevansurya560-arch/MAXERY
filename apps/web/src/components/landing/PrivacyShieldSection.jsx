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
    <section className="section-wrapper" style={{ background: 'linear-gradient(180deg, rgba(7, 6, 9, 0.95) 0%, rgba(14, 12, 8, 0.98) 100%)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="section-eyebrow" style={{ color: 'var(--color-gold)', letterSpacing: '0.22em' }}>
            ✦ SOVEREIGN CITIZEN CHARTER ✦
          </div>
          <h2 className="font-royal text-gold-foil" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
            The Imperial Privacy Codex
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: '0 auto', color: 'var(--text-secondary)' }}>
            MAXERY balances instantaneous life-saving field triage with strict statutory privacy protections under India&apos;s DPDPA 2023 and global health data sovereignty.
          </p>
        </div>

        {/* 4-Pillar Grid */}
        <div className="grid-2" style={{ gap: '2rem' }}>
          {securityPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="card-soft"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'linear-gradient(180deg, rgba(20, 16, 10, 0.75) 0%, rgba(10, 10, 14, 0.95) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.22)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.8)',
              }}
            >
              {/* Subtle watermark Roman Numeral */}
              <div
                style={{
                  position: 'absolute',
                  top: -8,
                  right: 14,
                  fontFamily: 'var(--font-royal)',
                  fontSize: '4rem',
                  fontWeight: 900,
                  color: 'rgba(212, 175, 55, 0.05)',
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
                      fontFamily: 'var(--font-royal)',
                      fontSize: '0.8125rem',
                      color: 'var(--color-gold-light)',
                      letterSpacing: '0.08em',
                      fontWeight: 700,
                    }}
                  >
                    CODEX {pillar.roman}
                  </span>
                </div>

                <h3 className="font-royal" style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: '#ffffff', letterSpacing: '0.02em' }}>
                  {pillar.title}
                </h3>

                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {pillar.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid rgba(212, 175, 55, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
                  color: 'var(--color-gold-light)',
                  fontFamily: 'var(--font-royal)',
                  letterSpacing: '0.04em',
                }}
              >
                <span style={{ color: 'var(--color-gold)' }}>✦</span>
                <span>Statutory Sovereign Compliance Guaranteed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
