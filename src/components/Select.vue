<script setup lang="ts">
import { computed } from 'vue'
import {
  SelectRoot,
  SelectTrigger,
  SelectPortal,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectItemText,
  SelectItemIndicator
} from 'reka-ui'
import theme from '@/themes/select'
import Icon from './Icon.vue'

export interface SelectOption {
  label: string
  value: string | number
  icon?: string
  disabled?: boolean
  description?: string
}

export interface SelectGroup {
  label?: string
  type?: 'label'
  options: SelectOption[]
}

export interface SelectProps {
  modelValue?: string | number
  options?: (SelectOption | string | number | SelectGroup)[]
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'filled' | 'ghost' | 'soft' | 'none'
  color?: 'primary' | 'error' | 'success' | 'warning' | 'info'
  trailingIcon?: string
  selectedIcon?: string
  valueKey?: string
  labelKey?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<SelectProps>(), {
  size: 'md',
  variant: 'outline',
  color: 'primary',
  trailingIcon: 'solar:alt-arrow-down-linear',
  selectedIcon: 'solar:check-circle-linear',
  valueKey: 'value',
  labelKey: 'label',
  placeholder: 'Select...'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | undefined]
  change: [option: SelectOption]
}>()

const selectTheme = computed(() =>
  theme({
    size: props.size,
    variant: props.variant,
    color: props.color,
    disabled: props.disabled
  })
)

const hasGroups = computed(() => {
  return (
    Array.isArray(props.options) &&
    props.options.some((opt) => typeof opt === 'object' && 'options' in opt)
  )
})

const normalizedOptions = computed(() => {
  if (!props.options) return []
  if (hasGroups.value) {
    // Grouped options
    return props.options.map((group: any) => {
      if (typeof group === 'object' && 'options' in group) {
        return {
          label: group.label,
          type: group.type || 'label',
          options: group.options.map((option: any) =>
            typeof option === 'string' || typeof option === 'number'
              ? { label: String(option), value: option }
              : option
          )
        }
      }
      // fallback for non-grouped
      return { label: undefined, options: [group] }
    })
  }
  // Flat options
  return props.options.map((option: any) =>
    typeof option === 'string' || typeof option === 'number'
      ? { label: String(option), value: option }
      : option
  )
})

const getOptionValue = (option: SelectOption) => {
  return option[props.valueKey as keyof SelectOption] || option.value
}

const getOptionLabel = (option: SelectOption) => {
  return option[props.labelKey as keyof SelectOption] || option.label
}

const selectedLabel = computed(() => {
  if (!props.modelValue && props.modelValue !== 0) return ''

  if (hasGroups.value) {
    for (const group of normalizedOptions.value as any[]) {
      const found = group.options.find(
        (opt: any) => String(getOptionValue(opt)) === String(props.modelValue)
      )
      if (found) return getOptionLabel(found)
    }
    return ''
  }
  const found = (normalizedOptions.value as SelectOption[]).find(
    (opt: any) => String(getOptionValue(opt)) === String(props.modelValue)
  )
  return found ? getOptionLabel(found) : ''
})

function onValueChange(value: string) {
  // Convert string back to original type if needed
  const convertedValue =
    props.modelValue !== undefined && typeof props.modelValue === 'number'
      ? Number(value)
      : value

  emit('update:modelValue', convertedValue)

  // Find the option to emit change event
  let option: SelectOption | undefined
  if (hasGroups.value) {
    for (const group of normalizedOptions.value as any[]) {
      option = group.options.find(
        (opt: any) => String(getOptionValue(opt)) === value
      )
      if (option) break
    }
  } else {
    option = (normalizedOptions.value as SelectOption[]).find(
      (opt: any) => String(getOptionValue(opt)) === value
    )
  }

  if (option) {
    emit('change', option)
  }
}
</script>

<template>
  <SelectRoot
    :model-value="props.modelValue ? String(props.modelValue) : undefined"
    :disabled="props.disabled"
    @update:model-value="onValueChange"
  >
    <SelectTrigger
      :class="selectTheme.base({ class: props.ui?.base })"
      v-bind="$attrs"
    >
      <span
        v-if="selectedLabel"
        :class="selectTheme.value({ class: props.ui?.value })"
      >
        {{ selectedLabel }}
      </span>
      <span
        v-else
        :class="selectTheme.placeholder({ class: props.ui?.placeholder })"
      >
        {{ props.placeholder }}
      </span>

      <span :class="selectTheme.trailing({ class: props.ui?.trailing })">
        <Icon
          :name="props.trailingIcon"
          :class="selectTheme.trailingIcon({ class: props.ui?.trailingIcon })"
        />
      </span>
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        :class="selectTheme.content({ class: props.ui?.content })"
        position="popper"
        :side-offset="4"
      >
        <div :class="selectTheme.viewport({ class: props.ui?.viewport })">
          <template v-if="hasGroups">
            <SelectGroup
              v-for="(group, groupIdx) in normalizedOptions"
              :key="groupIdx"
              :class="selectTheme.group({ class: props.ui?.group })"
            >
              <template v-if="group.options && group.options.length">
                <SelectLabel
                  v-if="group.label"
                  :class="selectTheme.label({ class: props.ui?.label })"
                >
                  {{ group.label }}
                </SelectLabel>
                <SelectItem
                  v-for="option in group.options"
                  :key="String(getOptionValue(option))"
                  :value="String(getOptionValue(option))"
                  :disabled="option.disabled"
                  :class="selectTheme.item({ class: props.ui?.item })"
                >
                  <Icon
                    v-if="option.icon"
                    :name="option.icon"
                    :class="
                      selectTheme.itemLeadingIcon({
                        class: props.ui?.itemLeadingIcon
                      })
                    "
                  />

                  <span
                    :class="
                      selectTheme.itemWrapper({ class: props.ui?.itemWrapper })
                    "
                  >
                    <SelectItemText
                      :class="
                        selectTheme.itemLabel({ class: props.ui?.itemLabel })
                      "
                    >
                      {{ getOptionLabel(option) }}
                    </SelectItemText>

                    <span
                      v-if="option.description"
                      :class="
                        selectTheme.itemDescription({
                          class: props.ui?.itemDescription
                        })
                      "
                    >
                      {{ option.description }}
                    </span>
                  </span>

                  <span
                    :class="
                      selectTheme.itemTrailing({
                        class: props.ui?.itemTrailing
                      })
                    "
                  >
                    <SelectItemIndicator as-child>
                      <Icon
                        :name="props.selectedIcon"
                        :class="
                          selectTheme.itemTrailingIcon({
                            class: props.ui?.itemTrailingIcon
                          })
                        "
                      />
                    </SelectItemIndicator>
                  </span>
                </SelectItem>
              </template>

              <SelectSeparator
                v-if="groupIdx < normalizedOptions.length - 1"
                :class="selectTheme.separator({ class: props.ui?.separator })"
              />
            </SelectGroup>
          </template>
          <template v-else>
            <SelectGroup :class="selectTheme.group({ class: props.ui?.group })">
              <SelectItem
                v-for="option in normalizedOptions"
                :key="String(getOptionValue(option))"
                :value="String(getOptionValue(option))"
                :disabled="option.disabled"
                :class="selectTheme.item({ class: props.ui?.item })"
              >
                <Icon
                  v-if="option.icon"
                  :name="option.icon"
                  :class="
                    selectTheme.itemLeadingIcon({
                      class: props.ui?.itemLeadingIcon
                    })
                  "
                />

                <span
                  :class="
                    selectTheme.itemWrapper({ class: props.ui?.itemWrapper })
                  "
                >
                  <SelectItemText
                    :class="
                      selectTheme.itemLabel({ class: props.ui?.itemLabel })
                    "
                  >
                    {{ getOptionLabel(option) }}
                  </SelectItemText>

                  <span
                    v-if="option.description"
                    :class="
                      selectTheme.itemDescription({
                        class: props.ui?.itemDescription
                      })
                    "
                  >
                    {{ option.description }}
                  </span>
                </span>

                <span
                  :class="
                    selectTheme.itemTrailing({ class: props.ui?.itemTrailing })
                  "
                >
                  <SelectItemIndicator as-child>
                    <Icon
                      :name="props.selectedIcon"
                      :class="
                        selectTheme.itemTrailingIcon({
                          class: props.ui?.itemTrailingIcon
                        })
                      "
                    />
                  </SelectItemIndicator>
                </span>
              </SelectItem>
            </SelectGroup>
          </template>
        </div>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
