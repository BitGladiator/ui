import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'flex h-full w-full flex-col overflow-hidden rounded-lg bg-popover text-popover-foreground',
    anchor: 'flex items-center border-b px-3',
    searchIcon: 'mr-2 size-4 shrink-0 opacity-50',
    input: 'flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
    content: 'max-h-[400px] overflow-hidden',
    viewport: 'overflow-y-auto overflow-x-hidden',
    empty: 'py-6 text-center text-sm text-muted-foreground',
    groupLabel: 'px-2 py-1.5 text-xs font-semibold text-muted-foreground',
    item: 'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-2.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
    itemIcon: 'size-4 shrink-0',
    itemLabel: 'flex-1',
    itemShortcut: 'ml-auto text-xs tracking-widest text-muted-foreground',
    separator: 'mx-2 my-1 h-px bg-border'
  },
  defaultVariants: {}
})
