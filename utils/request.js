// 导入网络请求包 
import {
	$http
} from '@escook/request-miniprogram'

import {
	Hosts
} from '@/env/env.js'

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
}
// 请求完成之后做一些事情 
$http.afterRequest = function() {
	uni.hideLoading()
}

export default $http
