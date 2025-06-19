import type SettingsState from '@/models/internal/states/SettingsState'

import { defineStore } from 'pinia'

const IGNORED_SETTINGS: string[] = []

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    darkTheme: false,
    accentColor: 'deep-purple',
  }),

  actions: {
    /**
     * Saves the current state to the local storage.
     */
    saveSettings() {
      const settings: Record<string, any> = {}

      for (const [key, value] of Object.entries(this.$state)) {
        if (IGNORED_SETTINGS.includes(key))
          continue
        settings[key] = value
      }

      try {
        localStorage.setItem('settings', JSON.stringify(settings))
        console.log('Settings saved')
      }
      catch (error) {
        console.error('Failed to save settings...', error)
      }
    },

    /**
     * Loads settings fron the local storage.
     * If settings were never saved or that the state in local storage is bad,
     * then the default settings are saved.
     * TODO: would be nice to have proper validation
     */
    loadSettings() {
      const settings = localStorage.getItem('settings')
      // Check that we have at least two characters ('{}' or '[]' is ok)
      if (settings != null && settings.length >= 2) {
        try {
          this.$patch(JSON.parse(settings))
          console.log('Settings loaded')
        }
        catch {
          // Settings are butchered, overwrite with default config
          console.warn('Failed to load settings, overwriting...')
          this.saveSettings()
        }
      }
      else {
        // Settings were never saved, just populate with default config
        console.log('Initializing settings...')
        this.saveSettings()
      }
    },
  },
})