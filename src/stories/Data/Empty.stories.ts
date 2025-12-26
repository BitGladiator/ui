import type { Meta, StoryObj } from '@storybook/vue3'
import Empty from '../../components/Empty.vue'

const meta = {
  title: 'Data/Empty',
  component: Empty,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'subtle', 'naked'],
      description: 'Visual variant of the empty state'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the empty state'
    }
  }
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: 'solar:file-bold',
    title: 'No projects found',
    description:
      "It looks like you haven't added any projects. Create one to get started."
  }
}

export const WithActions: Story = {
  args: {
    icon: 'solar:file-bold',
    title: 'No projects found',
    description:
      "It looks like you haven't added any projects. Create one to get started.",
    actions: [
      {
        leadingIcon: 'solar:add-circle-bold',
        label: 'Create new',
        variant: 'primary',
      },
      {
        leadingIcon: 'solar:refresh-bold',
        label: 'Refresh',
        variant: 'secondary'
      }
    ] as any
  }
}

export const NoData: Story = {
  args: {
    icon: 'solar:inbox-line-linear',
    title: 'No data available',
    description: 'There are no items to display at the moment.'
  }
}

export const NoResults: Story = {
  args: {
    icon: 'solar:minimalistic-magnifer-linear',
    title: 'No results found',
    description:
      "Try adjusting your search or filter to find what you're looking for."
  }
}

export const SolidVariant: Story = {
  args: {
    variant: 'solid',
    icon: 'solar:folder-bold',
    title: 'Empty folder',
    description: 'This folder contains no files.'
  }
}

export const SoftVariant: Story = {
  args: {
    variant: 'soft',
    icon: 'solar:document-bold',
    title: 'No documents',
    description: 'Upload or create a new document to get started.'
  }
}

export const SubtleVariant: Story = {
  args: {
    variant: 'subtle',
    icon: 'solar:users-group-rounded-bold',
    title: 'No team members',
    description: 'Invite team members to collaborate.'
  }
}

export const NakedVariant: Story = {
  args: {
    variant: 'naked',
    icon: 'solar:calendar-bold',
    title: 'No events',
    description: 'Create your first event.'
  }
}

export const SmallSize: Story = {
  args: {
    size: 'sm',
    icon: 'solar:bell-bold',
    title: 'No notifications',
    description: "You're all caught up!"
  }
}

export const LargeSize: Story = {
  args: {
    size: 'lg',
    icon: 'solar:cloud-upload-bold',
    title: 'Upload your files',
    description: 'Drag and drop files here or click to browse.',
    actions: [
      {
        label: 'Choose files',
        variant: 'primary'
      }
    ] as any
  }
}

export const WithAvatar: Story = {
  args: {
    avatar: {
      src: 'https://github.com/nuxt.png'
    },
    title: 'No projects yet',
    description: 'Start by creating your first project.'
  }
}

export const NoConnection: Story = {
  args: {
    icon: 'solar:wifi-router-minimalistic-bold',
    title: 'No internet connection',
    description: 'Please check your network settings and try again.',
    actions: [
      {
        label: 'Retry',
        leadingIcon: 'solar:refresh-bold',
        variant: 'primary'
      }
    ] as any
  }
}

export const Error: Story = {
  args: {
    icon: 'solar:danger-triangle-bold',
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try again later.',
    actions: [
      {
        label: 'Go back',
        variant: 'secondary'
      },
      {
        label: 'Report issue',
        variant: 'tertiary'
      }
    ] as any
  }
}
