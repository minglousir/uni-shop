<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域,不加$event在pc正常,在小程序直接报错-->
			<scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}" @click="activeChanged($event)">
				<block v-for="(item, i) in cateList" :key="i">
					<view :class="['left-scroll-view-item', i === active ? 'active' : '']" :data-idx="i">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧的滚动视图区域 -->
			<scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
					<view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
					<!-- 动态渲染三级分类的列表数据 -->
					<view class="cate-lv3-list" @click="gotoGoodsList($event)">
						<!-- 三级分类 Item 项 -->
						<view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3">
							<!-- 图片 data-goodsId都设置可用保持和原来效果一致-->
							<image :src="item3.cat_icon" :data-goodsId="item3.cat_id"></image>
							<!-- 文本 -->
							<text :data-goodsId="item3.cat_id">{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				// 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度 
				wh: 0,
				// 分类数据列表 
				cateList: [],
				// 当前选中项的索引，默认让第一项被选中 
				active: 0,
				// 二级分类列表 
				cateLevel2: [],
				// 滚动条距离顶部的距离 
				scrollTop: 0
			};
		},
		onLoad() { // 获取当前系统的信息 
			const sysInfo = uni.getSystemInfoSync()
			// 为 wh 窗口可用高度动态赋值 
			this.wh = sysInfo.windowHeight
			// 调用获取分类列表数据的方法 
			this.getCateList()
		},
		methods: {
			async getCateList() {
				const {
					data: res
				} = await uni.$API.reqPublicCategoriesList()
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message // 为二级分类赋值 
				this.cateLevel2 = res.message[0].children
			},
			// 选中项改变的事件处理函数 
			activeChanged(e) {
				let i = e.target.dataset.idx
				this.active = i
				this.cateLevel2 = this.cateList[i].children
				// 让 scrollTop 的值在 0 与 1 之间切换 
				this.scrollTop = this.scrollTop ? 0 : 1
			},
			// 点击三级分类项跳转到商品列表页面 
			gotoGoodsList(e) {
				// 阻止点击空白区跳转
				if (!e.target.dataset.goodsid) return
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + e.target.dataset.goodsid
				})
			}
		}
	}
</script>
<style lang="scss">
	.scroll-view-container {
		display: flex;
		height: 100vh;

		.left-scroll-view {
			width: 240rpx;

			/* 去除滚动条 */
			::-webkit-scrollbar {
				display: none;
				width: 0;
				height: 0;
				color: transparent;
			}

			.left-scroll-view-item {
				line-height: 120rpx;
				background-color: #f7f7f7;
				text-align: center;
				font-size: 24rpx;

				// 激活项的样式 
				&.active {
					background-color: #ffffff;
					position: relative;

					// 渲染激活项左侧的红色指示边线 
					&::before {
						content: '';
						display: block;
						width: 6rpx;
						height: 60rpx;
						background-color: #c00000;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}
	}

	.cate-lv2-title {
		font-size: 24rpx;
		font-weight: bold;
		text-align: center;
		padding: 30rpx 0;
	}

	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;

		.cate-lv3-item {
			width: 33.33%;
			margin-bottom: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 120rpx;
				height: 120rpx;
			}

			text {
				font-size: 24rpx;
			}
		}
	}
</style>
