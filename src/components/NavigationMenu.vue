<script setup lang="ts">
  import { computed, ref, onMounted, onUnmounted, defineComponent } from 'vue'
  import { Icon } from '@iconify/vue'
  import theme from '@/themes/navigation-menu'
  import type { NavigationItem } from '@/config/navigation'
  
  /* -------------------------------------------------------------------------- */
  /*                                   Props                                    */
  /* -------------------------------------------------------------------------- */
  
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
    'update:collapsed': [value: boolean]
    'select': [item: NavigationItem]
    'close-drawer': []
  }>()
  
  /* -------------------------------------------------------------------------- */
  /*                             Responsive handling                              */
  /* -------------------------------------------------------------------------- */
  
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)
  
  const updateResponsiveState = () => {
    const width = window.innerWidth
    isMobile.value = width < 768
    isTablet.value = width >= 768 && width < 1024
    isDesktop.value = width >= 1024
  
    if (!isMobile.value) {
      mobileDrawerOpen.value = false
    }
  }
  
  onMounted(() => {
    updateResponsiveState()
    window.addEventListener('resize', updateResponsiveState)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateResponsiveState)
  })
  
  /* -------------------------------------------------------------------------- */
  /*                                 UI State                                   */
  /* -------------------------------------------------------------------------- */
  
  const collapsed = computed({
    get: () => props.collapsed,
    set: (val: boolean) => emit('update:collapsed', val)
  })
  
  const mobileDrawerOpen = ref(false)
  
  const toggleSidebar = () => {
    if (isMobile.value) {
      mobileDrawerOpen.value = !mobileDrawerOpen.value
    } else if (props.collapsible) {
      collapsed.value = !collapsed.value
    }
  }
  
  const closeMobileDrawer = () => {
    mobileDrawerOpen.value = false
  }
  
  const ui = computed(() => theme({ orientation: props.mode }))
  
  const sidebarWidth = computed(() => {
    if (isMobile.value) return '100vw'
    if (isTablet.value) return collapsed.value ? '5rem' : '12rem'
    return collapsed.value ? '4rem' : '16rem'
  })
  
  /* -------------------------------------------------------------------------- */
  /*                          Navigation Menu Item                               */
  /* -------------------------------------------------------------------------- */
  
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
  
      const handleClick = (e: Event) => {
        if (props.item.disabled) {
          e.preventDefault()
          return
        }
  
        if (props.item.children) {
          expanded.value = !expanded.value
        } else {
          props.item.onClick?.(e)
          if (props.isMobile) emit('close-drawer')
          emit('select', props.item)
        }
      }
  
      return { expanded, handleClick }
    },
    template: `
      <li :class="[ui.item, level > 0 && mode === 'vertical' ? 'ml-4' : '']">
        <button
          v-if="item.children"
          @click="handleClick"
          :class="ui.trigger"
          :aria-expanded="expanded"
        >
          <Icon v-if="item.icon" :icon="item.icon" :class="ui.triggerIcon" />
          <span v-if="!collapsed || isMobile || mode === 'horizontal'">
            {{ item.label }}
          </span>
          <Icon
            v-if="mode === 'vertical'"
            icon="solar:alt-arrow-down-linear"
            :class="[ui.triggerCaret, { 'rotate-180': expanded }]"
          />
        </button>
  
        <router-link
          v-else-if="item.to"
          :to="item.to"
          :class="ui.link"
          @click="handleClick"
        >
          <Icon v-if="item.icon" :icon="item.icon" :class="ui.linkIcon" />
          <span v-if="!collapsed || isMobile || mode === 'horizontal'">
            {{ item.label }}
          </span>
        </router-link>
  
        <Transition
          v-if="item.children"
          enter-active-class="transition-all duration-200"
          leave-active-class="transition-all duration-200"
        >
          <ul v-if="expanded" :class="[ui.list, 'flex flex-col']">
            <NavigationMenuItem
              v-for="child in item.children"
              :key="child.label"
              :item="child"
              :ui="ui"
              :collapsed="collapsed"
              :level="level + 1"
              :isMobile="isMobile"
              :mode="mode"
              @select="$emit('select', $event)"
              @close-drawer="$emit('close-drawer')"
            />
          </ul>
        </Transition>
      </li>
    `
  })
  </script>
  
  <template>
    <!-- Vertical Sidebar -->
    <aside
      v-if="mode === 'vertical'"
      :class="[
        'bg-surface border-r h-screen transition-all duration-300',
        isMobile ? 'fixed inset-y-0 left-0 z-50 w-screen max-w-full' : 'relative',
        isMobile && !mobileDrawerOpen ? '-translate-x-full' : 'translate-x-0'
      ]"
      :style="{ width: sidebarWidth }"
    >
      <header class="flex items-center justify-between p-4 border-b">
        <h2 v-if="!collapsed || isMobile" class="font-semibold">Navigation</h2>
        <button @click="toggleSidebar">
          <Icon
            :icon="isMobile ? 'solar:close-linear' : 'solar:sidebar-minimalistic-linear'"
            class="w-5 h-5"
          />
        </button>
      </header>
  
      <nav class="p-2">
        <ul :class="[ui.list, 'flex flex-col']">
          <NavigationMenuItem
            v-for="item in menuItems"
            :key="item.label"
            :item="item"
            :ui="ui"
            :collapsed="collapsed && !isMobile"
            :isMobile="isMobile"
            :mode="mode"
            @select="$emit('select', $event)"
            @close-drawer="closeMobileDrawer"
          />
        </ul>
      </nav>
    </aside>
  
    <!-- Horizontal Header -->
    <nav
      v-else
      class="border-b px-4 py-2 flex items-center justify-between w-full min-h-[3.5rem]"
    >
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
  
      <button class="md:hidden" @click="toggleSidebar">
        <Icon icon="solar:hamburger-menu-linear" class="w-5 h-5" />
      </button>
    </nav>
  
    <!-- Mobile Overlay -->
    <div
      v-if="isMobile && mobileDrawerOpen"
      class="fixed inset-0 bg-black/50 z-40"
      @click="closeMobileDrawer"
    />
  
    <!-- Mobile Drawer (Horizontal) -->
    <aside
      v-if="mode === 'horizontal' && isMobile && mobileDrawerOpen"
      class="fixed inset-y-0 left-0 w-full bg-surface z-50"
    >
      <header class="p-4 flex justify-between border-b">
        <span class="font-semibold">Menu</span>
        <button @click="closeMobileDrawer">
          <Icon icon="solar:close-linear" />
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