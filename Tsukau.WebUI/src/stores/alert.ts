import type Alert from '@/models/internal/Alert'
import type AlertState from '@/models/internal/states/AlertState'

import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
  state: (): AlertState => ({
    alerts: [],
  }),

  actions: {
    addAlert(alert: Alert) {
      this.alerts.push(alert)
    },
    takeAlert() {
      return this.alerts.shift()
    },
  },
})