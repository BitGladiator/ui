<script setup lang="ts">
import { computed, ref } from 'vue'
import inputTheme from '@/themes/input'
import Icon from './Icon.vue'

export interface InputProps {
  modelValue?: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  size?: string
  color?: string
  variant?: string
  label?: string
  hint?: string
  error?: string
  leadingIcon?: string
  trailingIcon?: string
  ui?: {
    root?: string
    wrapper?: string
    base?: string
    input?: string
    label?: string
    hint?: string
    error?: string
    leadingIcon?: string
    trailingIcon?: string
  }
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  size: 'md',
  color: 'primary',
  variant: 'outline'
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'change'])

const slots = defineSlots()

const inputRef = ref()
const isFocused = ref(false)

const ui = computed(() =>
  inputTheme({
    size: props.size,
    variant: props.variant,
    color: props.color,
    focused: isFocused.value,
    disabled: props.disabled,
    hasLeading: !!(props.leadingIcon || slots.leading),
    hasError: !!props.error
  })
)

const handleInput = (event) => {
  const target = event.target
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

const handleChange = (event) => {
  emit('change', event)
}

const mapSizeToIcon = (size: string) => {
  const sizeMap: Record<string, any> = {
    sm: 'sm',
    md: 'md',
    lg: 'lg'
  }
  return sizeMap[size] || 'md'
}

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur()
})
</script>

<template>
  <div :class="ui.root({ class: props.ui?.root })">
    <label v-if="label" :class="ui.label({ class: props.ui?.label })">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>

    <div :class="ui.wrapper({ class: props.ui?.wrapper })">
      <div
        v-if="leadingIcon || slots.leading"
        :class="ui.leadingIcon({ class: props.ui?.leadingIcon })"
      >
        <slot name="leading">
          <Icon
            v-if="leadingIcon"
            :name="leadingIcon"
            :size="mapSizeToIcon(size)"
          />
        </slot>
      </div>

      <input
        ref="inputRef"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :class="ui.input({ class: props.ui?.input })"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />

      <div
        v-if="trailingIcon || slots.trailing"
        :class="ui.trailingIcon({ class: props.ui?.trailingIcon })"
      >
        <slot name="trailing">
          <Icon
            v-if="trailingIcon"
            :name="trailingIcon"
            :size="mapSizeToIcon(size)"
          />
        </slot>
      </div>
    </div>

    <div v-if="error || hint" :class="ui.hint({ class: props.ui?.hint })">
      {{ error || hint }}
    </div>
  </div>
</template>
