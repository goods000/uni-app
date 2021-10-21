<template>
	<view class="contentBg">
		
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
					that.$tools.redirectTo('../login/first');
				}
				// #endif
			}, 1000);
		}
	}
};
</script>

<style lang="scss" scoped>
.contentBg {
	background: #00061A;
}
</style>
