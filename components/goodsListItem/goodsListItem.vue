<template>
	<view class="goods-item">
		<!-- 商品左侧图片区域 -->
		<view class="goods-item-left">
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view> <!-- 商品右侧信息区域 -->
		<view class="goods-item-right">
			<!-- 商品标题 -->
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="tab">
				<text class="tab-item">九九购物节</text>
				<text class="tab-item">全场八折</text>
			</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">￥{{goods.goods_price.toFixed(2)}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "goodsListItem",
		props: {
			goods: Object,
			defaultPic: String
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 20rpx 10rpx;
		border-bottom: 1px solid #f0d3c7;
		background-color: #f2f2f2;

		.goods-item-left {
			margin-right: 10rpx;

			.goods-pic {
				width: 200rpx;
				height: 200rpx;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
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

			.goods-price {
				font-size: 32rpx;
				color: #c00000;
			}
		}
	}
</style>
