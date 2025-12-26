import { tv } from 'tailwind-variants'

export default tv({
  slots: {

    root: 'relative flex',
    list: 'flex flex-col gap-1 p-1',
    item: 'relative w-full',
    trigger:
      'group inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ' +
      'hover:bg-accent hover:text-accent-foreground ' +
      'focus:outline-none focus:ring-2 focus:ring-primary ' +
      'disabled:pointer-events-none disabled:opacity-50',

    triggerIcon: 'size-4 shrink-0',

    triggerCaret:
      'ml-auto size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180',

    content:
      'absolute z-50 min-w-[200px] rounded-xl border border-border bg-popover p-2 shadow-xl ' +
      'animate-in fade-in-0 zoom-in-95 ' +
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',

    grid: 'grid gap-2 grid-cols-1',

    gridItem:
      'flex items-start gap-3 rounded-lg p-3 transition-colors ' +
      'hover:bg-accent hover:text-accent-foreground ' +
      'focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer',

    gridItemIcon: 'size-5 shrink-0 mt-0.5',

    gridItemContent: 'flex-1 space-y-1',

    gridItemLabel: 'text-sm font-medium leading-none',

    gridItemDescription: 'text-xs text-muted-foreground leading-snug',
    link:
      'inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ' +
      'hover:bg-accent hover:text-accent-foreground ' +
      'focus:outline-none focus:ring-2 focus:ring-primary ' +
      'disabled:pointer-events-none disabled:opacity-50',

    linkIcon: 'size-4 shrink-0'
  },

  variants: {
    orientation: {
      horizontal: {
        root: 'items-center',
        list: 'flex-col items-stretch lg:flex-row lg:items-center',
        content: 'top-full left-0 mt-2'
      },

      vertical: {
        root: 'flex-col',
        list: 'flex-col items-stretch',
        content: 'relative static mt-1 ml-4 border-none shadow-none bg-transparent p-0'
      }
    }
  },


  defaultVariants: {
    orientation: 'vertical'
  }
})
