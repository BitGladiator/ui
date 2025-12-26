import type { Meta, StoryObj } from '@storybook/vue3'
import Separator from '@/components/Separator.vue'

const meta = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Separator orientation'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Spacing size'
    },
    decorative: {
      control: 'boolean',
      description: 'Whether separator is decorative (for accessibility)'
    }
  }
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Separator },
    setup() {
      return { args }
    },
    template: `
      <div>
        <p class="text-gray-700">Content above the separator</p>
        <Separator v-bind="args" />
        <p class="text-gray-700">Content below the separator</p>
      </div>
    `
  })
}

export const WithLabel: Story = {
  render: (args) => ({
    components: { Separator },
    setup() {
      return { args }
    },
    template: `
      <div>
        <p class="text-gray-700">Section 1</p>
        <Separator v-bind="args" />
        <p class="text-gray-700">Section 2</p>
      </div>
    `
  }),
  args: {
    label: 'OR'
  }
}

export const Vertical: Story = {
  render: (args) => ({
    components: { Separator },
    setup() {
      return { args }
    },
    template: `
      <div class="flex h-20 items-center">
        <span class="text-gray-700">Left</span>
        <Separator v-bind="args" />
        <span class="text-gray-700">Right</span>
      </div>
    `
  }),
  args: {
    orientation: 'vertical'
  }
}

export const Small: Story = {
  render: (args) => ({
    components: { Separator },
    setup() {
      return { args }
    },
    template: `
      <div>
        <p class="text-sm text-gray-700">Compact spacing</p>
        <Separator v-bind="args" />
        <p class="text-sm text-gray-700">With small separator</p>
      </div>
    `
  }),
  args: {
    size: 'sm'
  }
}

export const Large: Story = {
  render: (args) => ({
    components: { Separator },
    setup() {
      return { args }
    },
    template: `
      <div>
        <p class="text-gray-700">Large spacing</p>
        <Separator v-bind="args" />
        <p class="text-gray-700">With large separator</p>
      </div>
    `
  }),
  args: {
    size: 'lg'
  }
}

export const InCard: Story = {
  render: () => ({
    components: { Separator },
    template: `
      <div class="max-w-md p-6 bg-white rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Card Title</h3>
        <p class="mt-2 text-sm text-gray-600">
          This is the card description
        </p>

        <Separator />

        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Subtotal</span>
            <span class="text-gray-900">$99.00</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Tax</span>
            <span class="text-gray-900">$9.90</span>
          </div>
        </div>

        <Separator />

        <div class="flex justify-between font-semibold">
          <span>Total</span>
          <span>$108.90</span>
        </div>
      </div>
    `
  })
}

export const InForm: Story = {
  render: () => ({
    components: { Separator },
    template: `
      <div class="max-w-md p-6 bg-white rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Sign In</h3>

        <button class="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
          Continue with Google
        </button>

        <Separator label="OR" />

        <form class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <button class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Sign In
          </button>
        </form>
      </div>
    `
  })
}

export const InMenu: Story = {
  render: () => ({
    components: { Separator },
    template: `
      <div class="w-64 p-2 bg-white rounded-lg border border-gray-200 shadow-lg">
        <div class="space-y-1">
          <button class="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100">
            Profile
          </button>
          <button class="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100">
            Settings
          </button>
        </div>

        <Separator size="sm" />

        <div class="space-y-1">
          <button class="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100">
            Help & Support
          </button>
          <button class="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100">
            Documentation
          </button>
        </div>

        <Separator size="sm" />

        <button class="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 text-red-600">
          Sign Out
        </button>
      </div>
    `
  })
}

export const VerticalInNavbar: Story = {
  render: () => ({
    components: { Separator },
    template: `
      <div class="flex items-center gap-4 p-4 bg-white border-b border-gray-200">
        <h1 class="text-xl font-bold">Logo</h1>

        <Separator orientation="vertical" size="sm" />

        <nav class="flex gap-4">
          <a href="#" class="text-gray-700 hover:text-gray-900">Home</a>
          <a href="#" class="text-gray-700 hover:text-gray-900">About</a>
          <a href="#" class="text-gray-700 hover:text-gray-900">Contact</a>
        </nav>

        <div class="ml-auto flex items-center gap-4">
          <button class="text-gray-700 hover:text-gray-900">
            Notifications
          </button>

          <Separator orientation="vertical" size="sm" />

          <button class="px-4 py-2 bg-blue-600 text-white rounded-md">
            Sign In
          </button>
        </div>
      </div>
    `
  })
}
