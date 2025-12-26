import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'inline-flex items-center gap-1.5 font-medium transition-colors',
    icon: 'flex items-center justify-center shrink-0',
    text: 'inline-block'
  },
  variants: {
    size: {
      sm: {
        root: 'px-2 py-1 text-xs rounded-md',
        icon: 'w-3 h-3'
      },
      md: {
        root: 'px-2.5 py-2 text-sm rounded-md',
        icon: 'w-4 h-4'
      },
      lg: {
        root: 'px-3 py-2 text-base rounded-md',
        icon: 'w-5 h-5'
      }
    },
    variant: {
      soft: {},
      strong: {}
    },
    color: {
      primary: {},
      success: {},
      warning: {},
      error: {},
      info: {},
      neutral: {}
    }
  },
  compoundVariants: [
    // Soft variants - light background with colored text
    {
      variant: 'soft',
      color: 'primary',
      class: {
        root: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      }
    },
    {
      variant: 'soft',
      color: 'success',
      class: {
        root: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      }
    },
    {
      variant: 'soft',
      color: 'warning',
      class: {
        root: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
      }
    },
    {
      variant: 'soft',
      color: 'error',
      class: {
        root: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }
    },
    {
      variant: 'soft',
      color: 'info',
      class: {
        root: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
      }
    },
    {
      variant: 'soft',
      color: 'neutral',
      class: {
        root: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
      }
    },
    // Strong variants - colored background with white text
    {
      variant: 'strong',
      color: 'primary',
      class: {
        root: 'bg-blue-600 text-white dark:bg-blue-700'
      }
    },
    {
      variant: 'strong',
      color: 'success',
      class: {
        root: 'bg-green-600 text-white dark:bg-green-700'
      }
    },
    {
      variant: 'strong',
      color: 'warning',
      class: {
        root: 'bg-amber-600 text-white dark:bg-amber-700'
      }
    },
    {
      variant: 'strong',
      color: 'error',
      class: {
        root: 'bg-red-600 text-white dark:bg-red-700'
      }
    },
    {
      variant: 'strong',
      color: 'info',
      class: {
        root: 'bg-cyan-600 text-white dark:bg-cyan-700'
      }
    },
    {
      variant: 'strong',
      color: 'neutral',
      class: {
        root: 'bg-gray-600 text-white dark:bg-gray-700'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    variant: 'soft',
    color: 'primary'
  }
})
