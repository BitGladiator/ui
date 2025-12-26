import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'relative w-full overflow-x-auto bg-card dark:bg-card rounded-lg sm:rounded-xl',
    base: 'w-full caption-bottom text-sm border-spacing-0',
    caption: 'mt-4 text-sm text-muted-foreground dark:text-muted-foreground',
    thead:
      'bg-background dark:bg-background border-b border-border/50 dark:border-border/20',
    tbody: 'bg-card dark:bg-card',
    tfoot:
      'border-t border-border/50 dark:border-border/20 bg-muted/30 dark:bg-muted/20 font-medium',
    tr: 'transition-colors border-t border-border/50 dark:border-border/20 first:border-t-0',
    th: 'px-6 py-3 text-left align-middle font-normal text-foreground dark:text-foreground whitespace-nowrap first:pl-6 last:pr-6',
    td: 'px-6 py-2 align-middle text-foreground dark:text-foreground whitespace-nowrap first:pl-6 last:pr-6',
    separator: 'border-b border-border/50 dark:border-border/20',
    empty: 'text-center py-12 text-muted-foreground dark:text-muted-foreground',
    loading:
      'text-center py-12 text-muted-foreground dark:text-muted-foreground'
  },
  variants: {
    striped: {
      true: {
        tbody:
          '[&>tr:nth-child(even)]:bg-muted/20 dark:[&>tr:nth-child(even)]:bg-muted/10'
      }
    },
    hoverable: {
      true: {
        tr: 'cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30 transition-colors duration-200'
      }
    },
    bordered: {
      true: {
        root: 'border border-border/50 dark:border-border/20',
        th: 'border-r border-border/50 dark:border-border/20 last:border-r-0',
        td: 'border-r border-border/50 dark:border-border/20 last:border-r-0'
      }
    },
    compact: {
      true: {
        th: 'px-4 py-2',
        td: 'px-4 py-1.5'
      }
    },
    sticky: {
      true: {
        thead: 'sticky top-0 bg-background dark:bg-background z-10 shadow-sm',
        tfoot: 'sticky bottom-0 bg-muted/30 dark:bg-muted/20 z-10 shadow-sm'
      }
    }
  },
  defaultVariants: {
    striped: false,
    hoverable: true,
    bordered: false,
    compact: false,
    sticky: false
  }
})
