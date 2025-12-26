import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'relative z-50 w-full transition-colors',
    container: 'flex items-center justify-between gap-3 h-12',
    left: 'hidden lg:flex-1 lg:flex lg:items-center',
    center: 'flex items-center gap-1.5 min-w-0',
    right: 'lg:flex-1 flex items-center justify-end',
    icon: 'size-[22px] shrink-0 pointer-events-none',
    title: 'text-sm font-medium truncate',
    actions: 'flex gap-1.5 shrink-0 isolate',
    close: 'size-[22px] shrink-0 -me-1.5 lg:me-0'
  },
  variants: {
    color: {
      primary: {
        root: 'bg-primary',
        icon: 'text-primary-foreground',
        title: 'text-primary-foreground',
        close:
          'text-primary-foreground hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10'
      },
      secondary: {
        root: 'bg-secondary',
        icon: 'text-secondary-foreground',
        title: 'text-secondary-foreground',
        close:
          'text-secondary-foreground hover:bg-secondary-foreground/10 focus-visible:bg-secondary-foreground/10'
      },
      success: {
        root: 'bg-success',
        icon: 'text-success-foreground',
        title: 'text-success-foreground',
        close:
          'text-success-foreground hover:bg-success-foreground/10 focus-visible:bg-success-foreground/10'
      },
      info: {
        root: 'bg-info',
        icon: 'text-info-foreground',
        title: 'text-info-foreground',
        close:
          'text-info-foreground hover:bg-info-foreground/10 focus-visible:bg-info-foreground/10'
      },
      warning: {
        root: 'bg-warning',
        icon: 'text-warning-foreground',
        title: 'text-warning-foreground',
        close:
          'text-warning-foreground hover:bg-warning-foreground/10 focus-visible:bg-warning-foreground/10'
      },
      error: {
        root: 'bg-error',
        icon: 'text-error-foreground',
        title: 'text-error-foreground',
        close:
          'text-error-foreground hover:bg-error-foreground/10 focus-visible:bg-error-foreground/10'
      },
      neutral: {
        root: 'bg-muted',
        icon: 'text-foreground',
        title: 'text-foreground',
        close:
          'text-foreground hover:bg-foreground/10 focus-visible:bg-foreground/10'
      }
    },
    to: {
      true: ''
    }
  },
  compoundVariants: [
    {
      color: 'primary',
      to: true,
      class: {
        root: 'hover:bg-primary/90'
      }
    },
    {
      color: 'secondary',
      to: true,
      class: {
        root: 'hover:bg-secondary/90'
      }
    },
    {
      color: 'success',
      to: true,
      class: {
        root: 'hover:bg-success/90'
      }
    },
    {
      color: 'info',
      to: true,
      class: {
        root: 'hover:bg-info/90'
      }
    },
    {
      color: 'warning',
      to: true,
      class: {
        root: 'hover:bg-warning/90'
      }
    },
    {
      color: 'error',
      to: true,
      class: {
        root: 'hover:bg-error/90'
      }
    },
    {
      color: 'neutral',
      to: true,
      class: {
        root: 'hover:bg-muted/90'
      }
    }
  ],
  defaultVariants: {
    color: 'primary',
    to: false
  }
})
