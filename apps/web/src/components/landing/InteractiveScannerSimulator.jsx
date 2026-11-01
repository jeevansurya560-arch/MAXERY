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
          <div className="section-eyebrow">✦ SOVEREIGN TRAUMA COCKPIT ✦</div>
          <h2>Live Emergency Scan Experience</h2>
          <p className="section-subtitle">
            Experience how a first responder scans an opaque token in under 4 seconds to retrieve critical life-safety data without compromising citizen privacy.
          </p>
        </div>

        {/* Sovereign Simulator Cockpit */}
        <div
          className="card-soft"
          style={{
            maxWidth: 840,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '2.75rem',
            border: '1px solid var(--border-gold)',
            boxShadow: 'var(--shadow-royal-2)',
          }}
        >
          {!result && !scanning && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.75rem',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.4rem' }}>Responder Scan Console</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    Scan QR token or NFC chip or enter token identifier below:
                  </p>
                </div>
                <StatusBadge variant="gold">READY FOR SCAN</StatusBadge>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSimulateScan} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    aria-label="Emergency Token Identifier"
                    style={{
                      flex: 1,
                      minWidth: 260,
                      background: 'rgba(7, 10, 18, 0.85)',
                      border: '1px solid var(--border-gold-subtle)',
                      borderRadius: '12px',
                      padding: '0.95rem 1.35rem',
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                  <TactileButton
                    type="submit"
                    variant="primary"
                    style={{ padding: '0.95rem 2.25rem' }}
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
                  <span style={{ color: 'var(--color-gold)' }}>✦</span>
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
                  border: '3px solid rgba(212, 175, 55, 0.2)',
                  borderTopColor: 'var(--color-gold-light)',
                }}
              />
              <div>
                <h4 style={{ fontSize: '1.2rem', color: '#ffffff', fontFamily: 'var(--font-royal)' }}>
                  Decrypting Opaque Emergency Token
                </h4>
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
                  borderBottom: '1px solid var(--border-gold-subtle)',
                  paddingBottom: '1.35rem',
                  marginBottom: '1.85rem',
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
                    <h3 style={{ fontSize: '1.45rem', color: '#ffffff' }}>Emergency Triage Profile</h3>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--color-gold)',
                    }}
                  >
                    TOKEN: {result.tokenId}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <StatusBadge variant="emergency">ACTIVE RESCUE</StatusBadge>
                  <TactileButton
                    variant="secondary"
                    onClick={handleReset}
                    style={{ padding: '0.45rem 1rem', fontSize: '0.8125rem' }}
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
                  gap: '1.25rem',
                  marginBottom: '1.65rem',
                }}
              >
                <div
                  style={{
                    background: 'linear-gradient(145deg, rgba(212, 175, 55, 0.1) 0%, rgba(13, 18, 31, 0.9) 100%)',
                    border: '1px solid var(--border-gold)',
                    borderRadius: '14px',
                    padding: '1.35rem',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
                    Blood Group
                  </span>
                  <div
                    style={{
                      fontFamily: 'var(--font-royal)',
                      fontSize: '1.85rem',
                      fontWeight: 800,
                      color: 'var(--color-gold-light)',
                      marginTop: 2,
                    }}
                  >
                    O-Negative
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#fef08a' }}>Universal RBC Donor</span>
                </div>

                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding: '1.35rem',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
                    Patient Demographic
                  </span>
                  <div
                    style={{
                      fontFamily: 'var(--font-royal)',
                      fontSize: '1.45rem',
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
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.45)',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  marginBottom: '1.65rem',
                  boxShadow: 'var(--shadow-ruby-halo)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.85rem',
                    color: '#fca5a5',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <span>&#9888; CRITICAL LIFE-SAFETY CONTRAINDICATIONS</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {result.allergies.map((allergy, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.875rem',
                        background: 'rgba(0,0,0,0.3)',
                        padding: '0.65rem 1rem',
                        borderRadius: '10px',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        border: '1px solid rgba(239, 68, 68, 0.25)',
                      }}
                    >
                      <strong style={{ color: '#ffffff' }}>{allergy.name}</strong>
                      <span style={{ color: '#ef4444', fontWeight: 700 }}>{allergy.severity}</span>
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
                  background: 'rgba(13, 18, 31, 0.7)',
                  border: '1px solid var(--border-gold-subtle)',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  marginBottom: '1.65rem',
                }}
              >
                <h4 style={{ fontSize: '1.05rem', marginBottom: '1rem', color: '#ffffff', fontFamily: 'var(--font-royal)' }}>
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
                        padding: '0.95rem 1.15rem',
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
                          style={{ padding: '0.55rem 1.25rem', fontSize: '0.8125rem' }}
                        >
                          {smsSent ? '✦ Alert Dispatched' : 'Notify Next-of-Kin'}
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
                  borderTop: '1px solid var(--border-gold-subtle)',
                  paddingTop: '1.15rem',
                }}
              >
                <span style={{ color: 'var(--color-gold)', fontSize: '1.1rem' }}>✦</span>
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
