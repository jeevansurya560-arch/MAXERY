'use client';

import { useState } from 'react';
import TactileButton from '../../components/ui/TactileButton';
import StatusBadge from '../../components/ui/StatusBadge';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    role: 'hospital',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="section-wrapper">
      <div className="container" style={{ maxWidth: 880 }}>
        {/* Header */}
        <div className="section-header centered">
          <div className="section-eyebrow" style={{ color: 'var(--color-muted-gold)', letterSpacing: '0.2em' }}>
            ✦ INSTITUTIONAL ALLIANCES ✦
          </div>
          <h1 className="font-neoclassical text-gold-foil" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 700 }}>
            Responder &amp; Hospital Trauma Network
          </h1>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: '0 auto', color: 'var(--color-warm-ivory-muted)' }}>
            Integrate your emergency department, ambulance fleet, or trauma network directly into the MAXERY real-time dispatch mesh.
          </p>
        </div>

        {/* Integration Pillars */}
        <div className="grid-3" style={{ marginBottom: '3rem' }}>
          <div
            className="card-soft"
            style={{
              background: 'var(--color-near-black)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-clinical-sm)',
              borderRadius: '8px',
            }}
          >
            <StatusBadge variant="gold" style={{ marginBottom: '0.75rem', background: 'rgba(23, 43, 64, 0.4)', borderColor: 'rgba(191, 160, 106, 0.25)' }}>ER TRAUMA</StatusBadge>
            <h3 className="font-neoclassical" style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--color-warm-ivory)', letterSpacing: '0.02em', fontWeight: 600 }}>
              Hospital Integration
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-warm-ivory-muted)', lineHeight: 1.6 }}>
              Direct Socket.IO feeds for trauma bays to receive pre-arrival blood group alerts and contraindication warnings.
            </p>
          </div>

          <div
            className="card-soft"
            style={{
              background: 'var(--color-near-black)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-clinical-sm)',
              borderRadius: '8px',
            }}
          >
            <StatusBadge variant="gold" style={{ marginBottom: '0.75rem', background: 'rgba(23, 43, 64, 0.4)', borderColor: 'rgba(191, 160, 106, 0.25)' }}>EMS FLEETS</StatusBadge>
            <h3 className="font-neoclassical" style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--color-warm-ivory)', letterSpacing: '0.02em', fontWeight: 600 }}>
              Ambulance Fleets
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-warm-ivory-muted)', lineHeight: 1.6 }}>
              Automated handheld scanner pairing with zero internet latency offline token caching.
            </p>
          </div>

          <div
            className="card-soft"
            style={{
              background: 'var(--color-near-black)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-clinical-sm)',
              borderRadius: '8px',
            }}
          >
            <StatusBadge variant="neutral" style={{ marginBottom: '0.75rem', background: 'rgba(23, 43, 64, 0.4)', borderColor: 'rgba(191, 160, 106, 0.25)' }}>COORDINATION</StatusBadge>
            <h3 className="font-neoclassical" style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--color-warm-ivory)', letterSpacing: '0.02em', fontWeight: 600 }}>
              Public Safety
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-warm-ivory-muted)', lineHeight: 1.6 }}>
              Inter-agency coordination for missing persons and unidentified case registry broadcasts.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div
          className="card-soft"
          style={{
            padding: '2.5rem',
            background: 'linear-gradient(180deg, #141414 0%, #0E0E0E 100%)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-clinical-md)',
            borderRadius: '10px',
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(5, 150, 105, 0.15)',
                  border: '1px solid rgba(5, 150, 105, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto',
                  color: 'var(--color-verified)',
                  fontSize: '1.5rem',
                }}
              >
                &#10003;
              </div>
              <h3 className="font-neoclassical" style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--color-warm-ivory)' }}>Inquiry Registered</h3>
              <p style={{ color: 'var(--color-warm-ivory-muted)', maxWidth: '44ch', margin: '0 auto 1.5rem auto' }}>
                Thank you for reaching out. Our emergency network integration liaison will contact your team within 24 business hours.
              </p>
              <TactileButton variant="secondary" onClick={() => setSubmitted(false)}>
                Submit Another Request
              </TactileButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 className="font-neoclassical text-gold-foil" style={{ fontSize: '1.35rem', fontWeight: 700 }}>Institutional Onboarding Inquiry</h3>

              <div className="grid-2">
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--color-warm-ivory-muted)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontFamily: 'var(--font-neoclassical)',
                    }}
                  >
                    Contact Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(20, 20, 20, 0.9)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      padding: '0.75rem 1rem',
                      color: 'var(--color-warm-ivory)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--color-warm-ivory-muted)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontFamily: 'var(--font-neoclassical)',
                    }}
                  >
                    Hospital / Department
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(20, 20, 20, 0.9)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      padding: '0.75rem 1rem',
                      color: 'var(--color-warm-ivory)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--color-warm-ivory-muted)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontFamily: 'var(--font-neoclassical)',
                    }}
                  >
                    Institutional Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(20, 20, 20, 0.9)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      padding: '0.75rem 1rem',
                      color: 'var(--color-warm-ivory)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--color-warm-ivory-muted)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontFamily: 'var(--font-neoclassical)',
                    }}
                  >
                    Organization Type
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(20, 20, 20, 0.9)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      padding: '0.75rem 1rem',
                      color: 'var(--color-warm-ivory)',
                      outline: 'none',
                    }}
                  >
                    <option value="hospital">Hospital Trauma Center (Level 1/2)</option>
                    <option value="ems">Emergency Medical Services / Paramedic Fleet</option>
                    <option value="police">Law Enforcement / Traffic Rescue</option>
                    <option value="corporate">Enterprise / Campus Health Network</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--color-warm-ivory-muted)',
                    marginBottom: '0.4rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontFamily: 'var(--font-neoclassical)',
                  }}
                >
                  Technical or Clinical Objectives
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your expected monthly trauma volume, integration requirements, or field deployment timeline..."
                  style={{
                    width: '100%',
                    background: 'rgba(20, 20, 20, 0.9)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    padding: '0.75rem 1rem',
                    color: 'var(--color-warm-ivory)',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div>
                <TactileButton type="submit" variant="primary">
                  Transmit Institutional Inquiry &rarr;
                </TactileButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
