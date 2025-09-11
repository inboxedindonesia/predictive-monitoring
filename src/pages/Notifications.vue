<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-semibold">Notification & Alerts</h1>
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 space-y-3">
      <form class="grid md:grid-cols-4 gap-2 items-end" @submit.prevent="send">
        <div>
          <label class="text-xs text-neutral-400">Time</label>
          <input v-model="form.time" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" placeholder="12:00" />
        </div>
        <div class="md:col-span-2">
          <label class="text-xs text-neutral-400">Message</label>
          <input v-model="form.message" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" placeholder="Temp high on Line 3" />
        </div>
        <div>
          <label class="text-xs text-neutral-400">Severity</label>
          <select v-model="form.severity" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2">
            <option>info</option>
            <option>warning</option>
            <option>critical</option>
          </select>
        </div>
        <div class="md:col-span-4">
          <button class="px-4 py-2 bg-indigo-600 rounded" type="submit">Send</button>
        </div>
      </form>
      <div>
        <p class="text-sm text-neutral-300">Recent notifications</p>
        <ul class="text-sm list-disc pl-5 mt-2 text-neutral-300">
          <li v-for="n in notifications" :key="n.id">{{ n.time }} - {{ n.message }} <span class="uppercase text-xs opacity-70">({{ n.severity }})</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
interface Notif { id: string; time: string; message: string; severity: 'info'|'warning'|'critical' }
const notifications = ref<Notif[]>([
  { id: 'N-1', time: '08:12', message: 'Temp high on Line 2', severity: 'warning' },
  { id: 'N-2', time: '10:45', message: 'Machine idle > 30 min (Pump B)', severity: 'info' },
])
const form = reactive<Notif>({ id: '', time: '', message: '', severity: 'info' })
function send(){ const id = `N-${notifications.value.length+1}`; notifications.value.unshift({ id, time: form.time || '—', message: form.message || '—', severity: form.severity }); form.id=''; form.time=''; form.message=''; form.severity='info' }
</script>

<style scoped>
</style>


