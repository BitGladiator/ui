import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Sheet from '@/components/Sheet.vue'
import Button from '@/components/Button.vue'

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
}

export default meta
type Story = StoryObj<typeof Sheet>

export const Default: Story = {
  render: (args) => ({
    components: { Sheet, Button },
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div>
        <Button @click="open = true">Open Sheet</Button>
        <Sheet v-model:open="open" v-bind="args">
          <div class="space-y-4">
            <p>This is the sheet content.</p>
            <p>You can put any content here.</p>
          </div>
        </Sheet>
      </div>
    `
  }),
  args: {
    title: 'Sheet Title',
    description: 'This is a description of the sheet content.',
    side: 'right',
    size: 'md'
  }
}

export const FromLeft: Story = {
  ...Default,
  args: {
    ...Default.args,
    side: 'left',
    title: 'Navigation Menu'
  }
}

export const FromTop: Story = {
  ...Default,
  args: {
    ...Default.args,
    side: 'top',
    title: 'Notifications'
  }
}

export const FromBottom: Story = {
  ...Default,
  args: {
    ...Default.args,
    side: 'bottom',
    title: 'Quick Actions'
  }
}

export const SmallSize: Story = {
  ...Default,
  args: {
    ...Default.args,
    size: 'sm',
    title: 'Small Sheet'
  }
}

export const LargeSize: Story = {
  ...Default,
  args: {
    ...Default.args,
    size: 'lg',
    title: 'Large Sheet'
  }
}

export const WithForm: Story = {
  render: (args) => ({
    components: { Sheet, Button },
    setup() {
      const open = ref(false)
      const handleSubmit = () => {
        alert('Form submitted!')
        open.value = false
      }
      return { args, open, handleSubmit }
    },
    template: `
      <div>
        <Button @click="open = true">Edit Profile</Button>
        <Sheet v-model:open="open" v-bind="args">
          <template #default>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Name</label>
                <input type="text" placeholder="Enter your name" class="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Email</label>
                <input type="email" placeholder="Enter your email" class="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Bio</label>
                <textarea placeholder="Tell us about yourself" rows="4" class="w-full px-3 py-2 border rounded-lg"></textarea>
              </div>
            </div>
          </template>
          <template #footer>
            <Button variant="outline" @click="open = false">Cancel</Button>
            <Button @click="handleSubmit">Save Changes</Button>
          </template>
        </Sheet>
      </div>
    `
  }),
  args: {
    title: 'Edit Profile',
    description: 'Make changes to your profile here.',
    side: 'right',
    size: 'md'
  }
}
