# Cartino UI - Theming System

Complete theming system for Vue UI components using **tailwind-variants** with full TypeScript support and a semantic color system based on #0e5bff.

## File

- `*.js` - Definizioni theme per ogni componente
- `index.js` - Export centrale di tutti i theme
- `_template.js` - Template per creare nuovi theme

## Anatomia di un Theme

Un theme definisce gli stili di un componente in modo dichiarativo:

```js
import { tv } from 'tailwind-variants'

export default tv({
  // 1. SLOTS - Parti del componente
  slots: {
    root: 'w-full',
    label: 'block font-medium',
    input: 'px-4 py-2'
  },

  // 2. VARIANTS - Opzioni di stile
  variants: {
    size: {
      sm: { input: 'px-3 py-1.5 text-sm' },
      md: { input: 'px-4 py-2 text-base' },
      lg: { input: 'px-5 py-3 text-lg' }
    }
  },

  // 3. COMPOUND VARIANTS - Combinazioni complesse
  compoundVariants: [
    {
      variant: 'outline',
      color: 'primary',
      focused: true,
      class: { input: 'border-blue-500 ring-2 ring-blue-100' }
    }
  ],

  // 4. DEFAULT VARIANTS
  defaultVariants: {
    size: 'md'
  }
})
```

## Utilizzo nei Componenti

### 1. Importa il theme

```vue
<script setup>
import inputTheme from '../themes/input'
```

### 2. Crea computed per le classi

```vue
const ui = computed(() => inputTheme({ size: props.size, variant: props.variant,
focused: isFocused.value }))
```

### 3. Applica nel template

```vue
<template>
  <div :class="ui.root()">
    <label :class="ui.label()">Label</label>
    <input :class="ui.input()" />
  </div>
</template>
```

### 4. Permetti personalizzazione

```vue
<template>
  <div :class="ui.root({ class: props.ui?.root })">
    <label :class="ui.label({ class: props.ui?.label })"></label>
  </div>
</template>
```

Uso:

```vue
<Input :ui="{ root: 'my-custom-class', label: 'text-red-500' }" />
```

## Best Practices

### 1. Naming degli Slots

Usa nomi descrittivi che rappresentano la funzione dell'elemento:

✅ **BUONO**

```js
slots: {
  root: '...',
  wrapper: '...',
  label: '...',
  input: '...',
  hint: '...'
}
```

❌ **CATTIVO**

```js
slots: {
  div1: '...',
  div2: '...',
  text1: '...'
}
```

### 2. Variants Comuni

Mantieni coerenza tra componenti usando le stesse variants:

```js
// Tutti i componenti dovrebbero avere:
variants: {
  size: { sm, md, lg },
  color: { primary, success, warning, error },
  variant: { outline, filled, ghost }
}
```

### 3. Compound Variants per Logica Complessa

Usa `compoundVariants` invece di creare variants troppo specifiche:

✅ **BUONO**

```js
compoundVariants: [
  {
    variant: 'outline',
    color: 'primary',
    focused: true,
    class: { wrapper: 'border-blue-500 ring-2' }
  }
]
```

❌ **CATTIVO**

```js
variants: {
  outlinePrimaryFocused: { ... },
  outlinePrimaryNotFocused: { ... },
  // troppo verbose!
}
```

### 4. Classi Base negli Slots

Le classi che sono sempre presenti vanno negli slots:

```js
slots: {
  input: 'outline-none bg-transparent', // sempre applicato
}
```

### 5. Default Variants Espliciti

Specifica sempre i default:

```js
defaultVariants: {
  size: 'md',
  variant: 'outline',
  color: 'primary',
  disabled: false
}
```

## Esempi Completi

### Esempio 1: Button Theme

```js
export default tv({
  slots: {
    root: 'inline-flex items-center justify-center font-medium transition-colors',
    icon: 'shrink-0'
  },
  variants: {
    size: {
      sm: { root: 'h-8 px-3 text-sm gap-1.5', icon: 'w-4 h-4' },
      md: { root: 'h-10 px-4 text-base gap-2', icon: 'w-5 h-5' },
      lg: { root: 'h-12 px-6 text-lg gap-2.5', icon: 'w-6 h-6' }
    },
    variant: {
      solid: { root: 'shadow-sm' },
      outline: { root: 'border-2 bg-transparent' },
      ghost: { root: 'hover:bg-gray-100' }
    },
    color: {
      primary: {},
      danger: {}
    }
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'primary',
      class: { root: 'bg-blue-600 text-white hover:bg-blue-700' }
    },
    {
      variant: 'outline',
      color: 'primary',
      class: { root: 'border-blue-600 text-blue-600 hover:bg-blue-50' }
    }
  ],
  defaultVariants: {
    size: 'md',
    variant: 'solid',
    color: 'primary'
  }
})
```

### Esempio 2: Card Theme

```js
export default tv({
  slots: {
    root: 'rounded-lg overflow-hidden',
    header: 'border-b',
    body: '',
    footer: 'border-t'
  },
  variants: {
    variant: {
      elevated: {
        root: 'shadow-lg',
        header: 'px-6 py-4',
        body: 'px-6 py-4',
        footer: 'px-6 py-4'
      },
      outlined: {
        root: 'border',
        header: 'px-4 py-3',
        body: 'px-4 py-3',
        footer: 'px-4 py-3'
      }
    }
  },
  defaultVariants: {
    variant: 'elevated'
  }
})
```

## Creare un Nuovo Theme

1. **Copia il template**: `cp _template.js mycomponent.js`
2. **Definisci gli slots**: analizza il componente e identifica tutti gli elementi HTML
3. **Aggiungi le variants**: size, color, variant, stati (focused, disabled, etc.)
4. **Usa compound variants**: per logica condizionale complessa
5. **Testa**: crea storie Storybook per tutte le combinazioni
6. **Esporta**: aggiungi in `index.js`

## Debug

Per vedere le classi generate:

```js
const ui = inputTheme({ size: 'lg', variant: 'outline' })
console.log(ui.root()) // Mostra le classi finali
```

## Riferimenti

- [Tailwind Variants Docs](https://www.tailwind-variants.org/)
- [NuxtUI v4 Theme System](https://ui.nuxt.com/docs/getting-started/theme/components)
