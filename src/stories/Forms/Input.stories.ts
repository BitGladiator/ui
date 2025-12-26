import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Input from '@/components/Input.vue'

const meta = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input'
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error'],
      description: 'Color variant'
    },
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'ghost'],
      description: 'Visual variant style'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state'
    },
    required: {
      control: 'boolean',
      description: 'Required field'
    }
  }
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  }),
  args: {
    placeholder: 'Enter text...'
  }
}

export const WithLabel: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  }),
  args: {
    label: 'Full Name',
    placeholder: 'John Doe'
  }
}

export const Required: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  }),
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    required: true
  }
}

export const WithHint: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  }),
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    hint: 'Choose a unique username'
  }
}

export const WithError: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('invalid-email')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  }),
  args: {
    label: 'Email',
    type: 'email',
    color: 'error',
    error: 'Please enter a valid email address'
  }
}

export const WithSuccess: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('user@example.com')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  }),
  args: {
    label: 'Email',
    type: 'email',
    color: 'success',
    hint: 'Email is available'
  }
}

export const WithLeadingIcon: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <Input v-model="value" v-bind="args">
        <template #leading>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </template>
      </Input>
    `
  }),
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com'
  }
}

export const WithTrailingIcon: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <Input v-model="value" v-bind="args">
        <template #trailing>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </template>
      </Input>
    `
  }),
  args: {
    type: 'search',
    placeholder: 'Search...'
  }
}

export const Password: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      const showPassword = ref(false)

      return { args, value, showPassword }
    },
    template: `
      <Input
        v-model="value"
        v-bind="args"
        :type="showPassword ? 'text' : 'password'"
      >
        <template #trailing>
          <button
            @click="showPassword = !showPassword"
            type="button"
            class="hover:text-gray-600"
          >
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          </button>
        </template>
      </Input>
    `
  }),
  args: {
    label: 'Password',
    placeholder: 'Enter your password'
  }
}

export const Disabled: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('Disabled value')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  }),
  args: {
    label: 'Disabled Input',
    disabled: true
  }
}

export const Readonly: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('Readonly value')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  }),
  args: {
    label: 'Readonly Input',
    readonly: true
  }
}

export const Small: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  }),
  args: {
    label: 'Small Input',
    size: 'sm',
    placeholder: 'Small size'
  }
}

export const Large: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  }),
  args: {
    label: 'Large Input',
    size: 'lg',
    placeholder: 'Large size'
  }
}

export const FilledVariant: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  }),
  args: {
    label: 'Filled Input',
    variant: 'filled',
    placeholder: 'Filled variant'
  }
}

export const GhostVariant: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  }),
  args: {
    label: 'Ghost Input',
    variant: 'ghost',
    placeholder: 'Ghost variant'
  }
}

export const AllVariants: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const outline = ref('')
      const filled = ref('')
      const ghost = ref('')
      return { outline, filled, ghost }
    },
    template: `
      <div class="space-y-4">
        <Input v-model="outline" variant="outline" label="Outline" placeholder="Outline variant" />
        <Input v-model="filled" variant="filled" label="Filled" placeholder="Filled variant" />
        <Input v-model="ghost" variant="ghost" label="Ghost" placeholder="Ghost variant" />
      </div>
    `
  })
}

export const FormExample: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const firstName = ref('')
      const lastName = ref('')
      const email = ref('')
      const phone = ref('')

      return { firstName, lastName, email, phone }
    },
    template: `
      <form class="space-y-4 max-w-md">
        <div class="grid grid-cols-2 gap-4">
          <Input
            v-model="firstName"
            label="First Name"
            placeholder="John"
            required
          />
          <Input
            v-model="lastName"
            label="Last Name"
            placeholder="Doe"
            required
          />
        </div>

        <Input
          v-model="email"
          type="email"
          label="Email Address"
          placeholder="john.doe@example.com"
          required
        >
          <template #leading>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </template>
        </Input>

        <Input
          v-model="phone"
          type="tel"
          label="Phone Number"
          placeholder="+1 (555) 000-0000"
          hint="Include country code"
        >
          <template #leading>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </template>
        </Input>
      </form>
    `
  })
}
