import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'relative flex flex-col min-h-screen w-64 shrink-0 border-border bg-background transition-all duration-200 ease-in-out',
    header:
      'h-16 shrink-0 flex items-center gap-1.5 px-4 border-b border-border transition-all duration-200',
    body: 'flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-2 transition-all duration-200',
    footer:
      'shrink-0 flex items-center gap-1.5 px-4 py-2 border-t border-border transition-all duration-200',
    toggle: '',
    handle:
      'absolute top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/20 transition-colors',
    content: 'lg:hidden',
    overlay: 'lg:hidden'
  },
  variants: {
    side: {
      left: {
        root: 'border-r',
        handle: '-right-0.5'
      },
      right: {
        root: 'border-l',
        handle: '-left-0.5'
      }
    },
    collapsed: {
      true: {
        root: 'w-16',
        header: 'justify-center px-2',
        body: 'px-2',
        footer: 'px-2'
      }
    }
  },
  defaultVariants: {
    side: 'left',
    collapsed: false
  }
})
