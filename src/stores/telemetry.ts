import { defineStore } from 'pinia'

export interface TelemetryRow { id: number; time: string; location: string; device: string; power: number; temp: number }
export interface DeviceStatus { active: boolean; lastActive: string }

export const useTelemetryStore = defineStore('telemetry', {
  state: () => ({
    rows: [
      { id: 1, time: '08:00', location: 'Line 1', device: 'Line1-Main', power: 120, temp: 30 },
      { id: 2, time: '09:00', location: 'Line 1', device: 'Line1-Main', power: 185, temp: 31 },
      { id: 3, time: '10:00', location: 'Line 2', device: 'Line2-Pump', power: 95, temp: 29 },
    ] as TelemetryRow[],
    deviceStatuses: {} as Record<string, DeviceStatus>,
    powerAnomaly: 180,
    tempAnomaly: 70,
  }),
  getters: {
    anomalies(state) {
      const list: { id: string; time: string; location: string; device: string; type: 'power_spike'|'temp_high'|'inactive'; value: string|number }[] = []
      state.rows.forEach(r => {
        if (r.power > state.powerAnomaly) list.push({ id: `P-${r.id}`, time: r.time, location: r.location, device: r.device, type: 'power_spike', value: r.power })
        if (r.temp > state.tempAnomaly) list.push({ id: `T-${r.id}`, time: r.time, location: r.location, device: r.device, type: 'temp_high', value: r.temp })
      })
      Object.entries(state.deviceStatuses).forEach(([device, ds]) => {
        if (!ds.active) list.push({ id: `I-${device}`, time: ds.lastActive || '—', location: '—', device, type: 'inactive', value: ds.lastActive || '—' })
      })
      return list
    },
  },
  actions: {
    addRow(r: Omit<TelemetryRow, 'id'>) {
      const id = (this.rows.at(-1)?.id || 0) + 1
      this.rows.push({ id, ...r })
      this.markActive(r.device, r.time)
    },
    markActive(device: string, last: string) {
      this.deviceStatuses[device] = { active: true, lastActive: last }
    },
    toggleDevice(device: string) {
      const current = this.deviceStatuses[device] || { active: false, lastActive: '—' }
      this.deviceStatuses[device] = { active: !current.active, lastActive: current.lastActive }
    },
    initStatusesFromRows() {
      this.rows.forEach(r => this.markActive(r.device, r.time))
    },
  },
})


