export default function CrisisRealitySection() {
  const failurePoints = [
    {
      num: 'I',
      title: 'The 42-Minute Identity Void',
      subtitle: 'Trauma Without Identification',
      description:
        'When an unconscious individual arrives at the ER without physical ID or unlocked phone access, trauma protocols delay cross-matched transfusions, next-of-kin consent, and clinical history retrieval.',
      impact: 'Average 42 minutes lost during the golden resuscitation window.',
      accent: 'var(--color-muted-gold)',
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
      accent: 'var(--color-clinical-navy-light)',
    },
  ];

  return (
    <section className="section-wrapper" style={{ background: 'var(--color-near-black-elevated)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="section-eyebrow">✦ THE TRIAGE PARADOX ✦</div>
          <h2 className="font-neoclassical" style={{ color: 'var(--color-warm-ivory)', letterSpacing: '0.03em' }}>
            Three Critical Voids in Conventional Emergency Care
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: '1rem auto 0 auto', color: 'var(--color-warm-ivory-dim)' }}>
            Modern clinical medicine possesses world-class surgical mastery, yet remains crippled by archaic, analog patient identification.
          </p>
        </div>

        {/* 3-Column Bento Cards */}
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
                background: 'var(--color-near-black-card)',
                boxShadow: 'var(--shadow-clinical-sm)',
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
                    className="font-neoclassical"
                    style={{
                      fontSize: '1.85rem',
                      fontWeight: 700,
                      color: point.accent,
                    }}
                  >
                    {point.num}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--color-warm-ivory-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontWeight: 600,
                    }}
                  >
                    {point.subtitle}
                  </span>
                </div>

                <h3 className="font-neoclassical" style={{ fontSize: '1.35rem', marginBottom: '0.85rem', color: 'var(--color-warm-ivory)', letterSpacing: '0.02em' }}>
                  {point.title}
                </h3>

                <p style={{ fontSize: '0.9375rem', color: 'var(--color-warm-ivory-dim)', lineHeight: 1.65 }}>
                  {point.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '1.75rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-hairline)',
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
