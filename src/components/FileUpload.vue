<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useDropZone, useFileDialog } from '@vueuse/core'
import theme from '@/themes/file-upload'
import Icon from './Icon.vue'
import Avatar from './Avatar.vue'
import Button from './Button.vue'

export interface FileUploadProps {
  id?: string
  name?: string
  icon?: string
  label?: string
  description?: string
  variant?: 'area' | 'button'
  size?: 'sm' | 'md' | 'lg'
  layout?: 'list' | 'grid'
  position?: 'inside' | 'outside'
  highlight?: boolean
  accept?: string
  multiple?: boolean
  reset?: boolean
  dropzone?: boolean
  interactive?: boolean
  required?: boolean
  disabled?: boolean
  fileIcon?: string
  fileDelete?: boolean
  fileDeleteIcon?: string
  preview?: boolean
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<FileUploadProps>(), {
  accept: '*',
  multiple: false,
  reset: false,
  dropzone: true,
  interactive: true,
  fileDelete: true,
  layout: 'list',
  position: 'outside',
  preview: true,
  variant: 'area',
  size: 'md',
  icon: 'solar:upload-linear',
  fileIcon: 'solar:file-linear',
  fileDeleteIcon: 'solar:close-circle-linear'
})

const emit = defineEmits<{
  change: [event: Event]
}>()

const modelValue = defineModel<File | File[] | null>()

const dropzoneRef = ref<HTMLDivElement>()
const isDragging = ref(false)

// File dialog
const {
  open,
  reset: resetDialog,
  onChange
} = useFileDialog({
  accept: props.accept,
  multiple: props.multiple,
  reset: props.reset
})

// Dropzone
const { isOverDropZone } = useDropZone(dropzoneRef, {
  onDrop: (files) => {
    if (props.disabled || !props.dropzone) return
    onFilesSelected(files || [])
  },
  onEnter: () => {
    isDragging.value = true
  },
  onLeave: () => {
    isDragging.value = false
  }
})

// Watch dialog files
onChange((files) => {
  if (files) {
    onFilesSelected(Array.from(files))
  }
})

const computedVariant = computed(() =>
  props.multiple ? 'area' : props.variant
)
const computedLayout = computed(() =>
  props.variant === 'button' && !props.multiple ? 'grid' : props.layout
)
const computedPosition = computed(() => {
  if (computedLayout.value === 'grid' && props.multiple) {
    return 'inside'
  }
  if (computedVariant.value === 'button') {
    return 'outside'
  }
  return props.position
})

const ui = computed(() =>
  theme({
    dropzone: props.dropzone,
    interactive: props.interactive,
    size: props.size,
    variant: computedVariant.value,
    layout: computedLayout.value,
    position: computedPosition.value,
    multiple: props.multiple,
    highlight: props.highlight,
    disabled: props.disabled
  })
)

function createObjectUrl(file: File): string {
  return URL.createObjectURL(file)
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  const size = bytes / Math.pow(k, i)
  const formattedSize = i === 0 ? size.toString() : size.toFixed(0)

  return `${formattedSize}${sizes[i]}`
}

function onFilesSelected(files: File[]) {
  if (props.multiple) {
    const existingFiles = (modelValue.value as File[]) || []
    modelValue.value = [...existingFiles, ...files]
  } else {
    modelValue.value = files[0] || null
  }

  isDragging.value = false

  const event = new Event('change', {
    bubbles: true,
    cancelable: true
  })
  Object.defineProperty(event, 'target', {
    writable: false,
    value: { value: modelValue.value }
  })
  emit('change', event)
}

function removeFile(index?: number) {
  if (!modelValue.value) return

  if (!props.multiple || index === undefined) {
    modelValue.value = null
    if (props.reset) {
      resetDialog()
    }
    return
  }

  const files = [...(modelValue.value as File[])]
  files.splice(index, 1)
  modelValue.value = files.length > 0 ? files : null
}

function handleClick() {
  if (props.interactive && !props.disabled) {
    open()
  }
}

function handleKeyUp(event: KeyboardEvent) {
  if (
    (event.key === 'Enter' || event.key === ' ') &&
    props.interactive &&
    !props.disabled
  ) {
    open()
  }
}

const hasFiles = computed(() => {
  if (!modelValue.value) return false
  return Array.isArray(modelValue.value) ? modelValue.value.length > 0 : true
})

const filesArray = computed(() => {
  if (!modelValue.value) return []
  return Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value]
})

// Clean up when model value changes
watch(modelValue, (newValue) => {
  const hasModelReset = props.multiple
    ? !(newValue as File[])?.length
    : !newValue

  if (hasModelReset && props.reset) {
    resetDialog()
  }
})
</script>

<template>
  <div :class="ui.root({ class: [props.ui?.root, props.class] })">
    <slot :open="open" :remove-file="removeFile" :ui="ui">
      <component
        :is="computedVariant === 'button' ? 'button' : 'div'"
        ref="dropzoneRef"
        :type="computedVariant === 'button' ? 'button' : undefined"
        :role="computedVariant === 'button' ? undefined : 'button'"
        :data-dragging="isDragging || isOverDropZone"
        :class="ui.base({ class: props.ui?.base })"
        :tabindex="interactive && !disabled ? 0 : -1"
        :disabled="disabled"
        @click="handleClick"
        @keydown.space.prevent
        @keyup.enter.space="handleKeyUp"
      >
        <!-- Files (Inside position) -->
        <template
          v-if="computedPosition === 'inside' && props.preview && hasFiles"
        >
          <slot
            name="files-top"
            :files="modelValue"
            :open="open"
            :remove-file="removeFile"
          />

          <div :class="ui.files({ class: props.ui?.files })">
            <slot name="files" :files="modelValue">
              <div
                v-for="(file, index) in filesArray"
                :key="file.name"
                :class="ui.file({ class: props.ui?.file })"
              >
                <slot name="file" :file="file" :index="index">
                  <slot
                    name="file-leading"
                    :file="file"
                    :index="index"
                    :ui="ui"
                  >
                    <Avatar
                      :src="
                        file.type.startsWith('image/')
                          ? createObjectUrl(file)
                          : undefined
                      "
                      :icon="fileIcon"
                      :size="props.size"
                      :class="
                        ui.fileLeadingAvatar({
                          class: props.ui?.fileLeadingAvatar
                        })
                      "
                    />
                  </slot>

                  <div
                    :class="ui.fileWrapper({ class: props.ui?.fileWrapper })"
                  >
                    <span :class="ui.fileName({ class: props.ui?.fileName })">
                      <slot name="file-name" :file="file" :index="index">
                        {{ file.name }}
                      </slot>
                    </span>

                    <span :class="ui.fileSize({ class: props.ui?.fileSize })">
                      <slot name="file-size" :file="file" :index="index">
                        {{ formatFileSize(file.size) }}
                      </slot>
                    </span>
                  </div>

                  <slot
                    name="file-trailing"
                    :file="file"
                    :index="index"
                    :ui="ui"
                  >
                    <Button
                      v-if="fileDelete"
                      variant="monochromePlain"
                      :size="computedLayout === 'grid' ? 'sm' : size"
                      :trailing-icon="fileDeleteIcon"
                      :class="
                        ui.fileTrailingButton({
                          class: props.ui?.fileTrailingButton
                        })
                      "
                      :aria-label="`Remove ${file.name}`"
                      @click.stop.prevent="removeFile(index)"
                    />
                  </slot>
                </slot>
              </div>
            </slot>
          </div>

          <slot
            name="files-bottom"
            :files="modelValue"
            :open="open"
            :remove-file="removeFile"
          />
        </template>

        <!-- Dropzone content -->
        <div
          v-if="
            computedPosition === 'inside'
              ? multiple
                ? !hasFiles
                : !modelValue
              : true
          "
          :class="ui.wrapper({ class: props.ui?.wrapper })"
        >
          <slot name="leading" :ui="ui">
            <Icon
              v-if="computedVariant === 'button'"
              :name="icon"
              :class="ui.icon({ class: props.ui?.icon })"
            />
            <Avatar
              v-else
              :icon="icon"
              :size="props.size"
              :class="ui.avatar({ class: props.ui?.avatar })"
            />
          </slot>

          <template v-if="computedVariant !== 'button'">
            <div
              v-if="label || $slots.label"
              :class="ui.label({ class: props.ui?.label })"
            >
              <slot name="label">
                {{ label }}
              </slot>
            </div>

            <div
              v-if="description || $slots.description"
              :class="ui.description({ class: props.ui?.description })"
            >
              <slot name="description">
                {{ description }}
              </slot>
            </div>

            <div
              v-if="$slots.actions"
              :class="ui.actions({ class: props.ui?.actions })"
            >
              <slot
                name="actions"
                :files="modelValue"
                :open="open"
                :remove-file="removeFile"
              />
            </div>
          </template>
        </div>
      </component>

      <!-- Files (Outside position) -->
      <template
        v-if="computedPosition === 'outside' && props.preview && hasFiles"
      >
        <slot
          name="files-top"
          :files="modelValue"
          :open="open"
          :remove-file="removeFile"
        />

        <div :class="ui.files({ class: props.ui?.files })">
          <slot name="files" :files="modelValue">
            <div
              v-for="(file, index) in filesArray"
              :key="file.name"
              :class="ui.file({ class: props.ui?.file })"
            >
              <slot name="file" :file="file" :index="index">
                <slot name="file-leading" :file="file" :index="index" :ui="ui">
                  <Avatar
                    :src="
                      file.type.startsWith('image/')
                        ? createObjectUrl(file)
                        : undefined
                    "
                    :icon="fileIcon"
                    :size="props.size"
                    :class="
                      ui.fileLeadingAvatar({
                        class: props.ui?.fileLeadingAvatar
                      })
                    "
                  />
                </slot>

                <div :class="ui.fileWrapper({ class: props.ui?.fileWrapper })">
                  <span :class="ui.fileName({ class: props.ui?.fileName })">
                    <slot name="file-name" :file="file" :index="index">
                      {{ file.name }}
                    </slot>
                  </span>

                  <span :class="ui.fileSize({ class: props.ui?.fileSize })">
                    <slot name="file-size" :file="file" :index="index">
                      {{ formatFileSize(file.size) }}
                    </slot>
                  </span>
                </div>

                <slot name="file-trailing" :file="file" :index="index" :ui="ui">
                  <Button
                    v-if="fileDelete"
                    variant="monochromePlain"
                    :size="computedLayout === 'grid' ? 'sm' : size"
                    :trailing-icon="fileDeleteIcon"
                    :class="
                      ui.fileTrailingButton({
                        class: props.ui?.fileTrailingButton
                      })
                    "
                    :aria-label="`Remove ${file.name}`"
                    @click.stop.prevent="removeFile(index)"
                  />
                </slot>
              </slot>
            </div>
          </slot>
        </div>

        <slot
          name="files-bottom"
          :files="modelValue"
          :open="open"
          :remove-file="removeFile"
        />
      </template>
    </slot>
  </div>
</template>
