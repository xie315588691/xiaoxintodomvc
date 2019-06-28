import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/base.css'
import './assets/css/index.css'

window.app = new Vue({
  el: '#app',

  render: h => h(App),
  router
})
