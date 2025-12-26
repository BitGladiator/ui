import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Checkbox from '@/components/Checkbox.vue'

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox'
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
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  })
}

export const Checked: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  })
}

export const WithLabel: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  }),
  args: {
    label: 'Accept terms and conditions'
  }
}

export const WithDescription: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  }),
  args: {
    label: 'Email notifications',
    description: 'Receive email notifications about your account activity'
  }
}

export const Disabled: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  }),
  args: {
    label: 'Disabled checkbox',
    disabled: true
  }
}

export const DisabledChecked: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  }),
  args: {
    label: 'Disabled and checked',
    disabled: true
  }
}

export const Required: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  }),
  args: {
    label: 'I agree to the terms and conditions',
    required: true
  }
}

export const Small: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  }),
  args: {
    size: 'sm',
    label: 'Small checkbox'
  }
}

export const Large: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  }),
  args: {
    size: 'lg',
    label: 'Large checkbox'
  }
}

export const Success: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  }),
  args: {
    color: 'success',
    label: 'Success color'
  }
}

export const Warning: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  }),
  args: {
    color: 'warning',
    label: 'Warning color'
  }
}

export const ErrorColor: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<Checkbox v-model="checked" v-bind="args" />'
  }),
  args: {
    color: 'error',
    label: 'Error color'
  }
}

export const AllColors: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const primary = ref(true)
      const success = ref(true)
      const warning = ref(true)
      const error = ref(true)
      return { primary, success, warning, error }
    },
    template: `
      <div class="space-y-4">
        <Checkbox v-model="primary" color="primary" label="Primary" />
        <Checkbox v-model="success" color="success" label="Success" />
        <Checkbox v-model="warning" color="warning" label="Warning" />
        <Checkbox v-model="error" color="error" label="Error" />
      </div>
    `
  })
}

export const AllSizes: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const sm = ref(true)
      const md = ref(true)
      const lg = ref(true)
      return { sm, md, lg }
    },
    template: `
      <div class="space-y-4">
        <Checkbox v-model="sm" size="sm" label="Small" />
        <Checkbox v-model="md" size="md" label="Medium" />
        <Checkbox v-model="lg" size="lg" label="Large" />
      </div>
    `
  })
}

export const CheckboxGroup: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const notifications = ref(true)
      const newsletter = ref(false)
      const updates = ref(true)
      const marketing = ref(false)

      return { notifications, newsletter, updates, marketing }
    },
    template: `
      <div class="space-y-4">
        <h3 class="font-semibold text-gray-900">Email preferences</h3>
        <div class="space-y-3">
          <Checkbox
            v-model="notifications"
            label="Notifications"
            description="Receive notifications about your account activity"
          />
          <Checkbox
            v-model="newsletter"
            label="Newsletter"
            description="Weekly newsletter with product updates"
          />
          <Checkbox
            v-model="updates"
            label="Product updates"
            description="Get notified about new features and improvements"
          />
          <Checkbox
            v-model="marketing"
            label="Marketing emails"
            description="Receive promotional content and special offers"
          />
        </div>
      </div>
    `
  })
}

export const FormExample: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const remember = ref(false)
      const terms = ref(false)
      const newsletter = ref(false)

      return { remember, terms, newsletter }
    },
    template: `
      <form class="max-w-md space-y-6 p-6 bg-white rounded-lg border border-gray-200">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Sign up</h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="••••••••"
              />
            </div>

            <div class="space-y-3 pt-2">
              <Checkbox
                v-model="remember"
                label="Remember me"
              />

              <Checkbox
                v-model="terms"
                label="I agree to the terms and conditions"
                required
              />

              <Checkbox
                v-model="newsletter"
                label="Subscribe to newsletter"
                description="Get weekly updates about new features"
              />
            </div>

            <button
              type="submit"
              class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Sign up
            </button>
          </div>
        </div>
      </form>
    `
  })
}
