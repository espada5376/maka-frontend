import type { ButtonProps } from './button.types'

const variantClasses = {
  primary:
    'bg-primary text-white hover:bg-primary-hover active:bg-primary-hover',
  secondary:
    'bg-primary/10 text-primary hover:bg-primary/15 active:bg-primary/20',
  outline:
    'border border-border bg-surface text-foreground hover:bg-background active:bg-border/50',
  ghost:
    'bg-transparent text-foreground hover:bg-background active:bg-border/50',
  danger:
    'bg-error text-white hover:bg-error/90 active:bg-error/90',
} as const

const sizeClasses = {
  sm: 'h-9 px-3 text-small',
  md: 'h-11 px-4 text-body',
  lg: 'h-12 px-4 text-body',
} as const

function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={[
        'inline-flex items-center justify-center gap-2',
        'rounded-sm',
        'font-semibold',
        'transition-colors',
        'focus-visible:outline-2',
        'focus-visible:outline-offset-2',
        'focus-visible:outline-primary',
        'disabled:cursor-not-allowed',
        'disabled:opacity-60',
        'disabled:hover:bg-inherit',
        sizeClasses[size],
        variantClasses[variant],
        fullWidth ? 'w-full' : 'w-auto',
        className,
      ].join(' ')}
      {...props}
    >
      {loading ? (
        <>
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />

          <span>
            {typeof children === 'string'
              ? `${children}...`
              : 'Chargement...'}
          </span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span
              aria-hidden="true"
              className="inline-flex shrink-0"
            >
              {leftIcon}
            </span>
          )}

          <span>{children}</span>

          {rightIcon && (
            <span
              aria-hidden="true"
              className="inline-flex shrink-0"
            >
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  )
}

export { Button }
