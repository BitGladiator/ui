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
import { computed, onMounted, ref, useSlots } from 'vue'
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
    trailing: props.trailing || !!props.trailingIcon || props.loading
  })
)

const inputsRef = ref<ComponentPublicInstance[]>([])

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
  if (props.autofocus) {
    inputsRef.value[0]?.$el?.focus()
  }
}

onMounted(() => {
  setTimeout(() => {
    autoFocus()
  }, props.autofocusDelay)
})

defineExpose({
  inputsRef
})
</script>

<template>
  <DefineSegmentsTemplate v-slot="{ segments, type }">
    <SingleDateField.Input
      v-if="!range"
      v-for="(segment, index) in segments"
      :key="`single-${segment.part}-${index}`"
      :ref="el => (inputsRef[index] = el as ComponentPublicInstance)"
      :type="type || 'start' || 'end'"
      :part="segment.part"
      :class="datePickerTheme.segment({ class: ui?.segment })"
      :data-segment="segment.part"
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
    >
      {{ segment.value ? segment.value.trim() : '' }}
    </RangeDateField.Input>
  </DefineSegmentsTemplate>

  <SingleDateField.Root
    v-if="!range"
    v-bind="rootProps"
    v-slot="{ segments }"
    :model-value="(modelValue as DateValue)"
    :default-value="(defaultValue as DateValue)"
    :disabled="disabled"
    :class="datePickerTheme.base({ class: [ui?.base, props.class] })"
    @update:model-value="onUpdate"
    @blur="onBlur"
    @focus="onFocus"
  >
    <span
      v-if="props.leading || props.leadingIcon || slots.leading"
      :class="datePickerTheme.leading({ class: ui?.leading })"
    >
      <slot name="leading">
        <Icon
          v-if="leadingIcon"
          :name="leadingIcon"
          :class="datePickerTheme.leadingIcon({ class: ui?.leadingIcon })"
        />
      </slot>
    </span>

    <ReuseSegmentsTemplate :segments="segments" />

    <slot />

    <span
      v-if="
        props.trailing || props.trailingIcon || props.loading || slots.trailing
      "
      :class="datePickerTheme.trailing({ class: ui?.trailing })"
    >
      <slot name="trailing">
        <Icon
          v-if="props.loading"
          name="solar:loader-2-linear"
          :class="[
            datePickerTheme.trailingIcon({ class: ui?.trailingIcon }),
            'animate-spin'
          ]"
        />
        <Icon
          v-else-if="trailingIcon"
          :name="trailingIcon"
          :class="datePickerTheme.trailingIcon({ class: ui?.trailingIcon })"
        />
      </slot>
    </span>
  </SingleDateField.Root>

  <RangeDateField.Root
    v-else
    v-bind="rootProps"
    v-slot="{ segments }"
    :model-value="modelValue as any"
    :default-value="defaultValue as any"
    :disabled="disabled"
    :class="datePickerTheme.base({ class: [ui?.base, props.class] })"
    @update:model-value="onUpdate"
    @blur="onBlur"
    @focus="onFocus"
  >
    <span
      v-if="props.leading || props.leadingIcon || slots.leading"
      :class="datePickerTheme.leading({ class: ui?.leading })"
    >
      <slot name="leading">
        <Icon
          v-if="leadingIcon"
          :name="leadingIcon"
          :class="datePickerTheme.leadingIcon({ class: ui?.leadingIcon })"
        />
      </slot>
    </span>

    <ReuseSegmentsTemplate :segments="segments.start" type="start" />
    <slot name="separator">
      <Icon
        :name="separatorIcon"
        :class="datePickerTheme.separatorIcon({ class: ui?.separatorIcon })"
      />
    </slot>
    <ReuseSegmentsTemplate :segments="segments.end" type="end" />

    <slot />

    <span
      v-if="
        props.trailing || props.trailingIcon || props.loading || slots.trailing
      "
      :class="datePickerTheme.trailing({ class: ui?.trailing })"
    >
      <slot name="trailing">
        <Icon
          v-if="props.loading"
          name="solar:loader-2-linear"
          :class="[
            datePickerTheme.trailingIcon({ class: ui?.trailingIcon }),
            'animate-spin'
          ]"
        />
        <Icon
          v-else-if="trailingIcon"
          :name="trailingIcon"
          :class="datePickerTheme.trailingIcon({ class: ui?.trailingIcon })"
        />
      </slot>
    </span>
  </RangeDateField.Root>
</template>
