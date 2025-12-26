import type { Meta, StoryObj } from '@storybook/vue3'
import Button from '@/components/Button.vue'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'plain', 'monochromePlain'],
      description: 'Button variant style (Polaris-inspired)'
    },
    tone: {
      control: 'select',
      options: ['default', 'success', 'critical'],
      description: 'Button tone/color'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size (sm=small, md=medium, lg=large)'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state'
    },
    square: {
      control: 'boolean',
      description: 'Square shape (icon only)'
    },
    block: {
      control: 'boolean',
      description: 'Full width button'
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Button type attribute'
    }
  },
  args: {
    variant: 'primary',
    tone: 'default',
    size: 'md',
    disabled: false,
    loading: false,
    square: false,
    block: false,
    type: 'button',
    label: 'Button'
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    tone: 'default',
    label: 'Primary Button'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    tone: 'default',
    label: 'Secondary Button'
  }
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    tone: 'default',
    label: 'Tertiary Button'
  }
}

export const Plain: Story = {
  args: {
    variant: 'plain',
    tone: 'default',
    label: 'Plain Button'
  }
}

export const MonochromePlain: Story = {
  args: {
    variant: 'monochromePlain',
    label: 'Monochrome Plain'
  }
}

export const Success: Story = {
  args: {
    variant: 'primary',
    tone: 'success',
    label: 'Success'
  }
}

export const Critical: Story = {
  args: {
    variant: 'primary',
    tone: 'critical',
    label: 'Critical'
  }
}

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Button'
  }
}

export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium Button'
  }
}

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Button'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Button'
  }
}

export const Loading: Story = {
  args: {
    loading: true,
    label: 'Loading...'
  }
}

export const Block: Story = {
  args: {
    block: true,
    label: 'Block Button'
  }
}

export const WithIcons: Story = {
  args: {
    leadingIcon: 'solar:add-circle-linear',
    trailingIcon: 'solar:arrow-right-linear',
    label: 'With Icons'
  }
}

export const IconOnly: Story = {
  args: {
    leadingIcon: 'solar:heart-linear',
    square: true,
    label: undefined
  }
}

export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="plain">Plain</Button>
          <Button variant="monochromePlain">Monochrome</Button>
        </div>
        <div class="flex flex-wrap gap-4">
          <Button variant="primary" tone="default">Default</Button>
          <Button variant="primary" tone="success">Success</Button>
          <Button variant="primary" tone="critical">Critical</Button>
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
    `
  })
}
