import type { Meta, StoryObj } from '@storybook/vue3'
import Link from '@/components/Link.vue'

const meta = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'Link URL'
    },
    external: {
      control: 'boolean',
      description: 'External link (opens in new tab)'
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'primary'],
      description: 'Link variant'
    }
  }
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: '#',
    default: 'This is a link'
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args }
    },
    template: '<Link v-bind="args">This is a link</Link>'
  })
}

export const Variants: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div class="space-y-3">
        <div><Link href="#" variant="default">Default Link</Link></div>
        <div><Link href="#" variant="muted">Muted Link</Link></div>
        <div><Link href="#" variant="primary">Primary Link</Link></div>
      </div>
    `
  })
}

export const ExternalLink: Story = {
  args: {
    href: 'https://example.com',
    external: true
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args }
    },
    template: '<Link v-bind="args">External Link (opens in new tab)</Link>'
  })
}

export const InText: Story = {
  render: () => ({
    components: { Link },
    template: `
      <p class="text-gray-700">
        This is some text with an <Link href="#">inline link</Link> in the middle of it.
        You can also add <Link href="#" variant="primary">primary links</Link> or 
        <Link href="#" variant="muted">muted links</Link> as needed.
      </p>
    `
  })
}
