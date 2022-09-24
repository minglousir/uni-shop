<template>
	<view>
		<!-- 收货地址 -->
		<my-address />
		<!-- 购物车商品列表的标题区域 -->
		<view class="cart-title">
			<!-- 左侧的图标 -->
			<uni-icons type="shop" size="24"></uni-icons>
			<!-- 描述文本 -->
			<text class="cart-title-text">购物车(共<text style="color: red;">{{cartGoodsTotal}}</text>件商品)</text>
		</view>
		<!-- 商品列表区域 -->
		<!-- uni-swipe-action 是最外层包裹性质的容器 -->
		<!-- 此处出现了一个不过,在模拟器出现 uni-swipe-action引起窗口形变,大量测试修改,无法解决,但是在真极没有这种问题-->
		<uni-swipe-action>
			<block v-for="(goods, i) in cart" :key="i">
				<!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
				<!-- :autoClose = "false" 自动关闭新版会直接报错 -->
				<uni-swipe-action-item @click="swipeActionClickHandler(goods)" :right-options="options"
					:autoClose="false">
					<!-- 注:组件的方法不可合并,要对外提供清晰的接口,方便复用 -->
					<GoodListItem :goods="goods" :show-radio="true" :show-num="true"
						@radio-change="updateGoodsInfoHandler" @num-change="updateGoodsInfoHandler" />
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<!-- 结算区域 -->
		<my-settle />
	</view>
</template>

<script>
	// 导入自己封装的 mixin 模块 
	import badgeMix from '@/mixins/tabbar-badge.js'
	// 可以封装一个通用的方法更方便获得store的内容
	import {
		mapState,
		mapActions,
		mapGetters
	} from 'vuex'
	import GoodListItem from '@/components/goodsListItem/goodsListItem.vue'
	import myaddress from '@/components/my-address/my-address.vue'
	import mysettle from '@/components/my-settle/my-settle.vue'
	// 组件引入说明,如果你放到uni_modules下,并且uni_modules/组件名称/组件名称.vue 目录结构
	// 你不需要引入就可以使用,当我习惯放在components下,习惯自己引入
	export default {
		// 将 badgeMix 混入到当前的页面中进行使用 
		mixins: [badgeMix],
		components: {
			GoodListItem,
			myaddress,
			mysettle
		},
		data() {
			return {
				options: [{
					text: '删除',
					// 显示的文本内容 
					style: {
						backgroundColor: '#C00000', // 按钮的背景颜色 
					}
				}]
			}
		},
		computed: {
			...mapState('cart', ['cart']),
			...mapGetters('cart', ['cartGoodsTotal'])
		},
		methods: {
			...mapActions('cart', ['updateGoodsInfo', 'removeGoodsById']),
			// 商品的勾选状态发生了变化 
			updateGoodsInfoHandler(e) {
				// console.log(e)
				// 输出得到的数据 -> {goods_id: 395, goods_state: false} 
				this.updateGoodsInfo(e)
			},
			// 点击了滑动操作按钮 
			swipeActionClickHandler(goods) {
				this.removeGoodsById(goods.goods_id)
			}
		}
	}
</script>

<style lang="scss">
	.cart-title {
		height: 80rpx;
		display: flex;
		align-items: center;
		font-size: 32rpx;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 20rpx;
		}

		.cart-container {
			padding-bottom: 100rpx;
		}
	}
</style>
