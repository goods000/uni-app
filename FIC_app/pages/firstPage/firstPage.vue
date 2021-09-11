<template>
	<view class="pages">
		<view class="firstBox">
			<video class="video" id="demoVideo" autoplay object-fit="fill" :controls="false" :enable-progress-gesture="false" :show-loading="false"
			src="../../static/public/qi.mp4" @ended="timeToLink()">
			</video>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			timer: null,
			videoContext:''
		};
	},
	onReady: function(res) {
		// #ifdef H5
		this.$tools.jump('../operate/login')
		// #endif
		// #ifndef MP-ALIPAY
		this.videoContext = uni.createVideoContext('demoVideo');
		// #endif
	},
	methods: {
		videoTimeUpdateEvent(e) {
			// console.log("视频结束了")
			this.timeToLink()
		},
		timeToLink() {
			// #ifdef H5
			this.$tools.switchTab('../index/index');
			// #endif
			// #ifdef APP-PLUS
			let isLogin = uni.getStorageSync('token') != '';
			if (isLogin) {
				// setTimeout(() => {
					this.$tools.switchTab('../index/index');
				// }, 500);
			} else {
				// setTimeout(() => {
					this.$tools.redirectTo('../operate/first');
				// }, 500);
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
	@import '@/common/css/style.css';
</style>
