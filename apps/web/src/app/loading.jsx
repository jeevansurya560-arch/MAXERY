export default function Loading() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
      }}
    >
      <div
        className="spin-animate"
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '3px solid rgba(56, 189, 248, 0.2)',
          borderTopColor: 'var(--color-cyan)',
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.05em',
        }}
      >
        INITIALIZING AEGIS SUBSYSTEM...
      </span>
    </div>
  );
}
