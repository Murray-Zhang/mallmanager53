// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import MyHttpServer from '@/plugins/http.js'
import moment from 'moment'

// 使用vue插件
Vue.use(ElementUI)
Vue.use(MyHttpServer)

Vue.config.productionTip = false
Vue.filter('fmtDate', function (value) {
  if (!value) return ''
  return moment(value).format('YYYY-MM-DD hh:mm:ss')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
