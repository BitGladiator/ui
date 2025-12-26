import type { Meta, StoryObj } from '@storybook/vue3'
import Accordion from '@/components/Accordion.vue'

const meta = {
  title: 'Data Display/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Type of accordion (single or multiple items can be open)'
    },
    collapsible: {
      control: 'boolean',
      description: 'Allow all items to be closed'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all items'
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'separated'],
      description: 'Visual variant of the accordion'
    }
  }
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      {
        label: 'What is Vue 3?',
        content:
          'Vue 3 is the latest major version of Vue.js, a progressive JavaScript framework for building user interfaces.'
      },
      {
        label: 'What is Vite?',
        content:
          'Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects.'
      },
      {
        label: 'What is Tailwind CSS?',
        content:
          'Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.'
      }
    ]
  }
}

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    items: [
      {
        label: 'Shipping Information',
        content:
          'We offer free shipping on orders over $50. Standard shipping takes 3-5 business days.'
      },
      {
        label: 'Return Policy',
        content:
          'You can return items within 30 days of purchase for a full refund. Items must be in original condition.'
      },
      {
        label: 'Payment Methods',
        content: 'We accept all major credit cards, PayPal, and Apple Pay.'
      }
    ]
  }
}

export const Separated: Story = {
  args: {
    variant: 'separated',
    items: [
      {
        label: 'Personal Information',
        content:
          'Your personal information is securely stored and never shared with third parties.'
      },
      {
        label: 'Account Settings',
        content:
          'You can update your account settings at any time from your profile page.'
      },
      {
        label: 'Notifications',
        content:
          'Choose how you want to receive notifications: email, SMS, or push notifications.'
      }
    ]
  }
}

export const Multiple: Story = {
  args: {
    type: 'multiple',
    items: [
      {
        label: 'Features',
        content:
          'Built with Vue 3, Vite, TypeScript, Tailwind CSS v4, and Reka UI.'
      },
      {
        label: 'Customization',
        content:
          'Easily customize colors, spacing, and other design tokens using Tailwind CSS.'
      },
      {
        label: 'Accessibility',
        content:
          'All components are built with accessibility in mind, following WAI-ARIA guidelines.'
      },
      {
        label: 'Documentation',
        content:
          'Comprehensive documentation with live examples and code snippets.'
      }
    ]
  }
}

export const WithIcons: Story = {
  args: {
    variant: 'separated',
    items: [
      {
        label: 'Installation',
        icon: '📦',
        content: 'Install the package using pnpm add @cartino/ui'
      },
      {
        label: 'Setup',
        icon: '⚙️',
        content: 'Import the components and styles in your Vue application'
      },
      {
        label: 'Usage',
        icon: '🚀',
        content: 'Start using the components in your templates'
      }
    ]
  }
}

export const SingleItemDisabled: Story = {
  args: {
    items: [
      {
        label: 'Active Item',
        content: 'This item is active and can be opened.'
      },
      {
        label: 'Disabled Item',
        content: 'This item is disabled and cannot be opened.',
        disabled: true
      },
      {
        label: 'Another Active Item',
        content: 'This item is also active.'
      }
    ]
  }
}

export const AllDisabled: Story = {
  args: {
    disabled: true,
    items: [
      {
        label: 'Question 1',
        content: 'All items are disabled in this example.'
      },
      {
        label: 'Question 2',
        content: 'You cannot open any of these items.'
      },
      {
        label: 'Question 3',
        content: 'The entire accordion is disabled.'
      }
    ]
  }
}

export const LongContent: Story = {
  args: {
    variant: 'bordered',
    items: [
      {
        label: 'Short Content',
        content: 'This is a brief answer.'
      },
      {
        label: 'Long Content',
        content: `This is a much longer answer that contains multiple paragraphs of text.

It demonstrates how the accordion handles longer content gracefully. The animation smoothly expands to accommodate all the text, regardless of length.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
      },
      {
        label: 'Medium Content',
        content:
          'This answer is somewhere in between. It has a few sentences but is not as long as the previous example. It still demonstrates the smooth animation.'
      }
    ]
  }
}
