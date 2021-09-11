<template>
	<view class="pages">
		<view class="userInfoBox">
			<view class="userInfoBox-wrapper" v-if="!isLogin" @click="$tools.jump('../operate/login')">
				<view class="userInfoBox-avatar"><image src="../../static/mine/icon-avatar.png" mode="widthFix"></image></view>
				<view class="userInfoBox-content">
					<view class="userInfoBox-title">登录到您的账户</view>
					<view class="userInfoBox-msg">欢迎登录BKEX</view>
				</view>
			</view>

			<view class="userInfoBox-wrapper" v-if="isLogin">
				<view class="userInfoBox-avatar"><image src="../../static/mine/icon-avatar.png" mode="widthFix"></image></view>
				<view class="userInfoBox-content">
					<view class="userInfoBox-title">
						<text>{{ walletInfo.account }}</text>
						<view class="userInfoBox-activeInfo" :class="{ 'userInfoBox-activeInfo--active': activeStatus != 2 }">
							<view class="userInfoBox-activeInfo__icon">
								<image :src="walletInfo.active == 0 ? '../../static/mine/icon-notActivated.png' : '../../static/mine/icon-activated.png'" mode="widthFix"></image>
							</view>
							<view class="userInfoBox-activeInfo__label">{{ walletInfo.active == 0 ? '未激活' : '已激活' }}</view>
						</view>
					</view>
					<view class="userInfoBox-code">
						<text>{{ walletInfo.address }}</text>
						<view class="userInfoBox-copy" @click="$tools.copy(walletInfo.address)"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="listBox-list" @click="$tools.jump('../community/community')">
					<view class="listBox-list__icon"><image src="../../static/mine/icon-item-05.png" mode="widthFix"></image></view>
					<view class="listBox-list__title">激活矿工</view>
				</view>
				<view class="listBox-list listBox-list--holder" @click="$tools.jump('../safety/safety')">
					<view class="listBox-list__icon"><image src="../../static/mine/icon-item-01.png" mode="widthFix"></image></view>
					<view class="listBox-list__title">安全中心</view>
				</view>
				<view class="listBox-list" @click="$tools.noOpen()">
					<view class="listBox-list__icon"><image src="../../static/mine/icon-item-02.png" mode="widthFix"></image></view>
					<view class="listBox-list__title">帮助中心</view>
				</view>
				<view class="listBox-list" @click="goService()">
					<view class="listBox-list__icon"><image src="../../static/mine/icon-item-03.png" mode="widthFix"></image></view>
					<view class="listBox-list__title">在线客服</view>
				</view>
				<view class="listBox-list" @click="logout()">
					<view class="listBox-list__icon"><image src="../../static/mine/icon-item-04.png" mode="widthFix"></image></view>
					<view class="listBox-list__title">安全退出</view>
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
			walletInfo: [],
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
			if (this.isLogin) {
				this.getWalletData();
			}
		},
		getWalletData() {
			this.$Ajax('/front/user/baseInfo', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.walletInfo = res.obj;
				}
			});
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
						url: 'https://tb.53kf.com/code/app/3e755b20ad6f18eafd15ec549ea6b9715/9'
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
