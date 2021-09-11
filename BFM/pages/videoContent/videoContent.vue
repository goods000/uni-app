<template>
	<view class="pages">
		<view class="videoBox">
			<video id="myVideo" src="../../static/firstPage/bg.mp4" autoplay loop object-fit="fill" :controls="false" :enable-progress-gesture="false"></video>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			videoContext: ''
		};
	},
	onReady(res) {
		// #ifdef H5
		this.$tools.jump('../operate/login')
		// #endif
		// #ifndef MP-ALIPAY
		this.videoContext = uni.createVideoContext('myVideo');
		// #endif
	},
	onShow() {
		this.videoContext.play();
	},
	onHide() {
		this.videoContext.pause();
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.videoBox {
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	video {
		height: 100%;
		width: 100vw;
	}
}
</style>
