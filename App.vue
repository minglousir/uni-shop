<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	// @import '@/static/customicons.css';

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}

	/* 初始化标签,并指定盒子模型 */
	page,
	view,
	text,
	swiper-item,
	image,
	navigator {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	page {
		--themeColor: #eb2d21;
		--backgroundColor: #eeedeb;
		--deepFontColor: #343434;
		--fontColor: #5a5a5a;
		/* 默认设置 */
		color: var(--fontColor);
		background-color: var(--backgroundColor);
		font-size: 28rpx;
		height: 100%;
	}
</style>
