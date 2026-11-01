import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--color-near-black)',
        borderTop: '1px solid var(--border-hairline)',
        paddingTop: '5rem',
        paddingBottom: '4rem',
        marginTop: '6rem',
        position: 'relative',
        boxShadow: '0 -20px 40px rgba(0, 0, 0, 0.7)',
      }}
    >
      <div className="container">
        {/* National Emergency Hotline Banner: Utilitarian + Bauhaus Alert Priority */}
        <div
          style={{
            background: 'linear-gradient(90deg, rgba(220, 38, 38, 0.18) 0%, rgba(23, 43, 64, 0.25) 100%)',
            border: '1px solid rgba(220, 38, 38, 0.4)',
            borderRadius: '8px',
            padding: '1.25rem 1.75rem',
            marginBottom: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: 'var(--color-emergency)',
                boxShadow: '0 0 10px var(--color-emergency)',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <div>
              <strong className="font-neoclassical" style={{ color: 'var(--color-warm-ivory)', fontSize: '1rem', letterSpacing: '0.03em' }}>
                Active Life-Threatening Emergency in Progress? Dial 112 Immediately.
              </strong>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.8125rem', color: 'var(--color-warm-ivory-muted)' }}>
                MAXERY operates as an auxiliary emergency triage identity layer. Responders must never delay emergency medical transport.
              </p>
            </div>
          </div>
          <span
            className="font-neoclassical"
            style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--color-warm-ivory)',
              background: 'var(--color-emergency)',
              border: '1px solid rgba(245, 241, 234, 0.3)',
              padding: '0.45rem 1.25rem',
              borderRadius: '6px',
              letterSpacing: '0.08em',
              boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)',
            }}
          >
            TEL: 112
          </span>
        </div>

        {/* 4-Column Architectural Grid: Bauhaus Structure + Neoclassical Typography */}
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
                className="font-neoclassical text-gold-foil"
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                }}
              >
                MAXERY
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-ivory-muted)', lineHeight: 1.65 }}>
              The Clinical Elegance architecture for instant emergency identification, lethal contraindication triage, and trusted-guardian coordination.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge-pill" style={{ fontSize: '0.6875rem', background: 'rgba(23, 43, 64, 0.5)', color: 'var(--color-muted-gold)', border: '1px solid rgba(191, 160, 106, 0.3)' }}>
                DPDPA 2023
              </span>
              <span className="badge-pill" style={{ fontSize: '0.6875rem', background: 'rgba(23, 43, 64, 0.5)', color: 'var(--color-muted-gold)', border: '1px solid rgba(191, 160, 106, 0.3)' }}>
                CERT-In READY
              </span>
              <span className="badge-pill" style={{ fontSize: '0.6875rem', background: 'rgba(23, 43, 64, 0.5)', color: 'var(--color-muted-gold)', border: '1px solid rgba(191, 160, 106, 0.3)' }}>
                ISO 27001 ALIGNED
              </span>
            </div>
          </div>

          {/* Column 2: Architecture & Protocol */}
          <div>
            <h4
              className="font-neoclassical"
              style={{
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-muted-gold)',
                marginBottom: '1.25rem',
                fontWeight: 700,
              }}
            >
              Protocol
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <Link href="/how-it-works" style={{ color: 'var(--color-warm-ivory-muted)' }}>
                  4-Tier Identification Flow
                </Link>
              </li>
              <li>
                <Link href="/safety" style={{ color: 'var(--color-warm-ivory-muted)' }}>
                  Clinical Contraindication Shield
                </Link>
              </li>
              <li>
                <Link href="/#scanner-simulator" style={{ color: 'var(--color-warm-ivory-muted)' }}>
                  Interactive QR Simulator
                </Link>
              </li>
              <li>
                <Link href="/#dispatcher-feed" style={{ color: 'var(--color-warm-ivory-muted)' }}>
                  ER Real-Time Dispatcher
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Regulatory */}
          <div>
            <h4
              className="font-neoclassical"
              style={{
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-muted-gold)',
                marginBottom: '1.25rem',
                fontWeight: 700,
              }}
            >
              Compliance &amp; Trust
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <Link href="/privacy" style={{ color: 'var(--color-warm-ivory-muted)' }}>
                  DPDPA 2023 Data Protection
                </Link>
              </li>
              <li>
                <Link href="/privacy#tokenization" style={{ color: 'var(--color-warm-ivory-muted)' }}>
                  Zero-PII Tokenization
                </Link>
              </li>
              <li>
                <Link href="/terms" style={{ color: 'var(--color-warm-ivory-muted)' }}>
                  Terms &amp; Responder Agreement
                </Link>
              </li>
              <li>
                <Link href="/privacy#audit" style={{ color: 'var(--color-warm-ivory-muted)' }}>
                  Immutable Audit Ledger
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional & Institutional */}
          <div>
            <h4
              className="font-neoclassical"
              style={{
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-muted-gold)',
                marginBottom: '1.25rem',
                fontWeight: 700,
              }}
            >
              Trauma Network
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <Link href="/contact" style={{ color: 'var(--color-warm-ivory-muted)' }}>
                  Hospital Trauma Integration
                </Link>
              </li>
              <li>
                <Link href="/contact#paramedic" style={{ color: 'var(--color-warm-ivory-muted)' }}>
                  EMS &amp; Paramedic Onboarding
                </Link>
              </li>
              <li>
                <Link href="/contact#developer" style={{ color: 'var(--color-warm-ivory-muted)' }}>
                  Fastify API Documentation
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/jeevansurya560-arch/MAXERY"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-muted-gold)', fontWeight: 600 }}
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
            borderTop: '1px solid var(--border-hairline)',
            paddingTop: '2.5rem',
            paddingBottom: '2rem',
            fontSize: '0.8125rem',
            color: 'var(--color-warm-ivory-muted)',
            lineHeight: 1.7,
          }}
        >
          <p style={{ marginBottom: '1rem' }}>
            <strong style={{ color: 'var(--color-muted-gold)' }}>STATUTORY LIFE-SAFETY DISCLAIMER:</strong> MAXERY is an informational technology coordination service providing auxiliary emergency identification and trusted-contact broadcast. MAXERY is NOT a medical device, licensed healthcare provider, diagnostic service, or emergency dispatch authority. Identification through QR tokens or registry records is contingent upon physical token availability and legibility. No guarantee of patient survival, diagnostic accuracy, or rapid arrival is made or implied.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginTop: '1.5rem',
              fontFamily: 'var(--font-neoclassical)',
              letterSpacing: '0.04em',
              color: 'var(--color-warm-ivory-muted)',
              fontSize: '0.75rem',
            }}
          >
            <span>&copy; {currentYear} MAXERY CLINICAL AEGIS &bull; ALL RIGHTS RESERVED</span>
            <span>ARCHITECTED IN PURE JAVASCRIPT &amp; NEXT.JS 15 APP ROUTER</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
