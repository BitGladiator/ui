<script setup lang="ts">
import { computed, ref, onMounted, nextTick, useTemplateRef } from 'vue'
import {
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  useForwardPropsEmits,
  type ToastRootProps,
  type ToastRootEmits
} from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import toastTheme from '@/themes/toast'
import Icon from './Icon.vue'
import Avatar from './Avatar.vue'
import Button from './Button.vue'

export interface ToastActionButton {
  label: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'tertiary' | 'plain'
  tone?: 'default' | 'success' | 'critical'
}

export interface ToastProps
  extends Pick<
    ToastRootProps,
    'defaultOpen' | 'open' | 'type' | 'duration' | 'as'
  > {
  id?: string | number
  title?: string
  description?: string
  icon?: string
  avatar?: {
    src?: string
    alt?: string
    fallback?: string
  }
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  orientation?: 'horizontal' | 'vertical'
  close?: boolean
  closeIcon?: string
  actions?: ToastActionButton[]
  onClick?: (toast: any) => void
  class?: string
  ui?: Record<string, any>
}

export interface ToastEmits extends ToastRootEmits {}

const props = withDefaults(defineProps<ToastProps>(), {
  orientation: 'vertical',
  close: true,
  closeIcon: 'solar:close-circle-linear',
  color: 'primary'
})

const emits = defineEmits<ToastEmits>()

const rootProps = useForwardPropsEmits(
  reactivePick(props, 'as', 'defaultOpen', 'open', 'duration', 'type'),
  emits
)

const typeIcon = computed(() => {
  if (props.icon) return props.icon
  if (props.avatar) return undefined

  const icons = {
    primary: 'solar:info-circle-linear',
    success: 'solar:check-circle-linear',
    warning: 'solar:danger-triangle-linear',
    error: 'solar:close-circle-linear',
    info: 'solar:info-circle-linear',
    neutral: 'solar:lightbulb-linear'
  }
  return icons[props.color as keyof typeof icons]
})

const ui = computed(() =>
  toastTheme({
    color: props.color,
    orientation: props.orientation,
    hasTitle: !!props.title
  })
)

const rootRef = useTemplateRef('rootRef')
const height = ref(0)

onMounted(() => {
  if (!rootRef.value) {
    return
  }

  nextTick(() => {
    height.value = rootRef.value?.$el?.getBoundingClientRect()?.height || 0
  })
})

defineExpose({
  height
})
</script>

<template>
  <ToastRoot
    ref="rootRef"
    v-bind="rootProps"
    :data-orientation="orientation"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :style="{ '--height': height + 'px' }"
  >
    <slot name="leading">
      <Avatar
        v-if="avatar"
        size="lg"
        v-bind="avatar"
        data-slot="avatar"
        :class="ui.avatar({ class: props.ui?.avatar })"
      />
      <Icon
        v-else-if="typeIcon"
        :name="typeIcon"
        data-slot="icon"
        :class="ui.icon({ class: props.ui?.icon })"
      />
    </slot>

    <div data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
      <ToastTitle
        v-if="title"
        data-slot="title"
        :class="ui.title({ class: props.ui?.title })"
      >
        {{ title }}
      </ToastTitle>
      <ToastDescription
        v-if="description"
        data-slot="description"
        :class="ui.description({ class: props.ui?.description })"
      >
        {{ description }}
      </ToastDescription>

      <div
        v-if="orientation === 'vertical' && actions?.length"
        data-slot="actions"
        :class="ui.actions({ class: props.ui?.actions })"
      >
        <ToastAction
          v-for="(action, index) in actions"
          :key="index"
          :alt-text="action.label || 'Action'"
          as-child
          @click.stop
        >
          <Button
            size="sm"
            :color="color"
            v-bind="action"
            @click="action.onClick"
          >
            {{ action.label }}
          </Button>
        </ToastAction>
      </div>
    </div>

    <div
      v-if="(orientation === 'horizontal' && actions?.length) || close"
      data-slot="actions"
      :class="ui.actions({ class: props.ui?.actions })"
    >
      <template v-if="orientation === 'horizontal' && actions?.length">
        <ToastAction
          v-for="(action, index) in actions"
          :key="index"
          :alt-text="action.label || 'Action'"
          as-child
          @click.stop
        >
          <Button
            size="sm"
            :color="color"
            v-bind="action"
            @click="action.onClick"
          >
            {{ action.label }}
          </Button>
        </ToastAction>
      </template>

      <ToastClose v-if="close" as-child>
        <Button
          :leading-icon="closeIcon"
          variant="plain"
          size="sm"
          square
          aria-label="Close toast"
          data-slot="close"
          :class="ui.close({ class: props.ui?.close })"
          @click.stop
        />
      </ToastClose>
    </div>
  </ToastRoot>
</template>
