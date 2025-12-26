<script setup lang="ts">
import { computed } from 'vue'
import theme from '@/themes/empty'
import Avatar from './Avatar.vue'
import Button from './Button.vue'

export interface EmptyProps {
  icon?: string
  avatar?: {
    src?: string
    alt?: string
    fallback?: string
  }
  title?: string
  description?: string
  actions?: Array<{
    label: string
    leadingIcon?: string
    variant?: 'primary' | 'secondary' | 'tertiary' | 'plain' | 'monochromePlain'
    tone?: 'default' | 'success' | 'critical'
    onClick?: () => void
  }>
  variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'naked'
  size?: 'sm' | 'md' | 'lg'
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<EmptyProps>(), {
  variant: 'outline',
  size: 'md'
})

const ui = computed(() =>
  theme({
    variant: props.variant,
    size: props.size
  })
)
</script>

<template>
  <div :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div
      v-if="
        $slots.header ||
        icon ||
        avatar ||
        $slots.leading ||
        title ||
        $slots.title ||
        description ||
        $slots.description
      "
      :class="ui.header({ class: props.ui?.header })"
    >
      <slot name="header">
        <slot name="leading" :ui="ui">
          <Avatar
            v-if="icon || avatar"
            :icon="icon"
            v-bind="typeof avatar === 'object' ? avatar : {}"
            :class="ui.avatar({ class: props.ui?.avatar })"
          />
        </slot>

        <h2
          v-if="title || $slots.title"
          :class="ui.title({ class: props.ui?.title })"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </h2>

        <div
          v-if="description || $slots.description"
          :class="ui.description({ class: props.ui?.description })"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </slot>
    </div>

    <div
      v-if="$slots.body || actions?.length || $slots.actions"
      :class="ui.body({ class: props.ui?.body })"
    >
      <slot name="body">
        <div
          v-if="actions?.length || $slots.actions"
          :class="ui.actions({ class: props.ui?.actions })"
        >
          <slot name="actions">
            <Button
              v-for="(action, index) in actions"
              :key="index"
              :size="size"
              :label="action.label"
              :leadingIcon="action.leadingIcon"
              :variant="action.variant"
              :tone="action.tone"
              @click="action.onClick"
            />
          </slot>
        </div>
      </slot>
    </div>

    <div v-if="$slots.footer" :class="ui.footer({ class: props.ui?.footer })">
      <slot name="footer" />
    </div>
  </div>
</template>
