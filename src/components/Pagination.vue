<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import paginationTheme from '@/themes/pagination'
import UButton from './Button.vue'

export interface PaginationProps {
  as?: string | object
  page?: number
  total?: number
  itemsPerPage?: number
  siblingCount?: number
  showEdges?: boolean
  showControls?: boolean
  disabled?: boolean
  color?: string
  variant?: 'primary' | 'secondary' | 'tertiary' | 'plain' | 'monochromePlain'
  activeColor?: string
  activeVariant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'plain'
    | 'monochromePlain'
  size?: 'sm' | 'md' | 'lg'
  to?: (page: number) => string | object
  firstIcon?: string
  prevIcon?: string
  nextIcon?: string
  lastIcon?: string
  ellipsisIcon?: string
  class?: string | object | any[]
  ui?: {
    root?: string
    list?: string
    first?: string
    prev?: string
    item?: string
    button?: string
    label?: string
    ellipsis?: string
    next?: string
    last?: string
  }
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PaginationProps>(), {
  as: 'nav',
  page: 1,
  total: 0,
  itemsPerPage: 10,
  siblingCount: 2,
  showEdges: false,
  showControls: true,
  disabled: false,
  color: 'neutral',
  variant: 'plain',
  activeColor: 'primary',
  activeVariant: 'primary',
  size: 'md',
  firstIcon: 'solar:double-alt-arrow-left-linear',
  prevIcon: 'solar:alt-arrow-left-linear',
  nextIcon: 'solar:alt-arrow-right-linear',
  lastIcon: 'solar:double-alt-arrow-right-linear',
  ellipsisIcon: 'solar:menu-dots-linear'
})

const emit = defineEmits(['update:page'])

const slots = defineSlots()

const ui = computed(() =>
  paginationTheme({
    size: props.size,
    disabled: props.disabled
  })
)

const pageCount = computed(() => Math.ceil(props.total / props.itemsPerPage))

const isFirstPage = computed(() => props.page === 1)
const isLastPage = computed(() => props.page >= pageCount.value)

const pages = computed(() => {
  const pages: (number | string)[] = []
  const { siblingCount, showEdges } = props
  const currentPage = props.page

  if (pageCount.value <= 1) return [1]

  // Always show first page if showEdges
  if (showEdges && currentPage > siblingCount + 2) {
    pages.push(1)
    pages.push('ellipsis-start')
  }

  // Calculate range around current page
  const start = Math.max(1, currentPage - siblingCount)
  const end = Math.min(pageCount.value, currentPage + siblingCount)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  // Always show last page if showEdges
  if (showEdges && currentPage < pageCount.value - siblingCount - 1) {
    pages.push('ellipsis-end')
    pages.push(pageCount.value)
  }

  return pages
})

const goToPage = (page) => {
  if (props.disabled || page < 1 || page > pageCount.value) return
  emit('update:page', page)
}

const goToFirst = () => goToPage(1)
const goToPrev = () => goToPage(props.page - 1)
const goToNext = () => goToPage(props.page + 1)
const goToLast = () => goToPage(pageCount.value)
</script>

<template>
  <Primitive
    :as="props.as"
    aria-label="Pagination"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    v-bind="$attrs"
  >
    <ul data-slot="list" :class="ui.list({ class: props.ui?.list })">
      <!-- First button -->
      <li
        v-if="showControls"
        data-slot="first"
        :class="ui.first({ class: props.ui?.first })"
      >
        <slot
          name="first"
          :disabled="isFirstPage || disabled"
          :onClick="goToFirst"
        >
          <UButton
            :icon="firstIcon"
            :color="color"
            :variant="variant"
            :size="size"
            :disabled="isFirstPage || disabled"
            :to="to ? to(1) : undefined"
            @click="goToFirst"
          />
        </slot>
      </li>

      <!-- Previous button -->
      <li
        v-if="showControls"
        data-slot="prev"
        :class="ui.prev({ class: props.ui?.prev })"
      >
        <slot
          name="prev"
          :disabled="isFirstPage || disabled"
          :onClick="goToPrev"
        >
          <UButton
            :icon="prevIcon"
            :color="color"
            :variant="variant"
            :size="size"
            :disabled="isFirstPage || disabled"
            :to="to ? to(page - 1) : undefined"
            @click="goToPrev"
          />
        </slot>
      </li>

      <!-- Page numbers -->
      <li
        v-for="(item, index) in pages"
        :key="index"
        data-slot="item"
        :class="ui.item({ class: props.ui?.item })"
      >
        <slot
          v-if="typeof item === 'number'"
          name="item"
          :page="item"
          :pageCount="pageCount"
          :active="item === page"
          :onClick="() => goToPage(item)"
        >
          <UButton
            :color="item === page ? activeColor : color"
            :variant="item === page ? activeVariant : variant"
            :size="size"
            :disabled="disabled"
            :to="to ? to(item) : undefined"
            @click="() => goToPage(item)"
          >
            <span
              data-slot="label"
              :class="ui.label({ class: props.ui?.label })"
            >
              {{ item }}
            </span>
          </UButton>
        </slot>

        <slot v-else name="ellipsis">
          <div
            data-slot="ellipsis"
            :class="ui.ellipsis({ class: props.ui?.ellipsis })"
          >
            <UButton
              :icon="ellipsisIcon"
              :color="color"
              :variant="variant"
              :size="size"
              disabled
            />
          </div>
        </slot>
      </li>

      <!-- Next button -->
      <li
        v-if="showControls"
        data-slot="next"
        :class="ui.next({ class: props.ui?.next })"
      >
        <slot
          name="next"
          :disabled="isLastPage || disabled"
          :onClick="goToNext"
        >
          <UButton
            :icon="nextIcon"
            :color="color"
            :variant="variant"
            :size="size"
            :disabled="isLastPage || disabled"
            :to="to ? to(page + 1) : undefined"
            @click="goToNext"
          />
        </slot>
      </li>

      <!-- Last button -->
      <li
        v-if="showControls"
        data-slot="last"
        :class="ui.last({ class: props.ui?.last })"
      >
        <slot
          name="last"
          :disabled="isLastPage || disabled"
          :onClick="goToLast"
        >
          <UButton
            :icon="lastIcon"
            :color="color"
            :variant="variant"
            :size="size"
            :disabled="isLastPage || disabled"
            :to="to ? to(pageCount) : undefined"
            @click="goToLast"
          />
        </slot>
      </li>
    </ul>
  </Primitive>
</template>
