<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-6 space-y-6">
    <!-- Background Effects -->
    <div class="pointer-events-none absolute inset-0 opacity-30">
      <div class="absolute -top-20 -left-20 h-[320px] w-[320px] rounded-full blur-3xl bg-violet-600/30" />
      <div class="absolute -bottom-24 -right-24 h-[300px] w-[300px] rounded-full blur-3xl bg-cyan-500/25" />
      <div class="absolute top-1/2 left-1/2 h-[200px] w-[200px] rounded-full blur-3xl bg-emerald-500/20" />
    </div>

    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4 relative z-10">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">🏭 Executive Dashboard</h1>
        <p class="text-neutral-400">{{ timeFilterLabel }} - {{ dateRangeLabel }}</p>
      </div>
      <div class="flex gap-3">
        <select v-model="timeFilter" class="bg-neutral-800/80 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500">
          <option value="day">Harian</option>
          <option value="week">Mingguan</option>
          <option value="month">Bulanan</option>
        </select>
        <button @click="refreshData" :disabled="isRefreshing" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2">
              <span :class="{ 'animate-spin': isRefreshing }">🔄</span>
              {{ isRefreshing ? 'Refreshing...' : 'Refresh' }}
            </button>
      </div>
    </div>

    <!-- 🚀 Navigasi Cepat -->
    <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl relative z-10">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span class="text-2xl">🚀</span>
          Navigasi Cepat
        </h2>
        <div class="text-xs text-neutral-400 bg-neutral-800/50 px-3 py-1 rounded-full">
          Quick Access
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <RouterLink to="/cms/telemetry" class="group relative p-5 bg-gradient-to-br from-indigo-600/20 to-indigo-800/20 border border-indigo-500/30 rounded-xl hover:from-indigo-600/40 hover:to-indigo-800/40 hover:border-indigo-400/50 transition-all duration-300 text-center hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20">
          <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">📊</div>
            <div class="text-sm text-white font-semibold mb-1">Telemetry</div>
            <div class="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">Real-time Data</div>
          </div>
        </RouterLink>
        
        <RouterLink to="/cms/tickets" class="group relative p-5 bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl hover:from-blue-600/40 hover:to-blue-800/40 hover:border-blue-400/50 transition-all duration-300 text-center hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🎫</div>
            <div class="text-sm text-white font-semibold mb-1">Tickets</div>
            <div class="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">Support System</div>
          </div>
        </RouterLink>
        
        <RouterLink to="/cms/reports" class="group relative p-5 bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl hover:from-green-600/40 hover:to-green-800/40 hover:border-green-400/50 transition-all duration-300 text-center hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
          <div class="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">📈</div>
            <div class="text-sm text-white font-semibold mb-1">Reports</div>
            <div class="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">Analytics</div>
          </div>
        </RouterLink>
        
        <RouterLink to="/cms/energy" class="group relative p-5 bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 rounded-xl hover:from-yellow-600/40 hover:to-yellow-800/40 hover:border-yellow-400/50 transition-all duration-300 text-center hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20">
          <div class="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">⚡</div>
            <div class="text-sm text-white font-semibold mb-1">Energy</div>
            <div class="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">Cost Monitor</div>
          </div>
        </RouterLink>
        
        <RouterLink to="/cms/predictive" class="group relative p-5 bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl hover:from-purple-600/40 hover:to-purple-800/40 hover:border-purple-400/50 transition-all duration-300 text-center hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🔮</div>
            <div class="text-sm text-white font-semibold mb-1">Predictive</div>
            <div class="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">AI Insights</div>
          </div>
        </RouterLink>
        
        <RouterLink to="/cms/assets" class="group relative p-5 bg-gradient-to-br from-red-600/20 to-red-800/20 border border-red-500/30 rounded-xl hover:from-red-600/40 hover:to-red-800/40 hover:border-red-400/50 transition-all duration-300 text-center hover:scale-105 hover:shadow-lg hover:shadow-red-500/20">
          <div class="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🏭</div>
            <div class="text-sm text-white font-semibold mb-1">Assets</div>
            <div class="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">Management</div>
          </div>
        </RouterLink>
      </div>
    </div>

    <!-- 1️⃣ KPI & Ringkasan Utama -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
      <!-- OEE Card -->
      <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300" :class="oeePulse ? 'ring-2 ring-indigo-500/50 animate-pulse' : ''">
        <div class="flex items-center justify-between mb-4">
          <div class="text-sm text-neutral-400 font-medium">Overall Equipment Effectiveness</div>
          <div class="text-2xl">⚙️</div>
        </div>
        <div class="text-4xl font-bold text-white mb-2">{{ filteredKpis.oee.toFixed(1) }}%</div>
        <div class="flex items-center gap-2 mb-4">
          <span class="text-xs px-2 py-1 rounded-full" :class="deltaClass(percentDelta(filteredKpis.oee, prev.oee))">
            {{ arrow(percentDelta(filteredKpis.oee, prev.oee)) }} {{ Math.abs(percentDelta(filteredKpis.oee, prev.oee)).toFixed(1) }}%
          </span>
          <span class="text-xs text-neutral-500">{{ timeFilterLabel }}</span>
        </div>
        <!-- OEE Breakdown -->
        <div class="space-y-2">
          <div class="flex justify-between text-xs">
            <span class="text-neutral-400">Availability</span>
            <span class="text-green-400">{{ filteredKpis.availability }}%</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-neutral-400">Performance</span>
            <span class="text-yellow-400">{{ filteredKpis.performance }}%</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-neutral-400">Quality</span>
            <span class="text-blue-400">{{ filteredKpis.quality }}%</span>
          </div>
        </div>
      </div>

      <!-- Machine Health Index -->
      <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <div class="text-sm text-neutral-400 font-medium">Machine Health Index</div>
          <div class="text-2xl">💚</div>
        </div>
        <div class="text-4xl font-bold mb-2" :class="healthColor(filteredKpis.mhi)">{{ filteredKpis.mhi }}/100</div>
        <div class="flex items-center gap-2 mb-4">
          <span class="text-xs px-2 py-1 rounded-full" :class="deltaClass(percentDelta(filteredKpis.mhi, prev.mhi))">
            {{ arrow(percentDelta(filteredKpis.mhi, prev.mhi)) }} {{ Math.abs(percentDelta(filteredKpis.mhi, prev.mhi)).toFixed(1) }}%
          </span>
          <span class="text-xs text-neutral-500">{{ timeFilterLabel }}</span>
        </div>
        <!-- Top 5 Lowest Health -->
        <div class="space-y-1">
          <div class="text-xs text-neutral-400 mb-2">Top 5 Terendah:</div>
          <div v-for="machine in topLowHealthMachines" :key="machine.name" class="flex justify-between text-xs">
            <span class="text-neutral-300">{{ machine.name }}</span>
            <span :class="healthColor(machine.health)">{{ machine.health }}%</span>
          </div>
        </div>
      </div>

      <!-- Downtime -->
      <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <div class="text-sm text-neutral-400 font-medium">Downtime Analysis</div>
          <div class="text-2xl">⏱️</div>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div class="text-lg font-bold text-blue-400">{{ filteredKpis.downPlanned }}h</div>
            <div class="text-xs text-neutral-400">Planned {{ filteredKpis.suffix }}</div>
          </div>
          <div>
            <div class="text-lg font-bold text-red-400">{{ filteredKpis.downUnplanned }}h</div>
            <div class="text-xs text-neutral-400">Unplanned {{ filteredKpis.suffix }}</div>
          </div>
        </div>
        <!-- Downtime Causes -->
        <div class="space-y-1">
          <div class="text-xs text-neutral-400 mb-2">Top Causes {{ timeFilterLabel }}:</div>
          <div v-for="cause in filteredDowntimeCauses.slice(0, 3)" :key="cause.name" class="flex justify-between text-xs">
            <span class="text-neutral-300">{{ cause.name }}</span>
            <span class="text-orange-400">{{ cause.hours }}h</span>
          </div>
        </div>
      </div>

      <!-- Energy Cost -->
      <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <div class="text-sm text-neutral-400 font-medium">Energy Cost</div>
          <div class="text-2xl">⚡</div>
        </div>
        <div class="text-2xl font-bold text-white mb-1">${{ filteredKpis.energyMonthly.toLocaleString() }}</div>
        <div class="text-xs text-neutral-400 mb-4">{{ timeFilterLabel }}</div>
        <div class="flex items-center gap-2 mb-4">
          <span class="text-xs px-2 py-1 rounded-full" :class="deltaClass(percentDelta(filteredKpis.energyMonthly, prev.energyMonthly), true)">
            {{ arrow(percentDelta(filteredKpis.energyMonthly, prev.energyMonthly)) }} {{ Math.abs(percentDelta(filteredKpis.energyMonthly, prev.energyMonthly)).toFixed(1) }}%
          </span>
        </div>
        <!-- Energy Breakdown -->
        <div class="space-y-1">
          <div class="flex justify-between text-xs">
            <span class="text-neutral-400">vs Budget</span>
            <span class="text-green-400">-8.2%</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-neutral-400">YTD</span>
            <span class="text-white">${{ filteredKpis.energyYtd.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 2️⃣ Real-Time Telemetry Status -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
      <!-- Machine Status -->
      <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">🏭 Status Mesin</h2>
          <div class="text-xs text-neutral-400">Real-time</div>
        </div>
        <div class="grid grid-cols-1 gap-3">
          <div v-for="machine in machineStatus" :key="machine.name" class="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full" :class="statusIndicator(machine.status)"></div>
              <span class="text-white font-medium">{{ machine.name }}</span>
            </div>
            <span class="text-xs px-2 py-1 rounded-full" :class="statusBadge(machine.status)">
              {{ machine.status }}
            </span>
          </div>
        </div>
        <div class="mt-4 flex gap-2">
          <RouterLink to="/cms/telemetry" class="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-center rounded-lg transition-colors text-sm">
            📊 Detail Telemetry
          </RouterLink>
        </div>
      </div>

      <!-- Telemetry Data -->
      <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">📈 Data Telemetry</h2>
          <div class="text-xs text-neutral-400">Live</div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="param in telemetryParams" :key="param.name" class="text-center p-3 bg-neutral-800/30 rounded-lg">
            <div class="text-2xl font-bold" :class="param.color">{{ param.value }}</div>
            <div class="text-xs text-neutral-400">{{ param.name }}</div>
            <div class="text-xs" :class="param.status === 'normal' ? 'text-green-400' : param.status === 'warning' ? 'text-yellow-400' : 'text-red-400'">
              {{ param.unit }}
            </div>
          </div>
        </div>
      </div>

      <!-- Active Alarms -->
      <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">🚨 Alarm Aktif</h2>
          <div class="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">{{ activeAlarms.length }}</div>
        </div>
        <div class="space-y-3">
          <div v-for="alarm in activeAlarms.slice(0, 4)" :key="alarm.id" class="p-3 bg-neutral-800/30 rounded-lg border-l-4" :class="alarmBorderColor(alarm.priority)">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-white">{{ alarm.message }}</span>
              <span class="text-xs px-2 py-1 rounded-full" :class="alarmBadgeColor(alarm.priority)">
                {{ alarm.priority }}
              </span>
            </div>
            <div class="text-xs text-neutral-400">{{ alarm.time }} • {{ alarm.location }}</div>
          </div>
        </div>
        <div class="mt-4">
          <button class="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm">
            🔕 Acknowledge All
          </button>
        </div>
      </div>
    </div>

    <!-- 3️⃣ Predictive Maintenance Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
      <!-- RUL Predictions -->
      <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">🔮 Prediksi RUL</h2>
          <div class="text-xs text-neutral-400">Remaining Useful Life</div>
        </div>
        <div class="space-y-4">
          <div v-for="prediction in rulPredictions" :key="prediction.machine" class="p-4 bg-neutral-800/30 rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="text-white font-medium">{{ prediction.machine }}</span>
              <span class="text-xs px-2 py-1 rounded-full" :class="riskBadgeColor(prediction.risk)">
                {{ prediction.risk }}% Risk
              </span>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex-1">
                <div class="text-sm text-neutral-400">RUL: {{ prediction.rul }} hari</div>
                <div class="w-full bg-neutral-700 rounded-full h-2 mt-1">
                  <div class="h-2 rounded-full" :class="rulProgressColor(prediction.rul)" :style="`width: ${Math.max(10, (prediction.rul / 100) * 100)}%`"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <RouterLink to="/cms/predictive" class="w-full block px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-lg transition-colors text-sm">
            🔍 Detail Predictive
          </RouterLink>
        </div>
      </div>

      <!-- Maintenance Recommendations -->
      <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">🛠️ Rekomendasi Perawatan</h2>
          <div class="text-xs text-neutral-400">Next 7 days</div>
        </div>
        <div class="space-y-3">
          <div v-for="rec in maintenanceRecommendations" :key="rec.id" class="p-4 bg-neutral-800/30 rounded-lg border-l-4" :class="priorityBorderColor(rec.priority)">
            <div class="flex items-center justify-between mb-2">
              <span class="text-white font-medium">{{ rec.task }}</span>
              <span class="text-xs px-2 py-1 rounded-full" :class="priorityBadgeColor(rec.priority)">
                {{ rec.priority }}
              </span>
            </div>
            <div class="text-sm text-neutral-400 mb-1">{{ rec.machine }}</div>
            <div class="text-xs text-neutral-500">Due: {{ rec.dueDate }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4️⃣ Production & Asset Summary -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
      <!-- Asset Status -->
      <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">🏭 Status Asset</h2>
        </div>
        <div class="grid grid-cols-3 gap-4 text-center">
          <div class="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <div class="text-2xl font-bold text-green-400">{{ assetStatus.active }}</div>
            <div class="text-xs text-neutral-400">Aktif</div>
          </div>
          <div class="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div class="text-2xl font-bold text-yellow-400">{{ assetStatus.idle }}</div>
            <div class="text-xs text-neutral-400">Idle</div>
          </div>
          <div class="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
            <div class="text-2xl font-bold text-red-400">{{ assetStatus.maintenance }}</div>
            <div class="text-xs text-neutral-400">Maintenance</div>
          </div>
        </div>
        <div class="mt-4 text-center">
          <div class="text-sm text-neutral-400">Total Assets</div>
          <div class="text-2xl font-bold text-white">{{ assetStatus.total }}</div>
        </div>
      </div>

      <!-- Production Line Utilization -->
      <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">📊 Utilisasi Lini</h2>
        </div>
        <div class="space-y-3">
          <div v-for="line in productionLines" :key="line.name" class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-white">{{ line.name }}</span>
              <span class="text-neutral-400">{{ line.utilization }}%</span>
            </div>
            <div class="w-full bg-neutral-700 rounded-full h-2">
              <div class="h-2 rounded-full" :class="utilizationColor(line.utilization)" :style="`width: ${line.utilization}%`"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Failure History -->
      <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">📋 Riwayat Kerusakan</h2>
          <div class="text-xs text-neutral-400">Last 30 days</div>
        </div>
        <div class="space-y-3">
          <div v-for="failure in recentFailures" :key="failure.id" class="p-3 bg-neutral-800/30 rounded-lg">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-white">{{ failure.machine }}</span>
              <span class="text-xs text-neutral-400">{{ failure.date }}</span>
            </div>
            <div class="text-xs text-neutral-400">{{ failure.cause }}</div>
            <div class="text-xs text-orange-400">Downtime: {{ failure.downtime }}h</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5️⃣ Ticketing & SLA -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
      <!-- Ticket Overview -->
      <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">🎫 Ticketing Overview</h2>
        </div>
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div class="text-2xl font-bold text-blue-400">{{ filteredTickets.open }}</div>
            <div class="text-xs text-neutral-400">Open {{ timeFilterLabel }}</div>
          </div>
          <div class="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div class="text-2xl font-bold text-yellow-400">{{ filteredTickets.inProgress }}</div>
            <div class="text-xs text-neutral-400">In Progress {{ timeFilterLabel }}</div>
          </div>
          <div class="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <div class="text-2xl font-bold text-red-400">{{ filteredTickets.overdue }}</div>
            <div class="text-xs text-neutral-400">Overdue {{ timeFilterLabel }}</div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-neutral-400">MTTR (Mean Time to Repair)</span>
            <span class="text-white">{{ mttr }}h</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-neutral-400">MTBF (Mean Time Between Failures)</span>
            <span class="text-white">{{ mtbf }}h</span>
          </div>
        </div>
        <div class="mt-4">
          <RouterLink to="/cms/tickets" class="w-full block px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg transition-colors text-sm">
            📋 Manage Tickets
          </RouterLink>
        </div>
      </div>

      <!-- SLA Compliance -->
      <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">📈 SLA Compliance</h2>
          <div class="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">{{ slaCompliance.overall }}%</div>
        </div>
        <div class="space-y-4">
          <div v-for="sla in slaCompliance.breakdown" :key="sla.priority" class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-white">{{ sla.priority }} Priority</span>
              <span class="text-neutral-400">{{ sla.compliance }}%</span>
            </div>
            <div class="w-full bg-neutral-700 rounded-full h-2">
              <div class="h-2 rounded-full" :class="slaColor(sla.compliance)" :style="`width: ${sla.compliance}%`"></div>
            </div>
          </div>
        </div>
        <div class="mt-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
          <div class="text-sm font-medium text-red-400 mb-1">Critical Unresolved</div>
          <div class="text-xs text-neutral-400">{{ criticalUnresolved.length }} tickets require immediate attention</div>
        </div>
      </div>
    </div>

    <!-- 6️⃣ Grafik Tren & Analitik -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
      <!-- OEE & Energy Trends -->
      <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">📈 Tren OEE & Energy</h2>
          <select v-model="trendPeriod" class="text-xs bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-white">
            <option value="7d">7 Hari</option>
            <option value="30d">30 Hari</option>
            <option value="90d">90 Hari</option>
          </select>
        </div>
        <div class="h-48 bg-neutral-800/30 rounded-lg p-4">
          <!-- Chart Legend -->
          <div class="flex justify-center gap-6 mb-4">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span class="text-xs text-neutral-300">OEE (%)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span class="text-xs text-neutral-300">Energy Cost (Rp/hari)</span>
            </div>
          </div>
          
          <!-- Simple Chart Visualization -->
          <div class="relative h-32">
            <!-- Y-axis labels -->
            <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-neutral-400">
              <span>100%</span>
              <span>80%</span>
              <span>60%</span>
              <span>40%</span>
              <span>20%</span>
            </div>
            
            <!-- Chart Area -->
            <div class="ml-8 h-full relative">
              <!-- Grid lines -->
              <div class="absolute inset-0 flex flex-col justify-between">
                <div v-for="i in 5" :key="i" class="border-t border-neutral-700/30"></div>
              </div>
              
              <!-- Data Points -->
              <div class="absolute inset-0 flex items-end justify-between px-2">
                <div v-for="(point, index) in oeeTrendData.slice(-7)" :key="index" class="flex flex-col items-center gap-1">
                  <!-- OEE Bar -->
                  <div class="w-4 bg-blue-500 rounded-t" :style="`height: ${(point.oee / 100) * 100}%`" :title="`OEE: ${point.oee}%`"></div>
                  <!-- Energy Cost Indicator -->
                  <div class="w-2 bg-orange-500 rounded" :style="`height: ${((point.energyCost - 600) / 400) * 50}px`" :title="`Energy: Rp${point.energyCost}`"></div>
                  <!-- Date Label -->
                  <span class="text-xs text-neutral-400 transform -rotate-45 origin-center mt-2">
                    {{ new Date(point.date).getDate() }}/{{ new Date(point.date).getMonth() + 1 }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Summary Stats -->
          <div class="mt-4 grid grid-cols-2 gap-4 text-center">
            <div class="bg-neutral-700/30 rounded p-2">
              <div class="text-lg font-bold text-blue-400">{{ oeeTrendData[oeeTrendData.length - 1]?.oee }}</div>
              <div class="text-xs text-neutral-400">OEE Hari Ini</div>
            </div>
            <div class="bg-neutral-700/30 rounded p-2">
              <div class="text-lg font-bold text-orange-400">Rp{{ oeeTrendData[oeeTrendData.length - 1]?.energyCost.toLocaleString() }}</div>
              <div class="text-xs text-neutral-400">Biaya Energy</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Downtime Analysis -->
      <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">⏱️ Analisis Downtime</h2>
        </div>
        <div class="space-y-3">
          <div class="text-sm text-neutral-400 mb-2">Top Root Causes {{ timeFilterLabel }}</div>
          <div v-for="cause in filteredDowntimeCauses.slice(0, 5)" :key="cause.name" class="flex items-center justify-between p-2 bg-neutral-800/30 rounded">
            <span class="text-white text-sm">{{ cause.name }}</span>
            <div class="flex items-center gap-2">
              <div class="w-16 bg-neutral-700 rounded-full h-2">
                <div class="h-2 bg-orange-400 rounded-full" :style="`width: ${(cause.hours / filteredDowntimeCauses[0].hours) * 100}%`"></div>
              </div>
              <span class="text-xs text-neutral-400 w-8">{{ cause.hours }}h</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 7️⃣ Notifikasi & Alert -->
    <div class="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl relative z-10">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-white">🔔 Notifikasi & Alert Terbaru</h2>
        <div class="flex gap-2">
          <button @click="acknowledgeAll" class="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs transition-colors">
            ✅ Acknowledge All
          </button>
          <button @click="refreshAlerts" :disabled="isRefreshing" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white rounded text-xs transition-colors flex items-center gap-1">
              <span :class="{ 'animate-spin': isRefreshing }" class="text-xs">🔄</span>
              {{ isRefreshing ? 'Refreshing...' : 'Refresh' }}
            </button>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div v-for="alert in latestAlerts" :key="alert.id" class="p-4 bg-neutral-800/30 rounded-lg border-l-4" :class="alertBorderColor(alert.priority)">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-white">{{ alert.message }}</span>
            <span class="text-xs px-2 py-1 rounded-full" :class="alertBadgeColor(alert.priority)">
              {{ alert.priority }}
            </span>
          </div>
          <div class="text-xs text-neutral-400 mb-2">{{ alert.time }} • {{ alert.location }}</div>
          <div class="flex gap-2">
            <button v-if="!alert.ack" @click="acknowledgeAlert(alert.id)" class="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs transition-colors">
              ✅ ACK
            </button>
            <button class="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors">
              👁️ View
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref, watch, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

// Reactive data
const timeFilter = ref<'day'|'week'|'month'>('day')
const trendPeriod = ref<'7d'|'30d'|'90d'>('7d')

// Computed properties based on timeFilter
const filteredKpis = computed(() => {
  const multiplier = timeFilter.value === 'day' ? 1 : timeFilter.value === 'week' ? 7 : 30
  const suffix = timeFilter.value === 'day' ? '/hari' : timeFilter.value === 'week' ? '/minggu' : '/bulan'
  
  return {
    oee: kpis.oee,
    availability: kpis.availability,
    performance: kpis.performance,
    quality: kpis.quality,
    mhi: kpis.mhi,
    downPlanned: Math.round(kpis.downPlanned * multiplier * 10) / 10,
    downUnplanned: Math.round(kpis.downUnplanned * multiplier * 10) / 10,
    energyMonthly: Math.round(kpis.energyMonthly * (timeFilter.value === 'day' ? 1/30 : timeFilter.value === 'week' ? 1/4 : 1)),
    energyYtd: kpis.energyYtd,
    suffix: suffix
  }
})

const filteredDowntimeCauses = computed(() => {
  const multiplier = timeFilter.value === 'day' ? 1 : timeFilter.value === 'week' ? 7 : 30
  
  return downtimeCauses.map(cause => ({
    ...cause,
    hours: Math.round(cause.hours * multiplier * 10) / 10
  }))
})

const filteredEnergyBreakdown = computed(() => {
  const multiplier = timeFilter.value === 'day' ? 1/30 : timeFilter.value === 'week' ? 1/4 : 1
  
  return energyBreakdown.map(item => ({
    ...item,
    cost: Math.round(item.cost * multiplier)
  }))
})

const filteredTickets = computed(() => {
  const multiplier = timeFilter.value === 'day' ? 1 : timeFilter.value === 'week' ? 7 : 30
  
  return {
    open: Math.round(tickets.open * multiplier),
    inProgress: Math.round(tickets.inProgress * multiplier),
    overdue: Math.round(tickets.overdue * multiplier)
  }
})

const timeFilterLabel = computed(() => {
  switch (timeFilter.value) {
    case 'day': return 'Hari Ini'
    case 'week': return 'Minggu Ini'
    case 'month': return 'Bulan Ini'
    default: return 'Hari Ini'
  }
})

const dateRangeLabel = computed(() => {
  const today = new Date()
  
  if (timeFilter.value === 'day') {
    return today.toLocaleDateString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  } else if (timeFilter.value === 'week') {
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    
    return `${startOfWeek.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} - ${endOfWeek.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}`
  } else {
    return today.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long' 
    })
  }
})

// KPI Data
const kpis = reactive({
  oee: 78.6,
  availability: 85.2,
  performance: 92.1,
  quality: 99.8,
  mhi: 86,
  downPlanned: 3.5,
  downUnplanned: 1.2,
  energyMonthly: 12450,
  energyYtd: 98320
})

const prev = reactive({
  oee: 77.9,
  mhi: 84,
  energyMonthly: 12010
})

// Machine Health Data
const topLowHealthMachines = [
  { name: 'Compressor A', health: 65 },
  { name: 'Motor B', health: 72 },
  { name: 'Pump C', health: 78 },
  { name: 'Conveyor D', health: 81 },
  { name: 'Boiler E', health: 83 }
]

// Downtime Causes
const downtimeCauses = [
  { name: 'Overheating', hours: 2.1 },
  { name: 'Vibration', hours: 1.8 },
  { name: 'Electrical', hours: 1.5 },
  { name: 'Alignment', hours: 1.2 },
  { name: 'Lubrication', hours: 0.9 }
]

// Machine Status
const machineStatus = [
  { name: 'Compressor A', status: 'Running' },
  { name: 'Pump B', status: 'Maintenance' },
  { name: 'Conveyor C', status: 'Idle' },
  { name: 'Motor D', status: 'Running' },
  { name: 'Boiler E', status: 'Fault' },
  { name: 'Generator F', status: 'Running' }
]

// Telemetry Parameters
const telemetryParams = [
  { name: 'Temperature', value: '72°C', unit: 'Normal', color: 'text-green-400', status: 'normal' },
  { name: 'Pressure', value: '8.5 bar', unit: 'Normal', color: 'text-green-400', status: 'normal' },
  { name: 'Vibration', value: '4.2 mm/s', unit: 'Warning', color: 'text-yellow-400', status: 'warning' },
  { name: 'Flow Rate', value: '185 L/min', unit: 'Normal', color: 'text-green-400', status: 'normal' }
]

// Active Alarms
const activeAlarms = reactive([
  { id: 'AL-001', message: 'High Temperature Alert', priority: 'Critical', time: '10:15', location: 'Line A' },
  { id: 'AL-002', message: 'Vibration Anomaly', priority: 'High', time: '09:42', location: 'Compressor A' },
  { id: 'AL-003', message: 'Power Consumption Spike', priority: 'Medium', time: '09:30', location: 'Motor B' },
  { id: 'AL-004', message: 'Pressure Drop Detected', priority: 'High', time: '08:55', location: 'Line C' }
])

// RUL Predictions
const rulPredictions = [
  { machine: 'Compressor A', risk: 75, rul: 18 },
  { machine: 'Motor B', risk: 45, rul: 32 },
  { machine: 'Pump C', risk: 60, rul: 25 },
  { machine: 'Conveyor D', risk: 30, rul: 45 }
]

// Maintenance Recommendations
const maintenanceRecommendations = [
  { id: 'MR-001', task: 'Replace Bearing', machine: 'Compressor A', priority: 'Critical', dueDate: '2024-01-20' },
  { id: 'MR-002', task: 'Lubrication Service', machine: 'Motor B', priority: 'High', dueDate: '2024-01-22' },
  { id: 'MR-003', task: 'Belt Tension Check', machine: 'Conveyor D', priority: 'Medium', dueDate: '2024-01-25' },
  { id: 'MR-004', task: 'Calibrate Sensors', machine: 'Pump C', priority: 'Low', dueDate: '2024-01-28' }
]

// Asset Status
const assetStatus = reactive({
  active: 24,
  idle: 8,
  maintenance: 3,
  total: 35
})

// Production Lines
const productionLines = [
  { name: 'Line A', utilization: 92 },
  { name: 'Line B', utilization: 78 },
  { name: 'Line C', utilization: 85 },
  { name: 'Packaging', utilization: 95 }
]

// Recent Failures
const recentFailures = [
  { id: 'F-001', machine: 'Motor B', cause: 'Bearing failure', date: '2024-01-15', downtime: 4.5 },
  { id: 'F-002', machine: 'Pump A', cause: 'Seal leak', date: '2024-01-12', downtime: 2.1 },
  { id: 'F-003', machine: 'Conveyor C', cause: 'Belt snap', date: '2024-01-10', downtime: 1.8 }
]

// Ticketing Data
const tickets = reactive({
  open: 12,
  inProgress: 8,
  overdue: 3
})

const mttr = 2.4
const mtbf = 86.1

// SLA Compliance
const slaCompliance = reactive({
  overall: 94,
  breakdown: [
    { priority: 'Critical', compliance: 98 },
    { priority: 'High', compliance: 95 },
    { priority: 'Medium', compliance: 92 },
    { priority: 'Low', compliance: 88 }
  ]
})

const criticalUnresolved = [
  { id: 'T-001', title: 'Compressor A Overheating' },
  { id: 'T-002', title: 'Line B Production Stop' }
]

// Root Causes
const rootCauses = [
  { cause: 'Overheating', count: 15 },
  { cause: 'Vibration', count: 12 },
  { cause: 'Electrical', count: 9 },
  { cause: 'Alignment', count: 7 },
  { cause: 'Lubrication', count: 5 }
]

// OEE & Energy Trend Data
const oeeTrendData = computed(() => {
  const days = trendPeriod.value === '7d' ? 7 : trendPeriod.value === '30d' ? 30 : 90
  const data = []
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    // Generate realistic OEE trend data (70-85%)
    const baseOEE = 78
    const variation = Math.sin(i * 0.2) * 5 + Math.random() * 4 - 2
    const oeeValue = Math.max(65, Math.min(90, baseOEE + variation))
    
    // Generate energy cost data (correlated with OEE - lower OEE = higher energy cost)
    const baseEnergyCost = 850
    const energyVariation = (85 - oeeValue) * 8 + Math.random() * 50 - 25
    const energyCost = Math.max(600, baseEnergyCost + energyVariation)
    
    data.push({
      date: date.toISOString().split('T')[0],
      dateLabel: i === 0 ? 'Hari ini' : `${i} hari lalu`,
      oee: Math.round(oeeValue * 10) / 10,
      energyCost: Math.round(energyCost),
      availability: Math.round((oeeValue + Math.random() * 6 - 3) * 10) / 10,
      performance: Math.round((oeeValue + Math.random() * 8 - 4) * 10) / 10,
      quality: Math.round((95 + Math.random() * 4) * 10) / 10
    })
  }
  
  return data
})

// Energy consumption breakdown
const energyBreakdown = reactive([
  { category: 'Production Lines', percentage: 45, cost: 5625, color: 'bg-blue-500' },
  { category: 'HVAC System', percentage: 25, cost: 3125, color: 'bg-green-500' },
  { category: 'Lighting', percentage: 15, cost: 1875, color: 'bg-yellow-500' },
  { category: 'Compressed Air', percentage: 10, cost: 1250, color: 'bg-purple-500' },
  { category: 'Others', percentage: 5, cost: 625, color: 'bg-gray-500' }
])

// OEE Components trend
const oeeComponentsTrend = computed(() => {
  return oeeTrendData.value.map(item => ({
    date: item.date,
    dateLabel: item.dateLabel,
    availability: item.availability,
    performance: item.performance,
    quality: item.quality
  }))
})

// Energy efficiency metrics
const energyEfficiencyMetrics = reactive({
  kwh_per_unit: 2.4,
  target_kwh_per_unit: 2.2,
  efficiency_percentage: 91.7,
  monthly_savings: 1250,
  carbon_footprint: 8.5, // tons CO2
  renewable_percentage: 15
})

// Latest Alerts
const latestAlerts = reactive([
  { id: 'AL-001', message: 'Temperature anomaly detected', priority: 'Critical', time: '10:15', location: 'Line A', ack: false },
  { id: 'AL-002', message: 'Vibration threshold exceeded', priority: 'High', time: '09:42', location: 'Compressor A', ack: false },
  { id: 'AL-003', message: 'Energy consumption spike', priority: 'Medium', time: '09:30', location: 'Motor B', ack: true },
  { id: 'AL-004', message: 'Maintenance reminder', priority: 'Low', time: '08:55', location: 'Pump C', ack: false },
  { id: 'AL-005', message: 'Pressure drop alert', priority: 'High', time: '08:20', location: 'Line C', ack: false },
  { id: 'AL-006', message: 'Sensor calibration needed', priority: 'Medium', time: '07:45', location: 'Boiler E', ack: true }
])

// Animations
const oeePulse = ref(false)
const isRefreshing = ref(false)

// Methods
function refreshData() {
  console.log('Refreshing dashboard data...')
  isRefreshing.value = true
  
  // Simulate loading time
  setTimeout(() => {
    // Update KPI data with realistic variations
    kpis.oee = Math.round((75 + Math.random() * 10) * 10) / 10
    kpis.availability = Math.round((82 + Math.random() * 8) * 10) / 10
    kpis.performance = Math.round((88 + Math.random() * 8) * 10) / 10
    kpis.quality = Math.round((98 + Math.random() * 2) * 10) / 10
    kpis.mhi = Math.round(80 + Math.random() * 15)
    kpis.downPlanned = Math.round((2 + Math.random() * 3) * 10) / 10
    kpis.downUnplanned = Math.round((0.5 + Math.random() * 2) * 10) / 10
    kpis.energyMonthly = Math.round(11000 + Math.random() * 3000)
    kpis.energyYtd = Math.round(90000 + Math.random() * 20000)
    
    // Update machine health with random variations
    topLowHealthMachines.forEach(machine => {
      machine.health = Math.max(50, Math.min(95, machine.health + (Math.random() * 10 - 5)))
    })
    
    // Update downtime causes
    downtimeCauses.forEach(cause => {
      cause.hours = Math.round((cause.hours + (Math.random() * 1 - 0.5)) * 10) / 10
    })
    
    // Update telemetry parameters
    telemetryParams[0].value = `${Math.round(68 + Math.random() * 10)}°C`
    telemetryParams[1].value = `${Math.round((7.5 + Math.random() * 2) * 10) / 10} bar`
    telemetryParams[2].value = `${Math.round((3.5 + Math.random() * 1.5) * 10) / 10} mm/s`
    telemetryParams[3].value = `${Math.round(170 + Math.random() * 30)} L/min`
    
    // Update telemetry status randomly
    telemetryParams.forEach(param => {
      const rand = Math.random()
      if (rand < 0.7) {
        param.unit = 'Normal'
        param.color = 'text-green-400'
        param.status = 'normal'
      } else if (rand < 0.9) {
        param.unit = 'Warning'
        param.color = 'text-yellow-400'
        param.status = 'warning'
      } else {
        param.unit = 'Critical'
        param.color = 'text-red-400'
        param.status = 'critical'
      }
    })
    
    // Update RUL predictions
    rulPredictions.forEach(prediction => {
      prediction.risk = Math.max(20, Math.min(90, prediction.risk + (Math.random() * 10 - 5)))
      prediction.rul = Math.max(5, Math.min(60, prediction.rul + (Math.random() * 6 - 3)))
    })
    
    // Update asset status
    assetStatus.active = Math.round(20 + Math.random() * 10)
    assetStatus.idle = Math.round(5 + Math.random() * 8)
    assetStatus.maintenance = Math.round(2 + Math.random() * 4)
    assetStatus.total = assetStatus.active + assetStatus.idle + assetStatus.maintenance
    
    // Update production lines utilization
    productionLines.forEach(line => {
      line.utilization = Math.max(60, Math.min(100, line.utilization + (Math.random() * 10 - 5)))
    })
    
    // Update tickets data
    tickets.open = Math.round(8 + Math.random() * 8)
    tickets.inProgress = Math.round(5 + Math.random() * 6)
    tickets.overdue = Math.round(1 + Math.random() * 4)
    
    // Update SLA compliance
    slaCompliance.overall = Math.round(90 + Math.random() * 8)
    slaCompliance.breakdown.forEach(item => {
      item.compliance = Math.max(85, Math.min(100, item.compliance + (Math.random() * 4 - 2)))
    })
    
    // Update energy breakdown with slight variations
    energyBreakdown.forEach(item => {
      const variation = (Math.random() * 4 - 2) / 100
      item.percentage = Math.max(1, Math.min(60, item.percentage + variation))
      item.cost = Math.round(item.percentage * 125) // Recalculate cost based on percentage
    })
    
    // Update energy efficiency metrics
    energyEfficiencyMetrics.kwh_per_unit = Math.round((2.2 + Math.random() * 0.4) * 10) / 10
    energyEfficiencyMetrics.efficiency_percentage = Math.round((88 + Math.random() * 8) * 10) / 10
    energyEfficiencyMetrics.monthly_savings = Math.round(1000 + Math.random() * 500)
    energyEfficiencyMetrics.carbon_footprint = Math.round((7 + Math.random() * 3) * 10) / 10
    energyEfficiencyMetrics.renewable_percentage = Math.round(12 + Math.random() * 8)
    
    // Add new random alerts occasionally
    if (Math.random() < 0.3) {
      const newAlerts = [
        { id: `AL-${Date.now()}`, message: 'New temperature spike detected', priority: 'High', time: new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}), location: 'Line A', ack: false },
        { id: `AL-${Date.now()}`, message: 'Vibration anomaly in progress', priority: 'Medium', time: new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}), location: 'Motor C', ack: false },
        { id: `AL-${Date.now()}`, message: 'Pressure fluctuation observed', priority: 'Low', time: new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}), location: 'Pump D', ack: false }
      ]
      
      // Add random alert
      const randomAlert = newAlerts[Math.floor(Math.random() * newAlerts.length)]
      latestAlerts.unshift(randomAlert)
      
      // Keep only latest 6 alerts
      if (latestAlerts.length > 6) {
        latestAlerts.splice(6)
      }
    }
    
    // Trigger OEE pulse animation
    oeePulse.value = true
    setTimeout(() => {
      oeePulse.value = false
    }, 1000)
    
    isRefreshing.value = false
    console.log('Dashboard data refreshed successfully!')
  }, 1500) // 1.5 second loading simulation
}

function acknowledgeAll() {
  latestAlerts.forEach(alert => alert.ack = true)
  console.log('All alerts acknowledged')
}

function refreshAlerts() {
  console.log('Refreshing alerts...')
  isRefreshing.value = true
  
  // Simulate loading time for alerts refresh
  setTimeout(() => {
    // Update existing alerts acknowledgment status randomly
    latestAlerts.forEach(alert => {
      if (Math.random() < 0.2) { // 20% chance to change ack status
        alert.ack = !alert.ack
      }
    })
    
    // Add new random alert occasionally
    if (Math.random() < 0.4) {
      const newAlerts = [
        { id: `AL-${Date.now()}`, message: 'Temperature threshold exceeded', priority: 'Critical', time: new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}), location: 'Line B', ack: false },
        { id: `AL-${Date.now()}`, message: 'Maintenance window approaching', priority: 'Medium', time: new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}), location: 'Compressor B', ack: false },
        { id: `AL-${Date.now()}`, message: 'Power consumption anomaly', priority: 'High', time: new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}), location: 'Motor D', ack: false },
        { id: `AL-${Date.now()}`, message: 'Sensor communication lost', priority: 'High', time: new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}), location: 'Pump E', ack: false },
        { id: `AL-${Date.now()}`, message: 'Lubrication level low', priority: 'Low', time: new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}), location: 'Conveyor F', ack: false }
      ]
      
      // Add random alert
      const randomAlert = newAlerts[Math.floor(Math.random() * newAlerts.length)]
      latestAlerts.unshift(randomAlert)
      
      // Keep only latest 6 alerts
      if (latestAlerts.length > 6) {
        latestAlerts.splice(6)
      }
    }
    
    isRefreshing.value = false
    console.log('Alerts refreshed successfully!')
  }, 800) // Shorter loading time for alerts
}

function acknowledgeAlert(alertId: string) {
  const alert = latestAlerts.find(a => a.id === alertId)
  if (alert) {
    alert.ack = true
    console.log(`Alert ${alertId} acknowledged`)
  }
}

// Utility functions
function percentDelta(curr: number, previous: number) {
  if (!previous) return 0
  return ((curr - previous) / previous) * 100
}

function arrow(pct: number) {
  return pct >= 0 ? '▲' : '▼'
}

function deltaClass(pct: number, inverse = false) {
  const positive = inverse ? pct < 0 : pct >= 0
  return positive ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'
}

function healthColor(health: number) {
  if (health >= 80) return 'text-green-400'
  if (health >= 60) return 'text-yellow-400'
  return 'text-red-400'
}

function statusIndicator(status: string) {
  switch (status) {
    case 'Running': return 'bg-green-400 animate-pulse'
    case 'Fault': return 'bg-red-400 animate-pulse'
    case 'Maintenance': return 'bg-yellow-400'
    default: return 'bg-neutral-400'
  }
}

function statusBadge(status: string) {
  switch (status) {
    case 'Running': return 'bg-green-500/20 text-green-400'
    case 'Fault': return 'bg-red-500/20 text-red-400'
    case 'Maintenance': return 'bg-yellow-500/20 text-yellow-400'
    default: return 'bg-neutral-500/20 text-neutral-400'
  }
}

function alarmBorderColor(priority: string) {
  switch (priority) {
    case 'Critical': return 'border-red-500'
    case 'High': return 'border-orange-500'
    case 'Medium': return 'border-yellow-500'
    default: return 'border-blue-500'
  }
}

function alarmBadgeColor(priority: string) {
  switch (priority) {
    case 'Critical': return 'bg-red-500/20 text-red-400'
    case 'High': return 'bg-orange-500/20 text-orange-400'
    case 'Medium': return 'bg-yellow-500/20 text-yellow-400'
    default: return 'bg-blue-500/20 text-blue-400'
  }
}

function riskBadgeColor(risk: number) {
  if (risk >= 70) return 'bg-red-500/20 text-red-400'
  if (risk >= 50) return 'bg-orange-500/20 text-orange-400'
  if (risk >= 30) return 'bg-yellow-500/20 text-yellow-400'
  return 'bg-green-500/20 text-green-400'
}

function rulProgressColor(rul: number) {
  if (rul <= 20) return 'bg-red-400'
  if (rul <= 40) return 'bg-orange-400'
  if (rul <= 60) return 'bg-yellow-400'
  return 'bg-green-400'
}

function priorityBorderColor(priority: string) {
  switch (priority) {
    case 'Critical': return 'border-red-500'
    case 'High': return 'border-orange-500'
    case 'Medium': return 'border-yellow-500'
    default: return 'border-blue-500'
  }
}

function priorityBadgeColor(priority: string) {
  switch (priority) {
    case 'Critical': return 'bg-red-500/20 text-red-400'
    case 'High': return 'bg-orange-500/20 text-orange-400'
    case 'Medium': return 'bg-yellow-500/20 text-yellow-400'
    default: return 'bg-blue-500/20 text-blue-400'
  }
}

function utilizationColor(utilization: number) {
  if (utilization >= 90) return 'bg-green-400'
  if (utilization >= 70) return 'bg-yellow-400'
  return 'bg-red-400'
}

function slaColor(compliance: number) {
  if (compliance >= 95) return 'bg-green-400'
  if (compliance >= 85) return 'bg-yellow-400'
  return 'bg-red-400'
}

function alertBorderColor(priority: string) {
  return alarmBorderColor(priority)
}

function alertBadgeColor(priority: string) {
  return alarmBadgeColor(priority)
}

// Initialize animations
onMounted(() => {
  setTimeout(() => {
    oeePulse.value = true
    setTimeout(() => oeePulse.value = false, 1000)
  }, 500)
})
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
  transition: all 0.3s ease-in-out;
}

/* Animation for pulse effect */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Hover effects */
.hover-scale:hover {
  transform: scale(1.02);
}

/* Focus styles */
input:focus, select:focus {
  outline: none;
  ring: 2px;
  ring-color: #6366f1;
}

/* Card hover effects */
.group:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

/* Button hover effects */
button:hover {
  transform: translateY(-1px);
}

/* Backdrop blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}
</style>


