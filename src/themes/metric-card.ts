import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'group relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-card to-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]',
    content: 'relative z-10 p-6',
    header: 'flex items-start justify-between mb-4',
    icon: 'size-8 text-primary/70',
    title: 'text-sm font-medium text-muted-foreground',
    value: 'text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent',
    change: 'flex items-center gap-1.5 mt-2',
    changeValue: 'text-sm font-semibold',
    changeText: 'text-xs text-muted-foreground',
    changeIcon: 'size-3',
    background: 'absolute inset-0 bg-gradient-to-br opacity-5',
    glow: 'absolute -inset-1 bg-gradient-to-r opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-20'
  },
  variants: {
    variant: {
      default: {
        root: 'from-card to-card/80 border-border',
        background: 'from-primary to-primary',
        glow: 'from-primary to-primary'
      },
      primary: {
        root: 'from-primary/10 to-primary/5 border-primary/20',
        icon: 'text-primary',
        background: 'from-primary to-primary',
        glow: 'from-primary to-primary'
      },
      success: {
        root: 'from-success/10 to-success/5 border-success/20',
        icon: 'text-success',
        background: 'from-success to-success',
        glow: 'from-success to-success'
      },
      warning: {
        root: 'from-warning/10 to-warning/5 border-warning/20',
        icon: 'text-warning',
        background: 'from-warning to-warning',
        glow: 'from-warning to-warning'
      },
      destructive: {
        root: 'from-destructive/10 to-destructive/5 border-destructive/20',
        icon: 'text-destructive',
        background: 'from-destructive to-destructive',
        glow: 'from-destructive to-destructive'
      }
    },
    size: {
      sm: {
        content: 'p-4',
        header: 'mb-2',
        icon: 'size-6',
        value: 'text-2xl',
        title: 'text-xs'
      },
      md: {
        content: 'p-6',
        header: 'mb-4',
        icon: 'size-8',
        value: 'text-3xl',
        title: 'text-sm'
      },
      lg: {
        content: 'p-8',
        header: 'mb-6',
        icon: 'size-10',
        value: 'text-4xl',
        title: 'text-base'
      }
    },
    trend: {
      up: {
        changeValue: 'text-success',
        changeIcon: 'text-success'
      },
      down: {
        changeValue: 'text-destructive',
        changeIcon: 'text-destructive'
      },
      neutral: {
        changeValue: 'text-muted-foreground',
        changeIcon: 'text-muted-foreground'
      }
    },
    animated: {
      true: {
        root: 'animate-in fade-in-0 slide-in-from-bottom-4 duration-700',
        value: 'transition-all duration-1000'
      }
    }
  },
  compoundVariants: [
    {
      variant: 'primary',
      animated: true,
      class: {
        root: 'hover:from-primary/15 hover:to-primary/8'
      }
    },
    {
      size: 'lg',
      class: {
        root: 'hover:scale-[1.01]'
      }
    }
  ],
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
})