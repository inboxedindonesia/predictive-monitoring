<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Predictive Maintenance</h1>
      <div class="flex gap-2">
        <button @click="refreshData" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors">
          🔄 Refresh Data
        </button>
        <RouterLink to="/cms/reports" class="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm transition-colors">
          📊 Generate Report
        </RouterLink>
      </div>
    </div>

    <!-- 1. Machine Health Overview -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">🏥 Machine Health Overview</h2>
        <div class="text-sm text-neutral-400">Last updated: {{ lastUpdated }}</div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-neutral-900/50 rounded-lg p-4">
          <div class="text-2xl font-bold text-green-400">{{ overallHealthScore }}%</div>
          <div class="text-sm text-neutral-400">Overall Health Score</div>
        </div>
        <div class="bg-neutral-900/50 rounded-lg p-4">
          <div class="text-2xl font-bold text-blue-400">{{ activeMachines }}</div>
          <div class="text-sm text-neutral-400">Active Machines</div>
        </div>
        <div class="bg-neutral-900/50 rounded-lg p-4">
          <div class="text-2xl font-bold text-yellow-400">{{ warningCount }}</div>
          <div class="text-sm text-neutral-400">Warnings</div>
        </div>
        <div class="bg-neutral-900/50 rounded-lg p-4">
          <div class="text-2xl font-bold text-red-400">{{ criticalCount }}</div>
          <div class="text-sm text-neutral-400">Critical Issues</div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm min-w-[1000px]">
          <thead class="text-neutral-400 border-b border-neutral-700">
            <tr>
              <th class="text-left py-3 px-2">Machine</th>
              <th class="text-left py-3 px-2">Location</th>
              <th class="text-left py-3 px-2">Health Score</th>
              <th class="text-left py-3 px-2">Status</th>
              <th class="text-left py-3 px-2">RUL (Hours)</th>
              <th class="text-left py-3 px-2">Failure Probability</th>
              <th class="text-left py-3 px-2">Last Maintenance</th>
              <th class="text-left py-3 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(machine, index) in machines" :key="machine.id" :class="{'bg-neutral-800/30': index % 2 === 0}">
              <td class="py-3 px-2">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full" :class="getStatusColor(machine.status)"></div>
                  <span class="font-medium">{{ machine.name }}</span>
                </div>
              </td>
              <td class="py-3 px-2">{{ machine.location }}</td>
              <td class="py-3 px-2">
                <div class="flex items-center gap-2">
                  <div class="w-16 bg-neutral-700 rounded-full h-2">
                    <div class="h-2 rounded-full" :class="getHealthBarColor(machine.healthScore)" :style="`width: ${machine.healthScore}%`"></div>
                  </div>
                  <span :class="getHealthTextColor(machine.healthScore)">{{ machine.healthScore }}%</span>
                </div>
              </td>
              <td class="py-3 px-2">
                <span class="px-2 py-1 rounded-full text-xs font-medium" :class="getStatusBadgeColor(machine.status)">
                  {{ machine.status }}
                </span>
              </td>
              <td class="py-3 px-2" :class="machine.rul < 100 ? 'text-red-400' : 'text-neutral-300'">
                {{ machine.rul }}
              </td>
              <td class="py-3 px-2">
                <span :class="machine.failureProbability > 60 ? 'text-red-400' : machine.failureProbability > 30 ? 'text-yellow-400' : 'text-green-400'">
                  {{ machine.failureProbability }}%
                </span>
              </td>
              <td class="py-3 px-2 text-neutral-400">{{ machine.lastMaintenance }}</td>
              <td class="py-3 px-2">
                <RouterLink :to="`/cms/telemetry?device=${machine.name}`" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors mr-2">
                  View Data
                </RouterLink>
                <RouterLink to="/cms/tickets" class="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded text-xs transition-colors">
                  Create Ticket
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 2. Failure Prediction Dashboard -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold mb-4">⚠️ Failure Prediction Dashboard</h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- High Risk Machines -->
        <div class="bg-neutral-900/50 rounded-lg p-4">
          <h3 class="text-lg font-medium mb-3 text-red-400">🚨 High Risk Machines</h3>
          <div class="space-y-2">
            <div v-for="machine in highRiskMachines" :key="machine.id" class="flex items-center justify-between p-3 bg-red-950/30 border border-red-800/50 rounded-lg">
              <div>
                <div class="font-medium text-red-300">{{ machine.name }}</div>
                <div class="text-sm text-neutral-400">{{ machine.location }}</div>
              </div>
              <div class="text-right">
                <div class="text-red-400 font-bold">{{ machine.failureProbability }}%</div>
                <div class="text-xs text-neutral-400">Risk Level</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Root Cause Analysis -->
        <div class="bg-neutral-900/50 rounded-lg p-4">
          <h3 class="text-lg font-medium mb-3">🔍 Root Cause Analysis</h3>
          <div class="space-y-2">
            <div v-for="cause in rootCauses" :key="cause.id" class="p-3 bg-neutral-800/50 rounded-lg">
              <div class="flex items-center justify-between">
                <span class="font-medium">{{ cause.machine }}</span>
                <span class="text-xs px-2 py-1 rounded" :class="getSeverityColor(cause.severity)">{{ cause.severity }}</span>
              </div>
              <div class="text-sm text-neutral-400 mt-1">{{ cause.issue }}</div>
              <div class="text-xs text-blue-400 mt-1">{{ cause.recommendation }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Prediction Trends Chart -->
      <div class="mt-6">
        <h3 class="text-lg font-medium mb-3">📈 Parameter Trend Prediction</h3>
        <div class="bg-neutral-900/50 rounded-lg p-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="trend in parameterTrends" :key="trend.parameter" class="text-center">
              <div class="text-sm text-neutral-400 mb-2">{{ trend.parameter }}</div>
              <div class="text-2xl font-bold mb-1" :class="getTrendColor(trend.trend)">
                {{ trend.trend > 0 ? '↗️' : trend.trend < 0 ? '↘️' : '➡️' }}
              </div>
              <div class="text-lg font-semibold" :class="getTrendColor(trend.trend)">{{ trend.value }}{{ trend.unit }}</div>
              <div class="text-xs text-neutral-500">{{ trend.status }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Production Area Heatmap -->
      <div class="mt-6">
        <h3 class="text-lg font-medium mb-3">🗺️ Production Area Risk Heatmap</h3>
        <div class="bg-neutral-900/50 rounded-lg p-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div v-for="area in productionAreas" :key="area.name" class="p-3 rounded-lg text-center" :class="getAreaRiskColor(area.riskLevel)">
              <div class="font-medium">{{ area.name }}</div>
              <div class="text-sm">{{ area.machineCount }} machines</div>
              <div class="text-xs mt-1">Risk: {{ area.riskLevel }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Maintenance Recommendations -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold mb-4">🔧 Maintenance Recommendations</h2>
      
      <div class="overflow-x-auto">
        <table class="w-full text-sm min-w-[1200px]">
          <thead class="text-neutral-400 border-b border-neutral-700">
            <tr>
              <th class="text-left py-3 px-2">Machine</th>
              <th class="text-left py-3 px-2">Recommendation</th>
              <th class="text-left py-3 px-2">Priority</th>
              <th class="text-left py-3 px-2">Spare Parts</th>
              <th class="text-left py-3 px-2">Est. Downtime</th>
              <th class="text-left py-3 px-2">Cost Impact</th>
              <th class="text-left py-3 px-2">Due Date</th>
              <th class="text-left py-3 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rec, index) in recommendations" :key="rec.id" :class="{'bg-neutral-800/30': index % 2 === 0}">
              <td class="py-3 px-2 font-medium">{{ rec.machine }}</td>
              <td class="py-3 px-2">{{ rec.action }}</td>
              <td class="py-3 px-2">
                <span class="px-2 py-1 rounded-full text-xs font-medium" :class="getPriorityColor(rec.priority)">
                  {{ rec.priority }}
                </span>
              </td>
              <td class="py-3 px-2">
                <div class="space-y-1">
                  <div v-for="part in rec.spareParts" :key="part" class="text-xs bg-neutral-700 px-2 py-1 rounded">
                    {{ part }}
                  </div>
                </div>
              </td>
              <td class="py-3 px-2">{{ rec.downtime }}h</td>
              <td class="py-3 px-2 font-medium">${{ rec.costImpact.toLocaleString() }}</td>
              <td class="py-3 px-2" :class="isOverdue(rec.dueDate) ? 'text-red-400' : 'text-neutral-300'">
                {{ rec.dueDate }}
              </td>
              <td class="py-3 px-2">
                <button @click="scheduleMaintenace(rec)" class="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs transition-colors mr-2">
                  Schedule
                </button>
                <RouterLink to="/cms/tickets" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors">
                  Create Ticket
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 4. Maintenance Schedule & Planning -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold mb-4">📅 Maintenance Schedule & Planning</h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Calendar View -->
        <div class="lg:col-span-2 bg-neutral-900/50 rounded-lg p-4">
          <h3 class="text-lg font-medium mb-3">Calendar View</h3>
          <div class="grid grid-cols-7 gap-1 text-center text-xs">
            <div v-for="day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" :key="day" class="p-2 font-medium text-neutral-400">
              {{ day }}
            </div>
            <div v-for="date in calendarDates" :key="date.date" class="p-2 rounded" :class="getCalendarDateClass(date)">
              <div>{{ date.day }}</div>
              <div v-if="date.maintenanceCount > 0" class="text-xs mt-1 bg-blue-600 rounded px-1">
                {{ date.maintenanceCount }}
              </div>
            </div>
          </div>
        </div>

        <!-- Workload Forecast -->
        <div class="bg-neutral-900/50 rounded-lg p-4">
          <h3 class="text-lg font-medium mb-3">Workload Forecast</h3>
          <div class="space-y-3">
            <div v-for="forecast in workloadForecast" :key="forecast.period" class="flex justify-between items-center">
              <span class="text-sm">{{ forecast.period }}</span>
              <div class="flex items-center gap-2">
                <div class="w-16 bg-neutral-700 rounded-full h-2">
                  <div class="h-2 bg-blue-500 rounded-full" :style="`width: ${forecast.workload}%`"></div>
                </div>
                <span class="text-xs">{{ forecast.workload }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Maintenance -->
      <div class="mt-6">
        <h3 class="text-lg font-medium mb-3">🔜 Upcoming Maintenance</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="maintenance in upcomingMaintenance" :key="maintenance.id" class="bg-neutral-900/50 rounded-lg p-4">
            <div class="flex justify-between items-start mb-2">
              <div class="font-medium">{{ maintenance.machine }}</div>
              <span class="text-xs px-2 py-1 rounded" :class="getPriorityColor(maintenance.priority)">
                {{ maintenance.priority }}
              </span>
            </div>
            <div class="text-sm text-neutral-400 mb-2">{{ maintenance.task }}</div>
            <div class="text-xs text-neutral-500">{{ maintenance.scheduledDate }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Historical Analysis & Continuous Improvement -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold mb-4">📊 Historical Analysis & Continuous Improvement</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-neutral-900/50 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-green-400">{{ kpis.mtbf }}h</div>
          <div class="text-sm text-neutral-400">MTBF</div>
        </div>
        <div class="bg-neutral-900/50 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-blue-400">{{ kpis.mttr }}h</div>
          <div class="text-sm text-neutral-400">MTTR</div>
        </div>
        <div class="bg-neutral-900/50 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-yellow-400">${{ kpis.costSavings.toLocaleString() }}</div>
          <div class="text-sm text-neutral-400">Cost Savings</div>
        </div>
        <div class="bg-neutral-900/50 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-purple-400">{{ kpis.predictionAccuracy }}%</div>
          <div class="text-sm text-neutral-400">Prediction Accuracy</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Prediction vs Reality -->
        <div class="bg-neutral-900/50 rounded-lg p-4">
          <h3 class="text-lg font-medium mb-3">🎯 Prediction vs Reality</h3>
          <div class="space-y-2">
            <div v-for="prediction in predictionHistory" :key="prediction.id" class="flex justify-between items-center p-2 bg-neutral-800/50 rounded">
              <div>
                <div class="text-sm font-medium">{{ prediction.machine }}</div>
                <div class="text-xs text-neutral-400">{{ prediction.date }}</div>
              </div>
              <div class="text-right">
                <div class="text-xs">Predicted: {{ prediction.predicted }}%</div>
                <div class="text-xs" :class="prediction.accurate ? 'text-green-400' : 'text-red-400'">
                  Actual: {{ prediction.actual }}%
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pareto Analysis -->
        <div class="bg-neutral-900/50 rounded-lg p-4">
          <h3 class="text-lg font-medium mb-3">📈 Pareto Analysis - Top Failure Causes</h3>
          <div class="space-y-2">
            <div v-for="cause in paretoAnalysis" :key="cause.cause" class="flex items-center gap-3">
              <div class="w-24 text-xs">{{ cause.cause }}</div>
              <div class="flex-1 bg-neutral-700 rounded-full h-2">
                <div class="h-2 bg-red-500 rounded-full" :style="`width: ${cause.percentage}%`"></div>
              </div>
              <div class="text-xs w-12 text-right">{{ cause.percentage }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 6. Alert & Notification Center -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold mb-4">🚨 Alert & Notification Center</h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Active Alerts -->
        <div class="bg-neutral-900/50 rounded-lg p-4">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-lg font-medium">⚡ Active Alerts</h3>
            <button @click="clearAllAlerts" class="text-xs px-3 py-1 bg-red-600 hover:bg-red-700 rounded transition-colors">
              Clear All
            </button>
          </div>
          <div class="space-y-2 max-h-64 overflow-y-auto">
            <div v-for="alert in activeAlerts" :key="alert.id" class="p-3 rounded-lg border-l-4" :class="getAlertClass(alert.severity)">
              <div class="flex justify-between items-start">
                <div>
                  <div class="font-medium">{{ alert.machine }}</div>
                  <div class="text-sm text-neutral-300">{{ alert.message }}</div>
                  <div class="text-xs text-neutral-400 mt-1">{{ alert.timestamp }}</div>
                </div>
                <button @click="acknowledgeAlert(alert.id)" class="text-xs px-2 py-1 bg-neutral-700 hover:bg-neutral-600 rounded transition-colors">
                  Ack
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="bg-neutral-900/50 rounded-lg p-4">
          <h3 class="text-lg font-medium mb-3">⚙️ Notification Settings</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm">Email Notifications</span>
              <input type="checkbox" v-model="notificationSettings.email" class="rounded">
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm">SMS Alerts</span>
              <input type="checkbox" v-model="notificationSettings.sms" class="rounded">
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm">Push Notifications</span>
              <input type="checkbox" v-model="notificationSettings.push" class="rounded">
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm">Auto-Escalation</span>
              <input type="checkbox" v-model="notificationSettings.escalation" class="rounded">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 7. Configuration & Model Tuning -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold mb-4">⚙️ Configuration & Model Tuning</h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Threshold Settings -->
        <div class="bg-neutral-900/50 rounded-lg p-4">
          <h3 class="text-lg font-medium mb-3">🎚️ Threshold Settings</h3>
          <div class="space-y-4">
            <div v-for="threshold in thresholds" :key="threshold.parameter">
              <label class="block text-sm font-medium mb-1">{{ threshold.parameter }}</label>
              <div class="flex items-center gap-2">
                <input 
                  type="range" 
                  :min="threshold.min" 
                  :max="threshold.max" 
                  v-model="threshold.value" 
                  class="flex-1"
                >
                <span class="text-sm w-16">{{ threshold.value }}{{ threshold.unit }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Model Performance -->
        <div class="bg-neutral-900/50 rounded-lg p-4">
          <h3 class="text-lg font-medium mb-3">🤖 Model Performance</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm">Accuracy</span>
              <span class="text-sm font-medium text-green-400">{{ modelPerformance.accuracy }}%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm">Precision</span>
              <span class="text-sm font-medium text-blue-400">{{ modelPerformance.precision }}%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm">Recall</span>
              <span class="text-sm font-medium text-yellow-400">{{ modelPerformance.recall }}%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm">F1-Score</span>
              <span class="text-sm font-medium text-purple-400">{{ modelPerformance.f1Score }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

// Types
type MachineStatus = 'Normal' | 'Warning' | 'Critical'
type Priority = 'Critical' | 'High' | 'Medium' | 'Low'

interface Machine {
  id: string
  name: string
  location: string
  healthScore: number
  status: MachineStatus
  rul: number
  failureProbability: number
  lastMaintenance: string
}

interface Recommendation {
  id: string
  machine: string
  action: string
  priority: Priority
  spareParts: string[]
  downtime: number
  costImpact: number
  dueDate: string
}

interface RootCause {
  id: string
  machine: string
  issue: string
  severity: string
  recommendation: string
}

interface Alert {
  id: string
  machine: string
  message: string
  severity: 'Critical' | 'High' | 'Medium' | 'Low'
  timestamp: string
}

// Reactive data
const lastUpdated = ref(new Date().toLocaleString())
const notificationSettings = ref({
  email: true,
  sms: false,
  push: true,
  escalation: true
})

// Machine data with realistic dummy data
const machines = ref<Machine[]>([
  {
    id: '1',
    name: 'Compressor A1',
    location: 'Production Line 1',
    healthScore: 65,
    status: 'Warning',
    rul: 72,
    failureProbability: 75,
    lastMaintenance: '2024-01-15'
  },
  {
    id: '2',
    name: 'Pump B2',
    location: 'Production Line 2',
    healthScore: 85,
    status: 'Normal',
    rul: 240,
    failureProbability: 25,
    lastMaintenance: '2024-01-20'
  },
  {
    id: '3',
    name: 'Motor C3',
    location: 'Assembly Area',
    healthScore: 45,
    status: 'Critical',
    rul: 24,
    failureProbability: 90,
    lastMaintenance: '2023-12-10'
  },
  {
    id: '4',
    name: 'Conveyor D4',
    location: 'Packaging Line',
    healthScore: 78,
    status: 'Normal',
    rul: 180,
    failureProbability: 35,
    lastMaintenance: '2024-01-18'
  },
  {
    id: '5',
    name: 'Hydraulic E5',
    location: 'Press Section',
    healthScore: 55,
    status: 'Warning',
    rul: 96,
    failureProbability: 65,
    lastMaintenance: '2024-01-12'
  },
  {
    id: '6',
    name: 'Chiller F6',
    location: 'Cooling System',
    healthScore: 92,
    status: 'Normal',
    rul: 360,
    failureProbability: 15,
    lastMaintenance: '2024-01-22'
  }
])

// Recommendations data
const recommendations = ref<Recommendation[]>([
  {
    id: '1',
    machine: 'Compressor A1',
    action: 'Replace bearing assembly',
    priority: 'Critical',
    spareParts: ['Bearing Set SKF-6205', 'Seal Kit', 'Lubricant'],
    downtime: 4,
    costImpact: 2500,
    dueDate: '2024-01-28'
  },
  {
    id: '2',
    machine: 'Motor C3',
    action: 'Rewinding stator coils',
    priority: 'Critical',
    spareParts: ['Copper Wire', 'Insulation Material', 'Varnish'],
    downtime: 8,
    costImpact: 4500,
    dueDate: '2024-01-26'
  },
  {
    id: '3',
    machine: 'Hydraulic E5',
    action: 'Replace hydraulic fluid and filters',
    priority: 'High',
    spareParts: ['Hydraulic Oil', 'Filter Element', 'O-Ring Set'],
    downtime: 2,
    costImpact: 800,
    dueDate: '2024-01-30'
  },
  {
    id: '4',
    machine: 'Pump B2',
    action: 'Impeller inspection and balancing',
    priority: 'Medium',
    spareParts: ['Impeller', 'Gasket Set'],
    downtime: 3,
    costImpact: 1200,
    dueDate: '2024-02-05'
  }
])

// Root causes data
const rootCauses = ref<RootCause[]>([
  {
    id: '1',
    machine: 'Compressor A1',
    issue: 'Bearing wear due to insufficient lubrication',
    severity: 'High',
    recommendation: 'Implement automatic lubrication system'
  },
  {
    id: '2',
    machine: 'Motor C3',
    issue: 'Overheating caused by blocked ventilation',
    severity: 'Critical',
    recommendation: 'Clean air vents and check cooling fan'
  },
  {
    id: '3',
    machine: 'Hydraulic E5',
    issue: 'Contaminated hydraulic fluid',
    severity: 'Medium',
    recommendation: 'Install better filtration system'
  }
])

// Parameter trends
const parameterTrends = ref([
  { parameter: 'Temperature', value: 75, unit: '°C', trend: 1, status: 'Rising' },
  { parameter: 'Vibration', value: 8.5, unit: 'mm/s', trend: 1, status: 'Increasing' },
  { parameter: 'Current', value: 12.3, unit: 'A', trend: -1, status: 'Decreasing' }
])

// Production areas
const productionAreas = ref([
  { name: 'Line 1', machineCount: 8, riskLevel: 'High' },
  { name: 'Line 2', machineCount: 6, riskLevel: 'Medium' },
  { name: 'Assembly', machineCount: 4, riskLevel: 'Critical' },
  { name: 'Packaging', machineCount: 5, riskLevel: 'Low' },
  { name: 'Quality Control', machineCount: 3, riskLevel: 'Low' },
  { name: 'Storage', machineCount: 2, riskLevel: 'Medium' }
])

// Calendar dates (simplified)
const calendarDates = ref(
  Array.from({ length: 35 }, (_, i) => ({
    date: `2024-01-${String(i + 1).padStart(2, '0')}`,
    day: i + 1,
    maintenanceCount: Math.floor(Math.random() * 3)
  }))
)

// Workload forecast
const workloadForecast = ref([
  { period: 'This Week', workload: 85 },
  { period: 'Next Week', workload: 65 },
  { period: 'Week 3', workload: 45 },
  { period: 'Week 4', workload: 70 }
])

// Upcoming maintenance
 const upcomingMaintenance = ref([
   {
     id: '1',
     machine: 'Compressor A1',
     task: 'Bearing replacement',
     priority: 'Critical' as Priority,
     scheduledDate: '2024-01-28'
   },
   {
     id: '2',
     machine: 'Motor C3',
     task: 'Stator rewinding',
     priority: 'Critical' as Priority,
     scheduledDate: '2024-01-26'
   },
   {
     id: '3',
     machine: 'Pump B2',
     task: 'Routine inspection',
     priority: 'Medium' as Priority,
     scheduledDate: '2024-02-05'
   }
 ])

// KPIs
const kpis = ref({
  mtbf: 168,
  mttr: 4.2,
  costSavings: 45000,
  predictionAccuracy: 87
})

// Prediction history
const predictionHistory = ref([
  {
    id: '1',
    machine: 'Compressor A1',
    date: '2024-01-20',
    predicted: 75,
    actual: 78,
    accurate: true
  },
  {
    id: '2',
    machine: 'Motor C3',
    date: '2024-01-18',
    predicted: 85,
    actual: 90,
    accurate: true
  },
  {
    id: '3',
    machine: 'Pump B2',
    date: '2024-01-15',
    predicted: 30,
    actual: 25,
    accurate: true
  }
])

// Pareto analysis
const paretoAnalysis = ref([
  { cause: 'Bearing Failure', percentage: 35 },
  { cause: 'Overheating', percentage: 25 },
  { cause: 'Contamination', percentage: 20 },
  { cause: 'Misalignment', percentage: 12 },
  { cause: 'Others', percentage: 8 }
])

// Active alerts
const activeAlerts = ref<Alert[]>([
  {
    id: '1',
    machine: 'Compressor A1',
    message: 'Temperature exceeding normal range',
    severity: 'High',
    timestamp: '2024-01-25 14:30'
  },
  {
    id: '2',
    machine: 'Motor C3',
    message: 'Vibration levels critical',
    severity: 'Critical',
    timestamp: '2024-01-25 14:15'
  },
  {
    id: '3',
    machine: 'Hydraulic E5',
    message: 'Pressure drop detected',
    severity: 'Medium',
    timestamp: '2024-01-25 13:45'
  }
])

// Thresholds
const thresholds = ref([
  { parameter: 'Temperature', value: 80, min: 50, max: 120, unit: '°C' },
  { parameter: 'Vibration', value: 10, min: 0, max: 20, unit: 'mm/s' },
  { parameter: 'Current', value: 15, min: 0, max: 30, unit: 'A' },
  { parameter: 'Pressure', value: 5, min: 0, max: 10, unit: 'bar' }
])

// Model performance
const modelPerformance = ref({
  accuracy: 87,
  precision: 84,
  recall: 89,
  f1Score: 86
})

// Computed properties
const overallHealthScore = computed(() => {
  const total = machines.value.reduce((sum, machine) => sum + machine.healthScore, 0)
  return Math.round(total / machines.value.length)
})

const activeMachines = computed(() => machines.value.length)

const warningCount = computed(() => 
  machines.value.filter(m => m.status === 'Warning').length
)

const criticalCount = computed(() => 
  machines.value.filter(m => m.status === 'Critical').length
)

const highRiskMachines = computed(() => 
  machines.value.filter(m => m.failureProbability > 60)
)

// Helper functions
function getStatusColor(status: MachineStatus): string {
  switch (status) {
    case 'Normal': return 'bg-green-500'
    case 'Warning': return 'bg-yellow-500'
    case 'Critical': return 'bg-red-500'
    default: return 'bg-gray-500'
  }
}

function getHealthBarColor(score: number): string {
  if (score >= 80) return 'bg-green-500'
  if (score >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}

function getHealthTextColor(score: number): string {
  if (score >= 80) return 'text-green-400'
  if (score >= 60) return 'text-yellow-400'
  return 'text-red-400'
}

function getStatusBadgeColor(status: MachineStatus): string {
  switch (status) {
    case 'Normal': return 'bg-green-900/50 text-green-300 border border-green-700'
    case 'Warning': return 'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
    case 'Critical': return 'bg-red-900/50 text-red-300 border border-red-700'
    default: return 'bg-gray-900/50 text-gray-300 border border-gray-700'
  }
}

function getPriorityColor(priority: Priority): string {
  switch (priority) {
    case 'Critical': return 'bg-red-900/50 text-red-300 border border-red-700'
    case 'High': return 'bg-orange-900/50 text-orange-300 border border-orange-700'
    case 'Medium': return 'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
    case 'Low': return 'bg-green-900/50 text-green-300 border border-green-700'
    default: return 'bg-gray-900/50 text-gray-300 border border-gray-700'
  }
}

function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'Critical': return 'bg-red-900/50 text-red-300'
    case 'High': return 'bg-orange-900/50 text-orange-300'
    case 'Medium': return 'bg-yellow-900/50 text-yellow-300'
    default: return 'bg-green-900/50 text-green-300'
  }
}

function getTrendColor(trend: number): string {
  if (trend > 0) return 'text-red-400'
  if (trend < 0) return 'text-green-400'
  return 'text-neutral-400'
}

function getAreaRiskColor(riskLevel: string): string {
  switch (riskLevel) {
    case 'Critical': return 'bg-red-900/50 border border-red-700'
    case 'High': return 'bg-orange-900/50 border border-orange-700'
    case 'Medium': return 'bg-yellow-900/50 border border-yellow-700'
    case 'Low': return 'bg-green-900/50 border border-green-700'
    default: return 'bg-neutral-900/50 border border-neutral-700'
  }
}

function getCalendarDateClass(date: any): string {
  const baseClass = 'hover:bg-neutral-700 cursor-pointer'
  if (date.maintenanceCount > 0) {
    return `${baseClass} bg-blue-900/30`
  }
  return baseClass
}

function getAlertClass(severity: string): string {
  switch (severity) {
    case 'Critical': return 'bg-red-950/30 border-red-500'
    case 'High': return 'bg-orange-950/30 border-orange-500'
    case 'Medium': return 'bg-yellow-950/30 border-yellow-500'
    default: return 'bg-blue-950/30 border-blue-500'
  }
}

function isOverdue(dueDate: string): boolean {
  return new Date(dueDate) < new Date()
}

// Actions
function refreshData() {
  lastUpdated.value = new Date().toLocaleString()
  // Simulate data refresh
  console.log('Data refreshed')
}

function scheduleMaintenace(recommendation: Recommendation) {
  console.log('Scheduling maintenance for:', recommendation.machine)
  // Integration with calendar/scheduling system
}

function clearAllAlerts() {
  activeAlerts.value = []
}

function acknowledgeAlert(alertId: string) {
  const index = activeAlerts.value.findIndex(alert => alert.id === alertId)
  if (index > -1) {
    activeAlerts.value.splice(index, 1)
  }
}

onMounted(() => {
  // Initialize component
  console.log('Predictive Maintenance dashboard loaded')
})
</script>

<style scoped>
/* Custom scrollbar for alert section */
.max-h-64::-webkit-scrollbar {
  width: 4px;
}

.max-h-64::-webkit-scrollbar-track {
  background: #374151;
}

.max-h-64::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 2px;
}

.max-h-64::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
