import StatusBadge from '../../components/ui/StatusBadge';

export const metadata = {
  title: 'Clinical Safety & Triage Protocols — MAXERY Aegis',
  description:
    'Clinical standards, lethal contraindication protections, and life-safety guardrails embedded in the MAXERY Aegis system.',
};

export default function SafetyPage() {
  const safetyCategories = [
    {
      title: 'High-Acuity Anaphylaxis Flags',
      icon: '&#9888;',
      accent: 'var(--color-emergency)',
      items: [
        'Beta-Lactam / Penicillin & Cephalosporin allergy warnings to prevent fatal anaphylaxis during empiric antibiotic administration.',
        'Neuromuscular blocker sensitivities (e.g., Succinylcholine / Malignant Hyperthermia vulnerability during emergency intubation).',
        'Radiocontrast media & Iodine allergies prior to emergency trauma CT angiography.',
      ],
    },
    {
      title: 'Anticoagulation & Chronic Triage Risks',
      icon: '&#9877;',
      accent: 'var(--color-muted-gold)',
      items: [
        'Direct Oral Anticoagulants (DOACs) or Warfarin alerts to manage severe hemorrhage and intracranial bleeding.',
        'Insulin-dependent diabetes mellitus warnings to prevent fatal untreated hypoglycemic seizures.',
        'Implanted medical devices: Cardiac pacemakers, AICDs, and deep brain stimulators for defibrillator safety.',
      ],
    },
    {
      title: 'Blood Product Stewardship',
      icon: '&#10010;',
      accent: 'var(--color-verified)',
      items: [
        'Universal RBC Donor flagging (O-Negative) and Rh-factor compatibility indicators.',
        'Known rare antibodies and transfusion history to accelerate emergency uncrossed blood availability.',
        'Special transfusion requirements (CMV-negative, irradiated blood) when clinically documented.',
      ],
    },
  ];

  return (
    <div className="section-wrapper">
      <div className="container">
        {/* Header */}
        <div className="section-header centered">
          <div className="section-eyebrow" style={{ color: 'var(--color-muted-gold)', letterSpacing: '0.2em' }}>
            ✦ CLINICAL TRIAGE SANCTITY ✦
          </div>
          <h1 className="font-neoclassical text-gold-foil" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 700 }}>
            Clinical Safety &amp; Contraindications
          </h1>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: '0 auto', color: 'var(--color-warm-ivory-muted)' }}>
            Engineered in consultation with trauma surgeons and emergency physicians to prevent fatal adverse events during the critical golden resuscitation hour.
          </p>
        </div>

        {/* Categories Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: 960, margin: '0 auto 4rem auto' }}>
          {safetyCategories.map((cat, idx) => (
            <div
              key={idx}
              className="card-soft"
              style={{
                background: 'var(--color-near-black)',
                border: '1px solid var(--border-subtle)',
                borderLeft: `4px solid ${cat.accent}`,
                boxShadow: 'var(--shadow-clinical-sm)',
                borderRadius: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '1.35rem', color: cat.accent }} dangerouslySetInnerHTML={{ __html: cat.icon }} />
                <h3 className="font-neoclassical" style={{ fontSize: '1.25rem', color: 'var(--color-warm-ivory)', letterSpacing: '0.02em', fontWeight: 600 }}>
                  {cat.title}
                </h3>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {cat.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      fontSize: '0.9375rem',
                      color: 'var(--color-warm-ivory-muted)',
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: cat.accent, fontWeight: 700 }}>&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Life-Safety Protocol Box */}
        <div
          style={{
            background: 'linear-gradient(90deg, rgba(220, 38, 38, 0.15) 0%, rgba(23, 43, 64, 0.25) 100%)',
            border: '1px solid rgba(220, 38, 38, 0.4)',
            borderRadius: '8px',
            padding: '1.75rem',
            maxWidth: 960,
            margin: '0 auto',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
            <StatusBadge variant="emergency">STATUTORY EMERGENCY NOTICE</StatusBadge>
            <h4 className="font-neoclassical" style={{ color: 'var(--color-warm-ivory)', margin: 0, fontSize: '1.05rem', letterSpacing: '0.02em', fontWeight: 600 }}>
              Standard Operating Procedure for First Responders
            </h4>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#fca5a5', lineHeight: 1.65, margin: 0 }}>
            MAXERY is designed strictly as an auxiliary emergency decision-support protocol. Clinical triage staff and field paramedics must always prioritize standard advanced trauma life support (ATLS), airway management, breathing, and circulation before attempting digital token lookups. Never delay patient transport to an authorized emergency medical facility.
          </p>
        </div>
      </div>
    </div>
  );
}
