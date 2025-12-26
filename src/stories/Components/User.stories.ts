import type { Meta, StoryObj } from '@storybook/vue3'
import User from '@/components/User.vue'

const meta: Meta<typeof User> = {
  title: 'Components/User',
  component: User,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text'
    },
    description: {
      control: 'text'
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
type Story = StoryObj<typeof User>

export const Default: Story = {
  args: {
    name: 'Mario Rossi',
    description: 'Full Stack Developer',
    avatar: {
      text: 'MR'
    }
  }
}

export const WithImage: Story = {
  args: {
    name: 'Jane Smith',
    description: 'Product Designer',
    avatar: {
      src: 'https://i.pravatar.cc/150?img=5'
    }
  }
}

export const Vertical: Story = {
  args: {
    name: 'John Doe',
    description: 'Software Engineer',
    orientation: 'vertical',
    avatar: {
      src: 'https://i.pravatar.cc/150?img=3'
    }
  }
}

export const Sizes: Story = {
  render: () => ({
    components: { User },
    template: `
      <div class="space-y-4">
        <User
          name="Tiny User"
          description="Size 3xs"
          size="3xs"
          :avatar="{ text: 'TU' }"
        />
        <User
          name="Small User"
          description="Size xs"
          size="xs"
          :avatar="{ text: 'SU' }"
        />
        <User
          name="Medium User"
          description="Size md"
          size="md"
          :avatar="{ text: 'MU' }"
        />
        <User
          name="Large User"
          description="Size lg"
          size="lg"
          :avatar="{ text: 'LU' }"
        />
      </div>
    `
  })
}

export const WithLink: Story = {
  args: {
    name: 'Alice Johnson',
    description: 'Click to view profile',
    to: '/profile/alice',
    avatar: {
      src: 'https://i.pravatar.cc/150?img=10'
    }
  }
}

export const WithChip: Story = {
  args: {
    name: 'Bob Wilson',
    description: 'Online now',
    avatar: {
      src: 'https://i.pravatar.cc/150?img=8'
    },
    chip: {
      color: 'success',
      position: 'bottom-right'
    }
  }
}

export const UserList: Story = {
  render: () => ({
    components: { User },
    template: `
      <div class="space-y-2 max-w-md">
        <User
          name="Mario Rossi"
          description="Administrator"
          :avatar="{ text: 'MR' }"
          to="/users/1"
        />
        <User
          name="Luigi Verdi"
          description="Editor"
          :avatar="{ text: 'LV' }"
          to="/users/2"
        />
        <User
          name="Anna Bianchi"
          description="Viewer"
          :avatar="{ text: 'AB' }"
          to="/users/3"
        />
        <User
          name="Carlo Neri"
          description="Guest"
          :avatar="{ text: 'CN' }"
          to="/users/4"
        />
      </div>
    `
  })
}
