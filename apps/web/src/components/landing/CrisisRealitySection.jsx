export default function CrisisRealitySection() {
  const failurePoints = [
    {
      num: '01',
      title: 'The 42-Minute Identity Void',
      subtitle: 'Trauma Without Identification',
      description:
        'When an unconscious individual arrives at the ER without physical ID or unlocked phone access, trauma protocols delay cross-matched transfusions, next-of-kin consent, and clinical history retrieval.',
      impact: 'Average 42 minutes lost during the golden resuscitation window.',
      accent: 'var(--color-amber)',
    },
    {
      num: '02',
      title: 'Lethal Drug Contraindications',
      subtitle: 'Blindspot In Resuscitation',
      description:
        'Paramedics and ER physicians administer broad-spectrum antibiotics or blood thinners blindly. Severe penicillin anaphylaxis, malignant hyperthermia, or anticoagulant use remain invisible.',
      impact: 'Avoidable adverse drug interactions during emergency triage.',
      accent: 'var(--color-emergency)',
    },
    {
      num: '03',
      title: 'The Family Notification Blackout',
      subtitle: 'Isolation in Critical Hours',
      description:
        'Trusted contacts remain in the dark for hours while their family member undergoes emergency surgery. Locked smartphones prevent hospital social workers from finding who to call.',
      impact: '6 to 12 hour average delay in reaching verified loved ones.',
      accent: 'var(--color-cyan)',
    },
  ];

  return (
    <section className="section-wrapper" style={{ background: 'rgba(9, 13, 22, 0.4)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="section-eyebrow">THE TRIAGE PARADOX</div>
          <h2>Three Fatal Flaws in Conventional Emergency Response</h2>
          <p className="section-subtitle">
            Modern trauma medicine possesses world-class surgical capabilities, but remains handcuffed by archaic, analog patient identification.
          </p>
        </div>

        {/* 3-Column Failure Cards */}
        <div className="grid-3">
          {failurePoints.map((point) => (
            <div
              key={point.num}
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
                    marginBottom: '1.25rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.75rem',
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
                      letterSpacing: '0.08em',
                    }}
                  >
                    {point.subtitle}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.85rem' }}>
                  {point.title}
                </h3>

                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {point.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '1.75rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '0.8125rem',
                  color: point.accent,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>&bull;</span>
                <span>{point.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
