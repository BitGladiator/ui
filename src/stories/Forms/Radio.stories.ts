import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Radio from '@/components/Radio.vue'
import { RadioGroupRoot } from 'reka-ui'

const meta = {
  title: 'Forms/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the radio button'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Color variant'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    }
  }
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

// Individual Radio components must be wrapped in RadioGroupRoot
export const Default: Story = {
  render: (args) => ({
    components: { Radio, RadioGroupRoot },
    setup() {
      const selected = ref('option1')
      return { args, selected }
    },
    template: `
      <RadioGroupRoot v-model="selected" class="flex flex-col gap-3">
        <Radio value="option1" label="Option 1" v-bind="args" />
        <Radio value="option2" label="Option 2" v-bind="args" />
        <Radio value="option3" label="Option 3" v-bind="args" />
      </RadioGroupRoot>
    `
  })
}

export const WithDescription: Story = {
  render: (args) => ({
    components: { Radio, RadioGroupRoot },
    setup() {
      const selected = ref('standard')
      return { args, selected }
    },
    template: `
      <RadioGroupRoot v-model="selected" class="flex flex-col gap-4">
        <Radio 
          value="standard" 
          label="Standard" 
          description="Perfect for small teams and personal projects"
          v-bind="args" 
        />
        <Radio 
          value="professional" 
          label="Professional" 
          description="Advanced features for growing businesses"
          v-bind="args" 
        />
        <Radio 
          value="enterprise" 
          label="Enterprise" 
          description="Unlimited access and priority support"
          v-bind="args" 
        />
      </RadioGroupRoot>
    `
  })
}

export const Horizontal: Story = {
  render: (args) => ({
    components: { Radio, RadioGroupRoot },
    setup() {
      const selected = ref('small')
      return { args, selected }
    },
    template: `
      <RadioGroupRoot v-model="selected" orientation="horizontal" class="flex flex-row gap-4">
        <Radio value="small" label="Small" v-bind="args" />
        <Radio value="medium" label="Medium" v-bind="args" />
        <Radio value="large" label="Large" v-bind="args" />
      </RadioGroupRoot>
    `
  })
}

export const WithDisabledOption: Story = {
  render: (args) => ({
    components: { Radio, RadioGroupRoot },
    setup() {
      const selected = ref('credit-card')
      return { args, selected }
    },
    template: `
      <RadioGroupRoot v-model="selected" class="flex flex-col gap-3">
        <Radio value="credit-card" label="Credit Card" v-bind="args" />
        <Radio value="paypal" label="PayPal" :disabled="true" v-bind="args" />
        <Radio value="bank-transfer" label="Bank Transfer" v-bind="args" />
      </RadioGroupRoot>
    `
  })
}

export const AllDisabled: Story = {
  render: (args) => ({
    components: { Radio, RadioGroupRoot },
    setup() {
      const selected = ref('option1')
      return { args, selected }
    },
    template: `
      <RadioGroupRoot v-model="selected" :disabled="true" class="flex flex-col gap-3">
        <Radio value="option1" label="Option 1" v-bind="args" />
        <Radio value="option2" label="Option 2" v-bind="args" />
        <Radio value="option3" label="Option 3" v-bind="args" />
      </RadioGroupRoot>
    `
  })
}

export const Small: Story = {
  render: (args) => ({
    components: { Radio, RadioGroupRoot },
    setup() {
      const selected = ref('xs')
      return { args, selected }
    },
    template: `
      <RadioGroupRoot v-model="selected" class="flex flex-col gap-3">
        <Radio value="xs" label="Extra Small" size="sm" v-bind="args" />
        <Radio value="sm" label="Small" size="sm" v-bind="args" />
        <Radio value="md" label="Medium" size="sm" v-bind="args" />
      </RadioGroupRoot>
    `
  })
}

export const Large: Story = {
  render: (args) => ({
    components: { Radio, RadioGroupRoot },
    setup() {
      const selected = ref('large')
      return { args, selected }
    },
    template: `
      <RadioGroupRoot v-model="selected" class="flex flex-col gap-3">
        <Radio value="large" label="Large Size" size="lg" v-bind="args" />
        <Radio value="xlarge" label="Extra Large" size="lg" v-bind="args" />
      </RadioGroupRoot>
    `
  })
}

export const Success: Story = {
  render: (args) => ({
    components: { Radio, RadioGroupRoot },
    setup() {
      const selected = ref('yes')
      return { args, selected }
    },
    template: `
      <RadioGroupRoot v-model="selected" class="flex flex-col gap-3">
        <Radio value="yes" label="Yes, I agree" color="success" v-bind="args" />
        <Radio value="no" label="No, I disagree" color="success" v-bind="args" />
      </RadioGroupRoot>
    `
  })
}

export const AllColors: Story = {
  render: () => ({
    components: { Radio, RadioGroupRoot },
    setup() {
      const primary = ref('1')
      const success = ref('2')
      const warning = ref('3')
      const error = ref('4')

      return { primary, success, warning, error }
    },
    template: `
      <div class="space-y-6">
        <div>
          <h4 class="text-sm font-semibold mb-2">Primary</h4>
          <RadioGroupRoot v-model="primary" class="flex flex-col gap-3">
            <Radio value="1" label="Option 1" color="primary" />
            <Radio value="2" label="Option 2" color="primary" />
          </RadioGroupRoot>
        </div>
        <div>
          <h4 class="text-sm font-semibold mb-2">Success</h4>
          <RadioGroupRoot v-model="success" class="flex flex-col gap-3">
            <Radio value="1" label="Option 1" color="success" />
            <Radio value="2" label="Option 2" color="success" />
          </RadioGroupRoot>
        </div>
        <div>
          <h4 class="text-sm font-semibold mb-2">Warning</h4>
          <RadioGroupRoot v-model="warning" class="flex flex-col gap-3">
            <Radio value="1" label="Option 1" color="warning" />
            <Radio value="2" label="Option 2" color="warning" />
          </RadioGroupRoot>
        </div>
        <div>
          <h4 class="text-sm font-semibold mb-2">Error</h4>
          <RadioGroupRoot v-model="error" class="flex flex-col gap-3">
            <Radio value="1" label="Option 1" color="error" />
            <Radio value="2" label="Option 2" color="error" />
          </RadioGroupRoot>
        </div>
      </div>
    `
  })
}

export const PaymentMethod: Story = {
  render: () => ({
    components: { Radio, RadioGroupRoot },
    setup() {
      const selected = ref('card')
      return { selected }
    },
    template: `
      <div class="max-w-md p-6 bg-white rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
        <RadioGroupRoot v-model="selected" class="flex flex-col gap-4">
          <Radio 
            value="card" 
            label="Credit Card" 
            description="Pay with Visa, Mastercard, or American Express"
          />
          <Radio 
            value="paypal" 
            label="PayPal" 
            description="Secure payment through your PayPal account"
          />
          <Radio 
            value="bank" 
            label="Bank Transfer" 
            description="Direct transfer from your bank account"
          />
        </RadioGroupRoot>
        <div class="mt-6 pt-4 border-t border-gray-200">
          <p class="text-sm text-gray-600">
            Selected: <strong>{{ selected }}</strong>
          </p>
        </div>
      </div>
    `
  })
}
