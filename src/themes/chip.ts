import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'relative inline-flex shrink-0',
    base: 'rounded-full ring-1 ring-white flex items-center justify-center font-medium whitespace-nowrap'
  },
  variants: {
    color: {
      primary: {
        base: 'bg-primary text-primary-foreground'
      },
      secondary: {
        base: 'bg-secondary text-secondary-foreground'
      },
      success: {
        base: 'bg-success text-success-foreground'
      },
      info: {
        base: 'bg-info text-info-foreground'
      },
      warning: {
        base: 'bg-warning text-warning-foreground'
      },
      error: {
        base: 'bg-error text-error-foreground'
      },
      neutral: {
        base: 'bg-muted text-foreground'
      }
    },
    size: {
      '3xs': {
        base: 'size-1.5'
      },
      '2xs': {
        base: 'size-2'
      },
      xs: {
        base: 'size-2.5 text-[8px]'
      },
      sm: {
        base: 'size-3 text-[10px]'
      },
      md: {
        base: 'size-4 text-xs'
      },
      lg: {
        base: 'size-5 text-sm'
      },
      xl: {
        base: 'size-6 text-base'
      },
      '2xl': {
        base: 'size-7 text-lg'
      },
      '3xl': {
        base: 'size-8 text-xl'
      }
    },
    position: {
      'top-right': {},
      'top-left': {},
      'bottom-right': {},
      'bottom-left': {}
    },
    inset: {
      true: {},
      false: {}
    },
    standalone: {
      true: {
        root: 'relative'
      },
      false: {
        base: 'absolute'
      }
    }
  },
  compoundVariants: [
    // Top-right positioning
    {
      position: 'top-right',
      inset: false,
      standalone: false,
      class: {
        base: 'top-0 right-0 transform translate-x-1/2 -translate-y-1/2'
      }
    },
    {
      position: 'top-right',
      inset: true,
      standalone: false,
      class: {
        base: 'top-0 right-0'
      }
    },
    // Top-left positioning
    {
      position: 'top-left',
      inset: false,
      standalone: false,
      class: {
        base: 'top-0 left-0 transform -translate-x-1/2 -translate-y-1/2'
      }
    },
    {
      position: 'top-left',
      inset: true,
      standalone: false,
      class: {
        base: 'top-0 left-0'
      }
    },
    // Bottom-right positioning
    {
      position: 'bottom-right',
      inset: false,
      standalone: false,
      class: {
        base: 'bottom-0 right-0 transform translate-x-1/2 translate-y-1/2'
      }
    },
    {
      position: 'bottom-right',
      inset: true,
      standalone: false,
      class: {
        base: 'bottom-0 right-0'
      }
    },
    // Bottom-left positioning
    {
      position: 'bottom-left',
      inset: false,
      standalone: false,
      class: {
        base: 'bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2'
      }
    },
    {
      position: 'bottom-left',
      inset: true,
      standalone: false,
      class: {
        base: 'bottom-0 left-0'
      }
    }
  ],
  defaultVariants: {
    color: 'primary',
    size: 'md',
    position: 'top-right',
    inset: false,
    standalone: false
  }
})
