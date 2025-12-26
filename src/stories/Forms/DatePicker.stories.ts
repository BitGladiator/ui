import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { CalendarDate, type DateValue } from '@internationalized/date'
import DatePicker from '../../components/DatePicker.vue'

const meta = {
  title: 'Forms/DatePicker',
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
    }
  }
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { DatePicker },
    setup() {
      const date = ref(new CalendarDate(2024, 12, 18))
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
      const date = ref(undefined)
      return { date }
    },
    template: '<DatePicker v-model="date" />'
  })
}

export const WithDefaultValue: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const defaultValue = new CalendarDate(2024, 12, 25)
      return { defaultValue }
    },
    template: '<DatePicker :default-value="defaultValue" />'
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref(new CalendarDate(2024, 12, 18))
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
      const date = ref(new CalendarDate(2024, 12, 18))
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
      const date = ref(new CalendarDate(2024, 12, 18))
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
      const date = ref(new CalendarDate(2024, 12, 18))
      return { date }
    },
    template: `
      <div class="space-y-4">
        <div>
          <p class="text-xs text-muted-foreground mb-2">With leading icon</p>
          <DatePicker v-model="date" leading-icon="solar:calendar-linear" />
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
        start: new CalendarDate(2024, 12, 10),
        end: new CalendarDate(2024, 12, 20)
      })
      return { dateRange }
    },
    template: `
      <div>
        <p class="text-xs text-muted-foreground mb-2">Select a date range</p>
        <DatePicker v-model="dateRange" range />
        <p class="text-xs text-muted-foreground mt-2">
          Selected: {{ dateRange?.start?.toString() }} - {{ dateRange?.end?.toString() }}
        </p>
      </div>
    `
  })
}

export const RangeEmpty: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const dateRange = ref(undefined)
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
        start: new CalendarDate(2024, 12, 10),
        end: new CalendarDate(2024, 12, 20)
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
      const date = ref(new CalendarDate(2024, 12, 15))
      const minDate = new CalendarDate(2024, 12, 1)
      const maxDate = new CalendarDate(2024, 12, 31)
      return { date, minDate, maxDate }
    },
    template: `
      <div>
        <p class="text-xs text-muted-foreground mb-2">Date limited to December 2024</p>
        <DatePicker v-model="date" :min-value="minDate" :max-value="maxDate" />
        <p class="text-xs text-muted-foreground mt-2">
          Min: {{ minDate.toString() }}, Max: {{ maxDate.toString() }}
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
        start: new CalendarDate(2024, 12, 10),
        end: new CalendarDate(2024, 12, 20)
      })
      const minDate = new CalendarDate(2024, 12, 1)
      const maxDate = new CalendarDate(2024, 12, 31)
      return { dateRange, minDate, maxDate }
    },
    template: `
      <div>
        <p class="text-xs text-muted-foreground mb-2">Date range limited to December 2024</p>
        <DatePicker v-model="dateRange" range :min-value="minDate" :max-value="maxDate" />
        <p class="text-xs text-muted-foreground mt-2">
          Range: {{ dateRange?.start?.toString() }} - {{ dateRange?.end?.toString() }}
        </p>
      </div>
    `
  })
}

export const WithUnavailableDates: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref(new CalendarDate(2024, 12, 18))
      const isDateUnavailable = (dateValue: DateValue) => {
        // Disable weekends
        const dayOfWeek = dateValue.toDate('UTC').getDay()
        return dayOfWeek === 0 || dayOfWeek === 6
      }
      return { date, isDateUnavailable }
    },
    template: `
      <div>
        <p class="text-xs text-muted-foreground mb-2">Weekends are unavailable</p>
        <DatePicker v-model="date" :is-date-unavailable="isDateUnavailable" />
      </div>
    `
  })
}

export const Disabled: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref(new CalendarDate(2024, 12, 18))
      return { date }
    },
    template: '<DatePicker v-model="date" disabled />'
  })
}

export const ReadOnly: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref(new CalendarDate(2024, 12, 18))
      return { date }
    },
    template: '<DatePicker v-model="date" readonly />'
  })
}

export const Loading: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref(new CalendarDate(2024, 12, 18))
      return { date }
    },
    template: '<DatePicker v-model="date" loading />'
  })
}

export const WithGranularity: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref(new CalendarDate(2024, 12, 18))
      return { date }
    },
    template: `
      <div class="space-y-4">
        <div>
          <p class="text-xs text-muted-foreground mb-2">Day granularity (default)</p>
          <DatePicker v-model="date" granularity="day" />
        </div>
      </div>
    `
  })
}
