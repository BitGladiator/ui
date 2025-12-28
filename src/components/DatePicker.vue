<script lang="ts">
import type { ComponentPublicInstance } from 'vue'

export interface DatePickerProps {
  modelValue?:
    | Date
    | string
    | { start: Date | string; end: Date | string }
    | null
  defaultValue?:
    | Date
    | string
    | { start: Date | string; end: Date | string }
    | null
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
  range?: boolean
  disabled?: boolean
  minValue?: Date | string
  maxValue?: Date | string
  placeholder?: string
  class?: any
  ui?: Record<string, any>
}

export interface DatePickerEmits {
  'update:modelValue': [date: DatePickerProps['modelValue']]
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

<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
  useSlots,
  watch,
  onUnmounted,
  nextTick
} from 'vue'
import theme from '@/themes/date-picker'
import Icon from './Icon.vue'
import {
  PopoverRoot,
  PopoverContent,
  PopoverTrigger,
  CalendarRoot,
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev
} from 'reka-ui'
import {
  CalendarDate,
  getLocalTimeZone,
  today,
  isSameDay,
  DateValue
} from '@internationalized/date'

const props = withDefaults(defineProps<DatePickerProps>(), {
  size: 'md',
  variant: 'outline',
  color: 'primary',
  trailingIcon: 'solar:calendar-linear',
  separatorIcon: 'solar:minus-linear',
  autofocusDelay: 0,
  range: false,
  placeholder: 'Select date...',
  modelValue: null,
  defaultValue: null,
  disabled: false
})

const emits = defineEmits<DatePickerEmits>()
const slots = useSlots()

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

const isMobile = ref(false)
const displayValue = ref('')
const displayStartValue = ref('')
const displayEndValue = ref('')
const isPopoverOpen = ref(false)
// For range mode - track which part is being edited
const editingRangePart = ref<'start' | 'end'>('start')

// Calendar refs - use CalendarDate for reka-ui compatibility
const calendarValue = ref<CalendarDate | undefined>(undefined)
const calendarStartValue = ref<CalendarDate | undefined>(undefined)
const calendarEndValue = ref<CalendarDate | undefined>(undefined)

// Helper function to check if value is a valid date
function isValidDate(value: any): boolean {
  if (!value) return false
  const date = new Date(value)
  return !isNaN(date.getTime())
}

// Helper to convert any value to Date if valid
function toDateIfValid(value: any): Date | null {
  if (!value) return null
  const date = new Date(value)
  return !isNaN(date.getTime()) ? date : null
}

function formatDate(value: any): string {
  const date = toDateIfValid(value)
  if (!date) return ''

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function formatDateForInput(value: any): string {
  const date = toDateIfValid(value)
  if (!date) return ''

  // Format as YYYY-MM-DD for date input
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function toCalendarDate(
  date: Date | string | null | undefined
): CalendarDate | undefined {
  if (!date) return undefined

  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return undefined

    return new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate())
  } catch (e) {
    console.error('Error converting to CalendarDate:', e)
    return undefined
  }
}

// Convert CalendarDate back to Date
function fromCalendarDate(calendarDate: CalendarDate | undefined): Date | null {
  if (!calendarDate) return null
  return new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day)
}

// Update display values from modelValue
function updateDisplayValues() {
  if (props.range) {
    // Handle range date
    const modelValue = props.modelValue as { start?: any; end?: any } | null
    if (modelValue && typeof modelValue === 'object') {
      displayStartValue.value = formatDate(modelValue.start)
      displayEndValue.value = formatDate(modelValue.end)
      // Update calendar values
      calendarStartValue.value = toCalendarDate(modelValue.start)
      calendarEndValue.value = toCalendarDate(modelValue.end)
    } else {
      displayStartValue.value = ''
      displayEndValue.value = ''
      calendarStartValue.value = undefined
      calendarEndValue.value = undefined
    }
  } else {
    // Handle single date
    displayValue.value = formatDate(props.modelValue)
    // Update calendar value when prop changes
    calendarValue.value = toCalendarDate(props.modelValue as Date)
  }
}

function onUpdate(value: any) {
  console.log('Date updated:', value)

  const event = new Event('change', { target: { value } } as any)
  emits('change', event)
  emits('update:modelValue', value)
  updateDisplayValues()
}

// Handle single date selection from calendar
function handleSingleDateSelect(value: DateValue) {
  console.log('Single date selected:', value)
  
  if (!value) return
  
  const date = fromCalendarDate(value as CalendarDate)
  if (date) {
    onUpdate(date)
    calendarValue.value = value as CalendarDate
  }
  isPopoverOpen.value = false
}

// Handle range date selection from calendar
function handleRangeDateSelect(value: DateValue) {
  console.log('Range date selected:', value, 'for part:', editingRangePart.value)
  
  if (!value) return
  
  const date = fromCalendarDate(value as CalendarDate)
  if (!date) return

  const currentValue = (props.modelValue as { start?: any; end?: any }) || {}
  let newValue

  if (editingRangePart.value === 'start') {
    newValue = {
      start: date,
      end: currentValue.end || null
    }
    calendarStartValue.value = value as CalendarDate
    // Switch to editing end date
    editingRangePart.value = 'end'
    // Don't close popover yet - wait for end date selection
  } else {
    newValue = {
      start: currentValue.start || null,
      end: date
    }
    calendarEndValue.value = value as CalendarDate
    
    // Close popover after both dates are selected
    if (newValue.start && newValue.end) {
      // Ensure start is before end
      if (new Date(newValue.start) > new Date(newValue.end)) {
        // Swap dates if start is after end
        const temp = newValue.start
        newValue.start = newValue.end
        newValue.end = temp
      }
      isPopoverOpen.value = false
    }
  }

  onUpdate(newValue)
}

function onBlur(event: FocusEvent) {
  emits('blur', event)
}

function onFocus(event: FocusEvent) {
  emits('focus', event)
}

function checkMobile() {
  isMobile.value = window.innerWidth < 640
}

function cleanupTempInput(tempInput: HTMLInputElement) {
  if (document.body.contains(tempInput)) {
    document.body.removeChild(tempInput)
  }
}

// Add this function back
function handleResize() {
  checkMobile()
}

// Open calendar popover for specific range part
function openCalendarForRange(part: 'start' | 'end') {
  if (props.disabled) return
  editingRangePart.value = part
  isPopoverOpen.value = true
}

// Get the appropriate calendar value for the current mode
const currentCalendarValue = computed<CalendarDate | undefined>(() => {
  if (props.range) {
    return editingRangePart.value === 'start' 
      ? calendarStartValue.value 
      : calendarEndValue.value
  } else {
    return calendarValue.value
  }
})

// Debug function
function logCalendarState() {
  console.log('Calendar state:')
  console.log('- calendarValue:', calendarValue.value)
  console.log('- calendarStartValue:', calendarStartValue.value)
  console.log('- calendarEndValue:', calendarEndValue.value)
  console.log('- currentCalendarValue:', currentCalendarValue.value)
  console.log('- isPopoverOpen:', isPopoverOpen.value)
  console.log('- editingRangePart:', editingRangePart.value)
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', handleResize)
  updateDisplayValues()

  // Initialize calendar value with today's date if no value is set
  if (!props.range) {
    if (!calendarValue.value) {
      calendarValue.value =
        toCalendarDate(props.modelValue as Date) || today(getLocalTimeZone())
    }
  } else {
    if (!calendarStartValue.value) {
      calendarStartValue.value = today(getLocalTimeZone())
    }
    if (!calendarEndValue.value) {
      calendarEndValue.value = today(getLocalTimeZone())
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

watch(
  () => props.modelValue,
  () => {
    updateDisplayValues()
  },
  { immediate: true, deep: true }
)

watch(
  () => props.range,
  () => {
    // Reset display values when switching between single/range mode
    updateDisplayValues()
    editingRangePart.value = 'start'
  }
)

watch(isPopoverOpen, (open) => {
  if (open) {
    console.log('Calendar popover opened')
    logCalendarState()
  }
})
</script>

<template>
  <div
    ref="containerRef"
    :class="[
      datePickerTheme.base({ class: [ui?.base, props.class] }),
      'date-picker-container',
      { 'range-picker': range, 'mobile-view': isMobile }
    ]"
  >
    <div
      class="date-picker-inner"
      :class="{
        'range-inner': range,
        'disabled-state': disabled
      }"
      @click="!disabled && !range && (isPopoverOpen = true)"
    >
      <!-- Leading Icon Slot -->
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

      <!-- Single Date Display -->
      <div v-if="!range" class="segments-wrapper">
        <input
          type="text"
          :value="displayValue"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          :class="datePickerTheme.segment({ class: ui?.segment })"
          readonly
          @blur="onBlur"
          @focus="onFocus"
          :aria-label="props.placeholder"
          @click.stop="!disabled && (isPopoverOpen = true)"
        />
      </div>

      <!-- Range Date Display -->
      <div v-else class="range-wrapper">
        <div class="range-section start-section">
          <input
            type="text"
            :value="displayStartValue"
            placeholder="Start date"
            :disabled="props.disabled"
            :class="datePickerTheme.segment({ class: ui?.segment })"
            readonly
            @blur="onBlur"
            @focus="onFocus"
            aria-label="Start date"
            @click.stop="openCalendarForRange('start')"
          />
        </div>

        <span class="separator-wrapper">
          <slot name="separator">
            <Icon
              :name="separatorIcon"
              :class="
                datePickerTheme.separatorIcon({ class: ui?.separatorIcon })
              "
              aria-hidden="true"
            />
          </slot>
        </span>

        <div class="range-section end-section">
          <input
            type="text"
            :value="displayEndValue"
            placeholder="End date"
            :disabled="props.disabled"
            :class="datePickerTheme.segment({ class: ui?.segment })"
            readonly
            @blur="onBlur"
            @focus="onFocus"
            aria-label="End date"
            @click.stop="openCalendarForRange('end')"
          />
        </div>
      </div>

      <!-- Default Slot -->
      <slot />

      <!-- Trailing Calendar Icon -->
      <span
        v-if="
          props.trailing ||
          props.trailingIcon ||
          props.loading ||
          slots.trailing
        "
        :class="[
          datePickerTheme.trailing({ class: ui?.trailing }),
          'date-picker-trailing'
        ]"
      >
        <slot name="trailing">
          <!-- Loading Spinner -->
          <Icon
            v-if="props.loading"
            name="solar:loader-2-linear"
            :class="[
              datePickerTheme.trailingIcon({ class: ui?.trailingIcon }),
              'animate-spin'
            ]"
            aria-label="Loading"
          />

          <!-- Calendar Icon Button -->
          <PopoverRoot v-else-if="trailingIcon" v-model:open="isPopoverOpen">
            <PopoverTrigger as-child>
              <button
                type="button"
                :disabled="props.disabled"
                class="calendar-icon-button"
                :aria-label="
                  range
                    ? 'Open calendar for ' + editingRangePart + ' date'
                    : 'Open calendar'
                "
                @click.stop
              >
                <Icon
                  :name="trailingIcon"
                  :class="[
                    datePickerTheme.trailingIcon({ class: ui?.trailingIcon }),
                    'calendar-icon'
                  ]"
                  aria-hidden="true"
                />
              </button>
            </PopoverTrigger>

            <PopoverContent
              side="bottom"
              align="end"
              :side-offset="5"
              class="date-picker-calendar-popover w-auto p-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg focus:outline-none"
              style="z-index: 9999"
              @pointer-down-outside="isPopoverOpen = false"
            >
              <!-- Single Date Calendar -->
              <div v-if="!range">
                <CalendarRoot
                  v-slot="{ grid, weekDays }"
                  :model-value="calendarValue"
                  :default-value="calendarValue || today(getLocalTimeZone())"
                  :placeholder="today(getLocalTimeZone())"
                  :min-value="toCalendarDate(minValue)"
                  :max-value="toCalendarDate(maxValue)"
                  class="p-3"
                  @update:modelValue="handleSingleDateSelect"
                >
                  <CalendarHeader
                    class="flex items-center justify-between mb-4"
                  >
                    <CalendarPrev
                      class="inline-flex items-center justify-center rounded-md text-sm font-medium p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer disabled:opacity-50 transition-colors"
                    >
                      <Icon
                        name="solar:alt-arrow-left-linear"
                        class="w-4 h-4"
                      />
                    </CalendarPrev>
                    <CalendarHeading class="font-semibold text-sm" />
                    <CalendarNext
                      class="inline-flex items-center justify-center rounded-md text-sm font-medium p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer disabled:opacity-50 transition-colors"
                    >
                      <Icon
                        name="solar:alt-arrow-right-linear"
                        class="w-4 h-4"
                      />
                    </CalendarNext>
                  </CalendarHeader>

                  <CalendarGrid
                    v-for="(month, monthIndex) in grid"
                    :key="`month-${monthIndex}`"
                    class="w-full"
                  >
                    <CalendarGridHead>
                      <CalendarGridRow class="flex mb-1">
                        <CalendarHeadCell
                          v-for="day in weekDays"
                          :key="day"
                          class="text-gray-500 w-9 font-normal text-xs flex items-center justify-center py-2"
                        >
                          {{ day }}
                        </CalendarHeadCell>
                      </CalendarGridRow>
                    </CalendarGridHead>
                    <CalendarGridBody>
                      <CalendarGridRow
                        v-for="(weekDates, weekIndex) in month.rows"
                        :key="`week-${weekIndex}`"
                        class="flex w-full"
                      >
                        <CalendarCell
                          v-for="(weekDate, dayIndex) in weekDates"
                          :key="`day-${weekIndex}-${dayIndex}`"
                          :date="weekDate"
                          class="relative p-0 text-center text-sm"
                        >
                          <CalendarCellTrigger
                            :day="weekDate"
                            :month="month.value"
                            class="inline-flex items-center justify-center rounded-md text-sm font-normal h-9 w-9 p-0 m-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-primary data-[selected]:text-white data-[today]:border data-[today]:border-primary data-[outside-view]:text-gray-400 data-[outside-view]:opacity-40 cursor-pointer transition-colors"
                          />
                        </CalendarCell>
                      </CalendarGridRow>
                    </CalendarGridBody>
                  </CalendarGrid>
                </CalendarRoot>
              </div>

              <!-- Range Date Calendar -->
              <div v-else>
                <CalendarRoot
                  v-slot="{ grid, weekDays }"
                  :model-value="currentCalendarValue"
                  :default-value="currentCalendarValue || today(getLocalTimeZone())"
                  :placeholder="today(getLocalTimeZone())"
                  :min-value="toCalendarDate(minValue)"
                  :max-value="toCalendarDate(maxValue)"
                  class="p-3"
                  @update:modelValue="handleRangeDateSelect"
                >
                  <div class="mb-3 text-sm font-medium text-center">
                    Select {{ editingRangePart }} date
                  </div>
                  <CalendarHeader
                    class="flex items-center justify-between mb-4"
                  >
                    <CalendarPrev
                      class="inline-flex items-center justify-center rounded-md text-sm font-medium p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer disabled:opacity-50 transition-colors"
                    >
                      <Icon
                        name="solar:alt-arrow-left-linear"
                        class="w-4 h-4"
                      />
                    </CalendarPrev>
                    <CalendarHeading class="font-semibold text-sm" />
                    <CalendarNext
                      class="inline-flex items-center justify-center rounded-md text-sm font-medium p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer disabled:opacity-50 transition-colors"
                    >
                      <Icon
                        name="solar:alt-arrow-right-linear"
                        class="w-4 h-4"
                      />
                    </CalendarNext>
                  </CalendarHeader>

                  <CalendarGrid
                    v-for="(month, monthIndex) in grid"
                    :key="`month-${monthIndex}`"
                    class="w-full"
                  >
                    <CalendarGridHead>
                      <CalendarGridRow class="flex mb-1">
                        <CalendarHeadCell
                          v-for="day in weekDays"
                          :key="day"
                          class="text-gray-500 w-9 font-normal text-xs flex items-center justify-center py-2"
                        >
                          {{ day }}
                        </CalendarHeadCell>
                      </CalendarGridRow>
                    </CalendarGridHead>
                    <CalendarGridBody>
                      <CalendarGridRow
                        v-for="(weekDates, weekIndex) in month.rows"
                        :key="`week-${weekIndex}`"
                        class="flex w-full"
                      >
                        <CalendarCell
                          v-for="(weekDate, dayIndex) in weekDates"
                          :key="`day-${weekIndex}-${dayIndex}`"
                          :date="weekDate"
                          class="relative p-0 text-center text-sm"
                        >
                          <CalendarCellTrigger
                            :day="weekDate"
                            :month="month.value"
                            class="inline-flex items-center justify-center rounded-md text-sm font-normal h-9 w-9 p-0 m-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-primary data-[selected]:text-white data-[today]:border data-[today]:border-primary data-[outside-view]:text-gray-400 data-[outside-view]:opacity-40 cursor-pointer transition-colors"
                          />
                        </CalendarCell>
                      </CalendarGridRow>
                    </CalendarGridBody>
                  </CalendarGrid>
                </CalendarRoot>
              </div>
            </PopoverContent>
          </PopoverRoot>
        </slot>
      </span>
    </div>
  </div>
</template>

<style scoped>
.date-picker-container {
  position: relative;
  transition: all 0.2s ease;
  width: 100%;
}

.date-picker-inner {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  flex-wrap: nowrap;
  overflow: hidden;
  padding: 0.5rem 0.75rem;
  border: 1px solid hsl(var(--border));
  border-radius: 0.375rem;
  background-color: hsl(var(--background));
  min-height: 2.5rem;
  gap: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.date-picker-inner:hover:not(.disabled-state) {
  border-color: hsl(var(--input));
}

.date-picker-inner:focus-within:not(.disabled-state) {
  border-color: hsl(var(--primary));
  box-shadow: 0 0 0 2px hsl(var(--primary) / 0.1);
  outline: none;
}

/* Disabled state */
.date-picker-inner.disabled-state {
  opacity: 0.6;
  background-color: hsl(var(--muted) / 0.1);
  cursor: not-allowed;
}

.date-picker-inner.disabled-state * {
  cursor: not-allowed;
}

.segments-wrapper {
  display: flex;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.segments-wrapper input {
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.875rem;
  color: hsl(var(--foreground));
  font-family: inherit;
  padding: 0;
  cursor: pointer;
  user-select: none;
}

.segments-wrapper input:disabled {
  cursor: not-allowed;
  color: hsl(var(--muted-foreground));
}

.segments-wrapper input::placeholder {
  color: hsl(var(--muted-foreground));
}

.date-picker-leading,
.date-picker-trailing {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(var(--muted-foreground));
}

.calendar-icon-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: hsl(var(--muted-foreground));
  border-radius: 0.25rem;
  user-select: none;
  outline: none;
}

.calendar-icon-button:hover:not(:disabled) {
  color: hsl(var(--foreground));
  background-color: hsl(var(--accent) / 0.5);
}

.calendar-icon-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.calendar-icon-button:not(:disabled):active {
  transform: scale(0.95);
}

.calendar-icon-button:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}

.calendar-icon {
  transition: all 0.2s ease;
  width: 1.25rem;
  height: 1.25rem;
}

.range-picker .date-picker-inner {
  gap: 0.5rem;
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

.range-section input {
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.875rem;
  color: hsl(var(--foreground));
  font-family: inherit;
  padding: 0;
  cursor: pointer;
  user-select: none;
}

.range-section input:disabled {
  cursor: not-allowed;
  color: hsl(var(--muted-foreground));
}

.range-section input::placeholder {
  color: hsl(var(--muted-foreground));
}

.separator-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(var(--muted-foreground));
  user-select: none;
}

/* Mobile Styles */
.mobile-view .date-picker-inner {
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;
  padding: 0.75rem;
}

.mobile-view .range-wrapper {
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-view .range-section {
  width: 100%;
}

.mobile-view .separator-wrapper {
  display: none;
}

@media (max-width: 640px) {
  .date-picker-inner:not(.range-inner) {
    padding: 0.5rem;
  }

  .date-picker-inner {
    min-height: 2.75rem;
  }
}

/* Loading animation */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Improve clickable area */
.calendar-icon-button {
  min-width: 2rem;
  min-height: 2rem;
}

/* Ensure text inputs are clickable too */
.segments-wrapper input,
.range-section input {
  cursor: pointer;
}

.segments-wrapper input:disabled,
.range-section input:disabled {
  cursor: not-allowed;
}

/* Add visual feedback for clickable areas */
.date-picker-inner:not(.disabled-state):active {
  transform: translateY(1px);
}

/* Improve mobile touch targets */
@media (hover: none) and (pointer: coarse) {
  .date-picker-inner {
    min-height: 3rem;
  }

  .calendar-icon-button {
    min-width: 2.5rem;
    min-height: 2.5rem;
    padding: 0.375rem;
  }

  .calendar-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
}

/* Calendar popover styles */
.date-picker-calendar-popover {
  animation: fadeIn 0.2s ease-out;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<style>
/* Global style to ensure popover is on top */
.date-picker-calendar-popover {
  z-index: 9999 !important;
}
</style>