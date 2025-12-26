<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { Icon } from '@iconify/vue'
  import theme from '@/themes/dashboard-sidebar-links'
  import Badge from './Badge.vue'
  
  export interface DashboardSidebarLinkItem {
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
  
  export interface DashboardSidebarLinksProps {
    links: DashboardSidebarLinkItem[]
    collapsed?: boolean
    class?: string
    ui?: Record<string, any>
  }
  
  const props = withDefaults(defineProps<DashboardSidebarLinksProps>(), {
    collapsed: false
  })
  
  const openItems = ref<Set<number>>(new Set())
  
  // Initialize open items based on defaultOpen
  props.links.forEach((link, index) => {
    if (link.defaultOpen || link.children?.some((child) => child.active)) {
      openItems.value.add(index)
    }
  })
  
  const ui = computed(() =>
    theme({
      collapsed: props.collapsed
    })
  )
  
  const toggleItem = (index: number) => {
    if (openItems.value.has(index)) {
      openItems.value.delete(index)
    } else {
      openItems.value.add(index)
    }
  }
  
  const isItemOpen = (index: number) => openItems.value.has(index)
  
  const getLinkComponent = (link: DashboardSidebarLinkItem) => {
    // If link has children, it's a button (collapsible trigger)
    if (link.children) return 'button'
    // Use 'a' tag for better compatibility with Storybook and other contexts
    // In production apps with Vue Router, you can customize this to use 'router-link'
    if (link.to || link.href) return 'a'
    return 'button'
  }
  
  const getLinkProps = (link: DashboardSidebarLinkItem) => {
    // If link has children, no href/to props (it's just a trigger)
    if (link.children) return { type: 'button' }
    if (link.to) {
      // Use href instead of 'to' for better Storybook compatibility
      return { href: link.to }
    }
    if (link.href)
      return {
        href: link.href,
        target: link.href.startsWith('http') ? '_blank' : undefined
      }
    return { type: 'button' }
  }
  
  const handleLinkClick = (
    e: Event,
    link: DashboardSidebarLinkItem,
    index?: number
  ) => {
    if (link.disabled) {
      e.preventDefault()
      return
    }
  
    if (link.children && index !== undefined) {
      e.preventDefault()
      toggleItem(index)
    }
  
    if (link.onClick) {
      link.onClick(e)
    }
  }
  </script>
  
  <template>
    <nav :class="ui.root({ class: [props.ui?.root, props.class] })">
      <div
        v-for="(link, index) in links"
        :key="index"
        :class="ui.group({ class: props.ui?.group })"
      >
        <component
          :is="getLinkComponent(link)"
          v-bind="getLinkProps(link)"
          :class="[
            ui.link({
              active: link.active,
              disabled: link.disabled,
              hasChildren: !!link.children,
              class: [props.ui?.link, link.class]
            })
          ]"
          :disabled="link.disabled"
          :title="
            collapsed && link.tooltip !== false
              ? typeof link.tooltip === 'string'
                ? link.tooltip
                : link.label
              : undefined
          "
          @click="(e: Event) => handleLinkClick(e, link, index)"
        >
          <Icon
            v-if="link.icon"
            :icon="link.icon"
            :class="ui.linkIcon({ class: props.ui?.linkIcon })"
          />
  
          <span
            v-if="!collapsed"
            :class="ui.linkLabel({ class: props.ui?.linkLabel })"
          >
            {{ link.label }}
          </span>
  
          <Badge
            v-if="!collapsed && link.badge"
            v-bind="
              typeof link.badge === 'object'
                ? link.badge
                : { label: String(link.badge) }
            "
            :class="ui.linkBadge({ class: props.ui?.linkBadge })"
            size="sm"
          />
  
          <Icon
            v-if="!collapsed && link.children"
            icon="solar:alt-arrow-down-linear"
            :class="[
              ui.linkChevron({ class: props.ui?.linkChevron }),
              isItemOpen(index) && 'rotate-180'
            ]"
          />
        </component>
  
        <!-- Recursive submenu for deep nesting -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-screen"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 max-h-screen"
          leave-to-class="opacity-0 max-h-0"
        >
          <div
            v-if="link.children && isItemOpen(index) && !collapsed"
            :class="ui.submenu({ class: props.ui?.submenu })"
          >
            <DashboardSidebarLinks
              :links="link.children"
              :collapsed="collapsed"
              :ui="props.ui"
            />
          </div>
        </Transition>
      </div>
    </nav>
  </template>