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
				url: '',
				baseUrl: '',
				 webviewStyles: {
                    progress: {
                        color: '#FFC033'
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
			this.getURL();
		},
		methods:{
			getURL() {
				this.$Ajax('/search/customerService', {}, res => {
						if (res.code == 0) {
							this.url = res.obj;
							console.log("this.url：",this.url)
							if (uni.getSystemInfoSync().platform == 'android') {
								this.baseUrl = this.url + '?device=android';
							} else {
								this.baseUrl = this.url;
							}
						}
					}
				);
			},
		}
	}
</script>

<style>
</style>
