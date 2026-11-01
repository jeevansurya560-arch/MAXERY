'use client';

import Image from 'next/image';
import TactileButton from '../ui/TactileButton';
import StatusBadge from '../ui/StatusBadge';

export default function HeroSection() {
  return (
    <section
      style={{
        paddingTop: '4.5rem',
        paddingBottom: '5.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div className="hero-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3.5rem', alignItems: 'center' }}>
          {/* Left Column: Mission & Clinical Elegance CTAs */}
          <div>
            <div className="section-eyebrow">
              ✦ CLINICAL AEGIS PROTOCOL ✦
            </div>

            <h1
              style={{
                marginBottom: '1.35rem',
                color: 'var(--color-warm-ivory)',
                letterSpacing: '0.04em',
              }}
            >
              When Every Second <span className="text-gold-foil">Decides a Life.</span>
            </h1>

            <p
              style={{
                fontSize: '1.125rem',
                color: 'var(--color-warm-ivory-dim)',
                marginBottom: '2.5rem',
                maxWidth: '52ch',
                lineHeight: 1.7,
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
                marginBottom: '3.25rem',
              }}
            >
              <TactileButton
                href="#scanner-simulator"
                variant="primary"
                style={{ padding: '0.9rem 2.2rem', fontSize: '0.95rem' }}
              >
                <span>✦</span>
                Simulate Emergency Scan
              </TactileButton>

              <TactileButton
                href="/how-it-works"
                variant="secondary"
                style={{ padding: '0.9rem 1.85rem', fontSize: '0.95rem' }}
              >
                Clinical Protocol &rarr;
              </TactileButton>
            </div>

            {/* Verified Compliance Micro-Metrics */}
            <div
              style={{
                display: 'flex',
                gap: '2.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div
                  className="font-neoclassical"
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: 'var(--color-warm-ivory)',
                  }}
                >
                  &lt; 3.2s
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-warm-ivory-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.2rem' }}>
                  Golden Hour Lookup
                </div>
              </div>

              <div>
                <div
                  className="font-neoclassical"
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: 'var(--color-emergency)',
                  }}
                >
                  ZERO PII
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-warm-ivory-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.2rem' }}>
                  Opaque Tokenization
                </div>
              </div>

              <div>
                <div
                  className="font-neoclassical"
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: 'var(--color-muted-gold)',
                  }}
                >
                  DPDPA 2023
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-warm-ivory-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.2rem' }}>
                  Statutory Sovereignty
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Sovereign Pass (Patient Interface & Japandi Bento Card) */}
          <div style={{ position: 'relative' }}>
            <div
              className="card-soft"
              style={{
                padding: '2.25rem',
                maxWidth: 470,
                marginLeft: 'auto',
                marginRight: 'auto',
                background: 'linear-gradient(180deg, #131E2A 0%, #0E0E0E 100%)',
                border: '1px solid rgba(191, 160, 106, 0.3)',
                boxShadow: 'var(--shadow-clinical-lg)',
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.75rem',
                  borderBottom: '1px solid rgba(245, 241, 234, 0.1)',
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
                      className="font-neoclassical"
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        color: 'var(--color-warm-ivory)',
                      }}
                    >
                      MAXERY AEGIS
                    </div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--color-muted-gold)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
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
                {/* QR Container */}
                <div
                  style={{
                    background: '#FFFFFF',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid rgba(191, 160, 106, 0.5)',
                    width: 96,
                    height: 96,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5)',
                    flexShrink: 0,
                  }}
                >
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="#0E0E0E">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm12-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v4h-4v-2h2v-2zm-4 2h2v2h-2v-2zm-6-2h2v2h-2v-2zm0 4h2v2h-2v-2z" />
                  </svg>
                </div>

                {/* Vital Statistics (Bento Compartment) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--color-muted-gold)',
                      letterSpacing: '0.06em',
                      fontWeight: 600,
                    }}
                  >
                    TOKEN: MX-QR-7F89B2A4
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                    }}
                  >
                    <span
                      className="font-neoclassical"
                      style={{
                        fontSize: '1.65rem',
                        fontWeight: 700,
                        color: 'var(--color-warm-ivory)',
                      }}
                    >
                      O-Negative
                    </span>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        color: 'var(--color-muted-gold-light)',
                        background: 'rgba(191, 160, 106, 0.12)',
                        border: '1px solid rgba(191, 160, 106, 0.35)',
                        padding: '2px 7px',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                      }}
                    >
                      UNIVERSAL
                    </span>
                  </div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-warm-ivory-dim)' }}>
                    Vikram S. &bull; Age 34
                  </span>
                </div>
              </div>

              {/* High-Acuity Emergency Alert Card (Utilitarian Warning) */}
              <div
                style={{
                  background: 'var(--color-emergency-bg)',
                  border: '1px solid var(--color-emergency-border)',
                  borderRadius: '8px',
                  padding: '1rem 1.15rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                }}
              >
                <span
                  style={{
                    color: 'var(--color-emergency)',
                    fontWeight: 800,
                    fontSize: '1.15rem',
                    lineHeight: 1,
                  }}
                >
                  &#9888;
                </span>
                <div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#FCA5A5',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    CRITICAL LIFE-SAFETY CONTRAINDICATION
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#FECACA', marginTop: 3 }}>
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
                  color: 'var(--color-warm-ivory-muted)',
                  fontFamily: 'var(--font-mono)',
                  borderTop: '1px solid var(--border-hairline)',
                  paddingTop: '0.95rem',
                }}
              >
                <span style={{ color: 'var(--color-muted-gold)' }}>CUSTODY: ARV-7402</span>
                <span style={{ color: 'var(--color-verified)' }}>GEOHASH ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
