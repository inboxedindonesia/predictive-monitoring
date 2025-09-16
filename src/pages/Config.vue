<template>
  <div class="min-h-screen bg-neutral-950 text-white p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">⚙️ System Configuration</h1>
      <p class="text-neutral-400">Manage all system settings and configurations</p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm">Active Users</p>
            <p class="text-2xl font-bold text-white">{{ stats.activeUsers }}</p>
          </div>
          <div class="text-blue-200">👥</div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm">Connected Sensors</p>
            <p class="text-2xl font-bold text-white">{{ stats.connectedSensors }}</p>
          </div>
          <div class="text-green-200">📡</div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm">Active Integrations</p>
            <p class="text-2xl font-bold text-white">{{ stats.activeIntegrations }}</p>
          </div>
          <div class="text-purple-200">🔗</div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-orange-100 text-sm">System Health</p>
            <p class="text-2xl font-bold text-white">{{ stats.systemHealth }}%</p>
          </div>
          <div class="text-orange-200">💚</div>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="mb-8">
      <div class="flex flex-wrap gap-2 bg-neutral-900/50 p-2 rounded-xl">
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

    <!-- Content Sections -->
    <div class="space-y-8">
      <!-- 1. System Settings -->
      <div v-show="activeTab === 'system'" class="space-y-6">
        <h2 class="text-2xl font-semibold text-white mb-6">⚙️ System Settings</h2>
        
        <!-- General Settings -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">General Settings</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">System Name</label>
              <input v-model="systemSettings.systemName" type="text" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Language</label>
              <select v-model="systemSettings.language" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Timezone</label>
              <select v-model="systemSettings.timezone" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
                <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Date Format</label>
              <select v-model="systemSettings.dateFormat" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Units Configuration -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Units Configuration</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Temperature</label>
              <select v-model="systemSettings.units.temperature" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
                <option value="celsius">Celsius (°C)</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Energy</label>
              <select v-model="systemSettings.units.energy" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
                <option value="kWh">kWh</option>
                <option value="MWh">MWh</option>
                <option value="Joule">Joule</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Pressure</label>
              <select v-model="systemSettings.units.pressure" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
                <option value="bar">Bar</option>
                <option value="psi">PSI</option>
                <option value="pascal">Pascal</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Theme & Branding -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Theme & Branding</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Company Logo</label>
              <div class="flex items-center space-x-4">
                <div class="w-16 h-16 bg-neutral-800 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">🏭</span>
                </div>
                <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Upload Logo
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Theme Mode</label>
              <div class="flex space-x-4">
                <label class="flex items-center">
                  <input v-model="systemSettings.theme" type="radio" value="dark" class="mr-2">
                  <span class="text-white">🌙 Dark Mode</span>
                </label>
                <label class="flex items-center">
                  <input v-model="systemSettings.theme" type="radio" value="light" class="mr-2">
                  <span class="text-white">☀️ Light Mode</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Security & Access -->
      <div v-show="activeTab === 'security'" class="space-y-6">
        <h2 class="text-2xl font-semibold text-white mb-6">🔐 Security & Access</h2>
        
        <!-- User & Role Management -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">User & Role Management</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-neutral-300">Total Users: {{ securitySettings.totalUsers }}</span>
              <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Manage Users
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-neutral-800 p-4 rounded-lg">
                <div class="text-sm text-neutral-400">Admin</div>
                <div class="text-xl font-bold text-white">{{ securitySettings.roles.admin }}</div>
              </div>
              <div class="bg-neutral-800 p-4 rounded-lg">
                <div class="text-sm text-neutral-400">Supervisor</div>
                <div class="text-xl font-bold text-white">{{ securitySettings.roles.supervisor }}</div>
              </div>
              <div class="bg-neutral-800 p-4 rounded-lg">
                <div class="text-sm text-neutral-400">Technician</div>
                <div class="text-xl font-bold text-white">{{ securitySettings.roles.technician }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Authentication Settings -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Authentication Settings</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-neutral-300 mb-2">Minimum Password Length</label>
                <input v-model.number="securitySettings.passwordPolicy.minLength" type="number" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-300 mb-2">Password Expiry (days)</label>
                <input v-model.number="securitySettings.passwordPolicy.expiryDays" type="number" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
              </div>
            </div>
            <div class="space-y-2">
              <label class="flex items-center">
                <input v-model="securitySettings.passwordPolicy.requireUppercase" type="checkbox" class="mr-2">
                <span class="text-white">Require uppercase letters</span>
              </label>
              <label class="flex items-center">
                <input v-model="securitySettings.passwordPolicy.requireNumbers" type="checkbox" class="mr-2">
                <span class="text-white">Require numbers</span>
              </label>
              <label class="flex items-center">
                <input v-model="securitySettings.passwordPolicy.requireSpecialChars" type="checkbox" class="mr-2">
                <span class="text-white">Require special characters</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Multi-Factor Authentication -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Multi-Factor Authentication</h3>
          <div class="space-y-4">
            <label class="flex items-center">
              <input v-model="securitySettings.mfa.enabled" type="checkbox" class="mr-2">
              <span class="text-white">Enable MFA for all users</span>
            </label>
            <div v-if="securitySettings.mfa.enabled" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label class="flex items-center">
                <input v-model="securitySettings.mfa.methods" type="checkbox" value="sms" class="mr-2">
                <span class="text-white">📱 SMS</span>
              </label>
              <label class="flex items-center">
                <input v-model="securitySettings.mfa.methods" type="checkbox" value="email" class="mr-2">
                <span class="text-white">📧 Email</span>
              </label>
              <label class="flex items-center">
                <input v-model="securitySettings.mfa.methods" type="checkbox" value="authenticator" class="mr-2">
                <span class="text-white">🔐 Authenticator App</span>
              </label>
            </div>
          </div>
        </div>

        <!-- SSO Integration -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Single Sign-On (SSO)</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Active Directory</label>
              <div class="flex items-center space-x-2">
                <input v-model="securitySettings.sso.activeDirectory" type="checkbox" class="mr-2">
                <span class="text-white">Enable AD Integration</span>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Google SSO</label>
              <div class="flex items-center space-x-2">
                <input v-model="securitySettings.sso.google" type="checkbox" class="mr-2">
                <span class="text-white">Enable Google SSO</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Connectivity & Integration -->
      <div v-show="activeTab === 'connectivity'" class="space-y-6">
        <h2 class="text-2xl font-semibold text-white mb-6">🌐 Connectivity & Integration</h2>
        
        <!-- Sensor & Gateway Config -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Sensor & Gateway Configuration</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-neutral-300">Connected Sensors: {{ connectivitySettings.sensors.length }}</span>
              <button @click="showAddSensorModal = true" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Add Sensor
              </button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-neutral-700">
                    <th class="text-left py-2 text-neutral-300">Sensor ID</th>
                    <th class="text-left py-2 text-neutral-300">Type</th>
                    <th class="text-left py-2 text-neutral-300">Asset</th>
                    <th class="text-left py-2 text-neutral-300">Polling Rate</th>
                    <th class="text-left py-2 text-neutral-300">Status</th>
                    <th class="text-left py-2 text-neutral-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="sensor in connectivitySettings.sensors" :key="sensor.id" class="border-b border-neutral-800">
                    <td class="py-2 text-white">{{ sensor.id }}</td>
                    <td class="py-2 text-neutral-300">{{ sensor.type }}</td>
                    <td class="py-2 text-neutral-300">{{ sensor.asset }}</td>
                    <td class="py-2 text-neutral-300">{{ sensor.pollingRate }}s</td>
                    <td class="py-2">
                      <span :class="sensor.status === 'online' ? 'text-green-400' : 'text-red-400'">
                        {{ sensor.status }}
                      </span>
                    </td>
                    <td class="py-2">
                      <button class="text-indigo-400 hover:text-indigo-300 mr-2">Edit</button>
                      <button class="text-red-400 hover:text-red-300">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- API & Webhook -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">API & Webhook Management</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-neutral-300 mb-2">API Keys</label>
                <div class="space-y-2">
                  <div v-for="apiKey in connectivitySettings.apiKeys" :key="apiKey.id" class="flex items-center justify-between bg-neutral-800 p-3 rounded-lg">
                    <div>
                      <div class="text-white font-medium">{{ apiKey.name }}</div>
                      <div class="text-neutral-400 text-sm">{{ apiKey.key.substring(0, 20) }}...</div>
                    </div>
                    <button class="text-red-400 hover:text-red-300">Revoke</button>
                  </div>
                </div>
                <button class="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Generate New API Key
                </button>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-300 mb-2">Webhook Endpoints</label>
                <div class="space-y-2">
                  <input v-model="connectivitySettings.webhookUrl" type="url" placeholder="https://api.example.com/webhook" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
                  <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Test Webhook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Third-Party Integration -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Third-Party Integrations</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="integration in connectivitySettings.integrations" :key="integration.name" class="bg-neutral-800 p-4 rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <span class="text-white font-medium">{{ integration.name }}</span>
                <span :class="integration.connected ? 'text-green-400' : 'text-red-400'">
                  {{ integration.connected ? '✅' : '❌' }}
                </span>
              </div>
              <p class="text-neutral-400 text-sm mb-3">{{ integration.description }}</p>
              <button :class="integration.connected ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'" class="w-full px-3 py-2 text-white rounded-lg transition-colors">
                {{ integration.connected ? 'Disconnect' : 'Connect' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Asset & Telemetry Configuration -->
      <div v-show="activeTab === 'asset'" class="space-y-6">
        <h2 class="text-2xl font-semibold text-white mb-6">🏭 Asset & Telemetry Configuration</h2>
        
        <!-- Asset Categories -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Asset Category Setup</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Asset Types</label>
              <div class="space-y-2">
                <div v-for="type in assetSettings.assetTypes" :key="type" class="flex items-center justify-between bg-neutral-800 p-2 rounded">
                  <span class="text-white">{{ type }}</span>
                  <button class="text-red-400 hover:text-red-300">×</button>
                </div>
                <input v-model="newAssetType" @keyup.enter="addAssetType" placeholder="Add new type" class="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Production Lines</label>
              <div class="space-y-2">
                <div v-for="line in assetSettings.productionLines" :key="line" class="flex items-center justify-between bg-neutral-800 p-2 rounded">
                  <span class="text-white">{{ line }}</span>
                  <button class="text-red-400 hover:text-red-300">×</button>
                </div>
                <input v-model="newProductionLine" @keyup.enter="addProductionLine" placeholder="Add new line" class="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Factory Areas</label>
              <div class="space-y-2">
                <div v-for="area in assetSettings.factoryAreas" :key="area" class="flex items-center justify-between bg-neutral-800 p-2 rounded">
                  <span class="text-white">{{ area }}</span>
                  <button class="text-red-400 hover:text-red-300">×</button>
                </div>
                <input v-model="newFactoryArea" @keyup.enter="addFactoryArea" placeholder="Add new area" class="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white">
              </div>
            </div>
          </div>
        </div>

        <!-- Telemetry Parameters -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Telemetry Parameter Configuration</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-neutral-700">
                  <th class="text-left py-2 text-neutral-300">Parameter</th>
                  <th class="text-left py-2 text-neutral-300">Unit</th>
                  <th class="text-left py-2 text-neutral-300">Normal Range</th>
                  <th class="text-left py-2 text-neutral-300">Warning</th>
                  <th class="text-left py-2 text-neutral-300">Critical</th>
                  <th class="text-left py-2 text-neutral-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="param in assetSettings.telemetryParams" :key="param.name" class="border-b border-neutral-800">
                  <td class="py-2 text-white">{{ param.name }}</td>
                  <td class="py-2 text-neutral-300">{{ param.unit }}</td>
                  <td class="py-2 text-green-400">{{ param.normalRange }}</td>
                  <td class="py-2 text-yellow-400">{{ param.warningThreshold }}</td>
                  <td class="py-2 text-red-400">{{ param.criticalThreshold }}</td>
                  <td class="py-2">
                    <button class="text-indigo-400 hover:text-indigo-300 mr-2">Edit</button>
                    <button class="text-red-400 hover:text-red-300">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Add New Parameter
          </button>
        </div>
      </div>

      <!-- 5. Maintenance & Ticketing Rules -->
      <div v-show="activeTab === 'maintenance'" class="space-y-6">
        <h2 class="text-2xl font-semibold text-white mb-6">🛠 Maintenance & Ticketing Rules</h2>
        
        <!-- PM Templates -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Preventive Maintenance Templates</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-neutral-300">Active Templates: {{ maintenanceSettings.pmTemplates.length }}</span>
              <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Create Template
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="template in maintenanceSettings.pmTemplates" :key="template.id" class="bg-neutral-800 p-4 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-white font-medium">{{ template.name }}</h4>
                  <span class="text-neutral-400 text-sm">{{ template.interval }}</span>
                </div>
                <p class="text-neutral-400 text-sm mb-3">{{ template.description }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-neutral-400 text-sm">{{ template.checklist.length }} items</span>
                  <div class="space-x-2">
                    <button class="text-indigo-400 hover:text-indigo-300">Edit</button>
                    <button class="text-red-400 hover:text-red-300">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Predictive Maintenance -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Predictive Maintenance Settings</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Failure Probability Threshold (%)</label>
              <input v-model.number="maintenanceSettings.predictive.failureProbabilityThreshold" type="number" min="0" max="100" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">RUL Trigger (days)</label>
              <input v-model.number="maintenanceSettings.predictive.rulTrigger" type="number" min="1" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
            </div>
          </div>
        </div>

        <!-- Ticket Workflow -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Ticket Workflow Configuration</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">Ticket Status Flow</label>
              <div class="flex items-center space-x-2 text-white">
                <span class="bg-blue-600 px-3 py-1 rounded">New</span>
                <span>→</span>
                <span class="bg-yellow-600 px-3 py-1 rounded">In Progress</span>
                <span>→</span>
                <span class="bg-green-600 px-3 py-1 rounded">Resolved</span>
                <span>→</span>
                <span class="bg-gray-600 px-3 py-1 rounded">Closed</span>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-neutral-300 mb-2">Response Time SLA (hours)</label>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-neutral-400">Critical:</span>
                    <input v-model.number="maintenanceSettings.sla.critical.responseTime" type="number" class="w-20 bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-white">
                  </div>
                  <div class="flex justify-between">
                    <span class="text-neutral-400">High:</span>
                    <input v-model.number="maintenanceSettings.sla.high.responseTime" type="number" class="w-20 bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-white">
                  </div>
                  <div class="flex justify-between">
                    <span class="text-neutral-400">Medium:</span>
                    <input v-model.number="maintenanceSettings.sla.medium.responseTime" type="number" class="w-20 bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-white">
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-300 mb-2">Resolution Time SLA (hours)</label>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-neutral-400">Critical:</span>
                    <input v-model.number="maintenanceSettings.sla.critical.resolutionTime" type="number" class="w-20 bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-white">
                  </div>
                  <div class="flex justify-between">
                    <span class="text-neutral-400">High:</span>
                    <input v-model.number="maintenanceSettings.sla.high.resolutionTime" type="number" class="w-20 bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-white">
                  </div>
                  <div class="flex justify-between">
                    <span class="text-neutral-400">Medium:</span>
                    <input v-model.number="maintenanceSettings.sla.medium.resolutionTime" type="number" class="w-20 bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-white">
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-300 mb-2">Auto-Escalation (minutes)</label>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-neutral-400">Level 1:</span>
                    <input v-model.number="maintenanceSettings.escalation.level1" type="number" class="w-20 bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-white">
                  </div>
                  <div class="flex justify-between">
                    <span class="text-neutral-400">Level 2:</span>
                    <input v-model.number="maintenanceSettings.escalation.level2" type="number" class="w-20 bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-white">
                  </div>
                  <div class="flex justify-between">
                    <span class="text-neutral-400">Level 3:</span>
                    <input v-model.number="maintenanceSettings.escalation.level3" type="number" class="w-20 bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-white">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 6. Notification Settings -->
      <div v-show="activeTab === 'notifications'" class="space-y-6">
        <h2 class="text-2xl font-semibold text-white mb-6">🔔 Notification Settings</h2>
        
        <!-- Notification Channels -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Notification Channels</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="channel in notificationSettings.channels" :key="channel.name" class="bg-neutral-800 p-4 rounded-lg">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-2">
                  <span class="text-2xl">{{ channel.icon }}</span>
                  <span class="text-white font-medium">{{ channel.name }}</span>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="channel.enabled" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div v-if="channel.enabled" class="space-y-2">
                <input v-if="channel.name === 'Email'" v-model="channel.config.smtpServer" placeholder="SMTP Server" class="w-full bg-neutral-700 border border-neutral-600 rounded px-3 py-2 text-white text-sm">
                <input v-if="channel.name === 'WhatsApp'" v-model="channel.config.apiKey" placeholder="WhatsApp API Key" class="w-full bg-neutral-700 border border-neutral-600 rounded px-3 py-2 text-white text-sm">
                <input v-if="channel.name === 'SMS'" v-model="channel.config.provider" placeholder="SMS Provider" class="w-full bg-neutral-700 border border-neutral-600 rounded px-3 py-2 text-white text-sm">
              </div>
            </div>
          </div>
        </div>

        <!-- Priority Rules -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Priority Rules</h3>
          <div class="space-y-4">
            <div v-for="rule in notificationSettings.priorityRules" :key="rule.priority" class="bg-neutral-800 p-4 rounded-lg">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-2">
                  <span :class="rule.color">{{ rule.icon }}</span>
                  <span class="text-white font-medium">{{ rule.priority }} Priority</span>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-neutral-400 mb-1">Recipients</label>
                  <div class="space-y-1">
                    <label v-for="recipient in rule.recipients" :key="recipient.role" class="flex items-center">
                      <input v-model="recipient.enabled" type="checkbox" class="mr-2">
                      <span class="text-white text-sm">{{ recipient.role }}</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label class="block text-sm text-neutral-400 mb-1">Channels</label>
                  <div class="space-y-1">
                    <label v-for="channel in rule.channels" :key="channel.name" class="flex items-center">
                      <input v-model="channel.enabled" type="checkbox" class="mr-2">
                      <span class="text-white text-sm">{{ channel.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Escalation Chain -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Escalation Chain</h3>
          <div class="space-y-4">
            <div v-for="(level, index) in notificationSettings.escalationChain" :key="index" class="bg-neutral-800 p-4 rounded-lg">
              <div class="flex items-center justify-between mb-3">
                <span class="text-white font-medium">Level {{ index + 1 }} - {{ level.role }}</span>
                <span class="text-neutral-400 text-sm">{{ level.timeout }} minutes</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-neutral-400 mb-1">Timeout (minutes)</label>
                  <input v-model.number="level.timeout" type="number" class="w-full bg-neutral-700 border border-neutral-600 rounded px-3 py-2 text-white">
                </div>
                <div>
                  <label class="block text-sm text-neutral-400 mb-1">Notification Methods</label>
                  <div class="flex space-x-4">
                    <label v-for="method in level.methods" :key="method.name" class="flex items-center">
                      <input v-model="method.enabled" type="checkbox" class="mr-1">
                      <span class="text-white text-sm">{{ method.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 7. Data Management -->
      <div v-show="activeTab === 'data'" class="space-y-6">
        <h2 class="text-2xl font-semibold text-white mb-6">💾 Data Management</h2>
        
        <!-- Backup & Restore -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Backup & Restore</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-white font-medium mb-3">Automatic Backup</h4>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm text-neutral-400 mb-1">Backup Schedule</label>
                  <select v-model="dataSettings.backup.schedule" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm text-neutral-400 mb-1">Backup Time</label>
                  <input v-model="dataSettings.backup.time" type="time" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
                </div>
                <div>
                  <label class="block text-sm text-neutral-400 mb-1">Retention Period (days)</label>
                  <input v-model.number="dataSettings.backup.retentionDays" type="number" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
                </div>
              </div>
            </div>
            <div>
              <h4 class="text-white font-medium mb-3">Manual Operations</h4>
              <div class="space-y-3">
                <button class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Create Backup Now
                </button>
                <button class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Restore from Backup
                </button>
                <div class="text-sm text-neutral-400">
                  Last backup: {{ dataSettings.backup.lastBackup }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Retention -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Data Retention Policy</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm text-neutral-400 mb-2">Telemetry Data Retention (months)</label>
              <input v-model.number="dataSettings.retention.telemetryMonths" type="number" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
            </div>
            <div>
              <label class="block text-sm text-neutral-400 mb-2">Ticket History Retention (months)</label>
              <input v-model.number="dataSettings.retention.ticketMonths" type="number" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
            </div>
            <div>
              <label class="block text-sm text-neutral-400 mb-2">Audit Log Retention (months)</label>
              <input v-model.number="dataSettings.retention.auditMonths" type="number" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
            </div>
            <div>
              <label class="block text-sm text-neutral-400 mb-2">Report Archive Retention (years)</label>
              <input v-model.number="dataSettings.retention.reportYears" type="number" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
            </div>
          </div>
        </div>

        <!-- Archiving -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Data Archiving</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm text-neutral-400 mb-2">Archive Storage Location</label>
                <select v-model="dataSettings.archiving.storageType" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
                  <option value="local">Local Storage</option>
                  <option value="cloud">Cloud Storage</option>
                  <option value="network">Network Storage</option>
                </select>
              </div>
              <div>
                <label class="block text-sm text-neutral-400 mb-2">Auto-Archive After (months)</label>
                <input v-model.number="dataSettings.archiving.autoArchiveMonths" type="number" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
              </div>
            </div>
            <div class="flex space-x-4">
              <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Archive Old Data Now
              </button>
              <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                View Archived Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 8. Reporting & Dashboard Config -->
      <div v-show="activeTab === 'reporting'" class="space-y-6">
        <h2 class="text-2xl font-semibold text-white mb-6">🖨 Reporting & Dashboard Config</h2>
        
        <!-- Dashboard KPI Selection -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Dashboard KPI Selection</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="kpi in reportingSettings.availableKPIs" :key="kpi.id" class="bg-neutral-800 p-4 rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <label class="flex items-center">
                  <input v-model="kpi.enabled" type="checkbox" class="mr-2">
                  <span class="text-white font-medium">{{ kpi.name }}</span>
                </label>
              </div>
              <p class="text-neutral-400 text-sm">{{ kpi.description }}</p>
            </div>
          </div>
        </div>

        <!-- Custom Report Templates -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Custom Report Templates</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-neutral-300">Active Templates: {{ reportingSettings.customTemplates.length }}</span>
              <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Create New Template
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="template in reportingSettings.customTemplates" :key="template.id" class="bg-neutral-800 p-4 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-white font-medium">{{ template.name }}</h4>
                  <span class="text-neutral-400 text-sm">{{ template.type }}</span>
                </div>
                <p class="text-neutral-400 text-sm mb-3">{{ template.description }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-neutral-400 text-sm">{{ template.sections.length }} sections</span>
                  <div class="space-x-2">
                    <button class="text-indigo-400 hover:text-indigo-300">Edit</button>
                    <button class="text-green-400 hover:text-green-300">Preview</button>
                    <button class="text-red-400 hover:text-red-300">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Scheduled Reports -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Scheduled Report Distribution</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-neutral-300">Active Schedules: {{ reportingSettings.scheduledReports.length }}</span>
              <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Add Schedule
              </button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-neutral-700">
                    <th class="text-left py-2 text-neutral-300">Report Name</th>
                    <th class="text-left py-2 text-neutral-300">Frequency</th>
                    <th class="text-left py-2 text-neutral-300">Recipients</th>
                    <th class="text-left py-2 text-neutral-300">Next Run</th>
                    <th class="text-left py-2 text-neutral-300">Status</th>
                    <th class="text-left py-2 text-neutral-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="schedule in reportingSettings.scheduledReports" :key="schedule.id" class="border-b border-neutral-800">
                    <td class="py-2 text-white">{{ schedule.reportName }}</td>
                    <td class="py-2 text-neutral-300">{{ schedule.frequency }}</td>
                    <td class="py-2 text-neutral-300">{{ schedule.recipients.length }} users</td>
                    <td class="py-2 text-neutral-300">{{ schedule.nextRun }}</td>
                    <td class="py-2">
                      <span :class="schedule.active ? 'text-green-400' : 'text-red-400'">
                        {{ schedule.active ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td class="py-2">
                      <button class="text-indigo-400 hover:text-indigo-300 mr-2">Edit</button>
                      <button class="text-red-400 hover:text-red-300">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- 9. Advanced Settings -->
      <div v-show="activeTab === 'advanced'" class="space-y-6">
        <h2 class="text-2xl font-semibold text-white mb-6">🔧 Advanced Settings</h2>
        
        <!-- Performance Tuning -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Performance Tuning</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm text-neutral-400 mb-2">Data Polling Interval (seconds)</label>
              <input v-model.number="advancedSettings.performance.pollingInterval" type="number" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
            </div>
            <div>
              <label class="block text-sm text-neutral-400 mb-2">Cache Refresh Rate (minutes)</label>
              <input v-model.number="advancedSettings.performance.cacheRefreshRate" type="number" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
            </div>
            <div>
              <label class="block text-sm text-neutral-400 mb-2">Max Concurrent Connections</label>
              <input v-model.number="advancedSettings.performance.maxConnections" type="number" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
            </div>
            <div>
              <label class="block text-sm text-neutral-400 mb-2">Database Connection Pool Size</label>
              <input v-model.number="advancedSettings.performance.dbPoolSize" type="number" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
            </div>
          </div>
        </div>

        <!-- System Updates -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">System Updates</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-white font-medium">Current Version: {{ advancedSettings.system.currentVersion }}</div>
                <div class="text-neutral-400 text-sm">Last updated: {{ advancedSettings.system.lastUpdate }}</div>
              </div>
              <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Check for Updates
              </button>
            </div>
            <div class="bg-neutral-800 p-4 rounded-lg">
              <h4 class="text-white font-medium mb-2">Update History</h4>
              <div class="space-y-2">
                <div v-for="update in advancedSettings.system.updateHistory" :key="update.version" class="flex justify-between items-center">
                  <span class="text-neutral-300">{{ update.version }}</span>
                  <span class="text-neutral-400 text-sm">{{ update.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature Toggle -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Feature Toggle</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="feature in advancedSettings.features" :key="feature.name" class="bg-neutral-800 p-4 rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <span class="text-white font-medium">{{ feature.name }}</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="feature.enabled" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p class="text-neutral-400 text-sm">{{ feature.description }}</p>
            </div>
          </div>
        </div>

        <!-- Debug & Logging -->
        <div class="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
          <h3 class="text-lg font-semibold text-white mb-4">Debug & Logging</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm text-neutral-400 mb-2">Log Level</label>
              <select v-model="advancedSettings.logging.level" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
                <option value="error">Error</option>
                <option value="warn">Warning</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
              </select>
            </div>
            <div>
              <label class="block text-sm text-neutral-400 mb-2">Log Retention (days)</label>
              <input v-model.number="advancedSettings.logging.retentionDays" type="number" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
            </div>
          </div>
          <div class="mt-4 space-y-2">
            <label class="flex items-center">
              <input v-model="advancedSettings.logging.enableApiLogging" type="checkbox" class="mr-2">
              <span class="text-white">Enable API Request Logging</span>
            </label>
            <label class="flex items-center">
              <input v-model="advancedSettings.logging.enableErrorTracking" type="checkbox" class="mr-2">
              <span class="text-white">Enable Error Tracking</span>
            </label>
            <label class="flex items-center">
              <input v-model="advancedSettings.logging.enablePerformanceMonitoring" type="checkbox" class="mr-2">
              <span class="text-white">Enable Performance Monitoring</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="fixed bottom-6 right-6">
      <button @click="saveAllSettings" class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
        💾 Save All Settings
      </button>
    </div>

    <!-- Add Sensor Modal -->
    <div v-if="showAddSensorModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-neutral-900 rounded-xl p-6 w-full max-w-md border border-neutral-700">
        <h3 class="text-lg font-semibold text-white mb-4">Add New Sensor</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-neutral-400 mb-1">Sensor ID</label>
            <input v-model="newSensor.id" type="text" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
          </div>
          <div>
            <label class="block text-sm text-neutral-400 mb-1">Type</label>
            <select v-model="newSensor.type" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
              <option value="temperature">Temperature</option>
              <option value="pressure">Pressure</option>
              <option value="vibration">Vibration</option>
              <option value="flow">Flow</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-neutral-400 mb-1">Asset</label>
            <input v-model="newSensor.asset" type="text" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
          </div>
          <div>
            <label class="block text-sm text-neutral-400 mb-1">Polling Rate (seconds)</label>
            <input v-model.number="newSensor.pollingRate" type="number" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
          </div>
        </div>
        <div class="flex space-x-3 mt-6">
          <button @click="addSensor" class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Add Sensor
          </button>
          <button @click="showAddSensorModal = false" class="flex-1 px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

// Types
interface Sensor {
  id: string
  type: string
  asset: string
  pollingRate: number
  status: 'online' | 'offline'
}

interface APIKey {
  id: string
  name: string
  key: string
}

interface Integration {
  name: string
  description: string
  connected: boolean
}

interface PMTemplate {
  id: string
  name: string
  description: string
  interval: string
  checklist: string[]
}

interface TelemetryParam {
  name: string
  unit: string
  normalRange: string
  warningThreshold: string
  criticalThreshold: string
}

interface NotificationChannel {
  name: string
  icon: string
  enabled: boolean
  config: Record<string, any>
}

interface KPI {
  id: string
  name: string
  description: string
  enabled: boolean
}

interface ReportTemplate {
  id: string
  name: string
  description: string
  type: string
  sections: string[]
}

interface ScheduledReport {
  id: string
  reportName: string
  frequency: string
  recipients: string[]
  nextRun: string
  active: boolean
}

interface Feature {
  name: string
  description: string
  enabled: boolean
}

// Reactive data
const activeTab = ref('system')
const showAddSensorModal = ref(false)

const tabs = [
  { id: 'system', name: 'System Settings', icon: '⚙️' },
  { id: 'security', name: 'Security & Access', icon: '🔐' },
  { id: 'connectivity', name: 'Connectivity', icon: '🌐' },
  { id: 'asset', name: 'Asset & Telemetry', icon: '🏭' },
  { id: 'maintenance', name: 'Maintenance', icon: '🛠' },
  { id: 'notifications', name: 'Notifications', icon: '🔔' },
  { id: 'data', name: 'Data Management', icon: '💾' },
  { id: 'reporting', name: 'Reporting', icon: '📊' },
  { id: 'advanced', name: 'Advanced', icon: '🔧' }
]

const stats = reactive({
  activeUsers: 24,
  connectedSensors: 156,
  activeIntegrations: 8,
  systemHealth: 98
})

const systemSettings = reactive({
  systemName: 'Predictive Monitoring System',
  language: 'id',
  timezone: 'Asia/Jakarta',
  dateFormat: 'DD/MM/YYYY',
  theme: 'dark',
  units: {
    temperature: 'celsius',
    energy: 'kWh',
    pressure: 'bar'
  }
})

const securitySettings = reactive({
  totalUsers: 24,
  roles: {
    admin: 3,
    supervisor: 8,
    technician: 13
  },
  passwordPolicy: {
    minLength: 8,
    expiryDays: 90,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: true
  },
  mfa: {
    enabled: true,
    methods: ['sms', 'email']
  },
  sso: {
    activeDirectory: false,
    google: true
  }
})

const connectivitySettings = reactive({
  sensors: [
    { id: 'TEMP-001', type: 'Temperature', asset: 'Boiler #1', pollingRate: 30, status: 'online' },
    { id: 'PRES-002', type: 'Pressure', asset: 'Compressor A', pollingRate: 15, status: 'online' },
    { id: 'VIB-003', type: 'Vibration', asset: 'Motor B', pollingRate: 60, status: 'offline' }
  ] as Sensor[],
  apiKeys: [
    { id: '1', name: 'Production API', key: 'pk_live_51H7qABC123456789' },
    { id: '2', name: 'Development API', key: 'pk_test_51H7qDEF987654321' }
  ] as APIKey[],
  webhookUrl: 'https://api.example.com/webhook',
  integrations: [
    { name: 'SAP ERP', description: 'Enterprise Resource Planning', connected: true },
    { name: 'Microsoft Teams', description: 'Team collaboration', connected: true },
    { name: 'Slack', description: 'Instant messaging', connected: false },
    { name: 'Grafana', description: 'Data visualization', connected: true },
    { name: 'Prometheus', description: 'Monitoring system', connected: false },
    { name: 'InfluxDB', description: 'Time series database', connected: true }
  ] as Integration[]
})

const assetSettings = reactive({
  assetTypes: ['Boiler', 'Compressor', 'Motor', 'Pump', 'Generator'],
  productionLines: ['Line A', 'Line B', 'Line C', 'Packaging'],
  factoryAreas: ['Production Floor', 'Warehouse', 'Quality Control', 'Maintenance Shop'],
  telemetryParams: [
    { name: 'Temperature', unit: '°C', normalRange: '20-80', warningThreshold: '>85', criticalThreshold: '>95' },
    { name: 'Pressure', unit: 'bar', normalRange: '1-10', warningThreshold: '>12', criticalThreshold: '>15' },
    { name: 'Vibration', unit: 'mm/s', normalRange: '0-5', warningThreshold: '>7', criticalThreshold: '>10' },
    { name: 'Flow Rate', unit: 'L/min', normalRange: '50-200', warningThreshold: '<40', criticalThreshold: '<30' }
  ] as TelemetryParam[]
})

const maintenanceSettings = reactive({
  pmTemplates: [
    { id: '1', name: 'Monthly Motor Check', description: 'Routine motor inspection', interval: 'Monthly', checklist: ['Visual inspection', 'Lubrication', 'Vibration check'] },
    { id: '2', name: 'Weekly Boiler Maintenance', description: 'Boiler safety check', interval: 'Weekly', checklist: ['Pressure check', 'Safety valve test', 'Water level'] }
  ] as PMTemplate[],
  predictive: {
    failureProbabilityThreshold: 75,
    rulTrigger: 30
  },
  sla: {
    critical: { responseTime: 1, resolutionTime: 4 },
    high: { responseTime: 2, resolutionTime: 8 },
    medium: { responseTime: 4, resolutionTime: 24 }
  },
  escalation: {
    level1: 30,
    level2: 60,
    level3: 120
  }
})

const notificationSettings = reactive({
  channels: [
    { name: 'Email', icon: '📧', enabled: true, config: { smtpServer: 'smtp.company.com' } },
    { name: 'WhatsApp', icon: '💬', enabled: true, config: { apiKey: 'wa_api_key_123' } },
    { name: 'SMS', icon: '📱', enabled: false, config: { provider: 'Twilio' } },
    { name: 'Slack', icon: '💬', enabled: true, config: { webhook: 'https://hooks.slack.com/...' } }
  ] as NotificationChannel[],
  priorityRules: [
    {
      priority: 'Critical',
      icon: '🚨',
      color: 'text-red-400',
      recipients: [
        { role: 'Plant Manager', enabled: true },
        { role: 'Maintenance Supervisor', enabled: true },
        { role: 'Safety Officer', enabled: true }
      ],
      channels: [
        { name: 'Email', enabled: true },
        { name: 'WhatsApp', enabled: true },
        { name: 'SMS', enabled: true }
      ]
    },
    {
      priority: 'High',
      icon: '⚠️',
      color: 'text-orange-400',
      recipients: [
        { role: 'Maintenance Supervisor', enabled: true },
        { role: 'Technician Lead', enabled: true }
      ],
      channels: [
        { name: 'Email', enabled: true },
        { name: 'WhatsApp', enabled: true }
      ]
    },
    {
      priority: 'Medium',
      icon: '📋',
      color: 'text-yellow-400',
      recipients: [
        { role: 'Technician', enabled: true }
      ],
      channels: [
        { name: 'Email', enabled: true }
      ]
    }
  ],
  escalationChain: [
    {
      role: 'Technician',
      timeout: 30,
      methods: [
        { name: 'Email', enabled: true },
        { name: 'WhatsApp', enabled: true }
      ]
    },
    {
      role: 'Supervisor',
      timeout: 60,
      methods: [
        { name: 'Email', enabled: true },
        { name: 'WhatsApp', enabled: true },
        { name: 'SMS', enabled: true }
      ]
    },
    {
      role: 'Manager',
      timeout: 120,
      methods: [
        { name: 'Email', enabled: true },
        { name: 'WhatsApp', enabled: true },
        { name: 'SMS', enabled: true }
      ]
    }
  ]
})

const dataSettings = reactive({
  backup: {
    schedule: 'daily',
    time: '02:00',
    retentionDays: 30,
    lastBackup: '2024-01-15 02:00:00'
  },
  retention: {
    telemetryMonths: 12,
    ticketMonths: 24,
    auditMonths: 36,
    reportYears: 5
  },
  archiving: {
    storageType: 'cloud',
    autoArchiveMonths: 6
  }
})

const reportingSettings = reactive({
  availableKPIs: [
    { id: '1', name: 'Overall Equipment Effectiveness (OEE)', description: 'Measure of manufacturing productivity', enabled: true },
    { id: '2', name: 'Mean Time Between Failures (MTBF)', description: 'Average time between equipment failures', enabled: true },
    { id: '3', name: 'Mean Time To Repair (MTTR)', description: 'Average time to repair equipment', enabled: true },
    { id: '4', name: 'Energy Efficiency', description: 'Energy consumption per unit of production', enabled: false },
    { id: '5', name: 'Predictive Accuracy', description: 'Accuracy of failure predictions', enabled: true },
    { id: '6', name: 'Maintenance Cost Ratio', description: 'Maintenance cost as % of asset value', enabled: false }
  ] as KPI[],
  customTemplates: [
    { id: '1', name: 'Monthly Operations Report', description: 'Comprehensive monthly overview', type: 'Monthly', sections: ['Executive Summary', 'KPIs', 'Incidents', 'Maintenance'] },
    { id: '2', name: 'Equipment Health Report', description: 'Detailed equipment status', type: 'Weekly', sections: ['Asset Status', 'Predictive Insights', 'Recommendations'] }
  ] as ReportTemplate[],
  scheduledReports: [
    { id: '1', reportName: 'Monthly Operations Report', frequency: 'Monthly', recipients: ['manager@company.com'], nextRun: '2024-02-01 08:00', active: true },
    { id: '2', reportName: 'Weekly Equipment Health', frequency: 'Weekly', recipients: ['supervisor@company.com'], nextRun: '2024-01-22 09:00', active: true }
  ] as ScheduledReport[]
})

const advancedSettings = reactive({
  performance: {
    pollingInterval: 30,
    cacheRefreshRate: 5,
    maxConnections: 100,
    dbPoolSize: 20
  },
  system: {
    currentVersion: 'v2.1.3',
    lastUpdate: '2024-01-15',
    updateHistory: [
      { version: 'v2.1.3', date: '2024-01-15' },
      { version: 'v2.1.2', date: '2024-01-01' },
      { version: 'v2.1.1', date: '2023-12-15' }
    ]
  },
  features: [
    { name: 'Predictive Analytics', description: 'AI-powered failure prediction', enabled: true },
    { name: 'Real-time Alerts', description: 'Instant notification system', enabled: true },
    { name: 'Mobile App Integration', description: 'Mobile device support', enabled: false },
    { name: 'Voice Commands', description: 'Voice-controlled operations', enabled: false },
    { name: 'Augmented Reality', description: 'AR-assisted maintenance', enabled: false },
    { name: 'Blockchain Audit Trail', description: 'Immutable audit logging', enabled: false }
  ] as Feature[],
  logging: {
    level: 'info',
    retentionDays: 30,
    enableApiLogging: true,
    enableErrorTracking: true,
    enablePerformanceMonitoring: false
  }
})

// New sensor form
const newSensor = reactive({
  id: '',
  type: 'temperature',
  asset: '',
  pollingRate: 30
})

// New asset type inputs
const newAssetType = ref('')
const newProductionLine = ref('')
const newFactoryArea = ref('')

// Methods
const addSensor = () => {
  if (newSensor.id && newSensor.asset) {
    connectivitySettings.sensors.push({
      ...newSensor,
      status: 'online'
    })
    
    // Reset form
    Object.assign(newSensor, {
      id: '',
      type: 'temperature',
      asset: '',
      pollingRate: 30
    })
    
    showAddSensorModal.value = false
  }
}

const addAssetType = () => {
  if (newAssetType.value.trim()) {
    assetSettings.assetTypes.push(newAssetType.value.trim())
    newAssetType.value = ''
  }
}

const addProductionLine = () => {
  if (newProductionLine.value.trim()) {
    assetSettings.productionLines.push(newProductionLine.value.trim())
    newProductionLine.value = ''
  }
}

const addFactoryArea = () => {
  if (newFactoryArea.value.trim()) {
    assetSettings.factoryAreas.push(newFactoryArea.value.trim())
    newFactoryArea.value = ''
  }
}

const saveAllSettings = () => {
  // Simulate saving all settings
  console.log('Saving all configuration settings...')
  
  // Show success message (you can implement a toast notification here)
  alert('All settings have been saved successfully!')
}
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #262626;
}

::-webkit-scrollbar-thumb {
  background: #525252;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #737373;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.2s ease-in-out;
}

/* Animation for stats cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}

/* Hover effects */
.hover-scale:hover {
  transform: scale(1.02);
}

/* Focus styles */
input:focus, select:focus, textarea:focus {
  outline: none;
  ring: 2px;
  ring-color: #6366f1;
}

/* Table hover effects */
tbody tr:hover {
  background-color: rgba(64, 64, 64, 0.3);
}

/* Button hover effects */
button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Modal backdrop */
.modal-backdrop {
  backdrop-filter: blur(4px);
}
</style>


