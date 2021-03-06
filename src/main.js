// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import VueFire from 'vuefire'

import('vuetify/dist/vuetify.min.css')
import store from './store/store'

if (process.env.NODE_ENV !== 'production') {
  // const runtime = require('serviceworker-webpack-plugin/lib/runtime')
  if ('serviceWorker' in navigator) {
    // runtime.register()
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/dist/service-worker.js').then(registration => {
        console.log('SW registered: ', registration)
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
    })
  }
}

Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.use(VueFire)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
