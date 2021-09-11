<template>
	<view class="pages">
		<view class="bgBox"><image src="../../static/mine/img-mine-bg.jpg" mode="widthFix"></image></view>
		
		<view class="userInfoBox">
			<view class="userInfoBox-wrapper" v-if="!isLogin" @click="$tools.jump('../operate/login')">
				<view class="userInfoBox-avatar"><image src="../../static/mine/icon-avatar.png" mode="widthFix"></image></view>
				<view class="userInfoBox-content">
					<view class="userInfoBox-title">登录到您的账户</view>
					<view class="userInfoBox-msg">欢迎登录BMF</view>
				</view>
			</view>

			<view class="userInfoBox-wrapper" v-if="isLogin">
				<view class="userInfoBox-avatar"><image src="../../static/mine/icon-avatar.png" mode="widthFix"></image></view>
				<view class="userInfoBox-content">
					<view class="userInfoBox-title">
						<text>{{ userInfo.name }}</text>
						<view class="userInfoBox-level" v-if="userInfo.node == 1">节点合伙人</view>
					</view>
				</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="listBox-plane">
					<view class="listBox-list" @click="goAuthentication()">
						<view class="listBox-list__icon"><image src="../../static/mine/icon-item-01.png" mode="widthFix"></image></view>
						<view class="listBox-list__title">会员认证</view>
						<view class="listBox-list__data" v-if="isLogin">{{ authInfo.authStatusStr }}</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('../share/share')">
						<view class="listBox-list__icon"><image src="../../static/mine/icon-item-02.png" mode="widthFix"></image></view>
						<view class="listBox-list__title">邀请好友</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('../team/team')">
						<view class="listBox-list__icon"><image src="../../static/mine/icon-item-03.png" mode="widthFix"></image></view>
						<view class="listBox-list__title">我的团队</view>
					</view>
				</view>
				<view class="listBox-plane">
					<view class="listBox-list" @click="$tools.jump('../safety/safety')">
						<view class="listBox-list__icon"><image src="../../static/mine/icon-item-04.png" mode="widthFix"></image></view>
						<view class="listBox-list__title">安全中心</view>
					</view>
					<view class="listBox-list" @click="logout()">
						<view class="listBox-list__icon"><image src="../../static/mine/icon-item-05.png" mode="widthFix"></image></view>
						<view class="listBox-list__title">安全退出</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import version from '@/components/url.js';
export default {
	data() {
		return {
			isLogin: false,
			userInfo: [],
			authInfo: [],
			activeStatusList: ['未激活', '激活中', '已激活'],
			activeStatus: 0,
			version: version.version
		};
	},
	onShow() {
		this.isLogin = uni.getStorageSync('token') != '';
		this.init();
	},
	methods: {
		init() {
			if(this.isLogin){
				this.getUserInfo();
				this.getAuthInfo();
			}
		},
		getUserInfo() {
			this.$Ajax('/front/user/baseInfo', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.userInfo = res.obj;
				}
			});
		},
		getAuthInfo() {
			this.$Ajax('/front/user/authInfo', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.authInfo = res.obj;
				}
			});
		},
		getActivationStatus() {
			this.$Ajax(
				'/front/address/query/active',
				{
					addressId: this.walletInfo.addressId
				},
				res => {
					console.log(JSON.stringify(res));
					this.activeStatus = res.obj;
				}
			);
		},
		goAuthentication() {
			if (this.authInfo.authStatus == 1 || this.authInfo.authStatus == 2) {
				return 
			} else {
				this.$tools.jump('../safety/safety_authentication');
			}
		},
		goLink(url) {
			console.log(url);
			// #ifdef H5
			window.location.href = url;
			// #endif

			// #ifdef APP-PLUS
			plus.runtime.openURL(url);
			// #endif
		},
		goService() {
			console.log(JSON.stringify(uni.getSystemInfoSync().platform));
			if (uni.getSystemInfoSync().platform == 'android') {
				console.log('走原生');
				// #ifdef APP-PLUS
				const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');
				dcRichAlert.show(
					{
						type: '100',
						url: 'https://tb.53kf.com/code/app/3e755b20ad6f18eafd15ec549ea6b9715/10'
					},
					result => {}
				);
				// #endif
			} else {
				this.$tools.jump('../service/service');
			}
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
@import '@/common/scss/pages/mine';
</style>
