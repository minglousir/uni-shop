<template>
	<!-- 轮播图区域 -->
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		<!-- 循环渲染轮播图的 item 项 -->
		<swiper-item v-for="(item, i) in swiperList" :key="i">
			<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail? goods_id=${item.goods_id}`">
				<!-- 动态绑定图片的 src 属性 -->
				<image :src="item.image_src" />
			</navigator>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		name: "Swiper",
		props: {
			swiperList: Array,
		}
	}
</script>

<style lang="scss">
	swiper {
		padding: 15rpx 0;

		.swiper-item {
			padding: 0 15rpx;
		}

		.swiper-item,
		image {
			border-radius: 30rpx;
		}
	}
</style>
