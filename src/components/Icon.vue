<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'
import { computed } from 'vue'
import iconTheme from '@/themes/icon'

export interface IconProps {
  /** Icon name from Iconify (e.g., 'solar:user-bold', 'solar:home-linear') */
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  class?: string | string[] | Record<string, boolean>
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 'md'
})

const iconClasses = computed(() =>
  iconTheme({
    size: props.size,
    class: props.class
  })
)

// Simple emoji detection
const isEmoji = computed(() => {
  return /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u.test(props.name)
})
</script>

<template>
  <!-- Emoji rendering -->
  <span v-if="isEmoji" :class="iconClasses" role="img" aria-label="icon">
    {{ name }}
  </span>

  <!-- Iconify icon rendering -->
  <IconifyIcon v-else :icon="name" :class="iconClasses" />
</template>
