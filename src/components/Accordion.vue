<script setup lang="ts">
import { computed } from 'vue'
import {
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent
} from 'reka-ui'
import theme from '@/themes/accordion'

export interface AccordionItem {
  label?: string
  content?: string
  value?: string
  disabled?: boolean
  icon?: string
  defaultOpen?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  type?: 'single' | 'multiple'
  collapsible?: boolean
  defaultValue?: string | string[]
  disabled?: boolean
  variant?: 'default' | 'separated' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<AccordionProps>(), {
  type: 'single',
  variant: 'default',
  size: 'md'
})

const accordionTheme = computed(() =>
  theme({
    variant: props.variant,
    size: props.size
  })
)
</script>

<template>
  <AccordionRoot
    :type="type"
    :collapsible="collapsible"
    :default-value="defaultValue"
    :disabled="disabled"
    :class="accordionTheme.root({ class: ui?.root })"
  >
    <AccordionItem
      v-for="(item, index) in items"
      :key="item.value || index"
      :value="item.value || String(index)"
      :disabled="item.disabled || disabled"
      :class="accordionTheme.item({ class: ui?.item })"
    >
      <AccordionHeader as-child>
        <AccordionTrigger
          :class="accordionTheme.trigger({ class: ui?.trigger })"
        >
          <div class="flex items-center gap-2">
            <slot name="leading" :item="item" :index="index">
              <span v-if="item.icon" class="text-muted-foreground">
                {{ item.icon }}
              </span>
            </slot>

            <span>
              <slot name="label" :item="item" :index="index">
                {{ item.label }}
              </slot>
            </span>
          </div>

          <slot name="trailing" :item="item" :index="index">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="accordionTheme.icon({ class: ui?.icon })"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </slot>
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent :class="accordionTheme.content({ class: ui?.content })">
        <div :class="accordionTheme.contentInner({ class: ui?.contentInner })">
          <slot name="content" :item="item" :index="index">
            {{ item.content }}
          </slot>
        </div>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>

<style>
.overflow-hidden[data-state='open'] {
  animation: accordion-down 0.2s ease-out;
}

.overflow-hidden[data-state='closed'] {
  animation: accordion-up 0.2s ease-out;
}
</style>
