import TactileButton from '../components/ui/TactileButton';

export default function NotFound() {
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
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '4.5rem',
          fontWeight: 800,
          color: 'var(--color-cyan)',
          lineHeight: 1,
        }}
      >
        404
      </span>

      <div style={{ maxWidth: 480 }}>
        <h2 style={{ marginBottom: '0.75rem' }}>Resource Not Found</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          The requested coordinate or token endpoint does not exist on this cluster. Verify the URL or return to the main console.
        </p>
      </div>

      <TactileButton variant="primary" href="/">
        Return to Emergency Console
      </TactileButton>
    </div>
  );
}
