import type { Meta, StoryObj } from '@storybook/vue3'
import Skeleton from '@/components/Skeleton.vue'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded']
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none']
    }
  }
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Text: Story = {
  args: {
    variant: 'text',
    width: '100%'
  }
}

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: '40px',
    height: '40px'
  }
}

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: '100%',
    height: '200px'
  }
}

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: '100%',
    height: '100px'
  }
}

export const WaveAnimation: Story = {
  args: {
    variant: 'rectangular',
    animation: 'wave',
    width: '100%',
    height: '100px'
  }
}

export const CardSkeleton: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="w-80 rounded-lg border p-4 space-y-3">
        <div class="flex items-center space-x-3">
          <Skeleton variant="circular" width="40px" height="40px" />
          <div class="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
        <Skeleton variant="rounded" width="100%" height="200px" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
      </div>
    `
  })
}
