import {
	setStorage,
	removeStorage,
	getStorageSync
} from '@/utils/useStorage.js'

const getDefaultState = () => {
	return {
		address: getStorageSync('address'),
		// token
		token: uni.getStorageSync('token') || '',
		// 用户的基本信息 
		userinfo: getStorageSync('userinfo'),
		// 重定向的 object 对象 { openType, from } 
		redirectInfo: null,
	}
}

const state = getDefaultState()


const mutations = {
	// 更新收货地址(这里只是教你如何定位而已,但是常规的输入其实不难)
	updateAddress(state, address) {
		state.address = address

		this.commit('user/saveAddressToStorage')
	},
	// 持久化存储 address
	saveAddressToStorage(state) {
		setStorage('address', state.address, uni.$showMsg("成功添加地址"))
	},
	// 更新用户的基本信息
	updateUserInfo(state, userinfo) {
		state.userinfo = userinfo
		// 将 userinfo 对象持久化存储到本地
		setStorage('userinfo', state.userinfo)
	},
	// 更新 token 字符串 
	updateToken(state, token) {
		state.token = token
		// 将 token 字符串持久化存储到本地 
		setStorage('token', state.token)
	},
	// 更新重定向的信息对象 
	updateRedirectInfo(state, info) {
		state.redirectInfo = info
	},
}
// 处理逻辑
const actions = {

}

const getters = {

	addstr(state) {
		if (!state.address.provinceName) return ''

		return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
			.detailInfo
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
