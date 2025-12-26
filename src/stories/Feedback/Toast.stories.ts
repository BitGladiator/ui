import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import { useToast } from '@/composables/useToast'

const meta: Meta = {
  title: 'Feedback/Toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Toast notifications using the global Toaster. The Toaster is automatically provided in the Storybook decorator.'
      }
    }
  }
}

export default meta
type Story = StoryObj

// Usage example showing complete setup
export const Usage: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const toast = useToast()
      const showToast = () => {
        toast.success(
          'Welcome!',
          'This is how you use toasts in your Vue components.'
        )
      }
      return { showToast }
    },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">How to use Toast in your Vue components:</h3>
        
        <div class="space-y-2">
          <h4 class="font-medium">1. Setup Toaster (in App.vue or main layout):</h4>
          <pre class="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>&lt;template&gt;
  &lt;div&gt;
    &lt;!-- Your app content --&gt;
    &lt;RouterView /&gt;
    
    &lt;!-- Add Toaster once at the root level --&gt;
    &lt;Toaster position="bottom-right" /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { Toaster } from '@cartino/ui'
&lt;/script&gt;</code></pre>
        </div>

        <div class="space-y-2">
          <h4 class="font-medium">2. Use in any component:</h4>
          <pre class="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>&lt;template&gt;
  &lt;Button @click="handleSave"&gt;Save&lt;/Button&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { useToast } from '@cartino/ui'

const toast = useToast()

const handleSave = async () => {
  try {
    // Your save logic here
    await saveData()
    
    // Show success toast
    toast.success('Saved!', 'Your changes have been saved.')
  } catch (error) {
    // Show error toast
    toast.error('Failed', 'Could not save changes.')
  }
}
&lt;/script&gt;</code></pre>
        </div>

        <div class="space-y-2">
          <h4 class="font-medium">3. Available methods:</h4>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li><code class="bg-muted px-1 py-0.5 rounded">toast.success(title, description)</code> - Success notification</li>
            <li><code class="bg-muted px-1 py-0.5 rounded">toast.error(title, description)</code> - Error notification</li>
            <li><code class="bg-muted px-1 py-0.5 rounded">toast.warning(title, description)</code> - Warning notification</li>
            <li><code class="bg-muted px-1 py-0.5 rounded">toast.info(title, description)</code> - Info notification</li>
            <li><code class="bg-muted px-1 py-0.5 rounded">toast.toast(options)</code> - Custom toast with all options</li>
            <li><code class="bg-muted px-1 py-0.5 rounded">toast.clear()</code> - Dismiss all toasts</li>
          </ul>
        </div>

        <div class="mt-6">
          <Button @click="showToast" variant="primary">
            Try it out!
          </Button>
        </div>
      </div>
    `
  })
}

// Basic toast examples with buttons
export const Default: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const toast = useToast()
      const showToast = () => {
        toast.toast({
          title: 'Notification',
          description: 'This is a default toast notification.'
        })
      }
      return { showToast }
    },
    template: `
      <div>
        <Button @click="showToast" variant="secondary">
          Show Toast
        </Button>
      </div>
    `
  })
}

export const AllColors: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const toast = useToast()

      const showSuccess = () =>
        toast.success('Success!', 'Your changes have been saved successfully.')
      const showWarning = () =>
        toast.warning('Warning', 'Please check your input and try again.')
      const showError = () =>
        toast.error('Error', 'Something went wrong. Please try again.')
      const showInfo = () =>
        toast.info('Information', 'Here is some useful information for you.')

      return { showSuccess, showWarning, showError, showInfo }
    },
    template: `
      <div>
        <div class="flex flex-wrap gap-3">
          <Button @click="showSuccess" variant="primary" tone="success">Success</Button>
          <Button @click="showWarning" variant="secondary">Warning</Button>
          <Button @click="showError" variant="primary" tone="critical">Error</Button>
          <Button @click="showInfo" variant="secondary">Info</Button>
        </div>
      </div>
    `
  })
}

export const MultipleToasts: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const toast = useToast()

      const showMultiple = () => {
        toast.success('First toast', 'This is the first notification')
        setTimeout(() => {
          toast.info('Second toast', 'This is the second notification')
        }, 500)
        setTimeout(() => {
          toast.warning('Third toast', 'This is the third notification')
        }, 1000)
      }

      return { showMultiple }
    },
    template: `
      <div>
        <Button @click="showMultiple" variant="primary">
          Show Multiple Toasts
        </Button>
      </div>
    `
  })
}

export const WithActions: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const toast = useToast()
      const showToast = () => {
        toast.toast({
          title: 'Confirm action',
          description: 'Are you sure you want to delete this item?',
          color: 'warning',
          duration: 0,
          actions: [
            {
              label: 'Cancel',
              onClick: () => console.log('Cancelled'),
              variant: 'tertiary'
            },
            {
              label: 'Delete',
              onClick: () => {
                console.log('Deleted')
                toast.success('Deleted!', 'Item has been removed')
              },
              variant: 'primary',
              tone: 'critical'
            }
          ]
        })
      }
      return { showToast }
    },
    template: `
      <div>
        <Button @click="showToast" variant="secondary">
          Show Toast with Actions
        </Button>
      </div>
    `
  })
}

export const PracticalExample: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const toast = useToast()
      const isLoading = ref(false)

      const handleFormSubmit = async () => {
        isLoading.value = true

        // Show loading toast
        const loadingToast = toast.toast({
          title: 'Saving...',
          description: 'Please wait while we save your changes.',
          color: 'info',
          close: false,
          duration: 0
        })

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Remove loading toast
        toast.remove(loadingToast.id)

        // Simulate success/error (random)
        const success = Math.random() > 0.3

        if (success) {
          toast.success(
            'Saved successfully!',
            'Your changes have been saved to the database.'
          )
        } else {
          toast.error(
            'Failed to save',
            'There was an error saving your changes. Please try again.',
            {
              actions: [
                {
                  label: 'Retry',
                  onClick: () => handleFormSubmit(),
                  variant: 'primary'
                }
              ]
            }
          )
        }

        isLoading.value = false
      }

      const handleDelete = () => {
        toast.toast({
          title: 'Are you sure?',
          description: 'This action cannot be undone.',
          color: 'warning',
          duration: 0,
          actions: [
            {
              label: 'Cancel',
              onClick: () => console.log('Cancelled'),
              variant: 'tertiary'
            },
            {
              label: 'Delete',
              onClick: async () => {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1000))
                toast.success('Deleted', 'Item has been permanently deleted.')
              },
              variant: 'primary',
              tone: 'critical'
            }
          ]
        })
      }

      const handleCopy = () => {
        // Simulate copying to clipboard
        navigator.clipboard?.writeText('Sample text')
        toast.toast({
          title: 'Copied!',
          description: 'Text has been copied to clipboard.',
          duration: 2000
        })
      }

      return { handleFormSubmit, handleDelete, handleCopy, isLoading }
    },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Real-world Usage Examples</h3>
        
        <div class="flex flex-wrap gap-3">
          <Button 
            @click="handleFormSubmit" 
            variant="primary"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Saving...' : 'Save Form' }}
          </Button>
          
          <Button 
            @click="handleDelete" 
            variant="primary"
            tone="critical"
          >
            Delete Item
          </Button>
          
          <Button 
            @click="handleCopy" 
            variant="secondary"
          >
            Copy to Clipboard
          </Button>
        </div>
        
        <div class="text-sm text-muted-foreground mt-4">
          <p>These examples demonstrate common use cases:</p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li>Loading states with non-closable toasts</li>
            <li>Success/error feedback after async operations</li>
            <li>Confirmation dialogs with action buttons</li>
            <li>Quick feedback for user actions (copy, etc.)</li>
          </ul>
        </div>
      </div>
    `
  })
}

export const NotClosable: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const toast = useToast()
      const showToast = () => {
        toast.toast({
          title: 'Processing',
          description: 'Please wait while we process your request...',
          color: 'info',
          close: false,
          duration: 0
        })
      }
      return { showToast }
    },
    template: `
      <div>
        <Button @click="showToast" variant="secondary">
          Show Non-Closable Toast
        </Button>
      </div>
    `
  })
}

export const CustomIcon: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const toast = useToast()
      const showToast = () => {
        toast.toast({
          title: 'Custom notification',
          description: 'This toast uses a custom icon.',
          icon: 'solar:heart-linear',
          color: 'error'
        })
      }
      return { showToast }
    },
    template: `
      <div>
        <Button @click="showToast" variant="secondary">
          Show Toast with Custom Icon
        </Button>
      </div>
    `
  })
}

export const DifferentPositions: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const toast = useToast()

      const showTopRight = () =>
        toast.toast({
          title: 'Top Right',
          description: 'Positioned top right'
        })
      const showTopLeft = () => toast.success('Top Left', 'Positioned top left')
      const showBottomRight = () =>
        toast.warning('Bottom Right', 'Positioned bottom right')
      const showBottomLeft = () =>
        toast.error('Bottom Left', 'Positioned bottom left')
      const showTopCenter = () =>
        toast.info('Top Center', 'Positioned top center')
      const showBottomCenter = () =>
        toast.toast({
          title: 'Bottom Center',
          description: 'Positioned bottom center'
        })

      return {
        showTopRight,
        showTopLeft,
        showBottomRight,
        showBottomLeft,
        showTopCenter,
        showBottomCenter
      }
    },
    template: `
      <div>
        <div class="flex flex-wrap gap-3">
          <Button @click="showTopRight" size="sm" variant="secondary">Top Right</Button>
          <Button @click="showTopLeft" size="sm" variant="secondary">Top Left</Button>
          <Button @click="showBottomRight" size="sm" variant="secondary">Bottom Right</Button>
          <Button @click="showBottomLeft" size="sm" variant="secondary">Bottom Left</Button>
          <Button @click="showTopCenter" size="sm" variant="secondary">Top Center</Button>
          <Button @click="showBottomCenter" size="sm" variant="secondary">Bottom Center</Button>
        </div>
      </div>
    `
  })
}

export const LongDuration: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const toast = useToast()
      const showToast = () => {
        toast.info(
          'Long duration',
          'This toast will stay visible for 10 seconds.',
          { duration: 10000 }
        )
      }
      return { showToast }
    },
    template: `
      <div>
        <Button @click="showToast" variant="secondary">
          Show 10 Second Toast
        </Button>
      </div>
    `
  })
}

export const TitleOnly: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const toast = useToast()
      const showToast = () => {
        toast.success('Saved!')
      }
      return { showToast }
    },
    template: `
      <div>
        <Button @click="showToast" variant="primary" tone="success">
          Show Title Only Toast
        </Button>
      </div>
    `
  })
}

export const DescriptionOnly: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const toast = useToast()
      const showToast = () => {
        toast.toast({
          description: 'This toast has only a description without a title.',
          color: 'info'
        })
      }
      return { showToast }
    },
    template: `
      <div>
        <Button @click="showToast" variant="secondary">
          Show Description Only
        </Button>
      </div>
    `
  })
}

export const MultipleToastsStacked: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const toast = useToast()

      const showMultiple = () => {
        toast.success('First toast', 'This is the first notification')
        setTimeout(() => {
          toast.info('Second toast', 'This is the second notification')
        }, 500)
        setTimeout(() => {
          toast.warning('Third toast', 'This is the third notification')
        }, 1000)
      }

      return { showMultiple }
    },
    template: `
      <div>
        <Button @click="showMultiple">
          Show Multiple Toasts
        </Button>
      </div>
    `
  })
}

export const WithCustomActions: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const toast = useToast()

      const showWithActions = () => {
        toast.toast({
          title: 'Confirm deletion',
          description: 'Are you sure you want to delete this item?',
          color: 'warning',
          duration: 0,
          actions: [
            {
              label: 'Cancel',
              onClick: () => {
                console.log('Cancelled')
              },
              variant: 'tertiary'
            },
            {
              label: 'Delete',
              onClick: () => {
                console.log('Deleted')
                toast.success('Deleted!', 'Item has been removed')
              },
              variant: 'primary',
              tone: 'critical'
            }
          ]
        })
      }

      return { showWithActions }
    },
    template: `
      <div>
        <Button @click="showWithActions">
          Show Toast with Actions
        </Button>
      </div>
    `
  })
}

export const DismissAll: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const toast = useToast()

      const showMany = () => {
        for (let i = 1; i <= 5; i++) {
          setTimeout(() => {
            toast.info('Toast ' + i, 'This is toast number ' + i)
          }, i * 200)
        }
      }

      const dismissAll = () => {
        toast.clear()
      }

      return { showMany, dismissAll }
    },
    template: `
      <div>
        <div class="flex gap-3">
          <Button @click="showMany">
            Show 5 Toasts
          </Button>
          <Button @click="dismissAll" variant="secondary">
            Dismiss All
          </Button>
        </div>
      </div>
    `
  })
}
