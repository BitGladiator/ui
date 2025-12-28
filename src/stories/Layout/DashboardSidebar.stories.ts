import type { Meta, StoryObj } from '@storybook/vue3'
import DashboardSidebar from '@/components/DashboardSidebar.vue'
import DashboardSidebarLinks from '@/components/DashboardSidebarLinks.vue'
import Button from '@/components/Button.vue'
import Avatar from '@/components/Avatar.vue'
// import Separator from '@/components/Separator.vue'
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
    },
    mobileOpen: {
      control: 'boolean',
      description: 'Whether the sidebar is open on mobile'
    }
  }
} satisfies Meta<typeof DashboardSidebar>

export default meta
type Story = StoryObj<typeof meta>

// Sample links
const navigationLinks = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: 'solar:home-2-bold',
    active: true
  },
  {
    label: 'Analytics',
    icon: 'solar:chart-2-bold',
    badge: 'New',
    children: [
      {
        label: 'Overview',
        to: '/analytics/overview',
        icon: 'solar:pie-chart-2-bold'
      },
      {
        label: 'Reports',
        to: '/analytics/reports',
        icon: 'solar:document-text-bold',
        badge: { label: '3', color: 'primary' }
      },
      {
        label: 'Real-time',
        to: '/analytics/realtime',
        icon: 'solar:graph-bold'
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
        badge: { label: '8', color: 'success' }
      },
      {
        label: 'Archived',
        to: '/projects/archived',
        icon: 'solar:archive-bold'
      }
    ]
  },
  {
    label: 'Team',
    to: '/team',
    icon: 'solar:users-group-rounded-bold',
    badge: { label: '24', color: 'info' }
  },
  {
    label: 'Settings',
    to: '/settings',
    icon: 'solar:settings-bold'
  }
]

// Main story with fixed styling
export const Default: Story = {
  render: () => ({
    components: { DashboardSidebar, DashboardSidebarLinks, Avatar, Button },
    setup() {
      const links = ref(navigationLinks)
      return { links }
    },
    template: `
      <div class="flex h-[600px] border rounded-lg overflow-hidden relative">
        <DashboardSidebar :links="links">
          <template #header="{ collapsed }">
          <div class="flex items-center gap-3 overflow-hidden">
<Avatar size="sm" src="https://github.com/nuxt.png" class="!w-7 !h-7 shrink-0" />
              
              <div v-if="!collapsed" class="flex-1 min-w-0">
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
        
        <div class="flex-1 p-6 overflow-auto">
          <h1 class="text-2xl font-bold">Dashboard Content</h1>
          <p class="mt-4 text-muted-foreground">
            Sidebar with navigation links, submenu support, badges, and smooth animations.
          </p>
        </div>
      </div>
    `
  })
}

// Mobile Responsive story
export const MobileResponsive: Story = {
  render: () => ({
    components: { DashboardSidebar, DashboardSidebarLinks, Avatar, Button },
    setup() {
      const mobileOpen = ref(false)
      const links = ref(navigationLinks)
      
      return { mobileOpen, links }
    },
    template: `
      <div class="relative h-150 border rounded-lg overflow-hidden">
        <!-- Mobile toggle button -->
        <div class="absolute top-4 left-4 z-50 md:hidden">
          <Button 
            size="sm"
            @click="mobileOpen = !mobileOpen"
            :leading-icon="'solar:hamburger-menu-bold'"
          >
            Menu
          </Button>
        </div>
        
        <div class="flex h-full">
          <DashboardSidebar 
            v-model:mobile-open="mobileOpen"
            :links="links"
          >
            <template #header>
              <div class="flex items-center gap-3 overflow-hidden">
<Avatar size="sm" src="https://github.com/nuxt.png" class="!w-7 !h-7 shrink-0" />
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
          
          <div class="flex-1 p-6 overflow-auto">
            <div class="md:hidden mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p class="text-sm text-blue-800">
                📱 This is mobile view. Click "Menu" button to toggle sidebar.
              </p>
            </div>
            
            <h1 class="text-2xl font-bold">Mobile Demo</h1>
            <p class="mt-4 text-muted-foreground">
              Resize your browser window to see mobile behavior.
            </p>
            <p class="mt-2 text-sm text-muted-foreground">
              Mobile sidebar is: <strong>{{ mobileOpen ? 'Open' : 'Closed' }}</strong>
            </p>
          </div>
        </div>
      </div>
    `
  })
}

// Collapsible story
export const Collapsible: Story = {
  args: {
    collapsible: true
  },
  render: (args) => ({
    components: { DashboardSidebar, DashboardSidebarLinks, Button },
    setup() {
      const collapsed = ref(false)
      const links = ref(navigationLinks)
      return { args, collapsed, links }
    },
    template: `
      <div class="flex h-[600px] border rounded-lg overflow-hidden">
        <DashboardSidebar 
          v-bind="args"
          v-model:collapsed="collapsed"
          :links="links"
        >
          <template #header="{ toggle }">
            <div class="flex items-center gap-3 w-full overflow-hidden min-h-[64px]">
              <div v-if="!collapsed" class="flex-1 min-w-0">
                <p class="text-sm font-medium">My Application</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                @click="toggle"
                :leading-icon="collapsed ? 'solar:double-alt-arrow-right-bold' : 'solar:double-alt-arrow-left-bold'"
                class="shrink-0"
              />
            </div>
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
        
        <div class="flex-1 p-6 overflow-auto">
          <h1 class="text-2xl font-bold">Collapsible Sidebar</h1>
          <p class="mt-4 text-muted-foreground">
            Click the toggle button to collapse/expand the sidebar.
          </p>
          <p class="mt-2 text-muted-foreground">
            Current state: <strong>{{ collapsed ? 'Collapsed' : 'Expanded' }}</strong>
          </p>
        </div>
      </div>
    `
  })
}