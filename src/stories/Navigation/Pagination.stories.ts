import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Pagination from '@/components/Pagination.vue'

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    page: {
      control: 'number',
      description: 'Current page number'
    },
    total: {
      control: 'number',
      description: 'Total number of items'
    },
    itemsPerPage: {
      control: 'number',
      description: 'Items per page'
    },
    siblingCount: {
      control: 'number',
      description: 'Number of page buttons on each side of current page'
    },
    showControls: {
      control: 'boolean',
      description: 'Show first/last page controls'
    },
    showEdges: {
      control: 'boolean',
      description: 'Show edge page numbers'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size'
    }
  },
  args: {
    page: 1,
    total: 100,
    itemsPerPage: 10,
    showControls: true,
    showEdges: false,
    siblingCount: 1,
    size: 'md'
  }
}

export default meta
export type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  render: (args) => ({
    components: { Pagination },
    setup() {
      const currentPage = ref(args.page || 1)

      const handlePageUpdate = (page: number) => {
        currentPage.value = page
      }

      return { args, currentPage, handlePageUpdate }
    },
    template: `
      <Pagination 
        v-bind="args" 
        :page="currentPage"
        @update:page="handlePageUpdate"
      />
    `
  })
}

export const ManyPages: Story = {
  args: {
    page: 5,
    total: 500,
    itemsPerPage: 10
  },
  render: (args) => ({
    components: { Pagination },
    setup() {
      const currentPage = ref(args.page || 1)

      const handlePageUpdate = (page: number) => {
        currentPage.value = page
      }

      return { args, currentPage, handlePageUpdate }
    },
    template: `
      <Pagination 
        v-bind="args" 
        :page="currentPage"
        @update:page="handlePageUpdate"
      />
    `
  })
}

export const WithSiblings: Story = {
  args: {
    page: 5,
    total: 200,
    itemsPerPage: 10,
    siblingCount: 2
  },
  render: (args) => ({
    components: { Pagination },
    setup() {
      const currentPage = ref(args.page || 1)

      const handlePageUpdate = (page: number) => {
        currentPage.value = page
      }

      return { args, currentPage, handlePageUpdate }
    },
    template: `
      <Pagination 
        v-bind="args" 
        :page="currentPage"
        @update:page="handlePageUpdate"
      />
    `
  })
}

export const SmallSize: Story = {
  args: {
    size: 'sm',
    page: 3,
    total: 100
  },
  render: (args) => ({
    components: { Pagination },
    setup() {
      const currentPage = ref(args.page || 1)

      const handlePageUpdate = (page: number) => {
        currentPage.value = page
      }

      return { args, currentPage, handlePageUpdate }
    },
    template: `
      <Pagination 
        v-bind="args" 
        :page="currentPage"
        @update:page="handlePageUpdate"
      />
    `
  })
}
