export interface NavigationItem {
  label: string
  icon?: string
  url?: string
  href?: string
  to?: string
  children?: NavigationItem[]
  active?: boolean
  disabled?: boolean
  badge?: string | number
  tooltip?: boolean | string
  defaultOpen?: boolean
  onClick?: (e: Event) => void
  class?: string
}

export const navigationData: NavigationItem[] = [
  {
    label: 'Dashboard',
    icon: 'solar:home-2-linear',
    to: '/dashboard',
    active: true
  },
  {
    label: 'Products',
    icon: 'solar:box-minimalistic-linear',
    children: [
      {
        label: 'All Products',
        to: '/products',
        icon: 'solar:box-minimalistic-linear'
      },
      {
        label: 'Categories',
        to: '/products/categories',
        icon: 'solar:folder-2-linear',
        children: [
          {
            label: 'Electronics',
            to: '/products/categories/electronics',
            icon: 'solar:laptop-linear'
          },
          {
            label: 'Clothing',
            to: '/products/categories/clothing',
            icon: 'solar:t-shirt-linear'
          },
          {
            label: 'Books',
            to: '/products/categories/books',
            icon: 'solar:book-linear'
          }
        ]
      },
      {
        label: 'Inventory',
        to: '/products/inventory',
        icon: 'solar:clipboard-list-linear'
      }
    ]
  },
  {
    label: 'Orders',
    icon: 'solar:bag-2-linear',
    to: '/orders',
    badge: '12'
  },
  {
    label: 'Customers',
    icon: 'solar:users-group-two-rounded-linear',
    to: '/customers'
  },
  {
    label: 'Analytics',
    icon: 'solar:chart-square-linear',
    children: [
      {
        label: 'Overview',
        to: '/analytics/overview',
        icon: 'solar:chart-square-linear'
      },
      {
        label: 'Reports',
        to: '/analytics/reports',
        icon: 'solar:document-text-linear',
        children: [
          {
            label: 'Sales Report',
            to: '/analytics/reports/sales',
            icon: 'solar:chart-2-linear'
          },
          {
            label: 'Customer Report',
            to: '/analytics/reports/customers',
            icon: 'solar:users-group-rounded-linear'
          },
          {
            label: 'Product Report',
            to: '/analytics/reports/products',
            icon: 'solar:box-minimalistic-linear'
          }
        ]
      },
      {
        label: 'Performance',
        to: '/analytics/performance',
        icon: 'solar:chart-square-linear'
      }
    ]
  },
  {
    label: 'Content',
    icon: 'solar:document-text-linear',
    children: [
      {
        label: 'Pages',
        to: '/content/pages',
        icon: 'solar:document-text-linear'
      },
      {
        label: 'Blog Posts',
        to: '/content/blog',
        icon: 'solar:notebook-linear'
      },
      {
        label: 'Media',
        to: '/content/media',
        icon: 'solar:gallery-linear'
      }
    ]
  },
  {
    label: 'Settings',
    icon: 'solar:settings-linear',
    children: [
      {
        label: 'General',
        to: '/settings/general',
        icon: 'solar:settings-linear'
      },
      {
        label: 'Users',
        to: '/settings/users',
        icon: 'solar:users-group-two-rounded-linear'
      },
      {
        label: 'Integrations',
        to: '/settings/integrations',
        icon: 'solar:plug-circle-linear'
      }
    ]
  }
]

export default navigationData
