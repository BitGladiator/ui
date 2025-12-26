import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'relative group overflow-hidden bg-card shadow-lg rounded-lg border border-border p-4 flex gap-3 focus:outline-none',
    wrapper: 'w-0 flex-1 flex flex-col gap-1',
    title: 'text-sm font-medium text-foreground',
    description: 'text-sm text-muted-foreground',
    icon: 'shrink-0 size-5',
    avatar: 'shrink-0',
    actions: 'flex gap-2 shrink-0',
    close: 'p-0'
  },
  variants: {
    color: {
      primary: {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
        icon: 'text-primary'
      },
      success: {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success',
        icon: 'text-success'
      },
      warning: {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning',
        icon: 'text-warning'
      },
      error: {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error',
        icon: 'text-error'
      },
      info: {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
        icon: 'text-primary'
      },
      neutral: {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border',
        icon: 'text-foreground'
      }
    },
    orientation: {
      horizontal: {
        root: 'items-center',
        actions: 'items-center'
      },
      vertical: {
        root: 'items-start',
        actions: 'items-start mt-2'
      }
    },
    hasTitle: {
      true: {
        description: 'mt-0.5'
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    orientation: 'vertical',
    hasTitle: false
  }
})
