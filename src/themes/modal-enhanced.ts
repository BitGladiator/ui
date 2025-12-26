import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    content: 'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg',
    header: 'flex flex-col space-y-1.5 text-center sm:text-left',
    title: 'text-lg font-semibold text-foreground',
    description: 'text-sm text-muted-foreground',
    body: 'grid gap-4 py-4',
    footer: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
    close: 'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'
  },
  variants: {
    size: {
      sm: {
        content: 'max-w-sm p-4 gap-3',
        header: 'space-y-1',
        title: 'text-base font-medium',
        description: 'text-xs',
        body: 'gap-3 py-3'
      },
      md: {
        content: 'max-w-lg p-6 gap-4',
        header: 'space-y-1.5',
        title: 'text-lg font-semibold',
        description: 'text-sm',
        body: 'gap-4 py-4'
      },
      lg: {
        content: 'max-w-2xl p-8 gap-6',
        header: 'space-y-2',
        title: 'text-xl font-semibold',
        description: 'text-base',
        body: 'gap-6 py-6'
      },
      xl: {
        content: 'max-w-4xl p-10 gap-8',
        header: 'space-y-3',
        title: 'text-2xl font-semibold',
        description: 'text-lg',
        body: 'gap-8 py-8'
      }
    },
    centered: {
      true: {
        header: 'text-center',
        footer: 'justify-center'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
})