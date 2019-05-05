import './plugins/vuetify'
import './registerServiceWorker'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'

import { install as VeeValidate, Validator } from 'vee-validate'
import { required, min, max, email } from 'vee-validate/dist/rules.esm'
import veeEn from 'vee-validate/dist/locale/en'

import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Validator.extend('required', required)
Validator.extend('max', max)
Validator.extend('min', min)
Validator.extend('email', email)

Validator.localize('en', veeEn)

Vue.use(VeeValidate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if (module.hot) {
  module.hot.accept()
}
