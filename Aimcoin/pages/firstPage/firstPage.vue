<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="main">
			<view class="iconBox"><image src="../../static/firstPage/icon-logo.png" mode="widthFix"></image></view>
			<view class="textBox"><view class="textBox-label">让交易更简单</view></view>
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
