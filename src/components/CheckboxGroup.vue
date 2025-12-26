<script setup lang="ts">
import { computed } from 'vue'
import checkboxGroupTheme from '@/themes/checkbox-group'
import UCheckbox from './Checkbox.vue'

export interface CheckboxGroupProps {
  modelValue?: any[]
  options?: any[]
  label?: string
  description?: string
  error?: string
  orientation?: string
  disabled?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'error'
  class?: string | object | any[]
  ui?: {
    root?: string
    label?: string
    description?: string
    error?: string
    fieldset?: string
    legend?: string
    container?: string
    items?: string
  }
}

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: () => [],
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
  checkboxGroupTheme({
    orientation: props.orientation
  })
)

const isChecked = (value) => {
  return props.modelValue.includes(value)
}

const handleChange = (value, checked) => {
  let newValue = [...props.modelValue]

  if (checked) {
    if (!newValue.includes(value)) {
      newValue.push(value)
    }
  } else {
    newValue = newValue.filter((v) => v !== value)
  }

  emit('update:modelValue', newValue)
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

    <div :class="ui.items({ class: props.ui?.items })">
      <slot>
        <UCheckbox
          v-for="(option, index) in options"
          :key="index"
          :model-value="isChecked(option.value)"
          :label="option.label"
          :description="option.description"
          :disabled="disabled || option.disabled"
          :size="size"
          :color="color"
          :value="option.value"
          @update:model-value="(checked) => handleChange(option.value, checked)"
        />
      </slot>
    </div>

    <p v-if="error" :class="ui.error({ class: props.ui?.error })">
      {{ error }}
    </p>
  </div>
</template>
