<script setup lang="ts">
import { computed } from 'vue'
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from 'reka-ui'
import theme from '@/themes/dropdown'
import Icon from '@/components/Icon.vue'

export interface DropdownItem {
  type?: 'item' | 'label' | 'separator' | 'checkbox'
  label?: string
  value?: string
  icon?: string
  disabled?: boolean
  checked?: boolean
  shortcut?: string
  children?: DropdownItem[]
  onClick?: (e: Event) => void
  onSelect?: () => void
}

export interface DropdownProps {
  items?: DropdownItem[]
  disabled?: boolean
  modal?: boolean
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  collisionPadding?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'minimal' | 'glass'
  rounded?: 'sm' | 'md' | 'lg'
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<DropdownProps>(), {
  disabled: false,
  modal: true,
  align: 'start',
  side: 'bottom',
  sideOffset: 8,
  collisionPadding: 8,
  size: 'md',
  variant: 'default',
  rounded: 'md'
})

const emit = defineEmits<{
  select: [item: DropdownItem]
  'update:checked': [item: DropdownItem, checked: boolean]
}>()

const ui = computed(() =>
  theme({
    size: props.size,
    variant: props.variant,
    rounded: props.rounded
  })
)

const handleItemClick = (item: DropdownItem, e: Event) => {
  if (!item.disabled) {
    item.onClick?.(e)
    item.onSelect?.()
    emit('select', item)
  }
}

const handleCheckboxChange = (item: DropdownItem, checked: boolean) => {
  if (!item.disabled) {
    emit('update:checked', item, checked)
  }
}
</script>

<template>
  <DropdownMenuRoot :modal="modal">
    <DropdownMenuTrigger as-child :disabled="disabled">
      <slot name="trigger" />
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        class="dropdown-content"
        :class="ui.content({ class: props.ui?.content })"
        :align="align"
        :side="side"
        :side-offset="sideOffset"
        :collision-padding="collisionPadding"
        force-mount
      >
        <div :class="ui.viewport({ class: props.ui?.viewport })">
          <slot>
            <template v-for="(item, index) in items" :key="index">
              <!-- Separator -->
              <DropdownMenuSeparator
                v-if="item.type === 'separator'"
                :class="ui.separator({ class: props.ui?.separator })"
              />

              <!-- Label -->
              <DropdownMenuLabel
                v-else-if="item.type === 'label'"
                :class="ui.label({ class: props.ui?.label })"
              >
                {{ item.label }}
              </DropdownMenuLabel>

              <!-- Checkbox Item -->
              <DropdownMenuCheckboxItem
                v-else-if="item.type === 'checkbox'"
                :class="ui.item({ class: props.ui?.item })"
                :disabled="item.disabled"
                :checked="item.checked"
                @update:checked="
                  (checked) => handleCheckboxChange(item, checked)
                "
              >
                <Icon
                  v-if="item.icon"
                  :name="item.icon"
                  :class="ui.itemIcon({ class: props.ui?.itemIcon })"
                />
                <span :class="ui.itemLabel({ class: props.ui?.itemLabel })">{{
                  item.label
                }}</span>
                <span
                  v-if="item.shortcut"
                  :class="ui.itemShortcut({ class: props.ui?.itemShortcut })"
                  >{{ item.shortcut }}</span
                >
              </DropdownMenuCheckboxItem>

              <!-- Sub Menu -->
              <DropdownMenuSub
                v-else-if="item.children && item.children.length > 0"
              >
                <DropdownMenuSubTrigger
                  :class="ui.item({ class: props.ui?.item })"
                  :disabled="item.disabled"
                >
                  <Icon
                    v-if="item.icon"
                    :name="item.icon"
                    :class="ui.itemIcon({ class: props.ui?.itemIcon })"
                  />
                  <span :class="ui.itemLabel({ class: props.ui?.itemLabel })">{{
                    item.label
                  }}</span>
                  <Icon
                    name="solar:alt-arrow-right-linear"
                    :class="ui.itemShortcut({ class: props.ui?.itemShortcut })"
                  />
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent
                  :class="ui.content({ class: props.ui?.content })"
                >
                  <template
                    v-for="(child, childIndex) in item.children"
                    :key="childIndex"
                  >
                    <DropdownMenuItem
                      :class="ui.item({ class: props.ui?.item })"
                      :disabled="child.disabled"
                      @click="(e) => handleItemClick(child, e)"
                    >
                      <Icon
                        v-if="child.icon"
                        :name="child.icon"
                        :class="ui.itemIcon({ class: props.ui?.itemIcon })"
                      />
                      <span
                        :class="ui.itemLabel({ class: props.ui?.itemLabel })"
                        >{{ child.label }}</span
                      >
                      <span
                        v-if="child.shortcut"
                        :class="
                          ui.itemShortcut({ class: props.ui?.itemShortcut })
                        "
                        >{{ child.shortcut }}</span
                      >
                    </DropdownMenuItem>
                  </template>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <!-- Regular Item -->
              <DropdownMenuItem
                v-else
                :class="ui.item({ class: props.ui?.item })"
                :disabled="item.disabled"
                @click="(e) => handleItemClick(item, e)"
              >
                <Icon
                  v-if="item.icon"
                  :name="item.icon"
                  :class="ui.itemIcon({ class: props.ui?.itemIcon })"
                />
                <span :class="ui.itemLabel({ class: props.ui?.itemLabel })">{{
                  item.label
                }}</span>
                <span
                  v-if="item.shortcut"
                  :class="ui.itemShortcut({ class: props.ui?.itemShortcut })"
                  >{{ item.shortcut }}</span
                >
              </DropdownMenuItem>
            </template>
          </slot>
        </div>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<style>
.dropdown-content {
  /* Hardware acceleration */
  will-change: transform, opacity;
  transform: translateZ(0);
}

.dropdown-content[data-state='open'] {
  animation: dropdown-fade-in 0.1s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-content[data-state='closed'] {
  animation: dropdown-fade-out 0.1s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes dropdown-fade-in {
  from {
    opacity: 0;
    transform: translateY(-4px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes dropdown-fade-out {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-4px) scale(0.96);
  }
}
</style>
