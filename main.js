// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 导入$API
import * as $API from "@/api/api"

uni.$API = $API

// 提示框
uni.$showMsg = (title = "获取数据失败！", duration = 1500, icon = 'none') => {
	uni.showToast({
		title,
		duration,
		icon
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
