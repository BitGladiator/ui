import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'peer shrink-0 rounded-md border-2 border-border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary/60',
    indicator: 'flex size-full items-center justify-center text-current',
    icon: 'size-3.5',
    label:
      'text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer',
    description: 'text-sm text-muted-foreground',
    wrapper: 'flex items-center space-x-3',
    content: 'grid gap-2'
  },
  variants: {
    size: {
      sm: {
        root: 'size-4 rounded-sm',
        icon: 'size-2.5',
        label: 'text-xs',
        description: 'text-xs',
        wrapper: 'space-x-2'
      },
      md: {
        root: 'size-5 rounded-md',
        icon: 'size-3.5',
        label: 'text-sm',
        description: 'text-sm',
        wrapper: 'space-x-3'
      },
      lg: {
        root: 'size-6 rounded-md',
        icon: 'size-4',
        label: 'text-base',
        description: 'text-sm',
        wrapper: 'space-x-3'
      }
    },
    color: {
      primary: {
        root: 'border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground focus-visible:ring-primary'
      },
      success: {
        root: 'border-input data-[state=checked]:bg-success data-[state=checked]:border-success data-[state=checked]:text-success-foreground focus-visible:ring-success'
      },
      warning: {
        root: 'border-input data-[state=checked]:bg-warning data-[state=checked]:border-warning data-[state=checked]:text-warning-foreground focus-visible:ring-warning'
      },
      error: {
        root: 'border-input data-[state=checked]:bg-error data-[state=checked]:border-error data-[state=checked]:text-error-foreground focus-visible:ring-error'
      }
    },
    state: {
      checked: {
        root: 'border-primary bg-primary text-primary-foreground'
      },
      unchecked: {
        // keep `border-input` for theming but also include `border-border` to ensure visibility in dark themes
        root: 'border-input border-border bg-transparent'
      },
      indeterminate: {
        root: 'border-primary bg-primary text-primary-foreground'
      }
    },
    disabled: {
      true: {
        root: 'cursor-not-allowed opacity-50 hover:border-input',
        label: 'cursor-not-allowed opacity-50'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
    state: 'unchecked',
    disabled: false
  }
})
