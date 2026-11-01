import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--bg-void)',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '4.5rem',
        paddingBottom: '3.5rem',
        marginTop: '6rem',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* National Emergency Hotline Banner */}
        <div
          style={{
            background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.12) 0%, rgba(15, 23, 42, 0.6) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '14px',
            padding: '1.25rem 1.75rem',
            marginBottom: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                boxShadow: '0 0 10px #ef4444',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <div>
              <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>
                Active Emergency in Progress? Dial 112 Immediately.
              </strong>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>
                MAXERY operates as an auxiliary emergency triage identity layer. Responders must never delay emergency medical transport.
              </p>
            </div>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#ffffff',
              background: '#b91c1c',
              padding: '0.4rem 1.1rem',
              borderRadius: '8px',
              letterSpacing: '0.08em',
            }}
          >
            TEL: 112
          </span>
        </div>

        {/* 4-Column Architectural Grid */}
        <div className="grid-4" style={{ marginBottom: '3.5rem' }}>
          {/* Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Image
                src="/branding/maxery-aegis-emblem.svg"
                alt="MAXERY"
                width={28}
                height={28}
              />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '0.08em',
                }}
              >
                MAXERY
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Aegis Protocol for instant emergency identification, lethal contraindication triage, and trusted-contact coordination.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge-pill badge-neutral" style={{ fontSize: '0.6875rem' }}>
                DPDPA 2023
              </span>
              <span className="badge-pill badge-neutral" style={{ fontSize: '0.6875rem' }}>
                CERT-In READY
              </span>
              <span className="badge-pill badge-neutral" style={{ fontSize: '0.6875rem' }}>
                ISO 27001 ALIGNED
              </span>
            </div>
          </div>

          {/* Column 2: Architecture & Protocol */}
          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--text-primary)',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-mono)',
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
              style={{
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--text-primary)',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-mono)',
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
              style={{
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--text-primary)',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-mono)',
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
                  style={{ color: 'var(--color-cyan)' }}
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
            paddingTop: '2rem',
            paddingBottom: '2rem',
            fontSize: '0.8125rem',
            color: 'var(--text-dim)',
            lineHeight: 1.65,
          }}
        >
          <p style={{ marginBottom: '0.75rem' }}>
            <strong style={{ color: 'var(--text-muted)' }}>STATUTORY LIFE-SAFETY DISCLAIMER:</strong> MAXERY is an informational technology coordination service providing auxiliary emergency identification and trusted-contact broadcast. MAXERY is NOT a medical device, licensed healthcare provider, diagnostic service, or emergency dispatch authority. Identification through QR tokens or registry records is contingent upon physical token availability and legibility. No guarantee of patient survival, diagnostic accuracy, or rapid arrival is made or implied.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginTop: '1.5rem',
            }}
          >
            <span>&copy; {currentYear} MAXERY Aegis Platform. All Rights Reserved.</span>
            <span>Architected in Pure JavaScript &amp; Next.js 15 App Router</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
