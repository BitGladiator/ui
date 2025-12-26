<script setup lang="ts">
import { computed } from 'vue'
import { Separator as SeparatorPrimitive } from 'reka-ui'
import theme from '@/themes/separator'

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg'
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
  decorative: true,
  size: 'md'
})

const separatorTheme = computed(() =>
  theme({
    orientation: props.orientation,
    size: props.size,
    hasLabel: !!props.label
  })
)

const withLabelClasses = computed(() => separatorTheme.value.wrapper?.() || '')
const rootClasses = computed(() => separatorTheme.value.root?.() || '')
const labelClasses = computed(() => separatorTheme.value.label?.() || '')
</script>

<template>
  <div v-if="label" :class="withLabelClasses">
    <SeparatorPrimitive
      :orientation="orientation"
      :decorative="decorative"
      :class="rootClasses"
    />
    <span :class="labelClasses">{{ label }}</span>
    <SeparatorPrimitive
      :orientation="orientation"
      :decorative="decorative"
      :class="rootClasses"
    />
  </div>

  <SeparatorPrimitive
    v-else
    :orientation="orientation"
    :decorative="decorative"
    :class="rootClasses"
  />
</template>
