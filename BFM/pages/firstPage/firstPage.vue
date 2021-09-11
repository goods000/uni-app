<template>
	<view class="pages">
		<view class="bgBox">
			<!-- <view class="bgBox-wrapper"> -->
				<!-- <image src="../../static/firstPage/firstPage.gif" mode="widthFix"></image> -->
			<!-- </view> -->
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
						// that.$tools.jump('../operate/index');
					// }, 500);
				}
				// #endif
			},100);
		}
	}
};
</script>

<style lang="scss" scoped>
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
