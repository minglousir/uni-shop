<template>
	<view class="goods-item">
		<!-- 商品左侧图片区域 -->
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" value="" color="#C00000" v-if="showRadio" @click="radioClickHandler" />
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view> <!-- 商品右侧信息区域 -->
		<view class="goods-item-right">
			<!-- 商品标题 -->
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="tab">
				<!-- 小卡片的样式 -->
				<text class="tab-item" style="display: none;">购物节</text>
			</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">￥{{goods.goods_price.toFixed(2)}}</view>
				<!-- 商品数量 -->
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numberChangeHandler"
					background="#ffeaeb">
				</uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "goodsListItem",
		props: {
			// 商品的信息对象 ,这里的封装和官方的一模一样
			goods: {
				type: Object,
				default: {},
			},
			// 是否展示图片左侧的 radio 
			showRadio: {
				type: Boolean,
				// 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件 
				default: false,
			},
			// 是否展示价格右侧的 NumberBox 组件
			showNum: {
				type: Boolean,
				default: false,
			},
			defaultPic: String
		},
		data() {
			return {

			};
		},
		methods: {
			// 关于为什么不在这里直接修改很简单,组件是独立的,当数据应该是相互依赖的,并不是父子间数据也要从其他地方再来一份
			// radio 组件的点击事件处理函数 
			radioClickHandler() {
				// 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件， 
				// 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数 
				this.$emit('radio-change', {
					// 商品的 Id 
					goods_id: this.goods.goods_id,
					// 商品最新的勾选状态 
					goods_state: !this.goods.goods_state
				})
			},
			// NumberBox 组件的 change 事件处理函数 
			numberChangeHandler(val) {
				// 修改官方组件的bug不需要,因为存在版本差异,以前的bug现在没有了
				// 通过 this.$emit() 触发外界通过 @ 绑定的 num-change 事件 
				this.$emit('num-change', {
					// 商品的 Id 
					goods_id: this.goods.goods_id,
					// 商品的最新数量 
					goods_count: +val
				})
			}

		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 20rpx 10rpx;
		border-bottom: 1px solid #f0d3c7;
		// background-color: #f2f2f2;

		.goods-item-left {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: 10rpx;

			.goods-pic {
				width: 200rpx;
				height: 200rpx;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 26rpx;
			}

			.tab {
				.tab-item {
					color: #c00000;
					font-size: 24rpx;
					border-radius: 4rpx;
					background-color: #ffc2c3;
					padding: 5rpx;
					margin-right: 10rpx;
				}
			}

			.goods-info-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.goods-price {
				font-size: 32rpx;
				color: #c00000;
			}
		}
	}
</style>
