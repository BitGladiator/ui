# @cartino/ui

Una libreria di componenti UI costruita con Vue 3, Tailwind CSS e Reka UI.

## Installazione

```bash
pnpm add @cartino/ui
```

## Setup

### Opzione 1: Installazione globale (consigliata)

Nella tua applicazione Vue, importa gli stili e registra i componenti globalmente:

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { install } from '@cartino/ui'
import '@cartino/ui/style.css'

const app = createApp(App)
app.use({ install })
app.mount('#app')
```

### Opzione 2: Import dei singoli componenti

Puoi anche importare i componenti individualmente:

```vue
<script setup lang="ts">
import { Accordion, Alert, Button, Dialog } from '@cartino/ui'
import '@cartino/ui/style.css'
</script>

<template>
  <Button variant="primary">Click me</Button>

  <Alert
    color="success"
    title="Success!"
    description="Your changes have been saved."
    closable
  />

  <Dialog v-model:open="isOpen">
    <template #trigger>
      <Button>Open Dialog</Button>
    </template>
    <template #title>Dialog Title</template>
    Content here
  </Dialog>

  <Accordion
    :items="[
      { label: 'Question 1', content: 'Answer 1' },
      { label: 'Question 2', content: 'Answer 2' }
    ]"
  />
</template>
```

## Componenti Disponibili

### Accordion

Un componente accordion/fisarmonica costruito su Reka UI con supporto per singolo o multiplo aperto.

**Props:**

- `items`: `AccordionItem[]` (required) - Array di elementi accordion
- `type`: `'single' | 'multiple'` (default: `'single'`)
- `collapsible`: `boolean` (default: `true`)
- `variant`: `'default' | 'bordered' | 'separated'` (default: `'default'`)
- `disabled`: `boolean` (default: `false`)

**Tipo AccordionItem:**

```ts
{
  label?: string
  content?: string
  value?: string
  disabled?: boolean
  icon?: string
}
```

**Esempio:**

```vue
<Accordion
  variant="separated"
  :items="[
    { label: 'Domanda 1', content: 'Risposta 1', icon: '📦' },
    { label: 'Domanda 2', content: 'Risposta 2', icon: '⚙️' }
  ]"
/>
```

### Alert

Un componente alert/notifica per mostrare messaggi importanti agli utenti.

**Props:**

- `title`: `string` (optional) - Titolo dell'alert
- `description`: `string` (optional) - Descrizione dell'alert
- `icon`: `string` (optional) - Icona custom (emoji o carattere)
- `color`: `'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'` (default: `'primary'`)
- `variant`: `'solid' | 'soft' | 'outline'` (default: `'soft'`)
- `closable`: `boolean` (default: `false`) - Mostra bottone di chiusura
- `actions`: `Array<{ label: string, variant?: string, onClick?: () => void }>` (optional)

**Eventi:**

- `close` - Emesso quando l'utente chiude l'alert

**Esempio:**

```vue
<Alert
  color="warning"
  variant="soft"
  title="Attenzione"
  description="Controlla i tuoi dati prima di procedere."
  closable
  :actions="[
    { label: 'Annulla', variant: 'ghost' },
    { label: 'Continua', variant: 'primary' }
  ]"
  @close="handleClose"
/>
```

### Button

Un componente bottone versatile con diverse varianti e dimensioni.

**Props:**

- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `disabled`: `boolean` (default: `false`)
- `type`: `'button' | 'submit' | 'reset'` (default: `'button'`)

**Esempio:**

```vue
<Button variant="primary" size="lg">Click me</Button>
```

### Dialog

Un componente dialog/modal costruito su Reka UI.

**Props:**

- `open`: `boolean` (v-model supportato)
- `defaultOpen`: `boolean`

**Slots:**

- `trigger`: Il contenuto che attiva il dialog
- `title`: Il titolo del dialog
- `description`: La descrizione del dialog
- default: Il contenuto principale

**Esempio:**

```vue
<Dialog v-model:open="isOpen">
  <template #trigger>
    <Button>Open</Button>
  </template>
  <template #title>My Dialog</template>
  <template #description>Dialog description</template>
  Dialog content
</Dialog>
```

### Toast & Toaster

Sistema di notifiche toast con supporto per stacking, animazioni e posizionamento flessibile.

**Setup (richiesto):**

Aggiungi il componente `Toaster` una sola volta nel tuo layout principale (App.vue o layout root):

```vue
<template>
  <div>
    <!-- Your app content -->
    <RouterView />

    <!-- Add Toaster once at the root level -->
    <Toaster position="bottom-right" />
  </div>
</template>

<script setup>
import { Toaster } from '@cartino/ui'
</script>
```

**Toaster Props:**

- `position`: `'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'` (default: `'bottom-right'`)
- `expand`: `boolean` (default: `true`) - Espande i toast al passaggio del mouse
- `max`: `number` (default: `5`) - Numero massimo di toast visibili
- `duration`: `number` (default: `5000`) - Durata di default in millisecondi

**Uso nei componenti:**

```vue
<template>
  <Button @click="showToast">Show Toast</Button>
</template>

<script setup>
import { useToast } from '@cartino/ui'

const toast = useToast()

const showToast = () => {
  toast.success('Success!', 'Your changes have been saved.')
}

// Async example with loading state
const handleSave = async () => {
  const loadingToast = toast.toast({
    title: 'Saving...',
    description: 'Please wait...',
    close: false,
    duration: 0
  })

  try {
    await saveData()
    toast.remove(loadingToast.id)
    toast.success('Saved!', 'Changes saved successfully.')
  } catch (error) {
    toast.remove(loadingToast.id)
    toast.error('Error', 'Failed to save changes.')
  }
}
</script>
```

**Metodi disponibili:**

```ts
const toast = useToast()

// Shorthand methods
toast.success(title, description, options?)
toast.error(title, description, options?)
toast.warning(title, description, options?)
toast.info(title, description, options?)

// Full control
toast.toast({
  title: string
  description?: string
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  icon?: string
  duration?: number  // 0 = infinite
  close?: boolean    // Show close button
  actions?: Array<{
    label: string
    onClick: () => void
    variant?: string
    tone?: string
  }>
  onClick?: () => void
})

// Management methods
toast.remove(id)       // Remove specific toast
toast.update(id, data) // Update toast content
toast.clear()          // Remove all toasts
```

**Toast con azioni:**

```vue
<script setup>
const handleDelete = () => {
  toast.toast({
    title: 'Are you sure?',
    description: 'This action cannot be undone.',
    color: 'warning',
    duration: 0,
    actions: [
      {
        label: 'Cancel',
        onClick: () => console.log('Cancelled'),
        variant: 'tertiary'
      },
      {
        label: 'Delete',
        onClick: () => {
          // Perform delete
          toast.success('Deleted', 'Item removed successfully')
        },
        variant: 'primary',
        tone: 'critical'
      }
    ]
  })
}
</script>
```

**Exports disponibili:**

```ts
// Components
import { Toast, Toaster } from '@cartino/ui'

// Composable
import { useToast } from '@cartino/ui'

// Types
import type {
  ToastProps,
  ToasterProps,
  ToastItem,
  ToastOptions,
  UseToastReturn
} from '@cartino/ui'

// Advanced: injection key for provide/inject
import { toastMaxInjectionKey } from '@cartino/ui'
```

## Sviluppo

```bash
# Installa le dipendenze
pnpm install

# Avvia Storybook (preview e documentazione)
pnpm dev

# Build della libreria
pnpm build

# Build di Storybook per deployment
pnpm build-storybook
```

## Struttura del progetto

```
src/
  ├── components/          # Componenti UI
  │   ├── Button.vue
  │   ├── Button.stories.ts
  │   ├── Dialog.vue
  │   └── Dialog.stories.ts
  ├── stories/             # Documentazione Storybook
  ├── index.ts             # Entry point della libreria
  └── style.css            # Stili Tailwind CSS v4
```

## Tecnologie

- **Vue 3** - Framework JavaScript progressivo
- **Vite** - Build tool ultra-veloce
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework (CSS-based config)
- **Reka UI** - Headless UI components accessibili
- **Storybook** - Preview e documentazione componenti

## License

MIT
