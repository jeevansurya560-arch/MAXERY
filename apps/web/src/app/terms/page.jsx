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
          <div className="section-eyebrow" style={{ color: 'var(--color-gold)', letterSpacing: '0.22em' }}>
            ✦ LEGAL COVENANT &amp; PROTOCOL ✦
          </div>
          <h1 className="font-royal text-gold-foil" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
            Terms of Service &amp; Responder Agreement
          </h1>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: '0 auto', color: 'var(--text-secondary)' }}>
            Governing the use of MAXERY by citizens, emergency medical technicians, law enforcement, and clinical healthcare providers.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Term 1 */}
          <div
            className="card-soft"
            style={{
              background: 'linear-gradient(180deg, rgba(20, 16, 10, 0.8) 0%, rgba(10, 10, 14, 0.95) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.8)',
            }}
          >
            <h3 className="font-royal" style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#ffffff', letterSpacing: '0.02em' }}>
              1. Nature of the Service
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              MAXERY is an informational technology coordination platform providing supplementary patient identification and trusted-contact broadcast. MAXERY does not operate ambulances, provide medical triage diagnostics, administer therapeutics, or replace governmental emergency services (112, 911, 999).
            </p>
          </div>

          {/* Term 2 */}
          <div
            className="card-soft"
            style={{
              background: 'linear-gradient(180deg, rgba(20, 16, 10, 0.8) 0%, rgba(10, 10, 14, 0.95) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.8)',
            }}
          >
            <h3 className="font-royal" style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#ffffff', letterSpacing: '0.02em' }}>
              2. Limitation of Liability &amp; Disclaimers
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
              To the fullest extent permissible by applicable law, MAXERY and its maintainers disclaim all warranties regarding the availability, uptime, readability, or physical durability of emergency QR tokens or wireless tags.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              MAXERY assumes no liability for adverse clinical reactions, failed network SMS dispatches caused by telecommunication outages, or inaccurate self-reported medical entries submitted by citizens.
            </p>
          </div>

          {/* Term 3 */}
          <div
            className="card-soft"
            style={{
              background: 'linear-gradient(180deg, rgba(20, 16, 10, 0.8) 0%, rgba(10, 10, 14, 0.95) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.8)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <StatusBadge variant="gold">GOOD SAMARITAN SHIELD</StatusBadge>
              <h3 className="font-royal" style={{ fontSize: '1.25rem', color: '#ffffff', letterSpacing: '0.02em' }}>
                3. Protection for Good Samaritans
              </h3>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Responders and bystanders who scan a MAXERY token in good faith to render emergency assistance are protected under statutory Good Samaritan guidelines, including Section 134A of the Motor Vehicles (Amendment) Act, 2019. Responders acting in good faith shall not be subjected to harassment, interrogation, or civil liability for rendering assistance.
            </p>
          </div>

          {/* Term 4 */}
          <div
            className="card-soft"
            style={{
              background: 'linear-gradient(180deg, rgba(20, 16, 10, 0.8) 0%, rgba(10, 10, 14, 0.95) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.8)',
            }}
          >
            <h3 className="font-royal" style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#ffffff', letterSpacing: '0.02em' }}>
              4. Responder Code of Conduct
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Verified medical practitioners and law enforcement personnel accessing Tier 2 or Tier 3 portals agree to use retrieved clinical data solely for active patient resuscitation or identification. Any unauthorized extraction, screenshots, or dissemination of medical records is strictly prohibited and prosecuted under the Information Technology Act, 2000 and DPDPA 2023.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
