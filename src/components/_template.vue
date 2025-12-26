<script setup>
/**
 * Template per creare un nuovo componente Vue
 *
 * 1. Copia questo file e rinominalo (es: MyComponent.vue)
 * 2. Crea il theme corrispondente in src/themes/
 * 3. Definisci le props necessarie
 * 4. Importa il theme e crea il computed `ui`
 * 5. Nel template usa ui.slotName() per applicare le classi
 */

import { computed } from 'vue'
import componentTheme from '@/themes/component' // Cambia con il tuo theme

const props = defineProps({
  // Props base per variants
  size: {
    type: String,
    default: 'md'
  },
  color: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  },

  // Props per contenuto
  label: {
    type: String,
    default: undefined
  },

  // Prop per personalizzazione esterna
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits([
  'click'
  // ... altri eventi
])

const slots = defineSlots()

// Genera le classi CSS dal theme
const ui = computed(() =>
  componentTheme({
    size: props.size,
    color: props.color,
    disabled: props.disabled
    // ... altre variants
  })
)

// Funzioni del componente
const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <!-- Root element con classe dal theme -->
  <div :class="ui.root({ class: props.ui?.root })" @click="handleClick">
    <!-- Altri elementi con le rispettive classi -->
    <div v-if="label" :class="ui.element1({ class: props.ui?.element1 })">
      {{ label }}
    </div>

    <!-- Slots per contenuto personalizzato -->
    <slot />
  </div>
</template>
