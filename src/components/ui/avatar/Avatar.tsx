import { useState } from 'react'
import type { AvatarProps } from './avatar.types'

const sizeClasses = {
  sm: 'size-8 text-caption',
  md: 'size-10 text-small',
  lg: 'size-12 text-body',
  xl: 'size-16 text-title',
} as const

function getInitials(name?: string) {
  if (!name?.trim()) {
    return null
  }

  const words = name.trim().split(/\s+/)

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase()
}

function Avatar({
  src,
  alt = '',
  name,
  fallback,
  size = 'md',
  verified = false,
  className = '',
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = useState(false)

  const initials = getInitials(name)

  const showImage = Boolean(src) && !imageError

  return (
    <span
      className={[
        'relative inline-flex shrink-0',
        sizeClasses[size],
        className,
      ].join(' ')}
    >
      <span
        className={[
          'flex size-full items-center justify-center',
          'overflow-hidden rounded-full',
          'bg-background text-muted',
          'font-semibold',
        ].join(' ')}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="size-full object-cover"
            {...props}
          />
        ) : (
          fallback ?? (
            <span aria-hidden="true">
              {initials ?? '•'}
            </span>
          )
        )}
      </span>

      {verified && (
        <span
          aria-label="Compte vérifié"
          className={[
            'absolute bottom-0 right-0',
            'flex items-center justify-center',
            'size-4 rounded-full',
            'border-2 border-surface',
            'bg-primary text-[9px] font-bold text-white',
          ].join(' ')}
        >
          ✓
        </span>
      )}
    </span>
  )
}

export { Avatar }
