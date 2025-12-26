import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    base: 'pointer-events-auto absolute inset-x-0 z-[var(--index)] [transform:var(--transform)] transition-all duration-300 ease-[cubic-bezier(0.21,1.02,0.73,1)] data-[swipe=move]:transition-none data-[state=closed]:animate-out data-[state=closed]:fade-out-80',
    viewport:
      'fixed z-[100] flex max-h-screen w-[calc(100%-2rem)] sm:w-96 flex-col gap-2.5 outline-none transition-all duration-200 pointer-events-none'
  },
  variants: {
    position: {
      'top-right': {
        viewport: 'top-0 right-0 p-4 sm:right-4 sm:top-4',
        base: 'data-[state=open]:animate-in data-[state=open]:slide-in-from-top-full data-[state=open]:slide-in-from-right-1/2 data-[state=closed]:slide-out-to-right-full data-[swipe=end]:translate-x-[var(--reka-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)]'
      },
      'top-left': {
        viewport: 'top-0 left-0 p-4 sm:left-4 sm:top-4',
        base: 'data-[state=open]:animate-in data-[state=open]:slide-in-from-top-full data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-left-full data-[swipe=end]:translate-x-[var(--reka-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)]'
      },
      'bottom-right': {
        viewport:
          'bottom-0 right-0 p-4 sm:right-4 sm:bottom-4 flex-col-reverse',
        base: 'data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full data-[state=open]:slide-in-from-right-1/2 data-[state=closed]:slide-out-to-right-full data-[swipe=end]:translate-x-[var(--reka-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)]'
      },
      'bottom-left': {
        viewport: 'bottom-0 left-0 p-4 sm:left-4 sm:bottom-4 flex-col-reverse',
        base: 'data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-left-full data-[swipe=end]:translate-x-[var(--reka-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)]'
      },
      'top-center': {
        viewport:
          'top-0 left-1/2 -translate-x-1/2 p-4 sm:top-4 w-full max-w-md',
        base: 'data-[state=open]:animate-in data-[state=open]:slide-in-from-top-full data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-full data-[swipe=end]:translate-y-[var(--reka-toast-swipe-end-y)] data-[swipe=move]:translate-y-[var(--reka-toast-swipe-move-y)]'
      },
      'bottom-center': {
        viewport:
          'bottom-0 left-1/2 -translate-x-1/2 p-4 sm:bottom-4 w-full max-w-md flex-col-reverse',
        base: 'data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-full data-[swipe=end]:translate-y-[var(--reka-toast-swipe-end-y)] data-[swipe=move]:translate-y-[var(--reka-toast-swipe-move-y)]'
      }
    },
    swipeDirection: {
      up: {
        base: 'data-[swipe=cancel]:translate-y-0'
      },
      down: {
        base: 'data-[swipe=cancel]:translate-y-0'
      },
      left: {
        base: 'data-[swipe=cancel]:translate-x-0'
      },
      right: {
        base: 'data-[swipe=cancel]:translate-x-0'
      }
    }
  },
  compoundVariants: [
    {
      position: ['top-right', 'bottom-right'],
      class: {
        base: 'data-[expanded=false]:translate-x-[calc(-100%+var(--front-height)+8px)] data-[front=true]:translate-x-0 data-[front=false]:opacity-100'
      }
    },
    {
      position: ['top-left', 'bottom-left'],
      class: {
        base: 'data-[expanded=false]:translate-x-[calc(100%-var(--front-height)-8px)] data-[front=true]:translate-x-0 data-[front=false]:opacity-100'
      }
    },
    {
      position: ['top-center', 'bottom-center'],
      class: {
        base: 'data-[expanded=false]:scale-[0.85]'
      }
    }
  ],
  defaultVariants: {
    position: 'bottom-right',
    swipeDirection: 'right'
  }
})
