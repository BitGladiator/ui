import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'bg-default border border-default rounded-lg',
    iconContainer: 'rounded-lg shrink-0',
    icon: '',
    content: 'flex-1 min-w-0',
    label: 'font-medium text-muted-foreground',
    value: 'font-bold text-foreground tracking-tight',
    prefix: 'text-muted-foreground',
    suffix: 'text-muted-foreground',
    description: 'text-sm text-muted-foreground',
    change: 'flex items-center gap-1 text-sm font-medium',
    changeIcon: 'size-3',
    changePeriod: 'text-muted-foreground',
    progressContainer: 'flex items-center gap-2 mt-2',
    progressTrack:
      'flex-1 h-1 bg-muted-foreground/10 rounded-full overflow-hidden',
    progressFill: 'h-full transition-all duration-300 ease-out',
    progressText: 'text-xs text-muted-foreground font-medium',
    trend: 'shrink-0'
  },
  variants: {
    size: {
      sm: {
        root: 'p-3',
        iconContainer: 'p-1.5',
        icon: 'size-4',
        label: 'text-xs',
        value: 'text-lg'
      },
      md: {
        root: 'p-4',
        iconContainer: 'p-2',
        icon: 'size-5',
        label: 'text-sm',
        value: 'text-2xl'
      },
      lg: {
        root: 'p-6',
        iconContainer: 'p-3',
        icon: 'size-6',
        label: 'text-sm',
        value: 'text-3xl'
      }
    },
    color: {
      default: {
        iconContainer: 'bg-muted',
        icon: 'text-muted-foreground',
        progressFill: 'bg-foreground'
      },
      primary: {
        iconContainer: 'bg-primary/10',
        icon: 'text-primary',
        progressFill: 'bg-primary'
      },
      success: {
        iconContainer: 'bg-success/10',
        icon: 'text-success',
        progressFill: 'bg-success'
      },
      warning: {
        iconContainer: 'bg-warning/10',
        icon: 'text-warning',
        progressFill: 'bg-warning'
      },
      error: {
        iconContainer: 'bg-error/10',
        icon: 'text-error',
        progressFill: 'bg-error'
      },
      info: {
        iconContainer: 'bg-info/10',
        icon: 'text-info',
        progressFill: 'bg-info'
      }
    },
    orientation: {
      horizontal: {
        root: 'flex items-center gap-4'
      },
      vertical: {
        root: 'flex flex-col gap-2'
      }
    },
    changeType: {
      positive: {
        change: 'text-success'
      },
      negative: {
        change: 'text-error'
      },
      neutral: {
        change: 'text-muted-foreground'
      }
    },
    loading: {
      true: {
        value: 'animate-pulse'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
    orientation: 'vertical',
    changeType: 'neutral',
    loading: false
  }
})
