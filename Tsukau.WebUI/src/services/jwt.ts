import type AuthenticationDto from '@/models/api/AuthenticationDto'

import { decodeJwt } from 'jose'

import { useRouter } from 'vue-router'
import i18n from '@/i18n'

import { postUnauthenticated } from '@/services/http'

import { useAccountStore } from '@/stores/account'
import { useAlertStore } from '@/stores/alert'

const { t } = i18n.global

export function isTokenExpired() {
  const accountStore = useAccountStore()

  // No token saved
  if (accountStore.accessToken?.length === 0 || accountStore.refreshToken?.length === 0)
    return true

  const jwt = decodeJwt(accountStore.accessToken)

  // No expiration date set, assume expired
  if (!jwt.exp)
    return true

  // Token expired
  if (jwt?.exp <= Math.floor(Date.now() / 1000))
    return true

  return false
}

export async function refreshTokens() {
  // Token is expired, try to refresh it using refresh token
  // TODO: maybe keep refresh token validity somewhere too, so we can go straight to login
  console.log('Token expired, refreshing...')

  const accountStore = useAccountStore()
  const alertStore = useAlertStore()

  const router = useRouter()

  // Send request
  const res = await postUnauthenticated<AuthenticationDto, AuthenticationDto>('/token/refresh', {
    accessToken: accountStore.accessToken,
    refreshToken: accountStore.refreshToken,
  }).catch(() => {
    alertStore.addAlert({
      color: 'red',
      text: t('alert.expired_token'),
    })
    router.push({ name: 'login' })
  })

  // Refresh successful
  if (res) {
    accountStore.login(res.accessToken, res.refreshToken)
    /* alertStore.addAlert({
      color: 'green',
      text: t('alert.successfully_logged_in'),
    }) */
  }
  else {
    // Couldn't refresh token
    router.push({ name: 'login' })
  }
}
