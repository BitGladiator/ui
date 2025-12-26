<template>
  <div :class="pinInputTheme.root({ class: ui?.root })" v-bind="$attrs">
    <input
      v-for="(digit, index) in digits"
      :key="index"
      :ref="(el) => setInputRef(el as HTMLInputElement, index)"
      type="text"
      :value="digit"
      :disabled="disabled"
      :class="pinInputTheme.input({ class: ui?.input })"
      :maxlength="1"
      :inputmode="type === 'number' ? 'numeric' : 'text'"
      :pattern="type === 'number' ? '[0-9]' : undefined"
      @input="onInput(index, $event)"
      @keydown="onKeydown(index, $event)"
      @focus="onFocus(index, $event)"
      @paste="onPaste($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, watch } from 'vue'
import theme from '@/themes/pin-input'

export interface PinInputProps {
  modelValue?: string
  length?: number
  disabled?: boolean
  type?: 'text' | 'number'
  mask?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'outline'
  error?: boolean
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<PinInputProps>(), {
  length: 4,
  type: 'text',
  mask: false,
  size: 'md',
  variant: 'default',
  error: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  complete: [value: string]
  input: [value: string, index: number]
}>()

const inputRefs = ref<HTMLInputElement[]>([])
const digits = ref<string[]>(Array(props.length).fill(''))

const setInputRef = (el: HTMLInputElement, index: number) => {
  if (el) {
    inputRefs.value[index] = el
  }
}

const pinInputTheme = computed(() =>
  theme({
    variant: props.variant,
    size: props.size,
    hasError: props.error
  })
)

const onInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value.slice(-1) // Take only the last character

  // Type validation
  if (props.type === 'number' && value && !/^\d$/.test(value)) {
    target.value = digits.value[index] // Reset to previous value
    return
  }

  digits.value[index] = value
  updateModelValue()
  emit('input', value, index)

  // Auto-focus next input
  if (value && index < props.length - 1) {
    nextTick(() => {
      inputRefs.value[index + 1]?.focus()
    })
  }

  // Check if complete
  if (
    digits.value.every((d) => d !== '') &&
    digits.value.join('').length === props.length
  ) {
    emit('complete', digits.value.join(''))
  }
}

const onKeydown = (index: number, event: KeyboardEvent) => {
  // Handle backspace
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    digits.value[index - 1] = ''
    updateModelValue()
    nextTick(() => {
      inputRefs.value[index - 1]?.focus()
    })
  }

  // Handle arrow keys
  if (event.key === 'ArrowLeft' && index > 0) {
    nextTick(() => {
      inputRefs.value[index - 1]?.focus()
    })
  }

  if (event.key === 'ArrowRight' && index < props.length - 1) {
    nextTick(() => {
      inputRefs.value[index + 1]?.focus()
    })
  }
}

const onFocus = (_: number, event: FocusEvent) => {
  const target = event.target as HTMLInputElement
  target.select()
}

const onPaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pastedData = event.clipboardData?.getData('text') || ''

  if (pastedData.length <= props.length) {
    const newDigits = pastedData.split('').slice(0, props.length)

    // Type validation for pasted content
    if (props.type === 'number' && newDigits.some((d) => !/^\d$/.test(d))) {
      return
    }

    // Fill the digits
    for (let i = 0; i < props.length; i++) {
      digits.value[i] = newDigits[i] || ''
    }

    updateModelValue()

    // Focus the next empty input or the last one
    const nextEmptyIndex = digits.value.findIndex((d) => d === '')
    const targetIndex =
      nextEmptyIndex !== -1 ? nextEmptyIndex : props.length - 1

    nextTick(() => {
      inputRefs.value[targetIndex]?.focus()
    })

    // Check if complete
    if (digits.value.every((d) => d !== '')) {
      emit('complete', digits.value.join(''))
    }
  }
}

const updateModelValue = () => {
  const value = digits.value.join('')
  emit('update:modelValue', value)
}

// Watch for external changes
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== digits.value.join('')) {
      const newDigits = (newValue || '').split('').slice(0, props.length)
      for (let i = 0; i < props.length; i++) {
        digits.value[i] = newDigits[i] || ''
      }
    }
  },
  { immediate: true }
)

defineExpose({
  focus: () => inputRefs.value[0]?.focus(),
  clear: () => {
    digits.value = Array(props.length).fill('')
    updateModelValue()
    nextTick(() => {
      inputRefs.value[0]?.focus()
    })
  }
})
</script>
