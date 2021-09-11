<template>
	<view class="pages">
		<view class="main">
			<view class="userInfoBox header_bar">
				<view class="header">
					<view class="header-wrapper">
						<view class="header-item header-item--white">我的</view>
					</view>
				</view>
				<view class="userInfoBox-wrapper">
					<view class="userInfoBox-row">
						<view class="userInfoBox-level"><image :src="baseInfo.img" mode=""></image></view>
					</view>
					<view class="userInfoBox-main">
						<view class="userInfoBox-tourist">{{baseInfo.nickname}}</view>
						<!-- <view class="userInfoBox-id">
							<text>UID:{{baseInfo.hxUuid}}</text>
						</view> -->
					</view>
					<view class="userInfoBox-image" @click="$tools.jump('../account/account')">
						<image src="../../static/public/icon-arrow-right-white.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-list" @click="$tools.jump('../asset/asset')">
						<view class="listBox-list__icon"><image src="../../static/user/icon-user-01.png" mode="widthFix"></image></view>
						<view class="listBox-list__label">我的资产</view>
					</view>
				</view>
				<view class="listBox-wrapper">	
					<view class="listBox-list" @click="$tools.jump('../release/release')">
						<view class="listBox-list__icon"><image src="../../static/user/icon-user-02.png" mode="widthFix"></image></view>
						<view class="listBox-list__label">发布动态</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('../myCircle/myCircle',baseInfo.img,baseInfo.nickname,baseInfo.hxUuid)">
						<view class="listBox-list__icon"><image src="../../static/user/icon-user-03.png" mode="widthFix"></image></view>
						<view class="listBox-list__label">我的朋友圈</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('../exchange/release')">
						<view class="listBox-list__icon"><image src="../../static/user/icon-user-04.png" mode="widthFix"></image></view>
						<view class="listBox-list__label">发布生态需求</view>
					</view>
				</view>
				<view class="listBox-wrapper">	
					<view class="listBox-list" @click="$tools.jump('../safety/safety')">
						<view class="listBox-list__icon"><image src="../../static/user/icon-user-05.png" mode="widthFix"></image></view>
						<view class="listBox-list__label">安全中心</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('../service/service')">
						<view class="listBox-list__icon"><image src="../../static/user/icon-user-06.png" mode="widthFix"></image></view>
						<view class="listBox-list__label">在线客服</view>
					</view>
				</view>
				<view class="listBox-wrapper">		
					<view class="listBox-list listBox-list--no"> 
						<view class="listBox-list__icon"><image src="../../static/user/icon-user-07.png" mode="widthFix"></image></view>
						<view class="listBox-list__label">版本信息</view>
						<view class="listBox-list__version">{{ version }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import version from '@/common/js/url.js';
export default {
	data() {
		return {
			baseInfo: [],
			canQualifications: 0,
			version: version.version,
		};
	},
	onShow() {
		this.init();
		this.myUsername = uni.getStorageSync('myUsername');
		this.token = uni.getStorageSync('token');
		// console.log(this.token)
	},
	methods: {
		init() {
			this.getBaseInfo();
		},
		getBaseInfo() {
			this.$Ajax('/front/user/baseInfo', {}, res => {
				if (res.code == 0) {
					this.baseInfo = res.obj;
					uni.setStorageSync('img',res.obj.img)
				}
			});
		},
		changeAssetsSwiper(e) {
			this.assetsSwiperCurrent = e.detail.current;
		},
		goLink(url) {
			console.log(url);
			// #ifdef H5
			window.location.href = url;
			// #endif

			// #ifdef APP-PLUS
			plus.runtime.openURL(encodeURI(url));
			// #endif
		},
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/user';
</style>
