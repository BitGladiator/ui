import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import PinInput from '@/components/PinInput.vue'

const meta = {
  title: 'Forms/PinInput',
  component: PinInput,
  tags: ['autodocs'],
  argTypes: {
    length: {
      control: 'number',
      description: 'Number of PIN digits'
    },
    mask: {
      control: 'boolean',
      description: 'Mask input values'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    }
  }
} satisfies Meta<typeof PinInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { PinInput },
    setup() {
      const pin = ref('')
      return { args, pin }
    },
    template: `
      <div class="space-y-4">
        <PinInput v-model="pin" v-bind="args" />
        <p class="text-sm text-gray-600">Current value: {{ pin || '(empty)' }}</p>
      </div>
    `
  }),
  args: {
    length: 4
  }
}

export const SixDigits: Story = {
  render: () => ({
    components: { PinInput },
    setup() {
      const pin = ref('')
      return { pin }
    },
    template: `
      <div class="space-y-4">
        <label class="block text-sm font-medium mb-2">Enter 6-digit PIN</label>
        <PinInput v-model="pin" :length="6" />
      </div>
    `
  })
}

export const Masked: Story = {
  render: () => ({
    components: { PinInput },
    setup() {
      const pin = ref('')
      return { pin }
    },
    template: `
      <div class="space-y-4">
        <label class="block text-sm font-medium mb-2">Enter PIN (masked)</label>
        <PinInput v-model="pin" :length="4" mask />
      </div>
    `
  })
}

export const Disabled: Story = {
  render: () => ({
    components: { PinInput },
    setup() {
      const pin = ref('1234')
      return { pin }
    },
    template: '<PinInput v-model="pin" :length="4" disabled />'
  })
}

export const VerificationCode: Story = {
  render: () => ({
    components: { PinInput },
    setup() {
      const code = ref('')
      return { code }
    },
    template: `
      <div class="max-w-md space-y-4">
        <h3 class="text-lg font-semibold">Verify your email</h3>
        <p class="text-sm text-gray-600">
          We've sent a 6-digit verification code to your email.
        </p>
        <PinInput v-model="code" :length="6" />
        <button class="px-4 py-2 bg-primary text-white rounded-md text-sm">
          Verify
        </button>
      </div>
    `
  })
}
