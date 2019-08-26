import './plugins/vuetify'
import './registerServiceWorker'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'

import { install as VeeValidate, Validator } from 'vee-validate'
import { required, min, max, email, length } from 'vee-validate/dist/rules.esm'
import veeEn from 'vee-validate/dist/locale/en'

import Vue from 'vue'
import './plugins/vuetify'

import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import i18n from './i18n'

Validator.extend('required', required)
Validator.extend('max', max)
Validator.extend('min', min)
Validator.extend('email', email)
Validator.extend('length', length)

Validator.localize('en', veeEn)

Vue.config.productionTip = false
Vue.use(VeeValidate)

new Vue({
  router,
  store,
  vuetify: new Vuetify({
    icons: {
      iconfont: 'md'
    }
  }),
  i18n,
  render: h => h(App)
}).$mount('#app')

if (module.hot) {
  module.hot.accept()
}
