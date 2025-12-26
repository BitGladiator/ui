import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Switch from '@/components/Switch.vue'

const meta = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the switch'
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error'],
      description: 'Color variant'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    required: {
      control: 'boolean',
      description: 'Required field'
    }
  }
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<Switch v-model="checked" v-bind="args" />'
  })
}

export const WithLabel: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<Switch v-model="checked" v-bind="args" />'
  }),
  args: {
    label: 'Enable notifications'
  }
}

export const WithDescription: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<Switch v-model="checked" v-bind="args" />'
  }),
  args: {
    label: 'Marketing emails',
    description: 'Receive emails about new products and features'
  }
}

export const Disabled: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<Switch v-model="checked" v-bind="args" />'
  }),
  args: {
    label: 'Disabled switch',
    disabled: true
  }
}

export const Required: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<Switch v-model="checked" v-bind="args" />'
  }),
  args: {
    label: 'Accept terms and conditions',
    required: true
  }
}

export const Small: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<Switch v-model="checked" v-bind="args" />'
  }),
  args: {
    size: 'sm',
    label: 'Small switch'
  }
}

export const Large: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<Switch v-model="checked" v-bind="args" />'
  }),
  args: {
    size: 'lg',
    label: 'Large switch'
  }
}

export const Success: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<Switch v-model="checked" v-bind="args" />'
  }),
  args: {
    color: 'success',
    label: 'Success color'
  }
}

export const Warning: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<Switch v-model="checked" v-bind="args" />'
  }),
  args: {
    color: 'warning',
    label: 'Warning color'
  }
}

export const Error: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<Switch v-model="checked" v-bind="args" />'
  }),
  args: {
    color: 'error',
    label: 'Error color'
  }
}

export const AllColors: Story = {
  render: () => ({
    components: { Switch },
    setup() {
      const primary = ref(true)
      const success = ref(true)
      const warning = ref(true)
      const error = ref(true)
      return { primary, success, warning, error }
    },
    template: `
      <div class="space-y-4">
        <Switch v-model="primary" color="primary" label="Primary" />
        <Switch v-model="success" color="success" label="Success" />
        <Switch v-model="warning" color="warning" label="Warning" />
        <Switch v-model="error" color="error" label="Error" />
      </div>
    `
  })
}

export const AllSizes: Story = {
  render: () => ({
    components: { Switch },
    setup() {
      const sm = ref(true)
      const md = ref(true)
      const lg = ref(true)
      return { sm, md, lg }
    },
    template: `
      <div class="space-y-4">
        <Switch v-model="sm" size="sm" label="Small" />
        <Switch v-model="md" size="md" label="Medium" />
        <Switch v-model="lg" size="lg" label="Large" />
      </div>
    `
  })
}

export const SettingsExample: Story = {
  render: () => ({
    components: { Switch },
    setup() {
      const notifications = ref(true)
      const marketing = ref(false)
      const analytics = ref(true)
      const darkMode = ref(false)

      return { notifications, marketing, analytics, darkMode }
    },
    template: `
      <div class="max-w-md space-y-6 p-6 bg-white rounded-lg border border-gray-200">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Settings</h3>

          <div class="space-y-4">
            <Switch
              v-model="notifications"
              label="Push notifications"
              description="Receive push notifications on your device"
            />

            <Switch
              v-model="marketing"
              label="Marketing emails"
              description="Receive emails about new products and features"
            />

            <Switch
              v-model="analytics"
              label="Analytics"
              description="Help us improve by sharing anonymous usage data"
            />

            <Switch
              v-model="darkMode"
              label="Dark mode"
              description="Use dark theme across the application"
            />
          </div>
        </div>
      </div>
    `
  })
}
