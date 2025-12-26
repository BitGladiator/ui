# Sistema di Temi con Tailwind Variants

Questo progetto utilizza [tailwind-variants](https://www.tailwind-variants.org/) per separare la logica di stile dai componenti Vue.

## Struttura

```
src/
├── components/          # Componenti Vue (solo HTML e logica)
│   ├── Input.vue
│   ├── Banner.vue
│   └── ...
└── themes/             # Definizioni degli stili con tailwind-variants
    ├── input.js
    ├── banner.js
    └── index.js
```

## Come Funziona

### 1. Definizione del Theme (themes/)

I theme sono definiti usando `tv()` di tailwind-variants con:
- **slots**: diverse parti del componente (root, wrapper, label, etc.)
- **variants**: varianti di stile (size, color, variant, etc.)
- **compoundVariants**: stili condizionali complessi
- **defaultVariants**: valori di default

Esempio `themes/input.js`:

```js
import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root: 'w-full',
    label: 'block mb-1.5 font-medium text-gray-700',
    wrapper: 'relative flex items-center transition-all',
    input: 'flex-1 outline-none bg-transparent',
    // ... altri slots
  },
  variants: {
    size: {
      sm: { input: 'px-3 py-1.5', label: 'text-xs' },
      md: { input: 'px-4 py-2', label: 'text-sm' },
      lg: { input: 'px-5 py-3', label: 'text-base' }
    },
    variant: {
      outline: { wrapper: 'border rounded-lg bg-white' },
      filled: { wrapper: 'border-0 rounded-lg' },
      ghost: { wrapper: 'border-0' }
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline'
  }
})
```

### 2. Utilizzo nel Componente Vue

I componenti importano il theme e lo applicano dinamicamente:

```vue
<script setup>
import { computed } from 'vue'
import inputTheme from '../themes/input'

const props = defineProps({
  size: { type: String, default: 'md' },
  variant: { type: String, default: 'outline' },
  // ... altre props
})

// Genera le classi CSS basate sulle props
const ui = computed(() => inputTheme({
  size: props.size,
  variant: props.variant,
  disabled: props.disabled
}))
</script>

<template>
  <!-- Applica le classi agli elementi -->
  <div :class="ui.root()">
    <label :class="ui.label()">Label</label>
    <div :class="ui.wrapper()">
      <input :class="ui.input()" />
    </div>
  </div>
</template>
```

### 3. Personalizzazione dall'Esterno

Gli utenti possono sovrascrivere gli stili passando classi custom:

```vue
<Input
  :ui="{
    root: 'custom-root-class',
    label: 'custom-label-class'
  }"
/>
```

Nel componente:

```vue
<div :class="ui.root({ class: props.ui?.root })">
```

## Vantaggi

1. **Separazione delle responsabilità**: HTML/logica nei `.vue`, stili nei `.js`
2. **Riusabilità**: gli stessi theme possono essere usati in contesti diversi
3. **Type-safe**: tailwind-variants fornisce autocomplete
4. **Performance**: le classi vengono calcolate solo quando cambiano le props
5. **Personalizzazione**: facile sovrascrivere stili senza modificare i componenti
6. **Manutenibilità**: tutti gli stili in un unico posto per componente

## Aggiungere un Nuovo Theme

1. Crea il file `themes/nomecomponente.js`
2. Definisci slots, variants e defaultVariants
3. Importa il theme nel componente
4. Usa `ui.slotName()` nel template
5. Esporta il theme in `themes/index.js`

## Riferimenti

- [Tailwind Variants Docs](https://www.tailwind-variants.org/docs/introduction)
- [NuxtUI v4 Themes](https://ui.nuxt.com/docs/getting-started/theme/components)
