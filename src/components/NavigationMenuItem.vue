<script setup lang="ts">
  import { ref, computed, defineComponent, onMounted, onUnmounted, h } from 'vue'
  import { Icon } from '@iconify/vue'
  import theme from '@/themes/navigation-menu'
  import type { NavigationItem } from '@/config/navigation'
  
  // Props
  export interface NavigationMenuProps {
    menuItems?: NavigationItem[]
    mode?: 'vertical' | 'horizontal'
    collapsed?: boolean
    collapsible?: boolean
    class?: string
    ui?: Record<string, any>
  }
  
  const props = withDefaults(defineProps<NavigationMenuProps>(), {
    mode: 'vertical',
    collapsed: false,
    collapsible: true
  })
  
  const emit = defineEmits<{
    'update:collapsed': [boolean]
    'select': [NavigationItem]
    'close-drawer': []
  }>()
  
  // Responsive state
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)
  const mobileDrawerOpen = ref(false)
  
  const updateResponsiveState = () => {
    const width = window.innerWidth
    isMobile.value = width < 768
    isTablet.value = width >= 768 && width < 1024
    isDesktop.value = width >= 1024
  }
  
  onMounted(() => {
    updateResponsiveState()
    window.addEventListener('resize', updateResponsiveState)
  })
  onUnmounted(() => window.removeEventListener('resize', updateResponsiveState))
  
  // Sidebar collapsed state
  const collapsed = computed({
    get: () => isMobile.value ? false : props.collapsed,
    set: (val: boolean) => emit('update:collapsed', val)
  })
  
  const toggleSidebar = () => {
    if (isMobile.value) mobileDrawerOpen.value = !mobileDrawerOpen.value
    else if (props.collapsible) collapsed.value = !collapsed.value
  }
  const closeMobileDrawer = () => (mobileDrawerOpen.value = false)
  
  const ui = computed(() => theme({ orientation: props.mode }))
  const sidebarWidth = computed(() => {
    if (isMobile.value) return '100vw'
    if (isTablet.value) return collapsed.value ? '5rem' : '12rem'
    return collapsed.value ? '4rem' : '16rem'
  })
  
  // Navigation Menu Item Component
  const NavigationMenuItem = defineComponent({
    name: 'NavigationMenuItem',
    props: {
      item: { type: Object as () => NavigationItem, required: true },
      ui: { type: Object, required: true },
      collapsed: { type: Boolean, required: true },
      level: { type: Number, default: 0 },
      isMobile: { type: Boolean, required: true },
      mode: { type: String as () => 'vertical' | 'horizontal', default: 'vertical' }
    },
    emits: ['select', 'close-drawer'],
    setup(props, { emit }) {
      const expanded = ref(false)
      const hasChildren = computed(() => !!props.item.children?.length)
  
      const handleClick = (e: Event) => {
        if (props.item.disabled) { e.preventDefault(); return }
        if (props.item.children) expanded.value = !expanded.value
        else {
          props.item.onClick?.(e)
          if (props.isMobile) emit('close-drawer')
          emit('select', props.item)
        }
      }
  
      return () =>
        h('li', { class: [props.ui.item, props.level > 0 && props.mode === 'vertical' ? 'ml-4' : ''] }, [
          hasChildren.value
            ? h('button', {
                onClick: handleClick,
                class: props.ui.trigger,
                'aria-expanded': expanded.value
              }, [
                props.item.icon ? h(Icon, { icon: props.item.icon, class: props.ui.triggerIcon }) : null,
                !props.collapsed || props.isMobile || props.mode === 'horizontal' ? h('span', props.item.label) : null,
                props.mode === 'vertical' ? h('i', { class: [props.ui.triggerCaret, 'ri-arrow-down-s-line', expanded.value ? 'rotate-180' : ''] }) : null
              ])
            : props.item.to
              ? h('router-link', {
                  to: props.item.to,
                  class: props.ui.link,
                  onClick: handleClick
                }, [
                  props.item.icon ? h(Icon, { icon: props.item.icon, class: props.ui.linkIcon }) : null,
                  h('span', props.item.label)
                ])
              : h('a', { href: props.item.url || '#', class: props.ui.link, onClick: handleClick }, [
                  props.item.icon ? h(Icon, { icon: props.item.icon, class: props.ui.linkIcon }) : null,
                  h('span', props.item.label)
                ]),
          hasChildren.value
            ? h('Transition', { name: 'slide-fade' }, {
                default: () => h('ul', { class: [props.ui.list, 'flex flex-col'], style: { display: expanded.value ? 'block' : 'none' } },
                  props.item.children?.map(child =>
                    h(NavigationMenuItem, {
                      key: child.label,
                      item: child,
                      ui: props.ui,
                      collapsed: props.collapsed,
                      isMobile: props.isMobile,
                      level: props.level + 1,
                      mode: props.mode,
                      onSelect: (item: NavigationItem) => emit('select', item),
                      onCloseDrawer: () => emit('close-drawer')
                    })
                  )
                )
              })
            : null
        ])
    }
  })
  </script>
  
  <template>
    <!-- Vertical Sidebar -->
    <aside
      v-if="mode === 'vertical'"
      :class="[
        'bg-surface border-r h-screen transition-all duration-300',
        isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative',
        isMobile && !mobileDrawerOpen ? '-translate-x-full' : 'translate-x-0'
      ]"
      :style="{ width: sidebarWidth }"
    >
      <header class="flex items-center justify-between p-4 border-b">
        <h2 v-if="!collapsed || isMobile" class="font-semibold">Navigation</h2>
        <button @click="toggleSidebar">
          <i :class="isMobile ? 'ri-close-line' : 'ri-side-bar-line'"></i>
        </button>
      </header>
      <nav class="p-2">
        <ul :class="[ui.list, 'flex flex-col']">
          <NavigationMenuItem
            v-for="item in menuItems"
            :key="item.label"
            :item="item"
            :ui="ui"
            :collapsed="collapsed && isDesktop"
            :isMobile="isMobile"
            :mode="mode"
            @select="$emit('select', $event)"
            @close-drawer="closeMobileDrawer"
          />
        </ul>
      </nav>
    </aside>
  
    <!-- Horizontal Header -->
    <nav v-else class="border-b px-4 py-2 flex flex-col md:flex-row items-start md:items-center justify-between w-full">
      <ul class="hidden md:flex gap-2" :class="ui.list">
        <NavigationMenuItem
          v-for="item in menuItems"
          :key="item.label"
          :item="item"
          :ui="ui"
          :collapsed="false"
          :isMobile="false"
          :mode="mode"
        />
      </ul>
      <button class="md:hidden mt-2" @click="toggleSidebar">
        <i class="ri-menu-line"></i>
      </button>
    </nav>
  
    <!-- Mobile Overlay -->
    <div v-if="isMobile && mobileDrawerOpen" class="fixed inset-0 bg-black/50 z-40" @click="closeMobileDrawer" />
  
    <!-- Mobile Drawer -->
    <aside v-if="mode === 'horizontal' && isMobile && mobileDrawerOpen" class="fixed inset-0 w-full h-screen bg-surface z-50">
      <header class="p-4 flex justify-between border-b">
        <span class="font-semibold">Menu</span>
        <button @click="closeMobileDrawer">
          <i class="ri-close-line"></i>
        </button>
      </header>
      <nav class="p-2">
        <ul :class="[ui.list, 'flex flex-col']">
          <NavigationMenuItem
            v-for="item in menuItems"
            :key="item.label"
            :item="item"
            :ui="ui"
            :collapsed="false"
            :isMobile="true"
            :mode="mode"
            @close-drawer="closeMobileDrawer"
          />
        </ul>
      </nav>
    </aside>
  </template>  