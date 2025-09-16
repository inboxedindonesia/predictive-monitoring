<template>
  <div class="min-h-screen bg-neutral-950 text-white p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">👥 User Management</h1>
      <p class="text-neutral-400">Kelola pengguna, role, dan akses sistem</p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm">Total Users</p>
            <p class="text-2xl font-bold text-white">{{ totalUsers }}</p>
          </div>
          <div class="text-blue-200 text-3xl">👥</div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm">Active Users</p>
            <p class="text-2xl font-bold text-white">{{ activeUsers }}</p>
          </div>
          <div class="text-green-200 text-3xl">✅</div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm">Roles</p>
            <p class="text-2xl font-bold text-white">{{ totalRoles }}</p>
          </div>
          <div class="text-purple-200 text-3xl">🔐</div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-orange-100 text-sm">Online Now</p>
            <p class="text-2xl font-bold text-white">{{ onlineUsers }}</p>
          </div>
          <div class="text-orange-200 text-3xl">🟢</div>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="bg-neutral-900/50 rounded-xl p-1 mb-8">
      <div class="flex flex-wrap gap-1">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            activeTab === tab.id
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          ]"
        >
          {{ tab.icon }} {{ tab.name }}
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="bg-neutral-900/30 rounded-xl p-6">
      <!-- 1. User Management -->
      <div v-if="activeTab === 'users'" class="space-y-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 class="text-xl font-semibold">👥 User Management</h2>
          <div class="flex gap-2">
            <button @click="showCreateModal = true" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
              ➕ Add User
            </button>
            <button @click="showImportModal = true" class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
              📥 Import Users
            </button>
          </div>
        </div>

        <!-- Search & Filter -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <input
              v-model="searchQuery"
              placeholder="🔍 Search users..."
              class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <select v-model="filterRole" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2">
              <option value="">All Roles</option>
              <option v-for="role in roles" :key="role.id" :value="role.name">{{ role.name }}</option>
            </select>
          </div>
          <div>
            <select v-model="filterDepartment" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2">
              <option value="">All Departments</option>
              <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
            </select>
          </div>
          <div>
            <select v-model="filterStatus" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2">
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <!-- Users Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-neutral-800">
              <tr>
                <th class="text-left p-3">Photo</th>
                <th class="text-left p-3">Name</th>
                <th class="text-left p-3">Username</th>
                <th class="text-left p-3">Email</th>
                <th class="text-left p-3">Role</th>
                <th class="text-left p-3">Department</th>
                <th class="text-left p-3">Status</th>
                <th class="text-left p-3">Last Login</th>
                <th class="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id" class="border-b border-neutral-800 hover:bg-neutral-800/50">
                <td class="p-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {{ user.name.charAt(0) }}
                  </div>
                </td>
                <td class="p-3 font-medium">{{ user.name }}</td>
                <td class="p-3 text-neutral-400">{{ user.username }}</td>
                <td class="p-3 text-neutral-400">{{ user.email }}</td>
                <td class="p-3">
                  <span :class="getRoleBadgeClass(user.role)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ user.role }}
                  </span>
                </td>
                <td class="p-3 text-neutral-400">{{ user.department }}</td>
                <td class="p-3">
                  <span :class="user.status === 'Active' ? 'text-green-400' : 'text-red-400'" class="flex items-center gap-1">
                    <div :class="user.status === 'Active' ? 'bg-green-400' : 'bg-red-400'" class="w-2 h-2 rounded-full"></div>
                    {{ user.status }}
                  </span>
                </td>
                <td class="p-3 text-neutral-400">{{ formatDate(user.lastLogin) }}</td>
                <td class="p-3">
                  <div class="flex gap-2">
                    <button @click="editUser(user)" class="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs">Edit</button>
                    <button @click="deleteUser(user.id)" class="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 2. Role & Access Control -->
      <div v-if="activeTab === 'roles'" class="space-y-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 class="text-xl font-semibold">🔐 Role & Access Control</h2>
          <button @click="showRoleModal = true" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
            ➕ Create Role
          </button>
        </div>

        <!-- Roles Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="role in roles" :key="role.id" class="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold">{{ role.name }}</h3>
              <span class="text-2xl">{{ role.icon }}</span>
            </div>
            <p class="text-neutral-400 text-sm mb-4">{{ role.description }}</p>
            <div class="space-y-2">
              <div class="text-sm font-medium text-neutral-300">Permissions:</div>
              <div class="flex flex-wrap gap-1">
                <span v-for="permission in role.permissions" :key="permission" 
                      class="px-2 py-1 bg-indigo-600/20 text-indigo-300 rounded text-xs">
                  {{ permission }}
                </span>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-neutral-700 flex justify-between items-center">
              <span class="text-sm text-neutral-400">{{ getUserCountByRole(role.name) }} users</span>
              <div class="flex gap-2">
                <button @click="editRole(role)" class="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs">Edit</button>
                <button @click="deleteRole(role.id)" class="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs">Delete</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Permission Matrix -->
        <div class="mt-8">
          <h3 class="text-lg font-semibold mb-4">📋 Permission Matrix</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-neutral-800">
                <tr>
                  <th class="text-left p-3">Module</th>
                  <th v-for="role in roles" :key="role.id" class="text-center p-3">{{ role.name }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="module in modules" :key="module" class="border-b border-neutral-800">
                  <td class="p-3 font-medium">{{ module }}</td>
                  <td v-for="role in roles" :key="role.id" class="text-center p-3">
                    <span v-if="role.permissions.includes(module)" class="text-green-400">✅</span>
                    <span v-else class="text-red-400">❌</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 3. User Profile -->
      <div v-if="activeTab === 'profile'" class="space-y-6">
        <h2 class="text-xl font-semibold">📑 User Profile</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Profile Info -->
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-neutral-800/50 rounded-xl p-6">
              <h3 class="text-lg font-semibold mb-4">Personal Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-neutral-300 mb-2">Full Name</label>
                  <input v-model="selectedUser.name" class="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-neutral-300 mb-2">NIK/ID</label>
                  <input v-model="selectedUser.nik" class="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-neutral-300 mb-2">Department</label>
                  <select v-model="selectedUser.department" class="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-2">
                    <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-neutral-300 mb-2">Location</label>
                  <input v-model="selectedUser.location" class="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-neutral-300 mb-2">Email</label>
                  <input v-model="selectedUser.email" type="email" class="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-neutral-300 mb-2">Phone</label>
                  <input v-model="selectedUser.phone" class="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-2" />
                </div>
              </div>
            </div>

            <!-- Activity History -->
            <div class="bg-neutral-800/50 rounded-xl p-6">
              <h3 class="text-lg font-semibold mb-4">📊 Activity History</h3>
              <div class="space-y-3">
                <div v-for="activity in userActivities" :key="activity.id" class="flex items-center gap-3 p-3 bg-neutral-700/50 rounded-lg">
                  <div class="text-2xl">{{ activity.icon }}</div>
                  <div class="flex-1">
                    <div class="font-medium">{{ activity.action }}</div>
                    <div class="text-sm text-neutral-400">{{ activity.description }}</div>
                  </div>
                  <div class="text-sm text-neutral-400">{{ formatDate(activity.timestamp) }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile Photo & Stats -->
          <div class="space-y-6">
            <div class="bg-neutral-800/50 rounded-xl p-6 text-center">
              <div class="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {{ selectedUser.name?.charAt(0) || 'U' }}
              </div>
              <h3 class="text-lg font-semibold">{{ selectedUser.name }}</h3>
              <p class="text-neutral-400">{{ selectedUser.role }}</p>
              <button class="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
                📷 Change Photo
              </button>
            </div>

            <div class="bg-neutral-800/50 rounded-xl p-6">
              <h3 class="text-lg font-semibold mb-4">📈 User Stats</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-neutral-400">Tickets Created</span>
                  <span class="font-semibold">{{ selectedUser.ticketsCreated || 0 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Last Login</span>
                  <span class="font-semibold">{{ formatDate(selectedUser.lastLogin) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Account Created</span>
                  <span class="font-semibold">{{ formatDate(selectedUser.createdAt) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Authentication & Security -->
      <div v-if="activeTab === 'security'" class="space-y-6">
        <h2 class="text-xl font-semibold">🔄 Authentication & Security</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Password Management -->
          <div class="bg-neutral-800/50 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">🔐 Password Management</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-neutral-300 mb-2">Password Policy</label>
                <div class="space-y-2 text-sm text-neutral-400">
                  <div class="flex items-center gap-2">
                    <span class="text-green-400">✅</span>
                    <span>Minimum 8 characters</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-green-400">✅</span>
                    <span>Include uppercase & lowercase</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-green-400">✅</span>
                    <span>Include numbers & symbols</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-yellow-400">⚠️</span>
                    <span>Password expires in 90 days</span>
                  </div>
                </div>
              </div>
              <button class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                🔄 Force Password Reset
              </button>
            </div>
          </div>

          <!-- 2FA Settings -->
          <div class="bg-neutral-800/50 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">🛡️ Two-Factor Authentication</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span>Enable 2FA</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="twoFactorEnabled" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-neutral-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div v-if="twoFactorEnabled" class="space-y-2">
                <div class="flex items-center gap-2">
                  <span class="text-green-400">✅</span>
                  <span class="text-sm">SMS Authentication</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-green-400">✅</span>
                  <span class="text-sm">Authenticator App</span>
                </div>
              </div>
            </div>
          </div>

          <!-- SSO Integration -->
          <div class="bg-neutral-800/50 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">🔗 Single Sign-On</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 bg-neutral-700/50 rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">🏢</span>
                  <span>Active Directory</span>
                </div>
                <span class="text-green-400">Connected</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-neutral-700/50 rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">📧</span>
                  <span>Google Workspace</span>
                </div>
                <span class="text-yellow-400">Pending</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-neutral-700/50 rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">🔷</span>
                  <span>Microsoft Entra ID</span>
                </div>
                <span class="text-red-400">Disconnected</span>
              </div>
            </div>
          </div>

          <!-- Login History -->
          <div class="bg-neutral-800/50 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">📋 Login History</h3>
            <div class="space-y-3 max-h-64 overflow-y-auto">
              <div v-for="login in loginHistory" :key="login.id" class="flex items-center justify-between p-2 bg-neutral-700/30 rounded">
                <div>
                  <div class="font-medium">{{ login.user }}</div>
                  <div class="text-sm text-neutral-400">{{ login.ip }} • {{ login.location }}</div>
                </div>
                <div class="text-right">
                  <div :class="login.success ? 'text-green-400' : 'text-red-400'" class="text-sm">
                    {{ login.success ? '✅ Success' : '❌ Failed' }}
                  </div>
                  <div class="text-xs text-neutral-400">{{ formatDate(login.timestamp) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. User Activity & Audit -->
      <div v-if="activeTab === 'audit'" class="space-y-6">
        <h2 class="text-xl font-semibold">📊 User Activity & Audit</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Activity Timeline -->
          <div class="lg:col-span-2 bg-neutral-800/50 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">📈 Activity Timeline</h3>
            <div class="space-y-4 max-h-96 overflow-y-auto">
              <div v-for="audit in auditLogs" :key="audit.id" class="flex gap-4 p-4 bg-neutral-700/30 rounded-lg">
                <div class="text-2xl">{{ audit.icon }}</div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-medium">{{ audit.user }}</span>
                    <span class="text-sm text-neutral-400">{{ audit.action }}</span>
                  </div>
                  <div class="text-sm text-neutral-400 mb-2">{{ audit.description }}</div>
                  <div class="flex items-center gap-4 text-xs text-neutral-500">
                    <span>🕒 {{ formatDate(audit.timestamp) }}</span>
                    <span>📍 {{ audit.ip }}</span>
                    <span>🌐 {{ audit.userAgent }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Audit Summary -->
          <div class="space-y-6">
            <div class="bg-neutral-800/50 rounded-xl p-6">
              <h3 class="text-lg font-semibold mb-4">📋 Audit Summary</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-neutral-400">Total Actions</span>
                  <span class="font-semibold">{{ auditLogs.length }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Today</span>
                  <span class="font-semibold">{{ getTodayAuditCount() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">This Week</span>
                  <span class="font-semibold">{{ getWeekAuditCount() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Failed Logins</span>
                  <span class="font-semibold text-red-400">{{ getFailedLoginCount() }}</span>
                </div>
              </div>
            </div>

            <div class="bg-neutral-800/50 rounded-xl p-6">
              <h3 class="text-lg font-semibold mb-4">🔍 Compliance</h3>
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <span class="text-green-400">✅</span>
                  <span class="text-sm">ISO 27001 Compliant</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-green-400">✅</span>
                  <span class="text-sm">GDPR Compliant</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-green-400">✅</span>
                  <span class="text-sm">Audit Trail Complete</span>
                </div>
                <button class="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm">
                  📄 Export Audit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 6. Notification Preferences -->
      <div v-if="activeTab === 'notifications'" class="space-y-6">
        <h2 class="text-xl font-semibold">🔔 Notification Preferences</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Notification Settings -->
          <div class="bg-neutral-800/50 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">📧 Email Notifications</h3>
            <div class="space-y-4">
              <div v-for="setting in emailNotifications" :key="setting.id" class="flex items-center justify-between">
                <div>
                  <div class="font-medium">{{ setting.title }}</div>
                  <div class="text-sm text-neutral-400">{{ setting.description }}</div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="setting.enabled" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-neutral-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          <!-- Push Notifications -->
          <div class="bg-neutral-800/50 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">📱 Push Notifications</h3>
            <div class="space-y-4">
              <div v-for="setting in pushNotifications" :key="setting.id" class="flex items-center justify-between">
                <div>
                  <div class="font-medium">{{ setting.title }}</div>
                  <div class="text-sm text-neutral-400">{{ setting.description }}</div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="setting.enabled" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-neutral-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          <!-- WhatsApp Notifications -->
          <div class="bg-neutral-800/50 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">💬 WhatsApp Notifications</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span>Enable WhatsApp</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="whatsappEnabled" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-neutral-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div v-if="whatsappEnabled">
                <label class="block text-sm font-medium text-neutral-300 mb-2">WhatsApp Number</label>
                <input v-model="whatsappNumber" placeholder="+62 812 3456 7890" class="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-2" />
              </div>
            </div>
          </div>

          <!-- Notification Schedule -->
          <div class="bg-neutral-800/50 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">⏰ Notification Schedule</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-neutral-300 mb-2">Quiet Hours</label>
                <div class="grid grid-cols-2 gap-2">
                  <input v-model="quietHoursStart" type="time" class="bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-2" />
                  <input v-model="quietHoursEnd" type="time" class="bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-2" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-300 mb-2">Timezone</label>
                <select v-model="timezone" class="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-2">
                  <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                  <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                  <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 7. Training & Certification -->
      <div v-if="activeTab === 'training'" class="space-y-6">
        <h2 class="text-xl font-semibold">🧠 Training & Certification</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Training Records -->
          <div class="lg:col-span-2 bg-neutral-800/50 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">📚 Training Records</h3>
            <div class="space-y-4">
              <div v-for="training in trainingRecords" :key="training.id" class="flex items-center gap-4 p-4 bg-neutral-700/30 rounded-lg">
                <div class="text-3xl">{{ training.icon }}</div>
                <div class="flex-1">
                  <div class="font-medium">{{ training.title }}</div>
                  <div class="text-sm text-neutral-400">{{ training.provider }}</div>
                  <div class="flex items-center gap-4 mt-2">
                    <span class="text-xs text-neutral-500">📅 {{ formatDate(training.completedDate) }}</span>
                    <span :class="training.status === 'Valid' ? 'text-green-400' : 'text-yellow-400'" class="text-xs">
                      {{ training.status }}
                    </span>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-medium">{{ training.score }}%</div>
                  <div class="text-xs text-neutral-400">Score</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Certifications -->
          <div class="space-y-6">
            <div class="bg-neutral-800/50 rounded-xl p-6">
              <h3 class="text-lg font-semibold mb-4">🏆 Certifications</h3>
              <div class="space-y-3">
                <div v-for="cert in certifications" :key="cert.id" class="p-3 bg-neutral-700/30 rounded-lg">
                  <div class="font-medium">{{ cert.name }}</div>
                  <div class="text-sm text-neutral-400">{{ cert.issuer }}</div>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-xs text-neutral-500">Expires: {{ formatDate(cert.expiryDate) }}</span>
                    <span :class="cert.status === 'Valid' ? 'text-green-400' : 'text-red-400'" class="text-xs">
                      {{ cert.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-neutral-800/50 rounded-xl p-6">
              <h3 class="text-lg font-semibold mb-4">📈 Training Progress</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-neutral-400">Completed</span>
                  <span class="font-semibold">{{ completedTrainings }}/{{ totalTrainings }}</span>
                </div>
                <div class="w-full bg-neutral-700 rounded-full h-2">
                  <div class="bg-indigo-600 h-2 rounded-full" :style="{ width: (completedTrainings / totalTrainings * 100) + '%' }"></div>
                </div>
                <div class="text-sm text-neutral-400">{{ Math.round(completedTrainings / totalTrainings * 100) }}% Complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 8. Integration -->
      <div v-if="activeTab === 'integration'" class="space-y-6">
        <h2 class="text-xl font-semibold">🔗 Integration</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- System Integrations -->
          <div class="bg-neutral-800/50 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">🏢 System Integrations</h3>
            <div class="space-y-4">
              <div v-for="integration in systemIntegrations" :key="integration.id" class="flex items-center justify-between p-4 bg-neutral-700/30 rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">{{ integration.icon }}</span>
                  <div>
                    <div class="font-medium">{{ integration.name }}</div>
                    <div class="text-sm text-neutral-400">{{ integration.description }}</div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span :class="integration.status === 'Connected' ? 'text-green-400' : integration.status === 'Pending' ? 'text-yellow-400' : 'text-red-400'" class="text-sm">
                    {{ integration.status }}
                  </span>
                  <button class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded text-xs">Configure</button>
                </div>
              </div>
            </div>
          </div>

          <!-- API Management -->
          <div class="bg-neutral-800/50 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">🔌 API Management</h3>
            <div class="space-y-4">
              <div class="p-4 bg-neutral-700/30 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium">API Endpoint</span>
                  <span class="text-green-400 text-sm">Active</span>
                </div>
                <div class="text-sm text-neutral-400 font-mono bg-neutral-800 p-2 rounded">
                  https://api.predictive-monitoring.com/v1/users
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="p-3 bg-neutral-700/30 rounded-lg text-center">
                  <div class="text-2xl font-bold text-indigo-400">{{ apiStats.requests }}</div>
                  <div class="text-sm text-neutral-400">API Requests</div>
                </div>
                <div class="p-3 bg-neutral-700/30 rounded-lg text-center">
                  <div class="text-2xl font-bold text-green-400">{{ apiStats.success }}%</div>
                  <div class="text-sm text-neutral-400">Success Rate</div>
                </div>
              </div>

              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-neutral-400">Rate Limit</span>
                  <span>1000/hour</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-neutral-400">Authentication</span>
                  <span>Bearer Token</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-neutral-400">Last Sync</span>
                  <span>{{ formatDate(new Date()) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Sync Settings -->
          <div class="bg-neutral-800/50 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">🔄 Sync Settings</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span>Auto Sync Users</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="autoSyncEnabled" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-neutral-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div v-if="autoSyncEnabled">
                <label class="block text-sm font-medium text-neutral-300 mb-2">Sync Frequency</label>
                <select v-model="syncFrequency" class="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-2">
                  <option value="hourly">Every Hour</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>

              <button class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                🔄 Manual Sync Now
              </button>
            </div>
          </div>

          <!-- Webhook Configuration -->
          <div class="bg-neutral-800/50 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">🪝 Webhook Configuration</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-neutral-300 mb-2">Webhook URL</label>
                <input v-model="webhookUrl" placeholder="https://your-system.com/webhook" class="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-2" />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-neutral-300 mb-2">Events</label>
                <div class="space-y-2">
                  <div v-for="event in webhookEvents" :key="event.id" class="flex items-center gap-2">
                    <input v-model="event.enabled" type="checkbox" class="rounded">
                    <span class="text-sm">{{ event.name }}</span>
                  </div>
                </div>
              </div>

              <button class="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                🧪 Test Webhook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <!-- Create User Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-neutral-900 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold">➕ Create New User</h3>
          <button @click="showCreateModal = false" class="text-neutral-400 hover:text-white">✕</button>
        </div>
        
        <form @submit.prevent="createUser" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Full Name *</label>
              <input v-model="newUser.name" required class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Username *</label>
              <input v-model="newUser.username" required class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Email *</label>
              <input v-model="newUser.email" type="email" required class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Phone</label>
              <input v-model="newUser.phone" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Role *</label>
              <select v-model="newUser.role" required class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2">
                <option v-for="role in roles" :key="role.id" :value="role.name">{{ role.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Department *</label>
              <select v-model="newUser.department" required class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2">
                <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Location</label>
              <input v-model="newUser.location" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">NIK/ID</label>
              <input v-model="newUser.nik" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2" />
            </div>
          </div>
          
          <div class="flex gap-4 pt-4">
            <button type="submit" class="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
              Create User
            </button>
            <button type="button" @click="showCreateModal = false" class="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Import Users Modal -->
    <div v-if="showImportModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-neutral-900 rounded-xl p-6 w-full max-w-lg mx-4">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold">📥 Import Users</h3>
          <button @click="showImportModal = false" class="text-neutral-400 hover:text-white">✕</button>
        </div>
        
        <div class="space-y-4">
          <div class="border-2 border-dashed border-neutral-700 rounded-lg p-8 text-center">
            <div class="text-4xl mb-4">📄</div>
            <p class="text-neutral-400 mb-4">Drop CSV/Excel file here or click to browse</p>
            <input type="file" accept=".csv,.xlsx,.xls" class="hidden" />
            <button class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
              Choose File
            </button>
          </div>
          
          <div class="text-sm text-neutral-400">
            <p class="mb-2">Required columns:</p>
            <ul class="list-disc list-inside space-y-1">
              <li>Name</li>
              <li>Username</li>
              <li>Email</li>
              <li>Role</li>
              <li>Department</li>
            </ul>
          </div>
          
          <div class="flex gap-4">
            <button class="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
              Import Users
            </button>
            <button @click="showImportModal = false" class="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Role Modal -->
    <div v-if="showRoleModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-neutral-900 rounded-xl p-6 w-full max-w-lg mx-4">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold">🔐 Create Role</h3>
          <button @click="showRoleModal = false" class="text-neutral-400 hover:text-white">✕</button>
        </div>
        
        <form @submit.prevent="createRole" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-neutral-300 mb-2">Role Name *</label>
            <input v-model="newRole.name" required class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-300 mb-2">Description</label>
            <textarea v-model="newRole.description" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 h-20"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-300 mb-2">Permissions</label>
            <div class="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              <div v-for="module in modules" :key="module" class="flex items-center gap-2">
                <input v-model="newRole.permissions" :value="module" type="checkbox" class="rounded">
                <span class="text-sm">{{ module }}</span>
              </div>
            </div>
          </div>
          
          <div class="flex gap-4 pt-4">
            <button type="submit" class="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
              Create Role
            </button>
            <button type="button" @click="showRoleModal = false" class="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

// Types
interface User {
  id: string
  name: string
  username: string
  email: string
  phone?: string
  role: string
  department: string
  location?: string
  nik?: string
  status: 'Active' | 'Inactive'
  lastLogin: Date
  createdAt: Date
  ticketsCreated?: number
}

interface Role {
  id: string
  name: string
  description: string
  icon: string
  permissions: string[]
}

interface Activity {
  id: string
  icon: string
  action: string
  description: string
  timestamp: Date
}

interface AuditLog {
  id: string
  user: string
  action: string
  description: string
  timestamp: Date
  ip: string
  userAgent: string
  icon: string
}

interface LoginHistory {
  id: string
  user: string
  ip: string
  location: string
  success: boolean
  timestamp: Date
}

interface NotificationSetting {
  id: string
  title: string
  description: string
  enabled: boolean
}

interface Training {
  id: string
  title: string
  provider: string
  completedDate: Date
  status: 'Valid' | 'Expired'
  score: number
  icon: string
}

interface Certification {
  id: string
  name: string
  issuer: string
  expiryDate: Date
  status: 'Valid' | 'Expired'
}

interface SystemIntegration {
  id: string
  name: string
  description: string
  icon: string
  status: 'Connected' | 'Pending' | 'Disconnected'
}

interface WebhookEvent {
  id: string
  name: string
  enabled: boolean
}

// Reactive data
const activeTab = ref('users')
const searchQuery = ref('')
const filterRole = ref('')
const filterDepartment = ref('')
const filterStatus = ref('')

// Modals
const showCreateModal = ref(false)
const showImportModal = ref(false)
const showRoleModal = ref(false)

// Forms
const newUser = reactive<Partial<User>>({
  name: '',
  username: '',
  email: '',
  phone: '',
  role: '',
  department: '',
  location: '',
  nik: ''
})

const newRole = reactive({
  name: '',
  description: '',
  permissions: [] as string[]
})

// Settings
const twoFactorEnabled = ref(true)
const whatsappEnabled = ref(false)
const whatsappNumber = ref('')
const quietHoursStart = ref('22:00')
const quietHoursEnd = ref('06:00')
const timezone = ref('Asia/Jakarta')
const autoSyncEnabled = ref(true)
const syncFrequency = ref('daily')
const webhookUrl = ref('')

// Tabs
const tabs = [
  { id: 'users', name: 'User Management', icon: '👥' },
  { id: 'roles', name: 'Roles & Access', icon: '🔐' },
  { id: 'profile', name: 'User Profile', icon: '📑' },
  { id: 'security', name: 'Security', icon: '🔄' },
  { id: 'audit', name: 'Activity & Audit', icon: '📊' },
  { id: 'notifications', name: 'Notifications', icon: '🔔' },
  { id: 'training', name: 'Training', icon: '🧠' },
  { id: 'integration', name: 'Integration', icon: '🔗' }
]

// Sample data
const users = ref<User[]>([
  {
    id: 'U001',
    name: 'Ahmad Rizki',
    username: 'ahmad.rizki',
    email: 'ahmad.rizki@company.com',
    phone: '+62 812 3456 7890',
    role: 'Admin',
    department: 'IT',
    location: 'Jakarta',
    nik: 'NIK001',
    status: 'Active',
    lastLogin: new Date('2024-01-15T10:30:00'),
    createdAt: new Date('2023-06-01'),
    ticketsCreated: 25
  },
  {
    id: 'U002',
    name: 'Sari Dewi',
    username: 'sari.dewi',
    email: 'sari.dewi@company.com',
    phone: '+62 813 4567 8901',
    role: 'Supervisor',
    department: 'Production',
    location: 'Surabaya',
    nik: 'NIK002',
    status: 'Active',
    lastLogin: new Date('2024-01-15T09:15:00'),
    createdAt: new Date('2023-07-15'),
    ticketsCreated: 18
  },
  {
    id: 'U003',
    name: 'Budi Santoso',
    username: 'budi.santoso',
    email: 'budi.santoso@company.com',
    phone: '+62 814 5678 9012',
    role: 'Technician',
    department: 'Maintenance',
    location: 'Bandung',
    nik: 'NIK003',
    status: 'Active',
    lastLogin: new Date('2024-01-14T16:45:00'),
    createdAt: new Date('2023-08-01'),
    ticketsCreated: 42
  },
  {
    id: 'U004',
    name: 'Maya Putri',
    username: 'maya.putri',
    email: 'maya.putri@company.com',
    phone: '+62 815 6789 0123',
    role: 'Operator',
    department: 'Production',
    location: 'Jakarta',
    nik: 'NIK004',
    status: 'Inactive',
    lastLogin: new Date('2024-01-10T14:20:00'),
    createdAt: new Date('2023-09-10'),
    ticketsCreated: 8
  },
  {
    id: 'U005',
    name: 'Eko Prasetyo',
    username: 'eko.prasetyo',
    email: 'eko.prasetyo@company.com',
    phone: '+62 816 7890 1234',
    role: 'Viewer',
    department: 'Quality Control',
    location: 'Medan',
    nik: 'NIK005',
    status: 'Active',
    lastLogin: new Date('2024-01-13T11:30:00'),
    createdAt: new Date('2023-10-05'),
    ticketsCreated: 3
  }
])

const roles = ref<Role[]>([
  {
    id: 'R001',
    name: 'Admin',
    description: 'Full system access and management capabilities',
    icon: '👑',
    permissions: ['Dashboard', 'Telemetry', 'Ticketing', 'Maintenance', 'Settings', 'User Management']
  },
  {
    id: 'R002',
    name: 'Supervisor',
    description: 'Approval and reporting access',
    icon: '👨‍💼',
    permissions: ['Dashboard', 'Telemetry', 'Ticketing', 'Maintenance']
  },
  {
    id: 'R003',
    name: 'Technician',
    description: 'Update tickets and input telemetry data',
    icon: '🔧',
    permissions: ['Dashboard', 'Telemetry', 'Ticketing']
  },
  {
    id: 'R004',
    name: 'Operator',
    description: 'View data and create tickets',
    icon: '👷',
    permissions: ['Dashboard', 'Ticketing']
  },
  {
    id: 'R005',
    name: 'Viewer',
    description: 'Read-only access to system data',
    icon: '👁️',
    permissions: ['Dashboard']
  }
])

const departments = ref([
  'IT', 'Production', 'Maintenance', 'Quality Control', 'Operations', 'Engineering', 'Safety', 'Management'
])

const modules = ref([
  'Dashboard', 'Telemetry', 'Ticketing', 'Maintenance', 'Settings', 'User Management', 'Reports', 'Analytics'
])

const selectedUser = reactive<Partial<User>>({
  name: 'Ahmad Rizki',
  username: 'ahmad.rizki',
  email: 'ahmad.rizki@company.com',
  phone: '+62 812 3456 7890',
  role: 'Admin',
  department: 'IT',
  location: 'Jakarta',
  nik: 'NIK001',
  status: 'Active',
  lastLogin: new Date('2024-01-15T10:30:00'),
  createdAt: new Date('2023-06-01'),
  ticketsCreated: 25
})

const userActivities = ref<Activity[]>([
  {
    id: 'A001',
    icon: '🎫',
    action: 'Created Ticket',
    description: 'Created maintenance ticket #MT-2024-001',
    timestamp: new Date('2024-01-15T10:30:00')
  },
  {
    id: 'A002',
    icon: '✅',
    action: 'Approved Request',
    description: 'Approved equipment maintenance request',
    timestamp: new Date('2024-01-15T09:15:00')
  },
  {
    id: 'A003',
    icon: '📊',
    action: 'Generated Report',
    description: 'Generated monthly performance report',
    timestamp: new Date('2024-01-14T16:45:00')
  }
])

const auditLogs = ref<AuditLog[]>([
  {
    id: 'AL001',
    user: 'Ahmad Rizki',
    action: 'User Login',
    description: 'Successful login to system',
    timestamp: new Date('2024-01-15T10:30:00'),
    ip: '192.168.1.100',
    userAgent: 'Chrome/120.0.0.0',
    icon: '🔐'
  },
  {
    id: 'AL002',
    user: 'Sari Dewi',
    action: 'Role Changed',
    description: 'Role changed from Operator to Supervisor',
    timestamp: new Date('2024-01-15T09:15:00'),
    ip: '192.168.1.101',
    userAgent: 'Firefox/121.0.0.0',
    icon: '👤'
  },
  {
    id: 'AL003',
    user: 'Budi Santoso',
    action: 'Ticket Created',
    description: 'Created maintenance ticket MT-2024-001',
    timestamp: new Date('2024-01-14T16:45:00'),
    ip: '192.168.1.102',
    userAgent: 'Safari/17.0.0.0',
    icon: '🎫'
  }
])

const loginHistory = ref<LoginHistory[]>([
  {
    id: 'LH001',
    user: 'Ahmad Rizki',
    ip: '192.168.1.100',
    location: 'Jakarta, Indonesia',
    success: true,
    timestamp: new Date('2024-01-15T10:30:00')
  },
  {
    id: 'LH002',
    user: 'Sari Dewi',
    ip: '192.168.1.101',
    location: 'Surabaya, Indonesia',
    success: true,
    timestamp: new Date('2024-01-15T09:15:00')
  },
  {
    id: 'LH003',
    user: 'Unknown User',
    ip: '203.0.113.1',
    location: 'Unknown',
    success: false,
    timestamp: new Date('2024-01-15T08:45:00')
  }
])

const emailNotifications = ref<NotificationSetting[]>([
  {
    id: 'EN001',
    title: 'New Tickets',
    description: 'Notify when new tickets are created',
    enabled: true
  },
  {
    id: 'EN002',
    title: 'SLA Warnings',
    description: 'Alert when SLA deadlines are approaching',
    enabled: true
  },
  {
    id: 'EN003',
    title: 'System Alerts',
    description: 'Critical system notifications',
    enabled: true
  },
  {
    id: 'EN004',
    title: 'Weekly Reports',
    description: 'Weekly performance summary',
    enabled: false
  }
])

const pushNotifications = ref<NotificationSetting[]>([
  {
    id: 'PN001',
    title: 'Urgent Tickets',
    description: 'High priority ticket notifications',
    enabled: true
  },
  {
    id: 'PN002',
    title: 'Equipment Alerts',
    description: 'Equipment failure notifications',
    enabled: true
  },
  {
    id: 'PN003',
    title: 'Maintenance Reminders',
    description: 'Scheduled maintenance notifications',
    enabled: false
  }
])

const trainingRecords = ref<Training[]>([
  {
    id: 'TR001',
    title: 'Safety Training 2024',
    provider: 'Internal Training Dept',
    completedDate: new Date('2024-01-10'),
    status: 'Valid',
    score: 95,
    icon: '🦺'
  },
  {
    id: 'TR002',
    title: 'Equipment Maintenance Certification',
    provider: 'Technical Institute',
    completedDate: new Date('2023-12-15'),
    status: 'Valid',
    score: 88,
    icon: '🔧'
  },
  {
    id: 'TR003',
    title: 'Quality Control Procedures',
    provider: 'Quality Assurance Dept',
    completedDate: new Date('2023-11-20'),
    status: 'Valid',
    score: 92,
    icon: '✅'
  }
])

const certifications = ref<Certification[]>([
  {
    id: 'C001',
    name: 'Industrial Safety Certification',
    issuer: 'Safety Council',
    expiryDate: new Date('2025-01-10'),
    status: 'Valid'
  },
  {
    id: 'C002',
    name: 'Equipment Maintenance License',
    issuer: 'Technical Authority',
    expiryDate: new Date('2024-12-15'),
    status: 'Valid'
  },
  {
    id: 'C003',
    name: 'Quality Management Certificate',
    issuer: 'ISO Organization',
    expiryDate: new Date('2024-03-20'),
    status: 'Expired'
  }
])

const systemIntegrations = ref<SystemIntegration[]>([
  {
    id: 'SI001',
    name: 'HRIS System',
    description: 'Human Resource Information System',
    icon: '👥',
    status: 'Connected'
  },
  {
    id: 'SI002',
    name: 'ERP System',
    description: 'Enterprise Resource Planning',
    icon: '📊',
    status: 'Connected'
  },
  {
    id: 'SI003',
    name: 'LDAP Directory',
    description: 'Lightweight Directory Access Protocol',
    icon: '📁',
    status: 'Pending'
  },
  {
    id: 'SI004',
    name: 'SAP Integration',
    description: 'SAP Business Suite',
    icon: '🏢',
    status: 'Disconnected'
  }
])

const webhookEvents = ref<WebhookEvent[]>([
  { id: 'WE001', name: 'User Created', enabled: true },
  { id: 'WE002', name: 'User Updated', enabled: true },
  { id: 'WE003', name: 'User Deleted', enabled: false },
  { id: 'WE004', name: 'Role Changed', enabled: true },
  { id: 'WE005', name: 'Login Failed', enabled: true }
])

const apiStats = ref({
  requests: 1247,
  success: 99.2
})

// Computed properties
const totalUsers = computed(() => users.value.length)
const activeUsers = computed(() => users.value.filter(u => u.status === 'Active').length)
const totalRoles = computed(() => roles.value.length)
const onlineUsers = computed(() => Math.floor(activeUsers.value * 0.3))

const completedTrainings = computed(() => trainingRecords.value.filter(t => t.status === 'Valid').length)
const totalTrainings = computed(() => trainingRecords.value.length)

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = !searchQuery.value || 
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesRole = !filterRole.value || user.role === filterRole.value
    const matchesDepartment = !filterDepartment.value || user.department === filterDepartment.value
    const matchesStatus = !filterStatus.value || user.status === filterStatus.value
    
    return matchesSearch && matchesRole && matchesDepartment && matchesStatus
  })
})

// Methods
const formatDate = (date: Date | undefined) => {
  if (!date) return 'Never'
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const getRoleBadgeClass = (role: string) => {
  const classes = {
    'Admin': 'bg-red-600/20 text-red-300',
    'Supervisor': 'bg-blue-600/20 text-blue-300',
    'Technician': 'bg-green-600/20 text-green-300',
    'Operator': 'bg-yellow-600/20 text-yellow-300',
    'Viewer': 'bg-gray-600/20 text-gray-300'
  }
  return classes[role as keyof typeof classes] || 'bg-gray-600/20 text-gray-300'
}

const getUserCountByRole = (roleName: string) => {
  return users.value.filter(u => u.role === roleName).length
}

const getTodayAuditCount = () => {
  const today = new Date()
  return auditLogs.value.filter(log => {
    const logDate = new Date(log.timestamp)
    return logDate.toDateString() === today.toDateString()
  }).length
}

const getWeekAuditCount = () => {
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  return auditLogs.value.filter(log => new Date(log.timestamp) >= weekAgo).length
}

const getFailedLoginCount = () => {
  return loginHistory.value.filter(login => !login.success).length
}

const createUser = () => {
  const user: User = {
    id: `U${String(users.value.length + 1).padStart(3, '0')}`,
    name: newUser.name || '',
    username: newUser.username || '',
    email: newUser.email || '',
    phone: newUser.phone,
    role: newUser.role || '',
    department: newUser.department || '',
    location: newUser.location,
    nik: newUser.nik,
    status: 'Active',
    lastLogin: new Date(),
    createdAt: new Date(),
    ticketsCreated: 0
  }
  
  users.value.push(user)
  showCreateModal.value = false
  
  // Reset form
  Object.assign(newUser, {
    name: '',
    username: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    location: '',
    nik: ''
  })
}

const editUser = (user: User) => {
  Object.assign(selectedUser, user)
  activeTab.value = 'profile'
}

const deleteUser = (userId: string) => {
  const index = users.value.findIndex(u => u.id === userId)
  if (index !== -1) {
    users.value.splice(index, 1)
  }
}

const createRole = () => {
  const role: Role = {
    id: `R${String(roles.value.length + 1).padStart(3, '0')}`,
    name: newRole.name,
    description: newRole.description,
    icon: '🔑',
    permissions: [...newRole.permissions]
  }
  
  roles.value.push(role)
  showRoleModal.value = false
  
  // Reset form
  Object.assign(newRole, {
    name: '',
    description: '',
    permissions: []
  })
}

const editRole = (role: Role) => {
  Object.assign(newRole, role)
  showRoleModal.value = true
}

const deleteRole = (roleId: string) => {
  const index = roles.value.findIndex(r => r.id === roleId)
  if (index !== -1) {
    roles.value.splice(index, 1)
  }
}
</script>


