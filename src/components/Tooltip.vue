<script setup lang="ts">
import { computed } from 'vue'
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  TooltipArrow
} from 'reka-ui'
import theme from '@/themes/tooltip'

export interface TooltipProps {
  content?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  delayDuration?: number
  arrow?: boolean
  size?: 'sm' | 'md' | 'lg'
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<TooltipProps>(), {
  side: 'top',
  align: 'center',
  sideOffset: 4,
  delayDuration: 200,
  arrow: true,
  size: 'md'
})

const slots = defineSlots<{
  default?: () => any
  content?: () => any
}>()

const ui = computed(() =>theme())
</script>

<template>
  <TooltipRoot :delay-duration="delayDuration">
    <TooltipTrigger as-child>
      <slot />
    </TooltipTrigger>

    <TooltipPortal>
      <TooltipContent
        :class="ui.content({ class: props.ui?.content })"
        :side="side"
        :align="align"
        :side-offset="sideOffset"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <TooltipArrow v-if="arrow" :class="ui.arrow({ class: props.ui?.arrow })" />
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>
