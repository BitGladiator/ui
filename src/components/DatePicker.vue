<script lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type {
  DateFieldRootProps,
  DateFieldRootEmits,
  DateRangeFieldRootProps,
  DateRangeFieldRootEmits,
  DateValue,
  SegmentPart
} from 'reka-ui'

type _DateFieldRootProps = Omit<
  DateFieldRootProps,
  'as' | 'asChild' | 'modelValue' | 'defaultValue'
>
type _RangeDateFieldRootProps = Omit<
  DateRangeFieldRootProps,
  'as' | 'asChild' | 'modelValue' | 'defaultValue'
>

type DatePickerDefaultValue<R extends boolean = false> = R extends true
  ? DateRangeFieldRootProps['defaultValue']
  : DateFieldRootProps['defaultValue']
type DatePickerModelValue<R extends boolean = false> =
  | (R extends true
      ? DateRangeFieldRootProps['modelValue']
      : DateFieldRootProps['modelValue'])
  | undefined

export interface DatePickerProps<R extends boolean = false>
  extends _DateFieldRootProps,
    _RangeDateFieldRootProps {
  modelValue?: DatePickerModelValue<R>
  defaultValue?: DatePickerDefaultValue<R>
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'filled' | 'ghost' | 'soft' | 'none'
  color?: 'primary' | 'error' | 'success' | 'warning' | 'info'
  leadingIcon?: string
  trailingIcon?: string
  separatorIcon?: string
  leading?: boolean
  trailing?: boolean
  loading?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  range?: R & boolean
  class?: any
  ui?: Record<string, any>
}

export interface DatePickerEmits<R extends boolean>
  extends Omit<
    DateFieldRootEmits & DateRangeFieldRootEmits,
    'update:modelValue'
  > {
  'update:modelValue': [date: DatePickerModelValue<R>]
  change: [event: Event]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}

export interface DatePickerSlots {
  leading?(): any
  default?(): any
  trailing?(): any
  separator?(): any
}
</script>

<script setup lang="ts" generic="R extends boolean">
import { computed, onMounted, ref, useSlots, watch, onUnmounted } from 'vue'
import {
  DateField as SingleDateField,
  DateRangeField as RangeDateField
} from 'reka-ui/namespaced'
import { reactiveOmit, createReusableTemplate } from '@vueuse/core'
import theme from '@/themes/date-picker'
import Icon from './Icon.vue'

const [DefineSegmentsTemplate, ReuseSegmentsTemplate] = createReusableTemplate<{
  segments?: { part: SegmentPart; value: string }[]
  type?: 'start' | 'end'
}>()

const props = withDefaults(defineProps<DatePickerProps<R>>(), {
  size: 'md',
  variant: 'outline',
  color: 'primary',
  trailingIcon: 'solar:calendar-linear',
  separatorIcon: 'solar:minus-linear',
  autofocusDelay: 0
})

const emits = defineEmits<DatePickerEmits<R>>()
const slots = useSlots()

const rootProps = computed(() =>
  reactiveOmit(
    props,
    'range',
    'modelValue',
    'defaultValue',
    'size',
    'variant',
    'color',
    'leadingIcon',
    'trailingIcon',
    'separatorIcon',
    'leading',
    'trailing',
    'loading',
    'autofocus',
    'autofocusDelay',
    'class',
    'ui'
  )
)

const datePickerTheme = computed(() =>
  theme({
    size: props.size,
    variant: props.variant,
    color: props.color,
    disabled: props.disabled,
    leading: props.leading || !!props.leadingIcon,
    trailing: props.trailing || !!props.trailingIcon || props.loading,
    range: props.range
  })
)

const inputsRef = ref<ComponentPublicInstance[]>([])
const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth < 640
}

function onUpdate(value: any) {
  const event = new Event('change', { target: { value } } as any)
  emits('change', event)
  emits('update:modelValue', value)
}

function onBlur(event: FocusEvent) {
  emits('blur', event)
}

function onFocus(event: FocusEvent) {
  emits('focus', event)
}

function autoFocus() {
  if (props.autofocus && inputsRef.value.length > 0) {
    const input = inputsRef.value[0]?.$el
    if (input) {
      setTimeout(() => input.focus(), 10)
    }
  }
}

function handleResize() {
  checkMobile()
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', handleResize)
  
  if (props.autofocusDelay > 0) {
    setTimeout(autoFocus, props.autofocusDelay)
  } else if (props.autofocus) {
    autoFocus()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

watch(() => props.autofocus, (newVal) => {
  if (newVal) {
    setTimeout(autoFocus, props.autofocusDelay)
  }
})

defineExpose({
  inputsRef
})
</script>

<template>
  <DefineSegmentsTemplate v-slot="{ segments, type }">
    <template v-if="range && isMobile">
      <div class="mobile-segment-group">
        <SingleDateField.Input
          v-for="(segment, index) in segments"
          :key="`mobile-${type}-${segment.part}-${index}`"
          :ref="el => (inputsRef[index] = el as ComponentPublicInstance)"
          :type="type"
          :part="segment.part"
          :class="[
            datePickerTheme.segment({ class: ui?.segment }),
            'mobile-segment'
          ]"
          :data-segment="segment.part"
          :aria-label="`${type === 'start' ? 'From' : 'To'} date ${segment.part}`"
        >
          {{ segment.value ? segment.value.trim() : '' }}
        </SingleDateField.Input>
      </div>
    </template>
    <template v-else>
      <SingleDateField.Input
        v-if="!range"
        v-for="(segment, index) in segments"
        :key="`single-${segment.part}-${index}`"
        :ref="el => (inputsRef[index] = el as ComponentPublicInstance)"
        :type="type || 'start' || 'end'"
        :part="segment.part"
        :class="datePickerTheme.segment({ class: ui?.segment })"
        :data-segment="segment.part"
        :aria-label="`Date ${segment.part}`"
      >
        {{ segment.value ? segment.value.trim() : '' }}
      </SingleDateField.Input>
      <RangeDateField.Input
        v-else
        v-for="(segment, index) in segments"
        :key="`range-${segment.part}-${index}`"
        :ref="el => (inputsRef[index] = el as ComponentPublicInstance)"
        :type="type || 'start'"
        :part="segment.part"
        :class="datePickerTheme.segment({ class: ui?.segment })"
        :data-segment="segment.part"
        :aria-label="`${type} date ${segment.part}`"
      >
        {{ segment.value ? segment.value.trim() : '' }}
      </RangeDateField.Input>
    </template>
  </DefineSegmentsTemplate>

  <SingleDateField.Root
    v-if="!range"
    v-bind="rootProps"
    v-slot="{ segments }"
    :model-value="(modelValue as DateValue)"
    :default-value="(defaultValue as DateValue)"
    :disabled="disabled"
    :class="[
      datePickerTheme.base({ class: [ui?.base, props.class] }),
      'date-picker-container'
    ]"
    @update:model-value="onUpdate"
    @blur="onBlur"
    @focus="onFocus"
  >
    <div class="date-picker-inner">
      <span
        v-if="props.leading || props.leadingIcon || slots.leading"
        :class="[
          datePickerTheme.leading({ class: ui?.leading }),
          'date-picker-leading'
        ]"
      >
        <slot name="leading">
          <Icon
            v-if="leadingIcon"
            :name="leadingIcon"
            :class="datePickerTheme.leadingIcon({ class: ui?.leadingIcon })"
            aria-hidden="true"
          />
        </slot>
      </span>

      <div class="segments-wrapper">
        <ReuseSegmentsTemplate :segments="segments" />
      </div>

      <slot />

      <span
        v-if="
          props.trailing || props.trailingIcon || props.loading || slots.trailing
        "
        :class="[
          datePickerTheme.trailing({ class: ui?.trailing }),
          'date-picker-trailing'
        ]"
      >
        <slot name="trailing">
          <Icon
            v-if="props.loading"
            name="solar:loader-2-linear"
            :class="[
              datePickerTheme.trailingIcon({ class: ui?.trailingIcon }),
              'animate-spin'
            ]"
            aria-label="Loading"
          />
          <Icon
            v-else-if="trailingIcon"
            :name="trailingIcon"
            :class="datePickerTheme.trailingIcon({ class: ui?.trailingIcon })"
            aria-hidden="true"
          />
        </slot>
      </span>
    </div>
  </SingleDateField.Root>

  <RangeDateField.Root
    v-else
    v-bind="rootProps"
    v-slot="{ segments }"
    :model-value="modelValue as any"
    :default-value="defaultValue as any"
    :disabled="disabled"
    :class="[
      datePickerTheme.base({ class: [ui?.base, props.class] }),
      'date-picker-container',
      { 'range-picker': range, 'mobile-view': isMobile }
    ]"
    @update:model-value="onUpdate"
    @blur="onBlur"
    @focus="onFocus"
  >
    <div class="date-picker-inner range-inner">
      <span
        v-if="props.leading || props.leadingIcon || slots.leading"
        :class="[
          datePickerTheme.leading({ class: ui?.leading }),
          'date-picker-leading'
        ]"
      >
        <slot name="leading">
          <Icon
            v-if="leadingIcon"
            :name="leadingIcon"
            :class="datePickerTheme.leadingIcon({ class: ui?.leadingIcon })"
            aria-hidden="true"
          />
        </slot>
      </span>

      <div v-if="!isMobile" class="range-wrapper">
        <div class="range-section">
          <ReuseSegmentsTemplate :segments="segments.start" type="start" />
        </div>
        
        <span class="separator-wrapper">
          <slot name="separator">
            <Icon
              :name="separatorIcon"
              :class="datePickerTheme.separatorIcon({ class: ui?.separatorIcon })"
              aria-hidden="true"
            />
          </slot>
        </span>
        
        <div class="range-section">
          <ReuseSegmentsTemplate :segments="segments.end" type="end" />
        </div>
      </div>
      
      <div v-else class="mobile-range-view">
        <div class="mobile-range-block">
          <div class="mobile-label">From</div>
          <ReuseSegmentsTemplate :segments="segments.start" type="start" />
        </div>
        <div class="mobile-range-block">
          <div class="mobile-label">To</div>
          <ReuseSegmentsTemplate :segments="segments.end" type="end" />
        </div>
      </div>

      <slot />

      <span
        v-if="
          props.trailing || props.trailingIcon || props.loading || slots.trailing
        "
        :class="[
          datePickerTheme.trailing({ class: ui?.trailing }),
          'date-picker-trailing'
        ]"
      >
        <slot name="trailing">
          <Icon
            v-if="props.loading"
            name="solar:loader-2-linear"
            :class="[
              datePickerTheme.trailingIcon({ class: ui?.trailingIcon }),
              'animate-spin'
            ]"
            aria-label="Loading"
          />
          <Icon
            v-else-if="trailingIcon"
            :name="trailingIcon"
            :class="datePickerTheme.trailingIcon({ class: ui?.trailingIcon })"
            aria-hidden="true"
          />
        </slot>
      </span>
    </div>
  </RangeDateField.Root>
</template>

<style scoped>
.date-picker-container {
  position: relative;
  transition: all 0.2s ease;
}

.date-picker-inner {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  flex-wrap: nowrap;
  overflow: hidden;
}

.segments-wrapper {
  display: flex;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.date-picker-leading,
.date-picker-trailing {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.range-picker .date-picker-inner {
  gap: 0.25rem;
  flex-wrap: wrap;
}

.range-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  gap: 0.5rem;
}

.range-section {
  display: flex;
  flex: 1;
  min-width: 0;
}

.separator-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-view .date-picker-inner {
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;
  padding: 0.5rem;
}

.mobile-range-view {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mobile-range-block {
  width: 100%;
}

.mobile-label {
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: hsl(var(--muted-foreground));
}

.mobile-segment-group {
  display: flex;
  width: 100%;
  gap: 0.125rem;
}

.mobile-segment {
  flex: 1;
}

@media (max-width: 640px) {
  .date-picker-inner:not(.range-inner) {
    padding: 0.25rem;
  }
  
  .range-picker .date-picker-inner {
    gap: 0.5rem;
  }
  
  .segments-wrapper {
    flex-wrap: wrap;
    gap: 0.125rem;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .date-picker-inner {
    gap: 0.375rem;
  }
  
  .range-wrapper {
    gap: 0.375rem;
  }
}

@media (min-width: 769px) {
  .date-picker-inner {
    gap: 0.5rem;
  }
  
  .range-wrapper {
    gap: 0.5rem;
  }
}

@media (min-width: 1024px) {
  .date-picker-inner {
    gap: 0.75rem;
  }
  
  .range-wrapper {
    gap: 0.75rem;
  }
}

:deep([data-segment]) {
  transition: all 0.15s ease;
  outline: none;
  min-width: 1.5rem;
  text-align: center;
  cursor: pointer;
}

:deep([data-segment]:focus) {
  box-shadow: 0 0 0 2px hsl(var(--primary) / 0.1);
  position: relative;
  z-index: 10;
}

:deep([data-segment][data-placeholder]) {
  color: hsl(var(--muted-foreground) / 0.7);
}

:deep([data-segment]:hover:not(:focus)) {
  background-color: hsl(var(--accent) / 0.3);
}

.range-picker.mobile-view :deep([data-segment]) {
  flex: 1;
  min-width: 2rem;
}
</style>