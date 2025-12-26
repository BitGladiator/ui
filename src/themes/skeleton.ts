import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'bg-muted-foreground/20'
  },
  variants: {
    variant: {
      text: {
        root: 'h-4 rounded'
      },
      circular: {
        root: 'rounded-full'
      },
      rectangular: {
        root: 'rounded-none'
      },
      rounded: {
        root: 'rounded-lg'
      }
    },
    animation: {
      pulse: {
        root: 'animate-pulse'
      },
      wave: {
        root: 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-background/20 before:to-transparent'
      },
      none: {}
    }
  },
  defaultVariants: {
    variant: 'text',
    animation: 'pulse'
  }
})
