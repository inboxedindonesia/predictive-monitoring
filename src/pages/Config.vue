<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-semibold">System Configuration</h1>
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 space-y-4">
      <div>
        <div class="text-sm text-neutral-300 mb-2">Thresholds</div>
        <form class="grid md:grid-cols-4 gap-2 items-end" @submit.prevent>
          <div>
            <label class="text-xs text-neutral-400">Power max (kW)</label>
            <input v-model.number="thresholds.powerMax" type="number" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
          </div>
          <div>
            <label class="text-xs text-neutral-400">Temp max (°C)</label>
            <input v-model.number="thresholds.tempMax" type="number" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
          </div>
        </form>
      </div>
      <div>
        <div class="text-sm text-neutral-300 mb-2">Locations</div>
        <form class="flex gap-2 items-end" @submit.prevent="addLocation">
          <input v-model="newLocation" placeholder="Line 3" class="bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
          <button class="px-3 py-2 bg-indigo-600 rounded" type="submit">Add</button>
        </form>
        <ul class="list-disc pl-5 text-sm mt-2">
          <li v-for="(l,idx) in locations" :key="l.id" class="flex items-center gap-2">
            <span class="flex-1">{{ l.name }}</span>
            <button class="px-2 py-1 bg-red-600 rounded" @click="removeLocation(idx)">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
const thresholds = reactive({ powerMax: 180, tempMax: 70 })
const locations = reactive([ { id: 'L1', name: 'Line 1' }, { id: 'L2', name: 'Line 2' } ])
const newLocation = ref('')
function addLocation(){ if(!newLocation.value) return; const id = `L${locations.length+1}`; locations.push({ id, name: newLocation.value }); newLocation.value = '' }
function removeLocation(idx:number){ locations.splice(idx,1) }
</script>

<style scoped>
</style>


