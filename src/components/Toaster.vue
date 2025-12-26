<script setup lang="ts">
  import { ref, computed, toRef, provide } from 'vue'
  import {
    ToastProvider,
    ToastViewport,
    useForwardProps,
    type ToastProviderProps
  } from 'reka-ui'
  import { reactivePick } from '@vueuse/core'
  import { useToast, toastMaxInjectionKey } from '@/composables/useToast'
  import Toast from './Toast.vue'
  import toasterTheme from '@/themes/toaster'
  
  export interface ToasterProps
    extends Omit<ToastProviderProps, 'swipeDirection'> {
    position?:
      | 'top-right'
      | 'top-left'
      | 'bottom-right'
      | 'bottom-left'
      | 'top-center'
      | 'bottom-center'
    expand?: boolean
    max?: number
    class?: string
    ui?: Record<string, any>
  }
  
  const props = withDefaults(defineProps<ToasterProps>(), {
    position: 'bottom-right',
    expand: true,
    duration: 5000,
    max: 5
  })
  
  const { toasts, remove } = useToast()
  
  provide(
    toastMaxInjectionKey,
    toRef(() => props.max)
  )
  
  const providerProps = useForwardProps(
    reactivePick(props, 'duration', 'label', 'swipeThreshold')
  )
  
  const swipeDirection = computed(() => {
    switch (props.position) {
      case 'top-center':
        return 'up'
      case 'top-right':
      case 'bottom-right':
        return 'right'
      case 'bottom-center':
        return 'down'
      case 'top-left':
      case 'bottom-left':
        return 'left'
    }
  })
  
  const ui = computed(() =>
    toasterTheme({
      position: props.position,
      swipeDirection: swipeDirection.value
    })
  )
  
  function onUpdateOpen(value: boolean, id: string | number) {
    if (!value) {
      remove(id)
    }
  }
  
  const hovered = ref(false)
  const expanded = computed(() => props.expand || hovered.value)
  
  const refs = ref<{ height: number }[]>([])
  
  const height = computed(() =>
    refs.value.reduce((acc, { height }) => acc + height + 16, 0)
  )
  const frontHeight = computed(
    () => refs.value[refs.value.length - 1]?.height || 0
  )
  
  function getOffset(index: number) {
    return refs.value
      .slice(index + 1)
      .reduce((acc, { height }) => acc + height + 16, 0)
  }
  </script>
  
  <template>
    <Teleport to="body">
      <ToastProvider :swipe-direction="swipeDirection" v-bind="providerProps">
        <slot />
  
        <Toast
          v-for="(toast, index) of toasts"
          :key="toast.id"
          ref="refs"
          v-bind="toast"
          :data-expanded="expanded"
          :data-front="!expanded && index === toasts.length - 1"
          :style="{
            '--index': index - toasts.length + toasts.length,
            '--before': toasts.length - 1 - index,
            '--offset': getOffset(index),
            '--scale': expanded
              ? '1'
              : 'calc(1 - var(--before) * var(--scale-factor))',
            '--translate': expanded
              ? 'calc(var(--offset) * var(--translate-factor))'
              : 'calc(var(--before) * var(--gap))',
            '--transform': 'translateY(var(--translate)) scale(var(--scale))'
          }"
          data-slot="base"
          :class="
            ui.base({
              class: [
                props.ui?.base,
                toast.onClick ? 'cursor-pointer' : undefined
              ]
            })
          "
          @update:open="onUpdateOpen($event, toast.id)"
          @click="toast.onClick && toast.onClick(toast)"
        />
  
        <ToastViewport
          :data-expanded="expanded"
          data-slot="viewport"
          :class="ui.viewport({ class: [props.ui?.viewport, props.class] })"
          :style="{
            '--scale-factor': '0.05',
            '--translate-factor': position?.startsWith('top') ? '1px' : '-1px',
            '--gap': position?.startsWith('top') ? '16px' : '-16px',
            '--front-height': `${frontHeight}px`,
            '--height': `${height}px`
          }"
          @mouseenter="hovered = true"
          @mouseleave="hovered = false"
        />
      </ToastProvider>
    </Teleport>
  </template>