import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'flex flex-col gap-1',
    group: 'flex flex-col',
    link: 'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    linkIcon: 'w-5 h-5 shrink-0',
    linkLabel: 'flex-1 truncate',
    linkBadge: 'ml-auto shrink-0',
    linkChevron: 'w-4 h-4 shrink-0 transition-transform duration-200 ml-auto',
    submenu:
      'flex flex-col gap-1 mt-1 ml-4 pl-4 border-l border-border overflow-hidden max-h-screen',
    submenuLink:
      'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    submenuLinkIcon: 'w-4 h-4 shrink-0',
    submenuLinkLabel: 'flex-1 truncate',
    submenuLinkBadge: 'ml-auto shrink-0'
  },
  variants: {
    collapsed: {
      true: {
        link: 'justify-center px-2',
        linkIcon: 'w-5 h-5'
      },
      false: {}
    },
    active: {
      true: {
        link: 'bg-accent text-accent-foreground',
        submenuLink: 'bg-accent text-accent-foreground font-medium'
      },
      false: {
        link: 'text-muted-foreground hover:text-foreground',
        submenuLink: 'text-muted-foreground hover:text-foreground'
      }
    },
    disabled: {
      true: {
        link: 'opacity-50 cursor-not-allowed',
        submenuLink: 'opacity-50 cursor-not-allowed'
      }
    },
    hasChildren: {
      true: {
        link: 'cursor-pointer'
      }
    }
  },
  defaultVariants: {
    collapsed: false,
    active: false,
    disabled: false,
    hasChildren: false
  }
})
