<template>
	<view class="pages bg_header">
		<view class="main">
			<image src="../../static/user/icon-user-topBg.png" mode="widthFix" class="userBg"></image>
			<view class="userInfoBox">
				<view class="initHeader initHeader--white">
					<view class="initHeader-wrapper"><view class="initHeader-title">我的</view></view>
				</view>
				<view class="userInfoBox-wrapper">
					<view class="userInfoBox-content">
						<view class="userInfoBox-row">
							<view class="userInfoBox-level" v-if="!token"><image src="../../static/user/icon-user-00.png" mode="widthFix"></image></view>
							<view class="userInfoBox-level" v-else><image src="../../static/pack/logo.png" mode="widthFix"></image></view>
							<view class="userInfoBox-title">
								{{ baseInfo.phone }}
								<image v-if="levelId == 0" src="../../static/user/icon-level-0.png" mode="" class="userInfoBox-title__image--1"></image>
								<image v-if="levelId == 1"  src="../../static/user/icon-level-1.png" mode="" class="userInfoBox-title__image--2"></image>
								<image v-if="levelId == 2"  src="../../static/user/icon-level-2.png" mode="" class="userInfoBox-title__image--2"></image>
								<image v-if="levelId == 3"  src="../../static/user/icon-level-3.png" mode="" class="userInfoBox-title__image--2"></image>
							</view>
						</view>
						<view class="userInfoBox-tourist" v-if="!token">游客</view>
						<view class="userInfoBox-id" v-else>
							<text>UID:{{ baseInfo.id }}</text>
						</view>
					</view>
					<view class="userInfoBox-avatar" v-if="!token"><view class="userInfoBox-loginBtn" @click="$tools.jump('../operate/login')">登录</view></view>
					<view class="userInfoBox-avatar" v-else @click="$tools.copy(baseInfo.id)"><image src="../../static/user/icon-avatar.png" mode="scaleToFill"></image></view>
				</view>
			</view>
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-list" @click="$tools.jump('../team/team',baseInfo.phone,baseInfo.id,baseInfo.teamAchievement)">
						<view class="listBox-list__icon"><image src="../../static/user/icon-user-01.png" mode="widthFix"></image></view>
						<view class="listBox-list__label">我的团队</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('../share/share')">
						<view class="listBox-list__icon"><image src="../../static/user/icon-user-02.png" mode="widthFix"></image></view>
						<view class="listBox-list__label">邀请好友</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('../order/order')">
						<view class="listBox-list__icon"><image src="../../static/user/icon-user-03.png" mode="widthFix"></image></view>
						<view class="listBox-list__label">我的订单</view>
					</view>
				</view>
				<view class="listBox-wrapper">	
					<view class="listBox-list" @click="$tools.jump('../address/address')">
						<view class="listBox-list__icon"><image src="../../static/user/icon-user-04.png" mode="widthFix"></image></view>
						<view class="listBox-list__label">收货地址管理</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('../record/record',baseInfo.id)">
						<view class="listBox-list__icon"><image src="../../static/user/icon-user-05.png" mode="widthFix"></image></view>
						<view class="listBox-list__label">我的收益</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('../service/service')">
						<view class="listBox-list__icon"><image src="../../static/user/icon-user-06.png" mode="widthFix"></image></view>
						<view class="listBox-list__label">联系客服</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('../safety/safety')">
						<view class="listBox-list__icon"><image src="../../static/user/icon-user-07.png" mode="widthFix"></image></view>
						<view class="listBox-list__label">安全中心</view>
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
			assetsInfo: [],
			baseInfo: [],
			canQualifications: 0,
			version: version.version,
			levelId:'',
		};
	},
	onShow() {
		this.init();
		this.token = uni.getStorageSync('token');
		// console.log(this.token)
	},
	methods: {
		init() {
			this.getBaseInfo();
			this.getAssetsInfo();
			this.getUserLevel();
		},
		getAssetsInfo() {
			this.$Ajax('/front/mine/getAssetsInfo', {}, res => {
				// console.log('钱包：' + JSON.stringify(res));
				if (res.code == 0) {
					this.assetsInfo = res.obj;
				}
			});
		},
		getBaseInfo() {
			this.$Ajax('/front/user/baseInfo', {}, res => {
				if (res.code == 0) {
					this.baseInfo = res.obj;
				}
			});
		},
		getUserLevel() {
			this.$Ajax('/front/user/getUserLevel', {}, res => {
				if (res.code == 0) {
					this.levelId = res.obj;
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
		logout() {
			let that = this;
			this.$Ajax('/front/logout', {}, res => {
				uni.removeStorage({
					key: 'token',
					success() {
						that.$tools.toastJump('退出成功', '../operate/login');
					}
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/user/user';
</style>
