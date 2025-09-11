<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const name = ref('')
const role = ref<'Admin' | 'Supervisor' | 'Engineer' | 'Viewer'>('Viewer')

function handleLogin() {
  userStore.login(name.value || 'User', role.value)
  const redirect = (route.query.redirect as string) || '/cms'
  router.replace(redirect)
}
</script>

<template>
  <div class="min-h-dvh flex items-center justify-center p-6">
    <div class="w-full max-w-md bg-neutral-900/70 border border-white/10 rounded-xl p-6 space-y-4">
      <h1 class="text-xl font-semibold">Login</h1>
      <div class="space-y-2">
        <label class="text-sm text-neutral-300">Name</label>
        <input v-model="name" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2" placeholder="John Doe" />
      </div>
      <div class="space-y-2">
        <label class="text-sm text-neutral-300">Role</label>
        <select v-model="role" class="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2">
          <option>Admin</option>
          <option>Supervisor</option>
          <option>Engineer</option>
          <option>Viewer</option>
        </select>
      </div>
      <button class="w-full bg-indigo-600 hover:bg-indigo-500 rounded px-4 py-2" @click="handleLogin">Login</button>
    </div>
  </div>
  
</template>

<style scoped>
</style>


