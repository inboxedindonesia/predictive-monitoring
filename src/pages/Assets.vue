<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-semibold">Asset & Machine Management</h1>
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 space-y-3">
      <form class="grid md:grid-cols-6 gap-2 items-end" @submit.prevent="saveAsset">
        <div class="md:col-span-2">
          <label class="text-xs text-neutral-400">ID</label>
          <input v-model="form.id" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" required />
        </div>
        <div class="md:col-span-2">
          <label class="text-xs text-neutral-400">Name</label>
          <input v-model="form.name" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" required />
        </div>
        <div>
          <label class="text-xs text-neutral-400">Type</label>
          <input v-model="form.type" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
        </div>
        <div>
          <label class="text-xs text-neutral-400">Location</label>
          <input v-model="form.location" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
        </div>
        <div>
          <label class="text-xs text-neutral-400">Installed</label>
          <input v-model="form.installedAt" type="date" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
        </div>
        <div>
          <label class="text-xs text-neutral-400">Status</label>
          <select v-model="form.status" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2">
            <option>active</option>
            <option>idle</option>
            <option>maintenance</option>
            <option>retired</option>
          </select>
        </div>
        <div class="md:col-span-6 flex gap-2">
          <button class="px-4 py-2 bg-indigo-600 rounded" type="submit">{{ editingIndex===-1?'Add':'Update' }}</button>
          <button class="px-4 py-2 bg-neutral-800 rounded" type="button" @click="resetForm">Clear</button>
        </div>
      </form>
      <div class="overflow-auto">
        <table class="w-full text-sm min-w-[900px]">
          <thead class="text-neutral-400">
            <tr>
              <th class="text-left py-2">ID</th>
              <th class="text-left py-2">Name</th>
              <th class="text-left py-2">Type</th>
              <th class="text-left py-2">Location</th>
              <th class="text-left py-2">Installed</th>
              <th class="text-left py-2">Status</th>
              <th class="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(a,idx) in assets" :key="a.id">
              <td class="py-1">{{ a.id }}</td>
              <td class="py-1">{{ a.name }}</td>
              <td class="py-1">{{ a.type }}</td>
              <td class="py-1">{{ a.location }}</td>
              <td class="py-1">{{ a.installedAt }}</td>
              <td class="py-1 capitalize">{{ a.status }}</td>
              <td class="py-1 flex gap-2">
                <button class="px-2 py-1 bg-neutral-800 rounded" @click="edit(idx)">Edit</button>
                <button class="px-2 py-1 bg-red-600 rounded" @click="remove(idx)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

interface Asset { id: string; name: string; type: string; location: string; installedAt: string; status: 'active'|'idle'|'maintenance'|'retired' }
const assets = ref<Asset[]>([
  { id: 'M-001', name: 'Compressor A', type: 'Compressor', location: 'Line 1', installedAt: '2023-04-12', status: 'active' },
  { id: 'M-002', name: 'Pump B', type: 'Pump', location: 'Line 2', installedAt: '2022-11-01', status: 'maintenance' },
])

const form = reactive<Asset>({ id: '', name: '', type: '', location: '', installedAt: '', status: 'active' })
const editingIndex = ref(-1)

function resetForm() {
  form.id=''; form.name=''; form.type=''; form.location=''; form.installedAt=''; form.status='active'; editingIndex.value=-1
}
function saveAsset() {
  if (editingIndex.value === -1) {
    assets.value.push({ ...form })
  } else {
    assets.value[editingIndex.value] = { ...form }
  }
  resetForm()
}
function edit(idx: number) {
  const a = assets.value[idx]
  Object.assign(form, a)
  editingIndex.value = idx
}
function remove(idx: number) { assets.value.splice(idx,1) }
</script>

<style scoped>
</style>


