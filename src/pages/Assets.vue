<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
        🏭 Asset Management
      </h1>
      <p class="text-neutral-400 mt-2">Comprehensive asset inventory, health monitoring, and lifecycle management</p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="p-4 bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl border border-blue-800/30">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-400 text-sm font-semibold">Total Assets</p>
            <p class="text-2xl font-bold text-white">{{ totalAssets }}</p>
          </div>
          <div class="text-blue-400">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="p-4 bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-xl border border-green-800/30">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-400 text-sm font-semibold">Active Assets</p>
            <p class="text-2xl font-bold text-white">{{ activeAssets }}</p>
          </div>
          <div class="text-green-400">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="p-4 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 rounded-xl border border-yellow-800/30">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-yellow-400 text-sm font-semibold">In Maintenance</p>
            <p class="text-2xl font-bold text-white">{{ maintenanceAssets }}</p>
          </div>
          <div class="text-yellow-400">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="p-4 bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-xl border border-purple-800/30">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-400 text-sm font-semibold">Avg Health Score</p>
            <p class="text-2xl font-bold text-white">{{ avgHealthScore }}%</p>
          </div>
          <div class="text-purple-400">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Tabs -->
    <div class="bg-neutral-900/50 rounded-xl border border-neutral-800 overflow-hidden">
      <!-- Tab Navigation -->
      <div class="flex overflow-x-auto bg-neutral-900/70 border-b border-neutral-800">
        <button v-for="tab in tabs" :key="tab.id" 
                @click="activeTab = tab.id"
                :class="[
                  'px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-200',
                  activeTab === tab.id 
                    ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-900/20' 
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                ]">
          {{ tab.icon }} {{ tab.name }}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="p-6">
        <!-- 1. Asset Inventory & Master Data -->
        <div v-if="activeTab === 'inventory'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-white">📋 Asset Inventory & Master Data</h2>
            <button @click="showAddAssetModal = true" 
                    class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors">
              + Add New Asset
            </button>
          </div>

          <!-- Search and Filter -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <input v-model="searchTerm" 
                   placeholder="Search assets..." 
                   class="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400">
            <select v-model="filterStatus" 
                    class="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="standby">Standby</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <select v-model="filterCategory" 
                    class="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white">
              <option value="">All Categories</option>
              <option value="Compressor">Compressor</option>
              <option value="Pump">Pump</option>
              <option value="Motor">Motor</option>
              <option value="Conveyor">Conveyor</option>
            </select>
            <select v-model="filterLocation" 
                    class="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white">
              <option value="">All Locations</option>
              <option value="Plant A">Plant A</option>
              <option value="Plant B">Plant B</option>
              <option value="Line 1">Line 1</option>
              <option value="Line 2">Line 2</option>
            </select>
          </div>

          <!-- Assets Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="asset in filteredAssets" :key="asset.id" 
                 class="bg-neutral-800/50 rounded-xl border border-neutral-700 p-6 hover:border-neutral-600 transition-all duration-200">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-lg font-bold text-white">{{ asset.name }}</h3>
                  <p class="text-sm text-neutral-400">{{ asset.machineId }}</p>
                </div>
                <span :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  asset.status === 'active' ? 'bg-green-900/30 text-green-400 border border-green-800' :
                  asset.status === 'standby' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800' :
                  asset.status === 'maintenance' ? 'bg-red-900/30 text-red-400 border border-red-800' :
                  'bg-neutral-900/30 text-neutral-400 border border-neutral-800'
                ]">
                  {{ asset.status.toUpperCase() }}
                </span>
              </div>
              
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-neutral-400">Category:</span>
                  <span class="text-white">{{ asset.category }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Location:</span>
                  <span class="text-white">{{ asset.location }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Serial Number:</span>
                  <span class="text-white">{{ asset.serialNumber }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Purchase Year:</span>
                  <span class="text-white">{{ asset.purchaseYear }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Age:</span>
                  <span class="text-white">{{ new Date().getFullYear() - asset.purchaseYear }} years</span>
                </div>
              </div>

              <div class="mt-4 pt-4 border-t border-neutral-700 flex gap-2">
                <button @click="viewAssetDetails(asset)" 
                        class="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-semibold transition-colors">
                  View Details
                </button>
                <button @click="editAsset(asset)" 
                        class="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-white text-sm transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Asset Health & Lifecycle -->
        <div v-if="activeTab === 'health'" class="space-y-6">
          <h2 class="text-2xl font-bold text-white">🛠 Asset Health & Lifecycle</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div v-for="asset in assets" :key="asset.id" 
                 class="bg-neutral-800/50 rounded-xl border border-neutral-700 p-6">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <h3 class="text-lg font-bold text-white">{{ asset.name }}</h3>
                  <p class="text-sm text-neutral-400">{{ asset.machineId }}</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold" :class="[
                    asset.healthScore >= 80 ? 'text-green-400' :
                    asset.healthScore >= 60 ? 'text-yellow-400' :
                    'text-red-400'
                  ]">
                    {{ asset.healthScore }}%
                  </div>
                  <p class="text-xs text-neutral-400">Health Score</p>
                </div>
              </div>

              <!-- Health Score Bar -->
              <div class="mb-4">
                <div class="w-full bg-neutral-700 rounded-full h-3">
                  <div :class="[
                    'h-3 rounded-full transition-all duration-500',
                    asset.healthScore >= 80 ? 'bg-gradient-to-r from-green-500 to-green-400' :
                    asset.healthScore >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                    'bg-gradient-to-r from-red-500 to-red-400'
                  ]" :style="`width: ${asset.healthScore}%`"></div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p class="text-neutral-400">Remaining Useful Life</p>
                  <p class="text-white font-semibold">{{ asset.remainingLife }} months</p>
                </div>
                <div>
                  <p class="text-neutral-400">MTBF</p>
                  <p class="text-white font-semibold">{{ asset.mtbf }} hours</p>
                </div>
                <div>
                  <p class="text-neutral-400">Last Maintenance</p>
                  <p class="text-white font-semibold">{{ asset.lastMaintenance }}</p>
                </div>
                <div>
                  <p class="text-neutral-400">Next Maintenance</p>
                  <p class="text-white font-semibold">{{ asset.nextMaintenance }}</p>
                </div>
              </div>

              <div v-if="asset.replacementRecommended" 
                   class="mt-4 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                <p class="text-red-400 text-sm font-semibold">⚠️ Replacement Recommended</p>
                <p class="text-red-300 text-xs mt-1">Asset approaching end-of-life. Consider replacement planning.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Sensor & Connectivity -->
        <div v-if="activeTab === 'sensors'" class="space-y-6">
          <h2 class="text-2xl font-bold text-white">🔗 Sensor & Connectivity</h2>
          
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div v-for="asset in assets" :key="asset.id" 
                 class="bg-neutral-800/50 rounded-xl border border-neutral-700 p-6">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <h3 class="text-lg font-bold text-white">{{ asset.name }}</h3>
                  <p class="text-sm text-neutral-400">{{ asset.machineId }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <div :class="[
                    'w-3 h-3 rounded-full',
                    asset.connectivity === 'online' ? 'bg-green-400' : 'bg-red-400'
                  ]"></div>
                  <span :class="[
                    'text-sm font-semibold',
                    asset.connectivity === 'online' ? 'text-green-400' : 'text-red-400'
                  ]">
                    {{ asset.connectivity.toUpperCase() }}
                  </span>
                </div>
              </div>

              <div class="space-y-3">
                <div v-for="sensor in asset.sensors" :key="sensor.id" 
                     class="flex justify-between items-center p-3 bg-neutral-900/50 rounded-lg">
                  <div>
                    <p class="text-white font-semibold">{{ sensor.name }}</p>
                    <p class="text-xs text-neutral-400">{{ sensor.type }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-white font-semibold">{{ sensor.value }} {{ sensor.unit }}</p>
                    <div class="flex items-center gap-2">
                      <div :class="[
                        'w-2 h-2 rounded-full',
                        sensor.status === 'online' ? 'bg-green-400' : 'bg-red-400'
                      ]"></div>
                      <span :class="[
                        'text-xs',
                        sensor.status === 'online' ? 'text-green-400' : 'text-red-400'
                      ]">
                        {{ sensor.status }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Performance & Utilization -->
        <div v-if="activeTab === 'performance'" class="space-y-6">
          <h2 class="text-2xl font-bold text-white">📊 Performance & Utilization</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div v-for="asset in assets" :key="asset.id" 
                 class="bg-neutral-800/50 rounded-xl border border-neutral-700 p-6">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <h3 class="text-lg font-bold text-white">{{ asset.name }}</h3>
                  <p class="text-sm text-neutral-400">{{ asset.machineId }}</p>
                </div>
                <div class="text-right">
                  <div class="text-xl font-bold text-blue-400">{{ asset.utilization }}%</div>
                  <p class="text-xs text-neutral-400">Utilization</p>
                </div>
              </div>

              <!-- Utilization Bar -->
              <div class="mb-4">
                <div class="w-full bg-neutral-700 rounded-full h-2">
                  <div class="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-500" 
                       :style="`width: ${asset.utilization}%`"></div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p class="text-neutral-400">Operating Hours</p>
                  <p class="text-white font-semibold">{{ asset.operatingHours.toLocaleString() }} hrs</p>
                </div>
                <div>
                  <p class="text-neutral-400">Idle Time</p>
                  <p class="text-white font-semibold">{{ asset.idleTime }}%</p>
                </div>
                <div>
                  <p class="text-neutral-400">Energy Consumption</p>
                  <p class="text-white font-semibold">{{ asset.energyConsumption }} kWh</p>
                </div>
                <div>
                  <p class="text-neutral-400">Efficiency</p>
                  <p class="text-white font-semibold">{{ asset.efficiency }}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Documentation & Attachments -->
        <div v-if="activeTab === 'documentation'" class="space-y-6">
          <h2 class="text-2xl font-bold text-white">🧾 Documentation & Attachments</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div v-for="asset in assets" :key="asset.id" 
                 class="bg-neutral-800/50 rounded-xl border border-neutral-700 p-6">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <h3 class="text-lg font-bold text-white">{{ asset.name }}</h3>
                  <p class="text-sm text-neutral-400">{{ asset.machineId }}</p>
                </div>
                <button class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-colors">
                  Upload
                </button>
              </div>

              <div class="space-y-3">
                <div v-for="doc in asset.documents" :key="doc.id" 
                     class="flex items-center justify-between p-3 bg-neutral-900/50 rounded-lg hover:bg-neutral-900/70 transition-colors">
                  <div class="flex items-center gap-3">
                    <div :class="[
                      'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold',
                      doc.type === 'manual' ? 'bg-blue-900/30 text-blue-400' :
                      doc.type === 'photo' ? 'bg-green-900/30 text-green-400' :
                      doc.type === 'report' ? 'bg-purple-900/30 text-purple-400' :
                      'bg-orange-900/30 text-orange-400'
                    ]">
                      {{ doc.type === 'manual' ? '📖' : doc.type === 'photo' ? '📷' : doc.type === 'report' ? '📊' : '📄' }}
                    </div>
                    <div>
                      <p class="text-white font-semibold">{{ doc.name }}</p>
                      <p class="text-xs text-neutral-400">{{ doc.uploadDate }} • {{ doc.size }}</p>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <button class="px-2 py-1 bg-neutral-700 hover:bg-neutral-600 rounded text-white text-xs transition-colors">
                      View
                    </button>
                    <button class="px-2 py-1 bg-neutral-700 hover:bg-neutral-600 rounded text-white text-xs transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 6. Asset Actions & Tools -->
        <div v-if="activeTab === 'actions'" class="space-y-6">
          <h2 class="text-2xl font-bold text-white">⚙️ Asset Actions & Tools</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="asset in assets" :key="asset.id" 
                 class="bg-neutral-800/50 rounded-xl border border-neutral-700 p-6">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <h3 class="text-lg font-bold text-white">{{ asset.name }}</h3>
                  <p class="text-sm text-neutral-400">{{ asset.machineId }}</p>
                </div>
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-semibold',
                  asset.status === 'active' ? 'bg-green-900/30 text-green-400' :
                  asset.status === 'standby' ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-red-900/30 text-red-400'
                ]">
                  {{ asset.status.toUpperCase() }}
                </span>
              </div>

              <div class="space-y-3">
                <button class="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                  </svg>
                  Create Work Order
                </button>
                
                <button class="w-full px-4 py-3 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-white font-semibold transition-colors flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                  </svg>
                  Edit Asset Data
                </button>
                
                <button class="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-colors flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010 2h1.586l-2.293 2.293a1 1 0 001.414 1.414L15 8.414V10a1 1 0 002 0V6a1 1 0 00-1-1h-4z" clip-rule="evenodd"/>
                  </svg>
                  Print QR Code
                </button>
                
                <button class="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition-colors flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clip-rule="evenodd"/>
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 3a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
                  </svg>
                  Decommission Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add New Asset Modal -->
    <div v-if="showAddAssetModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-neutral-900 rounded-xl border border-neutral-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex justify-between items-center p-6 border-b border-neutral-700">
          <h2 class="text-2xl font-bold text-white">➕ Add New Asset</h2>
          <button @click="showAddAssetModal = false" class="text-neutral-400 hover:text-white text-2xl">✕</button>
        </div>

        <!-- Modal Content -->
        <form @submit.prevent="addNewAsset" class="p-6 space-y-6">
          <!-- Basic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                📋 Basic Information
              </h3>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-neutral-300 mb-2">Asset Name *</label>
              <input v-model="newAsset.name" 
                     type="text" 
                     required
                     placeholder="e.g., Main Compressor Unit A"
                     class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-300 mb-2">Machine ID *</label>
              <input v-model="newAsset.machineId" 
                     type="text" 
                     required
                     placeholder="e.g., COMP-A-001"
                     class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-300 mb-2">Category *</label>
              <select v-model="newAsset.category" 
                      required
                      class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-blue-500 focus:outline-none">
                <option value="">Select Category</option>
                <option value="Compressor">Compressor</option>
                <option value="Pump">Pump</option>
                <option value="Motor">Motor</option>
                <option value="Conveyor">Conveyor</option>
                <option value="Generator">Generator</option>
                <option value="Transformer">Transformer</option>
                <option value="Valve">Valve</option>
                <option value="Heat Exchanger">Heat Exchanger</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-300 mb-2">Location *</label>
              <select v-model="newAsset.location" 
                      required
                      class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-blue-500 focus:outline-none">
                <option value="">Select Location</option>
                <option value="Plant A - Line 1">Plant A - Line 1</option>
                <option value="Plant A - Line 2">Plant A - Line 2</option>
                <option value="Plant B - Line 1">Plant B - Line 1</option>
                <option value="Plant B - Line 2">Plant B - Line 2</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Maintenance Shop">Maintenance Shop</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-300 mb-2">Status *</label>
              <select v-model="newAsset.status" 
                      required
                      class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-blue-500 focus:outline-none">
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="standby">Standby</option>
                <option value="maintenance">Maintenance</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-300 mb-2">Serial Number *</label>
              <input v-model="newAsset.serialNumber" 
                     type="text" 
                     required
                     placeholder="e.g., SN-COMP-2024-001"
                     class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none">
            </div>
          </div>

          <!-- Technical Specifications -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                ⚙️ Technical Specifications
              </h3>
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-300 mb-2">Tag Number</label>
              <input v-model="newAsset.tagNumber" 
                     type="text" 
                     placeholder="e.g., TAG-001"
                     class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-300 mb-2">Purchase Year *</label>
              <input v-model.number="newAsset.purchaseYear" 
                     type="number" 
                     required
                     :min="1990"
                     :max="new Date().getFullYear()"
                     placeholder="e.g., 2024"
                     class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-300 mb-2">Vendor/Manufacturer</label>
              <input v-model="newAsset.vendor" 
                     type="text" 
                     placeholder="e.g., Atlas Copco"
                     class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-300 mb-2">Model</label>
              <input v-model="newAsset.model" 
                     type="text" 
                     placeholder="e.g., GA-75-VSD"
                     class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-300 mb-2">Capacity</label>
              <input v-model="newAsset.capacity" 
                     type="text" 
                     placeholder="e.g., 75 kW or 500 L/min"
                     class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-300 mb-2">Power Rating</label>
              <input v-model="newAsset.powerRating" 
                     type="text" 
                     placeholder="e.g., 75 kW"
                     class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none">
            </div>
          </div>

          <!-- Initial Health & Performance Data -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-3">
              <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                📊 Initial Health & Performance Data
              </h3>
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-300 mb-2">Health Score (%)</label>
              <input v-model.number="newAsset.healthScore" 
                     type="number" 
                     min="0" 
                     max="100"
                     placeholder="e.g., 95"
                     class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-300 mb-2">Expected Life (months)</label>
              <input v-model.number="newAsset.remainingLife" 
                     type="number" 
                     min="0"
                     placeholder="e.g., 120"
                     class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-300 mb-2">MTBF (hours)</label>
              <input v-model.number="newAsset.mtbf" 
                     type="number" 
                     min="0"
                     placeholder="e.g., 2400"
                     class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none">
            </div>
          </div>

          <!-- Maintenance Schedule -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                🔧 Maintenance Schedule
              </h3>
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-300 mb-2">Last Maintenance Date</label>
              <input v-model="newAsset.lastMaintenance" 
                     type="date"
                     class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-blue-500 focus:outline-none">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-300 mb-2">Next Maintenance Date</label>
              <input v-model="newAsset.nextMaintenance" 
                     type="date"
                     class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-blue-500 focus:outline-none">
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex gap-4 pt-6 border-t border-neutral-700">
            <button type="button" 
                    @click="showAddAssetModal = false" 
                    class="flex-1 px-6 py-3 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-white font-semibold transition-colors">
              Cancel
            </button>
            <button type="submit" 
                    class="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors">
              Add Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Interfaces
interface Sensor {
  id: string
  name: string
  type: string
  value: number
  unit: string
  status: 'online' | 'offline'
}

interface Document {
  id: string
  name: string
  type: 'manual' | 'photo' | 'report' | 'contract'
  uploadDate: string
  size: string
}

interface Asset {
  id: string
  name: string
  machineId: string
  category: string
  location: string
  status: 'active' | 'standby' | 'maintenance' | 'offline'
  serialNumber: string
  tagNumber: string
  purchaseYear: number
  vendor: string
  model: string
  capacity: string
  powerRating: string
  healthScore: number
  remainingLife: number
  mtbf: number
  lastMaintenance: string
  nextMaintenance: string
  replacementRecommended: boolean
  connectivity: 'online' | 'offline'
  sensors: Sensor[]
  operatingHours: number
  idleTime: number
  utilization: number
  energyConsumption: number
  efficiency: number
  documents: Document[]
}

// Reactive data
const activeTab = ref('inventory')
const searchTerm = ref('')
const filterStatus = ref('')
const filterCategory = ref('')
const filterLocation = ref('')
const showAddAssetModal = ref(false)

const tabs = [
  { id: 'inventory', name: 'Inventory & Master Data', icon: '📋' },
  { id: 'health', name: 'Health & Lifecycle', icon: '🛠' },
  { id: 'sensors', name: 'Sensor & Connectivity', icon: '🔗' },
  { id: 'performance', name: 'Performance & Utilization', icon: '📊' },
  { id: 'documentation', name: 'Documentation', icon: '🧾' },
  { id: 'actions', name: 'Actions & Tools', icon: '⚙️' }
]

const assets = ref<Asset[]>([
  {
    id: 'AST-001',
    name: 'Main Compressor Unit A',
    machineId: 'COMP-A-001',
    category: 'Compressor',
    location: 'Plant A - Line 1',
    status: 'active',
    serialNumber: 'SN-COMP-2023-001',
    tagNumber: 'TAG-001',
    purchaseYear: 2023,
    vendor: 'Atlas Copco',
    model: 'GA-75-VSD',
    capacity: '75 kW',
    powerRating: '75 kW',
    healthScore: 92,
    remainingLife: 84,
    mtbf: 2400,
    lastMaintenance: '2024-11-15',
    nextMaintenance: '2025-02-15',
    replacementRecommended: false,
    connectivity: 'online',
    sensors: [
      { id: 'S1', name: 'Temperature', type: 'Temperature Sensor', value: 65, unit: '°C', status: 'online' },
      { id: 'S2', name: 'Pressure', type: 'Pressure Sensor', value: 8.5, unit: 'bar', status: 'online' },
      { id: 'S3', name: 'Vibration', type: 'Vibration Sensor', value: 2.1, unit: 'mm/s', status: 'online' }
    ],
    operatingHours: 15420,
    idleTime: 12,
    utilization: 88,
    energyConsumption: 1250,
    efficiency: 94,
    documents: [
      { id: 'D1', name: 'Operation Manual', type: 'manual', uploadDate: '2023-01-15', size: '2.5 MB' },
      { id: 'D2', name: 'Installation Photos', type: 'photo', uploadDate: '2023-01-20', size: '15.2 MB' },
      { id: 'D3', name: 'Warranty Certificate', type: 'contract', uploadDate: '2023-01-15', size: '1.1 MB' }
    ]
  },
  {
    id: 'AST-002',
    name: 'Hydraulic Pump B',
    machineId: 'PUMP-B-002',
    category: 'Pump',
    location: 'Plant A - Line 2',
    status: 'maintenance',
    serialNumber: 'SN-PUMP-2022-002',
    tagNumber: 'TAG-002',
    purchaseYear: 2022,
    vendor: 'Grundfos',
    model: 'CR-64-2-2',
    capacity: '45 kW',
    powerRating: '45 kW',
    healthScore: 67,
    remainingLife: 36,
    mtbf: 1800,
    lastMaintenance: '2024-12-01',
    nextMaintenance: '2025-01-01',
    replacementRecommended: false,
    connectivity: 'online',
    sensors: [
      { id: 'S4', name: 'Flow Rate', type: 'Flow Sensor', value: 120, unit: 'L/min', status: 'online' },
      { id: 'S5', name: 'Pressure', type: 'Pressure Sensor', value: 6.2, unit: 'bar', status: 'online' }
    ],
    operatingHours: 22100,
    idleTime: 18,
    utilization: 82,
    energyConsumption: 890,
    efficiency: 87,
    documents: [
      { id: 'D4', name: 'Maintenance Log', type: 'report', uploadDate: '2024-12-01', size: '0.8 MB' },
      { id: 'D5', name: 'Technical Drawings', type: 'manual', uploadDate: '2022-03-10', size: '3.2 MB' }
    ]
  },
  {
    id: 'AST-003',
    name: 'Conveyor Motor C',
    machineId: 'MOT-C-003',
    category: 'Motor',
    location: 'Plant B - Line 1',
    status: 'active',
    serialNumber: 'SN-MOT-2021-003',
    tagNumber: 'TAG-003',
    purchaseYear: 2021,
    vendor: 'Siemens',
    model: '1LA7-163-4AA60',
    capacity: '15 kW',
    powerRating: '15 kW',
    healthScore: 45,
    remainingLife: 18,
    mtbf: 1200,
    lastMaintenance: '2024-10-20',
    nextMaintenance: '2025-01-20',
    replacementRecommended: true,
    connectivity: 'online',
    sensors: [
      { id: 'S6', name: 'Current', type: 'Current Sensor', value: 28, unit: 'A', status: 'online' },
      { id: 'S7', name: 'Temperature', type: 'Temperature Sensor', value: 78, unit: '°C', status: 'online' }
    ],
    operatingHours: 28500,
    idleTime: 25,
    utilization: 75,
    energyConsumption: 420,
    efficiency: 78,
    documents: [
      { id: 'D6', name: 'Inspection Report', type: 'report', uploadDate: '2024-10-20', size: '1.5 MB' }
    ]
  },
  {
    id: 'AST-004',
    name: 'Packaging Line Conveyor',
    machineId: 'CONV-D-004',
    category: 'Conveyor',
    location: 'Plant B - Line 2',
    status: 'standby',
    serialNumber: 'SN-CONV-2023-004',
    tagNumber: 'TAG-004',
    purchaseYear: 2023,
    vendor: 'Dorner',
    model: '2200-Series',
    capacity: '500 kg/min',
    powerRating: '5.5 kW',
    healthScore: 89,
    remainingLife: 78,
    mtbf: 3200,
    lastMaintenance: '2024-11-30',
    nextMaintenance: '2025-03-30',
    replacementRecommended: false,
    connectivity: 'offline',
    sensors: [
      { id: 'S8', name: 'Speed', type: 'Speed Sensor', value: 0, unit: 'm/min', status: 'offline' },
      { id: 'S9', name: 'Load', type: 'Load Sensor', value: 0, unit: 'kg', status: 'offline' }
    ],
    operatingHours: 8200,
    idleTime: 45,
    utilization: 55,
    energyConsumption: 180,
    efficiency: 91,
    documents: [
      { id: 'D7', name: 'Installation Manual', type: 'manual', uploadDate: '2023-06-15', size: '4.1 MB' },
      { id: 'D8', name: 'Safety Certificate', type: 'contract', uploadDate: '2023-06-20', size: '0.9 MB' }
    ]
  }
])

// Computed properties
const filteredAssets = computed(() => {
  return assets.value.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         asset.machineId.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesStatus = !filterStatus.value || asset.status === filterStatus.value
    const matchesCategory = !filterCategory.value || asset.category === filterCategory.value
    const matchesLocation = !filterLocation.value || asset.location.includes(filterLocation.value)
    
    return matchesSearch && matchesStatus && matchesCategory && matchesLocation
  })
})

const totalAssets = computed(() => assets.value.length)
const activeAssets = computed(() => assets.value.filter(a => a.status === 'active').length)
const maintenanceAssets = computed(() => assets.value.filter(a => a.status === 'maintenance').length)
const avgHealthScore = computed(() => {
  const total = assets.value.reduce((sum, asset) => sum + asset.healthScore, 0)
  return Math.round(total / assets.value.length)
})

const healthDistribution = computed(() => ({
  excellent: assets.value.filter(a => a.healthScore >= 80).length,
  good: assets.value.filter(a => a.healthScore >= 60 && a.healthScore < 80).length,
  poor: assets.value.filter(a => a.healthScore < 60).length
}))

const ageDistribution = computed(() => {
  const currentYear = new Date().getFullYear()
  return {
    new: assets.value.filter(a => currentYear - a.purchaseYear <= 2).length,
    mature: assets.value.filter(a => currentYear - a.purchaseYear >= 3 && currentYear - a.purchaseYear <= 7).length,
    aging: assets.value.filter(a => currentYear - a.purchaseYear >= 8).length
  }
})

// Methods
function viewAssetDetails(asset: Asset) {
  console.log('Viewing details for:', asset.name)
}

function editAsset(asset: Asset) {
  console.log('Editing asset:', asset.name)
}

// New Asset Form Data
const newAsset = ref({
  name: '',
  machineId: '',
  category: '',
  location: '',
  status: '',
  serialNumber: '',
  tagNumber: '',
  purchaseYear: new Date().getFullYear(),
  vendor: '',
  model: '',
  capacity: '',
  powerRating: '',
  healthScore: 100,
  remainingLife: 120,
  mtbf: 2400,
  lastMaintenance: '',
  nextMaintenance: ''
})

// Add New Asset Function
function addNewAsset() {
  // Generate unique ID
  const newId = `AST-${String(assets.value.length + 1).padStart(3, '0')}`
  
  // Create new asset object with all required fields
  const asset: Asset = {
    id: newId,
    name: newAsset.value.name,
    machineId: newAsset.value.machineId,
    category: newAsset.value.category,
    location: newAsset.value.location,
    status: newAsset.value.status as 'active' | 'standby' | 'maintenance' | 'offline',
    serialNumber: newAsset.value.serialNumber,
    tagNumber: newAsset.value.tagNumber || `TAG-${String(assets.value.length + 1).padStart(3, '0')}`,
    purchaseYear: newAsset.value.purchaseYear,
    vendor: newAsset.value.vendor || 'Unknown',
    model: newAsset.value.model || 'Unknown',
    capacity: newAsset.value.capacity || 'N/A',
    powerRating: newAsset.value.powerRating || 'N/A',
    healthScore: newAsset.value.healthScore || 100,
    remainingLife: newAsset.value.remainingLife || 120,
    mtbf: newAsset.value.mtbf || 2400,
    lastMaintenance: newAsset.value.lastMaintenance || new Date().toISOString().split('T')[0],
    nextMaintenance: newAsset.value.nextMaintenance || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    replacementRecommended: false,
    connectivity: 'online' as 'online' | 'offline',
    sensors: [],
    operatingHours: 0,
    idleTime: 0,
    utilization: 0,
    energyConsumption: 0,
    efficiency: 100,
    documents: []
  }
  
  // Add to assets array
  assets.value.push(asset)
  
  // Reset form
  newAsset.value = {
    name: '',
    machineId: '',
    category: '',
    location: '',
    status: '',
    serialNumber: '',
    tagNumber: '',
    purchaseYear: new Date().getFullYear(),
    vendor: '',
    model: '',
    capacity: '',
    powerRating: '',
    healthScore: 100,
    remainingLife: 120,
    mtbf: 2400,
    lastMaintenance: '',
    nextMaintenance: ''
  }
  
  // Close modal
  showAddAssetModal.value = false
  
  // Show success message (you can implement a toast notification here)
  console.log('Asset added successfully:', asset.name)
}
</script>


