/**
 * ============================================
 * CARTINO UI - THEMING SYSTEM
 * ============================================
 *
 * INTEGRATION GUIDE FOR COMPONENTS
 *
 * This theming system provides a complete, type-safe styling solution
 * using tailwind-variants with our custom color system.
 *
 * === STEP 1: IMPORT THE THEME ===
 * In your component's <script setup>:
 *
 *   import theme from '@/themes/your-component'
 *
 * === STEP 2: COMPUTE THE UI CLASSES ===
 * Create a computed property that applies the theme with your props:
 *
 *   const ui = computed(() => theme({
 *     variant: props.variant,
 *     color: props.color,
 *     size: props.size,
 *     disabled: props.disabled
 *   }))
 *
 * === STEP 3: APPLY TO TEMPLATE ===
 * Use the ui object in your template (supports slot-based theming):
 *
 *   <button :class="ui.base({ class: props.ui?.base })">
 *     <span :class="ui.label({ class: props.ui?.label })">
 *       {{ label }}
 *     </span>
 *   </button>
 *
 * === STEP 4: ALLOW UI CUSTOMIZATION ===
 * Accept a `ui` prop for component-level customization:
 *
 *   interface Props {
 *     // ... other props
 *     ui?: Record<string, any>
 *   }
 *
 * === AVAILABLE COLOR TOKENS ===
 * Use these in your themes for consistent, accessible colors:
 *
 * Primary Colors:
 *   - primary, primary-foreground
 *   - secondary, secondary-foreground
 *
 * Semantic Colors:
 *   - success, success-foreground
 *   - warning, warning-foreground
 *   - error/destructive, error-foreground
 *   - info, info-foreground
 *
 * Neutral Colors:
 *   - background, foreground
 *   - default, elevated
 *   - muted, muted-foreground
 *   - accent, accent-foreground
 *   - card, card-foreground
 *
 * Borders & Interactive:
 *   - border, input, ring
 *   - highlighted (primary text)
 *
 * All colors support light/dark mode automatically!
 *
 * === EXAMPLE USAGE ===
 * See Button.vue and Radio.vue for complete examples.
 *
 * === CREATING NEW THEMES ===
 * 1. Copy src/themes/_template.ts
 * 2. Rename it to your component name
 * 3. Define slots for each element
 * 4. Add variants (size, color, variant, states)
 * 5. Use compoundVariants for complex combinations
 * 6. Set defaultVariants
 * 7. Export the theme
 */

// Type definitions for themes
export type ThemeFunction = (...args: any[]) => any

// Export all theme functions with proper types
export { default as accordion } from './accordion'
export { default as alert } from './alert'
export { default as avatar } from './avatar'
export { default as badge } from './badge'
export { default as banner } from './banner'
export { default as breadcrumb } from './breadcrumb'
export { default as button } from './button'
export { default as buttonGroup } from './button-group'
export { default as calendar } from './calendar'
export { default as card } from './card'
export { default as checkbox } from './checkbox'
export { default as checkboxGroup } from './checkbox-group'
export { default as chip } from './chip'
export { default as command } from './command'
export { default as dashboardSidebar } from './dashboard-sidebar'
export { default as dashboardSidebarLinks } from './dashboard-sidebar-links'
export { default as dashboardToolbar } from './dashboard-toolbar'
export { default as dataTable } from './data-table'
export { default as datePicker } from './date-picker'
export { default as dialog } from './dialog'
export { default as drawer } from './drawer'
export { default as dropdown } from './dropdown'
export { default as empty } from './empty'
export { default as fileUpload } from './file-upload'
export { default as icon } from './icon'
export { default as input } from './input'
export { default as inputGroup } from './input-group'
export { default as metricCard } from './metric-card'
export { default as modal } from './modal'
export { default as modalEnhanced } from './modal-enhanced'
export { default as navigationMenu } from './navigation-menu'
export { default as pageHeader } from './page-header'
export { default as pagination } from './pagination'
export { default as pinInput } from './pin-input'
export { default as popover } from './popover'
export { default as progress } from './progress'
export { default as radioGroup } from './radio-group'
export { default as select } from './select'
export { default as separator } from './separator'
export { default as sheet } from './sheet'
export { default as skeleton } from './skeleton'
export { default as slider } from './slider'
export { default as statCard } from './stat-card'
export { default as stats } from './stats'
export { default as switch } from './switch'
export { default as table } from './table'
export { default as tabs } from './tabs'
export { default as tag } from './tag'
export { default as textarea } from './textarea'
export { default as toast } from './toast'
export { default as toastTheme } from './toast-theme'
export { default as tooltip } from './tooltip'
export { default as user } from './user'
