import type { Meta, StoryObj } from '@storybook/vue3'
import Table from '@/components/Table.vue'

const meta: Meta<typeof Table> = {
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    striped: {
      control: 'boolean',
      description: 'Enable alternating row colors'
    },
    hoverable: {
      control: 'boolean',
      description: 'Highlight rows on hover'
    },
    bordered: {
      control: 'boolean',
      description: 'Add borders to cells'
    },
    compact: {
      control: 'boolean',
      description: 'Reduce padding for a more compact table'
    }
  },
  args: {
    striped: false,
    hoverable: true,
    bordered: false,
    compact: false
  }
}

export default meta
export type Story = StoryObj<typeof Table>

// Sample data for stories
const sampleUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'Admin',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    role: 'Editor',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Carol Williams',
    email: 'carol.williams@example.com',
    role: 'Viewer',
    status: 'Inactive'
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'Editor',
    status: 'Active'
  },
  {
    id: 5,
    name: 'Eve Davis',
    email: 'eve.davis@example.com',
    role: 'Viewer',
    status: 'Active'
  }
]

// Column definitions
const userColumns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'status', header: 'Status' }
]

export const Basic: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns
  }
}

export const Striped: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    striped: true
  }
}

export const Bordered: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    bordered: true
  }
}

export const Compact: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    compact: true
  }
}

export const HoverableStriped: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    striped: true,
    hoverable: true
  }
}

const orderData = Array.from({ length: 15 }, (_, i) => ({
  orderId: `#${1000 + i}`,
  customer: [
    'John Doe',
    'Jane Smith',
    'Bob Wilson',
    'Alice Cooper',
    'Charlie Brown'
  ][i % 5],
  product: ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Headphones'][i % 5],
  amount: `$${(Math.random() * 1000 + 100).toFixed(2)}`,
  date: new Date(2024, i % 12, (i % 28) + 1).toLocaleDateString(),
  status: ['Completed', 'Pending', 'Shipped', 'Cancelled'][i % 4]
}))

const orderColumns = [
  { accessorKey: 'orderId', header: 'Order ID' },
  { accessorKey: 'customer', header: 'Customer' },
  { accessorKey: 'product', header: 'Product' },
  { accessorKey: 'amount', header: 'Amount' },
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'status', header: 'Status' }
]

export const LargeDataset: Story = {
  args: {
    data: orderData,
    columns: orderColumns,
    striped: true,
    hoverable: true
  }
}
