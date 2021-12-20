import Vue from 'vue'
import router from '@/router'

import './setup.js'
import '@/assets/scss/main.scss'

import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$globalModalData = { level:0 }

export const bus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
