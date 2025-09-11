<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-semibold">Reporting & Analytics</h1>
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 space-y-3">
      <div class="flex gap-2">
        <button class="px-3 py-2 bg-neutral-800 rounded" @click="downloadExcel">Export Excel</button>
        <button class="px-3 py-2 bg-neutral-800 rounded" @click="downloadPDF">Export PDF</button>
      </div>
      <div class="text-sm text-neutral-300">
        <div>Monthly Energy Report (kWh): 37,200</div>
        <div>Water Consumption (m³): 2,580</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { exportToExcel, exportToPDF } from '../utils/export'
const rows = [
  { metric: 'Monthly Energy (kWh)', value: 37200 },
  { metric: 'Water Consumption (m³)', value: 2580 },
]
function downloadExcel(){ exportToExcel('report', rows) }
function downloadPDF(){ exportToPDF('report', ['Metric','Value'], rows.map(r => [r.metric, String(r.value)])) }
</script>

<style scoped>
</style>


