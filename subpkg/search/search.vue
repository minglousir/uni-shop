<template>
	<view class="search-content">
		<view class="search-box">
			<!-- 使用 uni-ui 提供的搜索组件 -->
			<uni-search-bar @input="input" :radius="100" cancelButton="none" placeholder="请输入搜索内容" :focus="true">
			</uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
				<uni-icons type="search" class="search-icon" size="16"></uni-icons>
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text class="title">搜索历史</text>
				<uni-icons type="trash" size="25" @click="clean"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list" @click="gotoGoodsList($event)">
				<uni-tag :text="item" v-for="(item, i) in histories" :key="i" :data-kw="item"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器的 timerId 
				timer: null,
				// 搜索关键词 
				kw: '',
				// 搜索结果
				searchResults: [],
				// 搜索历史的数组
				historyList: []
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
			input(e) {
				// 清除 timer 对应的延时器 
				clearTimeout(this.timer)
				// 重新启动一个延时器，并把 timerId 赋值给 this.timer 
				this.timer = setTimeout(() => {
					// 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值 
					this.kw = e
					// console.log(this.kw)
					// 根据关键词，查询搜索建议列表 
					this.getSearchList()
				}, 500)
			},
			// 根据搜索关键词，搜索商品建议列表,委托也行,但是注意不同端的不过采用通用方法
			async getSearchList() {
				// 判断关键词是否为空 
				if (this.kw === '') {
					this.searchResults = []
					return
				}
				// 发起请求，获取搜索建议列表
				const {
					data: res
				} = await uni.$API.reqGoodsQsSearchList({
					query: this.kw
				})
				res.meta.status !== 200 ? uni.$showMsg() : this.searchResults = res.message
				this.saveSearchHistory()
			},
			gotoDetail(goods_id) {
				uni.navigateTo({
					// 指定详情页面的 URL 地址，并传递 goods_id 参数 
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
				})
			},
			saveSearchHistory() {
				// this.historyList.push(this.kw)

				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)

				this.historyList = Array.from(set)

				// 对搜索历史数据，进行持久化的存储
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			clean() {
				this.historyList = []
				uni.setStorageSync('kw', '[]')
			},
			gotoGoodsList(e) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + e.target.dataset.kw
				})
			}
		},
		computed: {
			histories() {
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	// 懒得找
	.uni-searchbar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		position: relative;
		padding: 16rpx;
		/* 将默认的 #FFFFFF 改为 #C00000 */
		background-color: #c00000;
	}

	.sugg-list {
		padding: 0 25rpx;
		background-color: #fff;

		.sugg-item {
			font-size: 12px;
			padding: 25rpx 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.search-icon {
				padding-right: 10rpx;
			}

			.goods-name {
				flex: 1;
				text-align: left;
				// 文字不允许换行（单行文本）
				white-space: nowrap;
				// 溢出部分隐藏 
				overflow: hidden;
				// 文本溢出后，使用 ... 代替 
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-box {
		padding: 0 25rpx;

		.history-title {
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			align-items: center;
			font-size: 36rpx;
			border-bottom: 1px solid #efefef;

			.title {
				font-weight: 600;
			}
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;
			margin-top: 30rpx;

			.uni-tag {
				margin-top: 10rpx;
				margin-right: 10rpx;
			}
		}
	}
</style>
