import {
	setStorage,
	removeStorage,
	getStorageSync
} from '@/utils/useStorage.js'

const getDefaultState = () => {
	return {
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
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
	}
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
