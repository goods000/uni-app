<template>
	<view class="pages">
		<view class="firstBox">
			<!-- <video class="video" id="demoVideo" autoplay object-fit="fill" :controls="false" :enable-progress-gesture="false" :show-loading="false"
			src="../../static/pack/first.mp4" @ended="timeToLink()">
			</video> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			returnData: [],
			jsonReturnData: [],
			timer: null,
			videoContext:'',
		};
	},
	// onReady: function(res) {
	// 	// #ifdef H5
	// 	this.$tools.jump('../operate/login')
	// 	// #endif
	// 	// #ifndef MP-ALIPAY
	// 	this.videoContext = uni.createVideoContext('demoVideo');
	// 	// #endif
	// },
	methods: {
		timeToLink() {
			let that = this;
			that.timer = setTimeout(function() {
				clearTimeout(that.timer);
				// that.$tools.switchTab('../index/index');
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
					that.$tools.redirectTo('../index/index');
				}
				// #endif
			}, 1000);
		}
	}
};
</script>

<style lang="scss" scoped>
	.firstBox{width: 100vw;height: 100vh;overflow: hidden;}
	.firstBox .video{width: 100vw;height: 100%;}
</style>
