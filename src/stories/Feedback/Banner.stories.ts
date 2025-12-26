import type { Meta, StoryObj } from '@storybook/vue3'
import Banner from '@/components/Banner.vue'
import Button from '@/components/Button.vue'

const meta = {
  title: 'Feedback/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
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
      ],
      description: 'Banner color'
    },
    close: {
      control: 'boolean',
      description: 'Show close button'
    }
  }
} satisfies Meta<typeof Banner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'This is a banner with an important message.',
    icon: 'solar:info-circle-linear',
    color: 'primary'
  }
}

export const WithClose: Story = {
  args: {
    id: 'closable-banner',
    title: 'This is a closable banner.',
    icon: 'solar:info-circle-linear',
    color: 'primary',
    close: true
  }
}

export const Success: Story = {
  args: {
    title: 'Operation completed successfully!',
    icon: 'solar:check-circle-linear',
    color: 'success',
    close: true
  }
}

export const Warning: Story = {
  args: {
    title: 'Action required: Please update your payment method.',
    icon: 'solar:danger-triangle-linear',
    color: 'warning',
    close: true
  }
}

export const Error: Story = {
  args: {
    title: 'Connection error. Please check your internet connection.',
    icon: 'solar:close-circle-linear',
    color: 'error',
    close: true
  }
}

export const Neutral: Story = {
  args: {
    title: 'This is a neutral banner.',
    icon: 'solar:info-circle-linear',
    color: 'neutral',
    close: true
  }
}

export const WithActions: Story = {
  args: {
    title: 'This is a banner with actions.',
    icon: 'solar:info-circle-linear',
    color: 'primary',
    actions: [
      {
        label: 'Action 1',
        variant: 'secondary'
      },
      {
        label: 'Action 2',
        trailingIcon: 'solar:arrow-right-linear'
      }
    ]
  }
}

export const WithLink: Story = {
  args: {
    title: 'NuxtLabs is joining Vercel!',
    icon: 'solar:info-circle-linear',
    color: 'primary',
    to: 'https://nuxtlabs.com/',
    target: '_blank'
  }
}
