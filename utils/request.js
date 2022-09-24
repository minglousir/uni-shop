// 导入网络请求包 
import {
	$http
} from '@escook/request-miniprogram'

import {
	Hosts
} from '@/env/env.js'
// store
import store from '@/store/index.js'
let baseUrl = ""

switch (process.env.NODE_ENV) {
	case 'development':
		baseUrl = Hosts.Dev.BaseUrl;
		break;
	case 'production':
		baseUrl = Hosts.Prod.BaseUrl;
		break;
	default:
		baseUrl = Hosts.Prod.BaseUrl;
		break;
}


$http.baseUrl = baseUrl

// 请求开始之前做一些事情 
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...',
	})
	// 判断请求的是否为有权限的 API 接口 
	if (options.url.indexOf('/my/') !== -1) {
		// 为请求头添加身份认证字段 
		options.header = {
			// 字段的值可以直接从 vuex 中进行获取 
			Authorization: store.state.user.token,
		}
	}
}
// 请求完成之后做一些事情 
$http.afterRequest = function() {
	uni.hideLoading()
}

export default $http
