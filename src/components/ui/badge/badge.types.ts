import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeVariant =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  icon?: ReactNode
}
