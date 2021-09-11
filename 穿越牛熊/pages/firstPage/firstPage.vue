<template>
	<view class="pages">
		<view class="main">
			<view class="imgBox">
				<image src="../../static/firstPage/icon-bg.png" mode="widthFix"></image>
			</view>
			<view class="fixedTitleBox">
				<view class="fixedTitleBox-logo">
					<image src="../../static/firstPage/icon-logo.png" mode="widthFix"></image>
				</view>
			</view>
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
		timeToLink(e) {
			let that = this;
			that.timer = setTimeout(() => {
				let isLogin = uni.getStorageSync('token') != '';
				console.log(isLogin);
				if (isLogin) {
					clearTimeout(that.timer);
					that.$tools.switchTab('../index/index');
				} else {
					clearTimeout(that.timer);
					that.$tools.jump('../operate/login');
				}
			}, 2000);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/firstPage';
</style>
