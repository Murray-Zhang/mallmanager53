// 插件
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

const MyHttpServer = {}

MyHttpServer.install = function (Vue, options) {
  // 4. 添加实例方法
  Vue.prototype.$http = axios
}

export default MyHttpServer
