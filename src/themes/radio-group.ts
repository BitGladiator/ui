import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'space-y-3',
    label: 'block text-sm font-medium text-foreground mb-2',
    description: 'text-sm text-muted-foreground mb-3',
    items: '',
    error: 'text-sm text-error mt-2'
  },
  variants: {
    orientation: {
      vertical: {
        items: 'flex flex-col gap-3'
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
