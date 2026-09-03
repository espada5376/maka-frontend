import type { ReactNode } from 'react'

export interface ProductCardProduct {
  id: string
  name: string
  price: number
  sellerName: string
  sellerAvatar?: string
  image?: string
  badge?: {
    label: string
    variant: 'success' | 'warning' | 'error' | 'info' | 'neutral'
  }
}

export interface ProductCardProps {
  product: ProductCardProduct
  onClick?: () => void
  loading?: boolean
  className?: string
  fallbackImage?: ReactNode
}
