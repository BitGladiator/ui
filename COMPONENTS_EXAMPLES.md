# Esempi Componenti

Esempi di utilizzo dei componenti creati con il sistema di themes.

## User Component

Il componente User mostra informazioni utente con avatar, nome e descrizione.

### Esempio Base

```vue
<User
  name="Mario Rossi"
  description="Developer"
  :avatar="{ text: 'MR' }"
/>
```

### Con Link

```vue
<User
  name="Mario Rossi"
  description="Developer"
  :avatar="{ text: 'MR' }"
  to="/users/mario"
/>
```

### Orientazione Verticale

```vue
<User
  name="Mario Rossi"
  description="Developer"
  :avatar="{ text: 'MR' }"
  orientation="vertical"
  size="lg"
/>
```

### Con Slot Personalizzati

```vue
<User :avatar="{ text: 'MR' }">
  <template #name>
    <span class="text-blue-600">Mario Rossi</span>
  </template>
  <template #description>
    <span class="italic">Full Stack Developer</span>
  </template>
</User>
```

### Personalizzazione Stile

```vue
<User
  name="Mario Rossi"
  description="Developer"
  :avatar="{ text: 'MR' }"
  :ui="{
    root: 'p-4 bg-gray-50 rounded-lg',
    name: 'text-purple-600',
    description: 'text-gray-400'
  }"
/>
```

### Props

| Prop | Type | Default | Descrizione |
|------|------|---------|-------------|
| `as` | String/Object | `'div'` | Elemento da renderizzare |
| `name` | String | - | Nome utente |
| `description` | String | - | Descrizione/ruolo |
| `avatar` | Object | - | Configurazione avatar |
| `size` | String | `'md'` | Dimensione: `3xs`, `2xs`, `xs`, `sm`, `md`, `lg` |
| `orientation` | String | `'horizontal'` | Layout: `horizontal`, `vertical` |
| `to` | String/Object | - | URL di navigazione |
| `target` | String | - | Target del link |
| `onClick` | Function | - | Callback click |
| `ui` | Object | `{}` | Personalizzazione classi |

### Slots

- `avatar` - Avatar personalizzato
- `name` - Nome personalizzato
- `description` - Descrizione personalizzata
- `default` - Contenuto completo (sostituisce name e description)

---

## PageHeader Component

Il componente PageHeader mostra l'intestazione di una pagina con titolo, descrizione e azioni.

### Esempio Base

```vue
<PageHeader
  title="Dashboard"
  description="Panoramica delle tue attività"
/>
```

### Con Headline

```vue
<PageHeader
  headline="Benvenuto"
  title="Dashboard"
  description="Panoramica delle tue attività"
/>
```

### Con Links/Buttons

```vue
<PageHeader
  title="Progetti"
  description="Gestisci i tuoi progetti"
  :links="[
    { label: 'Nuovo Progetto', icon: 'i-heroicons-plus', to: '/projects/new' },
    { label: 'Impostazioni', icon: 'i-heroicons-cog', variant: 'ghost' }
  ]"
/>
```

### Con Slot Personalizzati

```vue
<PageHeader>
  <template #headline>
    <span class="flex items-center gap-2">
      <Icon name="i-heroicons-star" />
      Featured
    </span>
  </template>

  <template #title>
    <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      Welcome to Dashboard
    </span>
  </template>

  <template #description>
    Manage your projects and team
  </template>

  <template #links>
    <Button variant="solid" color="primary">Get Started</Button>
    <Button variant="outline">Learn More</Button>
  </template>
</PageHeader>
```

### Personalizzazione Stile

```vue
<PageHeader
  title="Dashboard"
  description="Your overview"
  :ui="{
    root: 'border-b-2 border-blue-500',
    title: 'text-blue-600',
    description: 'text-sm'
  }"
/>
```

### Props

| Prop | Type | Default | Descrizione |
|------|------|---------|-------------|
| `as` | String/Object | `'div'` | Elemento da renderizzare |
| `headline` | String | - | Testo sopra il titolo |
| `title` | String | - | Titolo principale |
| `description` | String | - | Descrizione |
| `links` | Array | `[]` | Array di props per UButton |
| `ui` | Object | `{}` | Personalizzazione classi |

### Slots

- `headline` - Headline personalizzato
- `title` - Titolo personalizzato
- `description` - Descrizione personalizzata
- `links` - Bottoni/links personalizzati
- `default` - Contenuto aggiuntivo sotto la descrizione

---

## Input Component

Il componente Input è un campo di input con label, hint ed errori.

### Esempio Base

```vue
<Input
  label="Email"
  placeholder="mario@example.com"
  v-model="email"
/>
```

### Con Icone

```vue
<Input
  label="Search"
  placeholder="Cerca..."
  leading-icon="🔍"
  v-model="search"
/>

<Input
  label="Password"
  type="password"
  trailing-icon="👁️"
  v-model="password"
/>
```

### Con Errore

```vue
<Input
  label="Email"
  v-model="email"
  error="Email non valida"
/>
```

### Con Hint

```vue
<Input
  label="Username"
  v-model="username"
  hint="Minimo 3 caratteri"
/>
```

### Varianti e Dimensioni

```vue
<!-- Outline (default) -->
<Input variant="outline" v-model="value" />

<!-- Filled -->
<Input variant="filled" v-model="value" />

<!-- Ghost -->
<Input variant="ghost" v-model="value" />

<!-- Sizes -->
<Input size="sm" v-model="value" />
<Input size="md" v-model="value" />
<Input size="lg" v-model="value" />
```

---

## Banner Component

Il componente Banner mostra notifiche dismissibili in cima alla pagina.

### Esempio Base

```vue
<Banner
  title="Nuova versione disponibile!"
  close
/>
```

### Con Icona e Azioni

```vue
<Banner
  icon="i-heroicons-megaphone"
  title="Manutenzione programmata"
  :actions="[
    { label: 'Dettagli', size: 'xs' }
  ]"
  close
  color="warning"
/>
```

### Con Link

```vue
<Banner
  title="Scopri le nuove funzionalità"
  to="/features"
  color="primary"
  close
/>
```

### Colori

```vue
<Banner title="Info" color="primary" close />
<Banner title="Successo" color="success" close />
<Banner title="Attenzione" color="warning" close />
<Banner title="Errore" color="error" close />
<Banner title="Neutrale" color="neutral" close />
```

---

## Best Practices

### 1. Usa v-model per Input

```vue
<Input v-model="email" label="Email" />
```

### 2. Personalizza con UI prop

```vue
<User
  name="Mario"
  :ui="{ name: 'text-lg font-bold' }"
/>
```

### 3. Usa Slots per Contenuto Complesso

```vue
<PageHeader>
  <template #title>
    <div class="flex items-center gap-2">
      <Icon name="..." />
      <span>Custom Title</span>
    </div>
  </template>
</PageHeader>
```

### 4. Combina Componenti

```vue
<PageHeader title="Team">
  <template #description>
    <div class="flex items-center gap-4 mt-2">
      <User
        v-for="user in team"
        :key="user.id"
        v-bind="user"
        size="sm"
      />
    </div>
  </template>
</PageHeader>
```
