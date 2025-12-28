<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import theme from '@/themes/dashboard-sidebar'
import DashboardSidebarLinks from './DashboardSidebarLinks.vue'
import type { DashboardSidebarLinkItem } from './DashboardSidebarLinks.vue'

export interface DashboardSidebarProps {
  side?: 'left' | 'right'
  collapsed?: boolean
  collapsible?: boolean
  mobileOpen?: boolean
  width?: string
  collapsedWidth?: string
  links?: DashboardSidebarLinkItem[]
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<DashboardSidebarProps>(), {
  side: 'left',
  collapsed: false,
  collapsible: false,
  mobileOpen: false,
  width: '16rem',
  collapsedWidth: '4rem'
})

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
  'update:mobileOpen': [value: boolean]
}>()

// Mobile detection
const isMobile = ref(false)

const checkMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768 // md breakpoint
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    checkMobile()
    window.addEventListener('resize', checkMobile)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', checkMobile)
  }
})

// Computed properties
const isCollapsed = computed({
  get: () => props.collapsed,
  set: (value: boolean) => {
    if (!isMobile.value || !props.mobileOpen) {
      emit('update:collapsed', value)
    }
  }
})

const isMobileOpen = computed({
  get: () => props.mobileOpen,
  set: (value: boolean) => emit('update:mobileOpen', value)
})

const ui = computed(() =>
  theme({
    side: props.side,
    collapsed: isCollapsed.value,
    mobileOpen: isMobileOpen.value && isMobile.value
  })
)

const toggleCollapsed = () => {
  if (props.collapsible) {
    isCollapsed.value = !isCollapsed.value
  }
}

const toggleMobile = () => {
  isMobileOpen.value = !isMobileOpen.value
}
</script>

<template>
  <!-- Mobile overlay -->
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isMobileOpen && isMobile"
      :class="ui.overlay()"
      class="fixed inset-0 z-40 bg-black/50"
      @click="isMobileOpen = false"
    />
  </Transition>

  <!-- Sidebar -->
  <aside
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :data-side="side"
    :data-collapsed="isCollapsed"
    :data-mobile="isMobile"
  >
    <div v-if="$slots.header" :class="ui.header({ class: props.ui?.header })">
      <slot name="header" :collapsed="isCollapsed" :toggle="toggleCollapsed" :is-mobile="isMobile" />
    </div>

    <div :class="ui.body({ class: props.ui?.body })">
      <slot :collapsed="isCollapsed" :toggle="toggleCollapsed" :is-mobile="isMobile">
        <DashboardSidebarLinks
          v-if="props.links"
          :links="props.links"
          :collapsed="isCollapsed"
        />
      </slot>
    </div>

    <div v-if="$slots.footer" :class="ui.footer({ class: props.ui?.footer })">
      <slot name="footer" :collapsed="isCollapsed" :toggle="toggleCollapsed" :is-mobile="isMobile" />
    </div>
  </aside>
</template>