import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'relative overflow-hidden w-full rounded-lg p-4 flex gap-3',
    wrapper: 'min-w-0 flex-1 flex flex-col',
    title: 'text-sm font-medium',
    description: 'text-sm mt-1',
    icon: 'shrink-0 size-5',
    avatar: 'shrink-0',
    actions: 'flex flex-wrap gap-2 shrink-0',
    closeButton: 'p-0 shrink-0'
  },
  variants: {
    color: {
      info: '',
      success: '',
      warning: '',
      critical: '',
      neutral: ''
    },
    orientation: {
      horizontal: {
        root: 'items-center',
        actions: 'items-center'
      },
      vertical: {
        root: 'items-start',
        actions: 'items-start mt-3'
      }
    }
  },
  compoundVariants: [
    // Polaris Badge colors - info (primary/blue)
    {
      color: 'info',
      class: {
        root: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300',
        icon: 'text-blue-600 dark:text-blue-400',
        description: 'text-blue-600 dark:text-blue-400'
      }
    },
    // Polaris Badge colors - success (green)
    {
      color: 'success',
      class: {
        root: 'bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300',
        icon: 'text-green-600 dark:text-green-400',
        description: 'text-green-700 dark:text-green-400'
      }
    },
    // Polaris Badge colors - warning (yellow/caution)
    {
      color: 'warning',
      class: {
        root: 'bg-yellow-50 dark:bg-yellow-950/30 text-yellow-900 dark:text-yellow-300',
        icon: 'text-yellow-600 dark:text-yellow-400',
        description: 'text-yellow-800 dark:text-yellow-400'
      }
    },
    // Polaris Badge colors - critical (red/error)
    {
      color: 'critical',
      class: {
        root: 'bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300',
        icon: 'text-red-600 dark:text-red-400',
        description: 'text-red-700 dark:text-red-400'
      }
    },
    // Polaris Badge colors - neutral (gray)
    {
      color: 'neutral',
      class: {
        root: 'bg-gray-50 dark:bg-gray-900/50 text-gray-800 dark:text-gray-200',
        icon: 'text-gray-600 dark:text-gray-400',
        description: 'text-gray-700 dark:text-gray-400'
      }
    }
  ],
  defaultVariants: {
    color: 'info',
    orientation: 'vertical'
  }
})
