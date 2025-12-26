import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    content:
      'z-50 overflow-hidden rounded-lg bg-popover border border-border text-popover-foreground shadow-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    arrow: 'fill-popover'
  },
  variants: {
    size: {
      sm: {
        content: 'px-2 py-1 text-xs'
      },
      md: {
        content: 'px-3 py-2 text-xs'
      },
      lg: {
        content: 'px-4 py-3 text-sm'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
})
