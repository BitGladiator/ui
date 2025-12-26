import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'gap-2',
    base: 'relative overflow-hidden rounded-full bg-muted',
    indicator:
      'rounded-full size-full transition-transform duration-200 ease-out',
    status: 'flex text-muted-foreground transition-[width] duration-200',
    steps: 'grid items-end',
    step: 'truncate text-end row-start-1 col-start-1 transition-opacity'
  },
  variants: {
    animation: {
      none: '',
      carousel: '',
      'carousel-inverse': '',
      swing: '',
      elastic: ''
    },
    color: {
      primary: {
        indicator: 'bg-primary',
        steps: 'text-primary'
      },
      success: {
        indicator: 'bg-green-500',
        steps: 'text-green-500'
      },
      warning: {
        indicator: 'bg-yellow-500',
        steps: 'text-yellow-500'
      },
      error: {
        indicator: 'bg-red-500',
        steps: 'text-red-500'
      },
      info: {
        indicator: 'bg-cyan-500',
        steps: 'text-cyan-500'
      },
      neutral: {
        indicator: 'bg-foreground',
        steps: 'text-foreground'
      }
    },
    size: {
      sm: {
        status: 'text-sm',
        steps: 'text-sm'
      },
      md: {
        status: 'text-sm',
        steps: 'text-sm'
      },
      lg: {
        status: 'text-base',
        steps: 'text-base'
      }
    },
    step: {
      active: {
        step: 'opacity-100'
      },
      first: {
        step: 'opacity-100 text-muted-foreground'
      },
      other: {
        step: 'opacity-0'
      },
      last: {
        step: ''
      }
    },
    orientation: {
      horizontal: {
        root: 'w-full flex flex-col',
        base: 'w-full',
        status: 'flex-row items-center justify-end min-w-fit'
      },
      vertical: {
        root: 'h-full flex flex-row-reverse',
        base: 'h-full',
        status: 'flex-col justify-end min-h-fit'
      }
    },
    inverted: {
      true: {
        status: 'self-end'
      }
    }
  },
  compoundVariants: [
    {
      inverted: true,
      orientation: 'horizontal',
      class: {
        step: 'text-start',
        status: 'flex-row-reverse'
      }
    },
    {
      inverted: true,
      orientation: 'vertical',
      class: {
        steps: 'items-start',
        status: 'flex-col-reverse'
      }
    },
    {
      orientation: 'horizontal',
      size: 'sm',
      class: 'h-1'
    },
    {
      orientation: 'horizontal',
      size: 'md',
      class: 'h-2'
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      class: 'h-3'
    },
    {
      orientation: 'vertical',
      size: 'sm',
      class: 'w-1'
    },
    {
      orientation: 'vertical',
      size: 'md',
      class: 'w-2'
    },
    {
      orientation: 'vertical',
      size: 'lg',
      class: 'w-3'
    },
    {
      orientation: 'horizontal',
      animation: 'carousel',
      class: {
        indicator:
          'data-[state=indeterminate]:animate-[carousel_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'vertical',
      animation: 'carousel',
      class: {
        indicator:
          'data-[state=indeterminate]:animate-[carousel-vertical_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'horizontal',
      animation: 'carousel-inverse',
      class: {
        indicator:
          'data-[state=indeterminate]:animate-[carousel-inverse_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'vertical',
      animation: 'carousel-inverse',
      class: {
        indicator:
          'data-[state=indeterminate]:animate-[carousel-inverse-vertical_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'horizontal',
      animation: 'swing',
      class: {
        indicator:
          'data-[state=indeterminate]:animate-[swing_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'vertical',
      animation: 'swing',
      class: {
        indicator:
          'data-[state=indeterminate]:animate-[swing-vertical_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'horizontal',
      animation: 'elastic',
      class: {
        indicator:
          'data-[state=indeterminate]:animate-[elastic_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'vertical',
      animation: 'elastic',
      class: {
        indicator:
          'data-[state=indeterminate]:animate-[elastic-vertical_2s_ease-in-out_infinite]'
      }
    }
  ],
  defaultVariants: {
    animation: 'none',
    color: 'primary',
    size: 'md',
    orientation: 'horizontal',
    inverted: false
  }
})
