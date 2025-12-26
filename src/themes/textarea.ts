import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    wrapper: 'relative w-full',
    root: 'flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    resizeHandle: 'absolute bottom-0 right-0 p-1 cursor-se-resize',
    resizeIcon: 'size-4 text-muted-foreground'
  },
  variants: {
    size: {
      sm: {
        root: 'min-h-[60px] px-2 py-1 text-xs'
      },
      md: {
        root: 'min-h-[80px] px-3 py-2 text-sm'
      },
      lg: {
        root: 'min-h-[100px] px-4 py-3 text-base'
      }
    },
    variant: {
      outline: {
        root: 'border border-border'
      },
      filled: {
        root: 'border-0 bg-muted'
      },
      flushed: {
        root: 'border-0 border-b border-border rounded-none px-0'
      },
      unstyled: {
        root: 'border-0 bg-transparent p-0'
      }
    },
    color: {
      primary: {
        root: 'focus-visible:ring-primary'
      },
      error: {
        root: 'border-error focus-visible:ring-error'
      },
      success: {
        root: 'border-success focus-visible:ring-success'
      },
      warning: {
        root: 'border-warning focus-visible:ring-warning'
      },
      info: {
        root: 'border-info focus-visible:ring-info'
      }
    },
    disabled: {
      true: {
        root: 'opacity-50 cursor-not-allowed'
      }
    },
    resize: {
      true: {
        root: 'resize-y'
      },
      false: {
        root: 'resize-none'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
    color: 'primary',
    resize: true
  }
})
