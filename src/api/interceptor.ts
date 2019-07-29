import store from '@/store'
import { AxiosError } from 'axios'
import { UNAUTHORIZED } from 'http-status-codes'

import api from '.'

api.interceptors.response.use(resp => resp, responseErrorHandler)

async function responseErrorHandler (error: AxiosError) {
  const { response } = error
  if (response === undefined || response.status !== UNAUTHORIZED) throw error

  const { config } = response
  if (config.url === undefined || !config.url.endsWith('/auth/data')) {
    await store.dispatch('user/LOGOUT')
    throw error
  }

  try {
    await store.dispatch('user/REFRESH_TOKEN')
  } catch {
    throw error
  }

  return api.request(config)
}
