import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    overlay:
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]',
    content:
      'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background divide-y divide-border flex flex-col rounded-lg shadow-xl ring-1 ring-border max-h-[90vh] focus:outline-none data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]',
    header: 'flex items-center gap-1.5 p-4 sm:p-6 min-h-16',
    wrapper: 'flex-1',
    title: 'text-xl font-semibold text-foreground',
    description: 'mt-1 text-muted-foreground text-sm',
    body: 'flex-1 p-4 sm:p-6 overflow-y-auto text-foreground',
    footer: 'flex items-center justify-end gap-2 p-4 sm:p-6',
    closeButton: ''
  },
  variants: {
    size: {
      xs: {
        content: 'w-[300px]'
      },
      sm: {
        content: 'w-[400px]'
      },
      md: {
        content: 'w-[500px]'
      },
      lg: {
        content: 'w-[600px]'
      },
      xl: {
        content: 'w-[700px]'
      },
      '2xl': {
        content: 'w-[800px]'
      },
      '3xl': {
        content: 'w-[900px]'
      },
      full: {
        content: 'w-[95vw]'
      }
    },
    fullscreen: {
      true: {
        content:
          'inset-0 w-screen h-screen max-w-none max-h-none rounded-none left-0 top-0 translate-x-0 translate-y-0'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    fullscreen: false
  }
})
