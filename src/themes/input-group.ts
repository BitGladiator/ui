import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'group relative flex w-full items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    input: 'flex w-full border-0 bg-transparent p-0 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
    icon: 'size-4 text-muted-foreground'
  },
  variants: {
    variant: {
      default: {
        root: 'border-input bg-background hover:border-accent-foreground/20'
      },
      filled: {
        root: 'border-transparent bg-muted hover:bg-muted/80'
      },
      ghost: {
        root: 'border-transparent bg-transparent hover:bg-accent'
      }
    },
    size: {
      sm: {
        root: 'h-8 px-2 text-xs',
        input: 'text-xs'
      },
      md: {
        root: 'h-9 px-3 text-sm',
        input: 'text-sm'
      },
      lg: {
        root: 'h-10 px-4 text-base',
        input: 'text-base'
      }
    },
    hasError: {
      true: {
        root: 'border-destructive focus-within:ring-destructive'
      }
    },
    disabled: {
      true: {
        root: 'cursor-not-allowed opacity-50'
      }
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
})