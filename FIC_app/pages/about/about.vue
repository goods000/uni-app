<template>
	<view class="pages">
		<view class="header_bar header_bg header_fixed">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">关于我们</view>
			</view> 
		</view> 
		
		<view class="about">
			<view class="about-box">
				<view class="about-top">
					<view class="about-logo">
						<image src="../../static/public/logo.png" mode="widthFix"></image>
					</view>
					<view class="about-title">FIC云算力</view>
					<view class="about-version">{{versionList.versionNo}}V版本</view>
				</view>
				
				<view class="about-bottom">
					<view class="about-list">
						<view class="about-info">官方微信</view>
						<view class="about-info">{{aboutList.system_weixin}}</view>
					</view>
					<view class="about-list">
						<view class="about-info">官方微博</view>
						<view class="about-info">{{aboutList.system_weibo}}</view>
					</view>
					<view class="about-list">
						<view class="about-info">官方网站</view>
						<view class="about-info">
						<uni-link :href="aboutList.system_website" :text="aboutList.system_website" showUnderLine="false" color="#333333"></uni-link>
						</view>
					</view>
					<view class="about-list">
						<view class="about-info">客服电话</view>
						<view class="about-info">{{aboutList.system_phone}}</view>
					</view>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniLink from '../../components/uni-link/uni-link.vue';
	import version from '../../common/js/url.js';
	export default {
		components:{ uniLink },
		data() {
			return {
				aboutList:[],
				versionList:[],
			}
		},
		onShow() {
			this.getAboutList();
			this.getVersionList();
		},
		methods: {
			// 获取版本号
			getVersionList() {
				let v_url = '';
				uni.getSystemInfo({
					success: function(res) {
						if (res.platform == 'android') {
							v_url = '/version/android';
							
						} else if (res.platform == 'ios') {
							v_url = '/version/ios';
						}
					}
				});
				console.log("版本：",v_url);
				this.$Ajax(v_url, {}, res => {
						if (res.code == 0) {
							this.versionList = res.item
						}
					}
				);
			},
			
			// 获取信息
			getAboutList() {
				this.$Ajax('/user/system', {}, res => {
						if (res.code == 0) {
							this.aboutList = res.info
						}
					}
				);
			},
		}
	}
</script>

<style>
	@import '@/common/css/style.css';
	page{background: #FFFFFF;}
</style>
