import api from '@/api'
import { AxiosResponse } from 'axios'
import { OK } from 'http-status-codes'
import { Module } from 'vuex'

export default {
  namespaced: true,
  actions: {
    LOGOUT ({ state, commit }) {
      commit('CLEAR_TOKEN')
      commit('app/SET_NAVIGATION_ITEMS', null, { root: true })
    },
    async LOGIN (
      { dispatch },
      { identifier, password }: { identifier: string, password: string }
    ) {
      const { data } = await api.post('auth', { identifier, password })
      return dispatch('FETCH', data.token)
    },
    async FETCH ({ state, commit }, token: string) {
      const authorization = `Bearer ${token}`
      let user: AxiosResponse<any>
      try {
        user = await api.get('auth/data', {
          headers: {
            authorization
          }
        })
      } catch (error) {
        window.localStorage.removeItem('token')
        throw error
      }

      if (user.status === OK) {
        api.defaults.headers.authorization = authorization

        state.data = await user.data
        state.token = token
        window.localStorage.setItem('token', token)

        const { default: loadRoute } = await import('@/router/load-route')
        await loadRoute()
      }

      return user
    },
    async LOAD_SESSION ({ dispatch, state, commit }) {
      const token = window.localStorage.getItem('token')
      return token && dispatch('FETCH', token)
    }
  },
  getters: {
    isLoggedIn: (state) => state.token !== null,
    name (state) {
      const { data } = state
      if (data === null) { return null }
      if (data.lastName === null) { return data.firstName }
      return `${data.firstName} ${data.lastName}`
    }
  },
  mutations: {
    CLEAR_TOKEN (state) {
      state.token = null
      state.data = null
      window.localStorage.removeItem('token')
      delete api.defaults.headers.authorization
    }
  },
  state: {
    token: null,
    data: {
      firstName: null,
      lastName: null,
      roles: null,
      username: null
    }
  }
} as Module<
  {
    token: string | null
    data: {
      username: string | null,
      roles: string | null,
      firstName: string | null,
      lastName: string | null
    } | null
  },
  {

  }
>
