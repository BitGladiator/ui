import type { Meta, StoryObj } from '@storybook/vue3'
import CheckboxGroup from '@/components/CheckboxGroup.vue'

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Forms/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkboxes'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
      description: 'Color theme'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    required: {
      control: 'boolean',
      description: 'Required field'
    }
  },
  args: {
    label: 'Select options',
    size: 'md',
    color: 'primary',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' }
    ]
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
  args: {
    label: 'Preferences',
    description: 'Select all that apply',
    options: [
      { label: 'Email notifications', value: 'email' },
      { label: 'Push notifications', value: 'push' },
      { label: 'SMS notifications', value: 'sms' }
    ]
  }
}

export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
    options: [
      { label: 'I agree to terms', value: 'terms' },
      { label: 'I agree to privacy policy', value: 'privacy' }
    ]
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: ['1'],
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' }
    ]
  }
}

export const WithDisabledOptions: Story = {
  args: {
    label: 'Mixed State',
    options: [
      { label: 'Available Option', value: '1' },
      { label: 'Disabled Option', value: '2', disabled: true },
      { label: 'Another Available', value: '3' }
    ]
  }
}

export const LargeSize: Story = {
  args: {
    size: 'lg',
    label: 'Large Checkboxes',
    options: [
      { label: 'Large Option 1', value: '1' },
      { label: 'Large Option 2', value: '2' }
    ]
  }
}

export const ErrorState: Story = {
  args: {
    color: 'error',
    label: 'Error State',
    description: 'Please select at least one option',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' }
    ]
  }
}
