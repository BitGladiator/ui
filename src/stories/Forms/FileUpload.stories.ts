import type { Meta, StoryObj } from '@storybook/vue3'
import FileUpload from '@/components/FileUpload.vue'

const meta = {
  title: 'Forms/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['area', 'button'],
      description: 'Visual variant of the file upload'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the component'
    },
    layout: {
      control: 'select',
      options: ['list', 'grid'],
      description: 'Layout for displaying files'
    },
    position: {
      control: 'select',
      options: ['inside', 'outside'],
      description: 'Position of file list'
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection'
    },
    dropzone: {
      control: 'boolean',
      description: 'Enable drag and drop'
    },
    interactive: {
      control: 'boolean',
      description: 'Make clickable to open file dialog'
    },
    preview: {
      control: 'boolean',
      description: 'Show file preview/list'
    }
  }
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Drop your image here',
    description: 'SVG, PNG, JPG or GIF (max. 2MB)'
  }
}

export const Multiple: Story = {
  args: {
    label: 'Drop your images here',
    description: 'SVG, PNG, JPG or GIF (max. 2MB)',
    multiple: true
  }
}

export const WithIcon: Story = {
  args: {
    label: 'Upload files',
    description: 'Click or drag files to this area',
    icon: 'solar:cloud-upload-bold'
  }
}

export const GridLayout: Story = {
  args: {
    label: 'Upload images',
    description: 'Click or drag images to this area',
    multiple: true,
    layout: 'grid',
    accept: 'image/*'
  }
}

export const ListLayout: Story = {
  args: {
    label: 'Upload documents',
    description: 'PDF, DOC, DOCX (max. 10MB)',
    multiple: true,
    layout: 'list',
    accept: '.pdf,.doc,.docx'
  }
}

export const ButtonVariant: Story = {
  args: {
    variant: 'button',
    icon: 'solar:upload-bold'
  }
}

export const InsidePosition: Story = {
  args: {
    label: 'Upload files',
    description: 'Drag and drop or click to browse',
    multiple: true,
    position: 'inside',
    layout: 'grid'
  }
}

export const NonInteractive: Story = {
  args: {
    label: 'Files will be uploaded automatically',
    description: 'Drag files here or use the button below',
    interactive: false,
    multiple: true
  }
}

export const NoDropzone: Story = {
  args: {
    label: 'Click to select files',
    description: 'Drag and drop is disabled',
    dropzone: false
  }
}

export const Disabled: Story = {
  args: {
    label: 'Upload disabled',
    description: 'File upload is currently disabled',
    disabled: true
  }
}

export const ImagesOnly: Story = {
  args: {
    label: 'Upload images',
    description: 'Only image files are accepted',
    accept: 'image/*',
    icon: 'solar:gallery-bold',
    multiple: true,
    layout: 'grid'
  }
}

export const SmallSize: Story = {
  args: {
    label: 'Upload',
    description: 'Small file upload',
    size: 'sm'
  }
}

export const LargeSize: Story = {
  args: {
    label: 'Drop your files here',
    description: 'Large file upload area',
    size: 'lg'
  }
}

export const WithHighlight: Story = {
  args: {
    label: 'Highlighted upload area',
    description: 'This area is highlighted',
    highlight: true
  }
}
