<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">📊 Reporting & Analytics</h1>
      <p class="text-slate-400">Comprehensive reports for monitoring, maintenance, and compliance</p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Total Reports</p>
            <p class="text-2xl font-bold text-white">{{ totalReports }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
            <span class="text-2xl">📊</span>
          </div>
        </div>
      </div>
      
      <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Scheduled Reports</p>
            <p class="text-2xl font-bold text-white">{{ scheduledReports }}</p>
          </div>
          <div class="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
            <span class="text-2xl">⏰</span>
          </div>
        </div>
      </div>
      
      <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Export Today</p>
            <p class="text-2xl font-bold text-white">{{ todayExports }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
            <span class="text-2xl">📤</span>
          </div>
        </div>
      </div>
      
      <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Compliance Score</p>
            <p class="text-2xl font-bold text-white">{{ complianceScore }}%</p>
          </div>
          <div class="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
            <span class="text-2xl">✅</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl mb-8">
      <div class="flex flex-wrap border-b border-slate-700">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-6 py-4 text-sm font-medium transition-colors duration-200 flex items-center gap-2',
            activeTab === tab.id
              ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-600/10'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          ]"
        >
          <span>{{ tab.icon }}</span>
          {{ tab.name }}
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="space-y-6">
      <!-- 1. Telemetry & Machine Performance Reports -->
      <div v-if="activeTab === 'telemetry'" class="space-y-6">
        <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h2 class="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span>📊</span> Laporan Telemetry & Kinerja Mesin
          </h2>
          
          <!-- Real-Time Performance -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div class="bg-slate-900/50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-white mb-4">Real-Time Performance</h3>
              <div class="space-y-3">
                <div v-for="metric in performanceMetrics" :key="metric.name" class="flex justify-between items-center">
                  <span class="text-slate-300">{{ metric.name }}</span>
                  <div class="flex items-center gap-2">
                    <span class="text-white font-medium">{{ metric.value }}</span>
                    <span :class="metric.trend === 'up' ? 'text-green-400' : metric.trend === 'down' ? 'text-red-400' : 'text-yellow-400'">
                      {{ metric.trend === 'up' ? '↗️' : metric.trend === 'down' ? '↘️' : '➡️' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-slate-900/50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-white mb-4">Alarm Summary</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Critical Alarms</span>
                  <span class="bg-red-600/20 text-red-300 px-2 py-1 rounded text-sm">{{ alarmStats.critical }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Warning Alarms</span>
                  <span class="bg-yellow-600/20 text-yellow-300 px-2 py-1 rounded text-sm">{{ alarmStats.warning }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Info Alarms</span>
                  <span class="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-sm">{{ alarmStats.info }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Trend Analysis -->
          <div class="bg-slate-900/50 rounded-lg p-4">
            <h3 class="text-lg font-medium text-white mb-4">Trend & Historical Data</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <select v-model="selectedPeriod" class="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white">
                <option value="hour">Per Jam</option>
                <option value="day">Per Hari</option>
                <option value="week">Per Minggu</option>
                <option value="month">Per Bulan</option>
              </select>
              <select v-model="selectedMachine" class="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white">
                <option value="all">Semua Mesin</option>
                <option value="M001">Mesin Produksi A</option>
                <option value="M002">Mesin Produksi B</option>
                <option value="M003">Mesin Packaging</option>
              </select>
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Generate Report
              </button>
            </div>
            <div class="h-64 bg-slate-800/50 rounded-lg flex items-center justify-center">
              <span class="text-slate-400">📈 Trend Chart Placeholder</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Predictive & Preventive Maintenance Reports -->
      <div v-if="activeTab === 'maintenance'" class="space-y-6">
        <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h2 class="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span>🛠</span> Laporan Predictive & Preventive Maintenance
          </h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Predictive Alerts -->
            <div class="bg-slate-900/50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-white mb-4">Predictive Maintenance Alerts</h3>
              <div class="space-y-3">
                <div v-for="alert in predictiveAlerts" :key="alert.id" class="border border-slate-600 rounded-lg p-3">
                  <div class="flex justify-between items-start mb-2">
                    <span class="text-white font-medium">{{ alert.asset }}</span>
                    <span :class="getRULBadgeClass(alert.rul)" class="px-2 py-1 rounded text-xs">
                      RUL: {{ alert.rul }} days
                    </span>
                  </div>
                  <p class="text-slate-400 text-sm">{{ alert.component }}</p>
                  <div class="flex justify-between items-center mt-2">
                    <span class="text-slate-300 text-sm">Failure Probability</span>
                    <span class="text-red-400 font-medium">{{ alert.probability }}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Preventive Compliance -->
            <div class="bg-slate-900/50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-white mb-4">Preventive Maintenance Compliance</h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Completed On Time</span>
                  <span class="text-green-400 font-medium">{{ maintenanceStats.completed }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Overdue</span>
                  <span class="text-red-400 font-medium">{{ maintenanceStats.overdue }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Scheduled</span>
                  <span class="text-yellow-400 font-medium">{{ maintenanceStats.scheduled }}</span>
                </div>
                <div class="mt-4 p-3 bg-slate-800/50 rounded-lg">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-slate-300">Compliance Rate</span>
                    <span class="text-white font-bold">{{ maintenanceStats.complianceRate }}%</span>
                  </div>
                  <div class="w-full bg-slate-700 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full" :style="`width: ${maintenanceStats.complianceRate}%`"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Downtime Analysis -->
          <div class="bg-slate-900/50 rounded-lg p-4 mt-6">
            <h3 class="text-lg font-medium text-white mb-4">Downtime Analysis</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="text-center">
                <p class="text-2xl font-bold text-white">{{ downtimeStats.totalHours }}h</p>
                <p class="text-slate-400 text-sm">Total Downtime</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-white">{{ downtimeStats.mttr }}h</p>
                <p class="text-slate-400 text-sm">MTTR (Mean Time to Repair)</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-white">{{ downtimeStats.mtbf }}h</p>
                <p class="text-slate-400 text-sm">MTBF (Mean Time Between Failures)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Ticketing Reports -->
      <div v-if="activeTab === 'ticketing'" class="space-y-6">
        <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h2 class="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span>🎫</span> Laporan Ticketing
          </h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Ticket Summary -->
            <div class="bg-slate-900/50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-white mb-4">Ticket Summary</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Total Tickets</span>
                  <span class="text-white font-medium">{{ ticketStats.total }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Open</span>
                  <span class="text-blue-400 font-medium">{{ ticketStats.open }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">In Progress</span>
                  <span class="text-yellow-400 font-medium">{{ ticketStats.inProgress }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Closed</span>
                  <span class="text-green-400 font-medium">{{ ticketStats.closed }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Overdue</span>
                  <span class="text-red-400 font-medium">{{ ticketStats.overdue }}</span>
                </div>
              </div>
            </div>
            
            <!-- Technician Performance -->
            <div class="bg-slate-900/50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-white mb-4">Technician Performance</h3>
              <div class="space-y-3">
                <div v-for="tech in technicianPerformance" :key="tech.name" class="border border-slate-600 rounded-lg p-3">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-white font-medium">{{ tech.name }}</span>
                    <span class="text-green-400 text-sm">{{ tech.slaCompliance }}% SLA</span>
                  </div>
                  <div class="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span class="text-slate-400">MTTA:</span>
                      <span class="text-white ml-1">{{ tech.mtta }}h</span>
                    </div>
                    <div>
                      <span class="text-slate-400">MTTR:</span>
                      <span class="text-white ml-1">{{ tech.mttr }}h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Top Recurring Issues -->
          <div class="bg-slate-900/50 rounded-lg p-4 mt-6">
            <h3 class="text-lg font-medium text-white mb-4">Top Recurring Issues</h3>
            <div class="space-y-3">
              <div v-for="issue in recurringIssues" :key="issue.id" class="flex justify-between items-center p-3 border border-slate-600 rounded-lg">
                <div>
                  <span class="text-white font-medium">{{ issue.title }}</span>
                  <p class="text-slate-400 text-sm">{{ issue.category }}</p>
                </div>
                <div class="text-right">
                  <span class="text-red-400 font-medium">{{ issue.count }} times</span>
                  <p class="text-slate-400 text-sm">Last: {{ formatDate(issue.lastOccurrence) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Energy & Cost Reports -->
      <div v-if="activeTab === 'energy'" class="space-y-6">
        <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h2 class="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span>⚡</span> Laporan Energi & Biaya
          </h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Energy Consumption -->
            <div class="bg-slate-900/50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-white mb-4">Energy Consumption Report</h3>
              <div class="space-y-3">
                <div v-for="consumption in energyConsumption" :key="consumption.location" class="flex justify-between items-center">
                  <span class="text-slate-300">{{ consumption.location }}</span>
                  <div class="text-right">
                    <span class="text-white font-medium">{{ consumption.current }} kWh</span>
                    <p class="text-slate-400 text-xs">Target: {{ consumption.target }} kWh</p>
                  </div>
                </div>
              </div>
              <div class="mt-4 p-3 bg-slate-800/50 rounded-lg">
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Total Consumption</span>
                  <span class="text-white font-bold">{{ totalEnergyConsumption }} kWh</span>
                </div>
              </div>
            </div>
            
            <!-- Cost Analysis -->
            <div class="bg-slate-900/50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-white mb-4">Cost Analysis</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Downtime Cost</span>
                  <span class="text-red-400 font-medium">Rp {{ formatCurrency(costAnalysis.downtime) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Spare Parts</span>
                  <span class="text-yellow-400 font-medium">Rp {{ formatCurrency(costAnalysis.spareParts) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Labor Cost</span>
                  <span class="text-blue-400 font-medium">Rp {{ formatCurrency(costAnalysis.labor) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Energy Cost</span>
                  <span class="text-green-400 font-medium">Rp {{ formatCurrency(costAnalysis.energy) }}</span>
                </div>
                <hr class="border-slate-600">
                <div class="flex justify-between items-center">
                  <span class="text-white font-medium">Total Maintenance Cost</span>
                  <span class="text-white font-bold">Rp {{ formatCurrency(totalMaintenanceCost) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. Asset Reports -->
      <div v-if="activeTab === 'assets'" class="space-y-6">
        <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h2 class="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span>🏭</span> Laporan Aset
          </h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Asset Register -->
            <div class="bg-slate-900/50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-white mb-4">Asset Register Summary</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Total Assets</span>
                  <span class="text-white font-medium">{{ assetStats.total }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Active Assets</span>
                  <span class="text-green-400 font-medium">{{ assetStats.active }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Under Maintenance</span>
                  <span class="text-yellow-400 font-medium">{{ assetStats.maintenance }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Decommissioned</span>
                  <span class="text-red-400 font-medium">{{ assetStats.decommissioned }}</span>
                </div>
              </div>
            </div>
            
            <!-- Asset Health -->
            <div class="bg-slate-900/50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-white mb-4">Asset Health Overview</h3>
              <div class="space-y-3">
                <div v-for="asset in assetHealth" :key="asset.id" class="flex justify-between items-center p-2 border border-slate-600 rounded">
                  <span class="text-white">{{ asset.name }}</span>
                  <div class="flex items-center gap-2">
                    <span :class="getHealthScoreClass(asset.healthScore)" class="px-2 py-1 rounded text-xs">
                      {{ asset.healthScore }}%
                    </span>
                    <span class="text-slate-400 text-sm">RUL: {{ asset.rul }}d</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- CAPEX Planning -->
          <div class="bg-slate-900/50 rounded-lg p-4 mt-6">
            <h3 class="text-lg font-medium text-white mb-4">CAPEX Planning Report</h3>
            <div class="space-y-3">
              <div v-for="capex in capexPlanning" :key="capex.id" class="flex justify-between items-center p-3 border border-slate-600 rounded-lg">
                <div>
                  <span class="text-white font-medium">{{ capex.asset }}</span>
                  <p class="text-slate-400 text-sm">{{ capex.reason }}</p>
                </div>
                <div class="text-right">
                  <span class="text-red-400 font-medium">{{ capex.priority }}</span>
                  <p class="text-slate-400 text-sm">Est. Cost: Rp {{ formatCurrency(capex.estimatedCost) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 6. User & Activity Reports -->
      <div v-if="activeTab === 'users'" class="space-y-6">
        <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h2 class="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span>👥</span> Laporan User & Aktivitas
          </h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- User Activity -->
            <div class="bg-slate-900/50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-white mb-4">User Activity Summary</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Total Users</span>
                  <span class="text-white font-medium">{{ userActivityStats.totalUsers }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Active Today</span>
                  <span class="text-green-400 font-medium">{{ userActivityStats.activeToday }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Login Sessions</span>
                  <span class="text-blue-400 font-medium">{{ userActivityStats.loginSessions }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Failed Logins</span>
                  <span class="text-red-400 font-medium">{{ userActivityStats.failedLogins }}</span>
                </div>
              </div>
            </div>
            
            <!-- Role Distribution -->
            <div class="bg-slate-900/50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-white mb-4">Role & Access Distribution</h3>
              <div class="space-y-3">
                <div v-for="role in roleDistribution" :key="role.name" class="flex justify-between items-center">
                  <span class="text-slate-300">{{ role.name }}</span>
                  <span class="text-white font-medium">{{ role.count }} users</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Recent Activities -->
          <div class="bg-slate-900/50 rounded-lg p-4 mt-6">
            <h3 class="text-lg font-medium text-white mb-4">Recent User Activities</h3>
            <div class="space-y-3">
              <div v-for="activity in recentUserActivities" :key="activity.id" class="flex justify-between items-center p-3 border border-slate-600 rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="text-xl">{{ activity.icon }}</span>
                  <div>
                    <span class="text-white font-medium">{{ activity.user }}</span>
                    <p class="text-slate-400 text-sm">{{ activity.action }}</p>
                  </div>
                </div>
                <span class="text-slate-400 text-sm">{{ formatDate(activity.timestamp) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 7. Compliance & Audit Reports -->
      <div v-if="activeTab === 'compliance'" class="space-y-6">
        <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h2 class="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span>📑</span> Compliance & Audit Reports
          </h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- ISO Compliance -->
            <div class="bg-slate-900/50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-white mb-4">ISO/Regulatory Compliance</h3>
              <div class="space-y-3">
                <div v-for="compliance in complianceStatus" :key="compliance.standard" class="flex justify-between items-center p-3 border border-slate-600 rounded-lg">
                  <div>
                    <span class="text-white font-medium">{{ compliance.standard }}</span>
                    <p class="text-slate-400 text-sm">{{ compliance.description }}</p>
                  </div>
                  <span :class="compliance.status === 'Compliant' ? 'text-green-400' : 'text-red-400'" class="font-medium">
                    {{ compliance.status }}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Audit Trail -->
            <div class="bg-slate-900/50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-white mb-4">Audit Trail Summary</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Total Audit Logs</span>
                  <span class="text-white font-medium">{{ auditStats.totalLogs }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Critical Changes</span>
                  <span class="text-red-400 font-medium">{{ auditStats.criticalChanges }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Data Modifications</span>
                  <span class="text-yellow-400 font-medium">{{ auditStats.dataModifications }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-slate-300">Access Violations</span>
                  <span class="text-red-400 font-medium">{{ auditStats.accessViolations }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Recent Audit Events -->
          <div class="bg-slate-900/50 rounded-lg p-4 mt-6">
            <h3 class="text-lg font-medium text-white mb-4">Recent Audit Events</h3>
            <div class="space-y-3">
              <div v-for="event in recentAuditEvents" :key="event.id" class="flex justify-between items-center p-3 border border-slate-600 rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="text-xl">{{ event.icon }}</span>
                  <div>
                    <span class="text-white font-medium">{{ event.action }}</span>
                    <p class="text-slate-400 text-sm">{{ event.description }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-slate-400 text-sm">{{ event.user }}</span>
                  <p class="text-slate-400 text-xs">{{ formatDate(event.timestamp) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 8. Output & Export -->
      <div v-if="activeTab === 'export'" class="space-y-6">
        <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h2 class="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span>🖨</span> Output & Ekspor
          </h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Export Options -->
            <div class="bg-slate-900/50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-white mb-4">Export Reports</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-slate-300 mb-2">Select Report Type</label>
                  <select v-model="exportSettings.reportType" class="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white">
                    <option value="telemetry">Telemetry Report</option>
                    <option value="maintenance">Maintenance Report</option>
                    <option value="ticketing">Ticketing Report</option>
                    <option value="energy">Energy Report</option>
                    <option value="assets">Asset Report</option>
                    <option value="compliance">Compliance Report</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-slate-300 mb-2">Date Range</label>
                  <div class="grid grid-cols-2 gap-2">
                    <input v-model="exportSettings.startDate" type="date" class="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white">
                    <input v-model="exportSettings.endDate" type="date" class="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white">
                  </div>
                </div>
                
                <div class="flex gap-2">
                  <button @click="exportToPDF" class="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <span>📄</span> Export PDF
                  </button>
                  <button @click="exportToExcel" class="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <span>📊</span> Export Excel
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Scheduled Reports -->
            <div class="bg-slate-900/50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-white mb-4">Scheduled Reports</h3>
              <div class="space-y-3">
                <div v-for="schedule in scheduledReportsList" :key="schedule.id" class="flex justify-between items-center p-3 border border-slate-600 rounded-lg">
                  <div>
                    <span class="text-white font-medium">{{ schedule.name }}</span>
                    <p class="text-slate-400 text-sm">{{ schedule.frequency }} - {{ schedule.recipients }}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span :class="schedule.status === 'Active' ? 'text-green-400' : 'text-red-400'" class="text-sm">
                      {{ schedule.status }}
                    </span>
                    <button class="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                  </div>
                </div>
              </div>
              
              <button class="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                + Add Scheduled Report
              </button>
            </div>
          </div>
          
          <!-- Custom Report Builder -->
          <div class="bg-slate-900/50 rounded-lg p-4 mt-6">
            <h3 class="text-lg font-medium text-white mb-4">Custom Report Builder</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-slate-300 mb-2">Categories</label>
                <div class="space-y-2">
                  <label v-for="category in reportCategories" :key="category" class="flex items-center gap-2">
                    <input type="checkbox" :value="category" v-model="customReport.categories" class="rounded">
                    <span class="text-slate-300 text-sm">{{ category }}</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label class="block text-slate-300 mb-2">Filters</label>
                <select v-model="customReport.filter" class="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white mb-2">
                  <option value="all">All Assets</option>
                  <option value="critical">Critical Only</option>
                  <option value="maintenance">Under Maintenance</option>
                </select>
                <select v-model="customReport.period" class="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
              
              <div>
                <label class="block text-slate-300 mb-2">Output Format</label>
                <select v-model="customReport.format" class="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white mb-4">
                  <option value="pdf">PDF Report</option>
                  <option value="excel">Excel Spreadsheet</option>
                  <option value="csv">CSV Data</option>
                </select>
                <button class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Generate Custom Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

// Interfaces
interface PerformanceMetric {
  name: string
  value: string
  trend: 'up' | 'down' | 'stable'
}

interface PredictiveAlert {
  id: string
  asset: string
  component: string
  rul: number
  probability: number
}

interface TechnicianPerformance {
  name: string
  mtta: number
  mttr: number
  slaCompliance: number
}

interface RecurringIssue {
  id: string
  title: string
  category: string
  count: number
  lastOccurrence: Date
}

interface EnergyConsumption {
  location: string
  current: number
  target: number
}

interface AssetHealth {
  id: string
  name: string
  healthScore: number
  rul: number
}

interface CapexPlanning {
  id: string
  asset: string
  reason: string
  priority: string
  estimatedCost: number
}

interface UserActivity {
  id: string
  user: string
  action: string
  icon: string
  timestamp: Date
}

interface ComplianceStatus {
  standard: string
  description: string
  status: string
}

interface AuditEvent {
  id: string
  action: string
  description: string
  user: string
  icon: string
  timestamp: Date
}

interface ScheduledReport {
  id: string
  name: string
  frequency: string
  recipients: string
  status: string
}

// Reactive data
const activeTab = ref('telemetry')
const selectedPeriod = ref('day')
const selectedMachine = ref('all')

const tabs = [
  { id: 'telemetry', name: 'Telemetry & Kinerja', icon: '📊' },
  { id: 'maintenance', name: 'Maintenance', icon: '🛠' },
  { id: 'ticketing', name: 'Ticketing', icon: '🎫' },
  { id: 'energy', name: 'Energi & Biaya', icon: '⚡' },
  { id: 'assets', name: 'Aset', icon: '🏭' },
  { id: 'users', name: 'User & Aktivitas', icon: '👥' },
  { id: 'compliance', name: 'Compliance & Audit', icon: '📑' },
  { id: 'export', name: 'Output & Ekspor', icon: '🖨' }
]

// Quick stats
const totalReports = ref(156)
const scheduledReports = ref(12)
const todayExports = ref(8)
const complianceScore = ref(94)

// Performance metrics
const performanceMetrics = ref<PerformanceMetric[]>([
  { name: 'Beban Mesin (%)', value: '78.5', trend: 'up' },
  { name: 'Getaran (mm/s)', value: '2.3', trend: 'stable' },
  { name: 'Suhu (°C)', value: '65.2', trend: 'down' },
  { name: 'Arus (A)', value: '145.8', trend: 'up' },
  { name: 'Tekanan (bar)', value: '8.2', trend: 'stable' },
  { name: 'Kelembaban (%)', value: '45.6', trend: 'down' }
])

const alarmStats = ref({
  critical: 3,
  warning: 12,
  info: 8
})

// Predictive maintenance
const predictiveAlerts = ref<PredictiveAlert[]>([
  {
    id: 'PA001',
    asset: 'Mesin Produksi A',
    component: 'Bearing Motor',
    rul: 15,
    probability: 85
  },
  {
    id: 'PA002',
    asset: 'Conveyor Belt 1',
    component: 'Drive Belt',
    rul: 7,
    probability: 92
  },
  {
    id: 'PA003',
    asset: 'Compressor Unit',
    component: 'Pressure Valve',
    rul: 25,
    probability: 68
  }
])

const maintenanceStats = ref({
  completed: 45,
  overdue: 8,
  scheduled: 12,
  complianceRate: 85
})

const downtimeStats = ref({
  totalHours: 24.5,
  mttr: 3.2,
  mtbf: 168.5
})

// Ticketing
const ticketStats = ref({
  total: 156,
  open: 23,
  inProgress: 18,
  closed: 108,
  overdue: 7
})

const technicianPerformance = ref<TechnicianPerformance[]>([
  { name: 'Ahmad Rizki', mtta: 0.8, mttr: 2.5, slaCompliance: 95 },
  { name: 'Sari Dewi', mtta: 1.2, mttr: 3.1, slaCompliance: 88 },
  { name: 'Budi Santoso', mtta: 0.6, mttr: 2.8, slaCompliance: 92 }
])

const recurringIssues = ref<RecurringIssue[]>([
  {
    id: 'RI001',
    title: 'Overheating Motor',
    category: 'Equipment Failure',
    count: 8,
    lastOccurrence: new Date('2024-01-14')
  },
  {
    id: 'RI002',
    title: 'Belt Misalignment',
    category: 'Mechanical Issue',
    count: 6,
    lastOccurrence: new Date('2024-01-12')
  },
  {
    id: 'RI003',
    title: 'Pressure Drop',
    category: 'System Issue',
    count: 5,
    lastOccurrence: new Date('2024-01-10')
  }
])

// Energy & Cost
const energyConsumption = ref<EnergyConsumption[]>([
  { location: 'Production Line A', current: 12500, target: 12000 },
  { location: 'Production Line B', current: 11800, target: 12000 },
  { location: 'Packaging Area', current: 8200, target: 8500 },
  { location: 'Warehouse', current: 4500, target: 5000 }
])

const costAnalysis = ref({
  downtime: 125000000,
  spareParts: 85000000,
  labor: 45000000,
  energy: 180000000
})

// Assets
const assetStats = ref({
  total: 156,
  active: 142,
  maintenance: 8,
  decommissioned: 6
})

const assetHealth = ref<AssetHealth[]>([
  { id: 'A001', name: 'Mesin Produksi A', healthScore: 85, rul: 120 },
  { id: 'A002', name: 'Mesin Produksi B', healthScore: 92, rul: 180 },
  { id: 'A003', name: 'Conveyor System', healthScore: 78, rul: 90 },
  { id: 'A004', name: 'Packaging Machine', healthScore: 88, rul: 150 }
])

const capexPlanning = ref<CapexPlanning[]>([
  {
    id: 'CP001',
    asset: 'Mesin Produksi A',
    reason: 'End of life cycle',
    priority: 'High',
    estimatedCost: 850000000
  },
  {
    id: 'CP002',
    asset: 'Conveyor Belt 2',
    reason: 'Frequent breakdowns',
    priority: 'Medium',
    estimatedCost: 125000000
  }
])

// Users
const userActivityStats = ref({
  totalUsers: 45,
  activeToday: 32,
  loginSessions: 156,
  failedLogins: 3
})

const roleDistribution = ref([
  { name: 'Admin', count: 3 },
  { name: 'Supervisor', count: 8 },
  { name: 'Technician', count: 18 },
  { name: 'Operator', count: 12 },
  { name: 'Viewer', count: 4 }
])

const recentUserActivities = ref<UserActivity[]>([
  {
    id: 'UA001',
    user: 'Ahmad Rizki',
    action: 'Created maintenance ticket',
    icon: '🎫',
    timestamp: new Date('2024-01-15T10:30:00')
  },
  {
    id: 'UA002',
    user: 'Sari Dewi',
    action: 'Updated asset status',
    icon: '🏭',
    timestamp: new Date('2024-01-15T09:15:00')
  },
  {
    id: 'UA003',
    user: 'Budi Santoso',
    action: 'Generated report',
    icon: '📊',
    timestamp: new Date('2024-01-14T16:45:00')
  }
])

// Compliance
const complianceStatus = ref<ComplianceStatus[]>([
  {
    standard: 'ISO 9001:2015',
    description: 'Quality Management System',
    status: 'Compliant'
  },
  {
    standard: 'ISO 14001:2015',
    description: 'Environmental Management',
    status: 'Compliant'
  },
  {
    standard: 'ISO 45001:2018',
    description: 'Occupational Health & Safety',
    status: 'Non-Compliant'
  }
])

const auditStats = ref({
  totalLogs: 2456,
  criticalChanges: 12,
  dataModifications: 156,
  accessViolations: 3
})

const recentAuditEvents = ref<AuditEvent[]>([
  {
    id: 'AE001',
    action: 'Asset Data Modified',
    description: 'Health score updated for Mesin Produksi A',
    user: 'Ahmad Rizki',
    icon: '🔧',
    timestamp: new Date('2024-01-15T10:30:00')
  },
  {
    id: 'AE002',
    action: 'User Role Changed',
    description: 'Role updated from Operator to Technician',
    user: 'System Admin',
    icon: '👤',
    timestamp: new Date('2024-01-15T09:15:00')
  }
])

// Export settings
const exportSettings = reactive({
  reportType: 'telemetry',
  startDate: '2024-01-01',
  endDate: '2024-01-31'
})

const scheduledReportsList = ref<ScheduledReport[]>([
  {
    id: 'SR001',
    name: 'Daily Telemetry Report',
    frequency: 'Daily at 08:00',
    recipients: 'maintenance@company.com',
    status: 'Active'
  },
  {
    id: 'SR002',
    name: 'Weekly Maintenance Summary',
    frequency: 'Weekly on Monday',
    recipients: 'supervisor@company.com',
    status: 'Active'
  },
  {
    id: 'SR003',
    name: 'Monthly Compliance Report',
    frequency: 'Monthly on 1st',
    recipients: 'management@company.com',
    status: 'Inactive'
  }
])

const reportCategories = [
  'Telemetry Data',
  'Maintenance Records',
  'Ticket History',
  'Energy Consumption',
  'Asset Information',
  'User Activities',
  'Compliance Data'
]

const customReport = reactive({
  categories: [],
  filter: 'all',
  period: 'monthly',
  format: 'pdf'
})

// Computed properties
const totalEnergyConsumption = computed(() => {
  return energyConsumption.value.reduce((total, item) => total + item.current, 0)
})

const totalMaintenanceCost = computed(() => {
  return Object.values(costAnalysis.value).reduce((total, cost) => total + cost, 0)
})

// Methods
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID').format(amount)
}

const getRULBadgeClass = (rul: number) => {
  if (rul <= 10) return 'bg-red-600/20 text-red-300'
  if (rul <= 30) return 'bg-yellow-600/20 text-yellow-300'
  return 'bg-green-600/20 text-green-300'
}

const getHealthScoreClass = (score: number) => {
  if (score >= 90) return 'bg-green-600/20 text-green-300'
  if (score >= 70) return 'bg-yellow-600/20 text-yellow-300'
  return 'bg-red-600/20 text-red-300'
}

// Export functions
const exportToExcelUtil = (filename: string, data: any) => {
  console.log('Exporting to Excel:', filename, data)
  // Implementation for Excel export
}

const exportToPDFUtil = (filename: string, data: any) => {
  console.log('Exporting to PDF:', filename, data)
  // Implementation for PDF export
}

const exportToPDF = () => {
  const reportData = getReportData()
  exportToPDFUtil(`${exportSettings.reportType}_report`, reportData)
}

const exportToExcel = () => {
  const reportData = getReportData()
  exportToExcelUtil(`${exportSettings.reportType}_report`, reportData)
}

const getReportData = () => {
  // Generate report data based on selected type
  switch (exportSettings.reportType) {
    case 'telemetry':
      return performanceMetrics.value.map(m => ({ metric: m.name, value: m.value }))
    case 'maintenance':
      return [
        { metric: 'Completed', value: maintenanceStats.value.completed },
        { metric: 'Overdue', value: maintenanceStats.value.overdue },
        { metric: 'Scheduled', value: maintenanceStats.value.scheduled }
      ]
    case 'ticketing':
      return [
        { metric: 'Total Tickets', value: ticketStats.value.total },
        { metric: 'Open', value: ticketStats.value.open },
        { metric: 'Closed', value: ticketStats.value.closed }
      ]
    default:
      return []
  }
}
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #1e293b;
}

::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* Smooth transitions */
.transition-colors {
  transition: color 0.2s ease, background-color 0.2s ease;
}

/* Hover effects */
.hover\:bg-slate-700\/50:hover {
  background-color: rgba(51, 65, 85, 0.5);
}
</style>


