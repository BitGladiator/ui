import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Select from '@/components/Select.vue'

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'ghost', 'soft', 'none']
    },
    color: {
      control: 'select',
      options: ['primary', 'error', 'success', 'warning', 'info']
    },
    modelValue: {
      control: false
    }
  },
  args: {
    placeholder: 'Select an option',
    size: 'md',
    variant: 'outline',
    color: 'primary'
  }
}

export default meta
export type Story = StoryObj<typeof Select>

// Basic usage with simple string array
export const Default: Story = {
  render: (args: any) => ({
    components: { Select },
    setup() {
      const selected = ref('Backlog')
      return { args, selected }
    },
    template: `<Select v-bind="args" v-model="selected" :options="['Backlog', 'Todo', 'In Progress', 'Done']" />`
  })
}

// Object array with label and value
export const WithLabelValue: Story = {
  name: 'With Label & Value',
  render: (args: any) => ({
    components: { Select },
    setup() {
      const selected = ref('backlog')
      const options = [
        { label: 'Backlog', value: 'backlog' },
        { label: 'Todo', value: 'todo' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Done', value: 'done' }
      ]
      return { args, selected, options }
    },
    template: `<Select v-bind="args" v-model="selected" :options="options" />`
  })
}

// Grouped options with separators
export const Grouped: Story = {
  render: (args: any) => ({
    components: { Select },
    setup() {
      const selected = ref('apple')
      const options = [
        {
          label: 'Fruits',
          options: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Blueberry', value: 'blueberry' },
            { label: 'Grapes', value: 'grapes' },
            { label: 'Pineapple', value: 'pineapple' }
          ]
        },
        {
          label: 'Vegetables',
          options: [
            { label: 'Aubergine', value: 'aubergine' },
            { label: 'Broccoli', value: 'broccoli' },
            { label: 'Carrot', value: 'carrot' },
            { label: 'Courgette', value: 'courgette' },
            { label: 'Leek', value: 'leek' }
          ]
        }
      ]
      return { args, selected, options }
    },
    template: `<Select v-bind="args" v-model="selected" :options="options" />`
  })
}

// With icons in items
export const WithIcons: Story = {
  name: 'With Icons',
  render: (args: any) => ({
    components: { Select },
    setup() {
      const selected = ref('home')
      const options = [
        { label: 'Home', value: 'home', icon: 'solar:home-linear' },
        { label: 'User Profile', value: 'user', icon: 'solar:user-linear' },
        { label: 'Settings', value: 'settings', icon: 'solar:settings-linear' },
        {
          label: 'Notifications',
          value: 'notifications',
          icon: 'solar:bell-linear'
        },
        { label: 'Messages', value: 'messages', icon: 'solar:chat-line-linear' }
      ]
      return { args, selected, options }
    },
    template: `<Select v-bind="args" v-model="selected" :options="options" />`
  })
}

// With descriptions
export const WithDescriptions: Story = {
  name: 'With Descriptions',
  render: (args: any) => ({
    components: { Select },
    setup() {
      const selected = ref('backlog')
      const options = [
        {
          label: 'Backlog',
          value: 'backlog',
          description: 'Items not yet started',
          icon: 'solar:list-linear'
        },
        {
          label: 'Todo',
          value: 'todo',
          description: 'Ready to be worked on',
          icon: 'solar:clipboard-list-linear'
        },
        {
          label: 'In Progress',
          value: 'in_progress',
          description: 'Currently being worked on',
          icon: 'solar:spinner-linear'
        },
        {
          label: 'Done',
          value: 'done',
          description: 'Completed items',
          icon: 'solar:check-circle-linear'
        }
      ]
      return { args, selected, options }
    },
    template: `<Select v-bind="args" v-model="selected" :options="options" />`
  })
}

// With disabled options
export const WithDisabled: Story = {
  name: 'With Disabled Options',
  render: (args: any) => ({
    components: { Select },
    setup() {
      const selected = ref('active')
      const options = [
        { label: 'Active', value: 'active' },
        { label: 'Disabled Option', value: 'disabled', disabled: true },
        { label: 'Another Active', value: 'another' },
        { label: 'Also Disabled', value: 'also_disabled', disabled: true }
      ]
      return { args, selected, options }
    },
    template: `<Select v-bind="args" v-model="selected" :options="options" />`
  })
}

// Different sizes
export const Sizes: Story = {
  render: (args: any) => ({
    components: { Select },
    setup() {
      const selectedSm = ref('Backlog')
      const selectedMd = ref('Todo')
      const selectedLg = ref('Done')
      const options = ['Backlog', 'Todo', 'In Progress', 'Done']
      return { args, selectedSm, selectedMd, selectedLg, options }
    },
    template: `
      <div class="flex flex-col gap-4">
        <Select v-bind="args" size="sm" v-model="selectedSm" :options="options" placeholder="Small" />
        <Select v-bind="args" size="md" v-model="selectedMd" :options="options" placeholder="Medium" />
        <Select v-bind="args" size="lg" v-model="selectedLg" :options="options" placeholder="Large" />
      </div>
    `
  })
}

// Different variants
export const Variants: Story = {
  render: (args: any) => ({
    components: { Select },
    setup() {
      const selected1 = ref('Backlog')
      const selected2 = ref('Todo')
      const selected3 = ref('In Progress')
      const selected4 = ref('Done')
      const options = ['Backlog', 'Todo', 'In Progress', 'Done']
      return { args, selected1, selected2, selected3, selected4, options }
    },
    template: `
      <div class="flex flex-col gap-4">
        <Select v-bind="args" variant="outline" v-model="selected1" :options="options" placeholder="Outline" />
        <Select v-bind="args" variant="filled" v-model="selected2" :options="options" placeholder="Filled" />
        <Select v-bind="args" variant="ghost" v-model="selected3" :options="options" placeholder="Ghost" />
        <Select v-bind="args" variant="soft" v-model="selected4" :options="options" placeholder="Soft" />
      </div>
    `
  })
}

// Different colors
export const Colors: Story = {
  render: (args: any) => ({
    components: { Select },
    setup() {
      const selected1 = ref('Backlog')
      const selected2 = ref('Todo')
      const selected3 = ref('In Progress')
      const selected4 = ref('Done')
      const selected5 = ref('Backlog')
      const options = ['Backlog', 'Todo', 'In Progress', 'Done']
      return {
        args,
        selected1,
        selected2,
        selected3,
        selected4,
        selected5,
        options
      }
    },
    template: `
      <div class="flex flex-col gap-4">
        <Select v-bind="args" color="primary" v-model="selected1" :options="options" />
        <Select v-bind="args" color="success" v-model="selected2" :options="options" />
        <Select v-bind="args" color="warning" v-model="selected3" :options="options" />
        <Select v-bind="args" color="error" v-model="selected4" :options="options" />
        <Select v-bind="args" color="info" v-model="selected5" :options="options" />
      </div>
    `
  })
}

// Custom trailing icon
export const CustomTrailingIcon: Story = {
  name: 'Custom Trailing Icon',
  render: (args: any) => ({
    components: { Select },
    setup() {
      const selected = ref('backlog')
      const options = [
        { label: 'Backlog', value: 'backlog' },
        { label: 'Todo', value: 'todo' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Done', value: 'done' }
      ]
      return { args, selected, options }
    },
    template: `<Select v-bind="args" v-model="selected" :options="options" trailingIcon="solar:alt-arrow-down-bold" />`
  })
}

// Disabled state
export const Disabled: Story = {
  render: (args: any) => ({
    components: { Select },
    setup() {
      const selected = ref('')
      const options = ['Backlog', 'Todo', 'In Progress', 'Done']
      return { args, selected, options }
    },
    template: `<Select v-bind="args" v-model="selected" :options="options" disabled placeholder="This select is disabled" />`
  })
}

// Empty placeholder
export const EmptyPlaceholder: Story = {
  name: 'With Placeholder',
  render: (args: any) => ({
    components: { Select },
    setup() {
      const selected = ref('')
      const options = ['Backlog', 'Todo', 'In Progress', 'Done']
      return { args, selected, options }
    },
    template: `<Select v-bind="args" v-model="selected" :options="options" placeholder="Choose a status..." />`
  })
}

// Complex grouped example with mixed features
export const ComplexGrouped: Story = {
  name: 'Complex Grouped Example',
  render: (args: any) => ({
    components: { Select },
    setup() {
      const selected = ref('figma')
      const options = [
        {
          label: 'Design Tools',
          options: [
            {
              label: 'Figma',
              value: 'figma',
              icon: 'solar:pallete-linear',
              description: 'Collaborative design tool'
            },
            {
              label: 'Sketch',
              value: 'sketch',
              icon: 'solar:pallete-linear',
              description: 'Digital design platform'
            },
            {
              label: 'Adobe XD',
              value: 'adobe_xd',
              icon: 'solar:pallete-linear',
              description: 'UI/UX design software',
              disabled: true
            }
          ]
        },
        {
          label: 'Development Tools',
          options: [
            {
              label: 'VS Code',
              value: 'vscode',
              icon: 'solar:code-linear',
              description: 'Code editor'
            },
            {
              label: 'WebStorm',
              value: 'webstorm',
              icon: 'solar:code-linear',
              description: 'JavaScript IDE'
            },
            {
              label: 'Sublime Text',
              value: 'sublime',
              icon: 'solar:code-linear',
              description: 'Text editor'
            }
          ]
        }
      ]
      return { args, selected, options }
    },
    template: `<Select v-bind="args" v-model="selected" :options="options" />`
  })
}
