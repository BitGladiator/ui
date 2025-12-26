declare module 'tailwind-variants' {
  export interface VariantProps {
    [key: string]: any
  }

  export type ClassValue = string | {
    [key: string]: string | boolean | undefined
  }

  export interface TVConfig {
    base?: string
    slots?: Record<string, string>
    variants?: Record<string, Record<string, ClassValue>>
    compoundVariants?: Array<Record<string, any>>
    defaultVariants?: Record<string, any>
  }

  export function tv(config: TVConfig): (...args: any[]) => any
}