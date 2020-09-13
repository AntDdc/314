import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入页面初始化CSS
import '@/styles/index.css'
// 引入rem配置
import remConfig from '@/utils/rem.js'
// 引入elementUi框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入路由守卫
import '@/utils/promission'
// 挂载elementUi
Vue.use(ElementUI)
Vue.config.productionTip = false
// 启用rem配置
remConfig()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
