<script setup lang="ts">
import { computed } from 'vue'
import { RadioGroupRoot } from 'reka-ui'
import radioGroupTheme from '@/themes/radio-group'
import URadio from './Radio.vue'

export interface RadioGroupProps {
  modelValue?: string
  options?: any[]
  label?: string
  description?: string
  error?: string
  orientation?: 'vertical' | 'horizontal'
  disabled?: boolean
  required?: boolean
  name?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  class?: string | object | any[]
  ui?: {
    root?: string
    label?: string
    description?: string
    error?: string
    items?: string
  }
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  options: () => [],
  orientation: 'vertical',
  disabled: false,
  required: false,
  size: 'md',
  color: 'primary'
})

const emit = defineEmits(['update:modelValue'])

const slots = defineSlots()

const ui = computed(() =>
  radioGroupTheme({
    orientation: props.orientation
  })
)

const handleUpdate = (value) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div :class="ui.root({ class: [props.ui?.root, props.class] })">
    <label v-if="label" :class="ui.label({ class: props.ui?.label })">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>

    <p
      v-if="description"
      :class="ui.description({ class: props.ui?.description })"
    >
      {{ description }}
    </p>

    <RadioGroupRoot
      :model-value="modelValue"
      :name="name"
      :disabled="disabled"
      :required="required"
      :orientation="orientation"
      :class="ui.items({ class: props.ui?.items })"
      @update:model-value="handleUpdate"
    >
      <slot>
        <URadio
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :label="option.label"
          :description="option.description"
          :disabled="option.disabled || disabled"
          :size="size"
          :color="color"
          :ui="props.ui"
        />
      </slot>
    </RadioGroupRoot>

    <p v-if="error" :class="ui.error({ class: props.ui?.error })">
      {{ error }}
    </p>
  </div>
</template>
