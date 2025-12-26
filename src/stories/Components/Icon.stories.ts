import type { Meta, StoryObj } from '@storybook/vue3'
import Icon from '@/components/Icon.vue'

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Icon name (using Iconify format)'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Icon size'
    }
  }
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    name: 'solar:home-2-bold'
  }
}

export const Sizes: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div class="flex items-center gap-4">
        <Icon name="solar:home-2-bold" size="xs" />
        <Icon name="solar:home-2-bold" size="sm" />
        <Icon name="solar:home-2-bold" size="md" />
        <Icon name="solar:home-2-bold" size="lg" />
        <Icon name="solar:home-2-bold" size="xl" />
      </div>
    `
  })
}

export const CommonIcons: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div class="grid grid-cols-6 gap-4">
        <div class="flex flex-col items-center gap-2">
          <Icon name="solar:home-2-bold" />
          <span class="text-xs">Home</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="solar:user-bold" />
          <span class="text-xs">User</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="solar:settings-bold" />
          <span class="text-xs">Settings</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="solar:bell-bold" />
          <span class="text-xs">Bell</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="solar:letter-bold" />
          <span class="text-xs">Mail</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="solar:heart-bold" />
          <span class="text-xs">Heart</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="solar:minimalistic-magnifer-bold" />
          <span class="text-xs">Search</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="solar:add-circle-bold" />
          <span class="text-xs">Plus</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="solar:trash-bin-trash-bold" />
          <span class="text-xs">Trash</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="solar:pen-bold" />
          <span class="text-xs">Edit</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="solar:check-circle-bold" />
          <span class="text-xs">Check</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="solar:close-circle-bold" />
          <span class="text-xs">Close</span>
        </div>
      </div>
    `
  })
}

export const Colored: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div class="flex items-center gap-4">
        <Icon name="solar:home-2-bold" class="text-blue-500" />
        <Icon name="solar:heart-bold" class="text-red-500" />
        <Icon name="solar:check-circle-bold" class="text-green-500" />
        <Icon name="solar:close-circle-bold" class="text-red-500" />
        <Icon name="solar:bell-bold" class="text-yellow-500" />
      </div>
    `
  })
}
