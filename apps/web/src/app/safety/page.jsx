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
          <div className="section-eyebrow" style={{ color: 'var(--color-gold)', letterSpacing: '0.22em' }}>
            ✦ CLINICAL TRIAGE SANCTITY ✦
          </div>
          <h1 className="font-royal text-gold-foil" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
            Clinical Safety &amp; Contraindications
          </h1>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: '0 auto', color: 'var(--text-secondary)' }}>
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
                background: 'linear-gradient(180deg, rgba(20, 16, 10, 0.8) 0%, rgba(10, 10, 14, 0.95) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.22)',
                borderLeft: `4px solid ${cat.accent}`,
                boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '1.5rem', color: cat.accent }} dangerouslySetInnerHTML={{ __html: cat.icon }} />
                <h3 className="font-royal" style={{ fontSize: '1.35rem', color: '#ffffff', letterSpacing: '0.02em' }}>
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
            background: 'linear-gradient(90deg, rgba(185, 28, 28, 0.2) 0%, rgba(20, 16, 10, 0.8) 100%)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: 960,
            margin: '0 auto',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
            <StatusBadge variant="emergency">STATUTORY EMERGENCY NOTICE</StatusBadge>
            <h4 className="font-royal" style={{ color: '#ffffff', margin: 0, fontSize: '1.1rem', letterSpacing: '0.02em' }}>
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
