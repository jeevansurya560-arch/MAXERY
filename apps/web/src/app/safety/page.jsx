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
      accent: 'var(--color-amber)',
      items: [
        'Direct Oral Anticoagulants (DOACs) or Warfarin alerts to manage severe hemorrhage and intracranial bleeding.',
        'Insulin-dependent diabetes mellitus warnings to prevent fatal untreated hypoglycemic seizures.',
        'Implanted medical devices: Cardiac pacemakers, AICDs, and deep brain stimulators for defibrillator safety.',
      ],
    },
    {
      title: 'Blood Product Stewardship',
      icon: '&#10010;',
      accent: 'var(--color-cyan)',
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
          <div className="section-eyebrow">CLINICAL TRIAGE INTEGRITY</div>
          <h1>Clinical Safety &amp; Contraindications</h1>
          <p className="section-subtitle">
            Engineered in consultation with trauma surgeons and emergency physicians to prevent fatal adverse events during the critical golden resuscitation hour.
          </p>
        </div>

        {/* Categories Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: 960, margin: '0 auto 4rem auto' }}>
          {safetyCategories.map((cat, idx) => (
            <div
              key={idx}
              className="card-soft"
              style={{
                borderLeft: `4px solid ${cat.accent}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '1.5rem', color: cat.accent }} dangerouslySetInnerHTML={{ __html: cat.icon }} />
                <h3 style={{ fontSize: '1.35rem' }}>{cat.title}</h3>
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
                      color: 'var(--text-secondary)',
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
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: 960,
            margin: '0 auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
            <StatusBadge variant="emergency">STATUTORY EMERGENCY NOTICE</StatusBadge>
            <h4 style={{ color: '#ffffff', margin: 0, fontSize: '1.1rem' }}>
              Standard Operating Procedure for First Responders
            </h4>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#fecaca', lineHeight: 1.65, margin: 0 }}>
            MAXERY is designed strictly as an auxiliary emergency decision-support protocol. Clinical triage staff and field paramedics must always prioritize standard advanced trauma life support (ATLS), airway management, breathing, and circulation before attempting digital token lookups. Never delay patient transport to an authorized emergency medical facility.
          </p>
        </div>
      </div>
    </div>
  );
}
