<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-semibold">Energy & Utility Cost Estimation</h1>
    <div class="grid md:grid-cols-4 gap-4">
      <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
        <div class="text-neutral-400 text-sm">Energy (kWh today)</div>
        <div class="text-3xl font-semibold">{{ usageKwh }}</div>
      </div>
      <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
        <div class="text-neutral-400 text-sm">Target (kWh today)</div>
        <div class="text-3xl font-semibold">{{ targetKwh }}</div>
      </div>
      <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
        <div class="text-neutral-400 text-sm">Efficiency</div>
        <div class="text-3xl font-semibold" :class="efficiency>=100?'text-green-400':'text-yellow-300'">{{ efficiency.toFixed(1) }}%</div>
      </div>
      <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
        <div class="text-neutral-400 text-sm">Est. Cost (USD)</div>
        <div class="text-3xl font-semibold">${{ energyCost.toFixed(2) }}</div>
      </div>
    </div>

    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
      <h2 class="font-medium mb-2">Parameters</h2>
      <form class="grid md:grid-cols-4 gap-2 items-end" @submit.prevent>
        <div>
          <label class="text-xs text-neutral-400">Usage kWh</label>
          <input v-model.number="usageKwh" type="number" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
        </div>
        <div>
          <label class="text-xs text-neutral-400">Target kWh</label>
          <input v-model.number="targetKwh" type="number" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
        </div>
        <div>
          <label class="text-xs text-neutral-400">Tariff $/kWh</label>
          <input v-model.number="tariffPerKwh" type="number" step="0.01" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const usageKwh = ref(1245)
const targetKwh = ref(1300)
const tariffPerKwh = ref(0.12)
const energyCost = computed(() => usageKwh.value * tariffPerKwh.value)
const efficiency = computed(() => targetKwh.value ? (usageKwh.value / targetKwh.value) * 100 : 0)
</script>

<style scoped>
</style>


