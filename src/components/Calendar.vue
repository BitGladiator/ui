<script setup lang="ts">
import { computed } from 'vue'
import type { DateValue } from '@internationalized/date'
import type { CalendarRootProps, CalendarRootEmits } from 'reka-ui'
import { Calendar } from 'reka-ui/namespaced'
import { reactiveOmit } from '@vueuse/core'
import theme from '@/themes/calendar'
import Button from './Button.vue'

export interface CalendarProps
  extends Omit<
    CalendarRootProps,
    'as' | 'asChild' | 'modelValue' | 'defaultValue'
  > {
  modelValue?: CalendarRootProps['modelValue']
  defaultValue?: CalendarRootProps['defaultValue']
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  variant?: 'solid' | 'outline' | 'soft' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
  monthControls?: boolean
  yearControls?: boolean
  nextYearIcon?: string
  nextMonthIcon?: string
  prevYearIcon?: string
  prevMonthIcon?: string
  class?: any
  ui?: Record<string, any>
}

export interface CalendarEmits
  extends Omit<CalendarRootEmits, 'update:modelValue'> {
  'update:modelValue': [date: CalendarRootProps['modelValue']]
}

const props = withDefaults(defineProps<CalendarProps>(), {
  color: 'primary',
  variant: 'solid',
  size: 'md',
  fixedWeeks: true,
  monthControls: true,
  yearControls: true,
  nextYearIcon: 'solar:double-alt-arrow-right-linear',
  nextMonthIcon: 'solar:alt-arrow-right-linear',
  prevYearIcon: 'solar:double-alt-arrow-left-linear',
  prevMonthIcon: 'solar:alt-arrow-left-linear'
})

const emit = defineEmits<CalendarEmits>()

const rootProps = computed(() =>
  reactiveOmit(
    props,
    'modelValue',
    'defaultValue',
    'color',
    'variant',
    'size',
    'monthControls',
    'yearControls',
    'nextYearIcon',
    'nextMonthIcon',
    'prevYearIcon',
    'prevMonthIcon',
    'class',
    'ui'
  )
)

const calendarTheme = computed(() =>
  theme({
    color: props.color,
    variant: props.variant,
    size: props.size
  })
)

// Map calendar size to button size
const buttonSize = computed(() => {
  const sizeMap = {
    sm: 'sm',
    md: 'sm',
    lg: 'md'
  }
  return sizeMap[props.size] as 'sm' | 'md' | 'lg'
})

function paginateYear(date: DateValue, sign: -1 | 1) {
  if (sign === -1) {
    return date.subtract({ years: 1 })
  }
  return date.add({ years: 1 })
}

function onUpdate(value: any) {
  emit('update:modelValue', value)
}
</script>

<template>
  <Calendar.Root
    v-bind="rootProps"
    v-slot="{ weekDays, grid }"
    :model-value="modelValue"
    :default-value="defaultValue"
    data-slot="root"
    :class="calendarTheme.root({ class: [ui?.root, props.class] })"
    @update:model-value="onUpdate"
  >
    <Calendar.Header
      data-slot="header"
      :class="calendarTheme.header({ class: ui?.header })"
    >
      <Calendar.Prev
        v-if="yearControls"
        :prev-page="(date: DateValue) => paginateYear(date, -1)"
        aria-label="Previous year"
        as-child
      >
        <Button
          :leading-icon="prevYearIcon"
          :size="buttonSize"
          color="neutral"
          variant="plain"
        />
      </Calendar.Prev>
      <Calendar.Prev v-if="monthControls" aria-label="Previous month" as-child>
        <Button
          :leading-icon="prevMonthIcon"
          :size="buttonSize"
          color="neutral"
          variant="plain"
        />
      </Calendar.Prev>
      <Calendar.Heading
        v-slot="{ headingValue }"
        data-slot="heading"
        :class="calendarTheme.heading({ class: ui?.heading })"
      >
        <slot name="heading" :value="headingValue">
          {{ headingValue }}
        </slot>
      </Calendar.Heading>
      <Calendar.Next v-if="monthControls" aria-label="Next month" as-child>
        <Button
          :leading-icon="nextMonthIcon"
          :size="buttonSize"
          color="neutral"
          variant="plain"
        />
      </Calendar.Next>
      <Calendar.Next
        v-if="yearControls"
        :next-page="(date: DateValue) => paginateYear(date, 1)"
        aria-label="Next year"
        as-child
      >
        <Button
          :leading-icon="nextYearIcon"
          :size="buttonSize"
          color="neutral"
          variant="plain"
        />
      </Calendar.Next>
    </Calendar.Header>
    <div data-slot="body" :class="calendarTheme.body({ class: ui?.body })">
      <Calendar.Grid
        v-for="month in grid"
        :key="month.value.toString()"
        data-slot="grid"
        :class="calendarTheme.grid({ class: ui?.grid })"
      >
        <Calendar.GridHead>
          <Calendar.GridRow
            data-slot="gridWeekDaysRow"
            :class="
              calendarTheme.gridWeekDaysRow({ class: ui?.gridWeekDaysRow })
            "
          >
            <Calendar.HeadCell
              v-for="day in weekDays"
              :key="day"
              data-slot="headCell"
              :class="calendarTheme.headCell({ class: ui?.headCell })"
            >
              <slot name="week-day" :day="day">
                {{ day }}
              </slot>
            </Calendar.HeadCell>
          </Calendar.GridRow>
        </Calendar.GridHead>
        <Calendar.GridBody
          data-slot="gridBody"
          :class="calendarTheme.gridBody({ class: ui?.gridBody })"
        >
          <Calendar.GridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            data-slot="gridRow"
            :class="calendarTheme.gridRow({ class: ui?.gridRow })"
          >
            <Calendar.Cell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              data-slot="cell"
              :class="calendarTheme.cell({ class: ui?.cell })"
            >
              <Calendar.CellTrigger
                :day="weekDate"
                :month="month.value"
                data-slot="cellTrigger"
                :class="calendarTheme.cellTrigger({ class: ui?.cellTrigger })"
              >
                <slot name="day" :day="weekDate">
                  {{ weekDate.day }}
                </slot>
              </Calendar.CellTrigger>
            </Calendar.Cell>
          </Calendar.GridRow>
        </Calendar.GridBody>
      </Calendar.Grid>
    </div>
  </Calendar.Root>
</template>
