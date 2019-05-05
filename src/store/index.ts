import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store<{
  app: typeof app.state,
  user: typeof user.state
}>({
  modules: {
    app,
    user
  }
  // strict: process.env.NODE_ENV !== 'production',
  // TODO: Enable when deploy
  // plugins: [createPersistedState()]
})

;(window as any).store = store

export default store
