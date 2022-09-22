<template>
	<view>
		<!-- 轮播图区域 这里出现渲染层出错是因为有些商品没有图片,代码是没问题,也不是编译器问题-->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goods_info.pics" :key="i">
				<!-- 这里即使设置默认图片也不能完全解决问题,因为有些url本来就已经不存在了 -->
				<image :src="item.pics_big || defaultPic" @click="preview(i)" />
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price" v-if="goods_info.goods_name">￥{{goods_info.goods_price.toFixed(2)}}</view>
			<!-- 信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 解决名字闪烁-->
				<view class="goods-name" v-if="goods_info.goods_name">{{goods_info.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons> <text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递：免运费</view>
			<!-- 商品详情信息 -->
			<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		</view>
		<!-- 商品导航组件 -->
		<view class="goods_nav">
			<!-- fill 控制右侧按钮的样式 -->
			<!-- options 左侧按钮的配置项 -->
			<!-- buttonGroup 右侧按钮的配置项 -->
			<!-- click 左侧按钮的点击事件处理函数 -->
			<!-- buttonClick 右侧按钮的点击事件处理函数 -->
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 商品详情对象 
				goods_info: {},
				// 默认的空图片
				defaultPic: '../../static/images/defaultImg.jpg',
				// 左侧按钮组的配置对象 
				options: [{
					icon: 'shop',
					text: '店铺'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				// 右侧按钮组的配置对象 
				buttonGroup: [{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				}, {
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}]
			}
		},
		onLoad(options) {
			// 获取商品 Id 
			const goods_id = options.goods_id
			// 调用请求商品详情数据的方法 
			this.getGoodsDetail(goods_id)
		},
		methods: {
			// 定义请求商品详情数据的方法 
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$API.reqGoodsDetail({
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				// 为 data 中的数据赋值 
				// 使用字符串的 replace() 方法，将 webp 的后缀名替换为 jpg 的后缀名 
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;" ').replace(/webp/g, 'jpg')
				this.goods_info = res.message
			},
			// 实现轮播图的预览效果 
			preview(i) {
				// 调用 uni.previewImage() 方法预览图片 
				uni.previewImage({
					// 预览时，默认显示图片的索引 
					current: i,
					// 所有图片 url 地址的数组 
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},
			// 左侧按钮的点击事件处理函数 
			onClick(e) {
				// console.log(e)
				if (e.content.text === '购物车') {
					// 切换到购物车页面 
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			}
		}

	}
</script>

<style lang="scss">
	swiper {
		// 全局样式被我修改了
		height: 750rpx !important;
	}

	// 商品信息区域的样式 
	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				padding-right: 10px;
			}

			// 收藏区域
			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		// 运费 
		.yf {
			margin: 10px 0;
			font-size: 12px;
			color: gray;
		}
	}

	.goods-detail-container {
		// 给页面外层的容器，添加 50px 的内padding， 
		// 防止页面内容被底部的商品导航组件遮盖 
		padding-bottom: 50px;
	}

	.goods_nav {
		// 为商品导航组件添加固定定位 
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
