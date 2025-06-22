import type { FetchOptions } from 'ofetch'

import { ofetch } from 'ofetch'
import { isTokenExpired, refreshTokens } from '@/services/jwt'
import { useAccountStore } from '@/stores/account'

const apiFetch = ofetch.create({
  baseURL: '/api',
  async onRequest({ request, options }) {
    if (isTokenExpired()) {
      await refreshTokens()
    }

    const accountStore = useAccountStore()
    if (accountStore.accessToken?.length > 0) {
      const reqHeaders = options?.headers == null ? new Headers() : new Headers(options.headers)
      reqHeaders.set('Authorization', `Bearer ${accountStore.accessToken}`)
      options.headers = reqHeaders
    }
    console.log('[fetch request]', request, options)
  },
  async onRequestError({ request, error }) {
    console.log('[fetch request error]', request, error)
  },
  async onResponse({ request, response }) {
    console.log('[fetch response]', request, response.status, response.body)
  },
  async onResponseError({ request, response }) {
    console.log('[fetch response error]', request, response.status, response.body)
  },
  headers: {
    'Accept': 'application/json, text/plain',
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

const apiFetchUnauthenticated = ofetch.create({
  baseURL: '/api',
  headers: {
    'Accept': 'application/json, text/plain',
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

export function get<T>(url: string) {
  return apiFetch<T>(url, {
    method: 'GET',
  })
}

export function getUnauthenticated<T>(url: string) {
  return apiFetchUnauthenticated<T>(url, {
    method: 'GET',
  })
}

export function post<U, T>(url: string, body: U) {
  const options: FetchOptions<'json'> = {
    method: 'POST',
  }

  if (body != null)
    options.body = body

  return apiFetch<T>(url, options)
}

export function postUnauthenticated<U, T>(url: string, body: U) {
  const options: FetchOptions<'json'> = {
    method: 'POST',
  }

  if (body != null)
    options.body = body

  return apiFetchUnauthenticated<T>(url, options)
}

export function postWithoutBody<T>(url: string) {
  return apiFetch<T>(url, {
    method: 'POST',
  })
}

export function deletee<U, T>(url: string, body: U) {
  const options: FetchOptions<'json'> = {
    method: 'DELETE',
  }

  if (body != null)
    options.body = body

  return apiFetch<T>(url, options)
}

export function deleteWithoutBody<T>(url: string) {
  return apiFetch<T>(url, {
    method: 'DELETE',
  })
}

export function patch<U, T>(url: string, body?: U) {
  const options: FetchOptions<'json'> = {
    method: 'PATCH',
  }

  if (body != null)
    options.body = body

  return apiFetch<T>(url, options)
}

export function putWithoutBody<T>(url: string) {
  return apiFetch<T>(url, {
    method: 'PATCH',
  })
}
