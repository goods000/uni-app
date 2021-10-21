<!-- 客服 -->
<template>
	<view :class="{contractNav:hasNot==true}">
		 <web-view :webview-styles="webviewStyles" :src="serviceUrl"></web-view>
		 <!-- <web-view :webview-styles="webviewStyles" src="https://tb.53kf.com/code/app/3e755b20ad6f18eafd15ec549ea6b9715/40"></web-view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hasNot:false,
				serviceUrl:'',
				webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onLoad() {
			this.serviceUrl = uni.getStorageSync('serviceUrl');
			console.log(this.serviceUrl);
			console.log('666--->',uni.getStorageSync('serviceUrl'));
		},
		onShow() {
			console.log(plus.navigator.hasNotchInScreen());
			if(plus.navigator.hasNotchInScreen()==true){
				this.hasNot = true;
			}else{
				this.hasNot = false;
			}
			// this.$setNarBar('Service');
		}
	}
</script>

<style>
	.contractNav{
		padding-top: 5.54vh;
	}
</style>
