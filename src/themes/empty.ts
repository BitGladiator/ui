import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'relative flex flex-col items-center justify-center gap-4 rounded-lg p-4 sm:p-6 lg:p-8 min-w-0',
    header: 'flex flex-col items-center gap-2 max-w-sm text-center',
    avatar: 'shrink-0 mb-2',
    title: 'text-foreground text-pretty font-medium',
    description: 'text-balance text-center',
    body: 'flex flex-col items-center gap-4 max-w-sm',
    actions: 'flex flex-wrap justify-center gap-2 shrink-0',
    footer: 'flex flex-col items-center gap-2 max-w-sm'
  },
  variants: {
    size: {
      xs: {
        avatar: 'size-8 text-base',
        title: 'text-sm',
        description: 'text-xs'
      },
      sm: {
        avatar: 'size-9 text-lg',
        title: 'text-sm',
        description: 'text-xs'
      },
      md: {
        avatar: 'size-10 text-xl',
        title: 'text-base',
        description: 'text-sm'
      },
      lg: {
        avatar: 'size-11 text-[22px]',
        title: 'text-base',
        description: 'text-sm'
      },
      xl: {
        avatar: 'size-12 text-2xl',
        title: 'text-lg',
        description: 'text-base'
      }
    },
    variant: {
      solid: {
        root: 'bg-foreground',
        title: 'text-background',
        description: 'text-background/70'
      },
      outline: {
        root: 'bg-background ring-1 ring-border',
        description: 'text-muted-foreground'
      },
      soft: {
        root: 'bg-muted/50',
        description: 'text-muted-foreground'
      },
      subtle: {
        root: 'bg-muted/50 ring-1 ring-border',
        description: 'text-muted-foreground'
      },
      naked: {
        description: 'text-muted-foreground'
      }
    }
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md'
  }
})
