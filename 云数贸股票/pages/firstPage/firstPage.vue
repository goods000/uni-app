<template>
	
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
					that.$tools.redirectTo('../operate/login');
				}
				// #endif
			}, 1000);
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
