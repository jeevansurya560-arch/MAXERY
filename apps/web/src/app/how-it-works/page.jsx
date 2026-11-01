import TactileButton from '../../components/ui/TactileButton';
import StatusBadge from '../../components/ui/StatusBadge';

export const metadata = {
  title: 'How It Works — MAXERY Aegis Emergency Protocol',
  description:
    'Step-by-step technical and clinical breakdown of the Aegis emergency triage lifecycle from citizen enrollment to golden-hour resuscitation.',
};

export default function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      title: 'Citizen Enrollment & Opaque Tokenization',
      subtitle: 'Zero-PII Storage Model',
      description:
        'A citizen configures their emergency profile (blood group, severe drug allergies, chronic conditions, and emergency contacts). MAXERY hashes these records into a high-entropy cryptographically unguessable token (MX-QR-...). No Aadhaar, government numbers, or home addresses are ever printed or exposed on the token.',
      badge: 'verified',
    },
    {
      step: '02',
      title: 'Instantaneous Field Scan',
      subtitle: 'Sub-4-Second Retrieval',
      description:
        'When an incident occurs, any field responder, traffic police officer, or bystander scans the physical token using any smartphone camera. No app installation or account login is required to access the high-acuity life-saving triage card.',
      badge: 'cyan',
    },
    {
      step: '03',
      title: 'Transactional Telemetry & Family Notification',
      subtitle: 'Guaranteed At-Least-Once Delivery',
      description:
        'The Fastify API commits the scan event and enqueues an outbox record inside an ACID database transaction. The background outbox worker immediately triggers SMS dispatch to trusted contacts with incident timestamp and geohash coordinates, eliminating the notification delay.',
      badge: 'emergency',
    },
    {
      step: '04',
      title: 'Hospital Trauma Bay Pre-Arrival Preparation',
      subtitle: 'Synchronized Clinical Care',
      description:
        'Regional hospital emergency departments subscribed to the Socket.IO cluster receive real-time alerts. Blood banks can prepare matched uncrossed blood products (e.g., O-Negative), and trauma teams are warned of lethal contraindications before the ambulance wheels through the door.',
      badge: 'verified',
    },
  ];

  return (
    <div className="section-wrapper">
      <div className="container">
        {/* Header */}
        <div className="section-header centered">
          <div className="section-eyebrow" style={{ color: 'var(--color-gold)', letterSpacing: '0.22em' }}>
            ✦ LIFECYCLE OF AN EMERGENCY ✦
          </div>
          <h1 className="font-royal text-gold-foil" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
            How the Aegis Protocol Operates
          </h1>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: '0 auto', color: 'var(--text-secondary)' }}>
            A resilient, zero-friction workflow engineered to survive connectivity dropouts, power outages, and high-stress trauma scenarios.
          </p>
        </div>

        {/* Steps Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: 900, margin: '0 auto 4rem auto' }}>
          {steps.map((s) => (
            <div
              key={s.step}
              className="card-soft"
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: '2rem',
                alignItems: 'flex-start',
                background: 'linear-gradient(180deg, rgba(20, 16, 10, 0.8) 0%, rgba(10, 10, 14, 0.95) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.22)',
                boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div
                className="font-royal"
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: 'var(--color-gold)',
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 80,
                }}
              >
                {s.step}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <StatusBadge variant="gold">{s.subtitle}</StatusBadge>
                </div>
                <h3 className="font-royal" style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: '#ffffff', letterSpacing: '0.02em' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div
          className="card-holographic"
          style={{
            maxWidth: 720,
            margin: '0 auto',
            padding: '2.5rem',
            textAlign: 'center',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.1)',
          }}
        >
          <h3 className="font-royal text-gold-foil" style={{ fontSize: '1.65rem', marginBottom: '0.75rem' }}>
            Ready to test the live demonstration?
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', maxWidth: '52ch', margin: '0 auto 1.75rem auto' }}>
            Simulate an emergency scan on our live interactive simulator to see the exact triage card presented to field paramedics.
          </p>
          <TactileButton href="/#scanner-simulator" variant="primary">
            ✦ Launch Interactive Simulator &rarr;
          </TactileButton>
        </div>
      </div>
    </div>
  );
}
