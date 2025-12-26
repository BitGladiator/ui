import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'inline-block',
    header: 'flex items-center justify-between gap-0.5 mb-4',
    body: 'w-full',
    heading: 'text-sm font-medium text-foreground dark:text-foreground',
    grid: 'w-full border-collapse select-none',
    gridRow: 'grid grid-cols-7',
    gridWeekDaysRow: 'grid grid-cols-7 mb-1',
    gridBody: 'grid',
    headCell:
      'w-9 h-9 flex items-center justify-center text-xs font-medium text-muted-foreground dark:text-muted-foreground uppercase',
    cell: 'p-0',
    cellTrigger:
      'w-9 h-9 flex items-center justify-center rounded-md text-sm font-normal text-foreground dark:text-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-[outside-view]:text-muted-foreground dark:data-[outside-view]:text-muted-foreground data-[outside-view]:opacity-50 data-unavailable:line-through data-unavailable:text-muted-foreground data-unavailable:opacity-50 transition-colors'
  },
  variants: {
    color: {
      primary: '',
      success: '',
      warning: '',
      error: '',
      info: '',
      neutral: ''
    },
    variant: {
      solid: '',
      outline: '',
      soft: '',
      subtle: ''
    },
    size: {
      sm: {
        root: 'text-xs',
        heading: 'text-xs',
        headCell: 'w-8 h-8 text-[10px]',
        cellTrigger: 'w-8 h-8 text-xs'
      },
      md: {
        root: 'text-sm',
        heading: 'text-sm',
        headCell: 'w-9 h-9 text-xs',
        cellTrigger: 'w-9 h-9 text-sm'
      },
      lg: {
        root: 'text-base',
        heading: 'text-base',
        headCell: 'w-10 h-10 text-sm',
        cellTrigger: 'w-10 h-10 text-base'
      }
    }
  },
  compoundVariants: [
    // Solid variant
    {
      color: 'primary',
      variant: 'solid',
      class: {
        cellTrigger:
          'data-[selected]:bg-primary data-[selected]:text-primary-foreground dark:data-[selected]:bg-primary dark:data-[selected]:text-primary-foreground data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground dark:data-[selected]:hover:bg-primary dark:data-[selected]:hover:text-primary-foreground data-today:bg-accent data-today:text-accent-foreground dark:data-today:bg-accent dark:data-today:text-accent-foreground data-today:font-semibold'
      }
    },
    {
      color: 'success',
      variant: 'solid',
      class: {
        cellTrigger:
          'data-[selected]:bg-green-600 data-[selected]:text-white dark:data-[selected]:bg-green-500 dark:data-[selected]:text-white data-[selected]:hover:bg-green-700 dark:data-[selected]:hover:bg-green-600 data-today:bg-accent data-today:text-accent-foreground data-today:font-semibold'
      }
    },
    {
      color: 'warning',
      variant: 'solid',
      class: {
        cellTrigger:
          'data-[selected]:bg-yellow-600 data-[selected]:text-white dark:data-[selected]:bg-yellow-500 dark:data-[selected]:text-white data-[selected]:hover:bg-yellow-700 dark:data-[selected]:hover:bg-yellow-600 data-today:bg-accent data-today:text-accent-foreground data-today:font-semibold'
      }
    },
    {
      color: 'error',
      variant: 'solid',
      class: {
        cellTrigger:
          'data-[selected]:bg-destructive data-[selected]:text-destructive-foreground dark:data-[selected]:bg-destructive dark:data-[selected]:text-destructive-foreground data-[selected]:hover:bg-destructive/90 dark:data-[selected]:hover:bg-destructive/90 data-today:bg-accent data-today:text-accent-foreground data-today:font-semibold'
      }
    },
    {
      color: 'info',
      variant: 'solid',
      class: {
        cellTrigger:
          'data-[selected]:bg-blue-600 data-[selected]:text-white dark:data-[selected]:bg-blue-500 dark:data-[selected]:text-white data-[selected]:hover:bg-blue-700 dark:data-[selected]:hover:bg-blue-600 data-today:bg-accent data-today:text-accent-foreground data-today:font-semibold'
      }
    },
    {
      color: 'neutral',
      variant: 'solid',
      class: {
        cellTrigger:
          'data-[selected]:bg-accent data-[selected]:text-accent-foreground dark:data-[selected]:bg-accent dark:data-[selected]:text-accent-foreground data-[selected]:hover:bg-accent/80 dark:data-[selected]:hover:bg-accent/80 data-today:bg-accent data-today:text-accent-foreground data-today:font-semibold'
      }
    },
    // Outline, Soft, and Subtle variants - simplified for all colors
    {
      variant: 'outline',
      class: {
        cellTrigger:
          'data-[selected]:ring-2 data-[selected]:ring-primary data-[selected]:bg-background dark:data-[selected]:bg-background data-today:bg-accent data-today:text-accent-foreground data-today:font-semibold'
      }
    },
    {
      variant: 'soft',
      class: {
        cellTrigger:
          'data-[selected]:bg-primary/10 dark:data-[selected]:bg-primary/20 data-[selected]:text-primary dark:data-[selected]:text-primary data-today:bg-accent data-today:text-accent-foreground data-today:font-semibold'
      }
    },
    {
      variant: 'subtle',
      class: {
        cellTrigger:
          'data-[selected]:bg-accent data-[selected]:text-accent-foreground dark:data-[selected]:bg-accent dark:data-[selected]:text-accent-foreground data-today:underline data-today:font-semibold'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
    variant: 'solid'
  }
})
