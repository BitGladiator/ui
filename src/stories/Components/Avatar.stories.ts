import type { Meta, StoryObj } from '@storybook/vue3'
import Avatar from '@/components/Avatar.vue'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    src: {
      control: 'text'
    },
    alt: {
      control: 'text'
    },
    icon: {
      control: 'text'
    },
    text: {
      control: 'text'
    }
  }
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    alt: 'John Doe'
  }
}

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'John Doe'
  }
}

export const WithText: Story = {
  args: {
    text: 'JV',
    alt: 'John Doe'
  }
}

export const WithIcon: Story = {
  args: {
    icon: '👤',
    alt: 'User'
  }
}

export const Sizes: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <Avatar size="sm" text="SM" />
        <Avatar size="md" text="MD" />
        <Avatar size="lg" text="LG" />
      </div>
    `
  })
}

export const WithChip: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=2',
    alt: 'Jane Doe',
    chip: {
      position: 'bottom-right'
    }
  }
}

export const Fallback: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <Avatar src="invalid-url" alt="John Doe" />
        <Avatar src="invalid-url" alt="Jane Smith" />
        <Avatar src="invalid-url" alt="Bob Johnson" />
        <Avatar src="invalid-url" icon="👤" />
        <Avatar src="invalid-url" text="JV" />
      </div>
    `
  })
}
