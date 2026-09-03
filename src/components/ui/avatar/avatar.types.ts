import type { ImgHTMLAttributes, ReactNode } from 'react'

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

export interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src?: string
  alt?: string
  name?: string
  fallback?: ReactNode
  size?: AvatarSize
  verified?: boolean
}
