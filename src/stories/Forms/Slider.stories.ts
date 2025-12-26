import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Slider from '@/components/Slider.vue'

const meta = {
  title: 'Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
      description: 'Minimum value'
    },
    max: {
      control: 'number',
      description: 'Maximum value'
    },
    step: {
      control: 'number',
      description: 'Step increment'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    }
  }
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Slider },
    setup() {
      const value = ref([50])
      return { args, value }
    },
    template: `
      <div class="space-y-4">
        <div class="flex justify-between text-sm">
          <span>Value:</span>
          <span class="font-medium">{{ value[0] }}</span>
        </div>
        <Slider v-model="value" v-bind="args" />
      </div>
    `
  }),
  args: {
    min: 0,
    max: 100,
    step: 1
  }
}

export const Range: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const range = ref([25, 75])
      return { range }
    },
    template: `
      <div class="space-y-4">
        <div class="flex justify-between text-sm">
          <span>Range:</span>
          <span class="font-medium">{{ range[0] }} - {{ range[1] }}</span>
        </div>
        <Slider v-model="range" :min="0" :max="100" />
      </div>
    `
  })
}

export const WithSteps: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref([25])
      return { value }
    },
    template: `
      <div class="space-y-4">
        <div class="flex justify-between text-sm">
          <span>Value:</span>
          <span class="font-medium">{{ value[0] }}%</span>
        </div>
        <Slider v-model="value" :min="0" :max="100" :step="25" />
        <div class="flex justify-between text-xs text-gray-500">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>
    `
  })
}

export const Disabled: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref([60])
      return { value }
    },
    template: '<Slider v-model="value" :min="0" :max="100" disabled />'
  })
}

export const VolumeControl: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const volume = ref([70])
      return { volume }
    },
    template: `
      <div class="max-w-sm space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium">Volume</span>
          <span class="text-sm text-gray-600">{{ volume[0] }}%</span>
        </div>
        <Slider v-model="volume" :min="0" :max="100" :step="5" />
      </div>
    `
  })
}

export const PriceRange: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const price = ref([300, 700])
      return { price }
    },
    template: `
      <div class="max-w-md space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium">Price Range</span>
          <span class="text-sm text-gray-600">$\{{ price[0] }} - $\{{ price[1] }}</span>
        </div>
        <Slider v-model="price" :min="0" :max="1000" :step="10" />
        <div class="flex justify-between text-xs text-gray-500">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>
    `
  })
}
