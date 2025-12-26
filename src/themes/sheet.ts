import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'fixed z-50 gap-4 bg-background shadow-lg focus:outline-none',
    header: 'flex flex-col space-y-2 text-center sm:text-left',
    title: 'text-lg font-semibold text-foreground',
    description: 'text-sm text-muted-foreground',
    content: 'flex-1 overflow-y-auto',
    footer: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
    close:
      'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none'
  },
  variants: {
    side: {
      top: {
        root: 'inset-x-0 top-0 border-b data-[state=open]:animate-[slide-in-from-top_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-top_200ms_ease-in-out]'
      },
      bottom: {
        root: 'inset-x-0 bottom-0 border-t data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-bottom_200ms_ease-in-out]'
      },
      left: {
        root: 'inset-y-0 left-0 h-full border-r data-[state=open]:animate-[slide-in-from-left_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-left_200ms_ease-in-out]'
      },
      right: {
        root: 'inset-y-0 right-0 h-full border-l data-[state=open]:animate-[slide-in-from-right_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-right_200ms_ease-in-out]'
      }
    },
    size: {
      sm: {
        root: 'p-4',
        header: 'space-y-1',
        title: 'text-base font-medium',
        description: 'text-xs',
        content: 'gap-3 py-3',
        footer: 'space-y-2 sm:space-y-0 sm:space-x-2'
      },
      md: {
        root: 'p-6',
        header: 'space-y-2',
        title: 'text-lg font-semibold',
        description: 'text-sm',
        content: 'gap-4 py-4',
        footer: 'space-y-2 sm:space-y-0 sm:space-x-2'
      },
      lg: {
        root: 'p-8',
        header: 'space-y-3',
        title: 'text-xl font-semibold',
        description: 'text-base',
        content: 'gap-6 py-6',
        footer: 'space-y-3 sm:space-y-0 sm:space-x-3'
      }
    }
  },
  compoundVariants: [
    // Top/Bottom sheets - full width with max height
    {
      side: ['top', 'bottom'],
      size: 'sm',
      class: {
        root: 'w-full max-h-[300px]'
      }
    },
    {
      side: ['top', 'bottom'],
      size: 'md',
      class: {
        root: 'w-full max-h-[400px]'
      }
    },
    {
      side: ['top', 'bottom'],
      size: 'lg',
      class: {
        root: 'w-full max-h-[600px]'
      }
    },
    // Left/Right sheets - fixed width
    {
      side: ['left', 'right'],
      size: 'sm',
      class: {
        root: 'w-[300px] sm:w-[350px]'
      }
    },
    {
      side: ['left', 'right'],
      size: 'md',
      class: {
        root: 'w-[400px] sm:w-[450px]'
      }
    },
    {
      side: ['left', 'right'],
      size: 'lg',
      class: {
        root: 'w-[500px] sm:w-[600px]'
      }
    }
  ],
  defaultVariants: {
    side: 'right',
    size: 'md'
  }
})
