'use client';

import { useState } from 'react';
import TactileButton from '../ui/TactileButton';
import StatusBadge from '../ui/StatusBadge';

export default function InteractiveScannerSimulator() {
  const [tokenInput, setTokenInput] = useState('MX-QR-7F89B2A4C1D0E3F5-DEMO');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [smsSent, setSmsSent] = useState(false);

  const handleSimulateScan = (e) => {
    if (e) e.preventDefault();
    setScanning(true);
    setResult(null);
    setSmsSent(false);

    // Simulate high-speed cryptographic lookup (< 450ms)
    setTimeout(() => {
      setScanning(false);
      setResult({
        tokenId: tokenInput || 'MX-QR-7F89B2A4C1D0E3F5-DEMO',
        bloodGroup: 'O-Negative (Universal Donor)',
        ageBracket: 'Adult (30-39)',
        allergies: [
          { name: 'Penicillin & Beta-Lactam Antibiotics', severity: 'Lethal Anaphylaxis (Class 4)' },
          { name: 'NSAIDs (Ibuprofen / Aspirin)', severity: 'Severe Bronchospasm' },
        ],
        chronicConditions: [
          'Type-1 Diabetes Mellitus (Insulin Dependent)',
          'Cardiac Stent Placed (2023)',
        ],
        contacts: [
          { name: 'Aarav Sharma', relation: 'Spouse', phone: '+91 98765 43210', primary: true },
          { name: 'Dr. Neha Patel', relation: 'Primary Physician', phone: '+91 91234 56789', primary: false },
        ],
        privacyShield: {
          piiProtected: true,
          legalNameExposed: false,
          aadhaarMasked: true,
          auditId: 'AUD-8829-SHA256-OK',
        },
      });
    }, 450);
  };

  const handleReset = () => {
    setResult(null);
    setSmsSent(false);
  };

  return (
    <section id="scanner-simulator" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="section-eyebrow">INTERACTIVE TRAUMA SIMULATOR</div>
          <h2>Live Emergency Scan Experience</h2>
          <p className="section-subtitle">
            Experience how a first responder scans an opaque token in under 4 seconds to retrieve critical life-safety data without compromising citizen privacy.
          </p>
        </div>

        {/* Simulator Cockpit */}
        <div
          className="card-soft"
          style={{
            maxWidth: 820,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '2.5rem',
            border: '1px solid var(--border-cyan)',
            boxShadow: 'var(--shadow-cyan-glow)',
          }}
        >
          {!result && !scanning && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.25rem' }}>Responder Scan Console</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Scan QR token or NFC chip or enter token identifier below:
                  </p>
                </div>
                <StatusBadge variant="cyan">READY FOR SCAN</StatusBadge>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSimulateScan} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    aria-label="Emergency Token Identifier"
                    style={{
                      flex: 1,
                      minWidth: 260,
                      background: 'rgba(9, 13, 22, 0.8)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '12px',
                      padding: '0.9rem 1.25rem',
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                  <TactileButton
                    type="submit"
                    variant="danger"
                    style={{ padding: '0.9rem 2rem' }}
                  >
                    Simulate Live Scan
                  </TactileButton>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.8125rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <span style={{ color: 'var(--color-verified)' }}>&#10003;</span>
                  <span>Sample emergency token loaded. No hospital or citizen account required for demonstration.</span>
                </div>
              </form>
            </div>
          )}

          {/* Scanning Animation */}
          {scanning && (
            <div
              style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.25rem',
              }}
            >
              <div
                className="spin-animate"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  border: '3px solid rgba(56, 189, 248, 0.2)',
                  borderTopColor: 'var(--color-cyan)',
                }}
              />
              <div>
                <h4 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Decrypting Opaque Emergency Token</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  Executing SHA-256 token verification &bull; Geohashing incident coordinates
                </p>
              </div>
            </div>
          )}

          {/* Scan Results View */}
          {result && (
            <div>
              {/* Triage Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '1.25rem',
                  marginBottom: '1.75rem',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: '#ef4444',
                        boxShadow: '0 0 10px #ef4444',
                        display: 'inline-block',
                      }}
                    />
                    <h3 style={{ fontSize: '1.35rem', color: '#ffffff' }}>Emergency Triage Profile</h3>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--color-cyan)',
                    }}
                  >
                    TOKEN: {result.tokenId}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <StatusBadge variant="emergency">ACTIVE RESCUE</StatusBadge>
                  <TactileButton
                    variant="secondary"
                    onClick={handleReset}
                    style={{ padding: '0.45rem 0.9rem', fontSize: '0.8125rem' }}
                  >
                    Reset Scan
                  </TactileButton>
                </div>
              </div>

              {/* Blood Group & Vitals Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    background: 'rgba(56, 189, 248, 0.08)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Blood Group
                  </span>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.75rem',
                      fontWeight: 800,
                      color: 'var(--color-cyan)',
                      marginTop: 2,
                    }}
                  >
                    O-Negative
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#38bdf8' }}>Universal RBC Donor</span>
                </div>

                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Patient Demographic
                  </span>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginTop: 2,
                    }}
                  >
                    Adult Male (30-39)
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Name withheld for privacy</span>
                </div>
              </div>

              {/* Life-Safety Contraindications Box */}
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.75rem',
                    color: '#fca5a5',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  <span>&#9888; CRITICAL LIFE-SAFETY CONTRAINDICATIONS</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {result.allergies.map((allergy, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.875rem',
                        background: 'rgba(0,0,0,0.25)',
                        padding: '0.6rem 0.9rem',
                        borderRadius: '8px',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                      }}
                    >
                      <strong style={{ color: '#ffffff' }}>{allergy.name}</strong>
                      <span style={{ color: '#ef4444', fontWeight: 600 }}>{allergy.severity}</span>
                    </div>
                  ))}
                  {result.chronicConditions.map((cond, idx) => (
                    <div
                      key={`cond-${idx}`}
                      style={{
                        fontSize: '0.875rem',
                        color: '#fecaca',
                        padding: '0.35rem 0.5rem',
                      }}
                    >
                      &bull; {cond}
                    </div>
                  ))}
                </div>
              </div>

              {/* Trusted Contacts Coordination */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: '#ffffff' }}>
                  Trusted Contacts &amp; Relatives
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {result.contacts.map((contact, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.85rem 1rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '10px',
                        border: '1px solid var(--border-hairline)',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, color: '#ffffff' }}>
                          {contact.name} ({contact.relation})
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8125rem',
                            color: 'var(--text-muted)',
                          }}
                        >
                          {contact.phone}
                        </div>
                      </div>

                      {contact.primary && (
                        <TactileButton
                          variant={smsSent ? 'secondary' : 'primary'}
                          onClick={() => setSmsSent(true)}
                          style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}
                        >
                          {smsSent ? '&#10003; Alert Dispatched' : 'Notify Next-of-Kin'}
                        </TactileButton>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Zero-PII Statutory Guarantee */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                  borderTop: '1px solid var(--border-hairline)',
                  paddingTop: '1rem',
                }}
              >
                <span style={{ color: 'var(--color-verified)', fontSize: '1.1rem' }}>&#128274;</span>
                <span>
                  <strong>DPDPA 2023 Shield Active:</strong> Full legal identity, residential address, Aadhaar number, and billing details remain encrypted and non-accessible to public scanners.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
