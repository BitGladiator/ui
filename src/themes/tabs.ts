import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'w-full',
    list: 'relative flex items-center',
    trigger:
      'inline-flex items-center justify-center whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    content: 'mt-4'
  },
  variants: {
    variant: {
      line: {
        list: 'border-b border-border gap-4',
        trigger:
          'relative pb-3 px-1 font-medium text-muted-foreground hover:text-foreground data-[active=true]:text-foreground data-[active=true]:border-b-2 data-[active=true]:border-primary data-[active=true]:-mb-px'
      },
      pill: {
        list: 'bg-muted p-1 rounded-lg gap-1',
        trigger:
          'rounded-md px-3 py-1.5 font-medium text-muted-foreground hover:text-foreground data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:shadow-sm'
      },
      card: {
        list: 'gap-2',
        trigger:
          'rounded-t-lg border border-b-0 border-border px-4 py-2 font-medium bg-muted text-muted-foreground hover:bg-background hover:text-foreground data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:border-b data-[active=true]:border-b-background'
      }
    },
    size: {
      xs: {
        trigger: 'text-xs h-8',
        content: 'mt-2'
      },
      sm: {
        trigger: 'text-sm h-9',
        content: 'mt-3'
      },
      md: {
        trigger: 'text-sm h-10',
        content: 'mt-4'
      },
      lg: {
        trigger: 'text-base h-11',
        content: 'mt-5'
      }
    },
    orientation: {
      horizontal: {
        list: 'flex-row',
        trigger: 'flex-row'
      },
      vertical: {
        root: 'flex flex-row gap-4',
        list: 'flex-col items-start',
        trigger: 'w-full justify-start'
      }
    }
  },
  compoundVariants: [
    {
      variant: 'line',
      orientation: 'vertical',
      class: {
        list: 'border-b-0 border-r gap-0',
        trigger:
          'pb-0 pr-3 pl-1 border-b-0 data-[active=true]:border-r-2 data-[active=true]:border-b-0 data-[active=true]:-mr-px'
      }
    }
  ],
  defaultVariants: {
    variant: 'line',
    size: 'md',
    orientation: 'horizontal'
  }
})
