import type { Meta, StoryObj } from '@storybook/vue3'
import Badge from '@/components/Badge.vue'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info', 'neutral'],
      description: 'Badge color variant'
    },
    variant: {
      control: 'select',
      options: ['soft', 'strong'],
      description: 'Badge variant style'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size'
    },
    progress: {
      control: 'select',
      options: [undefined, 'incomplete', 'partiallyComplete', 'complete'],
      description: 'Progress indicator'
    }
  }
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Default Badge',
    color: "warning"
  }
}

export const Small: Story = {
  args: {
    label: 'Small',
    size: 'sm'
  }
}

export const Medium: Story = {
  args: {
    label: 'Medium',
    size: 'md'
  }
}

export const Large: Story = {
  args: {
    label: 'Large',
    size: 'lg'
  }
}

export const PrimarySoft: Story = {
  args: {
    label: 'Primary',
    color: 'primary',
    variant: 'soft'
  }
}

export const PrimaryStrong: Story = {
  args: {
    label: 'Primary',
    color: 'primary',
    variant: 'strong'
  }
}

export const SuccessSoft: Story = {
  args: {
    label: 'Success',
    color: 'success',
    variant: 'soft'
  }
}

export const SuccessStrong: Story = {
  args: {
    label: 'Success',
    color: 'success',
    variant: 'strong'
  }
}

export const WarningSoft: Story = {
  args: {
    label: 'Warning',
    color: 'warning',
    variant: 'soft'
  }
}

export const WarningStrong: Story = {
  args: {
    label: 'Warning',
    color: 'warning',
    variant: 'strong'
  }
}

export const ErrorSoft: Story = {
  args: {
    label: 'Error',
    color: 'error',
    variant: 'soft'
  }
}

export const ErrorStrong: Story = {
  args: {
    label: 'Error',
    color: 'error',
    variant: 'strong'
  }
}

export const InfoSoft: Story = {
  args: {
    label: 'Info',
    color: 'info',
    variant: 'soft'
  }
}

export const InfoStrong: Story = {
  args: {
    label: 'Info',
    color: 'info',
    variant: 'strong'
  }
}

export const NeutralSoft: Story = {
  args: {
    label: 'Neutral',
    color: 'neutral',
    variant: 'soft'
  }
}

export const NeutralStrong: Story = {
  args: {
    label: 'Neutral',
    color: 'neutral',
    variant: 'strong'
  }
}

export const IncompleteProgress: Story = {
  args: {
    label: 'Incomplete',
    progress: 'incomplete',
    color: 'warning'
  }
}

export const PartiallyCompleteProgress: Story = {
  args: {
    label: 'Partially Complete',
    progress: 'partiallyComplete',
    color: 'warning'
  }
}

export const CompleteProgress: Story = {
  args: {
    label: 'Complete',
    progress: 'complete',
    color: 'success'
  }
}
