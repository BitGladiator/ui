import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'flex items-center gap-2',
    input: 'size-10 rounded-md border border-input bg-background text-center text-sm font-medium text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    separator: 'text-muted-foreground'
  },
  variants: {
    variant: {
      default: {
        input: 'border-input bg-background'
      },
      filled: {
        input: 'border-transparent bg-muted'
      },
      outline: {
        input: 'border-2 border-input bg-transparent'
      }
    },
    size: {
      sm: {
        input: 'size-8 text-xs'
      },
      md: {
        input: 'size-10 text-sm'
      },
      lg: {
        input: 'size-12 text-base'
      }
    },
    hasError: {
      true: {
        input: 'border-destructive focus:border-destructive focus:ring-destructive'
      }
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
})