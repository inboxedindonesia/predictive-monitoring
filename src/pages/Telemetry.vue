<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-semibold">Telemetry Monitoring</h1>

    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 space-y-3">
      <div class="flex flex-wrap gap-3 items-end">
        <div>
          <label class="text-xs text-neutral-400">Location</label>
          <select v-model="selectedLocation" class="bg-neutral-900 border border-neutral-700 rounded px-3 py-2">
            <option value="">All</option>
            <option v-for="l in locations" :key="l" :value="l">{{ l }}</option>
          </select>
        </div>
        <div>
          <label class="text-xs text-neutral-400">Update Interval</label>
          <select v-model.number="updateIntervalSec" class="bg-neutral-900 border border-neutral-700 rounded px-3 py-2">
            <option :value="0">Manual</option>
            <option :value="5">5s</option>
            <option :value="30">30s</option>
            <option :value="60">1m</option>
          </select>
        </div>
        <button class="px-3 py-2 bg-neutral-800 rounded" @click="manualRefresh">Refresh</button>
        <div class="text-sm" v-if="anomalies.length">
          <span class="px-2 py-1 rounded bg-red-900/50 border border-red-700 text-red-200">{{ anomalies.length }} anomaly detected</span>
        </div>
        <div class="ml-auto text-xs text-neutral-400">
          Device status: 
          <span v-for="(sts,dev) in deviceStatuses" :key="dev" class="inline-flex items-center gap-1 ml-2">
            <span class="opacity-80">{{ dev }}</span>
            <span :class="sts.active?'text-green-400': sts.lastActive ? 'text-yellow-300' : 'text-red-400'">{{ sts.active ? 'Normal' : (sts.lastActive ? 'Warning' : 'Fault') }}</span>
            <button class="px-2 py-0.5 bg-neutral-800 rounded" @click="toggleDevice(dev)">{{ sts.active ? 'Set Inactive' : 'Set Active' }}</button>
          </span>
        </div>
      </div>

      <form class="grid md:grid-cols-5 gap-2 items-end" @submit.prevent="addRecord">
        <div>
          <label class="text-xs text-neutral-400">Time</label>
          <input v-model="form.time" placeholder="11:00" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
        </div>
        <div>
          <label class="text-xs text-neutral-400">Location</label>
          <input v-model="form.location" placeholder="Line 1" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
        </div>
        <div>
          <label class="text-xs text-neutral-400">Device</label>
          <input v-model="form.device" placeholder="Line1-Main" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
        </div>
        <div>
          <label class="text-xs text-neutral-400">Power (kW)</label>
          <input v-model.number="form.power" type="number" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
        </div>
        <div>
          <label class="text-xs text-neutral-400">Temp (°C)</label>
          <input v-model.number="form.temp" type="number" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
        </div>
        <div class="md:col-span-5">
          <button class="px-4 py-2 bg-indigo-600 rounded" type="submit">Add Record</button>
        </div>
      </form>
    </div>

    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 space-y-3">
      <div class="flex flex-wrap gap-3 items-end">
        <div>
          <label class="text-xs text-neutral-400">Time Range</label>
          <select v-model="timeRange" class="bg-neutral-900 border border-neutral-700 rounded px-3 py-2">
            <option value="1h">Last hour</option>
            <option value="24h">Last 24h</option>
            <option value="7d">Weekly</option>
            <option value="30d">Monthly</option>
          </select>
        </div>
        <div class="flex items-end gap-2">
          <div>
            <label class="text-xs text-neutral-400">Compare A</label>
            <select v-model="compareA" class="bg-neutral-900 border border-neutral-700 rounded px-3 py-2">
              <option value="">None</option>
              <option v-for="d in devices" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>
          <div>
            <label class="text-xs text-neutral-400">Compare B</label>
            <select v-model="compareB" class="bg-neutral-900 border border-neutral-700 rounded px-3 py-2">
              <option value="">None</option>
              <option v-for="d in devices" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>
        </div>
        <div class="flex items-center gap-3 ml-auto text-xs">
          <label class="inline-flex items-center gap-1"><input type="checkbox" v-model="showPower" /> Power</label>
          <label class="inline-flex items-center gap-1"><input type="checkbox" v-model="showTemp" /> Temp</label>
        </div>
      </div>
      <Line :data="chartData" :options="chartOptions" />
    </div>

    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 overflow-auto">
      <table class="w-full text-sm min-w-[1000px]">
        <thead class="text-neutral-400">
          <tr>
            <th class="text-left py-2">Time</th>
            <th class="text-left py-2">Location</th>
            <th class="text-left py-2">Device</th>
            <th class="text-left py-2">Power (kW)</th>
            <th class="text-left py-2">Temp (°C)</th>
            <th class="text-left py-2">Status</th>
            <th class="text-left py-2">Last Active</th>
            <th class="text-left py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in filteredRows" :key="r.id" :class="r.power>powerAnomaly ? 'bg-red-950/40' : ''">
            <td class="py-1">{{ r.time }}</td>
            <td class="py-1">{{ r.location }}</td>
            <td class="py-1">{{ r.device }}</td>
            <td class="py-1">{{ r.power }}</td>
            <td class="py-1">{{ r.temp }}</td>
            <td class="py-1">
              <span :class="deviceStatuses[r.device]?.active ? 'text-green-400' : 'text-neutral-400'">
                {{ deviceStatuses[r.device]?.active ? 'active' : 'not active' }}
              </span>
            </td>
            <td class="py-1">{{ deviceStatuses[r.device]?.active ? '—' : (deviceStatuses[r.device]?.lastActive || '—') }}</td>
            <td class="py-1">
              <RouterLink to="/cms/tickets" class="px-2 py-1 bg-neutral-800 rounded">Create Ticket</RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-xs text-neutral-400 mt-2">Rows merah = anomali (power > {{ powerAnomaly }} kW).</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted, watch } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  LineElement, PointElement,
  CategoryScale, LinearScale,
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

import { useTelemetryStore } from '../stores/telemetry'
import { exportToExcel, exportToPDF } from '../utils/export'
interface Row { id: number; time: string; location: string; device: string; power: number; temp: number }
const telemetry = useTelemetryStore()
const rows = computed<Row[]>(() => telemetry.rows)

const deviceStatuses = telemetry.deviceStatuses
const markActive = telemetry.markActive
const toggleDevice = (device: string) => telemetry.toggleDevice(device)

const locations = computed(() => Array.from(new Set(rows.value.map(r => r.location))))
const selectedLocation = ref('')
const devices = computed(() => Array.from(new Set(rows.value.map(r => r.device))))
const timeRange = ref<'1h'|'24h'|'7d'|'30d'>('24h')
const compareA = ref('')
const compareB = ref('')
const showPower = ref(true)
const showTemp = ref(true)
const updateIntervalSec = ref<number>(5)
const powerAnomaly = 180
const anomalies = computed(() => rows.value.filter(r => r.power > powerAnomaly))
const filteredRows = computed(() => selectedLocation.value ? rows.value.filter(r => r.location===selectedLocation.value) : rows.value)

const form = reactive<Row>({ id: 0, time: '', location: '', device: '', power: 0, temp: 0 })
function addRecord(){
  telemetry.addRow({ time: form.time || '—', location: form.location || '—', device: form.device || '—', power: form.power, temp: form.temp })
  form.id=0; form.time=''; form.location=''; form.device=''; form.power=0; form.temp=0
}

const chartData = computed(() => {
  const labels = rows.value.map(r => r.time)
  const datasets: any[] = []
  if (showPower.value) datasets.push({ label: compareA.value? `Power ${compareA.value}` : 'Power (kW)', data: rows.value.filter(r => !compareA.value || r.device===compareA.value).map(r => r.power), borderColor: '#60a5fa', backgroundColor: 'rgba(96,165,250,.2)', tension: 0.3 })
  if (compareB.value && showPower.value) datasets.push({ label: `Power ${compareB.value}`, data: rows.value.filter(r => r.device===compareB.value).map(r => r.power), borderColor: '#22d3ee', backgroundColor: 'rgba(34,211,238,.2)', tension: 0.3 })
  if (showTemp.value) datasets.push({ label: compareA.value? `Temp ${compareA.value}` : 'Temp (°C)', data: rows.value.filter(r => !compareA.value || r.device===compareA.value).map(r => r.temp), borderColor: '#f472b6', backgroundColor: 'rgba(244,114,182,.2)', tension: 0.3, yAxisID: 'y1' })
  if (compareB.value && showTemp.value) datasets.push({ label: `Temp ${compareB.value}`, data: rows.value.filter(r => r.device===compareB.value).map(r => r.temp), borderColor: '#a78bfa', backgroundColor: 'rgba(167,139,250,.2)', tension: 0.3, yAxisID: 'y1' })
  return { labels, datasets }
})
const chartOptions = { responsive: true, interaction: { mode: 'index', intersect: false }, stacked: false, scales: { y: { type: 'linear', position: 'left' }, y1: { type: 'linear', position: 'right', grid: { drawOnChartArea: false } } } }

onMounted(() => {
  // Mock IoT stream: push a new point every 5s
  setInterval(() => {
    const id = (rows.value.at(-1)?.id || 0) + 1
    const hour = String((8 + id) % 24).padStart(2, '0')
    const power = 100 + Math.round(Math.random() * 120)
    const temp = 25 + Math.round(Math.random() * 10)
    const device = id % 2 ? 'Line1-Main' : 'Line2-Pump'
    const time = `${hour}:00`
    telemetry.addRow({ time, location: ['Line 1','Line 2'][id % 2], device, power, temp })
  }, 5000)
  telemetry.initStatusesFromRows()
})

let timer: number | undefined
watch(updateIntervalSec, (sec) => {
  if (timer) window.clearInterval(timer)
  if (sec > 0) timer = window.setInterval(() => manualRefresh(), sec * 1000)
}, { immediate: true })
function manualRefresh(){ /* placeholder for fetch */ }
</script>

<style scoped>
</style>


