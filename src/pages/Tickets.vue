<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-semibold">Maintenance Ticketing</h1>
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 space-y-3">
      <form class="grid md:grid-cols-5 gap-2 items-end" @submit.prevent="saveTicket">
        <div>
          <label class="text-xs text-neutral-400">Ticket</label>
          <input v-model="form.id" required class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
        </div>
        <div class="md:col-span-2">
          <label class="text-xs text-neutral-400">Title</label>
          <input v-model="form.title" required class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
        </div>
        <div>
          <label class="text-xs text-neutral-400">Assignee</label>
          <input v-model="form.assignee" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
        </div>
        <div>
          <label class="text-xs text-neutral-400">Status</label>
          <select v-model="form.status" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2">
            <option>open</option>
            <option>in_progress</option>
            <option>resolved</option>
          </select>
        </div>
        <div>
          <label class="text-xs text-neutral-400">Created</label>
          <input v-model="form.createdAt" type="date" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
        </div>
        <div class="md:col-span-5 flex gap-2">
          <button class="px-4 py-2 bg-indigo-600 rounded" type="submit">{{ editingIndex===-1?'Add':'Update' }}</button>
          <button class="px-4 py-2 bg-neutral-800 rounded" type="button" @click="resetForm">Clear</button>
        </div>
      </form>
      <div class="overflow-auto">
        <table class="w-full text-sm min-w-[900px]">
          <thead class="text-neutral-400">
            <tr>
              <th class="text-left py-2">Ticket</th>
              <th class="text-left py-2">Title</th>
              <th class="text-left py-2">Assignee</th>
              <th class="text-left py-2">Status</th>
              <th class="text-left py-2">Created</th>
              <th class="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(t,idx) in tickets" :key="t.id">
              <td class="py-1">{{ t.id }}</td>
              <td class="py-1">{{ t.title }}</td>
              <td class="py-1">{{ t.assignee }}</td>
              <td class="py-1 capitalize">{{ t.status.replace('_',' ') }}</td>
              <td class="py-1">{{ t.createdAt }}</td>
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
type Status = 'open'|'in_progress'|'resolved'
interface Ticket { id: string; title: string; assignee: string; status: Status; createdAt: string }
const tickets = ref<Ticket[]>([
  { id: 'T-1001', title: 'Vibration high on Compressor A', assignee: 'Engineer 1', status: 'open', createdAt: '2025-09-10' },
  { id: 'T-1002', title: 'Pump B leak detected', assignee: 'Engineer 2', status: 'in_progress', createdAt: '2025-09-09' },
])

const form = reactive<Ticket>({ id: '', title: '', assignee: '', status: 'open', createdAt: '' })
const editingIndex = ref(-1)

function resetForm(){ form.id=''; form.title=''; form.assignee=''; form.status='open'; form.createdAt=''; editingIndex.value=-1 }
function saveTicket(){
  if(editingIndex.value===-1){ tickets.value.push({ ...form }) } else { tickets.value[editingIndex.value] = { ...form } }
  resetForm()
}
function edit(idx:number){ Object.assign(form, tickets.value[idx]); editingIndex.value = idx }
function remove(idx:number){ tickets.value.splice(idx,1) }
</script>

<style scoped>
</style>


