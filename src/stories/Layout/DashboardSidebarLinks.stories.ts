import type { Meta, StoryObj } from '@storybook/vue3'
import DashboardSidebar from '@/components/DashboardSidebar.vue'
import DashboardSidebarLinks from '@/components/DashboardSidebarLinks.vue'
import Button from '@/components/Button.vue'
import Avatar from '@/components/Avatar.vue'
import Separator from '@/components/Separator.vue'
import { ref } from 'vue'
// import type { DashboardSidebarLinkItem } from '../../components/DashboardSidebarLinks.vue'
interface DashboardSidebarLinkItem {
  label: string
  to?: string
  href?: string
  icon?: string
  badge?:
    | string
    | number
    | {
        label?: string
        color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
        variant?: 'soft' | 'strong'
      }
  active?: boolean
  disabled?: boolean
  tooltip?: boolean | string
  children?: Omit<DashboardSidebarLinkItem, 'children'>[]
  defaultOpen?: boolean
  onClick?: (e: Event) => void
  class?: string
}
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

const navigationLinks: DashboardSidebarLinkItem[] = [
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

export const WithNavigation: Story = {
  render: () => ({
    components: { DashboardSidebar, DashboardSidebarLinks, Avatar, Button },
    setup() {
      const links = ref(navigationLinks)
      return { links }
    },
    template: `
      <div class="flex h-screen">
        <DashboardSidebar>
     <template #header="{ collapsed }">
  <div class="flex items-center gap-3 overflow-hidden">
    <div class="w-8 h-8 shrink-0">
      <Avatar
        src="https://github.com/nuxt.png"
        class="w-full h-full"
      />
    </div>

    <div v-if="!collapsed" class="flex-1 min-w-0">
      <p class="text-sm font-medium truncate">John Doe</p>
      <p class="text-xs text-muted-foreground truncate">Admin</p>
    </div>
  </div>
</template>
          
          <DashboardSidebarLinks :links="links" />
          
          <template #footer>
            <Button variant="tertiary" size="sm" class="w-full" :leading-icon="'solar:logout-bold'">
              Sign Out
            </Button>
          </template>
        </DashboardSidebar>
        
        <div class="flex-1 p-8">
          <h1 class="text-2xl font-bold">Dashboard Content</h1>
          <p class="mt-4 text-muted-foreground">
            Sidebar with navigation links, submenu support, badges, and smooth animations.
          </p>
        </div>
      </div>
    `
  })
}

export const CollapsibleWithLinks: Story = {
  render: () => ({
    components: { DashboardSidebar, DashboardSidebarLinks, Button },
    setup() {
      const collapsed = ref(false)
      const links = ref(navigationLinks)
      return { collapsed, links }
    },
    template: `
      <div class="flex h-screen">
        <DashboardSidebar v-model:collapsed="collapsed" collapsible>
          <template #header="{ toggle }">
            <Button 
              variant="plain" 
              size="sm" 
              @click="toggle"
              class="ml-auto"
              :leading-icon="'solar:hamburger-menu-bold'"
            />
          </template>
          
          <DashboardSidebarLinks :links="links" :collapsed="collapsed" />
          
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
          <h1 class="text-2xl font-bold">Collapsible Sidebar</h1>
          <p class="mt-4 text-muted-foreground">
            Click the menu icon to collapse/expand. Tooltips appear on hover when collapsed.
          </p>
          <p class="mt-2 text-muted-foreground">
            Current state: <strong>{{ collapsed ? 'Collapsed' : 'Expanded' }}</strong>
          </p>
        </div>
      </div>
    `
  })
}

export const WithActiveSubmenu: Story = {
  render: () => ({
    components: { DashboardSidebar, DashboardSidebarLinks, Avatar, Separator },
    setup() {
      const links = ref<DashboardSidebarLinkItem[]>([
        {
          label: 'Dashboard',
          to: '/dashboard',
          icon: 'solar:home-2-bold'
        },
        {
          label: 'Analytics',
          icon: 'solar:chart-2-bold',
          defaultOpen: true,
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
              active: true,
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
          label: 'Team',
          to: '/team',
          icon: 'solar:users-group-rounded-bold'
        }
      ])

      return { links }
    },
    template: `
      <div class="flex h-screen">
        <DashboardSidebar>
  <template #header="{ collapsed }">
  <div class="flex items-center gap-3 overflow-hidden">
    <div class="w-8 h-8 shrink-0">
      <Avatar
        src="https://github.com/nuxt.png"
        class="w-full h-full"
      />
    </div>

    <div v-if="!collapsed" class="flex-1 min-w-0">
      <p class="text-sm font-medium truncate">John Doe</p>
      <p class="text-xs text-muted-foreground truncate">Admin</p>
    </div>
  </div>
</template>
          
          <div class="space-y-4">
            <div>
              <p class="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Main Menu
              </p>
              <DashboardSidebarLinks :links="links" />
            </div>
            
            <Separator />
            
            <div>
              <p class="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Settings
              </p>
              <DashboardSidebarLinks
                :links="[
                  { label: 'Preferences', to: '/settings/preferences', icon: 'solar:settings-bold' },
                  { label: 'Security', to: '/settings/security', icon: 'solar:shield-bold' },
                  { label: 'Notifications', to: '/settings/notifications', icon: 'solar:bell-bold', badge: { label: '2', color: 'warning' } }
                ]"
              />
            </div>
          </div>
          
          <template #footer>
            <Button variant="tertiary" size="sm" class="w-full" :leading-icon="'solar:logout-bold'">
              Sign Out
            </Button>
          </template>
        </DashboardSidebar>
        
        <div class="flex-1 p-8">
          <h1 class="text-2xl font-bold">Active Submenu</h1>
          <p class="mt-4 text-muted-foreground">
            Submenu is opened by default when it contains an active link.
            Smooth animations when expanding/collapsing.
          </p>
        </div>
      </div>
    `
  })
}

export const RightSideProperties: Story = {
  args: {
    side: 'right'
  },
  render: (args) => ({
    components: { DashboardSidebar, DashboardSidebarLinks, Button },
    setup() {
      const links = ref<DashboardSidebarLinkItem[]>([
        {
          label: 'General',
          icon: 'solar:settings-bold',
          defaultOpen: true,
          children: [
            { label: 'Name', icon: 'solar:text-bold' },
            { label: 'Description', icon: 'solar:document-text-bold' },
            { label: 'Tags', icon: 'solar:tag-bold' }
          ]
        },
        {
          label: 'Appearance',
          icon: 'solar:palette-bold',
          children: [
            { label: 'Colors', icon: 'solar:palette-2-bold' },
            { label: 'Typography', icon: 'solar:text-field-bold' },
            { label: 'Spacing', icon: 'solar:maximize-bold' }
          ]
        },
        {
          label: 'Advanced',
          icon: 'solar:code-bold',
          children: [
            { label: 'Custom CSS', icon: 'solar:css3-bold' },
            { label: 'Scripts', icon: 'solar:code-square-bold' }
          ]
        }
      ])
      return { args, links }
    },
    template: `
      <div class="flex h-screen">
        <div class="flex-1 p-8">
          <h1 class="text-2xl font-bold">Main Content</h1>
          <p class="mt-4 text-muted-foreground">
            Sidebar on the right side, perfect for property panels or settings.
          </p>
        </div>
        
        <DashboardSidebar v-bind="args">
          <template #header>
            <h2 class="text-lg font-semibold">Properties</h2>
          </template>
          
          <DashboardSidebarLinks :links="links" />
          
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
