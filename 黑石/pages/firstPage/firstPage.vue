<template>
	<view class="pages">
		<view class="bgBox">
			<!-- <view class="bgBox-wrapper"> -->
			<image src="../../static/firstPage/firstPage.gif" mode="widthFix"></image>
			<!-- </view> -->
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
					// setTimeout(() => {
					that.$tools.jump('../videoContent/videoContent');
					// }, 500);
				}
				// #endif
			}, 6000);
		}
	}
};
</script>

<style lang="scss" scoped>
page,
.pages {
	background-color: #040408;
	min-height: 100vh;
	position: relative;
}
.bgBox {
	@include fullImage;
	@include flexCenterColumn;
	width: 100%;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 0;
}
</style>
