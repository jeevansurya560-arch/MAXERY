export default function HierarchySection() {
  const tiers = [
    {
      roman: 'I',
      level: 'Tier I',
      title: 'Opaque QR / NFC Token',
      audience: 'Immediate Field Responders & Citizens',
      latency: '< 3.2 Seconds',
      description:
        'Zero-barrier physical token on wristband, wallet card, or helmet sticker. Instantly displays blood group, lethal drug contraindications, and emergency contact dialer without exposing citizen PII.',
      accent: 'var(--color-muted-gold)',
      shield: 'Zero-PII Public Tokenization',
    },
    {
      roman: 'II',
      level: 'Tier II',
      title: 'Responder Clinical Portal',
      audience: 'Authenticated Paramedics & ER Trauma Teams',
      latency: '< 15 Seconds',
      description:
        'Requires two-factor JWT authentication and responder verification. Unlocks expanded clinical history, active prescriptions, surgical implants, and organ donor declarations.',
      accent: 'var(--color-clinical-navy-light)',
      shield: 'Role-Based Access Control (RBAC)',
    },
    {
      roman: 'III',
      level: 'Tier III',
      title: 'Restricted Biometric Protocol',
      audience: 'Forensic & Intensive Care Custody',
      latency: 'On-Demand Custody',
      description:
        'Reserved for unconscious, tokenless patients in critical ICU care. Governed by strict statutory authorization and dual-witness digital chain-of-custody logging.',
      accent: 'var(--color-amber)',
      shield: 'Statutory Chain of Custody',
    },
    {
      roman: 'IV',
      level: 'Tier IV',
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
    <section className="section-wrapper" style={{ background: 'var(--color-near-black)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="section-eyebrow">
            ✦ THE SOVEREIGN QUAD-TIER ARCHITECTURE ✦
          </div>
          <h2 className="font-neoclassical text-gold-foil" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)' }}>
            Four Resilient Layers of Defense
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: '1rem auto 0 auto', color: 'var(--color-warm-ivory-dim)' }}>
            A graduated, fail-safe protocol engineered to deliver instantaneous life-critical triage while maintaining absolute statutory sanctity under Indian privacy jurisprudence.
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
                background: 'var(--color-near-black-card)',
                border: '1px solid var(--border-subtle)',
                borderTop: `2px solid ${tier.accent}`,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-clinical-sm)',
              }}
            >
              {/* Subtle watermark Roman Numeral */}
              <div
                style={{
                  position: 'absolute',
                  top: -6,
                  right: 12,
                  fontFamily: 'var(--font-neoclassical)',
                  fontSize: '4rem',
                  fontWeight: 700,
                  color: 'rgba(245, 241, 234, 0.03)',
                  pointerEvents: 'none',
                  lineHeight: 1,
                }}
              >
                {tier.roman}
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
                  <span
                    style={{
                      fontFamily: 'var(--font-neoclassical)',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: tier.accent,
                      background: 'rgba(245, 241, 234, 0.04)',
                      border: '1px solid var(--border-hairline)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {tier.level}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--color-warm-ivory-muted)',
                      fontWeight: 500,
                    }}
                  >
                    {tier.latency}
                  </span>
                </div>

                <h3
                  className="font-neoclassical"
                  style={{
                    fontSize: '1.25rem',
                    marginBottom: '0.5rem',
                    color: 'var(--color-warm-ivory)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {tier.title}
                </h3>

                <div
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--color-warm-ivory-muted)',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                  }}
                >
                  {tier.audience}
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-ivory-dim)', lineHeight: 1.65 }}>
                  {tier.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border-hairline)',
                  fontSize: '0.75rem',
                  color: tier.accent,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  letterSpacing: '0.03em',
                }}
              >
                <span>🛡️</span>
                <span>{tier.shield}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
