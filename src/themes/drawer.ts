import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    overlay: 'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
    drawer:
      'fixed z-50 bg-default border-default shadow-xl max-h-full overflow-y-auto',
    header: 'space-y-2 p-6 pb-4 border-b border-default',
    title: 'text-xl font-semibold text-foreground',
    description: 'text-muted',
    body: 'flex-1 p-6 text-foreground',
    footer: 'flex justify-end gap-2 p-6 pt-4 border-t border-default',
    closeButton:
      'absolute top-4 right-4 p-1 rounded-md text-muted hover:text-foreground hover:bg-elevated focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors'
  },
  variants: {
    side: {
      top: {
        drawer: 'top-0 left-0 right-0 border-b'
      },
      bottom: {
        drawer: 'bottom-0 left-0 right-0 border-t'
      },
      left: {
        drawer: 'top-0 left-0 bottom-0 border-r flex flex-col'
      },
      right: {
        drawer: 'top-0 right-0 bottom-0 border-l flex flex-col'
      }
    },
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
      full: {}
    }
  },
  compoundVariants: [
    // Top/Bottom drawer sizes
    {
      side: 'top',
      size: 'xs',
      class: {
        drawer: 'h-1/4'
      }
    },
    {
      side: 'top',
      size: 'sm',
      class: {
        drawer: 'h-1/3'
      }
    },
    {
      side: 'top',
      size: 'md',
      class: {
        drawer: 'h-1/2'
      }
    },
    {
      side: 'top',
      size: 'lg',
      class: {
        drawer: 'h-2/3'
      }
    },
    {
      side: 'top',
      size: 'xl',
      class: {
        drawer: 'h-3/4'
      }
    },
    {
      side: 'top',
      size: 'full',
      class: {
        drawer: 'h-full'
      }
    },
    {
      side: 'bottom',
      size: 'xs',
      class: {
        drawer: 'h-1/4'
      }
    },
    {
      side: 'bottom',
      size: 'sm',
      class: {
        drawer: 'h-1/3'
      }
    },
    {
      side: 'bottom',
      size: 'md',
      class: {
        drawer: 'h-1/2'
      }
    },
    {
      side: 'bottom',
      size: 'lg',
      class: {
        drawer: 'h-2/3'
      }
    },
    {
      side: 'bottom',
      size: 'xl',
      class: {
        drawer: 'h-3/4'
      }
    },
    {
      side: 'bottom',
      size: 'full',
      class: {
        drawer: 'h-full'
      }
    },
    // Left/Right drawer sizes
    {
      side: 'left',
      size: 'xs',
      class: {
        drawer: 'w-64'
      }
    },
    {
      side: 'left',
      size: 'sm',
      class: {
        drawer: 'w-80'
      }
    },
    {
      side: 'left',
      size: 'md',
      class: {
        drawer: 'w-96'
      }
    },
    {
      side: 'left',
      size: 'lg',
      class: {
        drawer: 'w-[448px]'
      }
    },
    {
      side: 'left',
      size: 'xl',
      class: {
        drawer: 'w-[512px]'
      }
    },
    {
      side: 'left',
      size: 'full',
      class: {
        drawer: 'w-full'
      }
    },
    {
      side: 'right',
      size: 'xs',
      class: {
        drawer: 'w-64'
      }
    },
    {
      side: 'right',
      size: 'sm',
      class: {
        drawer: 'w-80'
      }
    },
    {
      side: 'right',
      size: 'md',
      class: {
        drawer: 'w-96'
      }
    },
    {
      side: 'right',
      size: 'lg',
      class: {
        drawer: 'w-[448px]'
      }
    },
    {
      side: 'right',
      size: 'xl',
      class: {
        drawer: 'w-[512px]'
      }
    },
    {
      side: 'right',
      size: 'full',
      class: {
        drawer: 'w-full'
      }
    }
  ],
  defaultVariants: {
    side: 'right',
    size: 'md'
  }
})
