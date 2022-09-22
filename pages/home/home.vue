<template>
	<view>
		<!-- 搜索组件-这个定位不要放到自定义组件身上,要不会被看成props -->
		<view class="search-box">
			<my-search @click="gotoSearch" />
		</view>
		<!-- 轮播图区域 -->
		<MySwiper :swiperList="swiperList" />
		<!-- 分类导航区域 -->
		<NavItem :navList="navList" />
		<!-- 楼层区域 -->
		<Floor :floorList="floorList" />
	</view>
</template>

<script>
	import MySearch from "@/components/search/my-search/my-search.vue"
	import MySwiper from "@/components/home/MySwiper.vue"
	import NavItem from "@/components/home/NavItem.vue"
	import Floor from "@/components/home/Floor.vue"
	// 小程序不支持这样子引入
	// import {
	// 	importComponents
	// } from "@/utils/importComponents.js"
	// const requireComponent = require.context(
	// 	"@/components/home", //组件所在目录的相对路径
	// 	true, //是否查询其子目录
	// 	/\w+\.vue$/ //匹配基础组件文件名的正则表达式
	// );
	// const comObj = importComponents(requireComponent)
	export default {
		components: {
			MySwiper,
			NavItem,
			Floor,
			MySearch
		},
		data() {
			return {
				// 1. 轮播图的数据列表，默认为空数组 
				swiperList: [],
				// 1.nav导航栏
				navList: [],
				// 1. 楼层的数据列表
				floorList: [],
			}
		},
		onLoad() {
			// 2. 在小程序页面刚加载的时候，调用获取轮播图数据的方法 
			this.getSwiperList()
			// 2. 在 onLoad 中调用获取数据的方法 
			this.getNavList()
			// 2. 在 onLoad 中调用获取楼层数据的方法 
			this.getFloorList()
		},
		methods: {
			// 3. 获取轮播图数据的方法 
			async getSwiperList() {
				// 3.1 发起请求 
				const {
					data: res
				} = await uni.$API.reqHomeSwiperList()
				// 3.2 处理请求结果
				res.meta.status !== 200 ? uni.$showMsg() : this.swiperList = res.message
			},
			// 3. 在 methods 中定义获取数据的方法
			async getNavList() {
				const {
					data: res
				} = await uni.$API.reqHomeCatitemsList()
				res.meta.status !== 200 ? uni.$showMsg() : this.navList = res.message
			},
			// 3. 定义获取楼层列表数据的方法 
			async getFloorList() {
				const {
					data: res
				} = await uni.$API.reqHomeFloordataList()
				if (res.meta.status !== 200) return uni.$showMsg()
				// 通过双层 forEach 循环，处理 URL 地址 
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			},
			// 跳转到分包中的搜索页面
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	// swiper的样式挂载到全局,轮播的样式均采用这个样式
</style>
