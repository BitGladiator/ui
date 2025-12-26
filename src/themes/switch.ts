import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    wrapper: 'inline-flex items-center gap-3',
    root: 'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
    thumb:
      'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0',
    content: 'flex flex-col gap-1',
    label:
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    required: 'text-error ml-0.5',
    description: 'text-sm text-muted-foreground'
  },
  variants: {
    size: {
      sm: {
        root: 'h-4 w-7',
        thumb: 'h-3 w-3 data-[state=checked]:translate-x-3'
      },
      md: {
        root: 'h-6 w-11',
        thumb: 'h-5 w-5 data-[state=checked]:translate-x-5'
      },
      lg: {
        root: 'h-8 w-14',
        thumb: 'h-7 w-7 data-[state=checked]:translate-x-6'
      }
    },
    color: {
      primary: {
        root: 'data-[state=checked]:bg-primary'
      },
      success: {
        root: 'data-[state=checked]:bg-success'
      },
      warning: {
        root: 'data-[state=checked]:bg-warning'
      },
      error: {
        root: 'data-[state=checked]:bg-error'
      }
    },
    disabled: {
      true: {
        root: 'cursor-not-allowed opacity-50',
        label: 'cursor-not-allowed opacity-50'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
    disabled: false
  }
})
