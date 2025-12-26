<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  useVueTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  FlexRender
} from '@tanstack/vue-table'
import type {
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
  ExpandedState,
  PaginationState
} from '@tanstack/vue-table'
import dataTableTheme from '@/themes/data-table'
import Input from './Input.vue'
import Icon from './Icon.vue'
import Pagination from './Pagination.vue'

export interface DataTableProps {
  // Data
  columns: any[]
  data?: any[]

  // Features
  enableSorting?: boolean
  enableFiltering?: boolean
  enablePagination?: boolean
  enableRowSelection?: boolean
  enableColumnVisibility?: boolean
  enableExpanding?: boolean
  enableGrouping?: boolean

  // Models (v-model support)
  sorting?: SortingState
  columnFilters?: ColumnFiltersState
  columnVisibility?: VisibilityState
  rowSelection?: RowSelectionState
  expanded?: ExpandedState
  pagination?: PaginationState
  globalFilter?: string

  // Config
  pageSize?: number
  pageSizeOptions?: number[]
  searchPlaceholder?: string
  searchable?: boolean

  // Styling
  striped?: boolean
  bordered?: boolean
  compact?: boolean
  hoverable?: boolean
  sticky?: boolean

  // States
  loading?: boolean
  empty?: string

  // Customization
  class?: string | string[] | Record<string, boolean>
  ui?: Record<string, any>

  // TanStack Table options (passthrough)
  meta?: any
  getRowId?: (row: any, index: number) => string
  onHover?: (row: any) => void
  onSelect?: (row: any) => void
}

const props = withDefaults(defineProps<DataTableProps>(), {
  data: () => [],
  enableSorting: true,
  enableFiltering: true,
  enablePagination: true,
  enableRowSelection: false,
  enableColumnVisibility: false,
  enableExpanding: false,
  enableGrouping: false,
  pageSize: 10,
  pageSizeOptions: () => [10, 20, 50, 100],
  searchPlaceholder: 'Search...',
  searchable: true,
  striped: false,
  bordered: false,
  compact: false,
  hoverable: true,
  sticky: false,
  loading: false,
  empty: 'No data available'
})

const emit = defineEmits<{
  'update:sorting': [value: SortingState]
  'update:columnFilters': [value: ColumnFiltersState]
  'update:columnVisibility': [value: VisibilityState]
  'update:rowSelection': [value: RowSelectionState]
  'update:expanded': [value: ExpandedState]
  'update:pagination': [value: PaginationState]
  'update:globalFilter': [value: string]
  'row:click': [row: any]
  'row:hover': [row: any]
  'row:select': [row: any]
}>()

const slots = defineSlots()

// Internal state (used when no v-model)
const internalGlobalFilter = ref(props.globalFilter ?? '')
const internalSorting = ref<SortingState>(props.sorting ?? [])
const internalColumnFilters = ref<ColumnFiltersState>(props.columnFilters ?? [])
const internalColumnVisibility = ref<VisibilityState>(
  props.columnVisibility ?? {}
)
const internalRowSelection = ref<RowSelectionState>(props.rowSelection ?? {})
const internalExpanded = ref<ExpandedState>(props.expanded ?? {})
const internalPagination = ref<PaginationState>(
  props.pagination ?? {
    pageIndex: 0,
    pageSize: props.pageSize
  }
)

// Use v-model if provided, otherwise internal state
const globalFilterModel = computed({
  get: () =>
    props.globalFilter !== undefined
      ? props.globalFilter
      : internalGlobalFilter.value,
  set: (value) => {
    internalGlobalFilter.value = value
    emit('update:globalFilter', value)
  }
})

const sortingModel = computed({
  get: () =>
    props.sorting !== undefined ? props.sorting : internalSorting.value,
  set: (value) => {
    internalSorting.value = value
    emit('update:sorting', value)
  }
})

const columnFiltersModel = computed({
  get: () =>
    props.columnFilters !== undefined
      ? props.columnFilters
      : internalColumnFilters.value,
  set: (value) => {
    internalColumnFilters.value = value
    emit('update:columnFilters', value)
  }
})

const columnVisibilityModel = computed({
  get: () =>
    props.columnVisibility !== undefined
      ? props.columnVisibility
      : internalColumnVisibility.value,
  set: (value) => {
    internalColumnVisibility.value = value
    emit('update:columnVisibility', value)
  }
})

const rowSelectionModel = computed({
  get: () =>
    props.rowSelection !== undefined
      ? props.rowSelection
      : internalRowSelection.value,
  set: (value) => {
    internalRowSelection.value = value
    emit('update:rowSelection', value)
  }
})

const expandedModel = computed({
  get: () =>
    props.expanded !== undefined ? props.expanded : internalExpanded.value,
  set: (value) => {
    internalExpanded.value = value
    emit('update:expanded', value)
  }
})

const paginationModel = computed({
  get: () =>
    props.pagination !== undefined
      ? props.pagination
      : internalPagination.value,
  set: (value) => {
    internalPagination.value = value
    emit('update:pagination', value)
  }
})

// TanStack Table instance
const table = useVueTable({
  get data() {
    return props.data ?? []
  },
  get columns() {
    return props.columns
  },
  state: {
    get globalFilter() {
      return globalFilterModel.value
    },
    get sorting() {
      return sortingModel.value
    },
    get columnFilters() {
      return columnFiltersModel.value
    },
    get columnVisibility() {
      return columnVisibilityModel.value
    },
    get rowSelection() {
      return rowSelectionModel.value
    },
    get expanded() {
      return expandedModel.value
    },
    get pagination() {
      return paginationModel.value
    }
  },
  enableRowSelection: props.enableRowSelection,
  enableExpanding: props.enableExpanding,
  enableGrouping: props.enableGrouping,
  onGlobalFilterChange: (updater) => {
    globalFilterModel.value =
      typeof updater === 'function' ? updater(globalFilterModel.value) : updater
  },
  onSortingChange: (updater) => {
    sortingModel.value =
      typeof updater === 'function' ? updater(sortingModel.value) : updater
  },
  onColumnFiltersChange: (updater) => {
    columnFiltersModel.value =
      typeof updater === 'function'
        ? updater(columnFiltersModel.value)
        : updater
  },
  onColumnVisibilityChange: (updater) => {
    columnVisibilityModel.value =
      typeof updater === 'function'
        ? updater(columnVisibilityModel.value)
        : updater
  },
  onRowSelectionChange: (updater) => {
    rowSelectionModel.value =
      typeof updater === 'function' ? updater(rowSelectionModel.value) : updater
  },
  onExpandedChange: (updater) => {
    expandedModel.value =
      typeof updater === 'function' ? updater(expandedModel.value) : updater
  },
  onPaginationChange: (updater) => {
    paginationModel.value =
      typeof updater === 'function' ? updater(paginationModel.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: props.enableFiltering
    ? getFilteredRowModel()
    : undefined,
  getSortedRowModel: props.enableSorting ? getSortedRowModel() : undefined,
  getPaginationRowModel: props.enablePagination
    ? getPaginationRowModel()
    : undefined,
  getExpandedRowModel: props.enableExpanding
    ? getExpandedRowModel()
    : undefined,
  getGroupedRowModel: props.enableGrouping ? getGroupedRowModel() : undefined,
  getFacetedRowModel: props.enableFiltering ? getFacetedRowModel() : undefined,
  getFacetedUniqueValues: props.enableFiltering
    ? getFacetedUniqueValues()
    : undefined,
  meta: props.meta,
  getRowId: props.getRowId
})

const ui = computed(() =>
  dataTableTheme({
    striped: props.striped,
    bordered: props.bordered,
    compact: props.compact,
    hoverable: props.hoverable,
    sticky: props.sticky,
    loading: props.loading
  })
)

const totalRows = computed(() => table.getFilteredRowModel().rows.length)
const currentPage = computed(() => paginationModel.value.pageIndex + 1)

const paginationText = computed(() => {
  const start =
    paginationModel.value.pageIndex * paginationModel.value.pageSize + 1
  const end = Math.min(
    (paginationModel.value.pageIndex + 1) * paginationModel.value.pageSize,
    totalRows.value
  )
  return `Showing ${start} to ${end} of ${totalRows.value} entries`
})

const handleRowClick = (row: any) => {
  const event = window.event as MouseEvent | KeyboardEvent
  const target = event.target as HTMLElement

  // Don't trigger if clicking on buttons or links
  if (target.closest('button') || target.closest('a')) {
    return
  }

  emit('row:click', row.original)
  props.onSelect?.(row.original)

  if (props.enableRowSelection) {
    row.toggleSelected()
    emit('row:select', row.original)
  }
}

const handleRowHover = (row: any) => {
  emit('row:hover', row.original)
  props.onHover?.(row.original)
}

const handlePageChange = (page: number) => {
  table.setPageIndex(page - 1)
}

// Expose TanStack Table API
const tableRef = ref<HTMLTableElement>()
defineExpose({
  table,
  tableRef,
  tableApi: table
})
</script>

<template>
  <div
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
  >
    <!-- Toolbar -->
    <div
      v-if="searchable || slots.toolbar || slots.actions"
      data-slot="toolbar"
      :class="ui.toolbar({ class: props.ui?.toolbar })"
    >
      <slot name="toolbar" :table="table">
        <div
          v-if="searchable"
          data-slot="search"
          :class="ui.search({ class: props.ui?.search })"
        >
          <Input
            v-model="globalFilterModel"
            :placeholder="searchPlaceholder"
            leading-icon="solar:magnifer-linear"
            aria-label="Search table"
          />
        </div>

        <div
          data-slot="actions"
          :class="ui.actions({ class: props.ui?.actions })"
        >
          <slot name="actions" :table="table" />
        </div>
      </slot>
    </div>

    <!-- Table Wrapper -->
    <div data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
      <table
        ref="tableRef"
        data-slot="table"
        :class="ui.table({ class: props.ui?.table })"
      >
        <!-- Header -->
        <thead data-slot="thead" :class="ui.thead({ class: props.ui?.thead })">
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            data-slot="tr"
            :class="ui.tr({ class: props.ui?.tr })"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              data-slot="th"
              :class="ui.th({ class: props.ui?.th })"
              :colspan="header.colSpan"
              :style="{
                width:
                  header.getSize() !== 150 ? `${header.getSize()}px` : undefined
              }"
            >
              <div
                v-if="!header.isPlaceholder"
                data-slot="th-content"
                :class="ui.thContent({ class: props.ui?.thContent })"
              >
                <slot
                  :name="`header-${header.column.id}`"
                  :header="header"
                  :column="header.column"
                  :table="table"
                >
                  <button
                    v-if="header.column.getCanSort() && enableSorting"
                    :class="ui.sortButton({ class: props.ui?.sortButton })"
                    :aria-label="`Sort by ${header.column.columnDef.header}`"
                    :aria-sort="
                      header.column.getIsSorted() === 'asc'
                        ? 'ascending'
                        : header.column.getIsSorted() === 'desc'
                        ? 'descending'
                        : 'none'
                    "
                    @click="header.column.getToggleSortingHandler()?.($event)"
                  >
                    <FlexRender
                      :render="header.column.columnDef.header"
                      :props="header.getContext()"
                    />
                    <Icon
                      v-if="header.column.getIsSorted() === 'asc'"
                      name="solar:arrow-up-linear"
                      :class="ui.sortIcon({ class: props.ui?.sortIcon })"
                    />
                    <Icon
                      v-else-if="header.column.getIsSorted() === 'desc'"
                      name="solar:arrow-down-linear"
                      :class="ui.sortIcon({ class: props.ui?.sortIcon })"
                    />
                  </button>
                  <FlexRender
                    v-else
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                </slot>
              </div>
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody
          v-if="!loading && table.getRowModel().rows.length"
          data-slot="tbody"
          :class="ui.tbody({ class: props.ui?.tbody })"
        >
          <template v-for="row in table.getRowModel().rows" :key="row.id">
            <tr
              data-slot="tr"
              :class="ui.tr({ class: props.ui?.tr })"
              :role="enableRowSelection || onSelect ? 'button' : undefined"
              :tabindex="enableRowSelection || onSelect ? 0 : undefined"
              :aria-selected="
                enableRowSelection ? row.getIsSelected() : undefined
              "
              :data-expanded="row.getIsExpanded()"
              @click="handleRowClick(row)"
              @keydown.enter="handleRowClick(row)"
              @keydown.space.prevent="handleRowClick(row)"
              @mouseenter="handleRowHover(row)"
            >
              <td
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                data-slot="td"
                :class="ui.td({ class: props.ui?.td })"
              >
                <slot
                  :name="`cell-${cell.column.id}`"
                  :cell="cell"
                  :row="row.original"
                  :value="cell.getValue()"
                  :table="table"
                >
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </slot>
              </td>
            </tr>

            <!-- Expanded Row Content -->
            <tr
              v-if="row.getIsExpanded() && slots['expand-row']"
              :key="`${row.id}-expanded`"
            >
              <td :colspan="row.getVisibleCells().length">
                <slot name="expand-row" :row="row.original" :table="table" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>

      <!-- Loading State -->
      <div
        v-if="loading"
        data-slot="loading"
        :class="ui.loading({ class: props.ui?.loading })"
        role="status"
        aria-live="polite"
      >
        <slot name="loading">
          <Icon
            name="solar:refresh-bold"
            :class="ui.loadingSpinner({ class: props.ui?.loadingSpinner })"
          />
          <span class="sr-only">Loading...</span>
        </slot>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!table.getRowModel().rows.length"
        data-slot="empty"
        :class="ui.empty({ class: props.ui?.empty })"
        role="status"
      >
        <slot name="empty">
          <Icon
            name="solar:inbox-line-linear"
            :class="ui.emptyIcon({ class: props.ui?.emptyIcon })"
          />
          <div :class="ui.emptyTitle({ class: props.ui?.emptyTitle })">
            No results found
          </div>
          <div
            :class="ui.emptyDescription({ class: props.ui?.emptyDescription })"
          >
            {{ empty }}
          </div>
        </slot>
      </div>
    </div>

    <!-- Footer with Pagination -->
    <div
      v-if="enablePagination && table.getPageCount() > 0"
      data-slot="footer"
      :class="ui.footer({ class: props.ui?.footer })"
    >
      <div
        data-slot="footer-text"
        :class="ui.footerText({ class: props.ui?.footerText })"
      >
        <slot name="footer-text" :table="table">
          {{ paginationText }}
        </slot>
      </div>

      <div
        data-slot="footer-actions"
        :class="ui.footerActions({ class: props.ui?.footerActions })"
      >
        <slot
          name="pagination"
          :table="table"
          :page="currentPage"
          :total="totalRows"
        >
          <Pagination
            :page="currentPage"
            :total="totalRows"
            :items-per-page="paginationModel.pageSize"
            :sibling-count="1"
            show-controls
            @update:page="handlePageChange"
          />
        </slot>
      </div>
    </div>
  </div>
</template>
