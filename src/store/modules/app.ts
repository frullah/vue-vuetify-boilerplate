import { Module } from 'vuex'
import { NavigationItem } from '@/types'

export default {
  namespaced: true,
  mutations: {
    SET_NAVIGATION_ITEMS (state, payload: NavigationItem[]) {
      state.navigationItems = payload
    },
    DRAWER (state, show: boolean) {
      state.drawer = (show === true)
    }
  },
  state: {
    navigationItems: [],
    drawer: false
  }
} as Module<
  {
    navigationItems: NavigationItem[],
    drawer: boolean
  },
  {
  }
>
