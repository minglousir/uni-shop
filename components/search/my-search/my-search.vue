<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}">
		<!-- 使用 view 组件模拟 input 输入框的样式 -->
		<view class="my-search-box" :style="{'border-radius':radius+'px'}" @click="searchBoxHandler">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			bgcolor: {
				type: String,
				default: '#C00000'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		data() {
			return {

			};
		},
		methods: {
			// 点击了模拟的 input 输入框 
			searchBoxHandler() {
				// 触发外界通过 @click 绑定的 click 事件处理函数 
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		height: 100rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
	}

	.my-search-box {
		height: 72rpx;
		background-color: #ffffff;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.placeholder {
			font-size: 30rpx;
			margin-left: 10rpx;
		}
	}
</style>
