import type { Meta, StoryObj } from '@storybook/vue3'
import Textarea from '@/components/Textarea.vue'

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the textarea'
    },
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'flushed', 'unstyled'],
      description: 'Visual variant'
    },
    color: {
      control: 'select',
      options: ['primary', 'error', 'success', 'warning', 'info'],
      description: 'Color theme'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state'
    },
    resize: {
      control: 'boolean',
      description: 'Show resize handle'
    },
    autoresize: {
      control: 'boolean',
      description: 'Auto-resize based on content'
    }
  },
  args: {
    placeholder: 'Enter text...',
    size: 'md',
    variant: 'outline',
    color: 'primary',
    rows: 4,
    resize: true,
    autoresize: false
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Filled: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Filled textarea...'
  }
}

export const WithLabel: Story = {
  args: {
    placeholder: 'Enter your message...'
  },
  render: (args) => ({
    components: { Textarea },
    setup() {
      return { args }
    },
    template: `
      <div>
        <label class="block text-sm font-medium mb-2">Message</label>
        <Textarea v-bind="args" />
      </div>
    `
  })
}

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: 'This textarea is disabled'
  }
}

export const WithResize: Story = {
  args: {
    resize: true,
    placeholder: 'You can resize this textarea...'
  }
}

export const AutoResize: Story = {
  args: {
    autoresize: true,
    resize: false,
    placeholder: 'This textarea grows with content...',
    rows: 2
  }
}

export const Error: Story = {
  args: {
    color: 'error',
    placeholder: 'Error state...'
  }
}

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large textarea...'
  }
}
