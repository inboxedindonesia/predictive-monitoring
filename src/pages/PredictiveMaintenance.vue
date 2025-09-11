<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-semibold">Predictive Maintenance</h1>
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 overflow-auto">
      <table class="w-full text-sm min-w-[900px]">
        <thead class="text-neutral-400">
          <tr>
            <th class="text-left py-2">Machine</th>
            <th class="text-left py-2">Failure Risk</th>
            <th class="text-left py-2">Next Maintenance</th>
            <th class="text-left py-2">Reminder</th>
            <th class="text-left py-2">Action Status</th>
            <th class="text-left py-2">Recommendation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i,idx) in items" :key="i.machine">
            <td class="py-1">{{ i.machine }}</td>
            <td class="py-1" :class="i.failureRisk>0.6?'text-red-400':'text-green-400'">{{ (i.failureRisk*100).toFixed(0) }}%</td>
            <td class="py-1">{{ i.nextMaintenance }}</td>
            <td class="py-1">{{ i.reminder }}</td>
            <td class="py-1 capitalize">{{ i.actionStatus }}</td>
            <td class="py-1">{{ i.recommendation }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
type ActionStatus = 'pending'|'scheduled'|'done'
interface Item { machine: string; failureRisk: number; nextMaintenance: string; reminder: string; actionStatus: ActionStatus; recommendation: string }
const items: Item[] = [
  { machine: 'Compressor A', failureRisk: 0.72, nextMaintenance: '2025-09-20', reminder: '2025-09-18', actionStatus: 'scheduled', recommendation: 'Check bearing vibration' },
  { machine: 'Pump B', failureRisk: 0.31, nextMaintenance: '2025-10-05', reminder: '2025-10-02', actionStatus: 'pending', recommendation: 'Inspect seal and alignment' },
]
</script>

<style scoped>
</style>


