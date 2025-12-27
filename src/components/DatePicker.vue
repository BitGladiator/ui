<script lang="ts">
import type { ComponentPublicInstance } from 'vue'

export interface DatePickerProps {
  modelValue?: Date | string | { start: Date | string; end: Date | string } | null
  defaultValue?: Date | string | { start: Date | string; end: Date | string } | null
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

// Refs for hidden date inputs
const singleDateInputRef = ref<HTMLInputElement | null>(null)
const startDateInputRef = ref<HTMLInputElement | null>(null)
const endDateInputRef = ref<HTMLInputElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

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

function updateDisplayValues() {
  if (props.range) {
    // Handle range date
    const modelValue = props.modelValue as { start?: any; end?: any } | null
    if (modelValue && typeof modelValue === 'object') {
      displayStartValue.value = formatDate(modelValue.start)
      displayEndValue.value = formatDate(modelValue.end)
    } else {
      displayStartValue.value = ''
      displayEndValue.value = ''
    }
  } else {
    // Handle single date
    displayValue.value = formatDate(props.modelValue)
  }
}

function onUpdate(value: any) {
  const event = new Event('change', { target: { value } } as any)
  emits('change', event)
  emits('update:modelValue', value)
  updateDisplayValues()
}

function onSingleDateChange(event: Event) {
  const target = event.target as HTMLInputElement
  const date = target.value ? new Date(target.value) : null
  onUpdate(date)
}

function onStartDateChange(event: Event) {
  const target = event.target as HTMLInputElement
  const date = target.value ? new Date(target.value) : null
  const currentValue = props.modelValue as { start?: any; end?: any } || {}
  const newValue = { 
    start: date,
    end: currentValue.end || null
  }
  onUpdate(newValue)
}

function onEndDateChange(event: Event) {
  const target = event.target as HTMLInputElement
  const date = target.value ? new Date(target.value) : null
  const currentValue = props.modelValue as { start?: any; end?: any } || {}
  const newValue = { 
    start: currentValue.start || null,
    end: date
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

function triggerDatePicker() {
  if (props.disabled) return
  
  // Get the container position
  const container = containerRef.value
  if (!container) return
  
  const rect = container.getBoundingClientRect()
  
  if (!props.range) {
    // Create a temporary input element to trigger the date picker
    const tempInput = document.createElement('input')
    tempInput.type = 'date'
    tempInput.value = singleDateInputRef.value?.value || ''
    tempInput.min = singleDateInputRef.value?.min || ''
    tempInput.max = singleDateInputRef.value?.max || ''
    
    // Position it near the container for better UX
    tempInput.style.position = 'fixed'
    tempInput.style.top = `${rect.top}px`
    tempInput.style.left = `${rect.left}px`
    tempInput.style.width = `${rect.width}px`
    tempInput.style.height = `${rect.height}px`
    tempInput.style.opacity = '0'
    tempInput.style.zIndex = '9999'
    tempInput.style.pointerEvents = 'none'
    
    tempInput.onchange = (e) => {
      onSingleDateChange(e)
      cleanupTempInput(tempInput)
    }
    
    tempInput.onblur = () => {
      setTimeout(() => cleanupTempInput(tempInput), 100)
    }
    
    document.body.appendChild(tempInput)
    
    // Focus and trigger the picker
    setTimeout(() => {
      tempInput.focus()
      tempInput.showPicker?.() || tempInput.click()
    }, 50)
  } else {
    // For range, trigger start date picker
    const tempInput = document.createElement('input')
    tempInput.type = 'date'
    tempInput.value = startDateInputRef.value?.value || ''
    tempInput.min = startDateInputRef.value?.min || ''
    tempInput.max = startDateInputRef.value?.max || ''
    
    // Position it near the start date section
    tempInput.style.position = 'fixed'
    tempInput.style.top = `${rect.top}px`
    tempInput.style.left = `${rect.left}px`
    tempInput.style.width = `${rect.width / 2}px` // Approximate start section width
    tempInput.style.height = `${rect.height}px`
    tempInput.style.opacity = '0'
    tempInput.style.zIndex = '9999'
    tempInput.style.pointerEvents = 'none'
    
    tempInput.onchange = (e) => {
      onStartDateChange(e)
      cleanupTempInput(tempInput)
    }
    
    tempInput.onblur = () => {
      setTimeout(() => cleanupTempInput(tempInput), 100)
    }
    
    document.body.appendChild(tempInput)
    
    // Focus and trigger the picker
    setTimeout(() => {
      tempInput.focus()
      tempInput.showPicker?.() || tempInput.click()
    }, 50)
  }
}

function cleanupTempInput(tempInput: HTMLInputElement) {
  if (document.body.contains(tempInput)) {
    document.body.removeChild(tempInput)
  }
}

function handleResize() {
  checkMobile()
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', handleResize)
  updateDisplayValues()
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
  }
)
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
          @click="triggerDatePicker"
        />
        
        <!-- Hidden native date input -->
        <input
          ref="singleDateInputRef"
          type="date"
          :value="formatDateForInput(modelValue)"
          :min="minValue ? formatDateForInput(minValue) : undefined"
          :max="maxValue ? formatDateForInput(maxValue) : undefined"
          :disabled="props.disabled"
          @change="onSingleDateChange"
          class="hidden-date-input"
          style="display: none;"
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
            @click="triggerDatePicker"
          />
          
          <!-- Hidden native date input for start date -->
          <input
            ref="startDateInputRef"
            type="date"
            :value="formatDateForInput((modelValue as any)?.start)"
            :min="minValue ? formatDateForInput(minValue) : undefined"
            :max="maxValue ? formatDateForInput(maxValue) : undefined"
            :disabled="props.disabled"
            @change="onStartDateChange"
            class="hidden-date-input"
            style="display: none;"
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
            @click="() => {
              // For end date, create a separate trigger
              if (props.disabled) return
              const tempInput = document.createElement('input')
              tempInput.type = 'date'
              tempInput.value = endDateInputRef.value?.value || ''
              tempInput.min = endDateInputRef.value?.min || ''
              tempInput.max = endDateInputRef.value?.max || ''
              
              const rect = containerRef.value?.getBoundingClientRect()
              if (rect) {
                tempInput.style.position = 'fixed'
                tempInput.style.top = `${rect.top}px`
                tempInput.style.left = `${rect.left + rect.width * 0.6}px` // Position near end section
                tempInput.style.width = `${rect.width * 0.4}px`
                tempInput.style.height = `${rect.height}px`
                tempInput.style.opacity = '0'
                tempInput.style.zIndex = '9999'
                tempInput.style.pointerEvents = 'none'
              }
              
              tempInput.onchange = (e) => {
                onEndDateChange(e)
                if (document.body.contains(tempInput)) {
                  document.body.removeChild(tempInput)
                }
              }
              
              tempInput.onblur = () => {
                setTimeout(() => {
                  if (document.body.contains(tempInput)) {
                    document.body.removeChild(tempInput)
                  }
                }, 100)
              }
              
              document.body.appendChild(tempInput)
              
              setTimeout(() => {
                tempInput.focus()
                tempInput.showPicker?.() || tempInput.click()
              }, 50)
            }"
          />
          
          <!-- Hidden native date input for end date -->
          <input
            ref="endDateInputRef"
            type="date"
            :value="formatDateForInput((modelValue as any)?.end)"
            :min="minValue ? formatDateForInput(minValue) : undefined"
            :max="maxValue ? formatDateForInput(maxValue) : undefined"
            :disabled="props.disabled"
            @change="onEndDateChange"
            class="hidden-date-input"
            style="display: none;"
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
          <button
            v-else-if="trailingIcon"
            type="button"
            :disabled="props.disabled"
            class="calendar-icon-button"
            aria-label="Open calendar"
            @click="triggerDatePicker"
            @keydown.enter="triggerDatePicker"
            @keydown.space="triggerDatePicker"
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

/* Hidden date inputs */
.hidden-date-input {
  display: none !important;
}

/* Focus state for inputs */
.segments-wrapper input:focus:not(:disabled),
.range-section input:focus:not(:disabled) {
  outline: none;
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
</style>