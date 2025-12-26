import type { Meta, StoryObj } from '@storybook/vue3'
import DashboardToolbar from '@/components/DashboardToolbar.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'

const meta = {
  title: 'Layout/DashboardToolbar',
  component: DashboardToolbar,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof DashboardToolbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { DashboardToolbar, Button },
    template: `
      <DashboardToolbar>
        <template #left>
          <Button variant="secondary" size="sm">Back</Button>
        </template>
        <template #right>
          <Button variant="primary" size="sm">Save</Button>
        </template>
      </DashboardToolbar>
    `
  })
}

export const WithSearch: Story = {
  render: () => ({
    components: { DashboardToolbar, Input, Button },
    template: `
      <DashboardToolbar>
        <template #left>
          <Input 
            placeholder="Search..." 
            :leading-icon="'solar:minimalistic-magnifer-linear'"
            size="sm"
            class="w-64"
          />
        </template>
        <template #right>
          <Button variant="secondary" size="sm" leading-icon="solar:filter-linear">
            Filter
          </Button>
          <Button variant="primary" size="sm" leading-icon="solar:add-circle-linear">
            New Item
          </Button>
        </template>
      </DashboardToolbar>
    `
  })
}

export const WithMultipleActions: Story = {
  render: () => ({
    components: { DashboardToolbar, Button },
    template: `
      <DashboardToolbar>
        <template #left>
          <Button variant="secondary" size="sm" leading-icon="solar:arrow-left-linear">
            Back
          </Button>
          <span class="text-sm font-medium text-foreground">Project Settings</span>
        </template>
        <template #right>
          <Button variant="tertiary" size="sm">Cancel</Button>
          <Button variant="secondary" size="sm">Preview</Button>
          <Button variant="primary" size="sm">Publish</Button>
        </template>
      </DashboardToolbar>
    `
  })
}

export const WithTabs: Story = {
  render: () => ({
    components: { DashboardToolbar, Button },
    template: `
      <DashboardToolbar>
        <template #left>
          <div class="flex gap-1">
            <Button variant="plain" size="sm">Overview</Button>
            <Button variant="plain" size="sm">Analytics</Button>
            <Button variant="plain" size="sm">Settings</Button>
          </div>
        </template>
        <template #right>
          <Button variant="secondary" size="sm" trailing-icon="solar:settings-linear" square />
        </template>
      </DashboardToolbar>
    `
  })
}

export const MinimalLeft: Story = {
  render: () => ({
    components: { DashboardToolbar, Button },
    template: `
      <DashboardToolbar>
        <template #left>
          <h2 class="text-sm font-semibold">Dashboard</h2>
        </template>
      </DashboardToolbar>
    `
  })
}

export const MinimalRight: Story = {
  render: () => ({
    components: { DashboardToolbar, Button },
    template: `
      <DashboardToolbar>
        <template #right>
          <Button variant="primary" size="sm" leading-icon="solar:add-circle-linear">
            Create
          </Button>
        </template>
      </DashboardToolbar>
    `
  })
}

export const FullWidth: Story = {
  render: () => ({
    components: { DashboardToolbar, Input, Button },
    template: `
      <DashboardToolbar>
        <template #left>
          <Input 
            placeholder="Search across all items..." 
            :leading-icon="'solar:minimalistic-magnifer-linear'"
            size="sm"
            class="flex-1 min-w-[400px]"
          />
        </template>
        <template #right>
          <Button variant="secondary" size="sm" trailing-icon="solar:user-linear" square />
          <Button variant="secondary" size="sm" trailing-icon="solar:bell-linear" square />
          <Button variant="secondary" size="sm" trailing-icon="solar:settings-linear" square />
        </template>
      </DashboardToolbar>
    `
  })
}
