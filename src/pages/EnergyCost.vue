<template>
  <div class="space-y-6 p-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        ⚡ Energy & Cost Management
      </h1>
      <div class="flex gap-2">
        <RouterLink to="/cms/reports" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          📊 View Reports
        </RouterLink>
        <button class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors" @click="refreshData">
          🔄 Refresh
        </button>
      </div>
    </div>

    <!-- 1. Energy & Utility Consumption Overview -->
    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Summary Cards -->
      <div class="lg:col-span-2 space-y-4">
        <h2 class="text-xl font-semibold text-cyan-400 mb-4">📈 Consumption Overview</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-700/50 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/20 transition-all">
            <div class="flex items-center justify-between mb-2">
              <div class="text-blue-300 text-sm">⚡ Electricity Today</div>
              <div class="text-xs px-2 py-1 bg-blue-600/30 rounded-full">kWh</div>
            </div>
            <div class="text-2xl font-bold text-white">{{ consumptionData.electricity.today.toLocaleString() }}</div>
            <div class="text-xs text-blue-300 mt-1">Target: {{ consumptionData.electricity.target.toLocaleString() }} kWh</div>
            <div class="w-full bg-blue-900/50 rounded-full h-2 mt-2">
              <div class="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" 
                   :style="`width: ${Math.min((consumptionData.electricity.today / consumptionData.electricity.target) * 100, 100)}%`"></div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-cyan-900/50 to-cyan-800/30 border border-cyan-700/50 rounded-xl p-4 hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
            <div class="flex items-center justify-between mb-2">
              <div class="text-cyan-300 text-sm">💧 Water Today</div>
              <div class="text-xs px-2 py-1 bg-cyan-600/30 rounded-full">m³</div>
            </div>
            <div class="text-2xl font-bold text-white">{{ consumptionData.water.today.toLocaleString() }}</div>
            <div class="text-xs text-cyan-300 mt-1">Target: {{ consumptionData.water.target.toLocaleString() }} m³</div>
            <div class="w-full bg-cyan-900/50 rounded-full h-2 mt-2">
              <div class="bg-gradient-to-r from-cyan-500 to-blue-400 h-2 rounded-full" 
                   :style="`width: ${Math.min((consumptionData.water.today / consumptionData.water.target) * 100, 100)}%`"></div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-orange-900/50 to-orange-800/30 border border-orange-700/50 rounded-xl p-4 hover:shadow-lg hover:shadow-orange-500/20 transition-all">
            <div class="flex items-center justify-between mb-2">
              <div class="text-orange-300 text-sm">🔥 Gas Today</div>
              <div class="text-xs px-2 py-1 bg-orange-600/30 rounded-full">m³</div>
            </div>
            <div class="text-2xl font-bold text-white">{{ consumptionData.gas.today.toLocaleString() }}</div>
            <div class="text-xs text-orange-300 mt-1">Target: {{ consumptionData.gas.target.toLocaleString() }} m³</div>
            <div class="w-full bg-orange-900/50 rounded-full h-2 mt-2">
              <div class="bg-gradient-to-r from-orange-500 to-red-400 h-2 rounded-full" 
                   :style="`width: ${Math.min((consumptionData.gas.today / consumptionData.gas.target) * 100, 100)}%`"></div>
            </div>
          </div>
        </div>

        <!-- Production Line Contribution -->
        <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
          <h3 class="font-semibold mb-3 text-cyan-400">🏭 Production Line Contribution</h3>
          <div class="space-y-3">
            <div v-for="line in productionLines" :key="line.name" class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 rounded-full" :style="`background-color: ${line.color}`"></div>
                <span class="text-sm">{{ line.name }}</span>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-sm text-neutral-400">{{ line.percentage }}%</span>
                <div class="w-20 bg-neutral-800 rounded-full h-2">
                  <div class="h-2 rounded-full" :style="`width: ${line.percentage}%; background-color: ${line.color}`"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Real-Time Monitoring -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold text-cyan-400 mb-4">⚡ Real-Time Monitoring</h2>
        
        <!-- Live Meters -->
        <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
          <h3 class="font-semibold mb-3">📊 Live Meters</h3>
          <div class="space-y-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-400">{{ realTimeData.electricMeter }} kW</div>
              <div class="text-xs text-neutral-400">Current Load</div>
              <div class="w-full bg-neutral-800 rounded-full h-2 mt-2">
                <div class="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full animate-pulse" 
                     :style="`width: ${(realTimeData.electricMeter / 500) * 100}%`"></div>
              </div>
            </div>
            
            <div class="text-center">
              <div class="text-2xl font-bold text-cyan-400">{{ realTimeData.waterFlow }} L/min</div>
              <div class="text-xs text-neutral-400">Water Flow</div>
              <div class="w-full bg-neutral-800 rounded-full h-2 mt-2">
                <div class="bg-gradient-to-r from-cyan-500 to-blue-400 h-2 rounded-full animate-pulse" 
                     :style="`width: ${(realTimeData.waterFlow / 100) * 100}%`"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Peak Load Indicator -->
        <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
          <h3 class="font-semibold mb-3 text-red-400">🔥 Peak Load Status</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-sm">Peak Hours</span>
              <span class="text-sm font-semibold text-red-400">{{ peakHours }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm">Current vs Peak</span>
              <span class="text-sm font-semibold">{{ ((realTimeData.electricMeter / peakLoad) * 100).toFixed(1) }}%</span>
            </div>
            <div class="w-full bg-neutral-800 rounded-full h-3">
              <div class="bg-gradient-to-r from-yellow-500 to-red-500 h-3 rounded-full" 
                   :style="`width: ${Math.min((realTimeData.electricMeter / peakLoad) * 100, 100)}%`"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Cost Calculation & Estimation -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold text-green-400 mb-4">💰 Cost Analysis & Forecasting</h2>
      
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Cost Breakdown -->
        <div>
          <h3 class="font-semibold mb-3">📊 Today's Cost Breakdown</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center p-3 bg-blue-900/20 rounded-lg">
              <span class="text-sm">⚡ Electricity</span>
              <span class="font-semibold text-blue-400">${{ costBreakdown.electricity.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-cyan-900/20 rounded-lg">
              <span class="text-sm">💧 Water</span>
              <span class="font-semibold text-cyan-400">${{ costBreakdown.water.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-orange-900/20 rounded-lg">
              <span class="text-sm">🔥 Gas</span>
              <span class="font-semibold text-orange-400">${{ costBreakdown.gas.toFixed(2) }}</span>
            </div>
            <div class="border-t border-neutral-700 pt-2">
              <div class="flex justify-between items-center font-semibold">
                <span>Total</span>
                <span class="text-green-400">${{ totalCost.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Budget Comparison -->
        <div>
          <h3 class="font-semibold mb-3">📈 Budget vs Actual</h3>
          <div class="space-y-3">
            <div class="p-3 bg-neutral-900/50 rounded-lg">
              <div class="flex justify-between mb-2">
                <span class="text-sm">Monthly Budget</span>
                <span class="text-green-400">${{ monthlyBudget.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-sm">Current Spend</span>
                <span class="text-yellow-400">${{ currentMonthSpend.toLocaleString() }}</span>
              </div>
              <div class="w-full bg-neutral-800 rounded-full h-2">
                <div class="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full" 
                     :style="`width: ${Math.min((currentMonthSpend / monthlyBudget) * 100, 100)}%`"></div>
              </div>
              <div class="text-xs text-neutral-400 mt-1">
                {{ ((currentMonthSpend / monthlyBudget) * 100).toFixed(1) }}% of budget used
              </div>
            </div>
          </div>
        </div>

        <!-- Cost Forecasting -->
        <div>
          <h3 class="font-semibold mb-3">🔮 Cost Forecasting</h3>
          <div class="space-y-3">
            <div class="p-3 bg-purple-900/20 rounded-lg">
              <div class="text-sm text-neutral-400">End of Month Projection</div>
              <div class="text-xl font-bold text-purple-400">${{ monthEndProjection.toLocaleString() }}</div>
            </div>
            <div class="p-3 bg-indigo-900/20 rounded-lg">
              <div class="text-sm text-neutral-400">Year End Projection</div>
              <div class="text-xl font-bold text-indigo-400">${{ yearEndProjection.toLocaleString() }}</div>
            </div>
            <div class="p-3 bg-green-900/20 rounded-lg">
              <div class="text-sm text-neutral-400">Potential Savings</div>
              <div class="text-xl font-bold text-green-400">${{ potentialSavings.toLocaleString() }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tariff Settings -->
      <div class="mt-6 p-4 bg-neutral-900/50 rounded-lg">
        <h3 class="font-semibold mb-3">⚙️ Tariff & Parameters</h3>
        <div class="grid md:grid-cols-4 gap-4">
          <div>
            <label class="text-xs text-neutral-400">Electricity ($/kWh)</label>
            <input v-model.number="tariffs.electricity" type="number" step="0.001" 
                   class="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="text-xs text-neutral-400">Water ($/m³)</label>
            <input v-model.number="tariffs.water" type="number" step="0.01" 
                   class="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="text-xs text-neutral-400">Gas ($/m³)</label>
            <input v-model.number="tariffs.gas" type="number" step="0.01" 
                   class="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="text-xs text-neutral-400">Demand Charge ($/kW)</label>
            <input v-model.number="tariffs.demand" type="number" step="0.1" 
                   class="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-sm" />
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Efficiency & Benchmarking -->
    <div class="grid lg:grid-cols-2 gap-6">
      <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-6">
        <h2 class="text-xl font-semibold text-yellow-400 mb-4">⚡ Energy Efficiency</h2>
        
        <!-- Energy Intensity -->
        <div class="space-y-4">
          <div class="p-4 bg-yellow-900/20 rounded-lg">
            <div class="text-sm text-neutral-400">Energy Intensity</div>
            <div class="text-2xl font-bold text-yellow-400">{{ energyIntensity.toFixed(2) }} kWh/ton</div>
            <div class="text-xs text-neutral-400">Industry benchmark: 45.0 kWh/ton</div>
          </div>
          
          <div class="p-4 bg-cyan-900/20 rounded-lg">
            <div class="text-sm text-neutral-400">Water Intensity</div>
            <div class="text-2xl font-bold text-cyan-400">{{ waterIntensity.toFixed(2) }} m³/ton</div>
            <div class="text-xs text-neutral-400">Industry benchmark: 2.5 m³/ton</div>
          </div>
        </div>

        <!-- EnPI -->
        <div class="mt-4 p-4 bg-green-900/20 rounded-lg">
          <h3 class="font-semibold mb-2 text-green-400">📊 Energy Performance Indicator (EnPI)</h3>
          <div class="flex items-center justify-between">
            <span class="text-sm">ISO 50001 Score</span>
            <span class="text-xl font-bold text-green-400">{{ enpiScore }}/100</span>
          </div>
          <div class="w-full bg-neutral-800 rounded-full h-3 mt-2">
            <div class="bg-gradient-to-r from-green-500 to-emerald-400 h-3 rounded-full" 
                 :style="`width: ${enpiScore}%`"></div>
          </div>
        </div>
      </div>

      <!-- Machine Benchmarking -->
      <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-6">
        <h2 class="text-xl font-semibold text-red-400 mb-4">🏭 Machine Benchmarking</h2>
        
        <div class="space-y-3">
          <div v-for="machine in machineEfficiency" :key="machine.name" 
               class="flex items-center justify-between p-3 rounded-lg"
               :class="machine.efficiency < 70 ? 'bg-red-900/20' : machine.efficiency < 85 ? 'bg-yellow-900/20' : 'bg-green-900/20'">
            <div>
              <div class="font-semibold">{{ machine.name }}</div>
              <div class="text-xs text-neutral-400">{{ machine.consumption }} kWh/day</div>
            </div>
            <div class="text-right">
              <div class="font-semibold" 
                   :class="machine.efficiency < 70 ? 'text-red-400' : machine.efficiency < 85 ? 'text-yellow-400' : 'text-green-400'">
                {{ machine.efficiency }}%
              </div>
              <div class="text-xs text-neutral-400">efficiency</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Trend Analysis & Visualization -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold text-purple-400 mb-4">📈 Trend Analysis & Visualization</h2>
      
      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Historical Trends Chart -->
        <div>
          <h3 class="font-semibold mb-3">📊 Historical Consumption (Last 30 Days)</h3>
          <div class="h-96 bg-neutral-900/50 rounded-lg p-6">
            <div class="flex justify-between items-center mb-6">
              <div class="text-sm text-neutral-400">Daily Consumption Trends</div>
              <div class="flex gap-4 text-sm">
                <span class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-blue-500 rounded"></div>
                  Electricity (kWh)
                </span>
                <span class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-cyan-500 rounded"></div>
                  Water (m³)
                </span>
                <span class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-orange-500 rounded"></div>
                  Gas (m³)
                </span>
              </div>
            </div>
            <!-- Enhanced Chart Area -->
            <div class="relative h-64 border-l-2 border-b-2 border-neutral-600">
              <!-- Y-axis labels -->
              <div class="absolute -left-12 top-0 h-full flex flex-col justify-between text-xs text-neutral-500">
                <span>1400</span>
                <span>1050</span>
                <span>700</span>
                <span>350</span>
                <span>0</span>
              </div>
              
              <!-- Chart bars -->
              <div class="absolute bottom-0 left-0 w-full h-full flex items-end justify-between px-4">
                <div v-for="(day, index) in historicalTrends.slice(-14)" :key="index" 
                     class="flex flex-col items-center flex-1 mx-1">
                  <!-- Stacked bars -->
                  <div class="relative w-6 flex flex-col justify-end">
                    <!-- Gas (bottom) -->
                    <div class="w-full bg-orange-500 hover:bg-orange-400 transition-colors duration-200" 
                         :style="`height: ${(day.gas / 60) * 60}px`"
                         :title="`Gas: ${day.gas} m³`"></div>
                    <!-- Water (middle) -->
                    <div class="w-full bg-cyan-500 hover:bg-cyan-400 transition-colors duration-200" 
                         :style="`height: ${(day.water / 100) * 80}px`"
                         :title="`Water: ${day.water} m³`"></div>
                    <!-- Electricity (top) -->
                    <div class="w-full bg-blue-500 hover:bg-blue-400 transition-colors duration-200 rounded-t" 
                         :style="`height: ${(day.electricity / 1300) * 120}px`"
                         :title="`Electricity: ${day.electricity} kWh`"></div>
                  </div>
                  <div class="text-xs text-neutral-500 mt-2 transform -rotate-45 origin-center">
                    {{ new Date(day.date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }) }}
                  </div>
                </div>
              </div>
              
              <!-- Grid lines -->
              <div class="absolute inset-0 pointer-events-none">
                <div class="h-full flex flex-col justify-between">
                  <div v-for="i in 4" :key="i" class="border-t border-neutral-700/50"></div>
                </div>
              </div>
            </div>
            <div class="mt-4 text-sm text-neutral-400 text-center">
              Konsumsi energi 14 hari terakhir (hover untuk detail)
            </div>
          </div>
        </div>

        <!-- Monthly Predictions -->
        <div>
          <h3 class="font-semibold mb-3">🔮 Monthly Predictions (Next 12 Months)</h3>
          <div class="h-80 bg-neutral-900/50 rounded-lg p-4 overflow-y-auto">
            <div class="space-y-3">
              <div v-for="(prediction, index) in monthlyPredictions.slice(0, 8)" :key="prediction.month"
                   class="flex justify-between items-center p-3 bg-neutral-800/50 rounded-lg hover:bg-neutral-800/70 transition-colors">
                <div class="flex items-center gap-3">
                  <div class="flex flex-col">
                    <span class="text-sm font-semibold">{{ prediction.month }}</span>
                    <span class="text-xs text-neutral-400">
                      Confidence: {{ prediction.confidence }}%
                    </span>
                  </div>
                  <!-- Trend Arrow -->
                  <div class="flex items-center">
                    <div v-if="index > 0 && prediction.cost > monthlyPredictions[index - 1].cost" 
                         class="flex items-center text-red-400" title="Prediksi naik">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                      </svg>
                      <span class="text-xs ml-1">
                        +${{ (prediction.cost - (index > 0 ? monthlyPredictions[index - 1].cost : prediction.cost)).toLocaleString() }}
                      </span>
                    </div>
                    <div v-else-if="index > 0 && prediction.cost < monthlyPredictions[index - 1].cost" 
                         class="flex items-center text-green-400" title="Prediksi turun">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 112 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                      <span class="text-xs ml-1">
                        -${{ ((index > 0 ? monthlyPredictions[index - 1].cost : prediction.cost) - prediction.cost).toLocaleString() }}
                      </span>
                    </div>
                    <div v-else-if="index > 0" 
                         class="flex items-center text-yellow-400" title="Prediksi stabil">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                      </svg>
                      <span class="text-xs ml-1">Stabil</span>
                    </div>
                    <div v-else class="flex items-center text-blue-400" title="Baseline">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"/>
                      </svg>
                      <span class="text-xs ml-1">Base</span>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-lg font-bold" 
                       :class="index > 0 && prediction.cost > monthlyPredictions[index - 1].cost ? 'text-red-400' : 
                               index > 0 && prediction.cost < monthlyPredictions[index - 1].cost ? 'text-green-400' : 'text-blue-400'">
                    ${{ prediction.cost.toLocaleString() }}
                  </div>
                  <div class="text-xs text-neutral-400">
                    {{ prediction.electricity.toLocaleString() }} kWh
                  </div>
                  <div class="text-xs text-neutral-500">
                    {{ prediction.water.toLocaleString() }} m³ • {{ prediction.gas.toLocaleString() }} m³
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 text-center">
              <button class="text-sm text-purple-400 hover:text-purple-300 px-4 py-2 bg-purple-900/20 rounded-lg hover:bg-purple-900/30 transition-colors">
                Lihat Semua 12 Bulan →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Yearly Predictions -->
      <div class="mt-6">
        <h3 class="font-semibold mb-3">📅 Yearly Predictions (Next 5 Years)</h3>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div v-for="(year, index) in yearlyPredictions" :key="year.month"
               class="p-4 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-lg border border-purple-800/30 hover:border-purple-700/50 transition-all duration-300">
            <div class="text-center">
              <div class="text-lg font-bold text-purple-400">{{ year.month }}</div>
              
              <!-- Trend Arrow for Yearly -->
              <div class="flex justify-center items-center mt-2 mb-2">
                <div v-if="index > 0 && year.cost > yearlyPredictions[index - 1].cost" 
                     class="flex items-center text-red-400" title="Prediksi naik tahun ke tahun">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-xs ml-1 font-semibold">
                    +{{ (((year.cost - (index > 0 ? yearlyPredictions[index - 1].cost : year.cost)) / (index > 0 ? yearlyPredictions[index - 1].cost : year.cost)) * 100).toFixed(1) }}%
                  </span>
                </div>
                <div v-else-if="index > 0 && year.cost < yearlyPredictions[index - 1].cost" 
                     class="flex items-center text-green-400" title="Prediksi turun tahun ke tahun">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 112 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-xs ml-1 font-semibold">
                    -{{ (((index > 0 ? yearlyPredictions[index - 1].cost : year.cost) - year.cost) / (index > 0 ? yearlyPredictions[index - 1].cost : year.cost) * 100).toFixed(1) }}%
                  </span>
                </div>
                <div v-else-if="index > 0" 
                     class="flex items-center text-yellow-400" title="Prediksi stabil">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-xs ml-1 font-semibold">Stabil</span>
                </div>
                <div v-else class="flex items-center text-blue-400" title="Tahun dasar">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-xs ml-1 font-semibold">Base</span>
                </div>
              </div>
              
              <div class="text-3xl font-bold text-white mt-2" 
                   :class="index > 0 && year.cost > yearlyPredictions[index - 1].cost ? 'text-red-400' : 
                           index > 0 && year.cost < yearlyPredictions[index - 1].cost ? 'text-green-400' : 'text-white'">
                ${{ (year.cost / 1000).toFixed(0) }}K
              </div>
              <div class="text-sm text-neutral-400 mt-1">
                {{ (year.electricity / 1000).toFixed(0) }}K kWh
              </div>
              <div class="text-xs text-neutral-500 mt-1">
                {{ (year.water / 1000).toFixed(1) }}K m³ • {{ (year.gas / 1000).toFixed(1) }}K m³
              </div>
              <div class="mt-3">
                <div class="w-full bg-neutral-800 rounded-full h-2">
                  <div class="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-500" 
                       :style="`width: ${year.confidence}%`"></div>
                </div>
                <div class="text-xs text-neutral-500 mt-2">
                  {{ year.confidence }}% confidence
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trend Analysis Summary -->
      <div class="mt-6 grid lg:grid-cols-3 gap-6">
        <!-- Growth Rates -->
        <div>
          <h3 class="font-semibold mb-3">📈 Growth Rate Analysis</h3>
          <div class="space-y-3">
            <div class="p-3 bg-blue-900/20 rounded-lg">
              <div class="flex justify-between">
                <span class="text-sm">Electricity Growth</span>
                <span class="font-semibold text-blue-400">+{{ trendMetrics.electricityGrowthRate }}%/year</span>
              </div>
            </div>
            <div class="p-3 bg-cyan-900/20 rounded-lg">
              <div class="flex justify-between">
                <span class="text-sm">Water Growth</span>
                <span class="font-semibold text-cyan-400">+{{ trendMetrics.waterGrowthRate }}%/year</span>
              </div>
            </div>
            <div class="p-3 bg-orange-900/20 rounded-lg">
              <div class="flex justify-between">
                <span class="text-sm">Gas Growth</span>
                <span class="font-semibold text-orange-400">+{{ trendMetrics.gasGrowthRate }}%/year</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Seasonal Patterns -->
        <div>
          <h3 class="font-semibold mb-3">🌡️ Seasonal Patterns</h3>
          <div class="space-y-3">
            <div class="p-3 bg-green-900/20 rounded-lg">
              <div class="text-sm text-neutral-400">Peak vs Low Season</div>
              <div class="font-semibold text-green-400">{{ trendMetrics.seasonalVariation }}% variation</div>
            </div>
            <div class="p-3 bg-yellow-900/20 rounded-lg">
              <div class="text-sm text-neutral-400">Weekday vs Weekend</div>
              <div class="font-semibold text-yellow-400">{{ trendMetrics.weekdayWeekendRatio }}x ratio</div>
            </div>
            <div class="p-3 bg-red-900/20 rounded-lg">
              <div class="text-sm text-neutral-400">Peak vs Off-Peak</div>
              <div class="font-semibold text-red-400">{{ trendMetrics.peakOffPeakRatio }}x ratio</div>
            </div>
          </div>
        </div>

        <!-- Prediction Accuracy -->
        <div>
          <h3 class="font-semibold mb-3">🎯 Prediction Accuracy</h3>
          <div class="space-y-3">
            <div class="p-3 bg-purple-900/20 rounded-lg">
              <div class="text-sm text-neutral-400">Short-term (1-3 months)</div>
              <div class="font-semibold text-purple-400">92% accuracy</div>
              <div class="w-full bg-neutral-800 rounded-full h-1 mt-1">
                <div class="bg-purple-500 h-1 rounded-full" style="width: 92%"></div>
              </div>
            </div>
            <div class="p-3 bg-indigo-900/20 rounded-lg">
              <div class="text-sm text-neutral-400">Medium-term (6-12 months)</div>
              <div class="font-semibold text-indigo-400">85% accuracy</div>
              <div class="w-full bg-neutral-800 rounded-full h-1 mt-1">
                <div class="bg-indigo-500 h-1 rounded-full" style="width: 85%"></div>
              </div>
            </div>
            <div class="p-3 bg-blue-900/20 rounded-lg">
              <div class="text-sm text-neutral-400">Long-term (2-5 years)</div>
              <div class="font-semibold text-blue-400">72% accuracy</div>
              <div class="w-full bg-neutral-800 rounded-full h-1 mt-1">
                <div class="bg-blue-500 h-1 rounded-full" style="width: 72%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Correlation Analysis -->
      <div class="mt-6">
        <h3 class="font-semibold mb-3">🔗 Production vs Energy Correlation</h3>
        <div class="grid lg:grid-cols-3 gap-6">
          <div class="p-3 bg-blue-900/20 rounded-lg">
            <div class="flex justify-between">
              <span class="text-sm">Production Output</span>
              <span class="font-semibold text-blue-400">{{ productionOutput }} tons</span>
            </div>
          </div>
          <div class="p-3 bg-purple-900/20 rounded-lg">
            <div class="flex justify-between">
              <span class="text-sm">Energy Efficiency Ratio</span>
              <span class="font-semibold text-purple-400">{{ efficiencyRatio.toFixed(2) }}</span>
            </div>
          </div>
          <div class="p-3 bg-green-900/20 rounded-lg">
            <div class="flex justify-between">
              <span class="text-sm">Correlation Score</span>
              <span class="font-semibold text-green-400">{{ correlationScore.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Heatmap -->
      <div class="mt-6">
        <h3 class="font-semibold mb-3">🗺️ Energy Consumption Heatmap</h3>
        <div class="grid grid-cols-8 gap-1">
          <div v-for="(zone, index) in heatmapData" :key="index" 
               class="aspect-square rounded flex items-center justify-center text-xs font-semibold"
               :class="getHeatmapColor(zone.intensity)">
            {{ zone.name }}
          </div>
        </div>
        <div class="flex justify-between mt-2 text-xs text-neutral-400">
          <span>Low Usage</span>
          <span>High Usage</span>
        </div>
      </div>
    </div>

    <!-- 5. Anomaly & Alerting -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold text-red-400 mb-4">🚨 Anomaly Detection & Alerts</h2>
      
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Active Alerts -->
        <div>
          <h3 class="font-semibold mb-3">⚠️ Active Alerts</h3>
          <div class="space-y-2">
            <div v-for="alert in activeAlerts" :key="alert.id" 
                 class="p-3 rounded-lg border-l-4"
                 :class="alert.severity === 'critical' ? 'bg-red-900/20 border-red-500' : 
                         alert.severity === 'warning' ? 'bg-yellow-900/20 border-yellow-500' : 
                         'bg-blue-900/20 border-blue-500'">
              <div class="flex justify-between items-start">
                <div>
                  <div class="font-semibold text-sm">{{ alert.message }}</div>
                  <div class="text-xs text-neutral-400">{{ alert.timestamp }}</div>
                </div>
                <button class="text-xs px-2 py-1 bg-neutral-700 rounded hover:bg-neutral-600">
                  Ack
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Leakage Detection -->
        <div>
          <h3 class="font-semibold mb-3">💧 Leakage & Idle Detection</h3>
          <div class="space-y-3">
            <div class="p-3 bg-cyan-900/20 rounded-lg">
              <div class="text-sm text-neutral-400">Water Leakage Status</div>
              <div class="font-semibold text-cyan-400">{{ leakageStatus }}</div>
            </div>
            <div class="p-3 bg-yellow-900/20 rounded-lg">
              <div class="text-sm text-neutral-400">Idle Power Consumption</div>
              <div class="font-semibold text-yellow-400">{{ idlePower }} kW</div>
            </div>
          </div>
        </div>

        <!-- Demand Charge Warning -->
        <div>
          <h3 class="font-semibold mb-3">⚡ Demand Charge Monitor</h3>
          <div class="p-3 bg-orange-900/20 rounded-lg">
            <div class="text-sm text-neutral-400">Contract Limit</div>
            <div class="font-semibold text-orange-400">{{ contractLimit }} kW</div>
            <div class="text-sm text-neutral-400 mt-2">Current Peak</div>
            <div class="font-semibold">{{ currentPeak }} kW</div>
            <div class="w-full bg-neutral-800 rounded-full h-2 mt-2">
              <div class="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" 
                   :style="`width: ${(currentPeak / contractLimit) * 100}%`"></div>
            </div>
            <div class="text-xs text-neutral-400 mt-1">
              {{ ((currentPeak / contractLimit) * 100).toFixed(1) }}% of limit
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 6. Carbon Footprint & Sustainability -->
    <div class="bg-neutral-950/70 border border-neutral-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold text-green-400 mb-4">🌱 Carbon Footprint & Sustainability</h2>
      
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Carbon Emissions -->
        <div>
          <h3 class="font-semibold mb-3">🌍 Carbon Emissions</h3>
          <div class="space-y-3">
            <div class="p-4 bg-green-900/20 rounded-lg text-center">
              <div class="text-2xl font-bold text-green-400">{{ carbonEmissions.toFixed(1) }}</div>
              <div class="text-sm text-neutral-400">tons CO₂ today</div>
            </div>
            <div class="p-3 bg-neutral-900/50 rounded-lg">
              <div class="flex justify-between">
                <span class="text-sm">Monthly Target</span>
                <span class="text-green-400">{{ monthlyEmissionTarget }} tons</span>
              </div>
              <div class="w-full bg-neutral-800 rounded-full h-2 mt-2">
                <div class="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full" 
                     :style="`width: ${(carbonEmissions * 30 / monthlyEmissionTarget) * 100}%`"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Renewable Contribution -->
        <div>
          <h3 class="font-semibold mb-3">☀️ Renewable Energy</h3>
          <div class="space-y-3">
            <div class="p-4 bg-yellow-900/20 rounded-lg text-center">
              <div class="text-2xl font-bold text-yellow-400">{{ renewableContribution }}%</div>
              <div class="text-sm text-neutral-400">Solar contribution</div>
            </div>
            <div class="p-3 bg-neutral-900/50 rounded-lg">
              <div class="flex justify-between">
                <span class="text-sm">Solar Generated</span>
                <span class="text-yellow-400">{{ solarGenerated }} kWh</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm">Grid Consumption</span>
                <span class="text-blue-400">{{ gridConsumption }} kWh</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ESG Progress -->
        <div>
          <h3 class="font-semibold mb-3">📊 ESG Progress</h3>
          <div class="space-y-3">
            <div class="p-3 bg-blue-900/20 rounded-lg">
              <div class="flex justify-between">
                <span class="text-sm">Energy Reduction</span>
                <span class="text-blue-400">{{ esgMetrics.energyReduction }}%</span>
              </div>
            </div>
            <div class="p-3 bg-green-900/20 rounded-lg">
              <div class="flex justify-between">
                <span class="text-sm">Carbon Reduction</span>
                <span class="text-green-400">{{ esgMetrics.carbonReduction }}%</span>
              </div>
            </div>
            <div class="p-3 bg-purple-900/20 rounded-lg">
              <div class="flex justify-between">
                <span class="text-sm">Sustainability Score</span>
                <span class="text-purple-400">{{ esgMetrics.sustainabilityScore }}/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Types
interface ConsumptionData {
  electricity: { today: number; target: number }
  water: { today: number; target: number }
  gas: { today: number; target: number }
}

interface ProductionLine {
  name: string
  percentage: number
  color: string
}

interface MachineEfficiency {
  name: string
  consumption: number
  efficiency: number
}

interface Alert {
  id: string
  message: string
  severity: 'info' | 'warning' | 'critical'
  timestamp: string
}

interface HeatmapZone {
  name: string
  intensity: number
}

// Reactive data
const consumptionData = ref<ConsumptionData>({
  electricity: { today: 1245, target: 1300 },
  water: { today: 85, target: 90 },
  gas: { today: 45, target: 50 }
})

const productionLines = ref<ProductionLine[]>([
  { name: 'Line A - Assembly', percentage: 35, color: '#3B82F6' },
  { name: 'Line B - Packaging', percentage: 28, color: '#10B981' },
  { name: 'Line C - Quality Control', percentage: 20, color: '#F59E0B' },
  { name: 'Line D - Maintenance', percentage: 17, color: '#EF4444' }
])

const realTimeData = ref({
  electricMeter: 425,
  waterFlow: 75
})

const peakHours = ref('08:00 - 10:00, 14:00 - 16:00')
const peakLoad = ref(500)

const tariffs = ref({
  electricity: 0.125,
  water: 2.50,
  gas: 0.85,
  demand: 15.0
})

const monthlyBudget = ref(25000)
const currentMonthSpend = ref(18750)
const monthEndProjection = ref(28500)
const yearEndProjection = ref(342000)
const potentialSavings = ref(15000)

const energyIntensity = ref(42.5)
const waterIntensity = ref(2.1)
const enpiScore = ref(78)
const productionOutput = ref(125)

const machineEfficiency = ref<MachineEfficiency[]>([
  { name: 'CNC Machine 1', consumption: 145, efficiency: 92 },
  { name: 'Assembly Robot', consumption: 89, efficiency: 88 },
  { name: 'Packaging Unit', consumption: 67, efficiency: 76 },
  { name: 'Quality Scanner', consumption: 34, efficiency: 95 },
  { name: 'Conveyor System', consumption: 156, efficiency: 65 }
])

const activeAlerts = ref<Alert[]>([
  { id: '1', message: 'High electricity consumption detected', severity: 'warning', timestamp: '2 min ago' },
  { id: '2', message: 'Water flow anomaly in Line B', severity: 'critical', timestamp: '5 min ago' },
  { id: '3', message: 'Peak demand approaching limit', severity: 'warning', timestamp: '8 min ago' }
])

const leakageStatus = ref('No leaks detected')
const idlePower = ref(45)
const contractLimit = ref(500)
const currentPeak = ref(425)

const carbonEmissions = ref(8.7)
const monthlyEmissionTarget = ref(250)
const renewableContribution = ref(23)
const solarGenerated = ref(287)
const gridConsumption = ref(958)

const esgMetrics = ref({
  energyReduction: 12,
  carbonReduction: 18,
  sustainabilityScore: 76
})

const heatmapData = ref<HeatmapZone[]>([
  { name: 'A1', intensity: 0.8 }, { name: 'A2', intensity: 0.6 }, { name: 'A3', intensity: 0.9 }, { name: 'A4', intensity: 0.4 },
  { name: 'B1', intensity: 0.7 }, { name: 'B2', intensity: 0.3 }, { name: 'B3', intensity: 0.8 }, { name: 'B4', intensity: 0.5 },
  { name: 'C1', intensity: 0.2 }, { name: 'C2', intensity: 0.9 }, { name: 'C3', intensity: 0.6 }, { name: 'C4', intensity: 0.7 },
  { name: 'D1', intensity: 0.5 }, { name: 'D2', intensity: 0.4 }, { name: 'D3', intensity: 0.3 }, { name: 'D4', intensity: 0.8 }
])

// Trend Analysis & Prediction Data
interface TrendData {
  date: string
  electricity: number
  water: number
  gas: number
  cost: number
}

interface PredictionData {
  month: string
  electricity: number
  water: number
  gas: number
  cost: number
  confidence: number
}

// Historical data for last 30 days
const historicalTrends = ref<TrendData[]>([
  // Last 30 days data with realistic variations
  { date: '2024-12-01', electricity: 1180, water: 82, gas: 43, cost: 285 },
  { date: '2024-12-02', electricity: 1220, water: 85, gas: 45, cost: 298 },
  { date: '2024-12-03', electricity: 1195, water: 83, gas: 44, cost: 290 },
  { date: '2024-12-04', electricity: 1240, water: 87, gas: 46, cost: 305 },
  { date: '2024-12-05', electricity: 1210, water: 84, gas: 45, cost: 295 },
  { date: '2024-12-06', electricity: 1185, water: 81, gas: 42, cost: 282 },
  { date: '2024-12-07', electricity: 1205, water: 86, gas: 47, cost: 301 },
  { date: '2024-12-08', electricity: 1230, water: 88, gas: 48, cost: 310 },
  { date: '2024-12-09', electricity: 1215, water: 85, gas: 46, cost: 298 },
  { date: '2024-12-10', electricity: 1190, water: 82, gas: 44, cost: 287 },
  { date: '2024-12-11', electricity: 1225, water: 87, gas: 47, cost: 305 },
  { date: '2024-12-12', electricity: 1200, water: 84, gas: 45, cost: 292 },
  { date: '2024-12-13', electricity: 1235, water: 89, gas: 49, cost: 315 },
  { date: '2024-12-14', electricity: 1210, water: 86, gas: 46, cost: 298 },
  { date: '2024-12-15', electricity: 1195, water: 83, gas: 44, cost: 290 },
  { date: '2024-12-16', electricity: 1220, water: 87, gas: 47, cost: 302 },
  { date: '2024-12-17', electricity: 1245, water: 90, gas: 50, cost: 320 },
  { date: '2024-12-18', electricity: 1230, water: 88, gas: 48, cost: 312 },
  { date: '2024-12-19', electricity: 1205, water: 85, gas: 46, cost: 295 },
  { date: '2024-12-20', electricity: 1215, water: 86, gas: 47, cost: 300 },
  { date: '2024-12-21', electricity: 1240, water: 89, gas: 49, cost: 315 },
  { date: '2024-12-22', electricity: 1225, water: 87, gas: 48, cost: 308 },
  { date: '2024-12-23', electricity: 1190, water: 84, gas: 45, cost: 290 },
  { date: '2024-12-24', electricity: 1200, water: 85, gas: 46, cost: 295 },
  { date: '2024-12-25', electricity: 1180, water: 82, gas: 43, cost: 285 },
  { date: '2024-12-26', electricity: 1210, water: 86, gas: 47, cost: 300 },
  { date: '2024-12-27', electricity: 1235, water: 88, gas: 49, cost: 312 },
  { date: '2024-12-28', electricity: 1220, water: 87, gas: 48, cost: 305 },
  { date: '2024-12-29', electricity: 1245, water: 90, gas: 50, cost: 320 },
  { date: '2024-12-30', electricity: 1250, water: 91, gas: 51, cost: 325 }
])

// Monthly predictions for next 12 months
const monthlyPredictions = ref<PredictionData[]>([
  { month: 'Jan 2025', electricity: 37450, water: 2635, gas: 1425, cost: 9250, confidence: 92 },
  { month: 'Feb 2025', electricity: 35200, water: 2480, gas: 1340, cost: 8750, confidence: 89 },
  { month: 'Mar 2025', electricity: 38900, water: 2720, gas: 1480, cost: 9650, confidence: 91 },
  { month: 'Apr 2025', electricity: 36800, water: 2590, gas: 1410, cost: 9150, confidence: 88 },
  { month: 'May 2025', electricity: 40200, water: 2810, gas: 1520, cost: 9950, confidence: 87 },
  { month: 'Jun 2025', electricity: 42500, water: 2950, gas: 1580, cost: 10450, confidence: 85 },
  { month: 'Jul 2025', electricity: 45800, water: 3180, gas: 1680, cost: 11250, confidence: 83 },
  { month: 'Aug 2025', electricity: 44200, water: 3080, gas: 1620, cost: 10850, confidence: 84 },
  { month: 'Sep 2025', electricity: 41600, water: 2920, gas: 1550, cost: 10250, confidence: 86 },
  { month: 'Oct 2025', electricity: 39100, water: 2750, gas: 1470, cost: 9650, confidence: 88 },
  { month: 'Nov 2025', electricity: 37800, water: 2660, gas: 1430, cost: 9350, confidence: 90 },
  { month: 'Dec 2025', electricity: 38500, water: 2700, gas: 1450, cost: 9500, confidence: 91 }
])

// Yearly predictions for next 5 years
const yearlyPredictions = ref<PredictionData[]>([
  { month: '2025', electricity: 478050, water: 33475, gas: 17955, cost: 118050, confidence: 88 },
  { month: '2026', electricity: 492372, water: 34479, gas: 18493, cost: 121612, confidence: 82 },
  { month: '2027', electricity: 507303, water: 35533, gas: 19068, cost: 125361, confidence: 76 },
  { month: '2028', electricity: 522873, water: 36639, gas: 19680, cost: 129322, confidence: 70 },
  { month: '2029', electricity: 539120, water: 37798, gas: 20331, cost: 133522, confidence: 64 }
])

// Trend analysis metrics
const trendMetrics = ref({
  electricityGrowthRate: 2.8, // % per year
  waterGrowthRate: 3.1, // % per year
  gasGrowthRate: 3.4, // % per year
  seasonalVariation: 15.2, // % peak vs low season
  weekdayWeekendRatio: 1.35,
  peakOffPeakRatio: 1.8
})

// Computed properties
const costBreakdown = computed(() => ({
  electricity: consumptionData.value.electricity.today * tariffs.value.electricity,
  water: consumptionData.value.water.today * tariffs.value.water,
  gas: consumptionData.value.gas.today * tariffs.value.gas
}))

const totalCost = computed(() => 
  costBreakdown.value.electricity + costBreakdown.value.water + costBreakdown.value.gas
)

const efficiencyRatio = computed(() => 
  productionOutput.value / consumptionData.value.electricity.today
)

const correlationScore = computed(() => 0.87)

// Methods
const getHeatmapColor = (intensity: number): string => {
  if (intensity > 0.8) return 'bg-red-500 text-white'
  if (intensity > 0.6) return 'bg-orange-500 text-white'
  if (intensity > 0.4) return 'bg-yellow-500 text-black'
  if (intensity > 0.2) return 'bg-green-500 text-white'
  return 'bg-blue-500 text-white'
}

const refreshData = () => {
  // Simulate real-time data updates
  realTimeData.value.electricMeter = Math.floor(Math.random() * 100) + 350
  realTimeData.value.waterFlow = Math.floor(Math.random() * 30) + 60
  
  // Update consumption data slightly
  consumptionData.value.electricity.today += Math.floor(Math.random() * 20) - 10
  consumptionData.value.water.today += Math.floor(Math.random() * 4) - 2
  consumptionData.value.gas.today += Math.floor(Math.random() * 2) - 1
}

// Lifecycle
onMounted(() => {
  // Simulate real-time updates every 30 seconds
  setInterval(refreshData, 30000)
})
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>


