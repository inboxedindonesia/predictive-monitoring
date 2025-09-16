<template>
  <div class="chart-container">
    <canvas :id="chartId" ref="canvasRef"></canvas>
    <div v-if="!data || data.labels.length === 0" class="flex items-center justify-center h-full text-neutral-400">
      <div class="text-center">
        <div class="text-2xl mb-2">📊</div>
        <p>Loading chart data...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface Props {
  chartId: string
  data: {
    labels: string[]
    datasets: Array<{
      label: string
      data: number[]
      borderColor: string
      backgroundColor: string
      tension?: number
      fill?: boolean
    }>
  }
  options?: any
  width?: number
  height?: number
  type?: 'line' | 'bar' | 'area'
}

const props = withDefaults(defineProps<Props>(), {
  width: 400,
  height: 200,
  type: 'line'
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chart: ChartJS | null = null

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#d1d5db',
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#d1d5db',
      borderColor: '#374151',
      borderWidth: 1
    }
  },
  scales: {
    x: {
      grid: {
        color: '#374151',
        drawBorder: false
      },
      ticks: {
        color: '#9ca3af',
        font: {
          size: 11
        }
      }
    },
    y: {
      grid: {
        color: '#374151',
        drawBorder: false
      },
      ticks: {
        color: '#9ca3af',
        font: {
          size: 11
        }
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index' as const
  },
  elements: {
    point: {
      radius: 3,
      hoverRadius: 6
    },
    line: {
      tension: 0.4
    }
  }
}

const createChart = () => {
  const canvas = canvasRef.value || document.getElementById(props.chartId) as HTMLCanvasElement
  if (!canvas) {
    console.warn(`Canvas with id ${props.chartId} not found`)
    return
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    console.warn('Could not get 2d context from canvas')
    return
  }

  // Destroy existing chart
  if (chart) {
    chart.destroy()
  }

  // Ensure we have data
  if (!props.data || !props.data.labels || props.data.labels.length === 0) {
    console.warn('No data provided for chart')
    return
  }

  const chartData = {
    ...props.data,
    datasets: props.data.datasets.map(dataset => ({
      ...dataset,
      tension: dataset.tension || 0.4,
      fill: props.type === 'area' ? true : (dataset.fill || false)
    }))
  }

  try {
    chart = new ChartJS(ctx, {
      type: props.type === 'area' ? 'line' : props.type,
      data: chartData,
      options: {
        ...defaultOptions,
        ...props.options
      }
    })
    console.log(`Chart ${props.chartId} created successfully`)
  } catch (error) {
    console.error(`Error creating chart ${props.chartId}:`, error)
  }
}

onMounted(async () => {
  await nextTick()
  createChart()
})

watch(() => props.data, () => {
  if (chart) {
    chart.data = props.data
    chart.update()
  }
}, { deep: true })

watch(() => props.options, () => {
  createChart()
}, { deep: true })
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>