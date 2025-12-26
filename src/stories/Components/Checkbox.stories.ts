import type { Meta, StoryObj } from '@storybook/vue3'
import Checkbox from '@/components/Checkbox.vue'

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  args: {
    label: 'Accetto termini',
    description: 'Leggi e accetta i termini',
    modelValue: false,
    size: 'md',
    color: 'primary'
  }
}

export default meta
export type Story = StoryObj<typeof Checkbox>
