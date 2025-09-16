<template>
  <div class="relative">
    <canvas 
      ref="canvasRef" 
      :width="size" 
      :height="size"
      class="drop-shadow-lg"
    ></canvas>
    
    <!-- Value Display -->
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <div class="text-center">
        <div :class="`text-2xl font-bold ${getValueColor()}`">
          {{ formattedValue }}
        </div>
        <div class="text-xs text-neutral-400 mt-1">{{ unit }}</div>
        <div class="text-xs text-neutral-500 mt-1">{{ label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

interface Props {
  value: number
  min?: number
  max?: number
  unit?: string
  label?: string
  size?: number
  thresholds?: {
    warning: number
    critical: number
  }
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  unit: '',
  label: '',
  size: 200,
  thresholds: () => ({ warning: 70, critical: 90 })
})

const canvasRef = ref<HTMLCanvasElement>()

const formattedValue = computed(() => {
  return typeof props.value === 'number' ? props.value.toFixed(1) : '0.0'
})

const getValueColor = () => {
  if (props.value >= props.thresholds.critical) return 'text-red-400'
  if (props.value >= props.thresholds.warning) return 'text-yellow-400'
  return 'text-green-400'
}

const drawGauge = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const centerX = props.size / 2
  const centerY = props.size / 2
  const radius = (props.size / 2) - 20
  
  // Clear canvas
  ctx.clearRect(0, 0, props.size, props.size)
  
  // Draw background arc
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, Math.PI * 0.75, Math.PI * 2.25)
  ctx.strokeStyle = '#374151'
  ctx.lineWidth = 12
  ctx.lineCap = 'round'
  ctx.stroke()
  
  // Calculate angle for current value
  const percentage = (props.value - props.min) / (props.max - props.min)
  const angle = Math.PI * 0.75 + (percentage * Math.PI * 1.5)
  
  // Draw value arc with gradient
  const gradient = ctx.createLinearGradient(0, 0, props.size, 0)
  
  if (props.value >= props.thresholds.critical) {
    gradient.addColorStop(0, '#ef4444')
    gradient.addColorStop(1, '#dc2626')
  } else if (props.value >= props.thresholds.warning) {
    gradient.addColorStop(0, '#f59e0b')
    gradient.addColorStop(1, '#d97706')
  } else {
    gradient.addColorStop(0, '#10b981')
    gradient.addColorStop(1, '#059669')
  }
  
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, Math.PI * 0.75, angle)
  ctx.strokeStyle = gradient
  ctx.lineWidth = 12
  ctx.lineCap = 'round'
  ctx.stroke()
  
  // Draw threshold markers
  const drawThresholdMarker = (threshold: number, color: string) => {
    const thresholdPercentage = (threshold - props.min) / (props.max - props.min)
    const thresholdAngle = Math.PI * 0.75 + (thresholdPercentage * Math.PI * 1.5)
    
    const startRadius = radius - 6
    const endRadius = radius + 6
    
    const startX = centerX + Math.cos(thresholdAngle) * startRadius
    const startY = centerY + Math.sin(thresholdAngle) * startRadius
    const endX = centerX + Math.cos(thresholdAngle) * endRadius
    const endY = centerY + Math.sin(thresholdAngle) * endRadius
    
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.strokeStyle = color
    ctx.lineWidth = 3
    ctx.stroke()
  }
  
  drawThresholdMarker(props.thresholds.warning, '#f59e0b')
  drawThresholdMarker(props.thresholds.critical, '#ef4444')
  
  // Draw center dot
  ctx.beginPath()
  ctx.arc(centerX, centerY, 8, 0, Math.PI * 2)
  ctx.fillStyle = '#6b7280'
  ctx.fill()
}

onMounted(() => {
  drawGauge()
})

watch([() => props.value, () => props.min, () => props.max], () => {
  drawGauge()
})
</script>