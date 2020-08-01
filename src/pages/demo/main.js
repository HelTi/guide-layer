import Vue from 'vue'
import App from './App.vue'
import eGuideLayer from '../../../dist/e-guide-layer.umd'
import '../../../dist/e-guide-layer.css'
Vue.use(eGuideLayer)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
