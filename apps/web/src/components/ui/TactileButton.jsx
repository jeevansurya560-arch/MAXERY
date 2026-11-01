import Link from 'next/link';

/**
 * TactileButton — Neumorphic / Soft UI Physical Button
 * @param {Object} props
 * @param {'primary' | 'danger' | 'secondary'} [props.variant='primary']
 * @param {string} [props.href] - Optional link target
 * @param {boolean} [props.disabled=false]
 * @param {React.ReactNode} props.children
 * @param {string} [props.className='']
 * @param {Function} [props.onClick]
 * @param {string} [props.id]
 */
export default function TactileButton({
  variant = 'primary',
  href,
  disabled = false,
  children,
  className = '',
  onClick,
  id,
  type = 'button',
  ...rest
}) {
  const variantClass = `btn-${variant}`;
  const combinedClasses = `btn-tactile ${variantClass} ${className}`.trim();

  if (href && !disabled) {
    return (
      <Link href={href} id={id} className={combinedClasses} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
      style={disabled ? { opacity: 0.5, cursor: 'not-allowed', transform: 'none' } : undefined}
      {...rest}
    >
      {children}
    </button>
  );
}
