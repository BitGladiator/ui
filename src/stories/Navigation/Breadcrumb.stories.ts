import type { Meta, StoryObj } from '@storybook/vue3'
import Breadcrumb from '@/components/Breadcrumb.vue'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object'
    },
    separatorIcon: {
      control: 'text'
    }
  }
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', to: '/' },
      { label: 'Products', to: '/products' },
      { label: 'Category', to: '/products/category' },
      { label: 'Item' }
    ]
  }
}

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', to: '/', icon: '🏠' },
      { label: 'Documents', to: '/docs', icon: '📁' },
      { label: 'Projects', to: '/projects', icon: '🚀' },
      { label: 'Current Project', icon: '📄' }
    ]
  }
}

export const WithDisabled: Story = {
  args: {
    items: [
      { label: 'Home', to: '/' },
      { label: 'Settings', to: '/settings', disabled: true },
      { label: 'Profile' }
    ]
  }
}

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', to: '/' },
      { label: 'Products', to: '/products' },
      { label: 'Details' }
    ],
    separatorIcon: 'i-heroicons-chevron-double-right'
  }
}

export const LongPath: Story = {
  args: {
    items: [
      { label: 'Home', to: '/' },
      { label: 'Documents', to: '/documents' },
      { label: 'Work', to: '/documents/work' },
      { label: 'Projects', to: '/documents/work/projects' },
      { label: '2024', to: '/documents/work/projects/2024' },
      { label: 'Q1', to: '/documents/work/projects/2024/q1' },
      { label: 'Report.pdf' }
    ]
  }
}
