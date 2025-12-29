import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'flex items-center justify-center shrink-0 select-none rounded-full overflow-hidden bg-muted relative',
    image: 'h-full w-full rounded-[inherit] object-cover',
    fallback: 'font-medium leading-none text-muted-foreground truncate',
    icon: 'text-muted-foreground shrink-0'
  },
  variants: {
    size: {
      sm: {
        root: 'w-7 h-7 text-xs',  // Changed from size-7 to explicit w-7 h-7
        icon: 'w-4 h-4'            // Changed from size-4 to explicit w-4 h-4
      },
      md: {
        root: 'w-8 h-8 text-sm',   // Changed from size-8 to explicit w-8 h-8
        icon: 'w-4 h-4'
      },
      lg: {
        root: 'w-9 h-9 text-base', // Changed from size-9 to explicit w-9 h-9
        icon: 'w-5 h-5'
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