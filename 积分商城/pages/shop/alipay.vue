<template>
	<view>
		 <web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				 webviewStyles: {
			        progress: {
			            color: '#F5D279'
			        }
			    }
			};
		},
		onLoad(option) {
			this.url = uni.getStorageSync("alipay");
			console.log("过来支付了",this.url);
		}
	}
</script>

<style lang="scss" scoped>

</style>
