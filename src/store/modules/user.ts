import api, { accessTokenHeader, refreshTokenHeader } from '@/api'
import { AxiosResponse } from 'axios'
import { OK } from 'http-status-codes'
import { Module } from 'vuex'
import router from '@/router'
import { IToken, ILogin } from '@/types'

interface UserData {
  username: string | null,
  role: string | null,
  name: string | null,
}

export default {
  namespaced: true,
  actions: {
    LOGOUT ({ commit }) {
      commit('CLEAR_TOKEN')
      commit('app/SET_NAVIGATION_ITEMS', null, { root: true })
    },
    async LOGIN ({ dispatch }, { username, password }: ILogin) {
      const response = await api.post('/auth/login', { username, password })

      if (response.status !== OK) {
        return response
      }

      return dispatch('FETCH', {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
      })
    },
    async FETCH ({ commit }, { accessToken, refreshToken } : IToken) {
      let user: AxiosResponse<any>
      try {
        user = await api.get('/auth/data', {
          headers: {
            [accessTokenHeader]: accessToken,
            [refreshTokenHeader]: refreshToken
          }
        })
      } catch (error) {
        clearToken()
        throw error
      }

      if (user.status === OK) {
        api.defaults.headers[accessTokenHeader] = accessToken
        window.localStorage.setItem('accessToken', accessToken!)

        api.defaults.headers[refreshTokenHeader] = refreshToken
        window.localStorage.setItem('refreshToken', refreshToken!)

        const { routes, navItems } = await import(`@/router/roles/admin`)
        router.addRoutes(routes)
        commit('SET_USER', { data: user.data, accessToken, refreshToken })
        commit('app/SET_NAVIGATION_ITEMS', navItems, { root: true })
      }

      return user
    },
    async LOAD_SESSION ({ dispatch }) {
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
      delete api.defaults.headers[accessTokenHeader]
      delete api.defaults.headers[refreshTokenHeader]
    },
    SET_USER (state, value: {data: UserData} & IToken) {
      state.data = value.data
      state.accessToken = value.accessToken
      state.refreshToken = value.refreshToken
    }
  },
  state: {
    accessToken: null,
    refreshToken: null,
    data: null
  }
} as Module<
  IToken & {
    data: null | UserData
  },
  {}
>

function clearToken () {
  window.localStorage.removeItem('accessToken')
  window.localStorage.removeItem('refreshToken')
}
