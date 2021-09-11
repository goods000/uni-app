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
			that.timer = setTimeout(() => {
				let isLogin = uni.getStorageSync('token') != '';
				console.log(isLogin);
				if (isLogin) {
					clearTimeout(that.timer);
					that.$tools.switchTab('../index/index');
				} else {
					clearTimeout(that.timer);
					that.$tools.jump('../operate/selectType');
				}
			}, 100);
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
