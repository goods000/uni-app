<!-- 客服 -->
<template>
	<view>
		 <web-view :webview-styles="webviewStyles" src="https://tb.53kf.com/code/app/b1ca6cececc0768d7862562e467111aa5/10"></web-view>
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
