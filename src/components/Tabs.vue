<template>
  <div :class="ui.root()" v-bind="$attrs">
    <!-- Tab list -->
    <div :class="tabListClasses" role="tablist" :aria-orientation="orientation">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.value || index"
        :class="getTabClasses(tab, index)"
        :data-active="isActive(tab, index)"
        :aria-selected="isActive(tab, index)"
        :aria-controls="`panel-${tab.value || index}`"
        :disabled="tab.disabled"
        role="tab"
        @click="selectTab(tab, index)"
      >
        <Icon v-if="tab.icon" :name="tab.icon" class="shrink-0 size-4" />
        <span v-if="tab.label">{{ tab.label }}</span>
        <span v-if="tab.badge" :class="badgeClasses">
          {{ tab.badge }}
        </span>
      </button>
    </div>

    <!-- Tab panels -->
    <div v-if="!content" :class="ui.content()">
      <div
        v-for="(tab, index) in tabs"
        :key="`panel-${tab.value || index}`"
        v-show="isActive(tab, index)"
        :id="`panel-${tab.value || index}`"
        role="tabpanel"
        :aria-labelledby="`tab-${tab.value || index}`"
      >
        <slot
          :name="tab.slot || 'default'"
          :tab="tab"
          :index="index"
          :active="isActive(tab, index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import tabsTheme from '@/themes/tabs'
import Icon from './Icon.vue'

export interface TabItem {
  label?: string
  value?: string | number
  icon?: string
  badge?: string | number
  disabled?: boolean
  slot?: string
}

export interface TabsProps {
  modelValue?: string | number
  defaultValue?: string | number
  items?: TabItem[]
  orientation?: 'horizontal' | 'vertical'
  variant?: 'line' | 'pill' | 'card'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'neutral'
  indicator?: boolean
  content?: boolean
}

const props = withDefaults(defineProps<TabsProps>(), {
  orientation: 'horizontal',
  variant: 'line',
  size: 'md',
  color: 'primary',
  indicator: true,
  content: true,
  items: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [tab: TabItem, index: number]
}>()

const tabs = computed(() => props.items || [])

const activeValue = computed({
  get: () =>
    props.modelValue ?? props.defaultValue ?? tabs.value[0]?.value ?? 0,
  set: (value: string | number) => emit('update:modelValue', value)
})

const tabListClasses = computed(() => ui.value.list())

const ui = computed(() =>
  tabsTheme({
    size: props.size,
    variant: props.variant,
    orientation: props.orientation
  })
)

const getTabClasses = (_tab: TabItem, _index: number) => {
  return ui.value.trigger()
}

const badgeClasses = computed(() =>
  [
    'inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-xs font-medium rounded-full',
    'bg-primary text-primary-foreground'
  ].join(' ')
)

const isActive = (tab: TabItem, index: number): boolean => {
  const value = tab.value ?? index
  return value === activeValue.value
}

const selectTab = (tab: TabItem, index: number) => {
  if (tab.disabled) return

  const value = tab.value ?? index
  activeValue.value = value
  emit('change', tab, index)
}
</script>
