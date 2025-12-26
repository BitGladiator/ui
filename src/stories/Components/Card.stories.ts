import type { Meta, StoryObj } from '@storybook/vue3'
import Card from '@/components/Card.vue'
import Button from '@/components/Button.vue'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
      description: 'Visual variant style'
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding size'
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Border radius'
    },
    hoverable: {
      control: 'boolean',
      description: 'Hover effect'
    },
    clickable: {
      control: 'boolean',
      description: 'Clickable with cursor pointer'
    }
  }
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'This is a card description that provides additional context.'
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <p class="text-gray-700">
          This is the main content of the card. You can put any content here.
        </p>
      </Card>
    `
  })
}

export const WithFooter: Story = {
  render: (args) => ({
    components: { Card, Button },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Project Update</h3>
              <p class="text-sm text-gray-600">Last updated 2 hours ago</p>
            </div>
            <span class="text-2xl">📊</span>
          </div>
        </template>

        <p class="text-gray-700">
          The project is progressing well. All milestones are on track and the team
          is working efficiently.
        </p>

        <template #footer>
          <div class="flex gap-2 pt-4 border-t border-gray-200">
            <Button size="sm" variant="outline">Dismiss</Button>
            <Button size="sm" variant="primary">View Details</Button>
          </div>
        </template>
      </Card>
    `
  })
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    title: 'Outlined Card',
    description: 'This card has a thicker border'
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <p class="text-gray-700">Content goes here</p>
      </Card>
    `
  })
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    title: 'Elevated Card',
    description: 'This card has a shadow for elevation'
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <p class="text-gray-700">Content goes here</p>
      </Card>
    `
  })
}

export const Hoverable: Story = {
  args: {
    hoverable: true,
    title: 'Hoverable Card',
    description: 'Hover over this card to see the effect'
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <p class="text-gray-700">Hover over me!</p>
      </Card>
    `
  })
}

export const Clickable: Story = {
  args: {
    clickable: true,
    hoverable: true,
    title: 'Clickable Card',
    description: 'Click this card to trigger an action'
  },
  render: (args) => ({
    components: { Card },
    setup() {
      const handleClick = () => {
        alert('Card clicked!')
      }
      return { args, handleClick }
    },
    template: `
      <Card v-bind="args" @click="handleClick">
        <p class="text-gray-700">Click me!</p>
      </Card>
    `
  })
}

export const NoPadding: Story = {
  args: {
    padding: 'none',
    title: 'No Padding',
    description: 'Content without padding'
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <img
          src="https://images.unsplash.com/photo-1557683316-973673baf926"
          alt="Placeholder"
          class="w-full h-48 object-cover"
        />
      </Card>
    `
  })
}

export const ImageCard: Story = {
  render: () => ({
    components: { Card, Button },
    template: `
      <Card padding="none" hoverable>
        <img
          src="https://images.unsplash.com/photo-1557683316-973673baf926"
          alt="Gradient"
          class="w-full h-48 object-cover"
        />
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900">Beautiful Landscape</h3>
          <p class="mt-2 text-sm text-gray-600">
            Discover amazing places around the world and create unforgettable memories.
          </p>
          <div class="mt-4">
            <Button size="sm" variant="primary" class="w-full">
              Explore
            </Button>
          </div>
        </div>
      </Card>
    `
  })
}

export const ProductCard: Story = {
  render: () => ({
    components: { Card, Button, Badge: () => import('@/components/Badge.vue') },
    template: `
      <Card padding="none" hoverable clickable>
        <div class="relative">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
            alt="Product"
            class="w-full h-64 object-cover"
          />
          <div class="absolute top-3 right-3">
            <span class="px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded">
              -30%
            </span>
          </div>
        </div>
        <div class="p-6">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Wireless Headphones</h3>
              <p class="mt-1 text-sm text-gray-600">Premium sound quality</p>
            </div>
            <div class="text-right">
              <div class="text-xs text-gray-400 line-through">$199.99</div>
              <div class="text-lg font-bold text-gray-900">$139.99</div>
            </div>
          </div>

          <div class="mt-4 flex items-center gap-1 text-sm text-yellow-500">
            ★★★★★ <span class="text-gray-600">(4.9)</span>
          </div>

          <div class="mt-4 grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline">Add to Cart</Button>
            <Button size="sm" variant="primary">Buy Now</Button>
          </div>
        </div>
      </Card>
    `
  })
}

export const StatCard: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div class="grid grid-cols-3 gap-4">
        <Card variant="elevated" hoverable>
          <div class="text-center">
            <div class="text-3xl mb-2">👥</div>
            <div class="text-2xl font-bold text-gray-900">1,234</div>
            <div class="text-sm text-gray-600">Total Users</div>
          </div>
        </Card>

        <Card variant="elevated" hoverable>
          <div class="text-center">
            <div class="text-3xl mb-2">📊</div>
            <div class="text-2xl font-bold text-gray-900">$45.2K</div>
            <div class="text-sm text-gray-600">Revenue</div>
          </div>
        </Card>

        <Card variant="elevated" hoverable>
          <div class="text-center">
            <div class="text-3xl mb-2">⭐</div>
            <div class="text-2xl font-bold text-gray-900">4.9</div>
            <div class="text-sm text-gray-600">Rating</div>
          </div>
        </Card>
      </div>
    `
  })
}

export const AllVariants: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div class="space-y-4">
        <Card variant="default" title="Default Card">
          <p class="text-gray-700">Standard card with border</p>
        </Card>

        <Card variant="outlined" title="Outlined Card">
          <p class="text-gray-700">Card with thicker border</p>
        </Card>

        <Card variant="elevated" title="Elevated Card">
          <p class="text-gray-700">Card with shadow elevation</p>
        </Card>
      </div>
    `
  })
}
