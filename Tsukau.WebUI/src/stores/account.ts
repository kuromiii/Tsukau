import type AccountState from '@/models/states/AccountState'

import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', {
  state: (): AccountState => ({
    isLoggedIn: false,
    accessToken: '',
    refreshToken: '',
  }),

  actions: {
    login(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this.saveTokens()
    },

    logout() {
      this.clearTokens()
      this.isLoggedIn = false
      this.accessToken = ''
      this.refreshToken = ''
    },

    /**
     * Saves tokens to the local storage.
     */
    saveTokens() {
      localStorage.setItem('refreshToken', this.refreshToken)
      localStorage.setItem('accessToken', this.accessToken)
      console.log('Tokens saved')
    },

    /**
     * Clears tokens from the local storage.
     */
    clearTokens() {
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('accessToken')
      console.log('Tokens cleared')
    },

    /**
     * Loads tokens fron the local storage.
     */
    loadTokens() {
      const refreshToken = localStorage.getItem('refreshToken')

      // Check that the tokens are valid
      if (refreshToken != null) {
        this.refreshToken = refreshToken
        console.log('Refresh token loaded')
      }
      else {
        console.log('Refresh token not present...')
      }

      const accessToken = localStorage.getItem('accessToken')

      // Check that the tokens are valid
      if (accessToken != null) {
        this.accessToken = accessToken
        console.log('Access token loaded')
      }
      else {
        console.log('Access token not present...')
      }
    },
  },
})
