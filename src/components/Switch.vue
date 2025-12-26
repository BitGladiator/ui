<script setup lang="ts">
import { computed } from 'vue'
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import theme from '@/themes/switch'

export interface SwitchProps {
  modelValue?: boolean
  defaultValue?: boolean
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'error'
  label?: string
  description?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  disabled: false,
  required: false,
  size: 'md',
  color: 'primary'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const switchTheme = computed(() =>
  theme({
    size: props.size,
    color: props.color,
    disabled: props.disabled
  })
)

const handleUpdate = (value: boolean) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div
    :class="
      label || description ? switchTheme.wrapper({ class: ui?.wrapper }) : ''
    "
  >
    <SwitchRoot
      :checked="modelValue"
      :default-checked="defaultValue"
      :disabled="disabled"
      :required="required"
      :name="name"
      :value="value"
      :class="switchTheme.root({ class: ui?.root })"
      @update:checked="handleUpdate"
    >
      <SwitchThumb :class="switchTheme.thumb({ class: ui?.thumb })" />
    </SwitchRoot>

    <div
      v-if="label || description"
      :class="switchTheme.content({ class: ui?.content })"
    >
      <label v-if="label" :class="switchTheme.label({ class: ui?.label })">
        {{ label }}
        <span
          v-if="required"
          :class="switchTheme.required({ class: ui?.required })"
          >*</span
        >
      </label>
      <span
        v-if="description"
        :class="switchTheme.description({ class: ui?.description })"
      >
        {{ description }}
      </span>
    </div>
  </div>
</template>
