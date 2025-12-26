<template>
  <div :class="ui.root({ class: props.class })" :data-orientation="orientation">
    <!-- Status Display -->
    <div
      v-if="!isIndeterminate && status"
      :class="ui.status({ class: props.ui?.status })"
      :style="statusStyle"
    >
      <slot name="status" :percent="percent"> {{ percent }}% </slot>
    </div>

    <!-- Progress Root (using reka-ui) -->
    <ProgressRoot
      v-bind="rootProps"
      :max="realMax"
      :class="ui.base({ class: props.ui?.base })"
      style="transform: translateZ(0)"
    >
      <ProgressIndicator
        :class="ui.indicator({ class: props.ui?.indicator })"
        :style="indicatorStyle"
        :data-state="isIndeterminate ? 'indeterminate' : 'complete'"
      />
    </ProgressRoot>

    <!-- Steps indicators -->
    <div v-if="hasSteps" :class="ui.steps({ class: props.ui?.steps })">
      <div
        v-for="(step, index) in max"
        :key="index"
        :class="ui.step({ class: props.ui?.step, step: getStepVariant(index) })"
      >
        <slot :name="`step-${index}`" :step="step">
          {{ step }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ProgressRoot, ProgressIndicator } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import theme from '@/themes/progress'

export interface ProgressProps {
  modelValue?: number | null
  min?: number
  max?: number | Array<any>
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  orientation?: 'horizontal' | 'vertical'
  animation?: 'none' | 'carousel' | 'carousel-inverse' | 'swing' | 'elastic'
  label?: string
  status?: boolean
  inverted?: boolean
  getValueLabel?: (
    value: number | null | undefined,
    max: number
  ) => string | undefined
  getValueText?: (
    value: number | null | undefined,
    max: number
  ) => string | undefined
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<ProgressProps>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  size: 'md',
  color: 'primary',
  orientation: 'horizontal',
  animation: 'none',
  status: false,
  inverted: false
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const rootProps = computed(() =>
  reactivePick(props, 'getValueLabel', 'getValueText', 'modelValue')
)

const isIndeterminate = computed(() => props.modelValue === null)
const hasSteps = computed(() => Array.isArray(props.max))

const realMax = computed(() => {
  if (isIndeterminate.value || !props.max) {
    return undefined
  }
  if (Array.isArray(props.max)) {
    return props.max.length - 1
  }
  return Number(props.max)
})

const percent = computed(() => {
  if (isIndeterminate.value || props.modelValue === null) {
    return undefined
  }
  const value = props.modelValue || 0
  switch (true) {
    case value < 0:
      return 0
    case value > (realMax.value ?? 100):
      return 100
    default:
      return Math.round((value / (realMax.value ?? 100)) * 100)
  }
})

const indicatorStyle = computed(() => {
  if (percent.value === undefined) {
    return
  }

  if (props.orientation === 'vertical') {
    return {
      transform: `translateY(${props.inverted ? '' : '-'}${
        100 - percent.value
      }%)`
    }
  } else {
    return {
      transform: `translateX(${props.inverted ? '' : '-'}${
        100 - percent.value
      }%)`
    }
  }
})

const statusStyle = computed(() => {
  const value = `${Math.max(percent.value ?? 0, 0)}%`
  return props.orientation === 'vertical' ? { height: value } : { width: value }
})

function getStepVariant(index: number) {
  if (props.modelValue === null) {
    return 'other'
  }
  const value = props.modelValue || 0

  if (index === value && index !== 0 && index !== realMax.value) {
    return 'active'
  }
  if (index === 0 && index === value) {
    return 'first'
  }
  if (index === realMax.value && index === value) {
    return 'last'
  }
  return 'other'
}

const ui = computed(() =>
  theme({
    size: props.size,
    color: props.color,
    orientation: props.orientation,
    animation: props.animation,
    inverted: props.inverted
  })
)
</script>
