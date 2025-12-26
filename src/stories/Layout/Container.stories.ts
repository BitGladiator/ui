import type { Meta, StoryObj } from '@storybook/vue3'
import { h } from 'vue'

// Componente semplice per l'esempio
const Container = {
  name: 'Container',
  props: {
    size: {
      type: String,
      default: 'default',
      validator: (value: string) => ['sm', 'default', 'lg', 'xl', 'full'].includes(value)
    },
    padding: {
      type: String,
      default: 'default'
    }
  },
  setup(props: any, { slots }: any) {
    const sizeClasses = {
      sm: 'max-w-2xl',
      default: 'max-w-4xl', 
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-full'
    }
    
    const paddingClasses = {
      none: 'p-0',
      sm: 'p-4',
      default: 'p-6',
      lg: 'p-8'
    }

    return () => h('div', {
      class: [
        'mx-auto',
        sizeClasses[props.size as keyof typeof sizeClasses],
        paddingClasses[props.padding as keyof typeof paddingClasses]
      ]
    }, slots.default?.())
  }
}

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl', 'full']
    },
    padding: {
      control: 'select', 
      options: ['none', 'sm', 'default', 'lg']
    }
  }
}

export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {
  args: {
    size: 'default',
    padding: 'default'
  },
  render: (args) => ({
    components: { Container },
    setup() {
      return { args }
    },
    template: `
      <Container v-bind="args">
        <div class="bg-gray-100 p-4 rounded">
          <h2 class="text-xl font-bold mb-2">Contenuto del Container</h2>
          <p>Questo è un esempio di contenuto all'interno del container.</p>
        </div>
      </Container>
    `
  })
}

export const Small: Story = {
  args: {
    size: 'sm',
    padding: 'default'
  },
  render: (args) => ({
    components: { Container },
    setup() {
      return { args }
    },
    template: `
      <Container v-bind="args">
        <div class="bg-blue-100 p-4 rounded">
          <h3>Container Small</h3>
          <p>Larghezza massima ridotta (max-w-2xl)</p>
        </div>
      </Container>
    `
  })
}

export const FullWidth: Story = {
  args: {
    size: 'full',
    padding: 'lg'
  },
  render: (args) => ({
    components: { Container },
    setup() {
      return { args }
    },
    template: `
      <Container v-bind="args">
        <div class="bg-green-100 p-4 rounded">
          <h3>Container Full Width</h3>
          <p>Occupa tutta la larghezza disponibile</p>
        </div>
      </Container>
    `
  })
}