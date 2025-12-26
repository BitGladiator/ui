import type { Meta, StoryObj } from '@storybook/vue3'
import PageHeader from '@/components/PageHeader.vue'

const meta: Meta<typeof PageHeader> = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  argTypes: {
    headline: {
      control: 'text'
    },
    title: {
      control: 'text'
    },
    description: {
      control: 'text'
    },
    links: {
      control: 'object'
    }
  }
}

export default meta
type Story = StoryObj<typeof PageHeader>

export const Default: Story = {
  args: {
    title: 'Dashboard',
    description: 'Panoramica delle tue attività'
  }
}

export const WithHeadline: Story = {
  args: {
    headline: 'Welcome back',
    title: 'Dashboard',
    description: "Here's what's happening with your projects today"
  }
}

export const WithLinks: Story = {
  args: {
    title: 'Projects',
    description: 'Manage your team projects',
    links: [
      {
        label: 'New Project',
        icon: 'i-heroicons-plus',
        color: 'primary',
        variant: 'solid'
      },
      {
        label: 'Settings',
        icon: 'i-heroicons-cog',
        variant: 'outline'
      }
    ]
  }
}

export const TitleOnly: Story = {
  args: {
    title: 'Settings'
  }
}

export const WithCustomSlots: Story = {
  render: () => ({
    components: { PageHeader },
    template: `
      <PageHeader>
        <template #headline>
          <div class="flex items-center gap-2">
            <span class="text-primary-600">⭐</span>
            <span>Featured</span>
          </div>
        </template>

        <template #title>
          <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Beautiful Dashboard
          </span>
        </template>

        <template #description>
          <p class="text-gray-600">
            Your personalized workspace with all the tools you need
          </p>
        </template>

        <template #links>
          <button class="px-4 py-2 bg-primary-600 text-white rounded-lg">
            Get Started
          </button>
          <button class="px-4 py-2 border border-gray-300 rounded-lg">
            Learn More
          </button>
        </template>
      </PageHeader>
    `
  })
}

export const Documentation: Story = {
  args: {
    headline: 'Documentation',
    title: 'API Reference',
    description: 'Complete reference for our REST API endpoints',
    links: [
      {
        label: 'Download',
        icon: 'i-heroicons-arrow-down-tray'
      }
    ]
  }
}
