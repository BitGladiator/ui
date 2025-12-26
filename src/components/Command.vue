<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ComboboxRoot,
  ComboboxAnchor,
  ComboboxInput,
  ComboboxPortal,
  ComboboxContent,
  ComboboxViewport,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
  ComboboxEmpty
} from 'reka-ui'
import theme from '@/themes/command'
import Icon from '@/components/Icon.vue'

export interface CommandItem {
  label: string
  value: string
  icon?: string
  shortcut?: string
  disabled?: boolean
  onSelect?: () => void
}

export interface CommandGroup {
  heading?: string
  items: CommandItem[]
}

export interface CommandProps {
  groups?: CommandGroup[]
  placeholder?: string
  empty?: string
  modelValue?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<CommandProps>(), {
  placeholder: 'Type a command or search...',
  empty: 'No results found.',
  modelValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  select: [item: CommandItem]
}>()

const searchQuery = ref('')

const ui = computed(() => theme())

const handleSelect = (item: CommandItem) => {
  if (!item.disabled) {
    item.onSelect?.()
    emit('select', item)
    emit('update:modelValue', item.value)
  }
}
</script>

<template>
  <ComboboxRoot
    v-model="searchQuery"
    :class="ui.root({ class: props.ui?.root })"
  >
    <ComboboxAnchor :class="ui.anchor({ class: props.ui?.anchor })">
      <Icon
        name="solar:minimalistic-magnifer-linear"
        :class="ui.searchIcon({ class: props.ui?.searchIcon })"
      />
      <ComboboxInput
        :class="ui.input({ class: props.ui?.input })"
        :placeholder="placeholder"
        aria-label="Command input"
      />
    </ComboboxAnchor>

    <ComboboxPortal>
      <ComboboxContent :class="ui.content({ class: props.ui?.content })">
        <ComboboxViewport :class="ui.viewport({ class: props.ui?.viewport })">
          <slot>
            <template v-if="groups">
              <template v-for="(group, groupIndex) in groups" :key="groupIndex">
                <ComboboxSeparator
                  v-if="groupIndex > 0"
                  :class="ui.separator({ class: props.ui?.separator })"
                />

                <ComboboxGroup>
                  <ComboboxLabel
                    v-if="group.heading"
                    :class="ui.groupLabel({ class: props.ui?.groupLabel })"
                  >
                    {{ group.heading }}
                  </ComboboxLabel>

                  <ComboboxItem
                    v-for="item in group.items"
                    :key="item.value"
                    :value="item.value"
                    :disabled="item.disabled"
                    :class="ui.item({ class: props.ui?.item })"
                    @select="() => handleSelect(item)"
                  >
                    <Icon
                      v-if="item.icon"
                      :name="item.icon"
                      :class="ui.itemIcon({ class: props.ui?.itemIcon })"
                    />
                    <span :class="ui.itemLabel({ class: props.ui?.itemLabel })">
                      {{ item.label }}
                    </span>
                    <span
                      v-if="item.shortcut"
                      :class="
                        ui.itemShortcut({ class: props.ui?.itemShortcut })
                      "
                    >
                      {{ item.shortcut }}
                    </span>
                  </ComboboxItem>
                </ComboboxGroup>
              </template>
            </template>
          </slot>

          <ComboboxEmpty :class="ui.empty({ class: props.ui?.empty })">
            {{ empty }}
          </ComboboxEmpty>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>
