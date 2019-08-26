import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user
  },
  strict: process.env.NODE_ENV !== 'production'
  // TODO: Enable when deploy
  // plugins: [createPersistedState()]
})

export default store
