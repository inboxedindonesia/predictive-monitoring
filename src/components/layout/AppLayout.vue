<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { ref } from 'vue'

const user = useUserStore()
const router = useRouter()
const collapsed = ref(false)

function logout() {
  user.logout()
  router.push('/login')
}

function toggleSidebar() { collapsed.value = !collapsed.value }
</script>

<template>
  <div :class="['min-h-dvh grid grid-rows-[56px_1fr]', collapsed ? 'grid-cols-[72px_1fr]' : 'grid-cols-[240px_1fr]']">
    <aside class="row-span-2 bg-neutral-950/80 border-r border-neutral-800 p-4 space-y-2">
      <div class="flex items-center gap-2 mb-4">
        <div class="flex items-center justify-center h-8 w-8 rounded bg-indigo-600 font-semibold">PM</div>
        <div v-if="!collapsed" class="text-xl font-semibold">Predictive CMS</div>
      </div>
      <nav class="flex flex-col gap-1 text-sm">
        <RouterLink to="/cms" class="px-3 py-2 rounded hover:bg-neutral-800 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z"/></svg>
          <span v-if="!collapsed">Dashboard</span>
        </RouterLink>
        <RouterLink to="/cms/predictive" class="px-3 py-2 rounded hover:bg-neutral-800 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11 7h2v10h-2V7Zm-6 6h2v4H5v-4Zm12-10h2v14h-2V3Z"/></svg>
          <span v-if="!collapsed">Predictive Maintenance</span>
        </RouterLink>
        <RouterLink to="/cms/energy" class="px-3 py-2 rounded hover:bg-neutral-800 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/></svg>
          <span v-if="!collapsed">Energy & Utility Cost</span>
        </RouterLink>
        <RouterLink to="/cms/assets" class="px-3 py-2 rounded hover:bg-neutral-800 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v6H4V4Zm0 8h10v8H4v-8Zm12 0h4v8h-4v-8Z"/></svg>
          <span v-if="!collapsed">Asset & Machine Mgmt</span>
        </RouterLink>
        <RouterLink to="/cms/tickets" class="px-3 py-2 rounded hover:bg-neutral-800 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 7h18v4a2 2 0 1 0 0 4v4H3v-4a2 2 0 1 0 0-4V7Z"/></svg>
          <span v-if="!collapsed">Maintenance Ticketing</span>
        </RouterLink>
        <RouterLink to="/cms/users" class="px-3 py-2 rounded hover:bg-neutral-800 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.69-8 6v2h16v-2c0-3.31-3.58-6-8-6Z"/></svg>
          <span v-if="!collapsed">User & Role Mgmt</span>
        </RouterLink>
        <RouterLink to="/cms/reports" class="px-3 py-2 rounded hover:bg-neutral-800 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3h10l4 4v14H5V3Zm10 1.5V8h3.5L15 4.5Z"/></svg>
          <span v-if="!collapsed">Reporting & Analytics</span>
        </RouterLink>
        <RouterLink to="/cms/notifications" class="px-3 py-2 rounded hover:bg-neutral-800 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5L4 18v2h16v-2l-2-2Z"/></svg>
          <span v-if="!collapsed">Notification & Alert</span>
        </RouterLink>
        <RouterLink to="/cms/config" class="px-3 py-2 rounded hover:bg-neutral-800 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8a4 4 0 1 1-4 4 4 4 0 0 1 4-4Zm8.94 5a7.94 7.94 0 0 0 0-2l2.06-1.58-2-3.46L18.9 6a8.12 8.12 0 0 0-1.73-1L16.8 2h-3.6l-.37 3a8.12 8.12 0 0 0-1.63.94L8.1 4.54l-3.46 2 1.58 2.06a7.94 7.94 0 0 0 0 2L4.64 13.7l2 3.46L8.9 16a8.12 8.12 0 0 0 1.73 1l.37 3h3.6l.37-3a8.12 8.12 0 0 0 1.73-1l2.26 1.16 2-3.46Z"/></svg>
          <span v-if="!collapsed">System Configuration</span>
        </RouterLink>
      </nav>
    </aside>
    <header class="flex items-center justify-between px-4 border-b border-neutral-800 bg-neutral-900/60">
      <div class="flex items-center gap-2">
        <button class="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700" @click="toggleSidebar" :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4V6Zm0 5h10v2H4v-2Zm0 5h16v2H4v-2Z"/></svg>
        </button>
        <div class="text-sm text-neutral-300">{{ user.name || 'Guest' }} ({{ user.role }})</div>
      </div>
      <div>
        <button v-if="user.isAuthenticated" class="px-3 py-1.5 bg-neutral-800 rounded" @click="logout">Logout</button>
        <button v-else class="px-3 py-1.5 bg-indigo-600 rounded" @click="router.push('/login')">Login</button>
      </div>
    </header>
    <main class="p-4 overflow-auto">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
</style>


