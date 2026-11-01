'use client';

import TactileButton from '../components/ui/TactileButton';

export default function ErrorBoundary({ error, reset }) {
  return (
    <div
      className="container"
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '1.5rem',
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.75rem',
          color: '#ef4444',
        }}
      >
        &#9888;
      </div>

      <div style={{ maxWidth: 520 }}>
        <h2 style={{ marginBottom: '0.75rem' }}>Subsystem Exception Encountered</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          An unexpected interruption occurred within the interface layer. Emergency services and background pipelines remain unaffected.
        </p>
        {error?.message && (
          <pre
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1rem',
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '8px',
              color: '#f87171',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              overflowX: 'auto',
            }}
          >
            {error.message}
          </pre>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <TactileButton variant="primary" onClick={() => reset()}>
          Retry Operation
        </TactileButton>
        <TactileButton variant="secondary" href="/">
          Return Home
        </TactileButton>
      </div>
    </div>
  );
}
