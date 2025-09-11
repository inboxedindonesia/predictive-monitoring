<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-semibold">User & Role Management</h1>
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 space-y-3">
      <form class="grid md:grid-cols-4 gap-2 items-end" @submit.prevent="saveUser">
        <div>
          <label class="text-xs text-neutral-400">ID</label>
          <input v-model="form.id" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
        </div>
        <div>
          <label class="text-xs text-neutral-400">Name</label>
          <input v-model="form.name" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" />
        </div>
        <div>
          <label class="text-xs text-neutral-400">Role</label>
          <select v-model="form.role" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2">
            <option>Admin</option>
            <option>Supervisor</option>
            <option>Engineer</option>
            <option>Viewer</option>
          </select>
        </div>
        <div class="flex gap-2">
          <button class="px-4 py-2 bg-indigo-600 rounded" type="submit">{{ editingIndex===-1?'Add':'Update' }}</button>
          <button class="px-4 py-2 bg-neutral-800 rounded" type="button" @click="resetForm">Clear</button>
        </div>
      </form>
      <div class="overflow-auto">
        <table class="w-full text-sm min-w-[600px]">
          <thead class="text-neutral-400">
            <tr>
              <th class="text-left py-2">ID</th>
              <th class="text-left py-2">Name</th>
              <th class="text-left py-2">Role</th>
              <th class="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(u,idx) in users" :key="u.id">
              <td class="py-1">{{ u.id }}</td>
              <td class="py-1">{{ u.name }}</td>
              <td class="py-1">{{ u.role }}</td>
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
type Role = 'Admin'|'Supervisor'|'Engineer'|'Viewer'
interface User { id: string; name: string; role: Role }
const users = ref<User[]>([
  { id: 'U-1', name: 'Alice', role: 'Admin' },
  { id: 'U-2', name: 'Bob', role: 'Engineer' },
  { id: 'U-3', name: 'Carol', role: 'Supervisor' },
])

const form = reactive<User>({ id: '', name: '', role: 'Viewer' })
const editingIndex = ref(-1)

function resetForm(){ form.id=''; form.name=''; form.role='Viewer'; editingIndex.value=-1 }
function saveUser(){ if(editingIndex.value===-1){ users.value.push({ ...form }) } else { users.value[editingIndex.value] = { ...form } } resetForm() }
function edit(idx:number){ Object.assign(form, users.value[idx]); editingIndex.value = idx }
function remove(idx:number){ users.value.splice(idx,1) }
</script>

<style scoped>
</style>


