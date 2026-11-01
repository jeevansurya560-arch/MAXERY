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
      accent: 'var(--color-gold)',
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
      accent: '#67e8f9',
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
      accent: '#fbbf24',
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
      accent: '#f87171',
      shield: 'Nationwide Network Broadcasting',
    },
  ];

  return (
    <section className="section-wrapper" style={{ background: 'linear-gradient(180deg, rgba(8, 7, 5, 0.9) 0%, rgba(5, 5, 8, 0.98) 100%)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="section-eyebrow" style={{ color: 'var(--color-gold)', letterSpacing: '0.22em' }}>
            ✦ THE SOVEREIGN QUAD-TIER ARCHITECTURE ✦
          </div>
          <h2 className="font-royal text-gold-foil" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
            Four Imperial Layers of Defense
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: '0 auto', color: 'var(--text-secondary)' }}>
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
                background: 'linear-gradient(180deg, rgba(20, 16, 10, 0.8) 0%, rgba(10, 10, 14, 0.95) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.22)',
                borderTop: `3px solid ${tier.accent}`,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.8)',
              }}
            >
              {/* Subtle watermark Roman Numeral */}
              <div
                style={{
                  position: 'absolute',
                  top: -10,
                  right: 12,
                  fontFamily: 'var(--font-royal)',
                  fontSize: '4.5rem',
                  fontWeight: 900,
                  color: 'rgba(212, 175, 55, 0.05)',
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
                      fontFamily: 'var(--font-royal)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: tier.accent,
                      background: 'rgba(212, 175, 55, 0.08)',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {tier.level}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--color-gold-light)',
                    }}
                  >
                    {tier.latency}
                  </span>
                </div>

                <h3
                  className="font-royal"
                  style={{
                    fontSize: '1.25rem',
                    marginBottom: '0.5rem',
                    color: '#ffffff',
                    letterSpacing: '0.02em',
                  }}
                >
                  {tier.title}
                </h3>

                <div
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--color-gold-dim)',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                  }}
                >
                  {tier.audience}
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {tier.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid rgba(212, 175, 55, 0.15)',
                  fontSize: '0.75rem',
                  color: tier.accent,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  letterSpacing: '0.03em',
                }}
              >
                <span>&#128081;</span>
                <span>{tier.shield}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
