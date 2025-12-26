<script setup lang="ts">
import { computed } from 'vue'
import theme from '@/themes/card'

export interface CardProps {
  title?: string
  description?: string
  variant?: 'default' | 'outline' | 'elevated' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  hover?: boolean
  clickable?: boolean
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  size: 'md',
  hover: false,
  clickable: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const cardTheme = computed(() =>
  theme({
    variant: props.variant,
    size: props.size,
    hover: props.hover
  })
)

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<template>
  <div :class="cardTheme.root({ class: ui?.root })" @click="handleClick">
    <div
      v-if="title || description || $slots.header"
      :class="cardTheme.header({ class: ui?.header })"
    >
      <slot name="header">
        <div v-if="title" :class="cardTheme.title({ class: ui?.title })">
          {{ title }}
        </div>
        <div
          v-if="description"
          :class="cardTheme.description({ class: ui?.description })"
        >
          {{ description }}
        </div>
      </slot>
    </div>

    <div :class="cardTheme.content({ class: ui?.content })">
      <slot />
    </div>

    <div v-if="$slots.footer" :class="cardTheme.footer({ class: ui?.footer })">
      <slot name="footer" />
    </div>
  </div>
</template>
