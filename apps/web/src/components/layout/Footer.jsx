import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, rgba(8, 7, 5, 0.95) 0%, rgba(4, 4, 6, 1) 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.25)',
        paddingTop: '5rem',
        paddingBottom: '4rem',
        marginTop: '6rem',
        position: 'relative',
        boxShadow: '0 -20px 50px rgba(0, 0, 0, 0.8)',
      }}
    >
      <div className="container">
        {/* National Emergency Hotline Banner */}
        <div
          style={{
            background: 'linear-gradient(90deg, rgba(185, 28, 28, 0.22) 0%, rgba(24, 18, 10, 0.85) 100%)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '14px',
            padding: '1.35rem 2rem',
            marginBottom: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(212, 175, 55, 0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                boxShadow: '0 0 14px #ef4444, 0 0 4px #ffffff',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <div>
              <strong className="font-royal" style={{ color: '#ffffff', fontSize: '1.05rem', letterSpacing: '0.04em' }}>
                Active Life-Threatening Emergency in Progress? Dial 112 Immediately.
              </strong>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                MAXERY operates as an auxiliary emergency triage identity layer. Responders must never delay emergency medical transport.
              </p>
            </div>
          </div>
          <span
            className="font-royal"
            style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)',
              border: '1px solid rgba(254, 240, 138, 0.4)',
              padding: '0.5rem 1.4rem',
              borderRadius: '8px',
              letterSpacing: '0.1em',
              boxShadow: '0 4px 15px rgba(185, 28, 28, 0.4)',
            }}
          >
            TEL: 112
          </span>
        </div>

        {/* 4-Column Architectural Grid */}
        <div className="grid-4" style={{ marginBottom: '4rem' }}>
          {/* Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Image
                src="/branding/maxery-aegis-emblem.svg"
                alt="MAXERY"
                width={32}
                height={32}
              />
              <span
                className="font-royal text-gold-foil"
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                }}
              >
                MAXERY
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
              The Imperial Aegis Protocol for instant emergency identification, lethal contraindication triage, and trusted-guardian coordination.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge-pill" style={{ fontSize: '0.6875rem', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--color-gold-light)', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
                DPDPA 2023
              </span>
              <span className="badge-pill" style={{ fontSize: '0.6875rem', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--color-gold-light)', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
                CERT-In READY
              </span>
              <span className="badge-pill" style={{ fontSize: '0.6875rem', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--color-gold-light)', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
                ISO 27001 ALIGNED
              </span>
            </div>
          </div>

          {/* Column 2: Architecture & Protocol */}
          <div>
            <h4
              className="font-royal"
              style={{
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-gold)',
                marginBottom: '1.25rem',
                fontWeight: 700,
              }}
            >
              Protocol
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <Link href="/how-it-works" style={{ color: 'var(--text-secondary)' }}>
                  4-Tier Identification Flow
                </Link>
              </li>
              <li>
                <Link href="/safety" style={{ color: 'var(--text-secondary)' }}>
                  Clinical Contraindication Shield
                </Link>
              </li>
              <li>
                <Link href="/#scanner-simulator" style={{ color: 'var(--text-secondary)' }}>
                  Interactive QR Simulator
                </Link>
              </li>
              <li>
                <Link href="/#dispatcher-feed" style={{ color: 'var(--text-secondary)' }}>
                  ER Real-Time Dispatcher
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Regulatory */}
          <div>
            <h4
              className="font-royal"
              style={{
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-gold)',
                marginBottom: '1.25rem',
                fontWeight: 700,
              }}
            >
              Compliance &amp; Trust
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <Link href="/privacy" style={{ color: 'var(--text-secondary)' }}>
                  DPDPA 2023 Data Protection
                </Link>
              </li>
              <li>
                <Link href="/privacy#tokenization" style={{ color: 'var(--text-secondary)' }}>
                  Zero-PII Tokenization
                </Link>
              </li>
              <li>
                <Link href="/terms" style={{ color: 'var(--text-secondary)' }}>
                  Terms &amp; Responder Agreement
                </Link>
              </li>
              <li>
                <Link href="/privacy#audit" style={{ color: 'var(--text-secondary)' }}>
                  Immutable Audit Ledger
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional & Institutional */}
          <div>
            <h4
              className="font-royal"
              style={{
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-gold)',
                marginBottom: '1.25rem',
                fontWeight: 700,
              }}
            >
              Trauma Network
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <Link href="/contact" style={{ color: 'var(--text-secondary)' }}>
                  Hospital Trauma Integration
                </Link>
              </li>
              <li>
                <Link href="/contact#paramedic" style={{ color: 'var(--text-secondary)' }}>
                  EMS &amp; Paramedic Onboarding
                </Link>
              </li>
              <li>
                <Link href="/contact#developer" style={{ color: 'var(--text-secondary)' }}>
                  Fastify API Documentation
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/jeevansurya560-arch/MAXERY"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-gold-light)', fontWeight: 600 }}
                >
                  GitHub Repository &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Statutory Life Safety Notice */}
        <div
          style={{
            borderTop: '1px solid rgba(212, 175, 55, 0.18)',
            paddingTop: '2.5rem',
            paddingBottom: '2rem',
            fontSize: '0.8125rem',
            color: 'var(--text-dim)',
            lineHeight: 1.7,
          }}
        >
          <p style={{ marginBottom: '1rem' }}>
            <strong style={{ color: 'var(--color-gold-light)' }}>STATUTORY LIFE-SAFETY DISCLAIMER:</strong> MAXERY is an informational technology coordination service providing auxiliary emergency identification and trusted-contact broadcast. MAXERY is NOT a medical device, licensed healthcare provider, diagnostic service, or emergency dispatch authority. Identification through QR tokens or registry records is contingent upon physical token availability and legibility. No guarantee of patient survival, diagnostic accuracy, or rapid arrival is made or implied.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginTop: '1.5rem',
              fontFamily: 'var(--font-royal)',
              letterSpacing: '0.04em',
              color: 'var(--color-gold-dim)',
              fontSize: '0.78rem',
            }}
          >
            <span>&copy; {currentYear} MAXERY IMPERIAL AEGIS COALITION &bull; ALL RIGHTS RESERVED</span>
            <span>ARCHITECTED IN PURE JAVASCRIPT &amp; NEXT.JS 15 APP ROUTER</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
