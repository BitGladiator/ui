import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    base: 'relative group rounded-md inline-flex items-center justify-between w-full transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
    value: 'truncate pointer-events-none text-foreground',
    placeholder: 'truncate text-muted-foreground',
    leading: 'shrink-0 flex items-center',
    leadingIcon: 'shrink-0',
    trailing: 'ms-auto inline-flex items-center shrink-0',
    trailingIcon:
      'shrink-0 transition-transform group-data-[state=open]:rotate-180',
    content:
      'z-50 max-h-60 w-[var(--reka-select-trigger-width)] bg-popover shadow-lg rounded-md border border-border overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-[var(--reka-select-content-transform-origin)] pointer-events-auto flex flex-col',
    viewport:
      'relative divide-y divide-border scroll-py-1 overflow-y-auto flex-1',
    group: 'p-1 isolate',
    label: 'font-semibold text-foreground',
    separator: '-mx-1 my-1 h-px bg-border',
    item: 'group/item relative w-full flex items-start gap-2 select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 text-foreground data-[highlighted]:text-accent-foreground data-[highlighted]:before:bg-accent transition-colors before:transition-colors cursor-default',
    itemLeadingIcon:
      'shrink-0 text-muted-foreground group-data-[highlighted]/item:text-foreground transition-colors',
    itemWrapper: 'flex-1 flex flex-col min-w-0',
    itemLabel: 'truncate',
    itemDescription: 'truncate text-muted-foreground text-xs',
    itemTrailing: 'ms-auto inline-flex items-center shrink-0',
    itemTrailingIcon: 'shrink-0'
  },
  variants: {
    size: {
      sm: {
        base: 'h-8 px-2.5 py-1.5 text-xs gap-1.5',
        leadingIcon: 'size-4',
        trailingIcon: 'size-4',
        label: 'p-1.5 text-[10px]/3 gap-1.5',
        item: 'p-1.5 text-xs gap-1.5',
        itemLeadingIcon: 'size-4',
        itemTrailingIcon: 'size-4'
      },
      md: {
        base: 'h-9 px-3 py-2 text-sm gap-2',
        leadingIcon: 'size-5',
        trailingIcon: 'size-5',
        label: 'p-1.5 text-xs gap-1.5',
        item: 'p-1.5 text-sm gap-1.5',
        itemLeadingIcon: 'size-5',
        itemTrailingIcon: 'size-5'
      },
      lg: {
        base: 'h-12 px-4 py-2.5 text-sm gap-2',
        leadingIcon: 'size-5',
        trailingIcon: 'size-5',
        label: 'p-2 text-xs gap-2',
        item: 'p-2 text-sm gap-2',
        itemLeadingIcon: 'size-5',
        itemTrailingIcon: 'size-5'
      }
    },
    variant: {
      outline: {
        base: 'border border-border bg-background shadow-xs hover:bg-muted/50 focus:ring-2 focus:ring-ring'
      },
      filled: {
        base: 'border-0 bg-muted hover:bg-muted/80 focus:ring-2 focus:ring-ring'
      },
      ghost: {
        base: 'border-0 bg-transparent hover:bg-muted/50 focus:ring-2 focus:ring-ring'
      },
      soft: {
        base: 'border-0 bg-primary/10 text-primary hover:bg-primary/20 focus:ring-2 focus:ring-primary/50'
      },
      none: {
        base: 'border-0 bg-transparent p-0 focus:ring-0'
      }
    },
    color: {
      primary: {
        base: 'focus:ring-primary focus:border-primary'
      },
      error: {
        base: 'border-destructive/50 text-destructive focus:ring-destructive focus:border-destructive'
      },
      success: {
        base: 'border-green-500/50 text-green-600 focus:ring-green-500 focus:border-green-500'
      },
      warning: {
        base: 'border-yellow-500/50 text-yellow-600 focus:ring-yellow-500 focus:border-yellow-500'
      },
      info: {
        base: 'border-blue-500/50 text-blue-600 focus:ring-blue-500 focus:border-blue-500'
      }
    },
    disabled: {
      true: {
        base: 'cursor-not-allowed opacity-50'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
    color: 'primary',
    disabled: false
  }
})
