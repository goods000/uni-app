<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">版本信息</view>
			</view>
		</view>
		<view class="infoBox">
			<view class="infoBox-wrapper">
				<view class="infoBox-logo"><image src="../../static/public/icon-logo.png" mode="widthFix" /></view>
				<view class="infoBox-title">OneToken</view>
				<view class="infoBox-version">{{ version }}</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="listBox-list"><text class="listBox-list__lable">检查更新</text></view>
				<view class="listBox-list" @click="goLink('https://onetoken.work')"><text class="listBox-list__lable">官网地址</text></view>
			</view>
			<!-- <view class="listBox-list">
				<text class="listBox-list__lable">项目介绍</text>
				<view class="listBox-list__arrow"><image src="../../static/public/icon-arrow-right-grey.png" mode="widthFix" /></view>
			</view>
			<view class="listBox-list">
				<text class="listBox-list__lable">版本日志</text>
				<view class="listBox-list__arrow"><image src="../../static/public/icon-arrow-right-grey.png" mode="widthFix" /></view>
			</view> -->
		</view>
		<view class="copyrightBox">
			<view class="copyrightBox-wrapper"><view class="copyrightBox-title">OneToken 提供技术支持</view></view>
		</view>
	</view>
</template>

<script>
import version from '@/common/js/url.js';
export default {
	data() {
		return {
			version: version.version
		};
	},
	methods:{
		goLink(url) {
			console.log(url);
			// #ifdef H5
			window.location.href = url;
			// #endif
		
			// #ifdef APP-PLUS
			plus.runtime.openURL(url);
			// #endif
		},
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/about';
</style>
