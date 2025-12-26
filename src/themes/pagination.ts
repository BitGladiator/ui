import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: '',
    list: 'flex items-center gap-1',
    item: '',
    ellipsis: 'flex items-center justify-center',
    label: '',
    first: '',
    prev: '',
    next: '',
    last: ''
  },
  variants: {
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {}
    },
    disabled: {
      true: {
        root: 'opacity-50 cursor-not-allowed pointer-events-none'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    disabled: false
  }
})
