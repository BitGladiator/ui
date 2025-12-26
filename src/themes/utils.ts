/**
 * Theme Utilities
 * Helper functions to reduce compound variant boilerplate across theme files
 */

export interface ColorTokens {
  bg: string
  text: string
  hover: string
  active: string
  ring?: string
}

export const COLOR_MAP: Record<string, ColorTokens> = {
  primary: {
    bg: 'primary',
    text: 'white',
    hover: 'primary-600',
    active: 'primary-700',
    ring: 'primary'
  },
  secondary: {
    bg: 'secondary-200',
    text: 'secondary-900',
    hover: 'secondary-300',
    active: 'secondary-400',
    ring: 'secondary-500'
  },
  success: {
    bg: 'success-600',
    text: 'white',
    hover: 'success-700',
    active: 'success-800',
    ring: 'success'
  },
  warning: {
    bg: 'warning-500',
    text: 'secondary-950',
    hover: 'warning-600',
    active: 'warning-700',
    ring: 'warning'
  },
  error: {
    bg: 'error-600',
    text: 'white',
    hover: 'error-700',
    active: 'error-800',
    ring: 'error'
  },
  info: {
    bg: 'info-500',
    text: 'white',
    hover: 'info-600',
    active: 'info-700',
    ring: 'info'
  }
}

/**
 * Generates compound variants for all variant × color combinations
 * Reduces ~150 lines to 1 function call
 */
export function generateColorVariants(variants: string[], colors?: string[]) {
  const colorKeys = colors || Object.keys(COLOR_MAP)

  return variants
    .flatMap((variant) =>
      colorKeys.map((color) => {
        const tokens = COLOR_MAP[color]
        if (!tokens) return undefined

        const baseClasses = {
          solid: `bg-${tokens.bg} text-${tokens.text} hover:bg-${tokens.hover} active:bg-${tokens.active}`,
          outline: `border-2 border-${tokens.bg} text-${tokens.bg} hover:bg-${tokens.bg}/10 active:bg-${tokens.bg}/20`,
          soft: `bg-${tokens.bg}/10 text-${tokens.bg} hover:bg-${tokens.bg}/20 active:bg-${tokens.bg}/30`,
          ghost: `text-${tokens.bg} hover:bg-${tokens.bg}/10 active:bg-${tokens.bg}/20`,
          link: `text-${tokens.bg} hover:underline active:text-${tokens.active}`
        }

        return {
          variant,
          color,
          class: {
            base: baseClasses[variant as keyof typeof baseClasses] || ''
          }
        }
      })
    )
    .filter((v): v is NonNullable<typeof v> => v !== undefined)
}

/**
 * Generates square (icon-only) size adjustments
 * Reduces ~25 lines to 1 function call
 */
export function generateSizeSquareVariants(sizes: string[]) {
  const sizeMap: Record<string, string> = {
    xs: 'px-[2px] py-[2px] min-w-[24px] aspect-square',
    sm: 'px-1 py-1 min-w-[28px] aspect-square',
    md: 'px-1 py-1 min-w-[28px] aspect-square',
    lg: 'px-1.5 py-1.5 min-w-[32px] aspect-square',
    xl: 'px-2 py-2 min-w-[36px] aspect-square'
  }

  return sizes.map((size) => ({
    square: true,
    size,
    class: {
      base: sizeMap[size] || ''
    }
  }))
}

/**
 * Generate loading state compound variants
 * Different loading styles per variant
 */
export function generateLoadingVariants(variants: string[]) {
  return variants.map((variant) => ({
    variant,
    loading: true,
    class: {
      base:
        variant === 'ghost' || variant === 'link'
          ? 'opacity-60'
          : 'cursor-wait opacity-75'
    }
  }))
}

/**
 * Shared base theme for components
 * Can be extended by individual component themes
 */
export const baseComponentTheme = {
  slots: {
    base: 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-1'
  },
  variants: {
    size: {
      xs: { base: 'px-2 py-1 text-xs gap-1.5' },
      sm: { base: 'px-3 py-1.5 text-sm gap-2' },
      md: { base: 'px-4 py-2 text-base gap-2' },
      lg: { base: 'px-6 py-3 text-lg gap-2.5' },
      xl: { base: 'px-8 py-4 text-xl gap-3' }
    },
    disabled: {
      true: { base: 'opacity-50 pointer-events-none cursor-default' }
    }
  }
}
