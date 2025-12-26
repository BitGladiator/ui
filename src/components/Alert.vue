<script setup lang="ts">
import { computed } from 'vue'
import Button from './Button.vue'
import Icon from './Icon.vue'
import Avatar from './Avatar.vue'
import theme from '@/themes/alert'

export interface AlertProps {
  title?: string
  description?: string
  icon?: string
  avatar?: {
    src?: string
    alt?: string
    fallback?: string
  }
  color?: 'info' | 'success' | 'warning' | 'critical' | 'neutral'
  orientation?: 'horizontal' | 'vertical'
  closable?: boolean
  actions?: Array<{
    label: string
    variant?: 'primary' | 'secondary' | 'tertiary' | 'plain' | 'monochromePlain'
    tone?: 'default' | 'success' | 'critical'
    onClick?: () => void
  }>
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<AlertProps>(), {
  color: 'info',
  orientation: 'vertical',
  closable: false
})

const emit = defineEmits<{
  close: []
}>()

const alertTheme = computed(() =>
  theme({
    color: props.color,
    orientation: props.orientation
  })
)

const displayIcon = computed(() => {
  if (props.icon) return props.icon
  if (props.avatar) return undefined

  const defaultIcons = {
    info: 'solar:info-circle-linear',
    success: 'solar:check-circle-linear',
    warning: 'solar:danger-triangle-linear',
    critical: 'solar:close-circle-linear',
    neutral: 'solar:lightbulb-linear'
  }

  return defaultIcons[props.color]
})

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <div
    :data-orientation="orientation"
    :class="alertTheme.root({ class: [ui?.root, props.class] })"
  >
    <!-- Leading (Icon or Avatar) -->
    <slot name="leading">
      <Avatar
        v-if="avatar"
        size="lg"
        v-bind="avatar"
        :class="alertTheme.avatar({ class: ui?.avatar })"
      />
      <Icon
        v-else-if="displayIcon"
        :name="displayIcon"
        :class="alertTheme.icon({ class: ui?.icon })"
      />
    </slot>

    <!-- Content Wrapper -->
    <div :class="alertTheme.wrapper({ class: ui?.wrapper })">
      <div
        v-if="title || $slots.title"
        :class="alertTheme.title({ class: ui?.title })"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>

      <div
        v-if="description || $slots.description"
        :class="alertTheme.description({ class: ui?.description })"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </div>

      <!-- Actions (Vertical orientation) -->
      <div
        v-if="orientation === 'vertical' && (actions?.length || $slots.actions)"
        :class="alertTheme.actions({ class: ui?.actions })"
      >
        <slot name="actions">
          <Button
            v-for="(action, index) in actions"
            :key="index"
            size="sm"
            v-bind="action"
            @click="action.onClick"
          >
            {{ action.label }}
          </Button>
        </slot>
      </div>
    </div>

    <!-- Actions (Horizontal orientation) or Close Button -->
    <div
      v-if="
        (orientation === 'horizontal' && (actions?.length || $slots.actions)) ||
        closable
      "
      :class="alertTheme.actions({ class: ui?.actions })"
    >
      <template
        v-if="
          orientation === 'horizontal' && (actions?.length || $slots.actions)
        "
      >
        <slot name="actions">
          <Button
            v-for="(action, index) in actions"
            :key="index"
            size="sm"
            v-bind="action"
            @click="action.onClick"
          >
            {{ action.label }}
          </Button>
        </slot>
      </template>

      <Button
        v-if="closable"
        variant="monochromePlain"
        size="md"
        trailing-icon="solar:close-circle-linear"
        :class="alertTheme.closeButton({ class: ui?.closeButton })"
        aria-label="Close alert"
        @click="handleClose"
      />
    </div>
  </div>
</template>
