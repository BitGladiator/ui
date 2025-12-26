import type { Meta, StoryObj } from '@storybook/vue3'
import Chip from '@/components/Chip.vue'
import Avatar from '@/components/Avatar.vue'

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text'
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'error',
        'neutral'
      ]
    },
    size: {
      control: 'select',
      options: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left']
    },
    inset: {
      control: 'boolean'
    },
    standalone: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof Chip>

export const Default: Story = {
  args: {
    text: '5',
    standalone: true
  }
}

export const Colors: Story = {
  render: () => ({
    components: { Chip },
    template: `
      <div class="flex items-center gap-4">
        <Chip text="3" color="primary" standalone />
        <Chip text="5" color="secondary" standalone />
        <Chip text="2" color="success" standalone />
        <Chip text="1" color="info" standalone />
        <Chip text="4" color="warning" standalone />
        <Chip text="9" color="error" standalone />
        <Chip text="7" color="neutral" standalone />
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { Chip },
    template: `
      <div class="flex items-center gap-4">
        <Chip size="3xs" standalone />
        <Chip size="2xs" standalone />
        <Chip size="xs" text="5" standalone />
        <Chip size="sm" text="5" standalone />
        <Chip size="md" text="5" standalone />
        <Chip size="lg" text="10" standalone />
        <Chip size="xl" text="99" standalone />
        <Chip size="2xl" text="99" standalone />
        <Chip size="3xl" text="99" standalone />
      </div>
    `
  })
}

export const OnAvatar: Story = {
  render: () => ({
    components: { Chip, Avatar },
    template: `
      <div class="flex items-center gap-8">
        <Chip text="3" color="success" position="top-right">
          <Avatar src="https://i.pravatar.cc/150?img=1" />
        </Chip>

        <Chip text="5" color="error" position="top-left">
          <Avatar src="https://i.pravatar.cc/150?img=2" />
        </Chip>

        <Chip text="2" color="warning" position="bottom-right">
          <Avatar src="https://i.pravatar.cc/150?img=3" />
        </Chip>

        <Chip text="99" color="primary" position="bottom-left">
          <Avatar src="https://i.pravatar.cc/150?img=4" />
        </Chip>
      </div>
    `
  })
}

export const Inset: Story = {
  render: () => ({
    components: { Chip, Avatar },
    template: `
      <div class="flex items-center gap-8">
        <Chip color="success" position="top-right" inset>
          <Avatar src="https://i.pravatar.cc/150?img=1" />
        </Chip>

        <Chip text="3" color="error" position="top-right" inset>
          <Avatar src="https://i.pravatar.cc/150?img=2" />
        </Chip>

        <Chip color="warning" position="bottom-right" inset>
          <Avatar src="https://i.pravatar.cc/150?img=3" />
        </Chip>
      </div>
    `
  })
}
