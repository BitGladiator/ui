import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'fixed md:relative inset-y-0 z-50 flex flex-col shrink-0 border-border bg-background transition-all duration-300 ease-in-out',
    header:
      'h-16 shrink-0 flex items-center gap-1.5 px-4 border-b border-border transition-all duration-200',
    body: 'flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-2 transition-all duration-200',
    footer:
      'shrink-0 flex items-center gap-1.5 px-4 py-2 border-t border-border transition-all duration-200',
    toggle: '',
    handle:
      'absolute top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/20 transition-colors',
    content: 'lg:hidden',
    overlay: 'lg:hidden'
  },
  variants: {
    side: {
      left: {
        root: 'border-r left-0',
        handle: '-right-0.5'
      },
      right: {
        root: 'border-l right-0',
        handle: '-left-0.5'
      }
    },
    collapsed: {
      true: {
        header: 'justify-center px-2',
        body: 'px-2',
        footer: 'px-2'
      },
      false: {}
    },
    mobileOpen: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    // Mobile behavior for left sidebar
    {
      side: 'left',
      mobileOpen: false,
      class: {
        root: '-translate-x-full md:translate-x-0'
      }
    },
    {
      side: 'left',
      mobileOpen: true,
      class: {
        root: 'translate-x-0'
      }
    },
    // Mobile behavior for right sidebar
    {
      side: 'right',
      mobileOpen: false,
      class: {
        root: 'translate-x-full md:translate-x-0'
      }
    },
    {
      side: 'right',
      mobileOpen: true,
      class: {
        root: 'translate-x-0'
      }
    },
    // Collapsed width
    {
      collapsed: true,
      class: {
        root: '!w-16' // Added !important to override
      }
    },
    {
      collapsed: false,
      class: {
        root: '!w-64' // Added !important to override
      }
    },
    // Mobile width (full width on mobile)
    {
      mobileOpen: true,
      class: {
        root: '!w-64' // Force width on mobile when open
      }
    }
  ],
  defaultVariants: {
    side: 'left',
    collapsed: false,
    mobileOpen: false
  }
})