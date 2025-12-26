import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'w-full',
    item: 'border-b border-border last:border-b-0',
    header: '',
    trigger:
      'flex w-full items-center justify-between py-4 text-left font-medium transition-all text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&[data-state=open]>svg]:rotate-180',
    icon: 'size-4 shrink-0 transition-transform duration-200 text-foreground',
    content:
      'overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
    contentInner: 'pb-4 pt-0'
  },
  variants: {
    variant: {
      default: {
        root: 'space-y-0',
        item: 'border-border'
      },
      separated: {
        root: 'space-y-2',
        item: 'rounded-lg border border-border bg-card px-4'
      },
      ghost: {
        root: 'space-y-1',
        item: 'border-transparent'
      }
    },
    size: {
      sm: {
        trigger: 'py-3 text-sm',
        contentInner: 'pb-3'
      },
      md: {
        trigger: 'py-4 text-base',
        contentInner: 'pb-4'
      },
      lg: {
        trigger: 'py-5 text-lg',
        contentInner: 'pb-5'
      }
    }
  },
  compoundVariants: [
    {
      variant: 'separated',
      class: {
        trigger: 'hover:no-underline hover:bg-accent/50 rounded-lg'
      }
    }
  ],
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
})
