<template>
  <DialogRoot
    :open="open"
    @update:open="emit('update:open', $event)"
    trap-focus
    @escape-key-down="handleEscape"
  >
    <DialogPortal>
      <!-- Scrollable overlay mode -->
      <template v-if="props.scrollable">
        <DialogOverlay
          v-if="props.overlay"
          :class="modalTheme.overlay({ class: ui?.overlay }) + ' fixed inset-0 z-50 bg-black/50'"
        >
          <DialogContent :class="modalTheme.content({ class: ui?.content })">
            <!-- Header -->
            <div
              v-if="title || description || $slots.header || closable || icon"
              :class="modalTheme.header({ class: ui?.header })"
            >
              <slot name="header">
                <div :class="modalTheme.wrapper({ class: ui?.wrapper })">
                  <!-- Icon slot -->
                  <slot name="icon">
                    <Icon
                      v-if="icon"
                      :name="icon"
                      :class="modalTheme.icon({ tone: props.tone, class: ui?.icon })"
                    />
                  </slot>

                  <DialogTitle
                    v-if="title"
                    :class="modalTheme.title({ class: ui?.title })"
                  >
                    {{ title }}
                  </DialogTitle>
                  <DialogDescription
                    v-if="description"
                    :class="modalTheme.description({ class: ui?.description })"
                  >
                    {{ description }}
                  </DialogDescription>
                </div>

                <!-- Close button -->
                <DialogClose v-if="closable" as-child>
                  <Button
                    :leading-icon="closeIcon"
                    size="sm"
                    variant="plain"
                    aria-label="Close modal"
                    :class="modalTheme.closeButton({ class: ui?.closeButton })"
                  />
                </DialogClose>
              </slot>
            </div>

            <!-- Body -->
            <div :class="modalTheme.body({ class: ui?.body })">
              <slot />
            </div>

            <!-- Footer -->
            <div :class="modalTheme.footer({ class: ui?.footer })">
              <slot name="actions">
                <ButtonGroup align="end">
                  <Button variant="secondary" @click="emit('update:open', false)">
                    Cancel
                  </Button>
                  <Button variant="primary" @click="handleConfirm">
                    Confirm
                  </Button>
                </ButtonGroup>
              </slot>
            </div>
          </DialogContent>
        </DialogOverlay>
      </template>

      <!-- Default mode -->
      <template v-else>
        <DialogOverlay
          v-if="props.overlay"
          :class="modalTheme.overlay({ class: ui?.overlay }) + ' fixed inset-0 z-50 bg-black/50'"
        />
        <DialogContent :class="modalTheme.content({ class: ui?.content })">
          <!-- Header -->
          <div
            v-if="title || description || $slots.header || closable || icon"
            :class="modalTheme.header({ class: ui?.header })"
          >
            <slot name="header">
              <div :class="modalTheme.wrapper({ class: ui?.wrapper })">
                <!-- Icon slot -->
                <slot name="icon">
                  <Icon
                    v-if="icon"
                    :name="icon"
                    :class="modalTheme.icon({ tone: props.tone, class: ui?.icon })"
                  />
                </slot>

                <DialogTitle
                  v-if="title"
                  :class="modalTheme.title({ class: ui?.title })"
                >
                  {{ title }}
                </DialogTitle>
                <DialogDescription
                  v-if="description"
                  :class="modalTheme.description({ class: ui?.description })"
                >
                  {{ description }}
                </DialogDescription>
              </div>

              <!-- Close button -->
              <DialogClose v-if="closable" as-child>
                <Button
                  :leading-icon="closeIcon"
                  size="sm"
                  variant="plain"
                  aria-label="Close modal"
                  :class="modalTheme.closeButton({ class: ui?.closeButton })"
                />
              </DialogClose>
            </slot>
          </div>

          <!-- Body -->
          <div :class="modalTheme.body({ class: ui?.body })">
            <slot />
          </div>

          <!-- Footer -->
          <div :class="modalTheme.footer({ class: ui?.footer })">
            <slot name="actions">
              <ButtonGroup align="end">
                <Button variant="secondary" @click="emit('update:open', false)">
                  Cancel
                </Button>
                <Button variant="primary" @click="handleConfirm">
                  Confirm
                </Button>
              </ButtonGroup>
            </slot>
          </div>
        </DialogContent>
      </template>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from 'reka-ui'
import theme from '@/themes/modal'
import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'
import Icon from './Icon.vue' // Ensure you have an Icon component

export interface ModalProps {
  open?: boolean
  title?: string
  description?: string
  icon?: string
  tone?: 'success' | 'warning' | 'error' | 'info'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  closable?: boolean
  closeIcon?: string
  fullscreen?: boolean
  overlay?: boolean
  scrollable?: boolean
  transition?: boolean
  portal?: boolean | string | HTMLElement
  dismissible?: boolean
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<ModalProps>(), {
  open: false,
  size: 'md',
  closable: true,
  closeIcon: 'solar:close-circle-linear',
  fullscreen: false,
  overlay: true,
  scrollable: false,
  transition: true,
  portal: true,
  dismissible: true,
  tone: 'info',
  icon: undefined
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  confirm: []
}>()

const handleConfirm = () => {
  emit('confirm')
  emit('update:open', false)
}

const handleEscape = () => {
  emit('update:open', false)
}

const modalTheme = computed(() =>
  theme({
    size: props.size,
    fullscreen: props.fullscreen
  })
)
</script>