<template>
  <div class="space-y-6 relative">
    <div class="pointer-events-none absolute inset-0 opacity-30">
      <div class="absolute -top-20 -left-20 h-[320px] w-[320px] rounded-full blur-3xl bg-violet-600/30" />
      <div class="absolute -bottom-24 -right-24 h-[300px] w-[300px] rounded-full blur-3xl bg-cyan-500/25" />
    </div>
    <div class="flex items-end gap-4 flex-wrap">
      <h1 class="text-2xl font-semibold tracking-tight">Executive Dashboard</h1>
      <div class="ml-auto flex gap-2 text-sm">
        <select v-model="timeFilter" class="bg-neutral-900 border border-neutral-700 rounded px-3 py-2">
          <option value="day">Harian</option>
          <option value="week">Mingguan</option>
          <option value="month">Bulanan</option>
        </select>
      </div>
    </div>

    <!-- 1) KPI & Ringkasan Eksekutif -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div class="bg-gradient-to-b from-neutral-900/70 to-neutral-950/70 border border-white/10 rounded-2xl p-4 shadow-[0_10px_40px_-20px_rgba(0,0,0,.8)] transition-all" :class="oeePulse ? 'ring-2 ring-violet-500/40 animate-pulse' : ''">
        <div class="text-sm text-neutral-400">OEE</div>
        <div class="text-3xl font-semibold">{{ kpis.oee }}%</div>
        <div class="text-xs mt-1" :class="deltaClass(percentDelta(kpis.oee, prev.oee))">{{ arrow(percentDelta(kpis.oee, prev.oee)) }} {{ Math.abs(percentDelta(kpis.oee, prev.oee)).toFixed(1) }}%</div>
        
      </div>
      <div class="bg-gradient-to-b from-neutral-900/70 to-neutral-950/70 border border-white/10 rounded-2xl p-4 shadow-[0_10px_40px_-20px_rgba(0,0,0,.8)]">
        <div class="text-sm text-neutral-400">Downtime (P/U)</div>
        <div class="text-3xl font-semibold">{{ kpis.downPlanned }} / {{ kpis.downUnplanned }} h</div>
        <div class="text-xs mt-1" :class="deltaClass(percentDelta(totalDown, prevDown), true)">{{ arrow(percentDelta(totalDown, prevDown)) }} {{ Math.abs(percentDelta(totalDown, prevDown)).toFixed(1) }}%</div>
      </div>
      <div class="bg-gradient-to-b from-neutral-900/70 to-neutral-950/70 border border-white/10 rounded-2xl p-4 shadow-[0_10px_40px_-20px_rgba(0,0,0,.8)]">
        <div class="text-sm text-neutral-400">PM Compliance</div>
        <div class="text-3xl font-semibold">{{ kpis.pmCompliance }}%</div>
        <div class="text-xs mt-1" :class="deltaClass(percentDelta(kpis.pmCompliance, prev.pmCompliance))">{{ arrow(percentDelta(kpis.pmCompliance, prev.pmCompliance)) }} {{ Math.abs(percentDelta(kpis.pmCompliance, prev.pmCompliance)).toFixed(1) }}%</div>
      </div>
      <div class="bg-gradient-to-b from-neutral-900/70 to-neutral-950/70 border border-white/10 rounded-2xl p-4 shadow-[0_10px_40px_-20px_rgba(0,0,0,.8)]">
        <div class="text-sm text-neutral-400">Energy Cost (M/YTD)</div>
        <div class="text-3xl font-semibold">${{ kpis.energyMonthly }} / ${{ kpis.energyYtd }}</div>
        <div class="text-xs mt-1" :class="deltaClass(percentDelta(kpis.energyMonthly, prev.energyMonthly))">{{ arrow(percentDelta(kpis.energyMonthly, prev.energyMonthly)) }} {{ Math.abs(percentDelta(kpis.energyMonthly, prev.energyMonthly)).toFixed(1) }}%</div>
        
      </div>
      <div class="bg-gradient-to-b from-neutral-900/70 to-neutral-950/70 border border-white/10 rounded-2xl p-4 shadow-[0_10px_40px_-20px_rgba(0,0,0,.8)]">
        <div class="text-sm text-neutral-400">Machine Health Index</div>
        <div class="text-3xl font-semibold">{{ kpis.mhi }}</div>
        <div class="text-xs mt-1" :class="deltaClass(percentDelta(kpis.mhi, prev.mhi))">{{ arrow(percentDelta(kpis.mhi, prev.mhi)) }} {{ Math.abs(percentDelta(kpis.mhi, prev.mhi)).toFixed(1) }}%</div>
      </div>
    </div>

    <!-- 2) Telemetry & Real-Time Monitoring -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="bg-neutral-950/70 border border-white/10 rounded-2xl p-4 backdrop-blur">
        <h2 class="font-medium mb-2">Status Mesin</h2>
        <ul class="text-sm text-neutral-300 grid grid-cols-2 gap-2">
          <li v-for="s in machineStatus" :key="s.name" class="flex items-center justify-between bg-neutral-900/60 rounded px-3 py-2">
            <span>{{ s.name }}</span>
            <span :class="statusColor(s.status)">{{ s.status }}</span>
          </li>
        </ul>
        <div class="mt-3 text-xs flex gap-2">
          <RouterLink to="/cms/telemetry" class="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500">Open Telemetry</RouterLink>
        </div>
      </div>
      <div class="bg-neutral-950/70 border border-white/10 rounded-2xl p-4 backdrop-blur">
        <h2 class="font-medium mb-3">Anomaly Highlight</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <RouterLink to="/cms/telemetry?type=power_spike" class="rounded-xl border border-white/10 p-4 bg-gradient-to-b from-red-900/10 to-transparent hover:bg-white/5 transition-colors">
            <div class="text-sm text-neutral-300">Power Spikes</div>
            <div class="text-3xl font-semibold text-red-400">{{ anomalyCards.powerSpike }}</div>
          </RouterLink>
          <RouterLink to="/cms/telemetry?type=temp_high" class="rounded-xl border border-white/10 p-4 bg-gradient-to-b from-yellow-900/10 to-transparent hover:bg-white/5 transition-colors">
            <div class="text-sm text-neutral-300">Temp High</div>
            <div class="text-3xl font-semibold text-yellow-300">{{ anomalyCards.tempHigh }}</div>
          </RouterLink>
          <RouterLink to="/cms/telemetry?type=inactive" class="rounded-xl border border-white/10 p-4 bg-gradient-to-b from-neutral-700/10 to-transparent hover:bg-white/5 transition-colors">
            <div class="text-sm text-neutral-300">Inactive</div>
            <div class="text-3xl font-semibold">{{ anomalyCards.inactive }}</div>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- 3) Predictive Maintenance Insights -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="bg-neutral-950/70 border border-white/10 rounded-2xl p-4">
        <h2 class="font-medium mb-2">Prediksi Kerusakan (7 hari)</h2>
        <ul class="text-sm text-neutral-300 list-disc pl-5">
          <li v-for="p in predictiveList" :key="p.machine">{{ p.machine }} - {{ p.risk }}% risk (RUL ~ {{ p.rul }} hari)</li>
        </ul>
        <div class="mt-3 text-xs flex gap-2">
          <RouterLink to="/cms/predictive" class="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500">Open Predictive</RouterLink>
        </div>
      </div>
      <div class="bg-neutral-950/70 border border-white/10 rounded-2xl p-4">
        <h2 class="font-medium mb-2">Rekomendasi Aksi</h2>
        <ul class="text-sm text-neutral-300 list-disc pl-5">
          <li v-for="r in recommendations" :key="r">{{ r }}</li>
        </ul>
      </div>
    </div>

    <!-- 4) Maintenance & Ticketing Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
        <h2 class="font-medium mb-2">Tickets</h2>
        <div class="text-sm text-neutral-300">Open: {{ tickets.open }} | In Progress: {{ tickets.inProgress }} | Overdue: {{ tickets.overdue }}</div>
        <div class="text-sm text-neutral-300 mt-2">MTTR: {{ mttr }} h | MTBF: {{ mtbf }} h</div>
      </div>
      <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
        <h2 class="font-medium mb-2">Top 5 Root Causes</h2>
        <ol class="text-sm text-neutral-300 list-decimal pl-5">
          <li v-for="c in rootCauses" :key="c.cause">{{ c.cause }} ({{ c.count }})</li>
        </ol>
      </div>
    </div>

    <!-- 5) Energy & Cost Dashboard -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="bg-neutral-950/70 border border-white/10 rounded-2xl p-4">
        <h2 class="font-medium mb-2">Konsumsi Energi</h2>
        <div class="text-sm text-neutral-300">Perbandingan Target vs Realisasi akan ditempatkan di grafik.</div>
        <div class="mt-3 text-xs flex gap-2">
          <RouterLink to="/cms/energy" class="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500">Open Energy</RouterLink>
        </div>
      </div>
      <div class="bg-neutral-950/70 border border-white/10 rounded-2xl p-4">
        <h2 class="font-medium mb-2">Prediksi Biaya</h2>
        <div class="text-sm text-neutral-300">Prediksi bulan berjalan & YTD.</div>
      </div>
    </div>

    <!-- 6) Alert & Notifikasi -->
    <div class="bg-neutral-950/70 border border-white/10 rounded-2xl p-4">
      <h2 class="font-medium mb-2">Daftar Alert Terbaru</h2>
      <ul class="text-sm text-neutral-300 list-disc pl-5">
        <li v-for="a in latestAlerts" :key="a.id">{{ a.time }} - [{{ a.priority }}] {{ a.message }} - {{ a.ack? 'ACK' : 'Pending' }}</li>
      </ul>
    </div>

    <!-- 7) Analitik & Laporan -->
    <div class="bg-neutral-950/70 border border-white/10 rounded-2xl p-4">
      <h2 class="font-medium mb-2">Analitik & Laporan</h2>
      <ul class="text-sm text-neutral-300 list-disc pl-5">
        <li>Trend Failure, Top Performance Machine, Cost Saving Report</li>
        <li>Export/Share: gunakan menu Reports untuk PDF/Excel</li>
      </ul>
      <div class="mt-3 text-xs flex gap-2">
        <RouterLink to="/cms/reports" class="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500">Open Reports</RouterLink>
      </div>
    </div>

    <!-- 8) Customizable View -->
    <div class="bg-neutral-950/70 border border-white/10 rounded-2xl p-4">
      <h2 class="font-medium mb-2">Customizable View</h2>
      <div class="text-sm text-neutral-300">Filter Lokasi & Role-based dashboard (placeholder)</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref, watch, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  LineElement, PointElement,
  CategoryScale, LinearScale,
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)
import { useTelemetryStore } from '../stores/telemetry'

const kpis = reactive({ oee: 78.6, downPlanned: 3.5, downUnplanned: 1.2, pmCompliance: 92, energyMonthly: 12450, energyYtd: 98320, mhi: 86 })
const timeFilter = ref<'day'|'week'|'month'>('day')
const prev = reactive({ oee: 77.9, pmCompliance: 90.5, energyMonthly: 12010, mhi: 84 })
const totalDown = computed(() => Number((kpis.downPlanned + kpis.downUnplanned).toFixed(2)))
const prevDown = 4.2

type AnomalyType = 'power_spike' | 'temp_high' | 'inactive'
interface Anomaly { id: string; time: string; location: string; device: string; type: AnomalyType; value: string | number; suggestion: string }

const powerThreshold = 180
const tempThreshold = 70

const telemetry = useTelemetryStore()

const anomalies = computed<Anomaly[]>(() => {
  const list: Anomaly[] = []
  telemetry.rows.forEach(r => {
    if (r.power > telemetry.powerAnomaly) list.push({ id: `P-${r.id}`, time: r.time, location: r.location, device: r.device, type: 'power_spike', value: r.power, suggestion: 'Periksa beban mendadak, audit start/stop besar, cek kualitas suplai.' })
    if (r.temp > telemetry.tempAnomaly) list.push({ id: `T-${r.id}`, time: r.time, location: r.location, device: r.device, type: 'temp_high', value: r.temp, suggestion: 'Cek ventilasi, pendingin, dan pelumasan. Kurangi beban bila perlu.' })
  })
  Object.entries(telemetry.deviceStatuses).forEach(([device, ds]) => {
    if (!ds.active) list.push({ id: `I-${device}`, time: ds.lastActive || '—', location: '—', device, type: 'inactive', value: ds.lastActive || '—', suggestion: 'Jadwalkan inspeksi; verifikasi konektivitas sensor dan status mesin.' })
  })
  return list
})

const summary = computed(() => ({
  powerSpike: anomalies.value.filter(a => a.type==='power_spike').length,
  tempHigh: anomalies.value.filter(a => a.type==='temp_high').length,
  inactive: anomalies.value.filter(a => a.type==='inactive').length,
}))

function statusColor(status: string){
  return status==='Running' ? 'text-green-400' : status==='Fault' ? 'text-red-400' : status==='Maintenance' ? 'text-yellow-300' : 'text-neutral-300'
}

const machineStatus = [
  { name: 'Compressor A', status: 'Running' },
  { name: 'Pump B', status: 'Maintenance' },
  { name: 'Conveyor C', status: 'Idle' },
]

const predictiveList = [
  { machine: 'Compressor A', risk: 72, rul: 18 },
  { machine: 'Pump B', risk: 31, rul: 45 },
]
const recommendations = [ 'Ganti bearing (Compressor A)', 'Cek pelumasan (Pump B)', 'Kalibrasi sensor suhu (Line 2)' ]

const tickets = { open: 5, inProgress: 3, overdue: 1 }
const mttr = 2.4
const mtbf = 86.1
const rootCauses = [
  { cause: 'Overheating', count: 12 },
  { cause: 'Vibration', count: 9 },
  { cause: 'Electrical', count: 7 },
  { cause: 'Alignment', count: 6 },
  { cause: 'Lubrication', count: 5 },
]

const latestAlerts = [
  { id: 'AL-1', time: '10:12', priority: 'HIGH', message: 'Power spike Line 1', ack: false },
  { id: 'AL-2', time: '09:40', priority: 'MED', message: 'Temp high Compressor A', ack: true },
]

// Animations: pulse when metrics increase
const oeePulse = ref(false)
const powerPulse = ref(false)
const tempPulse = ref(false)
const inactivePulse = ref(false)
const prevSummary = ref({ powerSpike: 0, tempHigh: 0, inactive: 0 })

function trigger(flag: { value: boolean }, duration = 800){
  flag.value = true
  setTimeout(() => { flag.value = false }, duration)
}

watch(summary, (curr) => {
  if (curr.powerSpike > prevSummary.value.powerSpike) trigger(powerPulse)
  if (curr.tempHigh > prevSummary.value.tempHigh) trigger(tempPulse)
  if (curr.inactive > prevSummary.value.inactive) trigger(inactivePulse)
  prevSummary.value = { ...curr }
}, { immediate: true })

onMounted(() => {
  trigger(oeePulse, 1200)
})

// Sparkline datasets
const sparkOptions = { responsive: true, plugins: { legend: { display: false }, tooltip: { enabled: false } }, elements: { point: { radius: 0 } }, scales: { x: { display: false }, y: { display: false } } }
const oeeSparkData = computed(() => ({ labels: Array.from({ length: 12 }).map((_,i)=>String(i)), datasets: [{ data: [72,74,73,75,76,77,78,79,78,80,79, kpis.oee], borderColor: '#a78bfa' }] }))
const energySparkData = computed(() => ({ labels: Array.from({ length: 12 }).map((_,i)=>String(i)), datasets: [{ data: [11000,11250,11500,11700,11900,12100,12200,12350,12400,12420,12430, kpis.energyMonthly], borderColor: '#60a5fa' }] }))

function percentDelta(curr: number, previous: number){
  if (!previous) return 0
  return ((curr - previous) / previous) * 100
}
function arrow(pct: number){
  return pct >= 0 ? '▲' : '▼'
}
function deltaClass(pct: number, inverse = false){
  const positive = inverse ? pct < 0 : pct >= 0
  return positive ? 'text-green-400' : 'text-red-400'
}

// Fixed anomaly card values per request
const anomalyCards = reactive({ powerSpike: 376, tempHigh: 0, inactive: 0 })
</script>

<style scoped>
</style>


