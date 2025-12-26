<script setup lang="ts">
import { computed } from 'vue'
import chipTheme from '@/themes/chip'

export interface ChipProps {
  as?: string | object
  text?: string | number
  color?: string
  size?: string
  position?: string
  inset?: boolean
  standalone?: boolean
  show?: boolean
  class?: string | object | any[]
  ui?: {
    root?: string
    base?: string
  }
}

const props = withDefaults(defineProps<ChipProps>(), {
  as: 'div',
  color: 'primary',
  size: 'md',
  position: 'top-right',
  inset: false,
  standalone: false,
  show: true
})

const emit = defineEmits(['update:show'])

const slots = defineSlots()

const ui = computed(() =>
  chipTheme({
    color: props.color,
    size: props.size,
    position: props.position,
    inset: props.inset,
    standalone: props.standalone
  })
)
</script>

<template>
  <component
    :is="props.as"
    v-if="show"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
  >
    <slot>
      <!-- Default slot wraps content -->
    </slot>

    <slot name="content">
      <span
        v-if="text !== undefined"
        data-slot="base"
        :class="ui.base({ class: props.ui?.base })"
      >
        {{ text }}
      </span>
    </slot>
  </component>
</template>
