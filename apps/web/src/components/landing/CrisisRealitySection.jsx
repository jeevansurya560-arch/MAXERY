export default function CrisisRealitySection() {
  const failurePoints = [
    {
      num: 'I',
      title: 'The 42-Minute Identity Void',
      subtitle: 'Trauma Without Identification',
      description:
        'When an unconscious individual arrives at the ER without physical ID or unlocked phone access, trauma protocols delay cross-matched transfusions, next-of-kin consent, and clinical history retrieval.',
      impact: 'Average 42 minutes lost during the golden resuscitation window.',
      accent: 'var(--color-gold)',
    },
    {
      num: 'II',
      title: 'Lethal Drug Contraindications',
      subtitle: 'Blindspot In Resuscitation',
      description:
        'Paramedics and ER physicians administer broad-spectrum antibiotics or blood thinners blindly. Severe penicillin anaphylaxis, malignant hyperthermia, or anticoagulant use remain invisible.',
      impact: 'Avoidable adverse drug interactions during emergency triage.',
      accent: 'var(--color-emergency)',
    },
    {
      num: 'III',
      title: 'The Family Notification Blackout',
      subtitle: 'Isolation in Critical Hours',
      description:
        'Trusted contacts remain in the dark for hours while their family member undergoes emergency surgery. Locked smartphones prevent hospital social workers from finding who to call.',
      impact: '6 to 12 hour average delay in reaching verified loved ones.',
      accent: 'var(--color-cyan)',
    },
  ];

  return (
    <section className="section-wrapper" style={{ background: 'rgba(7, 10, 18, 0.6)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="section-eyebrow">✦ THE TRIAGE PARADOX ✦</div>
          <h2>Three Fatal Voids in Conventional Emergency Care</h2>
          <p className="section-subtitle">
            Modern clinical medicine possesses world-class surgical mastery, yet remains crippled by archaic, analog patient identification.
          </p>
        </div>

        {/* 3-Column Regal Failure Cards */}
        <div className="grid-3">
          {failurePoints.map((point) => (
            <div
              key={point.num}
              className="card-soft"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: `2px solid ${point.accent}`,
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-royal)',
                      fontSize: '2rem',
                      fontWeight: 800,
                      color: point.accent,
                    }}
                  >
                    {point.num}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {point.subtitle}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.95rem' }}>
                  {point.title}
                </h3>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {point.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '1.85rem',
                  paddingTop: '1.1rem',
                  borderTop: '1px solid var(--border-gold-subtle)',
                  fontSize: '0.8125rem',
                  color: point.accent,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>✦</span>
                <span>{point.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
