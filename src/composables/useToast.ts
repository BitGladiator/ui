import { ref, inject, type InjectionKey, type Ref } from 'vue'
import type { ToastProps } from '@/components/Toast.vue'

export interface ToastOptions extends Partial<Omit<ToastProps, 'id'>> {}

export interface Toast extends ToastOptions {
  id: string | number
}

const toasts = ref<Toast[]>([])
let idCounter = 0
const recentToasts = new Map<string, number>()
const DEBOUNCE_TIME = 300 // milliseconds

export const toastMaxInjectionKey: InjectionKey<Ref<number>> =
  Symbol('toast-max')

const getNextId = () => `toast-${++idCounter}`

const isDuplicate = (options: ToastOptions): boolean => {
  const key = JSON.stringify({
    title: options.title,
    description: options.description
  })
  const lastTime = recentToasts.get(key)
  const now = Date.now()

  if (lastTime && now - lastTime < DEBOUNCE_TIME) {
    return true
  }

  recentToasts.set(key, now)

  // Clean up old entries
  setTimeout(() => {
    recentToasts.delete(key)
  }, DEBOUNCE_TIME)

  return false
}

export interface UseToastReturn {
  toasts: Ref<Toast[]>
  add: (options: ToastOptions) => Toast
  remove: (id: string | number) => void
  update: (id: string | number, options: Partial<ToastOptions>) => void
  clear: () => void
  toast: (options: ToastOptions) => Toast
  success: (
    title: string,
    description?: string,
    options?: ToastOptions
  ) => Toast
  error: (title: string, description?: string, options?: ToastOptions) => Toast
  warning: (
    title: string,
    description?: string,
    options?: ToastOptions
  ) => Toast
  info: (title: string, description?: string, options?: ToastOptions) => Toast
}

export const useToast = (): UseToastReturn => {
  const max = inject(toastMaxInjectionKey, ref(5))

  const add = (options: ToastOptions) => {
    // Prevent duplicate toasts from rapid clicks
    if (isDuplicate(options)) {
      // Return the last toast with same content
      return toasts.value[toasts.value.length - 1]
    }

    const id = getNextId()
    const toast: Toast = {
      id,
      duration: 5000,
      close: true,
      ...options
    }

    // Remove oldest toast if we hit the max
    if (toasts.value.length >= max.value) {
      toasts.value.shift()
    }

    toasts.value.push(toast)
    return toast
  }

  const remove = (id: string | number) => {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const update = (id: string | number, options: Partial<ToastOptions>) => {
    const toast = toasts.value.find((t) => t.id === id)
    if (toast) {
      Object.assign(toast, options)
    }
  }

  const clear = () => {
    toasts.value = []
  }

  const toast = (options: ToastOptions) => add(options)

  const success = (
    title: string,
    description?: string,
    options?: ToastOptions
  ) =>
    add({
      color: 'success',
      title,
      description,
      ...options
    })

  const error = (title: string, description?: string, options?: ToastOptions) =>
    add({
      color: 'error',
      title,
      description,
      ...options
    })

  const warning = (
    title: string,
    description?: string,
    options?: ToastOptions
  ) =>
    add({
      color: 'warning',
      title,
      description,
      ...options
    })

  const info = (title: string, description?: string, options?: ToastOptions) =>
    add({
      color: 'info',
      title,
      description,
      ...options
    })

  return {
    toasts,
    add,
    remove,
    update,
    clear,
    toast,
    success,
    error,
    warning,
    info
  }
}
