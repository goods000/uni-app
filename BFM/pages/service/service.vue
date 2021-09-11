<!-- 客服 -->
<template>
	<view>
		 <web-view :webview-styles="webviewStyles" src="https://tb.53kf.com/code/app/3e755b20ad6f18eafd15ec549ea6b9715/11"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
			};
		},
		onShow() {
			// this.$setNarBar('Service');
		}
	}
</script>

<style>

</style>
