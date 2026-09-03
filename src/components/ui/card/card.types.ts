import type {
  HTMLAttributes,
  ReactNode,
} from 'react'

export type CardVariant =
  | 'default'
  | 'elevated'
  | 'interactive'

export type CardPadding =
  | 'sm'
  | 'md'
  | 'lg'

export interface CardProps
  extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: CardPadding
  children?: ReactNode
}

export interface CardHeaderProps
  extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export interface CardContentProps
  extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export interface CardFooterProps
  extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}
