'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TactileButton from '../ui/TactileButton';
import AuthModal from '../ui/AuthModal';
import { useSession, signOut } from '../../lib/auth-client';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Sign-out error:', err);
    }
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          height: 'var(--navbar-height)',
          background: 'rgba(14, 14, 14, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-hairline)',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
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
              className="font-neoclassical text-gold-foil"
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
              }}
            >
              MAXERY
            </span>
            <span
              className="font-neoclassical"
              style={{
                fontSize: '0.625rem',
                color: 'var(--color-muted-gold)',
                background: 'rgba(23, 43, 64, 0.4)',
                padding: '0.15rem 0.5rem',
                borderRadius: '3px',
                border: '1px solid rgba(191, 160, 106, 0.3)',
                fontWeight: 700,
                letterSpacing: '0.1em',
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
                color: 'var(--color-warm-ivory-muted)',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
              }}
            >
              Architecture
            </Link>
            <Link
              href="/safety"
              style={{
                color: 'var(--color-warm-ivory-muted)',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
              }}
            >
              Clinical Protocol
            </Link>
            <Link
              href="/privacy"
              style={{
                color: 'var(--color-warm-ivory-muted)',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
              }}
            >
              Statutory Privacy
            </Link>
            <Link
              href="/#dispatcher-feed"
              style={{
                color: 'var(--color-warm-ivory-muted)',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
              }}
            >
              ER Dispatcher
            </Link>
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* User Session Trigger */}
            {session?.user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-muted-gold)',
                    fontFamily: 'var(--font-neoclassical)',
                    background: 'rgba(23, 43, 64, 0.4)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(191, 160, 106, 0.3)',
                    fontWeight: 600,
                  }}
                >
                  ✦ {session.user.name || session.user.email?.split('@')[0]}
                </span>
                <TactileButton
                  variant="secondary"
                  onClick={handleSignOut}
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.8125rem' }}
                >
                  Sign Out
                </TactileButton>
              </div>
            ) : (
              <TactileButton
                variant="secondary"
                onClick={() => setAuthModalOpen(true)}
                style={{ padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}
              >
                Sign In
              </TactileButton>
            )}

            <TactileButton
              href="/#scanner-simulator"
              variant="primary"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.875rem' }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-near-black)',
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
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 6,
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '100%',
                  height: 2,
                  backgroundColor: 'var(--color-warm-ivory)',
                  borderRadius: 2,
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '100%',
                  height: 2,
                  backgroundColor: 'var(--color-warm-ivory)',
                  borderRadius: 2,
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '65%',
                  height: 2,
                  backgroundColor: 'var(--color-muted-gold)',
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

            <div style={{ paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {session?.user ? (
                <TactileButton
                  variant="secondary"
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  Sign Out ({session.user.name || session.user.email})
                </TactileButton>
              ) : (
                <TactileButton
                  variant="secondary"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }}
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  Sign In with Google
                </TactileButton>
              )}

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

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
}
