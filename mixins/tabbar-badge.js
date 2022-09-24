import {
	mapGetters
} from 'vuex'
// 简单说明,则需要挂载到每个tabbar页面,不可以只挂载到home和cart,因为用户可能通过链接进来,或者直接挂到app
export default {
	computed: {
		...mapGetters('cart', ['cartGoodsItemTotal'])
	},
	watch: {
		cartGoodsItemTotal() {
			this.setBadge()
		}
	},
	onShow() {
		this.setBadge()
	},
	methods: {
		setBadge() {
			uni.setTabBarBadge({
				index: 2,
				text: this.cartGoodsItemTotal + ''
			})
		}
	}
}
