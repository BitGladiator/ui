import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'w-full',
    label: 'block mb-1.5 font-medium text-foreground',
    wrapper: 'relative flex items-center transition-all',
    input:
      'flex-1 outline-none bg-transparent text-foreground placeholder:text-muted-foreground',
    leadingIcon:
      'shrink-0 text-muted-foreground absolute left-3 grid place-items-center',
    trailingIcon:
      'shrink-0 text-muted-foreground absolute right-3 grid place-items-center',
    hint: 'mt-1.5'
  },
  variants: {
    size: {
      sm: {
        label: 'text-xs',
        wrapper: 'text-sm',
        input: 'px-3 py-1.5',
        leadingIcon: 'w-4 h-4',
        trailingIcon: 'w-4 h-4',
        hint: 'text-xs'
      },
      md: {
        label: 'text-sm',
        wrapper: 'text-base',
        input: 'px-4 py-1.5',
        leadingIcon: 'w-[22px] h-[22px]',
        trailingIcon: 'w-[22px] h-[22px]',
        hint: 'text-sm'
      },
      lg: {
        label: 'text-base',
        wrapper: 'text-lg',
        input: 'px-5 py-3',
        leadingIcon: 'w-6 h-6',
        trailingIcon: 'w-6 h-6',
        hint: 'text-base'
      }
    },
    variant: {
      outline: {
        wrapper: 'border rounded-lg bg-background'
      },
      filled: {
        wrapper: 'border-0 rounded-lg bg-muted'
      },
      ghost: {
        wrapper: 'border-0'
      }
    },
    color: {
      primary: {},
      success: {},
      warning: {},
      error: {}
    },
    focused: {
      true: {}
    },
    disabled: {
      true: {
        wrapper: 'opacity-50 cursor-not-allowed'
      }
    },
    hasLeading: {
      true: {
        input: 'pl-10'
      }
    },
    hasError: {
      true: {
        hint: 'text-error'
      },
      false: {
        hint: 'text-muted-foreground'
      }
    }
  },
  compoundVariants: [
    // Outline variant colors
    {
      variant: 'outline',
      color: 'primary',
      focused: false,
      class: {
        wrapper: 'border-border hover:border-border/80'
      }
    },
    {
      variant: 'outline',
      color: 'primary',
      focused: true,
      class: {
        wrapper: 'border-primary ring-2 ring-ring'
      }
    },
    {
      variant: 'outline',
      color: 'success',
      class: {
        wrapper: 'border-success ring-2 ring-success/20'
      }
    },
    {
      variant: 'outline',
      color: 'warning',
      class: {
        wrapper: 'border-warning ring-2 ring-warning/20'
      }
    },
    {
      variant: 'outline',
      color: 'error',
      class: {
        wrapper: 'border-error ring-2 ring-error/20'
      }
    },
    // Filled variant colors
    {
      variant: 'filled',
      color: 'primary',
      focused: false,
      class: {
        wrapper: 'bg-muted'
      }
    },
    {
      variant: 'filled',
      color: 'primary',
      focused: true,
      class: {
        wrapper: 'bg-accent ring-2 ring-ring'
      }
    },
    {
      variant: 'filled',
      color: 'success',
      class: {
        wrapper: 'bg-success/10 ring-2 ring-success/20'
      }
    },
    {
      variant: 'filled',
      color: 'warning',
      class: {
        wrapper: 'bg-warning/10 ring-2 ring-warning/20'
      }
    },
    {
      variant: 'filled',
      color: 'error',
      class: {
        wrapper: 'bg-error/10 ring-2 ring-error/20'
      }
    },
    // Ghost variant colors
    {
      variant: 'ghost',
      color: 'primary',
      focused: false,
      class: {
        wrapper: 'bg-transparent'
      }
    },
    {
      variant: 'ghost',
      color: 'primary',
      focused: true,
      class: {
        wrapper: 'bg-muted'
      }
    },
    {
      variant: 'ghost',
      color: 'success',
      class: {
        wrapper: 'bg-success/10'
      }
    },
    {
      variant: 'ghost',
      color: 'warning',
      class: {
        wrapper: 'bg-warning/10'
      }
    },
    {
      variant: 'ghost',
      color: 'error',
      class: {
        wrapper: 'bg-error/10'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    variant: 'outline',
    color: 'primary',
    focused: false,
    disabled: false,
    hasLeading: false,
    hasError: false
  }
})
