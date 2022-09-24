<template>
	<!-- 最外层的容器 -->
	<view class="my-settle-container" v-if="cart.length !== 0">
		<!-- 全选区域 -->
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullChecked" /><text>全选</text>
		</label> <!-- 合计区域 -->
		<view class="amount-box"> 合计:<text class="amount">{{checkedGoodsAmount}}</text> </view> <!-- 结算按钮 -->
		<view class="btn-settle">结算({{checkedCount}})</view>
	</view>
	<!-- 空白购物车区域 -->
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image> <text class="tip-text">空空如也~</text>
	</view>
</template>
<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		computed: {
			...mapGetters('cart', ['checkedCount', 'cartGoodsTotal', 'checkedGoodsAmount']),
			// 是否全选
			isFullChecked() {
				return this.checkedCount === this.cartGoodsTotal
			}
		},
		methods: {
			...mapActions('cart', ['updateAllGoodsState']),
			changeAllState() {
				this.updateAllGoodsState(!this.isFullChecked)
			}
		},

	}
</script>
<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount {
			color: #c00000;
		}

		.btn-settle {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;

		.empty-img {
			width: 90px;
			height: 90px;
		}

		.tip-text {
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
</style>
