import { tv } from 'tailwind-variants'

/**
 * ============================================
 * CARTINO UI - COMPONENT THEME TEMPLATE
 * ============================================
 *
 * This is a comprehensive template for creating new component themes
 * following Nuxt UI v4 patterns and best practices.
 *
 * USAGE STEPS:
 * 1. Copy this file and rename it (e.g., 'button.ts', 'input.ts')
 * 2. Define all slots (HTML elements in your component)
 * 3. Add variants (size, color, variant, states)
 * 4. Use compoundVariants for complex conditional styling
 * 5. Set defaultVariants
 * 6. Export types for TypeScript support
 *
 * AVAILABLE COLORS (from theme system):
 * - primary, secondary, success, warning, error/destructive, info
 * - Each has: 50-950 scale + semantic tokens with -foreground variants
 *
 * DESIGN TOKENS:
 * - Backgrounds: bg-background, bg-default, bg-elevated, bg-card
 * - Text: text-foreground, text-highlighted, text-muted
 * - Borders: border-border, border-input
 * - Interactive: ring-ring, bg-accent, text-accent-foreground
 */

/**
 * Define the theme using tailwind-variants
 * This creates a type-safe, composable styling system
 */
const componentTheme = tv({
  /**
   * SLOTS: Define each element/part of your component
   * Each slot can have base classes and variant-specific classes
   */
  slots: {
    // Root element - always required
    root: 'relative inline-flex items-center justify-center gap-2 px-4 py-2 font-medium text-base rounded-lg border border-border transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'

    // Additional elements (uncomment and customize as needed)
    // label: 'truncate text-sm',
    // icon: 'shrink-0 size-4',
    // wrapper: 'flex flex-col gap-1',
    // description: 'text-xs text-muted',
  },

  /**
   * VARIANTS: Different styling options for the component
   */
  variants: {
    /**
     * Size variants - Control component dimensions
     */
    size: {
      xs: {
        root: 'text-xs px-2 py-1 gap-1'
        // icon: 'size-3',
      },
      sm: {
        root: 'text-sm px-3 py-1.5 gap-1.5'
        // icon: 'size-3.5',
      },
      md: {
        root: 'text-base px-4 py-2 gap-2'
        // icon: 'size-4',
      },
      lg: {
        root: 'text-lg px-6 py-3 gap-2.5'
        // icon: 'size-5',
      },
      xl: {
        root: 'text-xl px-8 py-4 gap-3'
        // icon: 'size-6',
      }
    },

    /**
     * Variant styles - Different visual treatments
     */
    variant: {
      solid: {
        root: 'border-transparent shadow-sm'
      },
      outline: {
        root: 'bg-transparent border-2'
      },
      soft: {
        root: 'border-transparent'
      },
      ghost: {
        root: 'bg-transparent border-transparent shadow-none'
      },
      link: {
        root: 'bg-transparent border-transparent shadow-none underline-offset-4 hover:underline px-0'
      }
    },

    /**
     * Color variants - Semantic color system
     */
    color: {
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      error: {},
      info: {}
    },

    /**
     * Boolean variants - Simple on/off states
     */
    disabled: {
      true: {
        root: 'opacity-50 cursor-not-allowed pointer-events-none'
      }
    },
    loading: {
      true: {
        root: 'cursor-wait opacity-75'
      }
    },
    fullWidth: {
      true: {
        root: 'w-full'
      }
    }
  },

  /**
   * COMPOUND VARIANTS: Complex conditional styling
   * Applied when multiple variants are active together
   */
  compoundVariants: [
    // ===== SOLID VARIANT COLORS =====
    {
      variant: 'solid',
      color: 'primary',
      class: {
        root: 'bg-primary text-primary-foreground hover:bg-primary/90'
      }
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: {
        root: 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
      }
    },
    {
      variant: 'solid',
      color: 'success',
      class: {
        root: 'bg-success text-success-foreground hover:bg-success/90'
      }
    },
    {
      variant: 'solid',
      color: 'warning',
      class: {
        root: 'bg-warning text-warning-foreground hover:bg-warning/90'
      }
    },
    {
      variant: 'solid',
      color: 'error',
      class: {
        root: 'bg-error text-error-foreground hover:bg-error/90'
      }
    },
    {
      variant: 'solid',
      color: 'info',
      class: {
        root: 'bg-info text-info-foreground hover:bg-info/90'
      }
    },

    // ===== OUTLINE VARIANT COLORS =====
    {
      variant: 'outline',
      color: 'primary',
      class: {
        root: 'border-primary text-primary hover:bg-primary/10'
      }
    },
    {
      variant: 'outline',
      color: 'secondary',
      class: {
        root: 'border-secondary text-secondary-foreground hover:bg-secondary/10'
      }
    },
    {
      variant: 'outline',
      color: 'success',
      class: {
        root: 'border-success text-success hover:bg-success/10'
      }
    },
    {
      variant: 'outline',
      color: 'error',
      class: {
        root: 'border-error text-error hover:bg-error/10'
      }
    },

    // ===== SOFT VARIANT COLORS =====
    {
      variant: 'soft',
      color: 'primary',
      class: {
        root: 'bg-primary/10 text-primary hover:bg-primary/20'
      }
    },
    {
      variant: 'soft',
      color: 'secondary',
      class: {
        root: 'bg-secondary/10 text-secondary-foreground hover:bg-secondary/20'
      }
    },
    {
      variant: 'soft',
      color: 'success',
      class: {
        root: 'bg-success/10 text-success hover:bg-success/20'
      }
    },
    {
      variant: 'soft',
      color: 'error',
      class: {
        root: 'bg-error/10 text-error hover:bg-error/20'
      }
    },

    // ===== GHOST VARIANT COLORS =====
    {
      variant: 'ghost',
      color: 'primary',
      class: {
        root: 'text-primary hover:bg-primary/10'
      }
    },
    {
      variant: 'ghost',
      color: 'secondary',
      class: {
        root: 'text-secondary-foreground hover:bg-secondary/10'
      }
    },

    // ===== STATE COMBINATIONS =====
    {
      disabled: true,
      loading: true,
      class: {
        root: 'opacity-50 cursor-not-allowed'
      }
    }
  ],

  /**
   * DEFAULT VARIANTS: Default values when not specified
   */
  defaultVariants: {
    size: 'md',
    variant: 'solid',
    color: 'primary',
    disabled: false,
    loading: false,
    fullWidth: false
  }
})

/**
 * TYPE EXPORTS for TypeScript support
 */

// Extract variant props type from the theme (use Parameters for tailwind-variants v3)
export type ComponentThemeVariants = Parameters<typeof componentTheme>[0]

// Define the complete props interface (merge with your component props)
export interface ComponentThemeProps extends ComponentThemeVariants {
  // Add component-specific props here
  // label?: string
  // onClick?: () => void
}

/**
 * Export the theme as default
 */
export default componentTheme
