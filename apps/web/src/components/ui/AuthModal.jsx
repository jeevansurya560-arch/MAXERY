'use client';

import { useState } from 'react';
import { signIn } from '../../lib/auth-client';
import StatusBadge from './StatusBadge';

export default function AuthModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signIn.social({
        provider: 'google',
        callbackURL: typeof window !== 'undefined' ? window.location.href : '/',
      });
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError(err?.message || 'Authentication failed. Please verify network connection.');
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(5, 8, 15, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="card-soft"
        style={{
          width: '100%',
          maxWidth: 440,
          padding: '2.5rem',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-clinical-lg)',
          background: 'var(--color-near-black)',
          borderRadius: '10px',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close authentication modal"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--color-warm-ivory-muted)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '4px',
          }}
        >
          &times;
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <StatusBadge variant="gold" style={{ marginBottom: '0.75rem', background: 'rgba(23, 43, 64, 0.5)', borderColor: 'rgba(191, 160, 106, 0.3)' }}>
            ✦ CLINICAL AUTHENTICATION ✦
          </StatusBadge>
          <h2 id="auth-modal-title" className="font-neoclassical text-gold-foil" style={{ fontSize: '1.65rem', marginBottom: '0.5rem', fontWeight: 700 }}>
            Sign In to MAXERY
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-ivory-muted)' }}>
            Authenticate with verified Google credentials to manage your emergency profile or responder custody credentials.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              background: 'rgba(220, 38, 38, 0.12)',
              border: '1px solid rgba(220, 38, 38, 0.4)',
              borderRadius: '6px',
              padding: '0.75rem 1rem',
              color: '#fca5a5',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
            }}
          >
            {error}
          </div>
        )}

        {/* Google OAuth Button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.85rem',
              background: 'var(--color-warm-ivory)',
              color: 'var(--color-near-black)',
              border: '1px solid var(--color-muted-gold)',
              borderRadius: '6px',
              padding: '0.85rem 1.5rem',
              fontSize: '0.9375rem',
              fontFamily: 'var(--font-neoclassical)',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
          >
            {/* Google Vector Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{loading ? 'Connecting to Google...' : 'Continue with Google'}</span>
          </button>
        </div>

        {/* Security & Statutory Notice */}
        <div
          style={{
            marginTop: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-hairline)',
            fontSize: '0.75rem',
            color: 'var(--color-warm-ivory-muted)',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          <p style={{ margin: 0 }}>
            Protected by HttpOnly session tokens and DPDPA 2023 compliance. No credentials or medical telemetry stored in unencrypted browser storage.
          </p>
        </div>
      </div>
    </div>
  );
}
