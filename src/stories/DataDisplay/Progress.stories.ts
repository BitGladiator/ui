import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Progress from '@/components/Progress.vue'

const meta: Meta<typeof Progress> = {
  title: 'DataDisplay/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info', 'neutral']
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    },
    animation: {
      control: 'select',
      options: ['none', 'carousel', 'carousel-inverse', 'swing', 'elastic']
    },
    modelValue: {
      control: { type: 'number', min: 0, max: 100, step: 1 }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Default - shows animation controls working (indeterminate state)
export const Default: Story = {
  args: {
    modelValue: null,
    animation: 'none'
  }
}

// Usage example
export const Usage: Story = {
  args: {
    modelValue: 50
  }
}

// Max with number
export const Max: Story = {
  args: {
    modelValue: 3,
    max: 4
  }
}

// Max with array
export const MaxArray: Story = {
  args: {
    modelValue: 3,
    max: ['Waiting...', 'Cloning...', 'Migrating...', 'Deploying...', 'Done!']
  }
}

// Status prop
export const Status: Story = {
  args: {
    modelValue: 50,
    status: true
  }
}

// Indeterminate
export const Indeterminate: Story = {
  args: {
    modelValue: null,
    animation: 'carousel'
  }
}

// All Animation Variants
export const Animations: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-6">
        <div>
          <h4 class="text-sm font-medium mb-2">Carousel (default)</h4>
          <Progress :model-value="null" animation="carousel" />
        </div>
        <div>
          <h4 class="text-sm font-medium mb-2">Carousel Inverse</h4>
          <Progress :model-value="null" animation="carousel-inverse" />
        </div>
        <div>
          <h4 class="text-sm font-medium mb-2">Swing</h4>
          <Progress :model-value="null" animation="swing" />
        </div>
        <div>
          <h4 class="text-sm font-medium mb-2">Elastic</h4>
          <Progress :model-value="null" animation="elastic" />
        </div>
      </div>
    `
  })
}

// Animation variants - Individual
export const AnimationSwing: Story = {
  args: {
    modelValue: null,
    animation: 'swing'
  }
}

export const AnimationCarouselInverse: Story = {
  args: {
    modelValue: null,
    animation: 'carousel-inverse'
  }
}

export const AnimationElastic: Story = {
  args: {
    modelValue: null,
    animation: 'elastic'
  }
}

// Orientation
export const Vertical: Story = {
  args: {
    modelValue: 50,
    orientation: 'vertical',
    class: 'h-48'
  }
}

// Color
export const ColorNeutral: Story = {
  args: {
    modelValue: 50,
    color: 'neutral'
  }
}

export const Colors: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4">
        <Progress :model-value="50" color="primary" />
        <Progress :model-value="50" color="success" />
        <Progress :model-value="50" color="warning" />
        <Progress :model-value="50" color="error" />
        <Progress :model-value="50" color="info" />
        <Progress :model-value="50" color="neutral" />
      </div>
    `
  })
}

// Size
export const Sizes: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-6">
        <Progress :model-value="50" size="sm" />
        <Progress :model-value="50" size="md" />
        <Progress :model-value="50" size="lg" />
      </div>
    `
  })
}

// Inverted
export const Inverted: Story = {
  args: {
    modelValue: 25,
    inverted: true
  }
}

// Animated progress
export const Animated: Story = {
  render: () => ({
    components: { Progress },
    setup() {
      const progress = ref(0)

      const startAnimation = () => {
        const interval = setInterval(() => {
          progress.value += 1
          if (progress.value >= 100) {
            clearInterval(interval)
          }
        }, 50)
      }

      startAnimation()

      return { progress }
    },
    template: `
      <Progress 
        :model-value="progress" 
        :status="true"
      />
    `
  })
}

// File Upload Example
export const FileUpload: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-6">
        <div>
          <p class="text-sm font-medium mb-2">document.pdf</p>
          <Progress 
            :model-value="85" 
            :status="true"
            color="success"
          />
        </div>
        
        <div>
          <p class="text-sm font-medium mb-4">Multiple Files</p>
          <div class="space-y-3">
            <div>
              <p class="text-xs text-muted-foreground mb-1">image1.jpg</p>
              <Progress :model-value="100" color="success" />
            </div>
            <div>
              <p class="text-xs text-muted-foreground mb-1">image2.jpg</p>
              <Progress :model-value="67" color="primary" />
            </div>
            <div>
              <p class="text-xs text-muted-foreground mb-1">image3.jpg</p>
              <Progress :model-value="23" color="primary" />
            </div>
          </div>
        </div>
      </div>
    `
  })
}

// Steps Example
export const Steps: Story = {
  render: () => ({
    components: { Progress },
    setup() {
      const steps = [
        'Design',
        'Development',
        'Testing',
        'Deployment',
        'Complete'
      ]
      return { steps }
    },
    template: `
      <Progress 
        :model-value="2"
        :max="steps"
        :status="true"
        color="primary"
      />
    `
  })
}
