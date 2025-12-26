<script setup lang="ts">
import { computed } from 'vue'
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from 'reka-ui'
import sliderTheme from '@/themes/slider'

export interface SliderProps {
  as?: string | object
  modelValue?: number | number[]
  defaultValue?: number | number[]
  min?: number
  max?: number
  step?: number
  minStepsBetweenThumbs?: number
  size?: string
  color?: string
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
  inverted?: boolean
  name?: string
  class?: string | object | any[]
  ui?: {
    root?: string
    track?: string
    range?: string
    thumb?: string
  }
}

const props = withDefaults(defineProps<SliderProps>(), {
  as: 'div',
  min: 0,
  max: 100,
  step: 1,
  minStepsBetweenThumbs: 0,
  size: 'md',
  color: 'primary',
  orientation: 'horizontal',
  disabled: false,
  inverted: false
})

const emit = defineEmits(['update:modelValue', 'change'])

const ui = computed(() =>
  sliderTheme({
    size: props.size,
    color: props.color,
    orientation: props.orientation,
    disabled: props.disabled
  })
)

const handleValueChange = (value) => {
  emit('update:modelValue', value)
}

const handleChange = (event) => {
  emit('change', event)
}

// Ensure modelValue is array if multiple thumbs
const thumbCount = computed(() => {
  if (Array.isArray(props.modelValue)) return props.modelValue.length
  if (Array.isArray(props.defaultValue)) return props.defaultValue.length
  return 1
})

// Normalize values to arrays for reka-ui
const normalizedModelValue = computed(() => {
  if (props.modelValue === undefined) return undefined
  return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
})

const normalizedDefaultValue = computed(() => {
  if (props.defaultValue === undefined) return undefined
  return Array.isArray(props.defaultValue)
    ? props.defaultValue
    : [props.defaultValue]
})
</script>

<template>
  <SliderRoot
    :as="props.as"
    :model-value="normalizedModelValue"
    :default-value="normalizedDefaultValue"
    :min="min"
    :max="max"
    :step="step"
    :min-steps-between-thumbs="minStepsBetweenThumbs"
    :orientation="orientation"
    :disabled="disabled"
    :inverted="inverted"
    :name="name"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    @update:model-value="handleValueChange"
    @change="handleChange"
  >
    <SliderTrack
      data-slot="track"
      :class="ui.track({ class: props.ui?.track })"
    >
      <SliderRange
        data-slot="range"
        :class="ui.range({ class: props.ui?.range })"
      />
    </SliderTrack>

    <SliderThumb
      v-for="(_, index) in thumbCount"
      :key="index"
      data-slot="thumb"
      :class="ui.thumb({ class: props.ui?.thumb })"
    />
  </SliderRoot>
</template>
