import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: '',
    trigger: '',
    content:
      'z-50 min-w-[200px] overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-xl',
    viewport: 'p-1',
    item: 'relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium outline-none transition-colors duration-75 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    itemIcon: 'size-4 shrink-0 opacity-70',
    itemLabel: 'flex-1 truncate',
    itemShortcut: 'ml-auto text-xs tracking-widest opacity-60',
    separator: 'mx-2 my-1.5 h-px bg-border',
    label:
      'px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground',
    arrow: 'fill-popover'
  },
  variants: {
    size: {
      sm: {
        content: 'min-w-[160px]',
        item: 'px-2 py-2 text-xs gap-2',
        itemIcon: 'size-3.5',
        label: 'px-2 py-1.5 text-[10px]'
      },
      md: {
        content: 'min-w-[200px]',
        item: 'px-3 py-2.5 text-sm gap-3',
        itemIcon: 'size-4',
        label: 'px-3 py-2 text-xs'
      },
      lg: {
        content: 'min-w-[240px]',
        item: 'px-4 py-3 text-base gap-3',
        itemIcon: 'size-5',
        label: 'px-4 py-2.5 text-sm'
      }
    },
    variant: {
      default: {
        content: 'border-border bg-popover shadow-xl'
      },
      minimal: {
        content:
          'border-transparent bg-background/95 backdrop-blur-sm shadow-lg'
      },
      glass: {
        content: 'border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl'
      }
    },
    rounded: {
      sm: {
        content: 'rounded-lg',
        item: 'rounded-md'
      },
      md: {
        content: 'rounded-xl',
        item: 'rounded-lg'
      },
      lg: {
        content: 'rounded-2xl',
        item: 'rounded-xl'
      }
    }
  },
  compoundVariants: [
    {
      variant: 'glass',
      class: {
        item: 'hover:bg-white/60 focus:bg-white/60'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    variant: 'default',
    rounded: 'md'
  }
})
