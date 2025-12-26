import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'w-full space-y-4',
    // Toolbar
    toolbar:
      'flex items-center justify-between gap-4 p-4 border-b border-border/50 dark:border-border/20',
    search: 'flex-1 max-w-sm',
    filters: 'flex items-center gap-2',
    actions: 'flex items-center gap-2',
    // Table - Polaris inspired
    wrapper:
      'relative w-full overflow-x-auto bg-card dark:bg-card rounded-lg sm:rounded-xl overflow-hidden',
    table: 'w-full caption-bottom text-sm border-spacing-0',
    caption: 'mt-4 text-sm text-muted-foreground dark:text-muted-foreground',
    thead:
      'bg-background dark:bg-background border-b border-border/50 dark:border-border/20',
    tbody: 'bg-card dark:bg-card',
    tfoot:
      'border-t border-border/50 dark:border-border/20 bg-muted/30 dark:bg-muted/20 font-medium',
    tr: 'transition-colors border-t border-border/50 dark:border-border/20 first:border-t-0',
    th: 'px-6 py-3 text-left align-middle font-normal text-foreground dark:text-foreground whitespace-nowrap first:pl-6 last:pr-6 [&:has([role=checkbox])]:pr-0',
    thContent: 'flex items-center gap-2',
    sortButton:
      'inline-flex items-center justify-center gap-1 text-foreground dark:text-foreground hover:text-foreground dark:hover:text-foreground transition-colors',
    sortIcon: 'size-4 text-muted-foreground dark:text-muted-foreground',
    td: 'px-6 py-2 align-middle text-foreground dark:text-foreground whitespace-nowrap first:pl-6 last:pr-6 [&:has([role=checkbox])]:pr-0',
    // Pagination
    footer:
      'flex items-center justify-between gap-4 p-4 border-t border-border/50 dark:border-border/20',
    footerText: 'text-sm text-muted-foreground dark:text-muted-foreground',
    footerActions: 'flex items-center gap-2',
    // Empty state
    empty: 'text-center py-12 text-muted-foreground dark:text-muted-foreground',
    emptyIcon:
      'mx-auto size-12 text-muted-foreground dark:text-muted-foreground mb-4',
    emptyTitle: 'text-lg font-medium text-foreground dark:text-foreground mb-2',
    emptyDescription:
      'text-sm text-muted-foreground dark:text-muted-foreground',
    // Loading state
    loading:
      'absolute inset-0 flex items-center justify-center bg-card/80 dark:bg-card/80 backdrop-blur-sm',
    loadingSpinner: 'size-8 animate-spin text-primary dark:text-primary'
  },
  variants: {
    striped: {
      true: {
        tbody:
          '[&>tr:nth-child(even)]:bg-muted/20 dark:[&>tr:nth-child(even)]:bg-muted/10'
      }
    },
    bordered: {
      true: {
        wrapper: 'border border-border/50 dark:border-border/20',
        th: 'border-r border-border/50 dark:border-border/20 last:border-r-0',
        td: 'border-r border-border/50 dark:border-border/20 last:border-r-0'
      }
    },
    compact: {
      true: {
        th: 'px-4 py-2 text-xs',
        td: 'px-4 py-1.5 text-sm'
      }
    },
    hoverable: {
      true: {
        tr: 'cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30 transition-colors duration-200'
      }
    },
    sticky: {
      true: {
        thead: 'sticky top-0 z-10 bg-background dark:bg-background shadow-sm',
        tfoot: 'sticky bottom-0 z-10 bg-muted/30 dark:bg-muted/20 shadow-sm'
      }
    },
    loading: {
      true: {
        root: 'relative min-h-[400px]'
      }
    }
  },
  defaultVariants: {
    striped: false,
    bordered: false,
    compact: false,
    hoverable: true,
    sticky: false,
    loading: false
  }
})
