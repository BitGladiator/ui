import { tv } from 'tailwind-variants'

/**
 * Dialog (Modal) Component Theme
 *
 * A modal dialog overlay component built on Reka UI's DialogRoot.
 *
 * @slots
 * - overlay: The backdrop overlay
 * - content: The main dialog content container
 * - header: Header section container
 * - title: Dialog title text
 * - description: Dialog description text
 * - body: Main content area
 * - footer: Footer section for actions
 * - close: Close button
 */
export const dialog = tv({
  slots: {
    overlay:
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    content:
      'fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
    header: 'flex flex-col space-y-1.5 text-center sm:text-left',
    title: 'text-lg font-semibold leading-none tracking-tight text-foreground',
    description: 'text-sm text-muted-foreground',
    body: 'space-y-4',
    footer: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
    close:
      'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none'
  },
  variants: {
    size: {
      sm: {
        content: 'max-w-sm p-4',
        header: 'p-4 pb-2',
        body: 'p-4 py-2',
        footer: 'p-4 pt-2'
      },
      md: {
        content: 'max-w-lg p-6',
        header: 'pb-4',
        body: 'py-2',
        footer: 'pt-4'
      },
      lg: {
        content: 'max-w-2xl p-8',
        header: 'pb-6',
        body: 'py-4',
        footer: 'pt-6'
      },
      xl: {
        content: 'max-w-4xl p-10',
        header: 'pb-8',
        body: 'py-6',
        footer: 'pt-8'
      },
      full: {
        content: 'max-w-[95vw] h-[95vh] p-8',
        header: 'pb-6',
        body: 'py-4 flex-1 overflow-auto',
        footer: 'pt-6'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

export default dialog
