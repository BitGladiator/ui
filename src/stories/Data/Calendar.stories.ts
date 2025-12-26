import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { CalendarDate } from '@internationalized/date'
import Calendar from '@/components/Calendar.vue'

const meta = {
  title: 'Data/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'subtle']
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info', 'neutral']
    },
    disabled: {
      control: 'boolean'
    }
  }
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args: any) => ({
    components: { Calendar },
    setup() {
      const date = ref(new CalendarDate(2024, 12, 18))
      return { args, date }
    },
    template: '<Calendar v-model="date" v-bind="args" />'
  }),
  args: {
    size: 'md',
    variant: 'solid',
    color: 'primary'
  }
}

export const Sizes: Story = {
  render: () => ({
    components: { Calendar },
    setup() {
      const date = ref(new CalendarDate(2024, 12, 18))
      return { date }
    },
    template: `
      <div class="flex flex-wrap gap-8">
        <div>
          <p class="text-sm font-medium mb-3 text-muted-foreground">Small</p>
          <Calendar v-model="date" size="sm" />
        </div>
        <div>
          <p class="text-sm font-medium mb-3 text-muted-foreground">Medium (Default)</p>
          <Calendar v-model="date" size="md" />
        </div>
        <div>
          <p class="text-sm font-medium mb-3 text-muted-foreground">Large</p>
          <Calendar v-model="date" size="lg" />
        </div>
      </div>
    `
  })
}

export const Variants: Story = {
  render: () => ({
    components: { Calendar },
    setup() {
      const solidDate = ref(new CalendarDate(2024, 12, 18))
      const outlineDate = ref(new CalendarDate(2024, 12, 20))
      const softDate = ref(new CalendarDate(2024, 12, 22))
      const subtleDate = ref(new CalendarDate(2024, 12, 24))
      return { solidDate, outlineDate, softDate, subtleDate }
    },
    template: `
      <div class="flex flex-wrap gap-8">
        <div>
          <p class="text-sm font-medium mb-3 text-muted-foreground">Solid (Default)</p>
          <Calendar v-model="solidDate" variant="solid" />
        </div>
        <div>
          <p class="text-sm font-medium mb-3 text-muted-foreground">Outline</p>
          <Calendar v-model="outlineDate" variant="outline" />
        </div>
        <div>
          <p class="text-sm font-medium mb-3 text-muted-foreground">Soft</p>
          <Calendar v-model="softDate" variant="soft" />
        </div>
        <div>
          <p class="text-sm font-medium mb-3 text-muted-foreground">Subtle</p>
          <Calendar v-model="subtleDate" variant="subtle" />
        </div>
      </div>
    `
  })
}

export const Colors: Story = {
  render: () => ({
    components: { Calendar },
    setup() {
      const primaryDate = ref(new CalendarDate(2024, 12, 18))
      const successDate = ref(new CalendarDate(2024, 12, 19))
      const errorDate = ref(new CalendarDate(2024, 12, 20))
      return { primaryDate, successDate, errorDate }
    },
    template: `
      <div class="flex flex-wrap gap-8">
        <div>
          <p class="text-sm font-medium mb-3 text-muted-foreground">Primary (Default)</p>
          <Calendar v-model="primaryDate" color="primary" />
        </div>
        <div>
          <p class="text-sm font-medium mb-3 text-muted-foreground">Success</p>
          <Calendar v-model="successDate" color="success" />
        </div>
        <div>
          <p class="text-sm font-medium mb-3 text-muted-foreground">Error</p>
          <Calendar v-model="errorDate" color="error" />
        </div>
      </div>
    `
  })
}

export const WithMinMax: Story = {
  render: () => ({
    components: { Calendar },
    setup() {
      const date = ref(new CalendarDate(2024, 12, 18))
      const minValue = new CalendarDate(2024, 12, 10)
      const maxValue = new CalendarDate(2024, 12, 25)
      return { date, minValue, maxValue }
    },
    template: `
      <div>
        <p class="text-sm text-muted-foreground mb-4">Only dates between Dec 10-25, 2024 are selectable</p>
        <Calendar v-model="date" :min-value="minValue" :max-value="maxValue" />
      </div>
    `
  })
}

export const TodayIndicator: Story = {
  render: () => ({
    components: { Calendar },
    setup() {
      const today = new CalendarDate(2024, 12, 18)
      const date = ref(today)
      return { date }
    },
    template: `
      <div>
        <p class="text-sm text-muted-foreground mb-4">Today's date (Dec 18) is highlighted with accent background</p>
        <Calendar v-model="date" />
      </div>
    `
  })
}

export const Disabled: Story = {
  render: () => ({
    components: { Calendar },
    setup() {
      const date = ref(new CalendarDate(2024, 12, 18))
      return { date }
    },
    template: '<Calendar v-model="date" disabled />'
  })
}

export const DisabledDates: Story = {
  render: () => ({
    components: { Calendar },
    setup() {
      const date = ref(new CalendarDate(2024, 12, 18))
      const isDateDisabled = (dateValue: any) => {
        // Disable weekends
        const dayOfWeek = dateValue.toDate('UTC').getDay()
        return dayOfWeek === 0 || dayOfWeek === 6
      }
      return { date, isDateDisabled }
    },
    template: `
      <div>
        <p class="text-sm text-muted-foreground mb-4">Weekends are disabled</p>
        <Calendar v-model="date" :is-date-disabled="isDateDisabled" />
      </div>
    `
  })
}

export const CustomStartDate: Story = {
  render: () => ({
    components: { Calendar },
    setup() {
      const date = ref(new CalendarDate(2025, 1, 15))
      const defaultValue = new CalendarDate(2025, 1, 1)
      return { date, defaultValue }
    },
    template: `
      <div>
        <p class="text-sm text-muted-foreground mb-4">Starting at January 2025</p>
        <Calendar v-model="date" :default-value="defaultValue" />
      </div>
    `
  })
}

export const CustomIcons: Story = {
  render: () => ({
    components: { Calendar },
    setup() {
      const date = ref(new CalendarDate(2024, 12, 18))
      return { date }
    },
    template: `
      <div>
        <p class="text-sm text-muted-foreground mb-4">Custom navigation icons</p>
        <Calendar 
          v-model="date" 
          prev-year-icon="solar:round-double-alt-arrow-left-linear"
          prev-month-icon="solar:round-alt-arrow-left-linear"
          next-month-icon="solar:round-alt-arrow-right-linear"
          next-year-icon="solar:round-double-alt-arrow-right-linear"
        />
      </div>
    `
  })
}

export const MonthYearOnly: Story = {
  render: () => ({
    components: { Calendar },
    setup() {
      const date1 = ref(new CalendarDate(2024, 12, 18))
      const date2 = ref(new CalendarDate(2024, 12, 18))
      return { date1, date2 }
    },
    template: `
      <div class="flex flex-wrap gap-8">
        <div>
          <p class="text-sm font-medium mb-3 text-muted-foreground">Month Controls Only</p>
          <Calendar v-model="date1" :year-controls="false" />
        </div>
        <div>
          <p class="text-sm font-medium mb-3 text-muted-foreground">Year Controls Only</p>
          <Calendar v-model="date2" :month-controls="false" />
        </div>
      </div>
    `
  })
}
