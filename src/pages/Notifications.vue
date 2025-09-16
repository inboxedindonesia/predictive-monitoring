<template>
  <div class="min-h-screen bg-neutral-950 text-white p-6">
    <!-- Header with Bell Icon and Stats -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <svg class="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
          </svg>
          <span v-if="unreadCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {{ unreadCount }}
          </span>
        </div>
        <h1 class="text-3xl font-bold">Notification Center</h1>
      </div>
      
      <!-- Quick Stats -->
      <div class="flex space-x-6">
        <div class="text-center">
          <div class="text-2xl font-bold text-red-400">{{ criticalCount }}</div>
          <div class="text-xs text-neutral-400">Critical</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-yellow-400">{{ warningCount }}</div>
          <div class="text-xs text-neutral-400">Warning</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-400">{{ infoCount }}</div>
          <div class="text-xs text-neutral-400">Info</div>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="flex space-x-1 mb-6 bg-neutral-900 p-1 rounded-lg">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-4 py-2 rounded-md text-sm font-medium transition-colors',
          activeTab === tab.id 
            ? 'bg-blue-600 text-white' 
            : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
        ]"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="space-y-6">
      <!-- 1. Notification Center (Inbox) -->
      <div v-show="activeTab === 'inbox'" class="space-y-6">
        <div class="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              Notification Inbox
            </h2>
            
            <!-- Bulk Actions -->
            <div class="flex space-x-2">
              <button @click="markAllAsRead" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">
                Mark All Read
              </button>
              <button @click="deleteSelected" class="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">
                Delete Selected
              </button>
            </div>
          </div>

          <!-- Search and Filters -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="md:col-span-2">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search notifications..."
                class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white placeholder-neutral-400"
              >
            </div>
            <select v-model="priorityFilter" class="bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white">
              <option value="">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
            <select v-model="moduleFilter" class="bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white">
              <option value="">All Modules</option>
              <option value="telemetry">Telemetry</option>
              <option value="maintenance">Maintenance</option>
              <option value="ticketing">Ticketing</option>
              <option value="system">System</option>
            </select>
          </div>

          <!-- Notifications List -->
          <div class="space-y-2">
            <div 
              v-for="notification in filteredNotifications" 
              :key="notification.id"
              :class="[
                'flex items-center p-4 rounded-lg border transition-colors cursor-pointer',
                notification.status === 'unread' 
                  ? 'bg-neutral-800/50 border-neutral-700' 
                  : 'bg-neutral-900/30 border-neutral-800',
                getPriorityClass(notification.priority)
              ]"
              @click="openNotification(notification)"
            >
              <input 
                type="checkbox" 
                v-model="selectedNotifications"
                :value="notification.id"
                class="mr-4"
                @click.stop
              >
              
              <!-- Priority Indicator -->
              <div :class="[
                'w-3 h-3 rounded-full mr-4',
                notification.priority === 'critical' ? 'bg-red-500' :
                notification.priority === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
              ]"></div>

              <!-- Content -->
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <span class="text-sm text-neutral-400">{{ notification.time }}</span>
                    <span class="text-xs px-2 py-1 bg-neutral-700 rounded">{{ notification.module }}</span>
                    <span v-if="notification.status === 'unread'" class="text-xs px-2 py-1 bg-blue-600 rounded">New</span>
                  </div>
                  <div class="flex space-x-2">
                    <button 
                      @click.stop="acknowledgeNotification(notification.id)"
                      class="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs"
                    >
                      Acknowledge
                    </button>
                    <button 
                      @click.stop="archiveNotification(notification.id)"
                      class="px-3 py-1 bg-neutral-600 hover:bg-neutral-700 rounded text-xs"
                    >
                      Archive
                    </button>
                  </div>
                </div>
                <p class="text-white mt-1">{{ notification.message }}</p>
                <p class="text-sm text-neutral-400 mt-1">{{ notification.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Notification Types -->
      <div v-show="activeTab === 'types'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Telemetry Alerts -->
          <div class="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              Telemetry Alerts
            </h3>
            <div class="space-y-3">
              <div v-for="alert in telemetryAlerts" :key="alert.id" class="p-3 bg-neutral-800 rounded-lg">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium">{{ alert.parameter }}</span>
                  <span :class="[
                    'text-xs px-2 py-1 rounded',
                    alert.status === 'critical' ? 'bg-red-600' :
                    alert.status === 'warning' ? 'bg-yellow-600' : 'bg-green-600'
                  ]">{{ alert.status }}</span>
                </div>
                <p class="text-xs text-neutral-400 mt-1">{{ alert.description }}</p>
                <p class="text-xs text-neutral-500 mt-1">{{ alert.location }}</p>
              </div>
            </div>
          </div>

          <!-- Predictive Maintenance -->
          <div class="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
              </svg>
              Predictive Maintenance
            </h3>
            <div class="space-y-3">
              <div v-for="pm in predictiveAlerts" :key="pm.id" class="p-3 bg-neutral-800 rounded-lg">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium">{{ pm.asset }}</span>
                  <span class="text-xs px-2 py-1 bg-orange-600 rounded">{{ pm.rul }} days</span>
                </div>
                <p class="text-xs text-neutral-400 mt-1">{{ pm.component }}</p>
                <div class="flex items-center mt-2">
                  <div class="flex-1 bg-neutral-700 rounded-full h-2">
                    <div :class="[
                      'h-2 rounded-full',
                      pm.probability > 80 ? 'bg-red-500' :
                      pm.probability > 50 ? 'bg-yellow-500' : 'bg-green-500'
                    ]" :style="`width: ${pm.probability}%`"></div>
                  </div>
                  <span class="text-xs text-neutral-400 ml-2">{{ pm.probability }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Ticketing -->
          <div class="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
              </svg>
              Ticketing
            </h3>
            <div class="space-y-3">
              <div v-for="ticket in ticketAlerts" :key="ticket.id" class="p-3 bg-neutral-800 rounded-lg">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium">{{ ticket.title }}</span>
                  <span :class="[
                    'text-xs px-2 py-1 rounded',
                    ticket.priority === 'high' ? 'bg-red-600' :
                    ticket.priority === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                  ]">{{ ticket.priority }}</span>
                </div>
                <p class="text-xs text-neutral-400 mt-1">{{ ticket.description }}</p>
                <div class="flex items-center justify-between mt-2">
                  <span class="text-xs text-neutral-500">{{ ticket.assignee }}</span>
                  <span class="text-xs text-neutral-500">SLA: {{ ticket.sla }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Notification Preferences -->
      <div v-show="activeTab === 'preferences'" class="space-y-6">
        <div class="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
          <h2 class="text-xl font-semibold mb-6 flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
            </svg>
            Notification Preferences
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- User-Level Settings -->
            <div>
              <h3 class="text-lg font-medium mb-4">User-Level Settings</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-2">Notification Types</label>
                  <div class="space-y-2">
                    <label class="flex items-center">
                      <input type="checkbox" v-model="preferences.types.critical" class="mr-2">
                      <span>Critical Alerts Only</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" v-model="preferences.types.warning" class="mr-2">
                      <span>Warning Alerts</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" v-model="preferences.types.info" class="mr-2">
                      <span>Info Notifications</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-2">Delivery Methods</label>
                  <div class="space-y-2">
                    <label class="flex items-center">
                      <input type="checkbox" v-model="preferences.delivery.email" class="mr-2">
                      <span>Email</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" v-model="preferences.delivery.whatsapp" class="mr-2">
                      <span>WhatsApp</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" v-model="preferences.delivery.push" class="mr-2">
                      <span>Push Notification</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" v-model="preferences.delivery.sms" class="mr-2">
                      <span>SMS</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Priority Settings -->
            <div>
              <h3 class="text-lg font-medium mb-4">Priority Settings</h3>
              <div class="space-y-4">
                <div class="p-4 bg-red-900/20 border border-red-800 rounded-lg">
                  <h4 class="font-medium text-red-400 mb-2">Critical</h4>
                  <p class="text-sm text-neutral-400 mb-3">Popup + Email immediately</p>
                  <div class="space-y-2">
                    <label class="flex items-center">
                      <input type="checkbox" v-model="preferences.priority.critical.popup" class="mr-2">
                      <span class="text-sm">Show Popup</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" v-model="preferences.priority.critical.email" class="mr-2">
                      <span class="text-sm">Send Email</span>
                    </label>
                  </div>
                </div>

                <div class="p-4 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <h4 class="font-medium text-yellow-400 mb-2">Warning</h4>
                  <p class="text-sm text-neutral-400 mb-3">Standard notification</p>
                  <div class="space-y-2">
                    <label class="flex items-center">
                      <input type="checkbox" v-model="preferences.priority.warning.notification" class="mr-2">
                      <span class="text-sm">Show Notification</span>
                    </label>
                  </div>
                </div>

                <div class="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <h4 class="font-medium text-blue-400 mb-2">Info</h4>
                  <p class="text-sm text-neutral-400 mb-3">Notification center only</p>
                  <div class="space-y-2">
                    <label class="flex items-center">
                      <input type="checkbox" v-model="preferences.priority.info.center" class="mr-2">
                      <span class="text-sm">Add to Center</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Working Hours -->
          <div class="mt-8">
            <h3 class="text-lg font-medium mb-4">Working Hours</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Schedule</label>
                <select v-model="preferences.schedule" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2">
                  <option value="24x7">24x7</option>
                  <option value="work_hours">Work Hours Only</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Start Time</label>
                <input 
                  v-model="preferences.workHours.start" 
                  type="time" 
                  class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2"
                >
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">End Time</label>
                <input 
                  v-model="preferences.workHours.end" 
                  type="time" 
                  class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2"
                >
              </div>
            </div>
          </div>

          <div class="mt-6">
            <button @click="savePreferences" class="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      <!-- 4. Escalation & Workflow -->
      <div v-show="activeTab === 'escalation'" class="space-y-6">
        <div class="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
          <h2 class="text-xl font-semibold mb-6 flex items-center">
            <svg class="w-5 h-5 mr-2 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
            </svg>
            Escalation & Workflow
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Escalation Rules -->
            <div>
              <h3 class="text-lg font-medium mb-4">Escalation Rules</h3>
              <div class="space-y-4">
                <div v-for="rule in escalationRules" :key="rule.id" class="p-4 bg-neutral-800 rounded-lg">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium">{{ rule.name }}</span>
                    <button @click="editRule(rule)" class="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                  </div>
                  <p class="text-sm text-neutral-400 mb-2">{{ rule.description }}</p>
                  <div class="flex items-center space-x-4 text-xs text-neutral-500">
                    <span>Timeout: {{ rule.timeout }} min</span>
                    <span>Escalate to: {{ rule.escalateTo }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Active Escalations -->
            <div>
              <h3 class="text-lg font-medium mb-4">Active Escalations</h3>
              <div class="space-y-4">
                <div v-for="escalation in activeEscalations" :key="escalation.id" class="p-4 bg-neutral-800 rounded-lg">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium">{{ escalation.notification }}</span>
                    <span :class="[
                      'text-xs px-2 py-1 rounded',
                      escalation.level === 1 ? 'bg-yellow-600' :
                      escalation.level === 2 ? 'bg-orange-600' : 'bg-red-600'
                    ]">Level {{ escalation.level }}</span>
                  </div>
                  <p class="text-sm text-neutral-400 mb-2">{{ escalation.description }}</p>
                  <div class="flex items-center justify-between text-xs text-neutral-500">
                    <span>Started: {{ escalation.startTime }}</span>
                    <span>Next: {{ escalation.nextEscalation }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. Notification Reporting -->
      <div v-show="activeTab === 'reporting'" class="space-y-6">
        <div class="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
          <h2 class="text-xl font-semibold mb-6 flex items-center">
            <svg class="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
            </svg>
            Notification Reporting
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <!-- Statistics Cards -->
            <div class="bg-neutral-800 rounded-lg p-6">
              <h3 class="text-lg font-medium mb-4">This Month</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-neutral-400">Total Notifications</span>
                  <span class="font-bold">{{ reportStats.total }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Critical</span>
                  <span class="font-bold text-red-400">{{ reportStats.critical }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Warning</span>
                  <span class="font-bold text-yellow-400">{{ reportStats.warning }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Info</span>
                  <span class="font-bold text-blue-400">{{ reportStats.info }}</span>
                </div>
              </div>
            </div>

            <div class="bg-neutral-800 rounded-lg p-6">
              <h3 class="text-lg font-medium mb-4">Response Time</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-neutral-400">Avg. Acknowledge</span>
                  <span class="font-bold">{{ reportStats.avgAckTime }} min</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Fastest</span>
                  <span class="font-bold text-green-400">{{ reportStats.fastestAck }} min</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Slowest</span>
                  <span class="font-bold text-red-400">{{ reportStats.slowestAck }} min</span>
                </div>
              </div>
            </div>

            <div class="bg-neutral-800 rounded-lg p-6">
              <h3 class="text-lg font-medium mb-4">Ignored Notifications</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-neutral-400">Total Ignored</span>
                  <span class="font-bold text-orange-400">{{ reportStats.ignored }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">Most Ignored Type</span>
                  <span class="font-bold">{{ reportStats.mostIgnored }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Charts would go here -->
          <div class="bg-neutral-800 rounded-lg p-6">
            <h3 class="text-lg font-medium mb-4">Notification Trends</h3>
            <div class="h-64 flex items-center justify-center text-neutral-400">
              <p>Chart visualization would be implemented here</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 6. UI/UX Features -->
      <div v-show="activeTab === 'settings'" class="space-y-6">
        <div class="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
          <h2 class="text-xl font-semibold mb-6 flex items-center">
            <svg class="w-5 h-5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clip-rule="evenodd"/>
            </svg>
            UI/UX Settings
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Display Settings -->
            <div>
              <h3 class="text-lg font-medium mb-4">Display Settings</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-2">Color Coding</label>
                  <div class="space-y-2">
                    <div class="flex items-center space-x-3">
                      <div class="w-4 h-4 bg-red-500 rounded"></div>
                      <span>Critical (Red)</span>
                    </div>
                    <div class="flex items-center space-x-3">
                      <div class="w-4 h-4 bg-yellow-500 rounded"></div>
                      <span>Warning (Yellow)</span>
                    </div>
                    <div class="flex items-center space-x-3">
                      <div class="w-4 h-4 bg-blue-500 rounded"></div>
                      <span>Info (Blue)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-2">Notification Sound</label>
                  <select v-model="uiSettings.sound" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2">
                    <option value="default">Default</option>
                    <option value="chime">Chime</option>
                    <option value="bell">Bell</option>
                    <option value="none">None</option>
                  </select>
                </div>

                <div>
                  <label class="flex items-center">
                    <input type="checkbox" v-model="uiSettings.showBadge" class="mr-2">
                    <span>Show notification badge on bell icon</span>
                  </label>
                </div>

                <div>
                  <label class="flex items-center">
                    <input type="checkbox" v-model="uiSettings.showToast" class="mr-2">
                    <span>Show toast popup for new notifications</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Behavior Settings -->
            <div>
              <h3 class="text-lg font-medium mb-4">Behavior Settings</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-2">Auto-refresh interval</label>
                  <select v-model="uiSettings.refreshInterval" class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2">
                    <option value="5">5 seconds</option>
                    <option value="10">10 seconds</option>
                    <option value="30">30 seconds</option>
                    <option value="60">1 minute</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-2">Max notifications to show</label>
                  <input 
                    v-model="uiSettings.maxNotifications" 
                    type="number" 
                    min="10" 
                    max="100" 
                    class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2"
                  >
                </div>

                <div>
                  <label class="flex items-center">
                    <input type="checkbox" v-model="uiSettings.autoArchive" class="mr-2">
                    <span>Auto-archive read notifications after 7 days</span>
                  </label>
                </div>

                <div>
                  <label class="flex items-center">
                    <input type="checkbox" v-model="uiSettings.groupSimilar" class="mr-2">
                    <span>Group similar notifications</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <button @click="saveUISettings" class="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">
              Save UI Settings
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div 
      v-if="showToast" 
      class="fixed top-4 right-4 bg-neutral-800 border border-neutral-700 rounded-lg p-4 shadow-lg z-50"
    >
      <div class="flex items-center space-x-3">
        <div :class="[
          'w-3 h-3 rounded-full',
          toastNotification.priority === 'critical' ? 'bg-red-500' :
          toastNotification.priority === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
        ]"></div>
        <div>
          <p class="font-medium">{{ toastNotification.message }}</p>
          <p class="text-sm text-neutral-400">{{ toastNotification.time }}</p>
        </div>
        <button @click="showToast = false" class="text-neutral-400 hover:text-white">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

// Interfaces
interface Notification {
  id: string
  time: string
  message: string
  description: string
  priority: 'critical' | 'warning' | 'info'
  module: 'telemetry' | 'maintenance' | 'ticketing' | 'system'
  status: 'read' | 'unread'
  acknowledged: boolean
  archived: boolean
  createdAt: Date
  acknowledgedAt?: Date
}

interface TelemetryAlert {
  id: string
  parameter: string
  status: 'critical' | 'warning' | 'normal'
  description: string
  location: string
}

interface PredictiveAlert {
  id: string
  asset: string
  component: string
  rul: number
  probability: number
}

interface TicketAlert {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  assignee: string
  sla: string
}

interface EscalationRule {
  id: string
  name: string
  description: string
  timeout: number
  escalateTo: string
}

interface ActiveEscalation {
  id: string
  notification: string
  description: string
  level: number
  startTime: string
  nextEscalation: string
}

// Reactive data
const activeTab = ref('inbox')
const searchQuery = ref('')
const priorityFilter = ref('')
const moduleFilter = ref('')
const selectedNotifications = ref<string[]>([])
const showToast = ref(false)

const tabs = [
  { id: 'inbox', name: '🔔 Notification Center' },
  { id: 'types', name: '⚙️ Notification Types' },
  { id: 'preferences', name: '🎛 Preferences' },
  { id: 'escalation', name: '🕒 Escalation & Workflow' },
  { id: 'reporting', name: '📊 Reporting' },
  { id: 'settings', name: '🖥 UI/UX Settings' }
]

// Sample notifications data
const notifications = ref<Notification[]>([
  {
    id: 'N-001',
    time: '2024-01-15 08:15:30',
    message: 'Critical Temperature Alert',
    description: 'Temperature exceeded 85°C on Line 3 - Machine A',
    priority: 'critical',
    module: 'telemetry',
    status: 'unread',
    acknowledged: false,
    archived: false,
    createdAt: new Date('2024-01-15T08:15:30')
  },
  {
    id: 'N-002',
    time: '2024-01-15 08:12:15',
    message: 'Predictive Maintenance Alert',
    description: 'Bearing replacement recommended for Pump B within 5 days',
    priority: 'warning',
    module: 'maintenance',
    status: 'unread',
    acknowledged: false,
    archived: false,
    createdAt: new Date('2024-01-15T08:12:15')
  },
  {
    id: 'N-003',
    time: '2024-01-15 08:10:45',
    message: 'New Ticket Created',
    description: 'Ticket #TK-2024-001 - Vibration sensor calibration required',
    priority: 'info',
    module: 'ticketing',
    status: 'read',
    acknowledged: true,
    archived: false,
    createdAt: new Date('2024-01-15T08:10:45'),
    acknowledgedAt: new Date('2024-01-15T08:25:30')
  },
  {
    id: 'N-004',
    time: '2024-01-15 07:45:20',
    message: 'System Configuration Update',
    description: 'User role permissions updated for maintenance team',
    priority: 'info',
    module: 'system',
    status: 'read',
    acknowledged: true,
    archived: false,
    createdAt: new Date('2024-01-15T07:45:20'),
    acknowledgedAt: new Date('2024-01-15T07:50:15')
  },
  {
    id: 'N-005',
    time: '2024-01-15 07:30:10',
    message: 'Vibration Warning',
    description: 'Abnormal vibration detected on Motor C - Level 2.5mm/s',
    priority: 'warning',
    module: 'telemetry',
    status: 'unread',
    acknowledged: false,
    archived: false,
    createdAt: new Date('2024-01-15T07:30:10')
  }
])

// Telemetry alerts data
const telemetryAlerts = ref<TelemetryAlert[]>([
  {
    id: 'TA-001',
    parameter: 'Temperature',
    status: 'critical',
    description: 'Exceeded 85°C threshold',
    location: 'Line 3 - Machine A'
  },
  {
    id: 'TA-002',
    parameter: 'Vibration',
    status: 'warning',
    description: 'Level 2.5mm/s detected',
    location: 'Motor C'
  },
  {
    id: 'TA-003',
    parameter: 'Current',
    status: 'normal',
    description: 'Within normal range',
    location: 'Pump B'
  }
])

// Predictive maintenance alerts
const predictiveAlerts = ref<PredictiveAlert[]>([
  {
    id: 'PA-001',
    asset: 'Pump B',
    component: 'Bearing',
    rul: 5,
    probability: 85
  },
  {
    id: 'PA-002',
    asset: 'Motor C',
    component: 'Coupling',
    rul: 12,
    probability: 65
  },
  {
    id: 'PA-003',
    asset: 'Compressor A',
    component: 'Filter',
    rul: 3,
    probability: 92
  }
])

// Ticket alerts
const ticketAlerts = ref<TicketAlert[]>([
  {
    id: 'TK-001',
    title: 'Vibration Sensor Calibration',
    description: 'Sensor requires recalibration',
    priority: 'high',
    assignee: 'John Doe',
    sla: '2 hours'
  },
  {
    id: 'TK-002',
    title: 'Routine Maintenance',
    description: 'Scheduled PM for Line 2',
    priority: 'medium',
    assignee: 'Jane Smith',
    sla: '1 day'
  }
])

// Escalation rules
const escalationRules = ref<EscalationRule[]>([
  {
    id: 'ER-001',
    name: 'Critical Alert Escalation',
    description: 'Escalate critical alerts if not acknowledged within 15 minutes',
    timeout: 15,
    escalateTo: 'Supervisor'
  },
  {
    id: 'ER-002',
    name: 'Maintenance Alert Escalation',
    description: 'Escalate maintenance alerts if not acknowledged within 30 minutes',
    timeout: 30,
    escalateTo: 'Maintenance Manager'
  }
])

// Active escalations
const activeEscalations = ref<ActiveEscalation[]>([
  {
    id: 'AE-001',
    notification: 'Critical Temperature Alert',
    description: 'No response for 20 minutes',
    level: 2,
    startTime: '08:15:30',
    nextEscalation: '08:45:30'
  }
])

// Preferences
const preferences = reactive({
  types: {
    critical: true,
    warning: true,
    info: false
  },
  delivery: {
    email: true,
    whatsapp: false,
    push: true,
    sms: false
  },
  priority: {
    critical: {
      popup: true,
      email: true
    },
    warning: {
      notification: true
    },
    info: {
      center: true
    }
  },
  schedule: '24x7',
  workHours: {
    start: '08:00',
    end: '17:00'
  }
})

// UI Settings
const uiSettings = reactive({
  sound: 'default',
  showBadge: true,
  showToast: true,
  refreshInterval: 10,
  maxNotifications: 50,
  autoArchive: true,
  groupSimilar: false
})

// Report statistics
const reportStats = reactive({
  total: 1247,
  critical: 89,
  warning: 324,
  info: 834,
  avgAckTime: 12.5,
  fastestAck: 2.1,
  slowestAck: 45.8,
  ignored: 23,
  mostIgnored: 'Info Notifications'
})

// Toast notification
const toastNotification = reactive({
  message: 'New critical alert received',
  time: '08:15:30',
  priority: 'critical' as 'critical' | 'warning' | 'info'
})

// Computed properties
const filteredNotifications = computed(() => {
  let filtered = notifications.value.filter(n => !n.archived)
  
  if (searchQuery.value) {
    filtered = filtered.filter(n => 
      n.message.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (priorityFilter.value) {
    filtered = filtered.filter(n => n.priority === priorityFilter.value)
  }
  
  if (moduleFilter.value) {
    filtered = filtered.filter(n => n.module === moduleFilter.value)
  }
  
  return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
})

const unreadCount = computed(() => 
  notifications.value.filter(n => n.status === 'unread' && !n.archived).length
)

const criticalCount = computed(() => 
  notifications.value.filter(n => n.priority === 'critical' && !n.archived).length
)

const warningCount = computed(() => 
  notifications.value.filter(n => n.priority === 'warning' && !n.archived).length
)

const infoCount = computed(() => 
  notifications.value.filter(n => n.priority === 'info' && !n.archived).length
)

// Methods
const getPriorityClass = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'border-l-4 border-red-500'
    case 'warning':
      return 'border-l-4 border-yellow-500'
    case 'info':
      return 'border-l-4 border-blue-500'
    default:
      return ''
  }
}

const openNotification = (notification: Notification) => {
  if (notification.status === 'unread') {
    notification.status = 'read'
  }
  // Navigate to related page based on module
  console.log('Opening notification:', notification)
}

const acknowledgeNotification = (id: string) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.acknowledged = true
    notification.acknowledgedAt = new Date()
    notification.status = 'read'
  }
}

const archiveNotification = (id: string) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.archived = true
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(n => {
    if (!n.archived) {
      n.status = 'read'
    }
  })
}

const deleteSelected = () => {
  selectedNotifications.value.forEach(id => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  })
  selectedNotifications.value = []
}

const savePreferences = () => {
  console.log('Saving preferences:', preferences)
  // Implementation for saving preferences
}

const saveUISettings = () => {
  console.log('Saving UI settings:', uiSettings)
  // Implementation for saving UI settings
}

const editRule = (rule: EscalationRule) => {
  console.log('Editing rule:', rule)
  // Implementation for editing escalation rules
}

// Simulate real-time notifications
const simulateRealTimeNotification = () => {
  const newNotification: Notification = {
    id: `N-${Date.now()}`,
    time: new Date().toLocaleString(),
    message: 'New Alert Received',
    description: 'Simulated real-time notification',
    priority: Math.random() > 0.7 ? 'critical' : Math.random() > 0.4 ? 'warning' : 'info',
    module: ['telemetry', 'maintenance', 'ticketing', 'system'][Math.floor(Math.random() * 4)] as any,
    status: 'unread',
    acknowledged: false,
    archived: false,
    createdAt: new Date()
  }
  
  notifications.value.unshift(newNotification)
  
  if (uiSettings.showToast) {
    toastNotification.message = newNotification.message
    toastNotification.time = newNotification.time
    toastNotification.priority = newNotification.priority
    showToast.value = true
    
    setTimeout(() => {
      showToast.value = false
    }, 5000)
  }
}

// Initialize
onMounted(() => {
  // Simulate real-time notifications every 30 seconds
  setInterval(simulateRealTimeNotification, 30000)
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

/* Animation for toast */
.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>


