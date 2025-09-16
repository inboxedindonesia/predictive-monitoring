<template>
  <div class="relative bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-700/50 p-4">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
      <div class="flex items-center space-x-2">
        <div class="flex items-center space-x-1">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span class="text-xs text-green-400">Live</span>
        </div>
        <select 
          v-model="selectedTimeRange" 
          class="bg-neutral-800 border border-neutral-600 rounded px-2 py-1 text-xs text-white"
          @change="updateTimeRange"
        >
          <option value="1h">1 Hour</option>
          <option value="6h">6 Hours</option>
          <option value="24h">24 Hours</option>
          <option value="7d">7 Days</option>
        </select>
      </div>
    </div>
    
    <div class="relative h-64">
      <canvas 
        ref="chartCanvas" 
        class="w-full h-full"
        @mousemove="handleMouseMove"
        @mouseleave="hideTooltip"
      ></canvas>
      
      <!-- Tooltip -->
      <div 
        v-if="tooltip.show"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
        class="absolute z-10 bg-neutral-800 border border-neutral-600 rounded-lg p-2 text-xs text-white shadow-lg pointer-events-none"
      >
        <div class="font-semibold">{{ tooltip.time }}</div>
        <div class="flex items-center space-x-2 mt-1">
          <div :class="`w-2 h-2 rounded-full ${getStatusColor(tooltip.value)}`"></div>
          <span>{{ tooltip.value }}{{ unit }}</span>
        </div>
      </div>
    </div>
    
    <!-- Legend -->
    <div class="flex items-center justify-between mt-4 text-xs">
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-1">
          <div class="w-3 h-0.5 bg-green-400"></div>
          <span class="text-neutral-400">Normal</span>
        </div>
        <div class="flex items-center space-x-1">
          <div class="w-3 h-0.5 bg-yellow-400"></div>
          <span class="text-neutral-400">Warning</span>
        </div>
        <div class="flex items-center space-x-1">
          <div class="w-3 h-0.5 bg-red-400"></div>
          <span class="text-neutral-400">Critical</span>
        </div>
      </div>
      <div class="text-neutral-500">
        Last updated: {{ lastUpdated }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

interface DataPoint {
  timestamp: Date
  value: number
}

interface Props {
  title: string
  data: DataPoint[]
  unit?: string
  thresholds?: {
    warning: number
    critical: number
  }
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  unit: '',
  thresholds: () => ({ warning: 70, critical: 90 }),
  color: '#10b981'
})

const chartCanvas = ref<HTMLCanvasElement>()
const selectedTimeRange = ref('1h')
const tooltip = ref({
  show: false,
  x: 0,
  y: 0,
  time: '',
  value: 0
})

const lastUpdated = computed(() => {
  const now = new Date()
  return now.toLocaleTimeString()
})

const getStatusColor = (value: number) => {
  if (value >= props.thresholds.critical) return 'bg-red-400'
  if (value >= props.thresholds.warning) return 'bg-yellow-400'
  return 'bg-green-400'
}

const drawChart = () => {
  const canvas = chartCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Set canvas size
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * window.devicePixelRatio
  canvas.height = rect.height * window.devicePixelRatio
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

  const width = rect.width
  const height = rect.height
  const padding = 40

  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  if (!props.data.length) return

  // Calculate bounds
  const values = props.data.map(d => d.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const valueRange = maxValue - minValue || 1

  // Draw grid lines
  ctx.strokeStyle = '#374151'
  ctx.lineWidth = 1
  ctx.setLineDash([2, 2])

  // Horizontal grid lines
  for (let i = 0; i <= 5; i++) {
    const y = padding + (i * (height - 2 * padding)) / 5
    ctx.beginPath()
    ctx.moveTo(padding, y)
    ctx.lineTo(width - padding, y)
    ctx.stroke()
  }

  // Vertical grid lines
  for (let i = 0; i <= 6; i++) {
    const x = padding + (i * (width - 2 * padding)) / 6
    ctx.beginPath()
    ctx.moveTo(x, padding)
    ctx.lineTo(x, height - padding)
    ctx.stroke()
  }

  ctx.setLineDash([])

  // Draw threshold lines
  const drawThresholdLine = (value: number, color: string, label: string) => {
    const y = height - padding - ((value - minValue) / valueRange) * (height - 2 * padding)
    
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(padding, y)
    ctx.lineTo(width - padding, y)
    ctx.stroke()
    
    // Label
    ctx.fillStyle = color
    ctx.font = '10px sans-serif'
    ctx.fillText(label, width - padding + 5, y + 3)
  }

  drawThresholdLine(props.thresholds.warning, '#f59e0b', 'Warning')
  drawThresholdLine(props.thresholds.critical, '#ef4444', 'Critical')

  ctx.setLineDash([])

  // Draw data line
  if (props.data.length > 1) {
    ctx.strokeStyle = props.color
    ctx.lineWidth = 2
    ctx.beginPath()

    props.data.forEach((point, index) => {
      const x = padding + (index / (props.data.length - 1)) * (width - 2 * padding)
      const y = height - padding - ((point.value - minValue) / valueRange) * (height - 2 * padding)

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw data points
    props.data.forEach((point, index) => {
      const x = padding + (index / (props.data.length - 1)) * (width - 2 * padding)
      const y = height - padding - ((point.value - minValue) / valueRange) * (height - 2 * padding)

      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fillStyle = getStatusColor(point.value).replace('bg-', '#').replace('-400', '')
      ctx.fill()
    })
  }

  // Draw axes labels
  ctx.fillStyle = '#9ca3af'
  ctx.font = '10px sans-serif'

  // Y-axis labels
  for (let i = 0; i <= 5; i++) {
    const value = minValue + (i * valueRange) / 5
    const y = height - padding - (i * (height - 2 * padding)) / 5
    ctx.fillText(value.toFixed(1), 5, y + 3)
  }
}

const handleMouseMove = (event: MouseEvent) => {
  const canvas = chartCanvas.value
  if (!canvas || !props.data.length) return

  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const padding = 40
  const dataWidth = rect.width - 2 * padding

  if (x >= padding && x <= rect.width - padding) {
    const dataIndex = Math.round(((x - padding) / dataWidth) * (props.data.length - 1))
    const point = props.data[dataIndex]

    if (point) {
      tooltip.value = {
        show: true,
        x: x + 10,
        y: y - 10,
        time: point.timestamp.toLocaleTimeString(),
        value: point.value
      }
    }
  }
}

const hideTooltip = () => {
  tooltip.value.show = false
}

const updateTimeRange = () => {
  // This would typically filter the data based on selected time range
  // For now, we'll just redraw the chart
  drawChart()
}

onMounted(() => {
  drawChart()
  window.addEventListener('resize', drawChart)
})

onUnmounted(() => {
  window.removeEventListener('resize', drawChart)
})

watch(() => props.data, () => {
  drawChart()
}, { deep: true })
</script>