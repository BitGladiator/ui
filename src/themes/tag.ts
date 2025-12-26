import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    icon: 'size-3 mr-1',
    close: 'ml-1 size-3 cursor-pointer rounded-full hover:bg-current/20 transition-colors'
  },
  variants: {
    variant: {
      default: {
        root: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80'
      },
      secondary: {
        root: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'
      },
      destructive: {
        root: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80'
      },
      success: {
        root: 'border-transparent bg-success text-success-foreground hover:bg-success/80'
      },
      warning: {
        root: 'border-transparent bg-warning text-warning-foreground hover:bg-warning/80'
      },
      outline: {
        root: 'text-foreground border-border hover:bg-accent hover:text-accent-foreground'
      },
      ghost: {
        root: 'border-transparent hover:bg-accent hover:text-accent-foreground'
      }
    },
    size: {
      xs: {
        root: 'px-1.5 py-0.5 text-xs h-5',
        icon: 'size-2.5'
      },
      sm: {
        root: 'px-2.5 py-0.5 text-xs h-6',
        icon: 'size-3'
      },
      md: {
        root: 'px-3 py-1 text-sm h-7',
        icon: 'size-3.5'
      },
      lg: {
        root: 'px-4 py-1.5 text-sm h-8',
        icon: 'size-4'
      }
    },
    shape: {
      rounded: {
        root: 'rounded-full'
      },
      square: {
        root: 'rounded-md'
      },
      pill: {
        root: 'rounded-full px-4'
      }
    },
    interactive: {
      true: {
        root: 'cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95'
      }
    }
  },
  compoundVariants: [
    {
      variant: 'outline',
      interactive: true,
      class: {
        root: 'hover:border-accent-foreground/50'
      }
    },
    {
      size: 'xs',
      shape: 'pill',
      class: {
        root: 'px-2'
      }
    },
    {
      size: 'lg',
      shape: 'pill',
      class: {
        root: 'px-6'
      }
    }
  ],
  defaultVariants: {
    variant: 'default',
    size: 'sm',
    shape: 'rounded'
  }
})