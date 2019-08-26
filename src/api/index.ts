import axios, { AxiosError, AxiosResponse } from 'axios'
import { UNAUTHORIZED } from 'http-status-codes'
import store from '@/store'

export const accessTokenHeader = 'X-Access-Token'
export const refreshTokenHeader = 'X-Refresh-Token'

const api = axios.create({
  baseURL: `http://localhost:3000`
})

api.interceptors.response.use(responseInterceptor, responseErrorInterceptor)

async function responseInterceptor (response: AxiosResponse) {
  if (response.headers !== undefined) {
    if (accessTokenHeader in response.headers) {
      api.defaults.headers[accessTokenHeader] =
      response.headers[accessTokenHeader]
    }

    if (refreshTokenHeader in response.headers) {
      api.defaults.headers[refreshTokenHeader] =
      response.headers[refreshTokenHeader]
    }
  }

  return response
}

async function responseErrorInterceptor (error: AxiosError) {
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

export default api
