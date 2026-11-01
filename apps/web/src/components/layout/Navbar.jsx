'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TactileButton from '../ui/TactileButton';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: 'var(--navbar-height)',
        background: 'rgba(9, 13, 22, 0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Brand Anchor */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
          }}
          aria-label="MAXERY Home"
        >
          <div style={{ position: 'relative', width: 34, height: 34 }}>
            <Image
              src="/branding/maxery-aegis-emblem.svg"
              alt="MAXERY Aegis Emblem"
              width={34}
              height={34}
              priority
            />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              color: 'var(--text-primary)',
            }}
          >
            MAXERY
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: 'var(--color-cyan)',
              background: 'rgba(56, 189, 248, 0.1)',
              padding: '0.15rem 0.45rem',
              borderRadius: '4px',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              fontWeight: 600,
            }}
          >
            AEGIS
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Primary Navigation"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2rem',
          }}
          className="desktop-nav"
        >
          <Link
            href="/how-it-works"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9375rem',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
          >
            How It Works
          </Link>
          <Link
            href="/safety"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9375rem',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
          >
            Clinical Safety
          </Link>
          <Link
            href="/privacy"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9375rem',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
          >
            Privacy &amp; DPDPA
          </Link>
          <Link
            href="/#dispatcher-feed"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9375rem',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
          >
            ER Dispatcher
          </Link>
        </nav>

        {/* Action CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <TactileButton
            href="/#scanner-simulator"
            variant="danger"
            style={{ padding: '0.55rem 1.15rem', fontSize: '0.875rem' }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                boxShadow: '0 0 6px #ffffff',
                display: 'inline-block',
              }}
            />
            Emergency Scan
          </TactileButton>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 5,
              width: 36,
              height: 36,
              padding: 6,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 8,
              border: '1px solid var(--border-subtle)',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '100%',
                height: 2,
                backgroundColor: 'var(--text-primary)',
                borderRadius: 2,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '100%',
                height: 2,
                backgroundColor: 'var(--text-primary)',
                borderRadius: 2,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '70%',
                height: 2,
                backgroundColor: 'var(--color-cyan)',
                borderRadius: 2,
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--navbar-height)',
            left: 0,
            right: 0,
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-medium)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Link
            href="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', padding: '0.5rem 0' }}
          >
            How It Works
          </Link>
          <Link
            href="/safety"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', padding: '0.5rem 0' }}
          >
            Clinical Safety
          </Link>
          <Link
            href="/privacy"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', padding: '0.5rem 0' }}
          >
            Privacy &amp; DPDPA
          </Link>
          <Link
            href="/#dispatcher-feed"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', padding: '0.5rem 0' }}
          >
            ER Dispatcher Feed
          </Link>
          <div style={{ paddingTop: '0.5rem' }}>
            <TactileButton
              href="/#scanner-simulator"
              variant="danger"
              onClick={() => setMobileMenuOpen(false)}
              style={{ width: '100%', textAlign: 'center' }}
            >
              Simulate Emergency Scan
            </TactileButton>
          </div>
        </div>
      )}
    </header>
  );
}
