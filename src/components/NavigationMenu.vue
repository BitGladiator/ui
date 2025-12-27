<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import Icon from './Icon.vue'
import {
  NavigationMenuRoot as NavigationMenuPrimitive,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from 'reka-ui'
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
  collapsible: true,
  menuItems: () => []
})

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
  select: [item: NavigationItem]
}>()

/* -------------------------------------------------------------------------- */
/*                             Responsive handling                             */
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

const internalCollapsed = ref(props.collapsed)
const mobileDrawerOpen = ref(false)

const collapsed = computed({
  get: () => (isMobile.value ? false : internalCollapsed.value),
  set: (val: boolean) => {
    internalCollapsed.value = val
    emit('update:collapsed', val)
  }
})

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
  if (isMobile.value) return '280px'
  if (isTablet.value) return collapsed.value ? '80px' : '200px'
  return collapsed.value ? '80px' : '256px'
})

/* -------------------------------------------------------------------------- */
/*                          Navigation Menu Item                               */
/* -------------------------------------------------------------------------- */

const expandedItems = ref<Set<string>>(new Set())

const toggleExpanded = (itemLabel: string) => {
  if (expandedItems.value.has(itemLabel)) {
    expandedItems.value.delete(itemLabel)
  } else {
    expandedItems.value.add(itemLabel)
  }
}

const isExpanded = (itemLabel: string) => {
  return expandedItems.value.has(itemLabel)
}

const handleItemClick = (item: NavigationItem, e: Event) => {
  if (item.disabled) {
    e.preventDefault()
    return
  }

  if (item.children && item.children.length > 0) {
    toggleExpanded(item.label)
  } else {
    item.onClick?.(e)
    emit('select', item)
    if (isMobile.value) {
      closeMobileDrawer()
    }
  }
}
</script>

<template>
  <!-- Vertical Sidebar Mode -->
  <template v-if="mode === 'vertical'">
    <!-- Desktop/Tablet Sidebar -->
    <aside
      v-if="!isMobile"
      :class="[
        'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen transition-all duration-300 ease-in-out relative flex flex-col'
      ]"
      :style="{ width: sidebarWidth }"
    >
      <header
        class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 shrink-0"
      >
        <h2
          v-if="!collapsed"
          class="font-semibold text-gray-900 dark:text-gray-100"
        >
          Navigation
        </h2>
        <button
          @click="toggleSidebar"
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <Icon
            :icon="
              collapsed
                ? 'solar:sidebar-code-linear'
                : 'solar:sidebar-minimalistic-linear'
            "
            class="w-5 h-5 text-gray-600 dark:text-gray-400"
          />
        </button>
      </header>

      <nav class="flex-1 overflow-y-auto p-2">
        <NavigationMenuPrimitive orientation="vertical">
          <NavigationMenuList :class="[ui.list]">
            <template v-for="item in menuItems" :key="item.label">
              <li :class="ui.item">
                <!-- Item with children -->
                <!-- Item with children -->
                <NavigationMenuItem
                  v-if="item.children && item.children.length > 0"
                >
                  <NavigationMenuTrigger
                    :class="[
                      ui.trigger,
                      item.disabled && 'opacity-50 cursor-not-allowed'
                    ]"
                    :disabled="item.disabled"
                  >
                    <Icon
                      v-if="item.icon"
                      :icon="item.icon"
                      :class="ui.triggerIcon"
                    />
                    <span v-if="!collapsed" class="flex-1 text-left">{{
                      item.label
                    }}</span>
                    <Icon
                      v-if="!collapsed"
                      icon="solar:alt-arrow-down-linear"
                      :class="ui.triggerCaret"
                    />
                  </NavigationMenuTrigger>

                  <NavigationMenuContent :class="ui.content">
                    <ul class="ml-4 mt-1 space-y-1">
                      <li v-for="child in item.children" :key="child.label">
                        <router-link
                          v-if="child.to"
                          :to="child.to"
                          :class="[
                            ui.link,
                            'text-sm',
                            child.disabled &&
                              'opacity-50 cursor-not-allowed pointer-events-none'
                          ]"
                          @click="(e) => handleItemClick(child, e)"
                        >
                          <Icon
                            v-if="child.icon"
                            :icon="child.icon"
                            :class="ui.linkIcon"
                          />
                          <span>{{ child.label }}</span>
                        </router-link>
                        <a
                          v-else
                          :href="child.href || '#'"
                          :class="[
                            ui.link,
                            'text-sm',
                            child.disabled &&
                              'opacity-50 cursor-not-allowed pointer-events-none'
                          ]"
                          @click="(e) => handleItemClick(child, e)"
                        >
                          <Icon
                            v-if="child.icon"
                            :icon="child.icon"
                            :class="ui.linkIcon"
                          />
                          <span>{{ child.label }}</span>
                        </a>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <!-- Item with router link -->
                <router-link
                  v-else-if="item.to"
                  :to="item.to"
                  :class="[
                    ui.link,
                    item.disabled &&
                      'opacity-50 cursor-not-allowed pointer-events-none'
                  ]"
                  @click="(e) => handleItemClick(item, e)"
                >
                  <Icon
                    v-if="item.icon"
                    :icon="item.icon"
                    :class="ui.linkIcon"
                  />
                  <span v-if="!collapsed">{{ item.label }}</span>
                </router-link>

                <!-- Item with href -->
                <a
                  v-else
                  :href="item.href || '#'"
                  :class="[
                    ui.link,
                    item.disabled &&
                      'opacity-50 cursor-not-allowed pointer-events-none'
                  ]"
                  @click="(e) => handleItemClick(item, e)"
                >
                  <Icon
                    v-if="item.icon"
                    :icon="item.icon"
                    :class="ui.linkIcon"
                  />
                  <span v-if="!collapsed">{{ item.label }}</span>
                </a>
              </li>
            </template>
          </NavigationMenuList>
        </NavigationMenuPrimitive>
      </nav>
    </aside>

    <!-- Mobile Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobile && mobileDrawerOpen"
        class="fixed inset-0 bg-black/50 z-40"
        @click="closeMobileDrawer"
      />
    </Transition>

    <!-- Mobile Drawer -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-200 ease-in"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <aside
        v-if="isMobile && mobileDrawerOpen"
        class="fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-900 shadow-xl flex flex-col"
        :style="{ width: sidebarWidth }"
      >
        <header
          class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 shrink-0"
        >
          <h2 class="font-semibold text-gray-900 dark:text-gray-100">
            Navigation
          </h2>
          <button
            @click="closeMobileDrawer"
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <Icon
              icon="solar:close-linear"
              class="w-5 h-5 text-gray-600 dark:text-gray-400"
            />
          </button>
        </header>

        <nav class="flex-1 overflow-y-auto p-2">
          <NavigationMenuPrimitive orientation="vertical">
            <NavigationMenuList :class="[ui.list]">
              <template v-for="item in menuItems" :key="item.label">
                <li :class="ui.item">
                  <!-- Item with children -->
                  <!-- Item with children -->
                  <NavigationMenuItem
                    v-if="item.children && item.children.length > 0"
                  >
                    <NavigationMenuTrigger
                      :class="[
                        ui.trigger,
                        item.disabled && 'opacity-50 cursor-not-allowed'
                      ]"
                      :disabled="item.disabled"
                    >
                      <Icon
                        v-if="item.icon"
                        :icon="item.icon"
                        :class="ui.triggerIcon"
                      />
                      <span v-if="!collapsed" class="flex-1 text-left">{{
                        item.label
                      }}</span>
                      <Icon
                        v-if="!collapsed"
                        icon="solar:alt-arrow-down-linear"
                        :class="ui.triggerCaret"
                      />
                    </NavigationMenuTrigger>

                    <NavigationMenuContent :class="ui.content">
                      <ul class="ml-4 mt-1 space-y-1">
                        <li v-for="child in item.children" :key="child.label">
                          <router-link
                            v-if="child.to"
                            :to="child.to"
                            :class="[
                              ui.link,
                              'text-sm',
                              child.disabled &&
                                'opacity-50 cursor-not-allowed pointer-events-none'
                            ]"
                            @click="(e) => handleItemClick(child, e)"
                          >
                            <Icon
                              v-if="child.icon"
                              :icon="child.icon"
                              :class="ui.linkIcon"
                            />
                            <span>{{ child.label }}</span>
                          </router-link>
                          <a
                            v-else
                            :href="child.href || '#'"
                            :class="[
                              ui.link,
                              'text-sm',
                              child.disabled &&
                                'opacity-50 cursor-not-allowed pointer-events-none'
                            ]"
                            @click="(e) => handleItemClick(child, e)"
                          >
                            <Icon
                              v-if="child.icon"
                              :icon="child.icon"
                              :class="ui.linkIcon"
                            />
                            <span>{{ child.label }}</span>
                          </a>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <!-- Item with router link -->
                  <router-link
                    v-else-if="item.to"
                    :to="item.to"
                    :class="[
                      ui.link,
                      item.disabled &&
                        'opacity-50 cursor-not-allowed pointer-events-none'
                    ]"
                    @click="(e) => handleItemClick(item, e)"
                  >
                    <Icon
                      v-if="item.icon"
                      :icon="item.icon"
                      :class="ui.linkIcon"
                    />
                    <span>{{ item.label }}</span>
                  </router-link>

                  <!-- Item with href -->
                  <a
                    v-else
                    :href="item.href || '#'"
                    :class="[
                      ui.link,
                      item.disabled &&
                        'opacity-50 cursor-not-allowed pointer-events-none'
                    ]"
                    @click="(e) => handleItemClick(item, e)"
                  >
                    <Icon
                      v-if="item.icon"
                      :icon="item.icon"
                      :class="ui.linkIcon"
                    />
                    <span>{{ item.label }}</span>
                  </a>

                  <!-- Children -->
                </li>
              </template>
            </NavigationMenuList>
          </NavigationMenuPrimitive>
        </nav>
      </aside>
    </Transition>

    <!-- Mobile Toggle Button (Fixed) -->
    <button
      v-if="isMobile"
      @click="toggleSidebar"
      class="fixed bottom-4 right-4 z-30 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      aria-label="Toggle menu"
    >
      <Icon icon="solar:hamburger-menu-linear" class="w-6 h-6" />
    </button>
  </template>

  <!-- Horizontal Header Mode -->
  <nav
    v-else
    class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 w-full"
  >
    <div class="px-4 py-3 flex items-center justify-between">
      <!-- Desktop Menu -->
      <NavigationMenuPrimitive orientation="horizontal">
        <NavigationMenuList class="hidden md:flex items-center gap-1">
          <template v-for="item in menuItems" :key="item.label">
            <li class="relative group">
              <!-- Item with children (dropdown) -->
              <NavigationMenuItem
                v-if="item.children && item.children.length > 0"
              >
                <NavigationMenuTrigger
                  :class="[
                    ui.trigger,
                    item.disabled && 'opacity-50 cursor-not-allowed'
                  ]"
                  :disabled="item.disabled"
                >
                  <Icon
                    v-if="item.icon"
                    :icon="item.icon"
                    :class="ui.triggerIcon"
                  />
                  <span>{{ item.label }}</span>
                  <Icon
                    icon="solar:alt-arrow-down-linear"
                    class="w-4 h-4 ml-1"
                  />
                </NavigationMenuTrigger>

                <NavigationMenuContent :class="ui.content">
                  <ul class="py-1">
                    <li v-for="child in item.children" :key="child.label">
                      <router-link
                        v-if="child.to"
                        :to="child.to"
                        class="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        @click="(e) => handleItemClick(child, e)"
                      >
                        <Icon
                          v-if="child.icon"
                          :icon="child.icon"
                          class="w-4 h-4"
                        />
                        <span>{{ child.label }}</span>
                      </router-link>
                      <a
                        v-else
                        :href="child.href || '#'"
                        class="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        @click="(e) => handleItemClick(child, e)"
                      >
                        <Icon
                          v-if="child.icon"
                          :icon="child.icon"
                          class="w-4 h-4"
                        />
                        <span>{{ child.label }}</span>
                      </a>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <!-- Item with router link -->
              <router-link
                v-else-if="item.to"
                :to="item.to"
                :class="[
                  ui.link,
                  item.disabled &&
                    'opacity-50 cursor-not-allowed pointer-events-none'
                ]"
                @click="(e) => handleItemClick(item, e)"
              >
                <Icon v-if="item.icon" :icon="item.icon" :class="ui.linkIcon" />
                <span>{{ item.label }}</span>
              </router-link>

              <!-- Item with href -->
              <a
                v-else
                :href="item.href || '#'"
                :class="[
                  ui.link,
                  item.disabled &&
                    'opacity-50 cursor-not-allowed pointer-events-none'
                ]"
                @click="(e) => handleItemClick(item, e)"
              >
                <Icon v-if="item.icon" :icon="item.icon" :class="ui.linkIcon" />
                <span>{{ item.label }}</span>
              </a>

              <!-- Dropdown menu -->
            </li>
          </template>
        </NavigationMenuList>
      </NavigationMenuPrimitive>

      <!-- Mobile Menu Button -->
      <button
        class="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        @click="toggleSidebar"
        aria-label="Toggle menu"
      >
        <Icon icon="solar:hamburger-menu-linear" class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobile && mobileDrawerOpen"
        class="fixed inset-0 bg-black/50 z-40"
        @click="closeMobileDrawer"
      />
    </Transition>

    <!-- Mobile Drawer for Horizontal Mode -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-200 ease-in"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <aside
        v-if="isMobile && mobileDrawerOpen"
        class="fixed inset-y-0 left-0 z-50 w-[280px] bg-white dark:bg-gray-900 shadow-xl flex flex-col"
      >
        <header
          class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 shrink-0"
        >
          <h2 class="font-semibold text-gray-900 dark:text-gray-100">Menu</h2>
          <button
            @click="closeMobileDrawer"
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <Icon
              icon="solar:close-linear"
              class="w-5 h-5 text-gray-600 dark:text-gray-400"
            />
          </button>
        </header>

        <nav class="flex-1 overflow-y-auto p-2">
          <NavigationMenuPrimitive orientation="vertical">
            <NavigationMenuList class="space-y-1">
              <template v-for="item in menuItems" :key="item.label">
                <li>
                  <!-- Item with children -->
                  <NavigationMenuItem
                    v-if="item.children && item.children.length > 0"
                  >
                    <NavigationMenuTrigger
                      :class="[
                        ui.trigger,
                        item.disabled && 'opacity-50 cursor-not-allowed'
                      ]"
                      :disabled="item.disabled"
                    >
                      <Icon
                        v-if="item.icon"
                        :icon="item.icon"
                        :class="ui.triggerIcon"
                      />
                      <span>{{ item.label }}</span>
                      <Icon
                        icon="solar:alt-arrow-down-linear"
                        class="w-4 h-4 ml-1"
                      />
                    </NavigationMenuTrigger>

                    <NavigationMenuContent :class="ui.content">
                      <ul class="py-1">
                        <li v-for="child in item.children" :key="child.label">
                          <router-link
                            v-if="child.to"
                            :to="child.to"
                            class="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            @click="(e) => handleItemClick(child, e)"
                          >
                            <Icon
                              v-if="child.icon"
                              :icon="child.icon"
                              class="w-4 h-4"
                            />
                            <span>{{ child.label }}</span>
                          </router-link>
                          <a
                            v-else
                            :href="child.href || '#'"
                            class="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            @click="(e) => handleItemClick(child, e)"
                          >
                            <Icon
                              v-if="child.icon"
                              :icon="child.icon"
                              class="w-4 h-4"
                            />
                            <span>{{ child.label }}</span>
                          </a>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <!-- Item with router link -->
                  <router-link
                    v-else-if="item.to"
                    :to="item.to"
                    :class="[
                      ui.link,
                      item.disabled &&
                        'opacity-50 cursor-not-allowed pointer-events-none'
                    ]"
                    @click="(e) => handleItemClick(item, e)"
                  >
                    <Icon
                      v-if="item.icon"
                      :icon="item.icon"
                      :class="ui.linkIcon"
                    />
                    <span>{{ item.label }}</span>
                  </router-link>

                  <!-- Item with href -->
                  <a
                    v-else
                    :href="item.href || '#'"
                    :class="[
                      ui.link,
                      item.disabled &&
                        'opacity-50 cursor-not-allowed pointer-events-none'
                    ]"
                    @click="(e) => handleItemClick(item, e)"
                  >
                    <Icon
                      v-if="item.icon"
                      :icon="item.icon"
                      :class="ui.linkIcon"
                    />
                    <span>{{ item.label }}</span>
                  </a>

                  <!-- Children -->
                </li>
              </template>
            </NavigationMenuList>
          </NavigationMenuPrimitive>
        </nav>
      </aside>
    </Transition>
  </nav>
</template>
