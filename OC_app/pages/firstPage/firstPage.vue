<template>
	<view class="firstBox">
		<!-- <video class="video" id="demoVideo" autoplay object-fit="fill" :controls="false" :enable-progress-gesture="false" :show-loading="false"
		src="../../static/pack/OC.mp4" @ended="timeToLink()">
		</video> -->
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
			// #ifdef H5
			this.$tools.switchTab('../index/index');
			// #endif
			// #ifdef APP-PLUS
			let isLogin = uni.getStorageSync('token') != '';
			if (isLogin) {
					this.$tools.switchTab('../index/index');
			} else {
					this.$tools.redirectTo('../operate/first');
			}
			// #endif
			
			// let that = this;
			// that.timer = setTimeout(function() {
			// 	clearTimeout(that.timer);
				
			// }, 4000);
		}
	}
};
</script>

<style lang="scss" scoped>
	.firstBox{width: 100vw;height: 100vh;overflow: hidden;}
	.firstBox .video{width: 100vw;height: 100%;}
</style>
