import {
	setStorage,
	removeStorage,
	getStorageSync
} from '@/utils/useStorage.js'

const getDefaultState = () => {
	return {
		cart: getStorageSync('cart')
	}
}

const state = getDefaultState()

// 正常来说这里只负责修改数据,逻辑基本交给action处理
const mutations = {
	SAVETOSTORAGE(state, flag) {
		// 这里写得有点麻烦,但是不这样写代码灵活性太差
		let msg = flag ? uni.$showMsg("成功加入购物车") : ''
		setStorage('cart', state.cart, msg)
	},
	ADDTOCART(state, goods) {
		// 根据提交的商品的Id， 查询购物车中是否存在这件商品,
		// 这个单独拿出来主要是逻辑与其它的不同,而且它其实属于goodsdetail使用的方法
		// 如果不存在， 则 findResult 为 undefined； 否则， 为查找到的商品信息对象
		const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
		if (!findResult) {
			// 如果购物车中没有这件商品，则直接 push 
			state.cart.push(goods)
		} else {
			// 如果购物车中有这件商品，则只更新数量即可
			findResult.goods_count++
		}
		this.commit('cart/SAVETOSTORAGE', true)
	},
}
// 处理逻辑
const actions = {
	// 更新购物车中商品的数量,和选中状态
	updateGoodsInfo({
		state,
		commit
	}, goods) {
		// 根据 goods_id 查询购物车中对应商品的信息对象
		// 这里不是返回一个全新的对象,值是指向原来那片空间的
		// 这里两个方法很像就是根据id该信息,可用合并
		let {
			goods_id,
			...attr
		} = goods
		const findResult = state.cart.find(x => x.goods_id === goods_id)
		if (findResult) {
			// 更新对应商品的数量
			let keylist = Object.keys(attr)
			keylist.length && keylist.forEach(item => {
				findResult[item] = attr[item]
			})
			// 持久化存储到本地 
			commit('SAVETOSTORAGE')
		}
	},
	// 根据 Id 从购物车中删除对应的商品信息 (也可以写道上面但是不适合,维护不友好)
	removeGoodsById({
		state,
		commit
	}, goods_id) {
		// 调用数组的 filter 方法进行过滤 
		state.cart = state.cart.filter(x => x.goods_id !== goods_id)
		// 持久化存储到本地 
		commit('SAVETOSTORAGE')
	},
	// 更新所有商品的勾选状态 
	updateAllGoodsState({
		state,
		commit
	}, newState) {
		// 循环更新购物车中每件商品的勾选状态 
		state.cart.forEach(x => x.goods_state = newState)
		// 持久化存储到本地 
		commit('SAVETOSTORAGE')
	}
}

const getters = {
	// 统计购物车中商品的总数量 
	cartGoodsTotal(state) {
		let temp = 0
		// 循环统计商品的数量，累加到变量 c 中 , 用reduce也是不错的选择
		state.cart.forEach(goods => temp += goods.goods_count)
		return temp
	},
	cartGoodsItemTotal(state) {
		return state.cart.length
	},
	// 勾选的商品的总数量 
	checkedCount(state) {
		// 先使用 filter 方法，从购物车中过滤器已勾选的商品 
		// 再使用 reduce 方法，将已勾选的商品总数量进行累加 
		// reduce() 的返回值就是已勾选的商品的总数量
		return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
	},
	// 已勾选的商品的总价 
	checkedGoodsAmount(state) {
		// 先使用 filter 方法，从购物车中过滤器已勾选的商品 
		// 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加 
		// reduce() 的返回值就是已勾选的商品的总价 
		// 最后调用 toFixed(2) 方法，保留两位小数 
		return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item
			.goods_price, 0).toFixed(2)
	}

}
export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
