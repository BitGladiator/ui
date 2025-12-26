import type { Meta, StoryObj } from '@storybook/vue3'
import Stats from '@/components/Stats.vue'

const meta: Meta<typeof Stats> = {
  title: 'DataDisplay/Stats',
  component: Stats,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Total Revenue',
    value: 45231,
    prefix: '$'
  }
}

export const WithChange: Story = {
  args: {
    label: 'Monthly Sales',
    value: 12345,
    prefix: '$',
    change: 12.5,
    changePeriod: 'from last month'
  }
}

export const WithProgress: Story = {
  args: {
    label: 'Goal Progress',
    value: 8420,
    prefix: '$',
    suffix: ' / $10,000',
    progress: 84.2,
    showProgress: true,
    color: 'success'
  }
}

export const WithIcon: Story = {
  args: {
    label: 'Active Users',
    value: 2543,
    icon: 'i-lucide-users',
    change: 8.2,
    changePeriod: 'vs last week',
    color: 'primary'
  }
}

export const WithTrend: Story = {
  args: {
    label: 'Website Traffic',
    value: '125.6K',
    description: 'Page views this month',
    change: 15.3,
    trend: [20, 25, 15, 30, 40, 35, 50, 45, 60, 55, 70, 65]
  }
}

export const Sizes: Story = {
  render: () => ({
    components: { Stats },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stats 
          size="sm"
          label="Small Stats"
          :value="1234"
          prefix="$"
          icon="i-lucide-dollar-sign"
        />
        <Stats 
          size="md"
          label="Medium Stats"
          :value="5678"
          prefix="$"
          icon="i-lucide-dollar-sign"
        />
        <Stats 
          size="lg"
          label="Large Stats"
          :value="9012"
          prefix="$"
          icon="i-lucide-dollar-sign"
        />
      </div>
    `
  })
}

export const Colors: Story = {
  render: () => ({
    components: { Stats },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Stats 
          label="Revenue"
          :value="45231"
          prefix="$"
          icon="i-lucide-dollar-sign"
          color="primary"
          :change="12.5"
        />
        <Stats 
          label="Profit"
          :value="18420"
          prefix="$"
          icon="i-lucide-trending-up"
          color="success"
          :change="8.2"
        />
        <Stats 
          label="Pending"
          :value="342"
          icon="i-lucide-clock"
          color="warning"
          :change="-2.1"
        />
        <Stats 
          label="Errors"
          :value="12"
          icon="i-lucide-alert-triangle"
          color="error"
          :change="5.3"
        />
        <Stats 
          label="Info"
          :value="1543"
          icon="i-lucide-info"
          color="info"
          :change="0"
        />
        <Stats 
          label="Default"
          :value="9876"
          icon="i-lucide-activity"
          color="default"
          :change="-1.2"
        />
      </div>
    `
  })
}

export const Dashboard: Story = {
  render: () => ({
    components: { Stats },
    template: `
      <div>
        <h3 class="text-lg font-semibold mb-4">Analytics Dashboard</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Stats 
            label="Total Revenue"
            :value="145231"
            prefix="$"
            icon="i-lucide-dollar-sign"
            color="success"
            :change="12.5"
            changePeriod="from last month"
            :trend="[100, 120, 110, 140, 135, 160, 150, 170, 165, 185, 180, 200]"
          />
          <Stats 
            label="Active Users"
            :value="12543"
            icon="i-lucide-users"
            color="primary"
            :change="8.2"
            changePeriod="from last week"
            :trend="[50, 60, 55, 70, 75, 65, 80, 85, 90, 95, 100, 110]"
          />
          <Stats 
            label="Conversion Rate"
            value="3.24%"
            icon="i-lucide-percent"
            color="info"
            :change="-0.5"
            changePeriod="from yesterday"
            :trend="[3.1, 3.2, 3.15, 3.3, 3.25, 3.4, 3.35, 3.2, 3.18, 3.24]"
          />
          <Stats 
            label="Bounce Rate"
            value="45.2%"
            icon="i-lucide-trending-down"
            color="warning"
            :change="-2.1"
            changePeriod="improvement"
            :trend="[50, 48, 49, 46, 47, 45, 44, 46, 45.5, 45.2]"
          />
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Stats 
            label="Monthly Goal"
            :value="84200"
            prefix="$"
            suffix=" / $100,000"
            icon="i-lucide-target"
            color="primary"
            :progress="84.2"
            :show-progress="true"
            description="Target completion for this month"
          />
          <Stats 
            label="Team Performance"
            :value="92"
            suffix="%"
            icon="i-lucide-award"
            color="success"
            :progress="92"
            :show-progress="true"
            description="Overall team productivity score"
          />
        </div>
      </div>
    `
  })
}

export const Horizontal: Story = {
  args: {
    label: 'Revenue Today',
    value: 12345,
    prefix: '$',
    icon: 'i-lucide-dollar-sign',
    change: 5.2,
    orientation: 'horizontal',
    color: 'success'
  }
}

export const Loading: Story = {
  args: {
    label: 'Loading Data',
    value: 0,
    loading: true,
    icon: 'i-lucide-loader'
  }
}
