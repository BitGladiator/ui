import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Tabs from '../../components/Tabs.vue'

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'pill', 'card']
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg']
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
        'neutral'
      ]
    },
    modelValue: {
      control: false
    }
  }
}

export default meta
export type Story = StoryObj<typeof Tabs>

// Basic tabs with content
export const Default: Story = {
  args: {},

  render: (args) => ({
    components: { Tabs },
    setup() {
      const selected = ref('account')
      const items = [
        { label: 'Account', value: 'account', slot: 'account' },
        { label: 'Password', value: 'password', slot: 'password' },
        {
          label: 'Notifications',
          value: 'notifications',
          slot: 'notifications'
        }
      ]
      return { args, selected, items }
    },
    template: `
      <Tabs v-bind="args" v-model="selected" :items="items" :content="false">
        <template #account>
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Account Settings</h3>
            <p class="text-sm text-muted-foreground">
              Make changes to your account here. Click save when you're done.
            </p>
            <div class="space-y-2">
              <label class="text-sm font-medium">Name</label>
              <input type="text" placeholder="Your name" class="w-full px-3 py-2 border rounded-md" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Email</label>
              <input type="email" placeholder="your@email.com" class="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </template>
        <template #password>
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Password</h3>
            <p class="text-sm text-muted-foreground">
              Change your password here. After saving, you'll be logged out.
            </p>
            <div class="space-y-2">
              <label class="text-sm font-medium">Current Password</label>
              <input type="password" class="w-full px-3 py-2 border rounded-md" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">New Password</label>
              <input type="password" class="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </template>
        <template #notifications>
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Notifications</h3>
            <p class="text-sm text-muted-foreground">
              Configure how you receive notifications.
            </p>
            <div class="space-y-3">
              <label class="flex items-center gap-2">
                <input type="checkbox" checked />
                <span class="text-sm">Email notifications</span>
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" />
                <span class="text-sm">Push notifications</span>
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" checked />
                <span class="text-sm">SMS notifications</span>
              </label>
            </div>
          </div>
        </template>
      </Tabs>
    `
  })
}

// Tabs with icons
export const WithIcons: Story = {
  render: (args: any) => ({
    components: { Tabs },
    setup() {
      const selected = ref('overview')
      const items = [
        {
          label: 'Overview',
          value: 'overview',
          icon: 'solar:home-linear',
          slot: 'overview'
        },
        {
          label: 'Analytics',
          value: 'analytics',
          icon: 'solar:chart-2-linear',
          slot: 'analytics'
        },
        {
          label: 'Reports',
          value: 'reports',
          icon: 'solar:document-text-linear',
          slot: 'reports'
        },
        {
          label: 'Settings',
          value: 'settings',
          icon: 'solar:settings-linear',
          slot: 'settings'
        }
      ]
      return { args, selected, items }
    },
    template: `
      <Tabs v-bind="args" v-model="selected" :items="items" :content="false">
        <template #overview>
          <div class="p-4 border rounded-lg">
            <h3 class="text-lg font-semibold mb-2">Overview Dashboard</h3>
            <p class="text-sm text-muted-foreground">
              View your dashboard metrics and key performance indicators here.
            </p>
            <div class="grid grid-cols-3 gap-4 mt-4">
              <div class="p-3 bg-muted rounded-lg">
                <div class="text-2xl font-bold">1,234</div>
                <div class="text-xs text-muted-foreground">Total Users</div>
              </div>
              <div class="p-3 bg-muted rounded-lg">
                <div class="text-2xl font-bold">$12,345</div>
                <div class="text-xs text-muted-foreground">Revenue</div>
              </div>
              <div class="p-3 bg-muted rounded-lg">
                <div class="text-2xl font-bold">89%</div>
                <div class="text-xs text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </template>
        <template #analytics>
          <div class="p-4 border rounded-lg">
            <h3 class="text-lg font-semibold mb-2">Analytics</h3>
            <p class="text-sm text-muted-foreground">
              Detailed analytics and insights about your application performance.
            </p>
          </div>
        </template>
        <template #reports>
          <div class="p-4 border rounded-lg">
            <h3 class="text-lg font-semibold mb-2">Reports</h3>
            <p class="text-sm text-muted-foreground">
              Generate and view reports for your business metrics.
            </p>
          </div>
        </template>
        <template #settings>
          <div class="p-4 border rounded-lg">
            <h3 class="text-lg font-semibold mb-2">Settings</h3>
            <p class="text-sm text-muted-foreground">
              Configure your application settings and preferences.
            </p>
          </div>
        </template>
      </Tabs>
    `
  })
}

// Tabs with badges
export const WithBadges: Story = {
  render: (args: any) => ({
    components: { Tabs },
    setup() {
      const selected = ref('inbox')
      const items = [
        { label: 'Inbox', value: 'inbox', badge: '12', slot: 'inbox' },
        { label: 'Sent', value: 'sent', badge: '3', slot: 'sent' },
        { label: 'Drafts', value: 'drafts', badge: '5', slot: 'drafts' },
        { label: 'Trash', value: 'trash', slot: 'trash' }
      ]
      return { args, selected, items }
    },
    template: `
      <Tabs v-bind="args" v-model="selected" :items="items" :content="false">
        <template #inbox>
          <div class="space-y-2">
            <div class="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <div class="font-medium">Meeting Tomorrow</div>
              <div class="text-sm text-muted-foreground">Let's discuss the new project...</div>
            </div>
            <div class="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <div class="font-medium">Weekly Report</div>
              <div class="text-sm text-muted-foreground">Here's your weekly summary...</div>
            </div>
          </div>
        </template>
        <template #sent>
          <div class="p-4 text-center text-muted-foreground">
            <p>3 sent messages</p>
          </div>
        </template>
        <template #drafts>
          <div class="p-4 text-center text-muted-foreground">
            <p>5 draft messages</p>
          </div>
        </template>
        <template #trash>
          <div class="p-4 text-center text-muted-foreground">
            <p>Trash is empty</p>
          </div>
        </template>
      </Tabs>
    `
  })
}

// Pill variant
export const PillVariant: Story = {
  render: (args: any) => ({
    components: { Tabs },
    setup() {
      const selected = ref('profile')
      const items = [
        { label: 'Profile', value: 'profile', slot: 'profile' },
        { label: 'Activity', value: 'activity', slot: 'activity' },
        { label: 'Settings', value: 'settings', slot: 'settings' }
      ]
      return { args, selected, items }
    },
    template: `
      <Tabs v-bind="args" v-model="selected" :items="items" variant="pill" :content="false">
        <template #profile>
          <div class="p-4 border rounded-lg">
            <h3 class="text-lg font-semibold mb-2">Profile Information</h3>
            <p class="text-sm text-muted-foreground">
              Update your profile details and manage your account information.
            </p>
          </div>
        </template>
        <template #activity>
          <div class="p-4 border rounded-lg">
            <h3 class="text-lg font-semibold mb-2">Recent Activity</h3>
            <p class="text-sm text-muted-foreground">
              View your recent actions and activity timeline.
            </p>
          </div>
        </template>
        <template #settings>
          <div class="p-4 border rounded-lg">
            <h3 class="text-lg font-semibold mb-2">Account Settings</h3>
            <p class="text-sm text-muted-foreground">
              Manage your account preferences and privacy settings.
            </p>
          </div>
        </template>
      </Tabs>
    `
  })
}

// Card variant
export const CardVariant: Story = {
  render: (args: any) => ({
    components: { Tabs },
    setup() {
      const selected = ref('preview')
      const items = [
        { label: 'Preview', value: 'preview', slot: 'preview' },
        { label: 'Code', value: 'code', slot: 'code' },
        { label: 'Settings', value: 'settings', slot: 'settings' }
      ]
      return { args, selected, items }
    },
    template: `
      <Tabs v-bind="args" v-model="selected" :items="items" variant="card" :content="false">
        <template #preview>
          <div class="p-6 bg-muted/50 rounded-lg">
            <div class="flex items-center justify-center h-32">
              <div class="text-center">
                <div class="text-4xl mb-2">🎨</div>
                <p class="text-sm text-muted-foreground">Component Preview</p>
              </div>
            </div>
          </div>
        </template>
        <template #code>
          <div class="p-4 bg-muted/50 rounded-lg font-mono text-sm">
            <div class="text-muted-foreground">// Component code</div>
            <div class="mt-2">
              <span class="text-blue-500">const</span> Example = () => {<br/>
              &nbsp;&nbsp;<span class="text-blue-500">return</span> <span class="text-green-500">&lt;div&gt;</span>Hello World<span class="text-green-500">&lt;/div&gt;</span><br/>
              }
            </div>
          </div>
        </template>
        <template #settings>
          <div class="p-4 bg-muted/50 rounded-lg">
            <h3 class="font-semibold mb-3">Component Settings</h3>
            <div class="space-y-2">
              <label class="flex items-center gap-2 text-sm">
                <input type="checkbox" checked />
                Show grid
              </label>
              <label class="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Dark mode
              </label>
            </div>
          </div>
        </template>
      </Tabs>
    `
  })
}

// Vertical orientation
export const VerticalOrientation: Story = {
  render: (args: any) => ({
    components: { Tabs },
    setup() {
      const selected = ref('general')
      const items = [
        {
          label: 'General',
          value: 'general',
          icon: 'solar:settings-linear',
          slot: 'general'
        },
        {
          label: 'Security',
          value: 'security',
          icon: 'solar:shield-check-linear',
          slot: 'security'
        },
        {
          label: 'Notifications',
          value: 'notifications',
          icon: 'solar:bell-linear',
          slot: 'notifications'
        },
        {
          label: 'Billing',
          value: 'billing',
          icon: 'solar:card-linear',
          slot: 'billing'
        }
      ]
      return { args, selected, items }
    },
    template: `
      <Tabs v-bind="args" v-model="selected" :items="items" orientation="vertical" :content="false">
        <template #general>
          <div class="p-4 border rounded-lg">
            <h3 class="text-lg font-semibold mb-2">General Settings</h3>
            <p class="text-sm text-muted-foreground mb-4">
              Configure your general application preferences.
            </p>
            <div class="space-y-3">
              <div>
                <label class="text-sm font-medium">Language</label>
                <select class="w-full mt-1 px-3 py-2 border rounded-md">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div>
                <label class="text-sm font-medium">Timezone</label>
                <select class="w-full mt-1 px-3 py-2 border rounded-md">
                  <option>UTC</option>
                  <option>EST</option>
                  <option>PST</option>
                </select>
              </div>
            </div>
          </div>
        </template>
        <template #security>
          <div class="p-4 border rounded-lg">
            <h3 class="text-lg font-semibold mb-2">Security Settings</h3>
            <p class="text-sm text-muted-foreground mb-4">
              Manage your security and privacy settings.
            </p>
            <div class="space-y-3">
              <label class="flex items-center gap-2 text-sm">
                <input type="checkbox" checked />
                Two-factor authentication
              </label>
              <label class="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Email verification for login
              </label>
            </div>
          </div>
        </template>
        <template #notifications>
          <div class="p-4 border rounded-lg">
            <h3 class="text-lg font-semibold mb-2">Notification Preferences</h3>
            <p class="text-sm text-muted-foreground mb-4">
              Choose how you want to receive notifications.
            </p>
            <div class="space-y-3">
              <label class="flex items-center gap-2 text-sm">
                <input type="checkbox" checked />
                Email notifications
              </label>
              <label class="flex items-center gap-2 text-sm">
                <input type="checkbox" checked />
                Push notifications
              </label>
              <label class="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                SMS alerts
              </label>
            </div>
          </div>
        </template>
        <template #billing>
          <div class="p-4 border rounded-lg">
            <h3 class="text-lg font-semibold mb-2">Billing Information</h3>
            <p class="text-sm text-muted-foreground mb-4">
              Manage your billing details and payment methods.
            </p>
            <div class="space-y-2">
              <div class="text-sm">
                <span class="font-medium">Current Plan:</span> Pro
              </div>
              <div class="text-sm">
                <span class="font-medium">Next Billing:</span> Jan 1, 2026
              </div>
            </div>
          </div>
        </template>
      </Tabs>
    `
  })
}

// Different sizes
export const Sizes: Story = {
  render: (args: any) => ({
    components: { Tabs },
    setup() {
      const selected1 = ref('tab1')
      const selected2 = ref('tab1')
      const selected3 = ref('tab1')
      const selected4 = ref('tab1')
      const items = [
        { label: 'Tab 1', value: 'tab1', slot: 'content' },
        { label: 'Tab 2', value: 'tab2', slot: 'content' },
        { label: 'Tab 3', value: 'tab3', slot: 'content' }
      ]
      return { args, selected1, selected2, selected3, selected4, items }
    },
    template: `
      <div class="space-y-8">
        <div>
          <p class="text-sm font-medium mb-2">Extra Small</p>
          <Tabs v-model="selected1" :items="items" size="xs" :content="false">
            <template #content>
              <div class="p-3 border rounded-lg text-sm">Content for selected tab</div>
            </template>
          </Tabs>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Small</p>
          <Tabs v-model="selected2" :items="items" size="sm" :content="false">
            <template #content>
              <div class="p-3 border rounded-lg text-sm">Content for selected tab</div>
            </template>
          </Tabs>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Medium (Default)</p>
          <Tabs v-model="selected3" :items="items" size="md" :content="false">
            <template #content>
              <div class="p-4 border rounded-lg">Content for selected tab</div>
            </template>
          </Tabs>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Large</p>
          <Tabs v-model="selected4" :items="items" size="lg" :content="false">
            <template #content>
              <div class="p-4 border rounded-lg">Content for selected tab</div>
            </template>
          </Tabs>
        </div>
      </div>
    `
  })
}

// With disabled tabs
export const WithDisabled: Story = {
  render: (args: any) => ({
    components: { Tabs },
    setup() {
      const selected = ref('available')
      const items = [
        { label: 'Available', value: 'available', slot: 'available' },
        {
          label: 'Disabled Tab',
          value: 'disabled',
          disabled: true,
          slot: 'disabled'
        },
        { label: 'Active', value: 'active', slot: 'active' }
      ]
      return { args, selected, items }
    },
    template: `
      <Tabs v-bind="args" v-model="selected" :items="items" :content="false">
        <template #available>
          <div class="p-4 border rounded-lg">
            <p class="text-sm">This tab is available and can be selected.</p>
          </div>
        </template>
        <template #disabled>
          <div class="p-4 border rounded-lg">
            <p class="text-sm">This content should not be visible as the tab is disabled.</p>
          </div>
        </template>
        <template #active>
          <div class="p-4 border rounded-lg">
            <p class="text-sm">Another available tab with content.</p>
          </div>
        </template>
      </Tabs>
    `
  })
}
