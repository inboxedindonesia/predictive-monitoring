<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-white mb-2">🎫 Ticket Management System</h1>
      <p class="text-slate-300">Comprehensive ticket tracking and maintenance management</p>
    </div>

    <!-- Quick Stats Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm">Total Tickets</p>
            <p class="text-3xl font-bold">{{ totalTickets }}</p>
          </div>
          <div class="text-4xl opacity-80">🎫</div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-orange-100 text-sm">Open Tickets</p>
            <p class="text-3xl font-bold">{{ openTickets }}</p>
          </div>
          <div class="text-4xl opacity-80">🔓</div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-yellow-100 text-sm">Overdue</p>
            <p class="text-3xl font-bold">{{ overdueTickets }}</p>
          </div>
          <div class="text-4xl opacity-80">⏰</div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm">SLA Compliance</p>
            <p class="text-3xl font-bold">{{ slaCompliance }}%</p>
          </div>
          <div class="text-4xl opacity-80">✅</div>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="bg-white/10 backdrop-blur-md rounded-xl p-1 mb-8">
      <div class="flex flex-wrap gap-1">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-6 py-3 rounded-lg font-medium transition-all duration-200',
            activeTab === tab.id
              ? 'bg-white text-slate-900 shadow-lg'
              : 'text-white hover:bg-white/20'
          ]"
        >
          {{ tab.icon }} {{ tab.name }}
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="bg-white/10 backdrop-blur-md rounded-xl p-6">
      <!-- 1. Ticket Overview & Status -->
      <div v-if="activeTab === 'overview'" class="space-y-6">
        <div class="flex flex-col lg:flex-row gap-4 mb-6">
          <!-- Search -->
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="🔍 Search tickets..."
              class="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70"
            />
          </div>
          
          <!-- Filters -->
          <div class="flex flex-wrap gap-2">
            <select v-model="filterStatus" class="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white">
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <select v-model="filterType" class="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white">
              <option value="">All Types</option>
              <option value="incident">Incident</option>
              <option value="maintenance">Maintenance</option>
              <option value="request">Request</option>
              <option value="improvement">Improvement</option>
            </select>
            <select v-model="filterPriority" class="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white">
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          
          <!-- Create New Ticket Button -->
          <button
            @click="showCreateModal = true"
            class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap"
          >
            ➕ Create Ticket
          </button>
        </div>

        <!-- Tickets Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-white">
            <thead>
              <tr class="border-b border-white/20">
                <th class="text-left py-4 px-2">Ticket ID</th>
                <th class="text-left py-4 px-2">Title</th>
                <th class="text-left py-4 px-2">Type</th>
                <th class="text-left py-4 px-2">Priority</th>
                <th class="text-left py-4 px-2">Status</th>
                <th class="text-left py-4 px-2">Assigned To</th>
                <th class="text-left py-4 px-2">SLA Due</th>
                <th class="text-left py-4 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="ticket in filteredTickets"
                :key="ticket.id"
                class="border-b border-white/10 hover:bg-white/5 transition-colors"
              >
                <td class="py-4 px-2 font-mono">{{ ticket.id }}</td>
                <td class="py-4 px-2">
                  <div class="font-medium">{{ ticket.title }}</div>
                  <div class="text-sm text-white/70">{{ ticket.description.substring(0, 50) }}...</div>
                </td>
                <td class="py-4 px-2">
                  <span :class="getTypeColor(ticket.type)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ ticket.type }}
                  </span>
                </td>
                <td class="py-4 px-2">
                  <span :class="getPriorityColor(ticket.priority)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ ticket.priority }}
                  </span>
                </td>
                <td class="py-4 px-2">
                  <span :class="getStatusColor(ticket.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ ticket.status.replace('_', ' ') }}
                  </span>
                </td>
                <td class="py-4 px-2">{{ ticket.assignedTo }}</td>
                <td class="py-4 px-2">
                  <div :class="getSLAColor(ticket.slaDue)" class="text-sm">
                    {{ formatDate(ticket.slaDue) }}
                  </div>
                </td>
                <td class="py-4 px-2">
                  <div class="flex gap-2">
                    <button
                      @click="viewTicket(ticket)"
                      class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      View
                    </button>
                    <button
                      @click="editTicket(ticket)"
                      class="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Trend Chart -->
        <div class="mt-8 bg-white/5 rounded-xl p-6">
          <h3 class="text-xl font-semibold text-white mb-4">📊 Ticket Trends (Last 7 Days)</h3>
          <div class="flex items-end gap-2 h-32">
            <div
              v-for="(day, index) in ticketTrends"
              :key="index"
              class="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
              :style="{ height: (day.count / Math.max(...ticketTrends.map(d => d.count)) * 100) + '%' }"
              :title="`${day.date}: ${day.count} tickets`"
            ></div>
          </div>
          <div class="flex justify-between mt-2 text-sm text-white/70">
            <span v-for="day in ticketTrends" :key="day.date">{{ day.date }}</span>
          </div>
        </div>
      </div>

      <!-- 2. Ticket Details -->
      <div v-if="activeTab === 'details'" class="space-y-6">
        <div v-if="selectedTicket" class="bg-white/5 rounded-xl p-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h3 class="text-2xl font-bold text-white">{{ selectedTicket.title }}</h3>
              <div class="space-y-2">
                <p class="text-white/70"><strong>Ticket ID:</strong> {{ selectedTicket.id }}</p>
                <p class="text-white/70"><strong>Description:</strong> {{ selectedTicket.description }}</p>
                <p class="text-white/70"><strong>Category:</strong> {{ selectedTicket.type }}</p>
                <p class="text-white/70"><strong>Priority:</strong> 
                  <span :class="getPriorityColor(selectedTicket.priority)" class="px-2 py-1 rounded-full text-xs font-medium ml-2">
                    {{ selectedTicket.priority }}
                  </span>
                </p>
                <p class="text-white/70"><strong>Impact:</strong> {{ selectedTicket.impact }}</p>
                <p class="text-white/70"><strong>Urgency:</strong> {{ selectedTicket.urgency }}</p>
              </div>
            </div>
            <div class="space-y-4">
              <div class="space-y-2">
                <p class="text-white/70"><strong>Linked Asset:</strong> {{ selectedTicket.linkedAsset }}</p>
                <p class="text-white/70"><strong>Reporter:</strong> {{ selectedTicket.reporter }}</p>
                <p class="text-white/70"><strong>Assigned To:</strong> {{ selectedTicket.assignedTo }}</p>
                <p class="text-white/70"><strong>Status:</strong> 
                  <span :class="getStatusColor(selectedTicket.status)" class="px-2 py-1 rounded-full text-xs font-medium ml-2">
                    {{ selectedTicket.status.replace('_', ' ') }}
                  </span>
                </p>
                <p class="text-white/70"><strong>Created:</strong> {{ formatDate(selectedTicket.createdAt) }}</p>
                <p class="text-white/70"><strong>SLA Due:</strong> 
                  <span :class="getSLAColor(selectedTicket.slaDue)">{{ formatDate(selectedTicket.slaDue) }}</span>
                </p>
              </div>
              
              <!-- SLA Timer -->
              <div class="bg-white/10 rounded-lg p-4">
                <h4 class="font-semibold text-white mb-2">⏱️ SLA Timer</h4>
                <div class="text-2xl font-mono text-white">{{ getSLATimeRemaining(selectedTicket.slaDue) }}</div>
                <div class="w-full bg-white/20 rounded-full h-2 mt-2">
                  <div 
                    class="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full transition-all duration-300"
                    :style="{ width: getSLAProgress(selectedTicket.slaDue) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Progress Timeline -->
          <div class="mt-6">
            <h4 class="font-semibold text-white mb-4">📋 Progress Timeline</h4>
            <div class="space-y-3">
              <div
                v-for="log in selectedTicket.progressLogs"
                :key="log.id"
                class="flex items-start gap-3 bg-white/5 rounded-lg p-3"
              >
                <div class="w-3 h-3 bg-blue-500 rounded-full mt-1"></div>
                <div class="flex-1">
                  <div class="text-white font-medium">{{ log.action }}</div>
                  <div class="text-white/70 text-sm">{{ log.comment }}</div>
                  <div class="text-white/50 text-xs">{{ formatDate(log.timestamp) }} - {{ log.user }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-white/70 py-12">
          Select a ticket from the overview to view details
        </div>
      </div>

      <!-- 3. Ticket Actions -->
      <div v-if="activeTab === 'actions'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            @click="showCreateModal = true"
            class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white p-6 rounded-xl font-medium transition-all duration-200"
          >
            <div class="text-3xl mb-2">➕</div>
            <div>Create New Ticket</div>
          </button>
          <button
            @click="showAssignModal = true"
            class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-6 rounded-xl font-medium transition-all duration-200"
          >
            <div class="text-3xl mb-2">👤</div>
            <div>Assign Ticket</div>
          </button>
          <button
            @click="escalateTicket"
            class="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white p-6 rounded-xl font-medium transition-all duration-200"
          >
            <div class="text-3xl mb-2">⚠️</div>
            <div>Escalate Ticket</div>
          </button>
          <button
            @click="showUpdateModal = true"
            class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-6 rounded-xl font-medium transition-all duration-200"
          >
            <div class="text-3xl mb-2">📝</div>
            <div>Update Progress</div>
          </button>
        </div>

        <!-- Auto-Generated Tickets -->
        <div class="bg-white/5 rounded-xl p-6">
          <h3 class="text-xl font-semibold text-white mb-4">🤖 Auto-Generated Tickets</h3>
          <div class="space-y-3">
            <div
              v-for="autoTicket in autoGeneratedTickets"
              :key="autoTicket.id"
              class="flex items-center justify-between bg-white/10 rounded-lg p-4"
            >
              <div>
                <div class="text-white font-medium">{{ autoTicket.title }}</div>
                <div class="text-white/70 text-sm">{{ autoTicket.source }} - {{ formatDate(autoTicket.createdAt) }}</div>
              </div>
              <button
                @click="approveAutoTicket(autoTicket)"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Attachments & Evidence -->
      <div v-if="activeTab === 'attachments'" class="space-y-6">
        <div class="bg-white/5 rounded-xl p-6">
          <h3 class="text-xl font-semibold text-white mb-4">📎 Upload Evidence</h3>
          <div class="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
            <div class="text-4xl mb-4">📁</div>
            <p class="text-white/70 mb-4">Drag and drop files here or click to browse</p>
            <input type="file" multiple class="hidden" id="fileUpload" />
            <label for="fileUpload" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors">
              Choose Files
            </label>
          </div>
        </div>

        <!-- Attachments List -->
        <div class="bg-white/5 rounded-xl p-6">
          <h3 class="text-xl font-semibold text-white mb-4">📋 Attachments</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="attachment in attachments"
              :key="attachment.id"
              class="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors"
            >
              <div class="flex items-center gap-3">
                <div class="text-2xl">{{ getFileIcon(attachment.type) }}</div>
                <div class="flex-1">
                  <div class="text-white font-medium">{{ attachment.name }}</div>
                  <div class="text-white/70 text-sm">{{ attachment.size }} - {{ formatDate(attachment.uploadedAt) }}</div>
                </div>
                <button class="text-blue-400 hover:text-blue-300">📥</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Repair Checklist -->
        <div class="bg-white/5 rounded-xl p-6">
          <h3 class="text-xl font-semibold text-white mb-4">✅ Repair Checklist</h3>
          <div class="space-y-2">
            <div
              v-for="item in repairChecklist"
              :key="item.id"
              class="flex items-center gap-3 bg-white/10 rounded-lg p-3"
            >
              <input
                type="checkbox"
                v-model="item.completed"
                class="w-5 h-5 text-green-600 bg-white/20 border-white/30 rounded"
              />
              <span :class="item.completed ? 'text-white/70 line-through' : 'text-white'">{{ item.task }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. SLA & Notifications -->
      <div v-if="activeTab === 'sla'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
            <h3 class="font-semibold mb-2">✅ On Time</h3>
            <div class="text-3xl font-bold">{{ slaStats.onTime }}</div>
            <div class="text-sm opacity-80">{{ slaStats.onTimePercentage }}%</div>
          </div>
          <div class="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-6 text-white">
            <h3 class="font-semibold mb-2">⚠️ At Risk</h3>
            <div class="text-3xl font-bold">{{ slaStats.atRisk }}</div>
            <div class="text-sm opacity-80">{{ slaStats.atRiskPercentage }}%</div>
          </div>
          <div class="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl p-6 text-white">
            <h3 class="font-semibold mb-2">🚨 Overdue</h3>
            <div class="text-3xl font-bold">{{ slaStats.overdue }}</div>
            <div class="text-sm opacity-80">{{ slaStats.overduePercentage }}%</div>
          </div>
        </div>

        <!-- SLA Notifications -->
        <div class="bg-white/5 rounded-xl p-6">
          <h3 class="text-xl font-semibold text-white mb-4">🔔 SLA Notifications</h3>
          <div class="space-y-3">
            <div
              v-for="notification in slaNotifications"
              :key="notification.id"
              :class="[
                'flex items-center gap-3 rounded-lg p-4',
                notification.type === 'warning' ? 'bg-yellow-600/20 border border-yellow-600/30' :
                notification.type === 'danger' ? 'bg-red-600/20 border border-red-600/30' :
                'bg-blue-600/20 border border-blue-600/30'
              ]"
            >
              <div class="text-2xl">
                {{ notification.type === 'warning' ? '⚠️' : notification.type === 'danger' ? '🚨' : 'ℹ️' }}
              </div>
              <div class="flex-1">
                <div class="text-white font-medium">{{ notification.title }}</div>
                <div class="text-white/70 text-sm">{{ notification.message }}</div>
                <div class="text-white/50 text-xs">{{ formatDate(notification.timestamp) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 7. Integration -->
      <div v-if="activeTab === 'integration'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white/5 rounded-xl p-6">
            <h3 class="text-xl font-semibold text-white mb-4">🏭 Asset Integration</h3>
            <p class="text-white/70 mb-4">Link tickets to specific assets and machines</p>
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-white/70">Connected Assets</span>
                <span class="text-green-400 font-medium">{{ integrationStats.connectedAssets }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-white/70">Auto-Generated Tickets</span>
                <span class="text-blue-400 font-medium">{{ integrationStats.autoTickets }}</span>
              </div>
            </div>
          </div>
          
          <div class="bg-white/5 rounded-xl p-6">
            <h3 class="text-xl font-semibold text-white mb-4">🔮 Predictive Maintenance</h3>
            <p class="text-white/70 mb-4">Automatic ticket creation from predictive alerts</p>
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-white/70">Predictive Alerts</span>
                <span class="text-yellow-400 font-medium">{{ integrationStats.predictiveAlerts }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-white/70">Prevention Rate</span>
                <span class="text-green-400 font-medium">{{ integrationStats.preventionRate }}%</span>
              </div>
            </div>
          </div>
          
          <div class="bg-white/5 rounded-xl p-6">
            <h3 class="text-xl font-semibold text-white mb-4">📧 Communication</h3>
            <p class="text-white/70 mb-4">Email and chat integration for ticket updates</p>
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-white/70">Email Notifications</span>
                <span class="text-blue-400 font-medium">{{ integrationStats.emailNotifications }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-white/70">Chat Messages</span>
                <span class="text-purple-400 font-medium">{{ integrationStats.chatMessages }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Integration Settings -->
        <div class="bg-white/5 rounded-xl p-6">
          <h3 class="text-xl font-semibold text-white mb-4">⚙️ Integration Settings</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-white">Auto-create tickets from alerts</span>
                <input type="checkbox" checked class="w-5 h-5 text-blue-600 bg-white/20 border-white/30 rounded" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-white">Email notifications</span>
                <input type="checkbox" checked class="w-5 h-5 text-blue-600 bg-white/20 border-white/30 rounded" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-white">SMS alerts for critical tickets</span>
                <input type="checkbox" class="w-5 h-5 text-blue-600 bg-white/20 border-white/30 rounded" />
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-white">Slack integration</span>
                <input type="checkbox" checked class="w-5 h-5 text-blue-600 bg-white/20 border-white/30 rounded" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-white">Teams integration</span>
                <input type="checkbox" class="w-5 h-5 text-blue-600 bg-white/20 border-white/30 rounded" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-white">WhatsApp notifications</span>
                <input type="checkbox" class="w-5 h-5 text-blue-600 bg-white/20 border-white/30 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Ticket Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-slate-800 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h3 class="text-xl font-semibold text-white mb-4">Create New Ticket</h3>
        <form @submit.prevent="createTicket" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-white/70 text-sm mb-2">Title</label>
              <input
                v-model="newTicket.title"
                type="text"
                required
                class="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <div>
              <label class="block text-white/70 text-sm mb-2">Type</label>
              <select
                v-model="newTicket.type"
                class="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white"
              >
                <option value="incident">Incident</option>
                <option value="maintenance">Maintenance</option>
                <option value="request">Request</option>
                <option value="improvement">Improvement</option>
              </select>
            </div>
            <div>
              <label class="block text-white/70 text-sm mb-2">Priority</label>
              <select
                v-model="newTicket.priority"
                class="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label class="block text-white/70 text-sm mb-2">Assigned To</label>
              <select
                v-model="newTicket.assignedTo"
                class="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white"
              >
                <option value="Engineer 1">Engineer 1</option>
                <option value="Engineer 2">Engineer 2</option>
                <option value="Technician A">Technician A</option>
                <option value="Technician B">Technician B</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-white/70 text-sm mb-2">Description</label>
            <textarea
              v-model="newTicket.description"
              rows="4"
              class="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white"
            ></textarea>
          </div>
          <div class="flex gap-4">
            <button
              type="submit"
              class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Create Ticket
            </button>
            <button
              type="button"
              @click="showCreateModal = false"
              class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'

// Types
type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'
type TicketType = 'incident' | 'maintenance' | 'request' | 'improvement'
type Priority = 'low' | 'medium' | 'high' | 'critical'

interface Ticket {
  id: string
  title: string
  description: string
  type: TicketType
  priority: Priority
  status: TicketStatus
  assignedTo: string
  reporter: string
  linkedAsset: string
  impact: string
  urgency: string
  createdAt: string
  slaDue: string
  progressLogs: ProgressLog[]
}

interface ProgressLog {
  id: string
  action: string
  comment: string
  timestamp: string
  user: string
}

// Reactive data
const activeTab = ref('overview')
const searchQuery = ref('')
const filterStatus = ref('')
const filterType = ref('')
const filterPriority = ref('')
const showCreateModal = ref(false)
const showAssignModal = ref(false)
const showUpdateModal = ref(false)
const selectedTicket = ref<Ticket | null>(null)

// Sample data
const tickets = ref<Ticket[]>([
  {
    id: 'TKT-2025-001',
    title: 'Vibration tinggi pada Compressor Unit A',
    description: 'Terdeteksi getaran abnormal pada compressor unit A dengan amplitude 15mm/s, melebihi threshold normal 8mm/s. Perlu inspeksi segera untuk mencegah kerusakan bearing.',
    type: 'incident',
    priority: 'high',
    status: 'open',
    assignedTo: 'Engineer Budi',
    reporter: 'Operator Shift 1',
    linkedAsset: 'COMP-A-001',
    impact: 'High',
    urgency: 'High',
    createdAt: '2025-01-15T08:30:00',
    slaDue: '2025-01-16T16:00:00',
    progressLogs: [
      {
        id: 'log1',
        action: 'Ticket Created',
        comment: 'Automatic ticket generated from vibration sensor alert',
        timestamp: '2025-01-15T08:30:00',
        user: 'System'
      }
    ]
  },
  {
    id: 'TKT-2025-002',
    title: 'Scheduled maintenance Pump B',
    description: 'Maintenance rutin bulanan untuk hydraulic pump B sesuai jadwal preventive maintenance. Termasuk penggantian oli, filter, dan inspeksi seal.',
    type: 'maintenance',
    priority: 'medium',
    status: 'in_progress',
    assignedTo: 'Technician Andi',
    reporter: 'Maintenance Planner',
    linkedAsset: 'PUMP-B-002',
    impact: 'Medium',
    urgency: 'Low',
    createdAt: '2025-01-14T10:00:00',
    slaDue: '2025-01-17T17:00:00',
    progressLogs: [
      {
        id: 'log2',
        action: 'Work Started',
        comment: 'Technician arrived on site and started maintenance work',
        timestamp: '2025-01-15T09:00:00',
        user: 'Technician Andi'
      }
    ]
  },
  {
    id: 'TKT-2025-003',
    title: 'Temperature sensor malfunction Motor C',
    description: 'Temperature sensor pada motor conveyor C memberikan reading yang tidak konsisten. Nilai berfluktuasi antara 25-85°C dalam waktu singkat.',
    type: 'incident',
    priority: 'medium',
    status: 'resolved',
    assignedTo: 'Engineer Sari',
    reporter: 'Control Room Operator',
    linkedAsset: 'MOTOR-C-003',
    impact: 'Medium',
    urgency: 'Medium',
    createdAt: '2025-01-13T14:20:00',
    slaDue: '2025-01-15T14:20:00',
    progressLogs: [
      {
        id: 'log3',
        action: 'Sensor Replaced',
        comment: 'Replaced faulty temperature sensor with new calibrated unit',
        timestamp: '2025-01-14T11:30:00',
        user: 'Engineer Sari'
      }
    ]
  },
  {
    id: 'TKT-2025-004',
    title: 'Request upgrade PLC software',
    description: 'Request untuk upgrade software PLC pada packaging line untuk mendukung fitur predictive maintenance yang baru.',
    type: 'request',
    priority: 'low',
    status: 'open',
    assignedTo: 'IT Support',
    reporter: 'Production Manager',
    linkedAsset: 'PLC-PKG-001',
    impact: 'Low',
    urgency: 'Low',
    createdAt: '2025-01-12T16:45:00',
    slaDue: '2025-01-19T17:00:00',
    progressLogs: []
  }
])

const newTicket = reactive<Partial<Ticket>>({
  title: '',
  description: '',
  type: 'incident',
  priority: 'medium',
  assignedTo: 'Engineer 1'
})

// Tabs configuration
const tabs = [
  { id: 'overview', name: 'Overview & Status', icon: '🗂️' },
  { id: 'details', name: 'Ticket Details', icon: '🎯' },
  { id: 'actions', name: 'Ticket Actions', icon: '🛠️' },
  { id: 'attachments', name: 'Attachments', icon: '📎' },
  { id: 'sla', name: 'SLA & Notifications', icon: '⏱️' },
  { id: 'integration', name: 'Integration', icon: '🔗' }
]

// Sample data for other sections
const ticketTrends = ref([
  { date: '24', count: 12 },
  { date: '25', count: 8 },
  { date: '26', count: 15 },
  { date: '27', count: 6 },
  { date: '28', count: 11 },
  { date: '29', count: 9 },
  { date: '30', count: 14 }
])

const autoGeneratedTickets = ref([
  {
    id: 'AUTO-001',
    title: 'High vibration detected on Motor D',
    source: 'Predictive Maintenance Alert',
    createdAt: '2025-01-15T10:30:00'
  },
  {
    id: 'AUTO-002',
    title: 'Oil temperature exceeding threshold on Gearbox E',
    source: 'Telemetry System',
    createdAt: '2025-01-15T11:15:00'
  }
])

const attachments = ref([
  {
    id: 'att1',
    name: 'inspection_report.pdf',
    type: 'pdf',
    size: '2.4 MB',
    uploadedAt: '2025-01-15T09:30:00'
  },
  {
    id: 'att2',
    name: 'motor_photo.jpg',
    type: 'image',
    size: '1.8 MB',
    uploadedAt: '2025-01-15T10:15:00'
  }
])

const repairChecklist = ref([
  { id: 'check1', task: 'Isolate equipment power supply', completed: true },
  { id: 'check2', task: 'Perform lockout/tagout procedure', completed: true },
  { id: 'check3', task: 'Remove faulty component', completed: false },
  { id: 'check4', task: 'Install replacement part', completed: false },
  { id: 'check5', task: 'Test equipment functionality', completed: false }
])

const slaNotifications = ref([
  {
    id: 'notif1',
    type: 'warning',
    title: 'SLA Warning',
    message: 'Ticket TKT-2025-001 approaching SLA deadline in 2 hours',
    timestamp: '2025-01-15T14:00:00'
  },
  {
    id: 'notif2',
    type: 'danger',
    title: 'SLA Breach',
    message: 'Ticket TKT-2025-005 has exceeded SLA deadline',
    timestamp: '2025-01-15T13:30:00'
  }
])

const analytics = ref({
  mttr: 4.2,
  mtta: 0.8,
  slaCompliance: 87,
  resolutionRate: 92
})

const topIssues = ref([
  { category: 'Vibration Issues', count: 24 },
  { category: 'Temperature Anomalies', count: 18 },
  { category: 'Sensor Malfunctions', count: 15 },
  { category: 'Oil Leaks', count: 12 },
  { category: 'Electrical Faults', count: 8 }
])

const technicianPerformance = ref([
  { name: 'Engineer Budi', assigned: 15, resolved: 13, avgTime: 3.2, performance: 87 },
  { name: 'Technician Andi', assigned: 12, resolved: 11, avgTime: 4.1, performance: 92 },
  { name: 'Engineer Sari', assigned: 18, resolved: 16, avgTime: 2.8, performance: 89 },
  { name: 'Technician Dedi', assigned: 10, resolved: 8, avgTime: 5.2, performance: 80 }
])

const integrationStats = ref({
  connectedAssets: 45,
  autoTickets: 12,
  predictiveAlerts: 8,
  preventionRate: 78,
  emailNotifications: 156,
  chatMessages: 89
})

const slaStats = ref({
  onTime: 23,
  onTimePercentage: 76,
  atRisk: 5,
  atRiskPercentage: 17,
  overdue: 2,
  overduePercentage: 7
})

// Computed properties
const filteredTickets = computed(() => {
  return tickets.value.filter(ticket => {
    const matchesSearch = !searchQuery.value || 
      ticket.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !filterStatus.value || ticket.status === filterStatus.value
    const matchesType = !filterType.value || ticket.type === filterType.value
    const matchesPriority = !filterPriority.value || ticket.priority === filterPriority.value
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })
})

const totalTickets = computed(() => tickets.value.length)
const openTickets = computed(() => tickets.value.filter(t => t.status === 'open').length)
const overdueTickets = computed(() => {
  const now = new Date()
  return tickets.value.filter(t => new Date(t.slaDue) < now && t.status !== 'closed').length
})
const slaCompliance = computed(() => 87) // Mock calculation

// Methods
function getStatusColor(status: TicketStatus) {
  const colors = {
    open: 'bg-red-600/20 text-red-300 border border-red-600/30',
    in_progress: 'bg-yellow-600/20 text-yellow-300 border border-yellow-600/30',
    resolved: 'bg-green-600/20 text-green-300 border border-green-600/30',
    closed: 'bg-gray-600/20 text-gray-300 border border-gray-600/30'
  }
  return colors[status]
}

function getPriorityColor(priority: Priority) {
  const colors = {
    low: 'bg-blue-600/20 text-blue-300 border border-blue-600/30',
    medium: 'bg-yellow-600/20 text-yellow-300 border border-yellow-600/30',
    high: 'bg-orange-600/20 text-orange-300 border border-orange-600/30',
    critical: 'bg-red-600/20 text-red-300 border border-red-600/30'
  }
  return colors[priority]
}

function getTypeColor(type: TicketType) {
  const colors = {
    incident: 'bg-red-600/20 text-red-300 border border-red-600/30',
    maintenance: 'bg-blue-600/20 text-blue-300 border border-blue-600/30',
    request: 'bg-green-600/20 text-green-300 border border-green-600/30',
    improvement: 'bg-purple-600/20 text-purple-300 border border-purple-600/30'
  }
  return colors[type]
}

function getSLAColor(slaDue: string) {
  const now = new Date()
  const due = new Date(slaDue)
  const hoursRemaining = (due.getTime() - now.getTime()) / (1000 * 60 * 60)
  
  if (hoursRemaining < 0) return 'text-red-400 font-bold'
  if (hoursRemaining < 4) return 'text-orange-400 font-medium'
  return 'text-green-400'
}

function getSLATimeRemaining(slaDue: string) {
  const now = new Date()
  const due = new Date(slaDue)
  const diff = due.getTime() - now.getTime()
  
  if (diff < 0) return 'OVERDUE'
  
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  return `${hours}h ${minutes}m`
}

function getSLAProgress(slaDue: string) {
  // Mock calculation - in real app, this would be based on creation time and SLA duration
  const now = new Date()
  const due = new Date(slaDue)
  const hoursRemaining = (due.getTime() - now.getTime()) / (1000 * 60 * 60)
  
  if (hoursRemaining < 0) return 100
  if (hoursRemaining > 24) return 20
  return Math.max(20, 100 - (hoursRemaining / 24 * 80))
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getFileIcon(type: string) {
  const icons = {
    pdf: '📄',
    image: '🖼️',
    video: '🎥',
    document: '📝'
  }
  return icons[type as keyof typeof icons] || '📁'
}

function viewTicket(ticket: Ticket) {
  selectedTicket.value = ticket
  activeTab.value = 'details'
}

function editTicket(ticket: Ticket) {
  Object.assign(newTicket, ticket)
  showCreateModal.value = true
}

function createTicket() {
  const ticket: Ticket = {
    id: `TKT-2025-${String(tickets.value.length + 1).padStart(3, '0')}`,
    title: newTicket.title!,
    description: newTicket.description!,
    type: newTicket.type!,
    priority: newTicket.priority!,
    status: 'open',
    assignedTo: newTicket.assignedTo!,
    reporter: 'Current User',
    linkedAsset: 'ASSET-001',
    impact: 'Medium',
    urgency: 'Medium',
    createdAt: new Date().toISOString(),
    slaDue: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    progressLogs: [{
      id: 'log-new',
      action: 'Ticket Created',
      comment: 'New ticket created manually',
      timestamp: new Date().toISOString(),
      user: 'Current User'
    }]
  }
  
  tickets.value.unshift(ticket)
  showCreateModal.value = false
  
  // Reset form
  Object.assign(newTicket, {
    title: '',
    description: '',
    type: 'incident',
    priority: 'medium',
    assignedTo: 'Engineer 1'
  })
}

function escalateTicket() {
  // Mock escalation logic
  alert('Ticket escalated to supervisor')
}

function approveAutoTicket(autoTicket: any) {
  // Convert auto ticket to regular ticket
  const ticket: Ticket = {
    id: autoTicket.id,
    title: autoTicket.title,
    description: `Auto-generated from ${autoTicket.source}`,
    type: 'incident',
    priority: 'high',
    status: 'open',
    assignedTo: 'Engineer 1',
    reporter: 'System',
    linkedAsset: 'AUTO-ASSET',
    impact: 'High',
    urgency: 'High',
    createdAt: autoTicket.createdAt,
    slaDue: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    progressLogs: []
  }
  
  tickets.value.unshift(ticket)
  
  // Remove from auto-generated list
  const index = autoGeneratedTickets.value.findIndex(t => t.id === autoTicket.id)
  if (index > -1) {
    autoGeneratedTickets.value.splice(index, 1)
  }
}
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Smooth transitions */
* {
  transition: all 0.2s ease;
}

/* Glass morphism effect */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

/* Hover effects */
.hover\:bg-white\/5:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.hover\:bg-white\/20:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Animation for progress bars */
@keyframes slideIn {
  from {
    width: 0%;
  }
  to {
    width: var(--target-width);
  }
}

.animate-slide-in {
  animation: slideIn 1s ease-out;
}
</style>


