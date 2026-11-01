'use client';

import Image from 'next/image';
import TactileButton from '../ui/TactileButton';
import StatusBadge from '../ui/StatusBadge';

export default function HeroSection() {
  return (
    <section
      style={{
        paddingTop: '3.5rem',
        paddingBottom: '4.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '3.5rem',
            alignItems: 'center',
          }}
          className="hero-grid-layout"
        >
          {/* Left Column: Mission & CTAs */}
          <div>
            <div className="section-eyebrow">
              AEGIS EMERGENCY TRIAGE PROTOCOL
            </div>

            <h1
              style={{
                marginBottom: '1.25rem',
                color: 'var(--text-primary)',
              }}
            >
              When Every Second Decides a Life.
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                maxWidth: '54ch',
                lineHeight: 1.6,
              }}
            >
              Zero-PII emergency identification, instant critical contraindication alerts, and rapid trusted-contact coordination for responders and trauma units.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginBottom: '2.75rem',
              }}
            >
              <TactileButton
                href="#scanner-simulator"
                variant="danger"
                style={{ padding: '0.95rem 2rem', fontSize: '1rem' }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 0 8px #ffffff',
                    display: 'inline-block',
                  }}
                />
                Simulate Emergency Scan
              </TactileButton>

              <TactileButton
                href="/how-it-works"
                variant="secondary"
                style={{ padding: '0.95rem 1.75rem', fontSize: '1rem' }}
              >
                How Identity Works &rarr;
              </TactileButton>
            </div>

            {/* Verified Compliance Micro-Metrics */}
            <div
              style={{
                display: 'flex',
                gap: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: 'var(--color-cyan)',
                  }}
                >
                  &lt; 3.2s
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Trauma Triage Lookup
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: 'var(--color-emergency)',
                  }}
                >
                  ZERO PII
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Opaque Tokenized QR
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: 'var(--color-verified)',
                  }}
                >
                  DPDPA 2023
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Statutory Compliance
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Aegis Medical Emergency Card Mockup */}
          <div style={{ position: 'relative' }}>
            <div
              className="card-holographic"
              style={{
                padding: '2rem',
                maxWidth: 440,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.75rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Image
                    src="/branding/maxery-aegis-emblem.svg"
                    alt="Aegis"
                    width={26}
                    height={26}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      letterSpacing: '0.08em',
                    }}
                  >
                    MAXERY AEGIS
                  </span>
                </div>
                <StatusBadge variant="verified">VERIFIED PATIENT</StatusBadge>
              </div>

              {/* QR & Acuity Badge Split */}
              <div
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                {/* Simulated Opaque QR Box */}
                <div
                  style={{
                    background: '#ffffff',
                    padding: '8px',
                    borderRadius: '10px',
                    width: 96,
                    height: 96,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    flexShrink: 0,
                  }}
                >
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="#090d16">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm12-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v4h-4v-2h2v-2zm-4 2h2v2h-2v-2zm-6-2h2v2h-2v-2zm0 4h2v2h-2v-2z" />
                  </svg>
                </div>

                {/* Vital Statistics */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    TOKEN: MX-QR-7F89B2A4
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: 'var(--color-cyan)',
                      }}
                    >
                      O-Negative
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: '#94a3b8',
                        background: 'rgba(255,255,255,0.06)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      Universal Donor
                    </span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Vikram S. &bull; Age 34
                  </span>
                </div>
              </div>

              {/* High-Acuity Emergency Alert Card */}
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}
              >
                <span
                  style={{
                    color: '#ef4444',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    lineHeight: 1,
                  }}
                >
                  &#9888;
                </span>
                <div>
                  <div
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: '#fca5a5',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    CRITICAL CONTRAINDICATION
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#fecaca', marginTop: 2 }}>
                    Severe Penicillin Anaphylaxis &bull; Type-1 Insulin Dependent
                  </div>
                </div>
              </div>

              {/* Card Footer Coordination */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  borderTop: '1px solid var(--border-hairline)',
                  paddingTop: '0.85rem',
                }}
              >
                <span>TRUSTED CONTACT: ARV-7402</span>
                <span style={{ color: 'var(--color-verified)' }}>GEOHASH ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
