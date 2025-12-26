<script setup lang="ts">
import { computed } from 'vue'
import theme from '@/themes/skeleton'

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string
  height?: string
  animation?: 'pulse' | 'wave' | 'none'
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  variant: 'text',
  animation: 'pulse'
})

const ui = computed(() =>
  theme({
    variant: props.variant,
    animation: props.animation
  })
)

const style = computed(() => ({
  width: props.width,
  height: props.height
}))
</script>

<template>
  <div
    :class="ui.root({ class: props.ui?.root })"
    :style="style"
    role="status"
    aria-busy="true"
    aria-live="polite"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>
