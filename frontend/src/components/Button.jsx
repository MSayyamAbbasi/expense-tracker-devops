const VARIANT_CLASSES = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn-danger',
  ghost: 'btn-ghost',
};

/**
 * Reusable button with variant styling and a built-in loading state.
 */
const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  loading = false,
  disabled = false,
  className = '',
  icon: Icon,
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        Icon && <Icon className="h-4 w-4" />
      )}
      {children}
    </button>
  );
};

export default Button;
