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
          <div className="section-eyebrow">INSTITUTIONAL PARTNERSHIPS</div>
          <h1>Responder &amp; Hospital Trauma Network</h1>
          <p className="section-subtitle">
            Integrate your emergency department, ambulance fleet, or trauma network directly into the MAXERY real-time dispatch mesh.
          </p>
        </div>

        {/* Integration Pillars */}
        <div className="grid-3" style={{ marginBottom: '3.5rem' }}>
          <div className="card-soft">
            <StatusBadge variant="cyan" style={{ marginBottom: '0.75rem' }}>ER TRAUMA</StatusBadge>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Hospital Integration</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Direct Socket.IO feeds for trauma bays to receive pre-arrival blood group alerts and contraindication warnings.
            </p>
          </div>

          <div className="card-soft">
            <StatusBadge variant="verified" style={{ marginBottom: '0.75rem' }}>EMS FLEETS</StatusBadge>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Ambulance Fleets</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Automated handheld scanner pairing with zero internet latency offline token caching.
            </p>
          </div>

          <div className="card-soft">
            <StatusBadge variant="neutral" style={{ marginBottom: '0.75rem' }}>COORDINATION</StatusBadge>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Public Safety</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Inter-agency coordination for missing persons and unidentified case registry broadcasts.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card-soft" style={{ padding: '2.5rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto',
                  color: '#10b981',
                  fontSize: '1.75rem',
                }}
              >
                &#10003;
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Inquiry Registered</h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '44ch', margin: '0 auto 1.5rem auto' }}>
                Thank you for reaching out. Our emergency network integration liaison will contact your team within 24 business hours.
              </p>
              <TactileButton variant="secondary" onClick={() => setSubmitted(false)}>
                Submit Another Request
              </TactileButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem' }}>Institutional Onboarding Inquiry</h3>

              <div className="grid-2">
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
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
                      background: 'rgba(9, 13, 22, 0.8)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      color: '#ffffff',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
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
                      background: 'rgba(9, 13, 22, 0.8)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      color: '#ffffff',
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
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
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
                      background: 'rgba(9, 13, 22, 0.8)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      color: '#ffffff',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Organization Type
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(9, 13, 22, 0.8)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      color: '#ffffff',
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
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: '0.4rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
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
                    background: 'rgba(9, 13, 22, 0.8)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    color: '#ffffff',
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
