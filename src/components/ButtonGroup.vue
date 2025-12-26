<template>
  <div :class="buttonGroupTheme.base({ class: ui?.base })">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import theme from '@/themes/button-group'

export interface ButtonGroupProps {
  spacing?: 'none' | 'sm' | 'md' | 'lg'
  align?: 'start' | 'center' | 'end' | 'stretch'
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  spacing: 'md',
  align: 'start'
})

const buttonGroupTheme = computed(() =>
  theme({
    spacing: props.spacing,
    align: props.align
  })
)
</script>
