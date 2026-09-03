import type { BadgeProps } from './badge.types'

const variantClasses = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-error/10 text-error',
  info: 'bg-info/10 text-info',
  neutral: 'bg-muted/10 text-muted',
} as const

function Badge({
  variant = 'neutral',
  icon,
  children,
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5',
        'min-h-7',
        'rounded-full',
        'px-2',
        'text-caption font-medium',
        'whitespace-nowrap',
        variantClasses[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {icon && (
        <span
          aria-hidden="true"
          className="inline-flex shrink-0"
        >
          {icon}
        </span>
      )}

      <span>{children}</span>
    </span>
  )
}

export { Badge }
