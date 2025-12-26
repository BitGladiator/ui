import type { Meta, StoryObj } from '@storybook/vue3'
import Alert from '@/components/Alert.vue'

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['info', 'success', 'warning', 'critical', 'neutral'],
      description: 'Color tone of the alert (Polaris-inspired)'
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation'
    },
    closable: {
      control: 'boolean',
      description: 'Show close button'
    }
  }
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    color: 'info',
    title: 'Heads up!',
    description: 'You can change the primary color in your app config.'
  }
}

export const Success: Story = {
  args: {
    color: 'success',
    title: 'Success!',
    description: 'Your changes have been saved successfully.'
  }
}

export const Warning: Story = {
  args: {
    color: 'warning',
    title: 'Warning',
    description: 'Please review your input before proceeding.'
  }
}

export const Critical: Story = {
  args: {
    color: 'critical',
    title: 'Error',
    description: 'An error occurred while processing your request.'
  }
}

export const Neutral: Story = {
  args: {
    color: 'neutral',
    title: 'Did you know?',
    description:
      'You can customize the appearance of this alert using the color prop.'
  }
}

export const Closable: Story = {
  args: {
    closable: true,
    color: 'info',
    title: 'Closable Alert',
    description: 'Click the × button to close this alert.'
  }
}

export const HorizontalOrientation: Story = {
  args: {
    color: 'success',
    orientation: 'horizontal',
    title: 'Horizontal Layout',
    description: 'This alert uses horizontal orientation.'
  }
}

export const VerticalOrientation: Story = {
  args: {
    color: 'warning',
    orientation: 'vertical',
    title: 'Vertical Layout',
    description: 'This alert uses vertical orientation with actions below.'
  }
}

export const WithActions: Story = {
  args: {
    color: 'warning',
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed with this action?',
    actions: [
      {
        label: 'Cancel',
        variant: 'ghost',
        onClick: () => alert('Cancelled')
      },
      {
        label: 'Confirm',
        variant: 'primary',
        onClick: () => alert('Confirmed')
      }
    ]
  }
}

export const WithCustomIcon: Story = {
  args: {
    color: 'success',
    icon: '🎉',
    title: 'Congratulations!',
    description: 'You have completed all tasks.'
  }
}

export const TitleOnly: Story = {
  args: {
    color: 'info',
    title: 'Simple alert with title only'
  }
}

export const DescriptionOnly: Story = {
  args: {
    color: 'neutral',
    description: 'This alert only has a description without a title.'
  }
}

export const AllColors: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="space-y-4">
        <Alert color="info" title="Info" description="Informational alert with blue background (Polaris style)" />
        <Alert color="success" title="Success" description="Success alert with green background (Polaris style)" />
        <Alert color="warning" title="Warning" description="Warning alert with yellow background (Polaris style)" />
        <Alert color="critical" title="Critical" description="Critical alert with red background (Polaris style)" />
        <Alert color="neutral" title="Neutral" description="Neutral alert with gray background (Polaris style)" />
      </div>
    `
  })
}

export const ComplexExample: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="space-y-4">
        <Alert
          color="critical"
          closable
          title="Payment Failed"
          description="Your payment could not be processed. Please check your payment method and try again."
          :actions="[
            { label: 'Update Payment', variant: 'primary', onClick: () => alert('Update payment') },
            { label: 'Contact Support', variant: 'secondary', onClick: () => alert('Contact support') }
          ]"
        />

        <Alert
          color="success"
          icon="solar:check-circle-linear"
          title="Deployment Successful"
          description="Your application has been deployed to production."
          :actions="[
            { label: 'View Details', variant: 'secondary', onClick: () => alert('View details') }
          ]"
        />
        
        <Alert
          color="info"
          orientation="horizontal"
          title="New Feature Available"
          description="Check out our latest updates."
          :actions="[
            { label: 'Learn More', variant: 'primary', onClick: () => alert('Learn more') }
          ]"
        />
      </div>
    `
  })
}
