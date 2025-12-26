import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'shrink-0',
    wrapper: 'relative flex items-center',
    label: 'shrink-0 bg-background px-3 text-sm font-medium text-muted-foreground'
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'h-px w-full bg-border',
        wrapper: 'w-full'
      },
      vertical: {
        root: 'w-px h-full bg-border',
        wrapper: 'h-full flex-col'
      }
    },
    decorative: {
      true: {
        root: 'border-none'
      },
      false: {}
    },
    withLabel: {
      true: {
        root: 'flex-1'
      }
    }
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      withLabel: true,
      class: {
        wrapper: 'flex w-full items-center',
        root: 'flex-1'
      }
    },
    {
      orientation: 'vertical',
      withLabel: true,
      class: {
        wrapper: 'flex h-full flex-col items-center',
        root: 'flex-1'
      }
    }
  ],
  defaultVariants: {
    orientation: 'horizontal',
    decorative: true,
    withLabel: false
  }
})