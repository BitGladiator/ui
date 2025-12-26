<script setup lang="ts">
import { computed } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from 'reka-ui'
import theme from '@/themes/sheet'
import Icon from './Icon.vue'

export interface SheetProps {
  open?: boolean
  side?: 'top' | 'bottom' | 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
  title?: string
  description?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<SheetProps>(), {
  open: false,
  side: 'right',
  size: 'md'
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const slots = defineSlots<{
  default?: () => any
  trigger?: () => any
  header?: () => any
  footer?: () => any
}>()

const ui = computed(() =>
  theme({
    side: props.side,
    size: props.size
  })
)

const handleOpenChange = (value: boolean) => {
  emit('update:open', value)
}
</script>

<template>
  <DialogRoot :open="open" @update:open="handleOpenChange">
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]"
      />

      <DialogContent :class="ui.root({ class: props.ui?.root })">
        <!-- Close Button -->
        <DialogClose
          :class="ui.close({ class: props.ui?.close })"
          tabindex="-1"
        >
          <Icon name="solar:close-circle-linear" class="size-4" />
          <span class="sr-only">Close</span>
        </DialogClose>

        <!-- Header -->
        <div
          v-if="title || description || slots.header"
          :class="ui.header({ class: props.ui?.header })"
        >
          <slot name="header">
            <DialogTitle
              v-if="title"
              :class="ui.title({ class: props.ui?.title })"
            >
              {{ title }}
            </DialogTitle>
            <DialogDescription
              v-if="description"
              :class="ui.description({ class: props.ui?.description })"
            >
              {{ description }}
            </DialogDescription>
          </slot>
        </div>

        <!-- Content -->
        <div :class="ui.content({ class: props.ui?.content })">
          <slot />
        </div>

        <!-- Footer -->
        <div
          v-if="slots.footer"
          :class="ui.footer({ class: props.ui?.footer })"
        >
          <slot name="footer" />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
