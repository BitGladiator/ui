import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    base: 'inline-flex'
  },
  variants: {
    spacing: {
      none: {
        base: 'gap-0'
      },
      sm: {
        base: 'gap-1'
      },
      md: {
        base: 'gap-2'
      },
      lg: {
        base: 'gap-3'
      }
    },
    align: {
      start: {
        base: 'items-start'
      },
      center: {
        base: 'items-center'
      },
      end: {
        base: 'items-end'
      },
      stretch: {
        base: 'items-stretch'
      }
    }
  },
  defaultVariants: {
    spacing: 'md',
    align: 'center'
  }
})
