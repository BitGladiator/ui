import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'relative flex items-center select-none touch-none',
    track: 'relative grow rounded-full bg-muted',
    range: 'absolute rounded-full bg-primary',
    thumb:
      'block rounded-full bg-background border-2 border-primary hover:border-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
  },
  variants: {
    size: {
      xs: {
        thumb: 'size-3'
      },
      sm: {
        thumb: 'size-3.5'
      },
      md: {
        thumb: 'size-4'
      },
      lg: {
        thumb: 'size-4.5'
      },
      xl: {
        thumb: 'size-5'
      }
    },
    color: {
      primary: {
        range: 'bg-primary',
        thumb: 'border-primary hover:border-primary/80 focus-visible:ring-ring'
      },
      secondary: {
        range: 'bg-secondary',
        thumb:
          'border-secondary hover:border-secondary/80 focus-visible:ring-ring'
      },
      success: {
        range: 'bg-success',
        thumb: 'border-success hover:border-success/80 focus-visible:ring-ring'
      },
      info: {
        range: 'bg-info',
        thumb: 'border-info hover:border-info/80 focus-visible:ring-ring'
      },
      warning: {
        range: 'bg-warning',
        thumb: 'border-warning hover:border-warning/80 focus-visible:ring-ring'
      },
      error: {
        range: 'bg-error',
        thumb: 'border-error hover:border-error/80 focus-visible:ring-ring'
      },
      neutral: {
        range: 'bg-muted',
        thumb:
          'border-muted-foreground hover:border-muted-foreground/80 focus-visible:ring-ring'
      }
    },
    orientation: {
      horizontal: {
        root: 'w-full',
        track: 'h-1.5'
      },
      vertical: {
        root: 'h-full flex-col',
        track: 'w-1.5'
      }
    },
    disabled: {
      true: {
        root: 'opacity-50 cursor-not-allowed'
      }
    }
  },
  compoundVariants: [
    // Track height by size for horizontal
    {
      orientation: 'horizontal',
      size: 'xs',
      class: { track: 'h-1' }
    },
    {
      orientation: 'horizontal',
      size: 'sm',
      class: { track: 'h-1.5' }
    },
    {
      orientation: 'horizontal',
      size: 'md',
      class: { track: 'h-2' }
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      class: { track: 'h-2.5' }
    },
    {
      orientation: 'horizontal',
      size: 'xl',
      class: { track: 'h-3' }
    },
    // Track width by size for vertical
    {
      orientation: 'vertical',
      size: 'xs',
      class: { track: 'w-1' }
    },
    {
      orientation: 'vertical',
      size: 'sm',
      class: { track: 'w-1.5' }
    },
    {
      orientation: 'vertical',
      size: 'md',
      class: { track: 'w-2' }
    },
    {
      orientation: 'vertical',
      size: 'lg',
      class: { track: 'w-2.5' }
    },
    {
      orientation: 'vertical',
      size: 'xl',
      class: { track: 'w-3' }
    }
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
    orientation: 'horizontal',
    disabled: false
  }
})
