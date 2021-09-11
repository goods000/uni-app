<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initTarBarShadow"></view>
		<!-- <view class="bgBox"><image src="../../static/mine/img-mine-bg.jpg" mode="widthFix"></image></view> -->

		<view class="main">
			<view class="headerInfoBox">
				<view class="headerInfoBox-wrapper">
					<!-- 用户信息 -->
					<view class="userInfoBox">
						<view class="userInfoBox-wrapper" @click="checkLogin()">
							<view class="userInfoBox-avatar"><image :src="isLogin ? userInfo.pic : '../../static/mine/icon-avatar.png'" mode="scaleToFill"></image></view>
							<view class="userInfoBox-content">
								<view class="userInfoBox-title" v-if="!isLogin">登录到您的账户</view>
								<view class="userInfoBox-msg" v-if="!isLogin">欢迎登录GG</view>
								<view class="userInfoBox-row" v-if="isLogin">
									<view class="userInfoBox-title">{{ userInfo.name }}</view>
									<view class="userInfoBox-level"><image :src="'../../static/level/icon-level-' + userInfo.team + '.png'" mode="widthFix"></image></view>
								</view>

								<view class="userInfoBox-code" v-if="isLogin">邀请码：{{ userInfo.inviteCode }}</view>
							</view>
							<view class="userInfoBox-setting" v-if="isLogin"></view>
						</view>
					</view>

					<!-- 钱包信息 -->
					<view class="assetsBox">
						<view class="assetsBox-wrapper">
							<view class="assetsBox-content">
								<view class="assetsBox-label">总收益(USDT)</view>
								<view class="assetsBox-price">{{ isLogin ? userInfo.totalProfit + userInfo.totalReward : '---' | number(4) }}</view>
							</view>
							<view class="assetsBox-itemBox">
								<view class="assetsBox-itemBox__item">
									<view class="assetsBox-itemBox__item-label">量化收益</view>
									<view class="assetsBox-itemBox__item-data">{{ isLogin ? userInfo.totalProfit : '---' | number(4) }}</view>
								</view>
								<view class="assetsBox-itemBox__item">
									<view class="assetsBox-itemBox__item-label">返佣收益</view>
									<view class="assetsBox-itemBox__item-data">{{ isLogin ? userInfo.totalReward : '---' | number(4) }}</view>
								</view>
							</view>
						</view>
					</view>

					<view class="fancyBox">
						<view class="fancyBox-wrapper">
							<view class="fancyBox-info">
								<view class="fancyBox-label">可用点卡</view>
								<view class="fancyBox-data">{{ isLogin ? userInfo.service : '---' }} USDT</view>
							</view>
							<view class="fancyBox-body">
								<view class="fancyBox-item" @click="$tools.jump('../assets/assets_exchange')"><view class="fancyBox-item__label">兑换</view></view>
								<view class="fancyBox-item" @click="$tools.jump('../assets/assets_recharge')"><view class="fancyBox-item__label">充值</view></view>
								<view class="fancyBox-item" @click="$tools.jump('../assets/assets_transfer')"><view class="fancyBox-item__label">转账</view></view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-plane">
						<view class="listBox-list" @click="$tools.jump('../assets/assets')">
							<view class="listBox-list__icon"><image :src="'../../static/mine/icon-item-07-' + pageTheme + '.png'" mode="widthFix"></image></view>
							<view class="listBox-list__label">我的钱包</view>
						</view>
						<view class="listBox-list" @click="$tools.jump('../safety/safety')">
							<view class="listBox-list__icon"><image :src="'../../static/mine/icon-item-01-' + pageTheme + '.png'" mode="widthFix"></image></view>
							<view class="listBox-list__label">安全中心</view>
						</view>
						<view class="listBox-list" @click="$tools.jump('../team/team')">
							<view class="listBox-list__icon"><image :src="'../../static/mine/icon-item-02-' + pageTheme + '.png'" mode="widthFix"></image></view>
							<view class="listBox-list__label">我的社区</view>
						</view>
						<view class="listBox-list" @click="$tools.jump('../share/share')">
							<view class="listBox-list__icon"><image :src="'../../static/mine/icon-item-03-' + pageTheme + '.png'" mode="widthFix"></image></view>
							<view class="listBox-list__label">邀请好友</view>
						</view>
						<view class="listBox-list" @click="$tools.jump('../service/service')">
							<view class="listBox-list__icon"><image :src="'../../static/mine/icon-item-04-' + pageTheme + '.png'" mode="widthFix"></image></view>
							<view class="listBox-list__label">在线客服</view>
						</view>
						<view class="listBox-list">
							<view class="listBox-list__icon"><image :src="'../../static/mine/icon-item-05-' + pageTheme + '.png'" mode="widthFix"></image></view>
							<view class="listBox-list__label">版本信息</view>
							<view class="listBox-list__data">{{ version }}</view>
						</view>
						<view class="listBox-list" @click="logout()">
							<view class="listBox-list__icon"><image :src="'../../static/mine/icon-item-06-' + pageTheme + '.png'" mode="widthFix"></image></view>
							<view class="listBox-list__label">安全退出</view>
						</view>
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
			userInfo: [],
			authInfo: [],
			assetsTotalInfo: [],

			isLogin: false,

			activeStatusList: ['未激活', '激活中', '已激活'],
			activeStatus: 0,
			version: version.version
		};
	},
	onReady() {
		this.$setStatusBarStyle();
		this.$setTarBar();
	},
	onShow() {
		this.$setStatusBarStyle();
		this.$setTarBar();
		this.isLogin = uni.getStorageSync('token') != '';
		this.init();
	},
	methods: {
		init() {
			if (this.isLogin) {
				this.getUserInfo();
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
		},
		checkLogin() {
			if (!this.isLogin) {
				this.$tools.jump('../operate/login');
			}else{
				this.$tools.jump('../safety/safety_user');
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/mine';
</style>
