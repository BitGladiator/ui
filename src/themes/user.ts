import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'relative group/user',
    wrapper: '',
    name: 'font-medium text-foreground',
    description: 'text-muted-foreground',
    avatar: 'shrink-0'
  },
  variants: {
    size: {
      '3xs': {
        root: 'gap-1',
        wrapper: 'gap-0.5',
        name: 'text-xs',
        description: 'text-xs'
      },
      '2xs': {
        root: 'gap-1.5',
        wrapper: 'gap-0.5',
        name: 'text-xs',
        description: 'text-xs'
      },
      xs: {
        root: 'gap-2',
        wrapper: 'gap-1',
        name: 'text-sm',
        description: 'text-sm'
      },
      sm: {
        root: 'gap-2.5',
        wrapper: 'gap-1',
        name: 'text-sm',
        description: 'text-sm'
      },
      md: {
        root: 'gap-3',
        wrapper: 'gap-1',
        name: 'text-base',
        description: 'text-base'
      },
      lg: {
        root: 'gap-3',
        wrapper: 'gap-1.5',
        name: 'text-lg',
        description: 'text-base'
      }
    },
    orientation: {
      horizontal: {
        root: 'flex items-center',
        wrapper: 'flex flex-col'
      },
      vertical: {
        root: 'flex flex-col',
        wrapper: 'flex flex-col text-center'
      }
    },
    to: {
      true: {
        root: 'cursor-pointer',
        name: 'transition-colors hover:text-foreground/80',
        description:
          'transition-colors group-hover/user:text-muted-foreground/80',
        avatar: 'transition-transform group-hover/user:scale-105'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    orientation: 'horizontal',
    to: false
  }
})
