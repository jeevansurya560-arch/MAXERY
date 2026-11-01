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
      step: 'I',
      title: 'Citizen Enrollment & Opaque Tokenization',
      subtitle: 'Zero-PII Storage Model',
      description:
        'A citizen configures their emergency profile (blood group, severe drug allergies, chronic conditions, and emergency contacts). MAXERY hashes these records into a high-entropy cryptographically unguessable token (MX-QR-...). No Aadhaar, government numbers, or home addresses are ever printed or exposed on the token.',
      badge: 'verified',
    },
    {
      step: 'II',
      title: 'Instantaneous Field Scan',
      subtitle: 'Sub-4-Second Retrieval',
      description:
        'When an incident occurs, any field responder, traffic police officer, or bystander scans the physical token using any smartphone camera. No app installation or account login is required to access the high-acuity life-saving triage card.',
      badge: 'gold',
    },
    {
      step: 'III',
      title: 'Transactional Telemetry & Family Notification',
      subtitle: 'Guaranteed At-Least-Once Delivery',
      description:
        'The Fastify API commits the scan event and enqueues an outbox record inside an ACID database transaction. The background outbox worker immediately triggers SMS dispatch to trusted contacts with incident timestamp and geohash coordinates, eliminating the notification delay.',
      badge: 'emergency',
    },
    {
      step: 'IV',
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
          <div className="section-eyebrow" style={{ color: 'var(--color-muted-gold)', letterSpacing: '0.2em' }}>
            ✦ LIFECYCLE OF AN EMERGENCY ✦
          </div>
          <h1 className="font-neoclassical text-gold-foil" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 700 }}>
            How the Aegis Protocol Operates
          </h1>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: '0 auto', color: 'var(--color-warm-ivory-muted)' }}>
            A resilient, zero-friction workflow engineered to survive connectivity dropouts, power outages, and high-stress trauma scenarios.
          </p>
        </div>

        {/* Steps Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: 900, margin: '0 auto 4rem auto' }}>
          {steps.map((s) => (
            <div
              key={s.step}
              className="card-soft"
              style={{
                display: 'grid',
                gridTemplateColumns: '70px 1fr',
                gap: '1.75rem',
                alignItems: 'flex-start',
                background: 'var(--color-near-black)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-clinical-sm)',
                borderRadius: '8px',
              }}
            >
              <div
                className="font-neoclassical"
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: 'var(--color-muted-gold)',
                  background: 'rgba(23, 43, 64, 0.4)',
                  border: '1px solid rgba(191, 160, 106, 0.3)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 70,
                }}
              >
                {s.step}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <StatusBadge variant="gold" style={{ background: 'rgba(23, 43, 64, 0.4)', borderColor: 'rgba(191, 160, 106, 0.25)' }}>
                    {s.subtitle}
                  </StatusBadge>
                </div>
                <h3 className="font-neoclassical" style={{ fontSize: '1.25rem', marginBottom: '0.65rem', color: 'var(--color-warm-ivory)', letterSpacing: '0.02em', fontWeight: 600 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-warm-ivory-muted)', lineHeight: 1.65 }}>
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div
          className="card-soft"
          style={{
            maxWidth: 720,
            margin: '0 auto',
            padding: '2.5rem',
            textAlign: 'center',
            border: '1px solid var(--border-subtle)',
            background: 'linear-gradient(180deg, #141414 0%, #0E0E0E 100%)',
            boxShadow: 'var(--shadow-clinical-md)',
            borderRadius: '10px',
          }}
        >
          <h3 className="font-neoclassical text-gold-foil" style={{ fontSize: '1.65rem', marginBottom: '0.75rem', fontWeight: 700 }}>
            Ready to test the live demonstration?
          </h3>
          <p style={{ color: 'var(--color-warm-ivory-muted)', marginBottom: '1.75rem', maxWidth: '52ch', margin: '0 auto 1.75rem auto' }}>
            Simulate an emergency scan on our live interactive simulator to see the exact triage card presented to field paramedics.
          </p>
          <TactileButton href="/#scanner-simulator" variant="primary">
            Launch Interactive Simulator &rarr;
          </TactileButton>
        </div>
      </div>
    </div>
  );
}
