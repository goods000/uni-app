<template>
	<view class="pages">
		<view class="firstBox">
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
						that.$tools.redirectTo('../operate/first');
					// }, 500);
				}
				// #endif
			}, 4600);
		}
	}
};
</script>

<style lang="scss" scoped>
	@import '@/common/css/style.css';
</style>
