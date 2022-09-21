<template>
	<view class="floor-list">
		<!-- 楼层 item 项 -->
		<view class="floor-item" v-for="(item, i) in floorList" :key="i">
			<!-- 楼层标题 -->
			<image :src="item.floor_title.image_src" class="floor-title"></image>
			<!-- 楼层图片区域 -->
			<view class="floor-img-box">
				<!-- 左侧大图片的盒子 -->
				<!--冒泡好一点 -->
				<navigator class="left-img-box" :url="item.product_list[0].url">
					<image :src="item.product_list[0].image_src"
						:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
				</navigator>
				<!-- 右侧 4 个小图片的盒子 -->
				<view class="right-img-box">
					<navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0"
						:url="item2.url">
						<image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}">
						</image>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Floor",
		props: {
			floorList: Array,
		},
		methods: {
			// nav-item 项被点击时候的事件处理函数
			navClickHandler(item) {
				// 判断点击的是哪个 nav 
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	// 楼层区
	.floor-list {
		.floor-title {
			height: 60rpx;
			width: 100%;
			display: flex;
		}

		.right-img-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}

		.floor-img-box {
			display: flex;
			padding-left: 10rpx;
		}
	}
</style>
