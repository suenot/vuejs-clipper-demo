import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registry'

const VueInputMask = require('vue-inputmask').default
Vue.use(VueInputMask)

import { PaginationPlugin } from 'bootstrap-vue/es/components'
Vue.use(PaginationPlugin)

import VueRx from 'vue-rx'
Vue.use(VueRx)

import VuejsClipper from 'vuejs-clipper'
Vue.use(VuejsClipper)

import vuejsStorage from 'vuejs-storage'
Vue.use(vuejsStorage)

import VeeValidate from 'vee-validate'
import { Validator } from 'vee-validate'

const phoneValid = (value) => {
  var re = /^\+7\s\(\d{3}\)\s\d{3}-\d{4}$/
  return re.test(value)
}
Validator.extend('phoneValid', phoneValid)

Vue.use(VeeValidate, {
  classes: true
})

// import Movue from 'movue'
// import * as mobx from 'mobx'
// Vue.use(Movue, mobx)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
