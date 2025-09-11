<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-semibold">Predictive Maintenance</h1>

    <!-- Machine Health Overview -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
      <h2 class="text-lg font-semibold mb-2">Machine Health Overview</h2>
      <table class="w-full text-sm min-w-[900px]">
        <thead class="text-neutral-400">
          <tr>
            <th class="text-left py-2">Machine</th>
            <th class="text-left py-2">Health Score</th>
            <th class="text-left py-2">Status</th>
            <th class="text-left py-2">RUL</th>
            <th class="text-left py-2">Failure Probability</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in items" :key="i.machine">
            <td class="py-1">{{ i.machine }}</td>
            <td class="py-1">{{ (i.healthScore*100).toFixed(0) }}%</td>
            <td class="py-1" :class="statusColor(i.status)">{{ i.status }}</td>
            <td class="py-1">{{ i.rul }} hrs</td>
            <td class="py-1" :class="i.failureProbability>0.6?'text-red-400':'text-green-400'">{{ (i.failureProbability*100).toFixed(0) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Failure Prediction Dashboard -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
      <h2 class="text-lg font-semibold mb-2">Failure Prediction Dashboard</h2>
      <ul class="list-disc pl-6 text-sm space-y-1">
        <li v-for="m in highRiskMachines" :key="m.machine" class="text-red-400">⚠ {{ m.machine }} - High Risk</li>
      </ul>
      <div class="mt-4">
        <h3 class="text-base font-medium">Trend Prediction</h3>
        <div class="bg-neutral-900 rounded-xl h-40 flex items-center justify-center text-neutral-500">[Grafik Prediksi Parameter Kunci]</div>
      </div>
      <div class="mt-4">
        <h3 class="text-base font-medium">Root Cause Analysis</h3>
        <ul class="list-disc pl-6 text-sm space-y-1">
          <li v-for="cause in rootCauses" :key="cause">{{ cause }}</li>
        </ul>
      </div>
      <div class="mt-4">
        <h3 class="text-base font-medium">Heatmap Area Produksi</h3>
        <div class="bg-neutral-900 rounded-xl h-40 flex items-center justify-center text-neutral-500">[Heatmap Area Produksi]</div>
      </div>
    </div>

    <!-- Maintenance Recommendations -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
      <h2 class="text-lg font-semibold mb-2">Maintenance Recommendations</h2>
      <table class="w-full text-sm">
        <thead class="text-neutral-400">
          <tr>
            <th class="text-left py-2">Recommendation</th>
            <th class="text-left py-2">Priority</th>
            <th class="text-left py-2">Spare Parts</th>
            <th class="text-left py-2">Estimated Downtime</th>
            <th class="text-left py-2">Cost Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rec in recommendations" :key="rec.action">
            <td class="py-1">{{ rec.action }}</td>
            <td class="py-1" :class="priorityColor(rec.priority)">{{ rec.priority }}</td>
            <td class="py-1">{{ rec.spareParts.join(', ') }}</td>
            <td class="py-1">{{ rec.downtime }} hrs</td>
            <td class="py-1">${{ rec.costImpact }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Maintenance Schedule & Planning -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
      <h2 class="text-lg font-semibold mb-2">Maintenance Schedule & Planning</h2>
      <div class="bg-neutral-900 rounded-xl h-40 flex items-center justify-center text-neutral-500">[Calendar View]</div>
      <p class="text-sm mt-2">Auto-scheduling aktif untuk job dengan prediksi kerusakan.</p>
    </div>

    <!-- Historical Analysis -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
      <h2 class="text-lg font-semibold mb-2">Historical Analysis & Continuous Improvement</h2>
      <ul class="list-disc pl-6 text-sm space-y-1">
        <li>Prediksi vs Realisasi - validasi akurasi model</li>
        <li>Trend MTBF/MTTR</li>
        <li>Cost Savings Report</li>
        <li>Pareto Analysis</li>
      </ul>
    </div>

    <!-- Alerts -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
      <h2 class="text-lg font-semibold mb-2">Alert & Notification Center</h2>
      <ul class="list-disc pl-6 text-sm space-y-1">
        <li>Early Warning Alerts</li>
        <li>Escalation Workflow</li>
        <li>Multi-Channel Notification</li>
      </ul>
    </div>

    <!-- Reporting -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
      <h2 class="text-lg font-semibold mb-2">Reporting & KPI</h2>
      <ul class="list-disc pl-6 text-sm space-y-1">
        <li>KPI Maintenance: MTBF, MTTR</li>
        <li>Impact Dashboard</li>
        <li>Export & Share to PDF/Excel</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
type MachineStatus = 'Normal' | 'Warning' | 'Critical'
interface Item {
  machine: string;
  healthScore: number;
  status: MachineStatus;
  rul: number;
  failureProbability: number;
}
interface Recommendation {
  action: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  spareParts: string[];
  downtime: number;
  costImpact: number;
}

const items: Item[] = [
  { machine: 'Compressor A', healthScore: 0.65, status: 'Warning', rul: 120, failureProbability: 0.72 },
  { machine: 'Pump B', healthScore: 0.85, status: 'Normal', rul: 300, failureProbability: 0.31 },
]

const highRiskMachines = items.filter(i => i.failureProbability > 0.6)
const rootCauses = ['Bearing wear on Compressor A', 'High temperature on Pump B']

const recommendations: Recommendation[] = [
  { action: 'Replace bearing', priority: 'Critical', spareParts: ['Bearing Set'], downtime: 2, costImpact: 500 },
  { action: 'Check alignment', priority: 'Medium', spareParts: ['Alignment Tool'], downtime: 1, costImpact: 200 },
]

function statusColor(status: MachineStatus) {
  if (status === 'Normal') return 'text-green-400'
  if (status === 'Warning') return 'text-yellow-400'
  return 'text-red-400'
}
function priorityColor(priority: string) {
  if (priority === 'Critical') return 'text-red-400'
  if (priority === 'High') return 'text-orange-400'
  if (priority === 'Medium') return 'text-yellow-400'
  return 'text-green-400'
}
</script>

<style scoped>
</style>
