<template>
  <div :class="ui.wrapper({ class: ui?.wrapper })" v-bind="$attrs">
    <textarea
      ref="textarea"
      :id="inputId"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :readonly="readonly"
      :rows="rows"
      :cols="cols"
      :maxlength="maxlength"
      :minlength="minlength"
      :class="ui.root({ class: ui?.root })"
      @input="onInput"
      @change="$emit('change', $event)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      @keydown="$emit('keydown', $event)"
    />

    <!-- Resize handle -->
    <div
      v-if="resize && !disabled"
      :class="ui.resizeHandle({ class: ui?.resizeHandle })"
    >
      <Icon
        name="solar:sort-linear"
        :class="ui.resizeIcon({ class: ui?.resizeIcon })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, watch } from 'vue'
import theme from '@/themes/textarea'
import Icon from './Icon.vue'

export interface TextareaProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  readonly?: boolean
  name?: string
  id?: string
  rows?: number
  cols?: number
  maxlength?: number
  minlength?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled'
  color?: 'primary' | 'error' | 'success' | 'warning' | 'info'
  resize?: boolean
  autoresize?: boolean
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<TextareaProps>(), {
  rows: 4,
  size: 'md',
  variant: 'outline',
  color: 'primary',
  resize: true,
  autoresize: false
})

const ui = computed(() => theme())

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [event: Event]
  change: [event: Event]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}>()

const textarea = ref<HTMLTextAreaElement>()

const inputId = computed(
  () => props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`
)

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  emit('input', event)

  if (props.autoresize) {
    nextTick(() => {
      autoResize()
    })
  }
}

const autoResize = () => {
  if (textarea.value && props.autoresize) {
    textarea.value.style.height = 'auto'
    textarea.value.style.height = `${textarea.value.scrollHeight}px`
  }
}

// Watch for external changes to resize
watch(
  () => props.modelValue,
  () => {
    if (props.autoresize) {
      nextTick(() => {
        autoResize()
      })
    }
  }
)

defineExpose({
  textarea,
  focus: () => textarea.value?.focus(),
  blur: () => textarea.value?.blur(),
  autoResize
})
</script>
