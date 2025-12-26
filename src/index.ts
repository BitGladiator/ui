import type { App } from 'vue'
import './style.css'
// Inizializza ed espone API tema globale minimale
export { ui } from './utils/ui'

// Importa i componenti
import Accordion from './components/Accordion.vue'
import Alert from './components/Alert.vue'
import Avatar from './components/Avatar.vue'
import Badge from './components/Badge.vue'
import Banner from './components/Banner.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Button from './components/Button.vue'
import Card from './components/Card.vue'
import Checkbox from './components/Checkbox.vue'
import CheckboxGroup from './components/CheckboxGroup.vue'
import Chip from './components/Chip.vue'
import Command from './components/Command.vue'
import DashboardSidebar from './components/DashboardSidebar.vue'
import DashboardSidebarLinks from './components/DashboardSidebarLinks.vue'
import DashboardToolbar from './components/DashboardToolbar.vue'
import Calendar from './components/Calendar.vue'
import DataTable from './components/DataTable.vue'
import DatePicker from './components/DatePicker.vue'
import Dropdown from './components/Dropdown.vue'
import Empty from './components/Empty.vue'
import FileUpload from './components/FileUpload.vue'
import Icon from './components/Icon.vue'
import Input from './components/Input.vue'
import Link from './components/Link.vue'
import Modal from './components/Modal.vue'
import NavigationMenu from './components/NavigationMenu.vue'
import PageHeader from './components/PageHeader.vue'
import Pagination from './components/Pagination.vue'
import PinInput from './components/PinInput.vue'
import Popover from './components/Popover.vue'
import Progress from './components/Progress.vue'
import Radio from './components/Radio.vue'
import RadioGroup from './components/RadioGroup.vue'
import Select from './components/Select.vue'
import Separator from './components/Separator.vue'
import Sheet from './components/Sheet.vue'
import Skeleton from './components/Skeleton.vue'
import Slider from './components/Slider.vue'
import Stats from './components/Stats.vue'
import Switch from './components/Switch.vue'
import Table from './components/Table.vue'
import Tabs from './components/Tabs.vue'
import Textarea from './components/Textarea.vue'
import Toast from './components/Toast.vue'
import Toaster from './components/Toaster.vue'
import Tooltip from './components/Tooltip.vue'
import User from './components/User.vue'

// Plugin di installazione per Vue
export const install = (app: App) => {
  app.component('CartinoAccordion', Accordion)
  app.component('CartinoAlert', Alert)
  app.component('CartinoAvatar', Avatar)
  app.component('CartinoBadge', Badge)
  app.component('CartinoBanner', Banner)
  app.component('CartinoBreadcrumb', Breadcrumb)
  app.component('CartinoButton', Button)
  app.component('CartinoCard', Card)
  app.component('CartinoCheckbox', Checkbox)
  app.component('CartinoCheckboxGroup', CheckboxGroup)
  app.component('CartinoChip', Chip)
  app.component('CartinoCommand', Command)
  app.component('CartinoDashboardSidebar', DashboardSidebar)
  app.component('CartinoDashboardSidebarLinks', DashboardSidebarLinks)
  app.component('CartinoDashboardToolbar', DashboardToolbar)
  app.component('CartinoCalendar', Calendar)
  app.component('CartinoDataTable', DataTable)
  app.component('CartinoDatePicker', DatePicker)
  app.component('CartinoDropdown', Dropdown)
  app.component('CartinoEmpty', Empty)
  app.component('CartinoFileUpload', FileUpload)
  app.component('CartinoIcon', Icon)
  app.component('CartinoInput', Input)
  app.component('CartinoLink', Link)
  app.component('CartinoModal', Modal)
  app.component('CartinoNavigationMenu', NavigationMenu)
  app.component('CartinoPageHeader', PageHeader)
  app.component('CartinoPagination', Pagination)
  app.component('CartinoPinInput', PinInput)
  app.component('CartinoPopover', Popover)
  app.component('CartinoProgress', Progress)
  app.component('CartinoRadio', Radio)
  app.component('CartinoRadioGroup', RadioGroup)
  app.component('CartinoSelect', Select)
  app.component('CartinoSeparator', Separator)
  app.component('CartinoSheet', Sheet)
  app.component('CartinoSkeleton', Skeleton)
  app.component('CartinoSlider', Slider)
  app.component('CartinoStats', Stats)
  app.component('CartinoSwitch', Switch)
  app.component('CartinoTable', Table)
  app.component('CartinoTabs', Tabs)
  app.component('CartinoTextarea', Textarea)
  app.component('CartinoToast', Toast)
  app.component('CartinoToaster', Toaster)
  app.component('CartinoTooltip', Tooltip)
  app.component('CartinoUser', User)
}

// Esporta i singoli componenti per l'uso individuale
export {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Banner,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Checkbox,
  CheckboxGroup,
  Chip,
  Command,
  DashboardSidebar,
  DashboardSidebarLinks,
  DashboardToolbar,
  DataTable,
  DatePicker,
  Dropdown,
  Empty,
  FileUpload,
  Icon,
  Input,
  Link,
  Modal,
  NavigationMenu,
  PageHeader,
  Pagination,
  PinInput,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Separator,
  Sheet,
  Skeleton,
  Slider,
  Stats,
  Switch,
  Table,
  Tabs,
  Textarea,
  Toast,
  Toaster,
  Tooltip,
  User
}

// Esporta i tipi
export type { AccordionProps, AccordionItem } from './components/Accordion.vue'
export type { AlertProps } from './components/Alert.vue'
export type { AvatarProps } from './components/Avatar.vue'
export type { BadgeProps } from './components/Badge.vue'
export type { BannerProps } from './components/Banner.vue'
export type { BreadcrumbProps } from './components/Breadcrumb.vue'
export type { ButtonProps } from './components/Button.vue'
export type { CalendarProps } from './components/Calendar.vue'
export type { CardProps } from './components/Card.vue'
export type { CheckboxProps } from './components/Checkbox.vue'
export type { CheckboxGroupProps } from './components/CheckboxGroup.vue'
export type { ChipProps } from './components/Chip.vue'
export type {
  CommandProps,
  CommandItem,
  CommandGroup
} from './components/Command.vue'
export type { DashboardSidebarProps } from './components/DashboardSidebar.vue'
export type { DashboardSidebarLinksProps } from './components/DashboardSidebarLinks.vue'
export type { DashboardToolbarProps } from './components/DashboardToolbar.vue'
export type { DataTableProps } from './components/DataTable.vue'
export type { DatePickerProps } from './components/DatePicker.vue'
export type { DropdownProps, DropdownItem } from './components/Dropdown.vue'
export type { EmptyProps } from './components/Empty.vue'
export type { FileUploadProps } from './components/FileUpload.vue'
export type { IconProps } from './components/Icon.vue'
export type { InputProps } from './components/Input.vue'
export type { LinkProps } from './components/Link.vue'
export type { ModalProps } from './components/Modal.vue'
export type { NavigationMenuProps } from './components/NavigationMenu.vue'
export type { MenuItem } from './components/NavigationMenuItem.vue'
export type { PageHeaderProps } from './components/PageHeader.vue'
export type { PaginationProps } from './components/Pagination.vue'
export type { PinInputProps } from './components/PinInput.vue'
export type { PopoverProps } from './components/Popover.vue'
export type { ProgressProps } from './components/Progress.vue'
export type { RadioProps } from './components/Radio.vue'
export type { RadioGroupProps } from './components/RadioGroup.vue'
export type { SelectProps, SelectOption } from './components/Select.vue'
export type { SeparatorProps } from './components/Separator.vue'
export type { SheetProps } from './components/Sheet.vue'
export type { SkeletonProps } from './components/Skeleton.vue'
export type { SliderProps } from './components/Slider.vue'
export type { StatsProps } from './components/Stats.vue'
export type { SwitchProps } from './components/Switch.vue'
export type { TableProps } from './components/Table.vue'
export type { TabsProps } from './components/Tabs.vue'
export type { TextareaProps } from './components/Textarea.vue'
export type { ToastProps } from './components/Toast.vue'
export type { ToasterProps } from './components/Toaster.vue'
export type { TooltipProps } from './components/Tooltip.vue'
export type { UserProps } from './components/User.vue'

// Export composables
export {
  useToast,
  toastMaxInjectionKey,
  type Toast as ToastItem,
  type ToastOptions,
  type UseToastReturn
} from './composables/useToast'

// NOTE: avoid re-exporting the entire primitive library to keep bundle small.
// If you need specific Reka primitives, import them explicitly where used.
// export * from 'reka-ui'
