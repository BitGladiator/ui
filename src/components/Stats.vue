<template>
  <div :class="statsTheme.root({ class: ui?.root })">
    <!-- Icon -->
    <div
      v-if="icon"
      :class="statsTheme.iconContainer({ class: ui?.iconContainer })"
    >
      <Icon :name="icon" :class="statsTheme.icon({ class: ui?.icon })" />
    </div>

    <!-- Content -->
    <div :class="statsTheme.content({ class: ui?.content })">
      <!-- Label -->
      <div v-if="label" :class="statsTheme.label({ class: ui?.label })">
        {{ label }}
      </div>

      <!-- Value -->
      <div :class="statsTheme.value({ class: ui?.value })">
        <span v-if="prefix" :class="statsTheme.prefix({ class: ui?.prefix })">{{
          prefix
        }}</span>
        <span>{{ formattedValue }}</span>
        <span v-if="suffix" :class="statsTheme.suffix({ class: ui?.suffix })">{{
          suffix
        }}</span>
      </div>

      <!-- Description -->
      <div
        v-if="description"
        :class="statsTheme.description({ class: ui?.description })"
      >
        {{ description }}
      </div>

      <!-- Change Indicator -->
      <div
        v-if="change !== undefined"
        :class="statsTheme.change({ class: ui?.change })"
      >
        <Icon
          v-if="changeIcon"
          :name="changeIcon"
          :class="statsTheme.changeIcon({ class: ui?.changeIcon })"
        />
        <span>{{ formattedChange }}</span>
        <span
          v-if="changePeriod"
          :class="statsTheme.changePeriod({ class: ui?.changePeriod })"
        >
          {{ changePeriod }}
        </span>
      </div>

      <!-- Progress -->
      <div
        v-if="progress !== undefined"
        :class="statsTheme.progressContainer({ class: ui?.progressContainer })"
      >
        <div :class="statsTheme.progressTrack({ class: ui?.progressTrack })">
          <div
            :class="statsTheme.progressFill({ class: ui?.progressFill })"
            :style="{ width: `${progressPercentage}%` }"
          />
        </div>
        <span
          v-if="showProgress"
          :class="statsTheme.progressText({ class: ui?.progressText })"
        >
          {{ Math.round(progressPercentage) }}%
        </span>
      </div>
    </div>

    <!-- Trend Chart (placeholder) -->
    <div v-if="trend?.length" :class="statsTheme.trend({ class: ui?.trend })">
      <svg :width="trendWidth" :height="trendHeight" class="overflow-visible">
        <path
          :d="trendPath"
          fill="none"
          :stroke="trendColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import theme from '@/themes/stats'

export interface StatsProps {
  label?: string
  value: number | string
  prefix?: string
  suffix?: string
  description?: string
  change?: number
  changePeriod?: string
  progress?: number
  progressMax?: number
  showProgress?: boolean
  icon?: string
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  orientation?: 'horizontal' | 'vertical'
  trend?: number[]
  loading?: boolean
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<StatsProps>(), {
  color: 'default',
  size: 'md',
  orientation: 'vertical',
  progressMax: 100,
  showProgress: false,
  loading: false
})

const formattedValue = computed(() => {
  if (props.loading) return '—'
  if (typeof props.value === 'string') return props.value

  // Format number with commas
  return props.value.toLocaleString()
})

const formattedChange = computed(() => {
  if (!props.change) return ''

  const sign = props.change > 0 ? '+' : ''
  const percent = Math.abs(props.change)
  return `${sign}${percent}%`
})

const changeIcon = computed(() => {
  if (props.change === undefined) return null
  return props.change > 0 ? 'solar:graph-up-linear' : 'solar:graph-down-linear'
})

const changeType = computed(() => {
  if (props.change === undefined) return 'neutral'
  if (props.change > 0) return 'positive'
  if (props.change < 0) return 'negative'
  return 'neutral'
})

const progressPercentage = computed(() => {
  if (props.progress === undefined) return 0
  return (
    (Math.min(Math.max(props.progress, 0), props.progressMax!) /
      props.progressMax!) *
    100
  )
})

const trendWidth = computed(() => 60)
const trendHeight = computed(() => 20)

const trendPath = computed(() => {
  if (!props.trend?.length) return ''

  const points = props.trend
  const maxY = Math.max(...points)
  const minY = Math.min(...points)
  const range = maxY - minY || 1

  const pathPoints = points.map((value, index) => {
    const x = (index / (points.length - 1)) * (trendWidth.value - 4) + 2
    const y =
      trendHeight.value - 2 - ((value - minY) / range) * (trendHeight.value - 4)
    return `${x},${y}`
  })

  return `M ${pathPoints.join(' L ')}`
})

const trendColor = computed(() => {
  if (!props.trend?.length) return '#6b7280'

  const first = props.trend[0]
  const last = props.trend[props.trend.length - 1]

  if (last > first) return '#10b981' // green
  if (last < first) return '#ef4444' // red
  return '#6b7280' // gray
})

const statsTheme = computed(() =>
  theme({
    size: props.size,
    color: props.color,
    orientation: props.orientation,
    changeType: changeType.value,
    loading: props.loading
  })
)
</script>
