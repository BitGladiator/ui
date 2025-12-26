<script setup lang="ts">
import { computed, watch } from 'vue'
import { Primitive } from 'reka-ui'
import bannerTheme from '@/themes/banner'
import Link from './Link.vue'
import Icon from '@/components/Icon.vue'
import Button from './Button.vue'

export interface BannerProps {
  as?: string
  id?: string
  icon?: string
  title?: string
  actions?: any[]
  to?: string | object
  target?: string
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'error'
    | 'neutral'
  close?: boolean | object
  closeIcon?: string
  class?: string | object | any[]
  ui?: {
    root?: string
    container?: string
    left?: string
    center?: string
    right?: string
    content?: string
    icon?: string
    title?: string
    description?: string
    actions?: string
    close?: string
  }
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BannerProps>(), {
  as: 'div',
  color: 'primary',
  close: false,
  actions: () => []
})

const slots = defineSlots()

const emits = defineEmits(['close'])

const ui = computed(() =>
  bannerTheme({
    color: props.color,
    to: !!props.to
  })
)

const id = computed(() => `banner-${props.id || '1'}`)

watch(
  id,
  (newId) => {
    if (typeof document === 'undefined' || typeof localStorage === 'undefined')
      return

    const isClosed = localStorage.getItem(newId) === 'true'
    const htmlElement = document.querySelector('html')

    htmlElement?.classList.toggle('hide-banner', isClosed)
  },
  { immediate: true }
)

const onClose = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(id.value, 'true')
  }
  if (typeof document !== 'undefined') {
    document.querySelector('html')?.classList.add('hide-banner')
  }
  emits('close')
}
</script>

<template>
  <Primitive
    :as="props.as"
    class="banner"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
  >
    <Link
      v-if="props.to"
      :aria-label="props.title"
      v-bind="{ to: props.to, target: props.target, ...$attrs }"
      class="focus:outline-none"
      tabindex="-1"
      raw
    >
      <span class="absolute inset-0" aria-hidden="true" />
    </Link>

    <div
      class="container"
      data-slot="container"
      :class="ui.container({ class: props.ui?.container })"
    >
      <div data-slot="left" :class="ui.left({ class: props.ui?.left })" />

      <div data-slot="center" :class="ui.center({ class: props.ui?.center })">
        <slot name="leading" :ui="ui">
          <Icon
            v-if="props.icon"
            :name="props.icon"
            data-slot="icon"
            :class="ui.icon({ class: props.ui?.icon })"
          />
        </slot>

        <div
          v-if="props.title || !!slots.title"
          data-slot="title"
          :class="ui.title({ class: props.ui?.title })"
        >
          <slot name="title">
            {{ props.title }}
          </slot>
        </div>

        <div
          v-if="props.actions?.length || !!slots.actions"
          data-slot="actions"
          :class="ui.actions({ class: props.ui?.actions })"
        >
          <slot name="actions">
            <Button
              v-for="(action, index) in props.actions"
              :key="index"
              color="neutral"
              size="sm"
              v-bind="action"
            />
          </slot>
        </div>
      </div>

      <div data-slot="right" :class="ui.right({ class: props.ui?.right })">
        <slot name="close" :ui="ui">
          <button
            v-if="props.close"
            aria-label="Close banner"
            data-slot="close"
            :class="ui.close({ class: props.ui?.close })"
            class="cursor-pointer"
            @click="onClose"
          >
            <Icon
              :name="props.closeIcon || 'solar:close-circle-linear'"
              class="w-4 h-4"
            />
          </button>
        </slot>
      </div>
    </div>
  </Primitive>
</template>

<style scoped>
.hide-banner .banner {
  display: none;
}
</style>
