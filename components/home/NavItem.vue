<template>
	<view class="nav-list">
		<view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
			<image :src="item.image_src" class="nav-img"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "NavItem",
		props: {
			navList: Array,
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
	// 分类导航的数据列表
	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 30rpx 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}
</style>
