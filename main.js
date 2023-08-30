import App from './App'
import Vue from 'vue'

App.mpType = 'app'
Vue.config.productionTip = false

// 通用方法配置
import $api from '@/api/api.js'
import $router from '@/serve/router.js'
import $userServe from '@/serve/userServe.js'
import $hostConfig from '@/config/hostConfig.js'

Vue.prototype.$api = $api; // 请求配置
Vue.prototype.$wxRouter = $router; // 路由配置
Vue.prototype.$hostConfig = $hostConfig; // 路由配置
Vue.prototype.$userServe = $userServe; // 路由配置

import uView from "uview-ui";
Vue.use(uView);

const app = new Vue({
	...App
})
app.$mount()