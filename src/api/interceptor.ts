import store from '@/store'
import { AxiosError } from 'axios'
import { UNAUTHORIZED } from 'http-status-codes'

import api from '.'

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { response } = error

    if (response === undefined || response.status !== UNAUTHORIZED) throw error

    const { url, data } = response.config
    if (url === undefined || !url.endsWith('/auth/data')) {
      await store.dispatch('user/LOGOUT')
      throw error
    }

    try {
      await store.dispatch('user/REFRESH_TOKEN')
    } catch {
      throw error
    }

    return api.request({
      data: data,
      url: url,
      method: url
    })
  }
)
