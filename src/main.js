import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
//引入全局图标库
import "./assets/font/iconfont.css"
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
