<script setup lang="ts">
  import { computed } from 'vue'
  import theme from '@/themes/dashboard-toolbar'
  
  export interface DashboardToolbarProps {
    class?: string
    ui?: Record<string, any>
  }
  
  const props = defineProps<DashboardToolbarProps>()
  
  const ui = computed(() => theme())
  </script>
  
  <template>
    <div :class="ui.root({ class: [props.ui?.root, props.class] })">
      <slot>
        <div :class="ui.left({ class: [props.ui?.left] })">
          <slot name="left" />
        </div>
  
        <div :class="ui.right({ class: [props.ui?.right] })">
          <slot name="right" />
        </div>
      </slot>
    </div>
  </template>