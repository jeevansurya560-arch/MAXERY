'use client';

import Image from 'next/image';
import TactileButton from '../ui/TactileButton';
import StatusBadge from '../ui/StatusBadge';

export default function HeroSection() {
  return (
    <section
      style={{
        paddingTop: '3.75rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div className="hero-grid-layout">
          {/* Left Column: Mission & Imperial CTAs */}
          <div>
            <div className="section-eyebrow">
              ✦ IMPERIAL AEGIS PROTOCOL ✦
            </div>

            <h1
              style={{
                marginBottom: '1.35rem',
                color: 'var(--text-primary)',
              }}
            >
              When Every Second <span className="text-gold-foil">Decides a Life.</span>
            </h1>

            <p
              style={{
                fontSize: '1.18rem',
                color: 'var(--text-secondary)',
                marginBottom: '2.25rem',
                maxWidth: '52ch',
                lineHeight: 1.65,
              }}
            >
              Sovereign zero-PII emergency identification, instant contraindication defense, and trusted-contact coordination for responders and trauma centers.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginBottom: '3rem',
              }}
            >
              <TactileButton
                href="#scanner-simulator"
                variant="primary"
                style={{ padding: '1rem 2.25rem', fontSize: '1rem' }}
              >
                <span>✦</span>
                Simulate Emergency Scan
              </TactileButton>

              <TactileButton
                href="/how-it-works"
                variant="secondary"
                style={{ padding: '1rem 1.85rem', fontSize: '1rem' }}
              >
                Sovereign Protocol &rarr;
              </TactileButton>
            </div>

            {/* Verified Compliance Micro-Metrics */}
            <div
              style={{
                display: 'flex',
                gap: '2.5rem',
                paddingTop: '1.75rem',
                borderTop: '1px solid var(--border-gold-subtle)',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-royal)',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: 'var(--color-gold-light)',
                  }}
                >
                  &lt; 3.2s
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Golden Hour Lookup
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-royal)',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: 'var(--color-emergency)',
                  }}
                >
                  ZERO PII
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Opaque Tokenization
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-royal)',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: 'var(--color-gold)',
                  }}
                >
                  DPDPA 2023
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Statutory Sovereignty
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Imperial Aegis Sovereign Card Preview */}
          <div style={{ position: 'relative' }}>
            <div
              className="card-holographic"
              style={{
                padding: '2.25rem',
                maxWidth: 460,
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
                  borderBottom: '1px solid var(--border-gold-subtle)',
                  paddingBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Image
                    src="/branding/maxery-aegis-emblem.svg"
                    alt="Aegis Crest"
                    width={32}
                    height={32}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-royal)',
                        fontSize: '0.95rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        color: 'var(--color-gold-light)',
                      }}
                    >
                      MAXERY AEGIS
                    </div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      SOVEREIGN TRAUMA PASS
                    </span>
                  </div>
                </div>
                <StatusBadge variant="gold">VERIFIED CITIZEN</StatusBadge>
              </div>

              {/* QR & Acuity Split */}
              <div
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'center',
                  marginBottom: '1.65rem',
                }}
              >
                {/* Gilded QR Container */}
                <div
                  style={{
                    background: '#ffffff',
                    padding: '8px',
                    borderRadius: '12px',
                    border: '2px solid var(--color-gold)',
                    width: 100,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 18px rgba(212, 175, 55, 0.35)',
                    flexShrink: 0,
                  }}
                >
                  <svg width="84" height="84" viewBox="0 0 24 24" fill="#070a12">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm12-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v4h-4v-2h2v-2zm-4 2h2v2h-2v-2zm-6-2h2v2h-2v-2zm0 4h2v2h-2v-2z" />
                  </svg>
                </div>

                {/* Vital Statistics */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--color-gold)',
                      letterSpacing: '0.08em',
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
                        fontFamily: 'var(--font-royal)',
                        fontSize: '1.65rem',
                        fontWeight: 800,
                        color: 'var(--color-gold-light)',
                      }}
                    >
                      O-Negative
                    </span>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        color: '#fef08a',
                        background: 'rgba(212, 175, 55, 0.15)',
                        border: '1px solid rgba(212, 175, 55, 0.35)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                      }}
                    >
                      UNIVERSAL
                    </span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Vikram S. &bull; Age 34
                  </span>
                </div>
              </div>

              {/* High-Acuity Ruby Emergency Alert Card */}
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.45)',
                  borderRadius: '12px',
                  padding: '1rem 1.15rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  boxShadow: 'var(--shadow-ruby-halo)',
                }}
              >
                <span
                  style={{
                    color: '#ef4444',
                    fontWeight: 800,
                    fontSize: '1.25rem',
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
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    CRITICAL LIFE-SAFETY CONTRAINDICATION
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#fecaca', marginTop: 3 }}>
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
                  borderTop: '1px solid var(--border-gold-subtle)',
                  paddingTop: '0.95rem',
                }}
              >
                <span style={{ color: 'var(--color-gold)' }}>CUSTODY: ARV-7402</span>
                <span style={{ color: 'var(--color-verified)' }}>GEOHASH ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
