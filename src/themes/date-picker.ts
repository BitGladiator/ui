import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    base: 'relative inline-flex items-center gap-1 rounded-lg border transition-all duration-200 outline-none disabled:cursor-not-allowed disabled:opacity-50 text-foreground w-full',
    segment:
      'inline-block rounded px-1 py-0.5 tabular-nums text-foreground outline-none ' +
      'focus:bg-accent focus:text-accent-foreground focus:ring-2 focus:ring-primary/20 ' +
      'data-[placeholder]:text-muted-foreground min-w-[1.5rem] text-center cursor-text ' +
      'transition-all duration-150',
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
        base: 'h-8 px-2 text-sm gap-1 min-h-8',
        segment: 'text-sm py-0.5',
        leadingIcon: 'w-3.5 h-3.5',
        trailingIcon: 'w-3.5 h-3.5',
        loadingIcon: 'w-3.5 h-3.5',
        separatorIcon: 'w-3 h-3'
      },
      md: {
        base: 'h-9 px-3 text-base gap-1.5 min-h-9',
        segment: 'text-base py-0.5',
        leadingIcon: 'w-4 h-4',
        trailingIcon: 'w-4 h-4',
        loadingIcon: 'w-4 h-4',
        separatorIcon: 'w-4 h-4'
      },
      lg: {
        base: 'h-12 px-4 text-lg gap-2 min-h-12',
        segment: 'text-lg py-1 px-1.5 min-w-[2rem]', // ADD min-width
        leadingIcon: 'w-5 h-5',
        trailingIcon: 'w-5 h-5',
        loadingIcon: 'w-5 h-5',
        separatorIcon: 'w-5 h-5'
      }
    },
    variant: {
      outline: {
        base: 'bg-background border-input hover:border-primary/50'
      },
      filled: {
        base: 'bg-muted border-transparent hover:bg-muted/80'
      },
      ghost: {
        base: 'bg-transparent border-transparent hover:bg-accent'
      },
      soft: {
        base: 'bg-accent/50 border-transparent hover:bg-accent/70'
      },
      none: {
        base: 'bg-transparent border-transparent shadow-none'
      }
    },
    color: {
      primary: {
        base: 'focus-within:ring-2 focus-within:ring-primary/20'
      },
      error: {
        base: 'focus-within:ring-2 focus-within:ring-error/20'
      },
      success: {
        base: 'focus-within:ring-2 focus-within:ring-success/20'
      },
      warning: {
        base: 'focus-within:ring-2 focus-within:ring-warning/20'
      },
      info: {
        base: 'focus-within:ring-2 focus-within:ring-info/20'
      }
    },
    disabled: {
      true: {
        base: 'opacity-50 cursor-not-allowed pointer-events-none bg-muted/50'
      }
    },
    leading: {
      true: {}
    },
    trailing: {
      true: {}
    },
    loading: {
      true: {}
    },
    range: {
      true: {
        base: 'flex-wrap sm:flex-nowrap'
      }
    }
  },
  compoundVariants: [
    {
      variant: 'outline',
      color: 'primary',
      class: {
        base: 'border-input focus-within:border-primary focus-within:shadow-sm'
      }
    },
    {
      variant: 'outline',
      color: 'error',
      class: {
        base: 'border-input focus-within:border-error focus-within:shadow-sm'
      }
    },
    {
      variant: 'outline',
      color: 'success',
      class: {
        base: 'border-input focus-within:border-success focus-within:shadow-sm'
      }
    },
    {
      variant: 'outline',
      color: 'warning',
      class: {
        base: 'border-input focus-within:border-warning focus-within:shadow-sm'
      }
    },
    {
      variant: 'outline',
      color: 'info',
      class: {
        base: 'border-input focus-within:border-info focus-within:shadow-sm'
      }
    },
    {
      variant: 'filled',
      color: 'primary',
      class: {
        base: 'focus-within:bg-primary/5 focus-within:border-primary/20'
      }
    },
    {
      variant: 'filled',
      color: 'error',
      class: {
        base: 'focus-within:bg-error/5 focus-within:border-error/20'
      }
    },
    {
      variant: 'filled',
      color: 'success',
      class: {
        base: 'focus-within:bg-success/5 focus-within:border-success/20'
      }
    },
    {
      variant: 'filled',
      color: 'warning',
      class: {
        base: 'focus-within:bg-warning/5 focus-within:border-warning/20'
      }
    },
    {
      variant: 'filled',
      color: 'info',
      class: {
        base: 'focus-within:bg-info/5 focus-within:border-info/20'
      }
    },
    {
      size: 'sm',
      range: true,
      class: {
        base: 'px-1.5 py-1'
      }
    },
    {
      size: 'md',
      range: true,
      class: {
        base: 'px-2 py-1.5'
      }
    },
    {
      size: 'lg',
      range: true,
      class: {
        base: 'px-3 py-2'
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
    loading: false,
    range: false
  }
})
