<script setup lang="ts">
import { computed } from 'vue'
import { RadioGroupItem, RadioGroupIndicator } from 'reka-ui'
import theme from '@/themes/radio'

export interface RadioProps {
  value: string
  label?: string
  description?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  ui?: {
    root?: string
    indicator?: string
    label?: string
    description?: string
  }
}

const props = withDefaults(defineProps<RadioProps>(), {
  disabled: false,
  size: 'md',
  color: 'primary'
})

const radioThemeObj = computed(() =>
  theme({
    size: props.size,
    color: props.color,
    disabled: props.disabled
  })
)

const itemWrapperClasses = 'flex items-start gap-3'

const rootClasses = computed(
  () => radioThemeObj.value.root?.({ class: props.ui?.root }) || ''
)

const indicatorClasses = computed(
  () => radioThemeObj.value.indicator?.({ class: props.ui?.indicator }) || ''
)

const labelClasses = computed(() => {
  const base = 'text-foreground font-medium cursor-pointer select-none'
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  return `${base} ${sizes[props.size]}`
})

const descriptionClasses = computed(() => {
  const base = 'text-muted-foreground'
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }
  return `${base} ${sizes[props.size]}`
})
</script>

<template>
  <div :class="itemWrapperClasses">
    <RadioGroupItem :value="value" :disabled="disabled" :class="rootClasses">
      <RadioGroupIndicator :class="indicatorClasses" />
    </RadioGroupItem>

    <div v-if="label || description" class="flex flex-col">
      <label v-if="label" :class="labelClasses">
        {{ label }}
      </label>
      <span v-if="description" :class="descriptionClasses">
        {{ description }}
      </span>
    </div>
  </div>
</template>
