import { tv } from 'tailwind-variants'

/**
 * Radio Component Theme
 * Individual radio button styling (used within RadioGroup)
 * Supports sizes, colors, and states using data-state attributes
 */
export default tv({
  slots: {
    // Base radio styles with data-state checked styling
    root: 'shrink-0 rounded-full border-2 border-input dark:border-border bg-background dark:bg-transparent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    indicator:
      'flex items-center justify-center w-full h-full relative after:content-[""] after:block after:absolute after:rounded-full after:shadow-sm after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:opacity-0 after:transition-all after:duration-150 data-[state=checked]:after:opacity-100'
  },
  variants: {
    size: {
      sm: {
        root: 'h-4 w-4',
        indicator: 'after:h-2 after:w-2'
      },
      md: {
        root: 'h-5 w-5',
        indicator: 'after:h-2.5 after:w-2.5'
      },
      lg: {
        root: 'h-6 w-6',
        indicator: 'after:h-3 after:w-3'
      }
    },
    color: {
      primary: {
        root: 'data-[state=checked]:border-primary data-[state=checked]:bg-primary',
        indicator: 'data-[state=checked]:after:bg-primary-foreground'
      },
      secondary: {
        root: 'data-[state=checked]:border-secondary data-[state=checked]:bg-secondary',
        indicator: 'data-[state=checked]:after:bg-secondary-foreground'
      },
      success: {
        root: 'data-[state=checked]:border-success data-[state=checked]:bg-success',
        indicator: 'data-[state=checked]:after:bg-success-foreground'
      },
      warning: {
        root: 'data-[state=checked]:border-warning data-[state=checked]:bg-warning',
        indicator: 'data-[state=checked]:after:bg-warning-foreground'
      },
      error: {
        root: 'data-[state=checked]:border-error data-[state=checked]:bg-error',
        indicator: 'data-[state=checked]:after:bg-error-foreground'
      },
      info: {
        root: 'data-[state=checked]:border-info data-[state=checked]:bg-info',
        indicator: 'data-[state=checked]:after:bg-info-foreground'
      }
    },
    disabled: {
      true: {
        root: 'opacity-50 cursor-not-allowed'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
    disabled: false
  }
})

// Export type for TypeScript support
export type RadioThemeVariants = Parameters<typeof tv>[0]
