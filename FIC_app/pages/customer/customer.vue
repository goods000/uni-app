<!-- 客服 -->
<template>
	<view>
		 <web-view :webview-styles="webviewStyles" :src="baseUrl"></web-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				baseUrl: '',
				 webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
			};
		},
		onReady() {
			 console.log(uni.getSystemInfoSync())
		    var currentWebview = this.$scope.$getAppWebview().children()[0];
		   //设置高度样式
		    currentWebview.setStyle({
		        top: uni.getSystemInfoSync().statusBarHeight,
		        height:uni.getSystemInfoSync().windowHeight - uni.getSystemInfoSync().statusBarHeight,
		        // scalable:true  //webview的页面是否可以缩放，双指放大缩小
		    })
		},
		onShow() {
			let url = 'https://tb.53kf.com/code/app/3e755b20ad6f18eafd15ec549ea6b9715/19';
			if (uni.getSystemInfoSync().platform == 'android') {
				this.baseUrl = url + '?device=android';
			} else {
				this.baseUrl = url;
			}
		}
	}
</script>

<style>
</style>
