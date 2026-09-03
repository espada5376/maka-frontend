import type {
  InputHTMLAttributes,
  ReactNode,
} from 'react'

export type InputType =
  | 'text'
  | 'number'
  | 'tel'
  | 'email'
  | 'password'
  | 'search'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: InputType
  label?: string
  helperText?: string
  error?: string
  success?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}
