/**
 * StatusBadge — Visual state indicator for clinical and triage acuity
 * @param {Object} props
 * @param {'emergency' | 'verified' | 'cyan' | 'neutral'} [props.variant='neutral']
 * @param {React.ReactNode} props.children
 * @param {string} [props.className='']
 */
export default function StatusBadge({
  variant = 'neutral',
  children,
  className = '',
}) {
  return (
    <span className={`badge-pill badge-${variant} ${className}`.trim()}>
      <span className="badge-dot" aria-hidden="true" />
      {children}
    </span>
  );
}
