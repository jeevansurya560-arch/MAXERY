export default function HierarchySection() {
  const tiers = [
    {
      level: 'Tier 1',
      title: 'Opaque QR / NFC Token',
      audience: 'Immediate Field Responders & Citizens',
      latency: '< 3.2 Seconds',
      description:
        'Zero-barrier physical token on wristband, wallet card, or helmet sticker. Instantly displays blood group, lethal drug contraindications, and emergency contact dialer without exposing citizen PII.',
      accent: 'var(--color-cyan)',
      shield: 'Zero-PII Public Tokenization',
    },
    {
      level: 'Tier 2',
      title: 'Responder Clinical Portal',
      audience: 'Authenticated Paramedics & ER Trauma Teams',
      latency: '< 15 Seconds',
      description:
        'Requires two-factor JWT authentication and responder verification. Unlocks expanded clinical history, active prescriptions, surgical implants, and organ donor declarations.',
      accent: 'var(--color-verified)',
      shield: 'Role-Based Access Control (RBAC)',
    },
    {
      level: 'Tier 3',
      title: 'Restricted Biometric Protocol',
      audience: 'Forensic & Intensive Care Custody',
      latency: 'On-Demand Custody',
      description:
        'Reserved for unconscious, tokenless patients in critical ICU care. Governed by strict statutory authorization and dual-witness digital chain-of-custody logging.',
      accent: 'var(--color-amber)',
      shield: 'Statutory Chain of Custody',
    },
    {
      level: 'Tier 4',
      title: 'Unidentified Case Registry',
      audience: 'Inter-Hospital & Trauma Coordination',
      latency: 'Continuous Registry Sync',
      description:
        'When physical tokens and biometric paths are exhausted, an anonymous case record is broadcast across regional trauma networks to cross-reference missing persons and family inquiries.',
      accent: 'var(--color-emergency)',
      shield: 'Nationwide Network Broadcasting',
    },
  ];

  return (
    <section className="section-wrapper" style={{ background: 'rgba(9, 13, 22, 0.6)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="section-eyebrow">DEFENSE-IN-DEPTH ARCHITECTURE</div>
          <h2>The 4-Tier Identification Hierarchy</h2>
          <p className="section-subtitle">
            A graduated, fail-safe protocol designed to deliver life-critical data instantly while maintaining strict statutory privacy protections.
          </p>
        </div>

        {/* 4-Column Architectural Grid */}
        <div className="grid-4">
          {tiers.map((tier) => (
            <div
              key={tier.level}
              className="card-soft"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: `3px solid ${tier.accent}`,
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
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: tier.accent,
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                    }}
                  >
                    {tier.level}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {tier.latency}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  {tier.title}
                </h3>

                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {tier.audience}
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {tier.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '0.75rem',
                  color: tier.accent,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <span>&#128274;</span>
                <span>{tier.shield}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
