import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'inline-flex items-center justify-center shrink-0 select-none rounded-full overflow-hidden bg-muted',
    image: 'h-full w-full rounded-[inherit] object-cover',
    fallback: 'font-medium leading-none text-muted-foreground truncate',
    icon: 'text-muted-foreground shrink-0'
  },
  variants: {
    size: {
      sm: {
        root: 'size-7 text-sm',
        icon: 'size-4'
      },
      md: {
        root: 'size-8 text-base',
        icon: 'size-4'
      },
      lg: {
        root: 'size-9 text-lg',
        icon: 'size-5'
      }
    },
    chipPosition: {
      'top-right': {},
      'top-left': {},
      'bottom-right': {},
      'bottom-left': {}
    }
  },
  defaultVariants: {
    size: 'md'
  }
})
