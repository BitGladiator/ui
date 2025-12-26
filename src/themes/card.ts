import { tv } from 'tailwind-variants'

/**
 * Card Component Theme
 * Based on Shopify Polaris Card - clean, minimal design with subtle shadows and bevel effect
 * Uses shadow-100 equivalent (subtle shadow) and border-radius-300 (8px/0.5rem)
 */
export default tv({
  slots: {
    root: 'relative rounded-lg overflow-clip bg-card text-card-foreground shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_1px_2px_0_rgba(0,0,0,0.2)] before:content-[""] before:absolute before:inset-0 before:rounded-lg before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] before:pointer-events-none dark:before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]',
    header: 'flex flex-col space-y-1.5 p-6',
    title: 'text-2xl font-semibold leading-none tracking-tight',
    description: 'text-sm text-muted-foreground',
    content: 'p-6 pt-0',
    footer: 'flex items-center p-6 pt-0'
  },
  variants: {
    variant: {
      default: {
        root: 'bg-card border border-border/50 dark:border-border/20'
      },
      outline: {
        root: 'border border-border bg-transparent shadow-none before:shadow-none'
      },
      elevated: {
        root: 'border-0 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_2px_4px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_2px_4px_0_rgba(0,0,0,0.3)]'
      },
      ghost: {
        root: 'border-0 shadow-none bg-transparent before:shadow-none'
      }
    },
    size: {
      sm: {
        header: 'p-3 space-y-1',
        title: 'text-lg font-medium',
        description: 'text-xs',
        content: 'p-3 pt-0',
        footer: 'p-3 pt-0'
      },
      md: {
        header: 'p-4 space-y-1.5',
        title: 'text-2xl font-semibold',
        description: 'text-sm',
        content: 'p-4 pt-0',
        footer: 'p-4 pt-0'
      },
      lg: {
        header: 'p-6 space-y-2',
        title: 'text-3xl font-semibold',
        description: 'text-base',
        content: 'p-6 pt-0',
        footer: 'p-6 pt-0'
      }
    },
    hover: {
      true: {
        root: 'transition-shadow duration-150 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_4px_8px_0_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_4px_8px_0_rgba(0,0,0,0.3)]'
      }
    }
  },
  compoundVariants: [
    {
      variant: 'default',
      hover: true,
      class: {
        root: 'hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_4px_8px_0_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_4px_8px_0_rgba(0,0,0,0.3)]'
      }
    },
    {
      variant: 'elevated',
      hover: true,
      class: {
        root: 'hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_8px_16px_0_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_8px_16px_0_rgba(0,0,0,0.4)]'
      }
    },
    {
      variant: 'outline',
      hover: true,
      class: {
        root: 'hover:bg-accent/5 dark:hover:bg-accent/10'
      }
    },
    {
      variant: 'ghost',
      hover: true,
      class: {
        root: 'hover:bg-accent/5 dark:hover:bg-accent/10'
      }
    }
  ],
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
})
