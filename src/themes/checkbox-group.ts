import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'space-y-3',
    label: 'block text-sm font-medium text-foreground mb-2',
    description: 'text-sm text-muted-foreground mb-3',
    items: 'space-y-2',
    error: 'text-sm text-error mt-2'
  },
  variants: {
    orientation: {
      vertical: {
        items: 'flex flex-col space-y-2'
      },
      horizontal: {
        items: 'flex flex-row flex-wrap gap-4'
      }
    }
  },
  defaultVariants: {
    orientation: 'vertical'
  }
})
