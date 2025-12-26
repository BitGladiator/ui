import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'relative inline-flex items-center gap-2 rounded-lg border border-input bg-card px-4 py-3 text-sm shadow-sm transition-all hover:bg-accent/50',
    icon: 'size-5 shrink-0',
    content: 'flex-1 min-w-0',
    title: 'font-medium text-card-foreground',
    description: 'text-xs text-muted-foreground mt-0.5',
    action: 'shrink-0',
    close:
      'size-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer'
  },
  variants: {
    variant: {
      default: {
        root: 'border-border bg-card text-card-foreground'
      },
      destructive: {
        root: 'border-destructive bg-destructive text-destructive-foreground',
        icon: 'text-destructive-foreground',
        title: 'text-destructive-foreground'
      },
      success: {
        root: 'border-success bg-success text-success-foreground',
        icon: 'text-success-foreground',
        title: 'text-success-foreground'
      },
      warning: {
        root: 'border-warning bg-warning text-warning-foreground',
        icon: 'text-warning-foreground',
        title: 'text-warning-foreground'
      },
      info: {
        root: 'border-primary bg-primary text-primary-foreground',
        icon: 'text-primary-foreground',
        title: 'text-primary-foreground'
      }
    },
    size: {
      sm: {
        root: 'px-3 py-2 text-xs',
        icon: 'size-4',
        close: 'size-3'
      },
      md: {
        root: 'px-4 py-3 text-sm',
        icon: 'size-5',
        close: 'size-4'
      },
      lg: {
        root: 'px-5 py-4 text-base',
        icon: 'size-6',
        close: 'size-5'
      }
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
})
