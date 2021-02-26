import Vue from 'vue'
import App from './App.vue'

// Import base styles (includes bulma imports)
import './assets/styles/base.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
