import type { Meta, StoryObj } from '@storybook/vue3'
import ButtonGroup from '../../components/ButtonGroup.vue'
import Button from '../../components/Button.vue'

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Spacing between buttons'
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Alignment of buttons within the group'
    }
  },
  args: {
    spacing: 'md',
    align: 'center'
  }
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
      spacing: 'md',
      align: 'center'
    },
    render: (args) => ({
      components: { ButtonGroup, Button },
      setup() {
        return { args }
      },
      template: `
        <ButtonGroup v-bind="args">
          <Button variant="secondary" @click="console.log('Cancel')">Cancel</Button>
          <Button variant="primary" @click="console.log('Confirm')">Confirm</Button>
        </ButtonGroup>
      `
    })
  }  

export const StartAligned: Story = {
  args: {
    align: 'start'
  },
  render: () => ({
    components: { ButtonGroup, Button },
    template: `
      <ButtonGroup align="start">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </ButtonGroup>
    `
  })
}

export const EndAligned: Story = {
  args: {
    align: 'end'
  },
  render: () => ({
    components: { ButtonGroup, Button },
    template: `
      <ButtonGroup align="end">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </ButtonGroup>
    `
  })
}

export const TightSpacing: Story = {
  args: {
    spacing: 'sm'
  },
  render: () => ({
    components: { ButtonGroup, Button },
    template: `
      <ButtonGroup spacing="sm">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </ButtonGroup>
    `
  })
}

export const LooseSpacing: Story = {
  args: {
    spacing: 'lg'
  },
  render: () => ({
    components: { ButtonGroup, Button },
    template: `
      <ButtonGroup spacing="lg">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </ButtonGroup>
    `
  })
}

export const MultipleButtons: Story = {
  render: () => ({
    components: { ButtonGroup, Button },
    template: `
      <ButtonGroup>
        <Button variant="secondary">Cancel</Button>
        <Button variant="tertiary">Skip</Button>
        <Button variant="primary">Confirm</Button>
      </ButtonGroup>
    `
  })
}

export const WithIcons: Story = {
  render: () => ({
    components: { ButtonGroup, Button },
    template: `
      <ButtonGroup>
        <Button variant="secondary" leading-icon="solar:close-circle-linear">Cancel</Button>
        <Button variant="primary" leading-icon="solar:check-circle-linear">Confirm</Button>
      </ButtonGroup>
    `
  })
}
