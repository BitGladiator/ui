import type { Meta, StoryObj } from '@storybook/vue3'
import Dropdown from '@/components/Dropdown.vue'
import Button from '@/components/Button.vue'

const meta = {
  title: 'Feedback/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Horizontal alignment'
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Side of the trigger'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    }
  }
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Dropdown, Button },
    setup() {
      const items = [
        {
          label: 'Profile',
          icon: '👤',
          onClick: () => alert('Profile clicked')
        },
        {
          label: 'Settings',
          icon: '⚙️',
          onClick: () => alert('Settings clicked')
        },
        { separator: true },
        { label: 'Logout', icon: '🚪', onClick: () => alert('Logout clicked') }
      ]
      return { args, items }
    },
    template: `
      <Dropdown :items="items" v-bind="args">
        <template #trigger>
          <Button variant="outline">Open Menu</Button>
        </template>
      </Dropdown>
    `
  })
}

export const WithLabels: Story = {
  render: (args) => ({
    components: { Dropdown, Button },
    setup() {
      const items = [
        { label: 'Account' },
        {
          label: 'Profile',
          icon: '👤',
          value: 'profile',
          onClick: () => alert('Profile')
        },
        {
          label: 'Billing',
          icon: '💳',
          value: 'billing',
          onClick: () => alert('Billing')
        },
        { separator: true },
        { label: 'Settings' },
        {
          label: 'Preferences',
          icon: '⚙️',
          value: 'preferences',
          onClick: () => alert('Preferences')
        },
        {
          label: 'Keyboard Shortcuts',
          icon: '⌨️',
          value: 'shortcuts',
          onClick: () => alert('Shortcuts')
        },
        { separator: true },
        {
          label: 'Logout',
          icon: '🚪',
          value: 'logout',
          onClick: () => alert('Logout')
        }
      ]
      return { args, items }
    },
    template: `
      <Dropdown :items="items" v-bind="args">
        <template #trigger>
          <Button>Account</Button>
        </template>
      </Dropdown>
    `
  })
}

export const AlignEnd: Story = {
  render: (args) => ({
    components: { Dropdown, Button },
    setup() {
      const items = [
        { label: 'Edit', icon: '✏️', onClick: () => alert('Edit') },
        { label: 'Duplicate', icon: '📋', onClick: () => alert('Duplicate') },
        { separator: true },
        { label: 'Delete', icon: '🗑️', onClick: () => alert('Delete') }
      ]
      return { args, items }
    },
    template: `
      <div class="flex justify-end">
        <Dropdown :items="items" v-bind="args">
          <template #trigger>
            <Button variant="ghost">Options</Button>
          </template>
        </Dropdown>
      </div>
    `
  }),
  args: {
    align: 'end'
  }
}

export const SideTop: Story = {
  render: (args) => ({
    components: { Dropdown, Button },
    setup() {
      const items = [
        { label: 'Copy', icon: '📋', onClick: () => alert('Copy') },
        { label: 'Cut', icon: '✂️', onClick: () => alert('Cut') },
        { label: 'Paste', icon: '📄', onClick: () => alert('Paste') }
      ]
      return { args, items }
    },
    template: `
      <div class="pt-40">
        <Dropdown :items="items" v-bind="args">
          <template #trigger>
            <Button>Edit</Button>
          </template>
        </Dropdown>
      </div>
    `
  }),
  args: {
    side: 'top'
  }
}

export const WithDisabledItems: Story = {
  render: (args) => ({
    components: { Dropdown, Button },
    setup() {
      const items = [
        { label: 'New File', icon: '📄', onClick: () => alert('New File') },
        {
          label: 'New Folder',
          icon: '📁',
          disabled: true,
          onClick: () => alert('New Folder')
        },
        { separator: true },
        { label: 'Save', icon: '💾', onClick: () => alert('Save') },
        {
          label: 'Save As...',
          icon: '💾',
          disabled: true,
          onClick: () => alert('Save As')
        }
      ]
      return { args, items }
    },
    template: `
      <Dropdown :items="items" v-bind="args">
        <template #trigger>
          <Button variant="outline">File</Button>
        </template>
      </Dropdown>
    `
  })
}

export const CustomContent: Story = {
  render: (args) => ({
    components: { Dropdown, Button },
    setup() {
      return { args }
    },
    template: `
      <Dropdown v-bind="args">
        <template #trigger>
          <Button variant="primary">Custom Dropdown</Button>
        </template>

        <div class="p-3 space-y-2">
          <div class="text-sm font-semibold text-gray-700">John Doe</div>
          <div class="text-xs text-gray-500">john.doe@example.com</div>

          <div class="pt-2 mt-2 border-t border-gray-200 space-y-1">
            <button class="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-gray-100">
              Profile
            </button>
            <button class="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-gray-100">
              Settings
            </button>
            <button class="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-gray-100 text-red-600">
              Logout
            </button>
          </div>
        </div>
      </Dropdown>
    `
  })
}

export const IconButton: Story = {
  render: (args) => ({
    components: { Dropdown, Button },
    setup() {
      const items = [
        { label: 'View', icon: '👁️', onClick: () => alert('View') },
        { label: 'Edit', icon: '✏️', onClick: () => alert('Edit') },
        { label: 'Share', icon: '🔗', onClick: () => alert('Share') },
        { separator: true },
        { label: 'Delete', icon: '🗑️', onClick: () => alert('Delete') }
      ]
      return { args, items }
    },
    template: `
      <Dropdown :items="items" v-bind="args">
        <template #trigger>
          <Button variant="ghost" size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </Button>
        </template>
      </Dropdown>
    `
  })
}

export const AllSides: Story = {
  render: () => ({
    components: { Dropdown, Button },
    setup() {
      const items = [
        { label: 'Item 1', onClick: () => {} },
        { label: 'Item 2', onClick: () => {} },
        { label: 'Item 3', onClick: () => {} }
      ]
      return { items }
    },
    template: `
      <div class="flex items-center justify-center gap-20 p-20">
        <Dropdown :items="items" side="left">
          <template #trigger>
            <Button>Left</Button>
          </template>
        </Dropdown>

        <div class="flex flex-col gap-20">
          <Dropdown :items="items" side="top">
            <template #trigger>
              <Button>Top</Button>
            </template>
          </Dropdown>

          <Dropdown :items="items" side="bottom">
            <template #trigger>
              <Button>Bottom</Button>
            </template>
          </Dropdown>
        </div>

        <Dropdown :items="items" side="right">
          <template #trigger>
            <Button>Right</Button>
          </template>
        </Dropdown>
      </div>
    `
  })
}
