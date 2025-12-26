import type { Meta, StoryObj } from '@storybook/vue3'
import RadioGroup from '@/components/RadioGroup.vue'

const meta: Meta<typeof RadioGroup> = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the radio buttons'
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
    label: 'Select an option',
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
    label: 'Payment Method',
    description: 'Choose your preferred payment method',
    options: [
      { label: 'Credit Card', value: 'card' },
      { label: 'PayPal', value: 'paypal' },
      { label: 'Bank Transfer', value: 'bank' }
    ]
  }
}

export const Required: Story = {
  args: {
    label: 'Required Selection',
    required: true,
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' }
    ]
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: '1',
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
    label: 'Large Radio Buttons',
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
    description: 'Please make a selection',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' }
    ]
  }
}

export const WithPreselection: Story = {
  args: {
    label: 'Preferred Contact',
    modelValue: 'email',
    options: [
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone' },
      { label: 'SMS', value: 'sms' }
    ]
  }
}
