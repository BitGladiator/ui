# DataTable Component

Il componente **DataTable** è una tabella avanzata basata su **TanStack Vue Table** con funzionalità di sorting, filtering, pagination e selezione righe integrate.

## Differenza tra Table e DataTable

| Feature | Table | DataTable |
|---------|-------|-----------|
| **Base** | HTML nativo | TanStack Table |
| **Sorting** | ❌ Manuale | ✅ Integrato |
| **Filtering** | ❌ Manuale | ✅ Integrato (global + column) |
| **Pagination** | ❌ Manuale | ✅ Integrato |
| **Row Selection** | ⚠️ Semplice | ✅ Avanzata |
| **Column Resizing** | ❌ | ✅ Possibile |
| **Virtualizzazione** | ❌ | ✅ Possibile |
| **Uso** | Tabelle semplici | Tabelle complesse con dati |

## Installazione

Prima installa la dipendenza:

```bash
pnpm install @tanstack/vue-table
```

## Esempio Base

```vue
<script setup>
import { ref } from 'vue'
import { DataTable } from '@cartino/ui'

const columns = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'role',
    header: 'Role'
  }
]

const data = ref([
  { id: 1, name: 'Mario Rossi', email: 'mario@example.com', role: 'Admin' },
  { id: 2, name: 'Luigi Verdi', email: 'luigi@example.com', role: 'User' },
  { id: 3, name: 'Anna Bianchi', email: 'anna@example.com', role: 'Editor' }
])
</script>

<template>
  <DataTable
    :columns="columns"
    :data-source="data"
  />
</template>
```

## Con Ricerca Globale

```vue
<template>
  <DataTable
    :columns="columns"
    :data-source="data"
    searchable
    search-placeholder="Search users..."
  />
</template>
```

## Con Custom Cell Rendering

```vue
<script setup>
const columns = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: () => '' // Usa slot
  }
]
</script>

<template>
  <DataTable
    :columns="columns"
    :data-source="data"
  >
    <!-- Custom Status Cell -->
    <template #cell:status="{ value }">
      <Chip
        :text="value"
        :color="value === 'active' ? 'success' : 'neutral'"
      />
    </template>

    <!-- Custom Actions Cell -->
    <template #cell:actions="{ row }">
      <div class="flex gap-2">
        <Button size="sm" variant="ghost" @click="editUser(row)">
          Edit
        </Button>
        <Button size="sm" variant="ghost" color="error" @click="deleteUser(row)">
          Delete
        </Button>
      </div>
    </template>
  </DataTable>
</template>
```

## Con Sorting

```vue
<template>
  <DataTable
    :columns="columns"
    :data-source="data"
    enable-sorting
  />
</template>
```

Le colonne sono automaticamente sortable. Clicca sull'header per ordinare!

## Con Filtri Personalizzati

```vue
<template>
  <DataTable
    :columns="columns"
    :data-source="data"
    searchable
  >
    <template #actions>
      <Select v-model="roleFilter" placeholder="Filter by role">
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </Select>
    </template>
  </DataTable>
</template>
```

## Con Row Selection

```vue
<script setup>
import { ref } from 'vue'

const selectedRows = ref({})

const handleRowSelect = (selection) => {
  console.log('Selected rows:', selection)
}
</script>

<template>
  <DataTable
    :columns="columns"
    :data-source="data"
    enable-row-selection
    v-model="selectedRows"
    @row:select="handleRowSelect"
  />
</template>
```

## Con Pagination Personalizzata

```vue
<template>
  <DataTable
    :columns="columns"
    :data-source="data"
    enable-pagination
    :page-size="20"
    :page-size-options="[10, 20, 50, 100]"
  />
</template>
```

## Stati Loading ed Empty

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(true)
const data = ref([])

onMounted(async () => {
  loading.value = true
  data.value = await fetchData()
  loading.value = false
})
</script>

<template>
  <DataTable
    :columns="columns"
    :data-source="data"
    :loading="loading"
    empty="No users found. Try adjusting your filters."
  >
    <!-- Custom Loading -->
    <template #loading>
      <div class="py-12 text-center">
        <Spinner size="lg" />
        <p class="mt-4 text-gray-600">Loading users...</p>
      </div>
    </template>

    <!-- Custom Empty State -->
    <template #empty>
      <div class="py-12 text-center">
        <Icon name="i-heroicons-user-group" class="mx-auto size-16 text-gray-400 mb-4" />
        <h3 class="text-lg font-medium mb-2">No users yet</h3>
        <p class="text-gray-600 mb-4">Get started by adding your first user</p>
        <Button @click="openCreateUserModal">Add User</Button>
      </div>
    </template>
  </DataTable>
</template>
```

## Colonne Avanzate

```vue
<script setup>
const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 200, // Larghezza fissa
    enableSorting: true,
    enableColumnFilter: true
  },
  {
    id: 'fullName',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`, // Accessor function
    header: 'Full Name'
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ getValue }) => {
      return new Date(getValue()).toLocaleDateString()
    }
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ getValue }) => {
      return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
      }).format(getValue())
    }
  }
]
</script>
```

## Styling Variants

```vue
<template>
  <!-- Striped -->
  <DataTable
    :columns="columns"
    :data-source="data"
    striped
  />

  <!-- Bordered -->
  <DataTable
    :columns="columns"
    :data-source="data"
    bordered
  />

  <!-- Compact -->
  <DataTable
    :columns="columns"
    :data-source="data"
    compact
  />

  <!-- Sticky Header -->
  <DataTable
    :columns="columns"
    :data-source="data"
    sticky
    class="max-h-[500px]"
  />

  <!-- Combinazione -->
  <DataTable
    :columns="columns"
    :data-source="data"
    striped
    bordered
    compact
  />
</template>
```

## Esempio Completo E-commerce

```vue
<script setup>
import { ref, computed } from 'vue'
import { DataTable, Chip, Button, Avatar } from '@cartino/ui'

const columns = [
  {
    accessorKey: 'product',
    header: 'Product',
    size: 300
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ getValue }) => {
      return `€${getValue().toFixed(2)}`
    }
  },
  {
    accessorKey: 'stock',
    header: 'Stock'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => ''
  }
]

const products = ref([
  {
    id: 1,
    product: 'MacBook Pro 16"',
    category: 'Laptops',
    price: 2499.00,
    stock: 12,
    status: 'in-stock',
    image: '/macbook.jpg'
  },
  {
    id: 2,
    product: 'iPhone 15 Pro',
    category: 'Phones',
    price: 1199.00,
    stock: 0,
    status: 'out-of-stock',
    image: '/iphone.jpg'
  },
  {
    id: 3,
    product: 'AirPods Pro',
    category: 'Audio',
    price: 279.00,
    stock: 45,
    status: 'in-stock',
    image: '/airpods.jpg'
  }
])

const loading = ref(false)
const selectedRows = ref({})

const editProduct = (product) => {
  console.log('Edit:', product)
}

const deleteProduct = (product) => {
  console.log('Delete:', product)
}

const exportSelected = () => {
  console.log('Export:', selectedRows.value)
}
</script>

<template>
  <DataTable
    :columns="columns"
    :data-source="products"
    :loading="loading"
    v-model="selectedRows"
    enable-sorting
    enable-pagination
    enable-row-selection
    searchable
    striped
    search-placeholder="Search products..."
  >
    <!-- Toolbar Actions -->
    <template #actions>
      <Button
        variant="outline"
        :disabled="Object.keys(selectedRows).length === 0"
        @click="exportSelected"
      >
        Export Selected
      </Button>
      <Button variant="solid" color="primary">
        Add Product
      </Button>
    </template>

    <!-- Product Cell with Image -->
    <template #cell:product="{ row }">
      <div class="flex items-center gap-3">
        <Avatar :src="row.image" size="sm" />
        <span class="font-medium">{{ row.product }}</span>
      </div>
    </template>

    <!-- Status Cell with Chip -->
    <template #cell:status="{ value }">
      <Chip
        :text="value === 'in-stock' ? 'In Stock' : 'Out of Stock'"
        :color="value === 'in-stock' ? 'success' : 'error'"
        size="sm"
      />
    </template>

    <!-- Stock Cell with Color -->
    <template #cell:stock="{ value }">
      <span :class="{
        'text-red-600 font-semibold': value === 0,
        'text-yellow-600': value > 0 && value < 10,
        'text-green-600': value >= 10
      }">
        {{ value }}
      </span>
    </template>

    <!-- Actions Cell -->
    <template #cell:actions="{ row }">
      <div class="flex gap-1">
        <Button size="sm" variant="ghost" @click="editProduct(row)">
          Edit
        </Button>
        <Button size="sm" variant="ghost" color="error" @click="deleteProduct(row)">
          Delete
        </Button>
      </div>
    </template>
  </DataTable>
</template>
```

## Props Complete

| Prop | Type | Default | Descrizione |
|------|------|---------|-------------|
| `columns` | Array | **required** | Definizione colonne TanStack |
| `dataSource` | Array | `[]` | Dati della tabella |
| `enableSorting` | Boolean | `true` | Abilita sorting |
| `enableFiltering` | Boolean | `true` | Abilita filtering |
| `enablePagination` | Boolean | `true` | Abilita pagination |
| `enableRowSelection` | Boolean | `false` | Abilita selezione righe |
| `pageSize` | Number | `10` | Righe per pagina |
| `pageSizeOptions` | Array | `[10,20,50,100]` | Opzioni dimensione pagina |
| `searchable` | Boolean | `true` | Mostra barra ricerca |
| `searchPlaceholder` | String | `'Search...'` | Placeholder ricerca |
| `striped` | Boolean | `false` | Righe alternate |
| `bordered` | Boolean | `false` | Bordi celle |
| `compact` | Boolean | `false` | Padding ridotto |
| `hoverable` | Boolean | `true` | Effetto hover righe |
| `sticky` | Boolean | `false` | Header fisso |
| `loading` | Boolean | `false` | Stato loading |
| `empty` | String | `'No data available'` | Messaggio empty state |
| `ui` | Object | `{}` | Override classi theme |

## Events

| Event | Payload | Descrizione |
|-------|---------|-------------|
| `row:click` | `row` | Click su una riga |
| `row:select` | `selection` | Cambio selezione righe |

## Slots

| Slot | Props | Descrizione |
|------|-------|-------------|
| `toolbar` | - | Toolbar completa |
| `actions` | - | Azioni toolbar |
| `header:{columnId}` | `header`, `column` | Header colonna custom |
| `cell:{columnId}` | `cell`, `row`, `value` | Cella custom |
| `loading` | - | Stato loading custom |
| `empty` | - | Empty state custom |
| `pagination` | `table` | Pagination custom |

## TanStack Table Features

DataTable supporta tutte le feature di TanStack Table v8:

- ✅ Sorting (multi-column)
- ✅ Filtering (global + per colonna)
- ✅ Pagination
- ✅ Row Selection
- ✅ Column Visibility
- ✅ Column Ordering
- ✅ Column Pinning
- ✅ Column Resizing (con plugin)
- ✅ Grouping
- ✅ Expanding
- ✅ Virtualizzazione (con @tanstack/vue-virtual)

Per features avanzate, consulta la [documentazione TanStack Table](https://tanstack.com/table/v8/docs/guide/introduction).
