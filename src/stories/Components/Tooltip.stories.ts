import type { Meta, StoryObj } from '@storybook/vue3'
import { TooltipProvider } from 'reka-ui'
import Tooltip from '@/components/Tooltip.vue'
import Button from '@/components/Button.vue'

const meta: Meta<typeof Tooltip> = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    () => ({
      components: { TooltipProvider },
      template: '<TooltipProvider><story /></TooltipProvider>'
    })
  ],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Tooltip position'
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Tooltip alignment'
    }
  },
  args: {
    content: 'This is a tooltip',
    side: 'top',
    align: 'center'
  }
}

export default meta
export type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <Tooltip v-bind="args">
        <Button>Hover me</Button>
      </Tooltip>
    `
  })
}

export const Top: Story = {
  args: {
    side: 'top',
    content: 'Tooltip on top'
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <Tooltip v-bind="args">
        <Button>Top</Button>
      </Tooltip>
    `
  })
}

export const Right: Story = {
  args: {
    side: 'right',
    content: 'Tooltip on right'
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <Tooltip v-bind="args">
        <Button>Right</Button>
      </Tooltip>
    `
  })
}

export const Bottom: Story = {
  args: {
    side: 'bottom',
    content: 'Tooltip on bottom'
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <Tooltip v-bind="args">
        <Button>Bottom</Button>
      </Tooltip>
    `
  })
}

export const Left: Story = {
  args: {
    side: 'left',
    content: 'Tooltip on left'
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <Tooltip v-bind="args">
        <Button>Left</Button>
      </Tooltip>
    `
  })
}
