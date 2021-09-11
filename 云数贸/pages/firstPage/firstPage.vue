<template>
	<view class="pages contentBg">
		<view class="main">
			<view class="main-wrapper">
				<image src="../../static/operate/icon-operate-logo.png" mode=""></image>
			</view>
			
			<view class="main-title">
				<text>把握财富机会，成就明日之星</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			timer: null
		};
	},
	onShow() {
		this.timeToLink();
	},
	methods: {
		timeToLink() {
			let that = this;
			that.timer = setTimeout(function() {
				clearTimeout(that.timer);
				// that.$tools.redirectTo('../operate/login');
				// #ifdef H5
				that.$tools.switchTab('../index/index');
				// #endif
				// #ifdef APP-PLUS
				let isLogin = uni.getStorageSync('token') != '';
				if (isLogin) {
					// setTimeout(() => {
						that.$tools.switchTab('../index/index');
					// }, 500);
				} else {
					that.$tools.redirectTo('../operate/login');
				}
				// #endif
			}, 4000);
		}
	}
};
</script>

<style lang="scss" scoped>
	.main{
		position: relative;
		height: 100vh;
		text-align: center;
		margin: auto;
		&-wrapper{
			padding: 400upx 0 0;
			image{
				margin: auto;
				width: 336upx;
				height: 284upx;
			}
		}
		&-title{
			position: absolute;
			bottom: 80upx;
			left: 0;right: 0;
			text{
				text-align: center;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}
		}
	}
</style>
