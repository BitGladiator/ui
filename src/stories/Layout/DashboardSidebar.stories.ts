import type { Meta, StoryObj } from '@storybook/vue3'
import DashboardSidebar from '../../components/DashboardSidebar.vue'
import type { DashboardSidebarLinkItem } from '../../components/DashboardSidebar.vue'
import Button from '../../components/Button.vue'
import Avatar from '../../components/Avatar.vue'
import Separator from '../../components/Separator.vue'
import { ref } from 'vue'

const meta = {
  title: 'Layout/DashboardSidebar',
  component: DashboardSidebar,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Side where the sidebar appears'
    },
    collapsed: {
      control: 'boolean',
      description: 'Whether the sidebar is collapsed'
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether the sidebar can be collapsed'
    }
  }
} satisfies Meta<typeof DashboardSidebar>

export default meta
type Story = StoryObj<typeof meta>

// Sample links data
const sampleLinks: DashboardSidebarLinkItem[] = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: 'solar:home-2-bold',
    active: true,
    onClick: (e) => {
      e.preventDefault()
      console.log('Navigated to Dashboard')
    }
  },
  {
    label: 'Analytics',
    icon: 'solar:chart-2-bold',
    badge: 'New',
    children: [
      {
        label: 'Overview',
        to: '/analytics/overview',
        icon: 'solar:pie-chart-2-bold',
        onClick: (e) => {
          e.preventDefault()
          console.log('Navigated to Analytics Overview')
        }
      },
      {
        label: 'Reports',
        to: '/analytics/reports',
        icon: 'solar:document-text-bold',
        badge: { label: '3', color: 'primary' },
        onClick: (e) => {
          e.preventDefault()
          console.log('Navigated to Analytics Reports')
        }
      },
      {
        label: 'Real-time',
        to: '/analytics/realtime',
        icon: 'solar:graph-bold',
        onClick: (e) => {
          e.preventDefault()
          console.log('Navigated to Real-time Analytics')
        }
      }
    ]
  },
  {
    label: 'Projects',
    icon: 'solar:folder-bold',
    badge: { label: '12', color: 'neutral' },
    children: [
      {
        label: 'Active',
        to: '/projects/active',
        icon: 'solar:file-check-bold',
        badge: { label: '8', color: 'success' },
        onClick: (e) => {
          e.preventDefault()
          console.log('Navigated to Active Projects')
        }
      },
      {
        label: 'Archived',
        to: '/projects/archived',
        icon: 'solar:archive-bold',
        onClick: (e) => {
          e.preventDefault()
          console.log('Navigated to Archived Projects')
        }
      }
    ]
  },
  {
    label: 'Team',
    to: '/team',
    icon: 'solar:users-group-rounded-bold',
    badge: { label: '24', color: 'info' },
    onClick: (e) => {
      e.preventDefault()
      console.log('Navigated to Team')
    }
  },
  {
    label: 'Settings',
    to: '/settings',
    icon: 'solar:settings-bold',
    onClick: (e) => {
      e.preventDefault()
      console.log('Navigated to Settings')
    }
  }
]

export const WithLinksArray: Story = {
  render: () => ({
    components: { DashboardSidebar, Avatar, Button },
    setup() {
      const links = ref(sampleLinks)
      return { links }
    },
    template: `
      <div class="flex h-screen">
        <DashboardSidebar :links="links">
          <template #header>
            <div class="flex items-center gap-3 w-full">
              <Avatar size="sm" src="https://github.com/nuxt.png" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">John Doe</p>
                <p class="text-xs text-muted-foreground truncate">Admin</p>
              </div>
            </div>
          </template>
          
          <template #footer>
            <Button variant="tertiary" size="sm" class="w-full" :leading-icon="'solar:logout-bold'">
              Sign Out
            </Button>
          </template>
        </DashboardSidebar>
        
        <div class="flex-1 p-8">
          <h1 class="text-2xl font-bold">Dashboard with Links Array</h1>
          <p class="mt-4 text-muted-foreground">
            Simply pass a <code>links</code> array prop to the DashboardSidebar component.
            No need to manually render navigation - it's handled automatically!
          </p>
          <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 class="text-sm font-semibold text-blue-900 mb-2">📝 Storybook Note</h3>
            <p class="text-sm text-blue-800">
              In this demo, links use <code>onClick</code> handlers since Vue Router is not available. 
              Check the browser console to see navigation events. In a real app with Vue Router, 
              the <code>to</code> prop would handle navigation automatically.
            </p>
          </div>
        </div>
      </div>
    `
  })
}

export const CollapsibleWithLinksArray: Story = {
  render: () => ({
    components: { DashboardSidebar, Button },
    setup() {
      const collapsed = ref(false)
      const links = ref(sampleLinks)
      return { collapsed, links }
    },
    template: `
      <div class="flex h-screen">
        <DashboardSidebar 
          v-model:collapsed="collapsed" 
          collapsible
          :links="links"
        >
          <template #header="{ toggle }">
            <Button 
              variant="plain" 
              size="sm" 
              @click="toggle"
              :leading-icon="'solar:hamburger-menu-bold'"
              :class="collapsed ? 'mx-auto' : 'ml-auto'"
            />
          </template>
          
          <template #footer>
            <Button 
              variant="tertiary" 
              size="sm" 
              class="w-full" 
              :leading-icon="'solar:logout-bold'"
            >
              <span v-if="!collapsed">Sign Out</span>
            </Button>
          </template>
        </DashboardSidebar>
        
        <div class="flex-1 p-8">
          <h1 class="text-2xl font-bold">Collapsible Sidebar with Links</h1>
          <p class="mt-4 text-muted-foreground">
            Click the menu icon to collapse/expand. Submenu and tooltips work automatically!
          </p>
          <p class="mt-2 text-muted-foreground">
            Current state: <strong>{{ collapsed ? 'Collapsed' : 'Expanded' }}</strong>
          </p>
          <div class="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 class="text-sm font-semibold text-green-900 mb-2">✨ Interactive Features</h3>
            <ul class="text-sm text-green-800 space-y-1">
              <li>• Click links to see console logs (Storybook demo)</li>
              <li>• Expand/collapse nested menus</li>
              <li>• Hover over icons when collapsed for tooltips</li>
              <li>• Smooth animations and transitions</li>
            </ul>
          </div>
        </div>
      </div>
    `
  })
}

export const WithAvatar: Story = {
  render: () => ({
    components: { DashboardSidebar, Button, Avatar, Separator },
    template: `
      <div class="flex h-screen">
        <DashboardSidebar>
          <template #header>
            <div class="flex items-center gap-3 w-full">
              <Avatar size="sm" src="https://github.com/nuxt.png" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">John Doe</p>
                <p class="text-xs text-muted-foreground truncate">john@example.com</p>
              </div>
            </div>
          </template>
          
          <div class="space-y-4">
            <div>
              <p class="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Main
              </p>
              <nav class="space-y-1">
                <Button variant="plain" class="w-full justify-start" :leading-icon="'solar:home-2-bold'">
                  Dashboard
                </Button>
                <Button variant="plain" class="w-full justify-start" :leading-icon="'solar:users-group-rounded-bold'">
                  Team
                </Button>
                <Button variant="plain" class="w-full justify-start" :leading-icon="'solar:folder-bold'">
                  Projects
                </Button>
              </nav>
            </div>
            
            <Separator />
            
            <div>
              <p class="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Tools
              </p>
              <nav class="space-y-1">
                <Button variant="plain" class="w-full justify-start" :leading-icon="'solar:chart-2-bold'">
                  Analytics
                </Button>
                <Button variant="plain" class="w-full justify-start" :leading-icon="'solar:document-text-bold'">
                  Reports
                </Button>
              </nav>
            </div>
          </div>
          
          <template #footer>
            <Button variant="tertiary" size="sm" class="w-full" :leading-icon="'solar:settings-bold'">
              Settings
            </Button>
          </template>
        </DashboardSidebar>
        
        <div class="flex-1 p-8">
          <h1 class="text-2xl font-bold">Dashboard with User Profile</h1>
          <p class="mt-4 text-muted-foreground">Sidebar with user avatar and grouped navigation.</p>
        </div>
      </div>
    `
  })
}

export const RightSide: Story = {
  args: {
    side: 'right'
  },
  render: (args) => ({
    components: { DashboardSidebar, Button },
    setup() {
      return { args }
    },
    template: `
      <div class="flex h-screen">
        <div class="flex-1 p-8">
          <h1 class="text-2xl font-bold">Main Content</h1>
          <p class="mt-4 text-muted-foreground">Sidebar on the right side.</p>
        </div>
        
        <DashboardSidebar v-bind="args">
          <template #header>
            <h2 class="text-lg font-semibold">Properties</h2>
          </template>
          
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium">Width</label>
              <input type="number" class="w-full mt-1 px-3 py-2 border border-border rounded-lg" value="100" />
            </div>
            <div>
              <label class="text-sm font-medium">Height</label>
              <input type="number" class="w-full mt-1 px-3 py-2 border border-border rounded-lg" value="100" />
            </div>
            <div>
              <label class="text-sm font-medium">Background</label>
              <input type="color" class="w-full mt-1 h-10 border border-border rounded-lg" value="#0e5bff" />
            </div>
          </div>
          
          <template #footer>
            <Button variant="primary" size="sm" class="w-full">
              Apply Changes
            </Button>
          </template>
        </DashboardSidebar>
      </div>
    `
  })
}
