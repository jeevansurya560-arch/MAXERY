import StatusBadge from '../../components/ui/StatusBadge';

export const metadata = {
  title: 'Terms of Service & Responder Agreement — MAXERY Aegis',
  description:
    'Terms of service, liability limitations, Good Samaritan legal protections, and responder code of conduct for the MAXERY platform.',
};

export default function TermsPage() {
  return (
    <div className="section-wrapper">
      <div className="container" style={{ maxWidth: 960 }}>
        {/* Header */}
        <div className="section-header centered">
          <div className="section-eyebrow" style={{ color: 'var(--color-muted-gold)', letterSpacing: '0.2em' }}>
            ✦ LEGAL COVENANT &amp; PROTOCOL ✦
          </div>
          <h1 className="font-neoclassical text-gold-foil" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 700 }}>
            Terms of Service &amp; Responder Agreement
          </h1>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: '0 auto', color: 'var(--color-warm-ivory-muted)' }}>
            Governing the use of MAXERY by citizens, emergency medical technicians, law enforcement, and clinical healthcare providers.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Term 1 */}
          <div
            className="card-soft"
            style={{
              background: 'var(--color-near-black)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-clinical-sm)',
              borderRadius: '8px',
            }}
          >
            <h3 className="font-neoclassical" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--color-warm-ivory)', letterSpacing: '0.02em', fontWeight: 600 }}>
              1. Nature of the Service
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-warm-ivory-muted)', lineHeight: 1.7 }}>
              MAXERY is an informational technology coordination platform providing supplementary patient identification and trusted-contact broadcast. MAXERY does not operate ambulances, provide medical triage diagnostics, administer therapeutics, or replace governmental emergency services (112, 911, 999).
            </p>
          </div>

          {/* Term 2 */}
          <div
            className="card-soft"
            style={{
              background: 'var(--color-near-black)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-clinical-sm)',
              borderRadius: '8px',
            }}
          >
            <h3 className="font-neoclassical" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--color-warm-ivory)', letterSpacing: '0.02em', fontWeight: 600 }}>
              2. Limitation of Liability &amp; Disclaimers
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-warm-ivory-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
              To the fullest extent permissible by applicable law, MAXERY and its maintainers disclaim all warranties regarding the availability, uptime, readability, or physical durability of emergency QR tokens or wireless tags.
            </p>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-warm-ivory-muted)', lineHeight: 1.7 }}>
              MAXERY assumes no liability for adverse clinical reactions, failed network SMS dispatches caused by telecommunication outages, or inaccurate self-reported medical entries submitted by citizens.
            </p>
          </div>

          {/* Term 3 */}
          <div
            className="card-soft"
            style={{
              background: 'var(--color-near-black)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-clinical-sm)',
              borderRadius: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <StatusBadge variant="gold" style={{ background: 'rgba(23, 43, 64, 0.4)', borderColor: 'rgba(191, 160, 106, 0.25)' }}>
                GOOD SAMARITAN SHIELD
              </StatusBadge>
              <h3 className="font-neoclassical" style={{ fontSize: '1.2rem', color: 'var(--color-warm-ivory)', letterSpacing: '0.02em', fontWeight: 600 }}>
                3. Protection for Good Samaritans
              </h3>
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-warm-ivory-muted)', lineHeight: 1.7 }}>
              Responders and bystanders who scan a MAXERY token in good faith to render emergency assistance are protected under statutory Good Samaritan guidelines, including Section 134A of the Motor Vehicles (Amendment) Act, 2019. Responders acting in good faith shall not be subjected to harassment, interrogation, or civil liability for rendering assistance.
            </p>
          </div>

          {/* Term 4 */}
          <div
            className="card-soft"
            style={{
              background: 'var(--color-near-black)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-clinical-sm)',
              borderRadius: '8px',
            }}
          >
            <h3 className="font-neoclassical" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--color-warm-ivory)', letterSpacing: '0.02em', fontWeight: 600 }}>
              4. Responder Code of Conduct
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-warm-ivory-muted)', lineHeight: 1.7 }}>
              Verified medical practitioners and law enforcement personnel accessing Tier 2 or Tier 3 portals agree to use retrieved clinical data solely for active patient resuscitation or identification. Any unauthorized extraction, screenshots, or dissemination of medical records is strictly prohibited and prosecuted under the Information Technology Act, 2000 and DPDPA 2023.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
