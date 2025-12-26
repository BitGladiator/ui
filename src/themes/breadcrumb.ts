import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: '',
    list: 'flex items-center gap-x-1.5',
    item: 'flex items-center gap-x-1.5',
    link: 'flex items-center gap-x-1.5 group relative focus:outline-none focus-visible:outline-none',
    linkLeadingIcon: 'shrink-0',
    linkLeadingAvatar: 'shrink-0',
    linkLabel: 'text-sm font-medium truncate',
    linkTrailingIcon: 'shrink-0',
    separator: 'flex',
    separatorIcon: 'shrink-0 text-muted-foreground'
  },
  variants: {
    active: {
      true: {
        linkLabel: 'text-foreground'
      },
      false: {
        linkLabel: 'text-muted-foreground group-hover:text-foreground'
      }
    },
    disabled: {
      true: {
        link: 'cursor-not-allowed opacity-50',
        linkLabel: 'text-muted-foreground/50'
      }
    },
    to: {
      true: {
        link: 'cursor-pointer'
      },
      false: {
        link: 'cursor-default'
      }
    }
  },
  defaultVariants: {
    active: false,
    disabled: false,
    to: false
  }
})
