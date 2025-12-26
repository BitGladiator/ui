import { tv } from 'tailwind-variants'

/**
 * Button Component Theme
 * Polaris-inspired design with Cartino primary color (#0e5bff)
 * Matches Shopify Polaris Button component specs exactly
 */
export default tv({
  slots: {
    base: 'relative box-border inline-flex items-center justify-center gap-1.5 select-none cursor-pointer touch-manipulation transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-1',
    label: 'transition-transform',
    leadingIcon:
      'shrink-0 -my-[2px] transition-transform grid place-items-center',
    trailingIcon:
      'shrink-0 -my-[2px] transition-transform grid place-items-center'
  },
  variants: {
    variant: {
      primary: {
        base: 'active:shadow-[0_3px_0_0_rgb(0,0,0)_inset]',
        label: 'active:translate-y-[1px]',
        leadingIcon: 'active:translate-y-[1px]',
        trailingIcon: 'active:translate-y-[1px]'
      },

      secondary: {
        base: 'active:shadow-[-1px_0_1px_0_rgba(26,26,26,0.122)_inset,1px_0_1px_0_rgba(26,26,26,0.122)_inset,0_2px_1px_0_rgba(26,26,26,0.2)_inset]',
        label: 'active:translate-y-[1px]',
        leadingIcon: 'active:translate-y-[1px]',
        trailingIcon: 'active:translate-y-[1px]'
      },

      tertiary: 'bg-transparent',

      plain: 'bg-transparent -mx-3 -my-1.5 hover:underline',

      monochromePlain: 'bg-transparent -mx-3 -my-1.5'
    },
    tone: {
      default: '',
      critical: '',
      success: ''
    },
    size: {
      // Small - Polaris "slim"
      sm: {
        base: 'min-h-[32px] min-w-[32px] px-3 py-1.5 text-xs font-medium rounded-lg md:min-h-[28px] md:min-w-[28px]',
        leadingIcon: 'size-4',
        trailingIcon: 'size-4'
      },
      // Medium - Polaris default
      md: {
        base: 'min-h-[36px] min-w-[36px] px-4 py-2 text-sm font-medium rounded-lg md:min-h-[32px] md:min-w-[32px]',
        leadingIcon: 'size-4',
        trailingIcon: 'size-4'
      },
      // Large - bigger buttons
      lg: {
        base: 'min-h-[40px] min-w-[40px] px-5 py-2.5 text-base font-medium rounded-lg md:min-h-[36px] md:min-w-[36px]',
        leadingIcon: 'size-4',
        trailingIcon: 'size-4'
      }
    },
    loading: {
      true: {
        base: 'cursor-wait opacity-75'
      }
    },
    block: {
      true: {
        base: 'w-full'
      }
    },
    square: {
      true: ''
    },
    disabled: {
      true: ''
    }
  },
  compoundVariants: [
    // ===== PRIMARY VARIANT (with tone variations) =====
    {
      variant: 'primary',
      tone: 'default',
      class: {
        base: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 disabled:opacity-50'
      }
    },
    {
      variant: 'primary',
      tone: 'success',
      class: {
        base: 'bg-success text-success-foreground hover:bg-success/90 active:bg-success/80 disabled:opacity-50'
      }
    },
    {
      variant: 'primary',
      tone: 'critical',
      class: {
        base: 'bg-error text-error-foreground hover:bg-error/90 active:bg-error/80 disabled:opacity-50'
      }
    },

    // ===== SECONDARY VARIANT (with tone variations) =====
    {
      variant: 'secondary',
      tone: 'default',
      class: {
        base: 'bg-card text-foreground border border-border hover:bg-accent active:bg-accent/80 disabled:opacity-50'
      }
    },
    {
      variant: 'secondary',
      tone: 'success',
      class: {
        base: 'bg-card text-success border border-success/30 hover:bg-success/10 active:bg-success/20 disabled:opacity-50'
      }
    },
    {
      variant: 'secondary',
      tone: 'critical',
      class: {
        base: 'bg-card text-error border border-error/30 hover:bg-error/10 active:bg-error/20 disabled:opacity-50'
      }
    },

    // ===== TERTIARY VARIANT (with tone variations) =====
    {
      variant: 'tertiary',
      tone: 'default',
      class: {
        base: 'text-foreground hover:bg-accent active:bg-accent/80 disabled:opacity-50'
      }
    },
    {
      variant: 'tertiary',
      tone: 'success',
      class: {
        base: 'text-success hover:bg-success/10 active:bg-success/20 disabled:opacity-50'
      }
    },
    {
      variant: 'tertiary',
      tone: 'critical',
      class: {
        base: 'text-error hover:bg-error/10 active:bg-error/20 disabled:opacity-50'
      }
    },

    // ===== PLAIN VARIANT (with tone variations) =====
    {
      variant: 'plain',
      tone: 'default',
      class: {
        base: 'text-primary hover:text-primary/80 active:text-primary/70 disabled:opacity-50'
      }
    },
    {
      variant: 'plain',
      tone: 'success',
      class: {
        base: 'text-success hover:text-success/80 active:text-success/70 disabled:opacity-50'
      }
    },
    {
      variant: 'plain',
      tone: 'critical',
      class: {
        base: 'text-error hover:text-error/80 active:text-error/70 disabled:opacity-50'
      }
    },

    // ===== MONOCHROME PLAIN VARIANT =====
    {
      variant: 'monochromePlain',
      class: {
        base: 'text-foreground hover:bg-accent active:bg-accent/80 disabled:opacity-50'
      }
    },
    // ===== ICON ONLY (SQUARE) ADJUSTMENTS =====
    // Remove negative margins and center icon perfectly
    {
      square: true,
      class: {
        leadingIcon: 'my-0',
        trailingIcon: 'my-0'
      }
    },
    {
      square: true,
      size: 'sm',
      class: {
        base: 'px-1 py-1 min-w-[28px] aspect-square'
      }
    },
    {
      square: true,
      size: 'md',
      class: {
        base: 'px-1 py-1 min-w-[28px] aspect-square'
      }
    },
    {
      square: true,
      size: 'lg',
      class: {
        base: 'px-1.5 py-1.5 min-w-[32px] aspect-square'
      }
    }
  ],
  defaultVariants: {
    variant: 'primary',
    tone: 'default',
    size: 'md',
    loading: false,
    block: false,
    square: false,
    disabled: false
  }
})

// Export types for TypeScript support
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'plain'
  | 'monochromePlain'
export type ButtonTone = 'default' | 'success' | 'critical'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
