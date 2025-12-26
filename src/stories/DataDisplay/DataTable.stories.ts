import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import DataTable from '@/components/DataTable.vue'
type User = { id: number; name: string; email: string; role: string }

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'editor' },
  { id: 3, name: 'Carol', email: 'carol@example.com', role: 'viewer' }
]

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' }
]

const meta: Meta<typeof DataTable> = {
  title: 'Data Display/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  args: {
    columns,
    data: users,
    enableSorting: true,
    enableFiltering: true,
    enablePagination: true,
    pageSize: 10,
    searchable: true
  }
}

export default meta
export type Story = StoryObj<typeof DataTable>

export const Basic: Story = {}

export const DynamicColumns: Story = {
  args: {
    columns: [
      { accessorKey: 'name', header: 'Full Name' },
      { accessorKey: 'email', header: 'Contact' }
    ]
  }
}

export const Compact: Story = {
  args: {
    compact: true,
    striped: true
  }
}

export const Loading: Story = {
  args: {
    loading: true
  }
}

export const Empty: Story = {
  args: {
    data: [],
    empty: 'No users found. Try adjusting your search.'
  }
}

export const WithActions: Story = {
  render: () => ({
    components: { DataTable },
    setup() {
      const columns = [
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'email', header: 'Email' },
        { accessorKey: 'role', header: 'Role' },
        { id: 'actions', header: 'Actions', cell: () => '' }
      ]

      const handleEdit = (user) => {
        alert(`Edit ${user.name}`)
      }

      const handleDelete = (user) => {
        alert(`Delete ${user.name}`)
      }

      return { columns, data: users, handleEdit, handleDelete }
    },
    template: `
      <DataTable
        :columns="columns"
        :data="data"
        searchable
      >
        <template #cell:actions="{ row }">
          <div class="flex gap-2">
            <button
              @click="handleEdit(row)"
              class="text-sm text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
            <button
              @click="handleDelete(row)"
              class="text-sm text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </template>
      </DataTable>
    `
  })
}

export const LargeDataset: Story = {
  render: () => ({
    components: { DataTable },
    setup() {
      const largeData = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: ['Admin', 'Editor', 'Viewer'][i % 3],
        status: i % 3 === 0 ? 'inactive' : 'active'
      }))

      return { columns, data: largeData }
    },
    template: `
      <DataTable
        :columns="columns"
        :data="data"
        :page-size="10"
        searchable
        enable-sorting
        enable-pagination
        striped
      />
    `
  })
}

export const WithToolbar: Story = {
  render: () => ({
    components: { DataTable },
    setup() {
      const selectedRows = ref({})

      const handleExport = () => {
        alert('Exporting selected rows...')
      }

      return { columns, data: users, selectedRows, handleExport }
    },
    template: `
      <DataTable
        :columns="columns"
        :data="data"
        v-model:row-selection="selectedRows"
        enable-row-selection
        searchable
      >
        <template #actions>
          <button
            @click="handleExport"
            :disabled="Object.keys(selectedRows).length === 0"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Export Selected
          </button>
          <button
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Add User
          </button>
        </template>
      </DataTable>
    `
  })
}
