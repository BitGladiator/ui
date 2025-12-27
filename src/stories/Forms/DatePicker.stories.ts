import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import DatePicker from '../../components/DatePicker.vue'

const meta = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the date picker'
    },
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'ghost', 'soft', 'none'],
      description: 'Visual variant'
    },
    color: {
      control: 'select',
      options: ['primary', 'error', 'success', 'warning', 'info'],
      description: 'Color scheme'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the date picker'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner'
    },
    range: {
      control: 'boolean',
      description: 'Enable range selection'
    },
    leadingIcon: {
      control: 'text',
      description: 'Leading icon name'
    },
    trailingIcon: {
      control: 'text',
      description: 'Trailing icon name'
    },
    separatorIcon: {
      control: 'text',
      description: 'Separator icon for range mode'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    minValue: {
      control: 'date',
      description: 'Minimum selectable date'
    },
    maxValue: {
      control: 'date',
      description: 'Maximum selectable date'
    }
  },
  args: {
    size: 'md',
    variant: 'outline',
    color: 'primary',
    placeholder: 'Select date...',
    disabled: false,
    loading: false,
    range: false,
    trailingIcon: 'solar:calendar-linear'
  }
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

// Helper function to create dates
const createDate = (year: number, month: number, day: number): Date => {
  return new Date(year, month - 1, day)
}

export const Default: Story = {
  render: (args) => ({
    components: { DatePicker },
    setup() {
      // Use Date objects, not CalendarDate
      const date = ref<Date | null>(createDate(2024, 12, 18))
      return { args, date }
    },
    template: '<DatePicker v-model="date" v-bind="args" />'
  }),
  args: {}
}

export const Empty: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(null)
      return { date }
    },
    template: '<DatePicker v-model="date" />'
  })
}

export const WithDefaultValue: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const defaultValue = createDate(2024, 12, 25)
      return { defaultValue }
    },
    template: '<DatePicker :default-value="defaultValue" />'
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(createDate(2024, 12, 18))
      return { date }
    },
    template: `
      <div class="space-y-4">
        <div>
          <p class="text-xs text-muted-foreground mb-2">Small</p>
          <DatePicker v-model="date" size="sm" />
        </div>
        <div>
          <p class="text-xs text-muted-foreground mb-2">Medium (Default)</p>
          <DatePicker v-model="date" size="md" />
        </div>
        <div>
          <p class="text-xs text-muted-foreground mb-2">Large</p>
          <DatePicker v-model="date" size="lg" />
        </div>
      </div>
    `
  })
}

export const Variants: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(createDate(2024, 12, 18))
      return { date }
    },
    template: `
      <div class="space-y-4">
        <div>
          <p class="text-xs text-muted-foreground mb-2">Outline (Default)</p>
          <DatePicker v-model="date" variant="outline" />
        </div>
        <div>
          <p class="text-xs text-muted-foreground mb-2">Filled</p>
          <DatePicker v-model="date" variant="filled" />
        </div>
        <div>
          <p class="text-xs text-muted-foreground mb-2">Ghost</p>
          <DatePicker v-model="date" variant="ghost" />
        </div>
        <div>
          <p class="text-xs text-muted-foreground mb-2">Soft</p>
          <DatePicker v-model="date" variant="soft" />
        </div>
        <div>
          <p class="text-xs text-muted-foreground mb-2">None</p>
          <DatePicker v-model="date" variant="none" />
        </div>
      </div>
    `
  })
}

export const Colors: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(createDate(2024, 12, 18))
      return { date }
    },
    template: `
      <div class="space-y-4">
        <div>
          <p class="text-xs text-muted-foreground mb-2">Primary</p>
          <DatePicker v-model="date" color="primary" />
        </div>
        <div>
          <p class="text-xs text-muted-foreground mb-2">Success</p>
          <DatePicker v-model="date" color="success" />
        </div>
        <div>
          <p class="text-xs text-muted-foreground mb-2">Warning</p>
          <DatePicker v-model="date" color="warning" />
        </div>
        <div>
          <p class="text-xs text-muted-foreground mb-2">Error</p>
          <DatePicker v-model="date" color="error" />
        </div>
        <div>
          <p class="text-xs text-muted-foreground mb-2">Info</p>
          <DatePicker v-model="date" color="info" />
        </div>
      </div>
    `
  })
}

export const WithIcons: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(createDate(2024, 12, 18))
      return { date }
    },
    template: `
      <div class="space-y-4">
        <div>
          <p class="text-xs text-muted-foreground mb-2">With leading icon</p>
          <DatePicker v-model="date" leading-icon="solar:calendar-bold" />
        </div>
        <div>
          <p class="text-xs text-muted-foreground mb-2">With trailing icon (default)</p>
          <DatePicker v-model="date" />
        </div>
        <div>
          <p class="text-xs text-muted-foreground mb-2">Custom trailing icon</p>
          <DatePicker v-model="date" trailing-icon="solar:calendar-mark-linear" />
        </div>
      </div>
    `
  })
}

export const Range: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const dateRange = ref({
        start: createDate(2024, 12, 10),
        end: createDate(2024, 12, 20)
      })
      return { dateRange }
    },
    template: `
      <div>
        <p class="text-xs text-muted-foreground mb-2">Select a date range</p>
        <DatePicker v-model="dateRange" range />
        <p class="text-xs text-muted-foreground mt-2">
          Selected: {{ dateRange?.start?.toLocaleDateString() }} - {{ dateRange?.end?.toLocaleDateString() }}
        </p>
      </div>
    `
  })
}

export const RangeEmpty: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const dateRange = ref({ start: null, end: null })
      return { dateRange }
    },
    template: `
      <div>
        <p class="text-xs text-muted-foreground mb-2">Empty date range</p>
        <DatePicker v-model="dateRange" range />
      </div>
    `
  })
}

export const RangeCustomSeparator: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const dateRange = ref({
        start: createDate(2024, 12, 10),
        end: createDate(2024, 12, 20)
      })
      return { dateRange }
    },
    template: `
      <div>
        <p class="text-xs text-muted-foreground mb-2">Custom separator icon</p>
        <DatePicker v-model="dateRange" range separator-icon="solar:arrow-right-linear" />
      </div>
    `
  })
}

export const WithMinMaxDates: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(createDate(2024, 12, 15))
      const minDate = createDate(2024, 12, 1)
      const maxDate = createDate(2024, 12, 31)
      return { date, minDate, maxDate }
    },
    template: `
      <div>
        <p class="text-xs text-muted-foreground mb-2">Date limited to December 2024</p>
        <DatePicker v-model="date" :min-value="minDate" :max-value="maxDate" />
        <p class="text-xs text-muted-foreground mt-2">
          Min: {{ minDate.toLocaleDateString() }}, Max: {{ maxDate.toLocaleDateString() }}
        </p>
      </div>
    `
  })
}

export const RangeWithMinMax: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const dateRange = ref({
        start: createDate(2024, 12, 10),
        end: createDate(2024, 12, 20)
      })
      const minDate = createDate(2024, 12, 1)
      const maxDate = createDate(2024, 12, 31)
      return { dateRange, minDate, maxDate }
    },
    template: `
      <div>
        <p class="text-xs text-muted-foreground mb-2">Date range limited to December 2024</p>
        <DatePicker v-model="dateRange" range :min-value="minDate" :max-value="maxDate" />
        <p class="text-xs text-muted-foreground mt-2">
          Range: {{ dateRange?.start?.toLocaleDateString() }} - {{ dateRange?.end?.toLocaleDateString() }}
        </p>
      </div>
    `
  })
}

export const Disabled: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(createDate(2024, 12, 18))
      return { date }
    },
    template: '<DatePicker v-model="date" disabled />'
  })
}

export const Loading: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(createDate(2024, 12, 18))
      return { date }
    },
    template: '<DatePicker v-model="date" loading />'
  })
}

export const WithPlaceholder: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(null)
      return { date }
    },
    template: '<DatePicker v-model="date" placeholder="Choose a date..." />'
  })
}

export const WithAutofocus: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(null)
      return { date }
    },
    template: '<DatePicker v-model="date" autofocus />'
  })
}

// Combined example showing different states
export const AllStates: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const singleDate = ref<Date | null>(createDate(2024, 12, 18))
      const rangeDate = ref({
        start: createDate(2024, 12, 10),
        end: createDate(2024, 12, 20)
      })
      const emptyDate = ref<Date | null>(null)
      const disabledDate = ref<Date | null>(createDate(2024, 12, 18))
      
      return { singleDate, rangeDate, emptyDate, disabledDate }
    },
    template: `
      <div class="space-y-6 p-4">
        <div>
          <h3 class="text-sm font-medium mb-3">Single Date Picker</h3>
          <div class="space-y-4">
            <DatePicker v-model="singleDate" placeholder="Select date..." />
            <DatePicker v-model="emptyDate" placeholder="No date selected" />
            <DatePicker v-model="disabledDate" disabled placeholder="Disabled" />
          </div>
        </div>
        
        <div>
          <h3 class="text-sm font-medium mb-3">Range Date Picker</h3>
          <div class="space-y-4">
            <DatePicker v-model="rangeDate" range placeholder="Select date range..." />
            <DatePicker v-model="rangeDate" range separator-icon="solar:arrow-right-linear" />
          </div>
        </div>
        
        <div>
          <h3 class="text-sm font-medium mb-3">Different Colors</h3>
          <div class="space-y-4">
            <DatePicker v-model="singleDate" color="primary" />
            <DatePicker v-model="singleDate" color="success" />
            <DatePicker v-model="singleDate" color="error" />
          </div>
        </div>
        
        <div>
          <h3 class="text-sm font-medium mb-3">Different Variants</h3>
          <div class="space-y-4">
            <DatePicker v-model="singleDate" variant="outline" />
            <DatePicker v-model="singleDate" variant="filled" />
            <DatePicker v-model="singleDate" variant="ghost" />
          </div>
        </div>
      </div>
    `
  })
}