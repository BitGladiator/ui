import type { Meta, StoryObj } from '@storybook/vue3'
import NavigationMenu from '../../components/NavigationMenu.vue'
import { ref } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                    Meta                                    */
/* -------------------------------------------------------------------------- */

const meta: Meta<typeof NavigationMenu> = {
  title: 'Navigation/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['vertical', 'horizontal']
    },
    collapsed: {
      control: 'boolean'
    },
    collapsible: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof NavigationMenu>

/* -------------------------------------------------------------------------- */
/*                               Sample Data                                  */
/* -------------------------------------------------------------------------- */

const sampleMenuItems = [
  {
    label: 'Home',
    icon: 'solar:home-linear',
    to: '/home'
  },
  {
    label: 'Products',
    icon: 'solar:bag-linear',
    children: [
      {
        label: 'Electronics',
        icon: 'solar:laptop-linear',
        children: [
          {
            label: 'Laptops',
            to: '/products/laptops',
            children: [
              {
                label: 'Gaming Laptops',
                to: '/products/laptops/gaming',
                badge: 'New'
              },
              {
                label: 'Business Laptops',
                to: '/products/laptops/business'
              }
            ]
          },
          {
            label: 'Phones',
            to: '/products/phones',
            badge: '3'
          }
        ]
      },
      {
        label: 'Clothing',
        to: '/products/clothing'
      }
    ]
  },
  {
    label: 'About',
    icon: 'solar:info-circle-linear',
    to: '/about',
    active: true
  },
  {
    label: 'Contact',
    icon: 'solar:phone-linear',
    href: '#contact',
    onClick: (e: Event) => {
      e.preventDefault()
      console.log('Contact clicked')
    }
  },
  {
    label: 'Disabled Item',
    icon: 'solar:lock-linear',
    disabled: true
  }
]

/* -------------------------------------------------------------------------- */
/*                              Base Render                                   */
/* -------------------------------------------------------------------------- */

const BaseRender = (args: any) => ({
  components: { NavigationMenu },
  setup() {
    const collapsed = ref(args.collapsed)

    const onUpdateCollapsed = (value: boolean) => {
      collapsed.value = value
    }

    const onSelect = (item: any) => {
      console.log('Selected:', item.label)
    }

    return {
      args,
      collapsed,
      onUpdateCollapsed,
      onSelect
    }
  },
  template: `
    <div class="h-screen relative">
      <NavigationMenu
        :menu-items="args.menuItems"
        :mode="args.mode"
        :collapsed="collapsed"
        :collapsible="args.collapsible"
        @update:collapsed="onUpdateCollapsed"
        @select="onSelect"
      />
      <main class="p-8">
        <h1 class="text-2xl font-bold mb-2">Main Content</h1>
        <p>This area represents page content.</p>
      </main>
    </div>
  `
})

/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

export const Vertical: Story = {
  args: {
    menuItems: sampleMenuItems,
    mode: 'vertical',
    collapsed: false,
    collapsible: true
  },
  render: BaseRender
}

export const VerticalCollapsed: Story = {
  args: {
    menuItems: sampleMenuItems,
    mode: 'vertical',
    collapsed: true,
    collapsible: true
  },
  render: BaseRender
}

export const Horizontal: Story = {
  args: {
    menuItems: sampleMenuItems,
    mode: 'horizontal',
    collapsible: false
  },
  render: (args) => ({
    components: { NavigationMenu },
    setup() {
      const onSelect = (item: any) => {
        console.log('Selected:', item.label)
      }

      return { args, onSelect }
    },
    template: `
      <div>
        <NavigationMenu
          :menu-items="args.menuItems"
          :mode="args.mode"
          :collapsible="args.collapsible"
          @select="onSelect"
        />
        <main class="p-8">
          <h1 class="text-2xl font-bold">Horizontal Navigation</h1>
          <p>Resize to mobile to see drawer behavior.</p>
        </main>
      </div>
    `
  })
}

export const MobileViewport: Story = {
  args: {
    menuItems: sampleMenuItems,
    mode: 'vertical',
    collapsed: false,
    collapsible: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: BaseRender
}

export const TabletViewport: Story = {
  args: {
    menuItems: sampleMenuItems,
    mode: 'vertical',
    collapsed: false,
    collapsible: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  },
  render: BaseRender
}