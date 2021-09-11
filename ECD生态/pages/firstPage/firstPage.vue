<template>
	<view class="contentBg">
		<view class="bgBox">
			<view class="bgBox-wrapper">
				<image src="../../static/firstPage/firstPage_logo.png" mode="widthFix" class="bgBox-wrapper__image--1"></image>
				<image src="../../static/firstPage/firstPage_bg.png" mode="widthFix" class="bgBox-wrapper__image--2"></image>
			</view>
			<view class="bgBox-title">ECD生态打造数字资产顶级生态圈</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			returnData: [],
			jsonReturnData: [],
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
			}, 1000);
		}
	}
};
</script>

<style lang="scss" scoped>
.bgBox {
	position: relative;
	height: 100vh;
	&-wrapper{
		@include flexCenterColumn;
		width: 100%;
		&__image--1{
			margin: 310upx auto 50.5upx;
			width: 304upx;
			height: 252upx;
		}
		&__image--2{
			width: 100%;
		}
	}
	&-title{
		position: absolute;
		bottom: 52upx;
		left: 0;
		right: 0;
		text-align: center;
		font-family: PingFang SC;
		font-weight: 500;
		color: #0C1E37;
	}
}
</style>
