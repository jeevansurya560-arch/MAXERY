import StatusBadge from '../ui/StatusBadge';

export default function PrivacyShieldSection() {
  const securityPillars = [
    {
      title: 'Cryptographic Tokenization',
      subtitle: 'Zero Exposed PII',
      description:
        'Physical tokens and QR codes contain only a high-entropy pseudorandom string. A lost wristband reveals zero residential addresses, phone numbers, or government identifiers.',
      badge: 'verified',
    },
    {
      title: 'Purpose-Limited Clinical Views',
      subtitle: 'Field Necessity Principle',
      description:
        'First responders only see high-acuity life-critical data: blood group, lethal contraindications, and emergency contact dialer. Full medical charts are strictly sequestered.',
      badge: 'cyan',
    },
    {
      title: 'DPDPA 2023 Citizen Sovereignty',
      subtitle: 'Instant Token Revocation',
      description:
        'Citizens maintain full legal sovereignty under Indias Digital Personal Data Protection Act 2023. Tokens can be revoked, rotated, or permanently deleted in real time.',
      badge: 'verified',
    },
    {
      title: 'Immutable SHA-256 Audit Trail',
      subtitle: 'Accountable Chain of Custody',
      description:
        'Every scan, hospital triage lookup, and contact dispatch writes a cryptographic log with responder badge, timestamp, and geohash. Unauthorized snooping is mathematically deterred.',
      badge: 'neutral',
    },
  ];

  return (
    <section className="section-wrapper" style={{ background: 'rgba(9, 13, 22, 0.4)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="section-eyebrow">STATUTORY DATA SOVEREIGNTY</div>
          <h2>Engineered for Privacy. Built for Survival.</h2>
          <p className="section-subtitle">
            MAXERY balances instantaneous life-saving field triage with strict statutory privacy protections under India's DPDPA 2023 and global health data standards.
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
              }}
            >
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
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8125rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    RULE {idx + 1}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>
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
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                }}
              >
                <span style={{ color: 'var(--color-verified)' }}>&#10003;</span>
                <span>Statutory Compliance Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
