<template>
	<view>
		<view class="goods-list">
			<!-- <block/> 并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。 -->
			<view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
				<GoodsListItem :goods="goods" :defaultPic="defaultPic" />
			</view>
		</view>
	</view>
</template>

<script>
	import GoodsListItem from '@/components/goodsListItem/goodsListItem.vue'
	export default {
		components: {
			GoodsListItem
		},
		data() {
			return {
				// 默认的空图片 ,最好不要直接拿网上链接,会被拦截
				defaultPic: '../../static/images/defaultImg.jpg',
				// 请求参数对象
				queryObj: {
					// 不存在发请求的时候会自动剔除
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10,
				},
				// 商品列表的数据
				goodsList: [],
				// 总数量，用来实现分页 
				total: 0,
				// 是否正在请求数据 
				isloading: false,
			};
		},
		onLoad(options) {
			// 将页面参数转存到 this.queryObj 对象中 
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		// 触底的事件 
		onReachBottom() {
			// 判断是否还有下一页数据 
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
			if (this.isloading) return
			// 让页码值自增 +1 
			this.queryObj.pagenum += 1
			// 重新获取列表数据 
			this.getGoodsList()
		},
		// 下拉刷新的事件 
		onPullDownRefresh() {
			// 1. 重置关键数据 
			this.queryObj.pagenum = 1
			this.total = 0
			this.isloading = false
			this.goodsList = []
			// 2. 重新发起请求 
			this.getGoodsList(() => uni.stopPullDownRefresh())
		},
		methods: {
			// 获取商品列表数据的方法 
			async getGoodsList(cb) {
				// ** 打开节流阀 
				this.isloading = true
				// 发起请求 
				const {
					data: res
				} = await uni.$API.reqGoodsSearchList(this.queryObj)
				if (res.meta.status !== 200) return uni.$showMsg()
				this.isloading = false
				// 短路
				cb && cb()
				// 为数据赋值,最好设置虚拟列表
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
			},
			// 点击跳转到商品详情页面 
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
