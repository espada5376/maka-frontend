import type {
  CardContentProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
} from './card.types'

const variantClasses = {
  default:
    'border border-border bg-surface',
  elevated:
    'border border-border bg-surface shadow-md',
  interactive:
    'border border-border bg-surface cursor-pointer transition-colors hover:bg-background active:bg-border/30',
} as const

const paddingClasses = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
} as const

function Card({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={[
        'rounded-md',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({
  children,
  className = '',
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={[
        'flex flex-col gap-1',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

function CardContent({
  children,
  className = '',
  ...props
}: CardContentProps) {
  return (
    <div
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}

function CardFooter({
  children,
  className = '',
  ...props
}: CardFooterProps) {
  return (
    <div
      className={[
        'flex items-center',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
}
