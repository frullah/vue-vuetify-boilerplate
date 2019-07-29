import api from '@/api'
import { AxiosResponse } from 'axios'
import { OK } from 'http-status-codes'
import { Module } from 'vuex'
import router from '@/router'
import { IToken, ILogin } from '@/types'

const accessTokenHeaderName = 'X-Access-Token'
const refreshTokenHeaderName = 'X-Refresh-Token'

export default {
  namespaced: true,
  actions: {
    LOGOUT ({ state, commit }) {
      commit('CLEAR_TOKEN')
      commit('app/SET_NAVIGATION_ITEMS', null, { root: true })
    },
    async LOGIN ({ dispatch }, { identifier, password }: ILogin) {
      const { data } = await api.post('auth', { identifier, password })
      return dispatch('FETCH', {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      } as IToken)
    },
    async FETCH ({ state, commit }, { accessToken, refreshToken } : IToken) {
      let user: AxiosResponse<any>
      try {
        user = await api.get('auth/data', {
          headers: {
            [accessTokenHeaderName]: accessToken,
            [refreshTokenHeaderName]: refreshToken
          }
        })
      } catch (error) {
        clearToken()
        throw error
      }

      if (user.status === OK) {
        state.accessToken = accessToken
        if (accessTokenHeaderName in user.headers) {
          accessToken = user.headers[accessTokenHeaderName]
        }
        if (refreshTokenHeaderName in user.headers) {

        }
        api.defaults.headers[accessTokenHeaderName] = accessToken
        window.localStorage.setItem('accessToken', accessToken!)

        state.refreshToken = refreshToken
        api.defaults.headers[refreshTokenHeaderName] = refreshToken
        window.localStorage.setItem('refreshToken', refreshToken!)

        state.data = user.data
        const { routes, navItems } = await import(`@/router/roles/admin`)
        router.addRoutes(routes)
        commit('app/SET_NAVIGATION_ITEMS', navItems, { root: true })
      }

      return user
    },
    async LOAD_SESSION ({ dispatch, state, commit }) {
      const accessToken = window.localStorage.getItem('accessToken')
      const refreshToken = window.localStorage.getItem('refreshToken')
      if (accessToken !== null && refreshToken !== null) {
        await dispatch('FETCH', { accessToken, refreshToken })
      }
    }
  },
  getters: {
    isLoggedIn: (state) => state.accessToken !== null
  },
  mutations: {
    CLEAR_TOKEN (state) {
      clearToken()

      state.data = null
      state.accessToken = null
      state.refreshToken = null
      delete api.defaults.headers[accessTokenHeaderName]
      delete api.defaults.headers[refreshTokenHeaderName]
    }
  },
  state: {
    accessToken: null,
    refreshToken: null,
    data: null
  }
} as Module<
  IToken & {
    data: null | {
      username: string | null,
      roles: string | null,
      fullName: string | null,
    }
  },
  {}
>

function clearToken () {
  window.localStorage.removeItem('accessToken')
  window.localStorage.removeItem('refreshToken')
}
