<script setup lang="ts">
import { computed } from 'vue'
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverArrow,
  PopoverClose
} from 'reka-ui'
import theme from '@/themes/popover'

export interface PopoverProps {
  defaultOpen?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  collisionPadding?: number
  arrow?: boolean
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<PopoverProps>(), {
  side: 'bottom',
  align: 'center',
  sideOffset: 8,
  collisionPadding: 8,
  arrow: false,
  defaultOpen: false
})

const popoverTheme = computed(() => theme())
</script>

<template>
  <PopoverRoot :default-open="defaultOpen">
    <PopoverTrigger as-child>
      <slot />
    </PopoverTrigger>

    <PopoverPortal>
      <PopoverContent
        :class="popoverTheme.content({ class: ui?.content })"
        :side="side"
        :align="align"
        :side-offset="sideOffset"
        :collision-padding="collisionPadding"
      >
        <slot name="content" />

        <PopoverArrow
          v-if="arrow"
          :class="popoverTheme.arrow({ class: ui?.arrow })"
        />

        <PopoverClose
          v-if="$slots.close"
          :as-child="true"
          class="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <slot name="close" />
        </PopoverClose>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
