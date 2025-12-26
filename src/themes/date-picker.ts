import { tv } from 'tailwind-variants'

/**
 * DatePicker Component Theme
 * Date field with segments and icons
 * Supports sizes, variants, colors, and states
 */
export default tv({
  slots: {
    base: 'relative inline-flex items-center gap-1 rounded-lg border transition-all duration-200 outline-none disabled:cursor-not-allowed disabled:opacity-50 text-foreground',
    segment:
      'inline-block rounded px-0.5 py-0 tabular-nums text-foreground outline-none focus:bg-accent focus:text-accent-foreground data-[placeholder]:text-muted-foreground',
    leading: 'flex items-center justify-center shrink-0',
    leadingIcon: 'shrink-0 text-muted-foreground',
    trailing: 'flex items-center justify-center shrink-0',
    trailingIcon: 'shrink-0 text-muted-foreground',
    loadingIcon: 'shrink-0 text-muted-foreground animate-spin',
    separatorIcon: 'shrink-0 text-muted-foreground'
  },
  variants: {
    size: {
      sm: {
        base: 'h-8 px-2 text-sm gap-1',
        segment: 'text-sm',
        leadingIcon: 'w-3.5 h-3.5',
        trailingIcon: 'w-3.5 h-3.5',
        loadingIcon: 'w-3.5 h-3.5',
        separatorIcon: 'w-3 h-3'
      },
      md: {
        base: 'h-9 px-3 text-base gap-1.5',
        segment: 'text-base',
        leadingIcon: 'w-4 h-4',
        trailingIcon: 'w-4 h-4',
        loadingIcon: 'w-4 h-4',
        separatorIcon: 'w-4 h-4'
      },
      lg: {
        base: 'h-12 px-4 text-lg gap-2',
        segment: 'text-lg',
        leadingIcon: 'w-5 h-5',
        trailingIcon: 'w-5 h-5',
        loadingIcon: 'w-5 h-5',
        separatorIcon: 'w-5 h-5'
      }
    },
    variant: {
      outline: {
        base: 'bg-background border-input'
      },
      filled: {
        base: 'bg-muted border-transparent'
      },
      ghost: {
        base: 'bg-transparent border-transparent hover:bg-accent'
      },
      soft: {
        base: 'bg-accent/50 border-transparent'
      },
      none: {
        base: 'bg-transparent border-transparent shadow-none'
      }
    },
    color: {
      primary: {},
      error: {},
      success: {},
      warning: {},
      info: {}
    },
    disabled: {
      true: {
        base: 'opacity-50 cursor-not-allowed pointer-events-none'
      }
    },
    leading: {
      true: {
        leading: ''
      }
    },
    trailing: {
      true: {
        trailing: ''
      }
    },
    loading: {
      true: {}
    }
  },
  compoundVariants: [
    // ===== OUTLINE VARIANT COLORS =====
    {
      variant: 'outline',
      color: 'primary',
      class: {
        base: 'border-input focus-within:border-primary'
      }
    },
    {
      variant: 'outline',
      color: 'error',
      class: {
        base: 'border-input focus-within:border-error'
      }
    },
    {
      variant: 'outline',
      color: 'success',
      class: {
        base: 'border-input focus-within:border-success'
      }
    },
    {
      variant: 'outline',
      color: 'warning',
      class: {
        base: 'border-input focus-within:border-warning'
      }
    },
    {
      variant: 'outline',
      color: 'info',
      class: {
        base: 'border-input focus-within:border-info'
      }
    },

    // ===== FILLED VARIANT COLORS =====
    {
      variant: 'filled',
      color: 'primary',
      class: {
        base: 'focus-within:bg-primary/5 focus-within:border-primary/20'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    variant: 'outline',
    color: 'primary',
    disabled: false,
    leading: false,
    trailing: false,
    loading: false
  }
})
