import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'group relative rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
    header: 'flex items-center justify-between p-4 pb-2',
    title: 'text-sm font-medium text-muted-foreground',
    content: 'px-4 pb-4',
    value: 'text-2xl font-bold tracking-tight',
    change: 'flex items-center gap-1 text-xs font-medium',
    changeIcon: 'size-3',
    description: 'text-xs text-muted-foreground mt-1'
  },
  variants: {
    variant: {
      default: {
        root: 'bg-card border-border'
      },
      primary: {
        root: 'bg-primary/5 border-primary/20',
        title: 'text-primary/80',
        value: 'text-primary-foreground'
      },
      success: {
        root: 'bg-success/5 border-success/20',
        title: 'text-success/80',
        value: 'text-success-foreground'
      },
      warning: {
        root: 'bg-warning/5 border-warning/20',
        title: 'text-warning/80',
        value: 'text-warning-foreground'
      },
      destructive: {
        root: 'bg-destructive/5 border-destructive/20',
        title: 'text-destructive/80',
        value: 'text-destructive-foreground'
      }
    },
    size: {
      sm: {
        header: 'p-3 pb-1',
        content: 'px-3 pb-3',
        value: 'text-xl',
        title: 'text-xs'
      },
      md: {
        header: 'p-4 pb-2',
        content: 'px-4 pb-4',
        value: 'text-2xl',
        title: 'text-sm'
      },
      lg: {
        header: 'p-6 pb-3',
        content: 'px-6 pb-6',
        value: 'text-3xl',
        title: 'text-base'
      }
    },
    trend: {
      up: {
        change: 'text-success',
        changeIcon: 'text-success'
      },
      down: {
        change: 'text-destructive',
        changeIcon: 'text-destructive'
      },
      neutral: {
        change: 'text-muted-foreground',
        changeIcon: 'text-muted-foreground'
      }
    },
    interactive: {
      true: {
        root: 'cursor-pointer hover:bg-accent/50 hover:border-accent-foreground/20'
      }
    }
  },
  compoundVariants: [
    {
      variant: 'primary',
      interactive: true,
      class: {
        root: 'hover:bg-primary/10'
      }
    },
    {
      variant: 'success',
      interactive: true,
      class: {
        root: 'hover:bg-success/10'
      }
    }
  ],
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
})
