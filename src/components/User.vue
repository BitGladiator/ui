<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import theme from '@/themes/user'
import Link from './Link.vue'

export interface UserProps {
  as?: string | object
  name?: string
  description?: string
  avatar?: any
  chip?: boolean | object
  size?: string
  orientation?: 'horizontal' | 'vertical'
  to?: string | object
  target?: string
  onClick?: () => void
  class?: string | object | any[]
  ui?: {
    root?: string
    avatar?: string
    wrapper?: string
    content?: string
    name?: string
    description?: string
  }
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<UserProps>(), {
  as: 'div',
  size: 'md',
  orientation: 'horizontal'
})

const slots = defineSlots()

const ui = computed(() => theme())
</script>

<template>
  <Primitive
    :as="props.as"
    :data-orientation="props.orientation"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    @click="props.onClick"
  >
    <slot name="avatar" :ui="ui">
      <!-- TODO: Replace with Avatar component when available -->
      <div
        v-if="avatar"
        data-slot="avatar"
        :class="ui.avatar({ class: props.ui?.avatar })"
      >
        <div
          class="rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium"
          :class="{
            'w-6 h-6 text-xs': size === '3xs' || size === '2xs',
            'w-8 h-8 text-sm': size === 'xs' || size === 'sm',
            'w-10 h-10 text-base': size === 'md',
            'w-12 h-12 text-lg': size === 'lg'
          }"
        >
          {{
            avatar.text ||
            (props.name ? props.name.charAt(0).toUpperCase() : '?')
          }}
        </div>
      </div>
    </slot>

    <div data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
      <Link
        v-if="to"
        :aria-label="props.name"
        v-bind="{ to: props.to, target: props.target, ...$attrs }"
        class="focus:outline-none peer"
        raw
      >
        <span class="absolute inset-0" aria-hidden="true" />
      </Link>

      <slot>
        <p
          v-if="props.name || !!slots.name"
          data-slot="name"
          :class="ui.name({ class: props.ui?.name })"
        >
          <slot name="name">
            {{ props.name }}
          </slot>
        </p>
        <p
          v-if="props.description || !!slots.description"
          data-slot="description"
          :class="ui.description({ class: props.ui?.description })"
        >
          <slot name="description">
            {{ props.description }}
          </slot>
        </p>
      </slot>
    </div>
  </Primitive>
</template>
