<script setup lang="ts">
  import { computed } from 'vue'
  import theme from '@/themes/dashboard-sidebar'
  import DashboardSidebarLinks from './DashboardSidebarLinks.vue'
  import type { DashboardSidebarLinkItem } from './DashboardSidebarLinks.vue'
  
  // Re-export for convenience
  export type { DashboardSidebarLinkItem }
  
  export interface DashboardSidebarProps {
    side?: 'left' | 'right'
    collapsed?: boolean
    collapsible?: boolean
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
    width: '16rem',
    collapsedWidth: '4rem'
  })
  
  const emit = defineEmits<{
    'update:collapsed': [value: boolean]
  }>()
  
  const isCollapsed = computed({
    get: () => props.collapsed,
    set: (value: boolean) => emit('update:collapsed', value)
  })
  
  const ui = computed(() =>
    theme({
      side: props.side,
      collapsed: isCollapsed.value
    })
  )
  
  const sidebarWidth = computed(() =>
    isCollapsed.value ? props.collapsedWidth : props.width
  )
  
  const toggleCollapsed = () => {
    if (props.collapsible) {
      isCollapsed.value = !isCollapsed.value
    }
  }
  </script>
  
  <template>
    <aside
      :data-collapsed="isCollapsed"
      :data-side="side"
      :class="ui.root({ class: [props.ui?.root, props.class] })"
      :style="{ width: sidebarWidth }"
      class="hidden md:block"
    >
      <div v-if="$slots.header" :class="ui.header({ class: props.ui?.header })">
        <slot name="header" :collapsed="isCollapsed" :toggle="toggleCollapsed" />
      </div>
  
      <div :class="ui.body({ class: props.ui?.body })">
        <slot :collapsed="isCollapsed" :toggle="toggleCollapsed">
          <DashboardSidebarLinks
            v-if="props.links"
            :links="props.links"
            :collapsed="isCollapsed"
          />
        </slot>
      </div>
  
      <div v-if="$slots.footer" :class="ui.footer({ class: props.ui?.footer })">
        <slot name="footer" :collapsed="isCollapsed" :toggle="toggleCollapsed" />
      </div>
    </aside>
  </template>
  
  <style scoped>
  aside {
    transition: width 0.2s ease-in-out;
  }
  </style>