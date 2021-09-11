<template>
	<view class="pages">
		<view class="userInfoBox">
			<view class="userInfoBox-wrapper" v-if="!isLogin" @click="$tools.jump('../operate/login')">
				<view class="userInfoBox-avatar"><image src="../../static/mine/icon-avatar.png" mode="widthFix"></image></view>
				<view class="userInfoBox-content">
					<view class="userInfoBox-title">登录到您的账户</view>
					<view class="userInfoBox-msg">欢迎来到ONETOKEN</view>
				</view>
			</view>

			<view class="userInfoBox-wrapper" @click="$tools.jump('../safety/safety_user')" v-if="isLogin">
				<view class="userInfoBox-avatar"><image :src="userInfo.image" mode="scaleToFill"></image></view>
				<view class="userInfoBox-content userInfoBox-content--arrow">
					<view class="userInfoBox-title">
						<text>{{ userInfo.name }}</text>
					</view>
					<view class="userInfoBox-code">邀请码：{{ userInfo.inviteCode }}</view>
				</view>
			</view>
		</view>

		<!-- <view class="itemBox">
			<view class="itemBox-wrapper">
				<view class="itemBox-item">
					<view class="itemBox-item__data itemBox-item__data--style">4767.3445</view>
					<view class="itemBox-item__label">交易账户</view>
				</view>
				<view class="itemBox-item">
					<view class="itemBox-item__data">378</view>
					<view class="itemBox-item__label">关注</view>
				</view>
				<view class="itemBox-item">
					<view class="itemBox-item__data">378</view>
					<view class="itemBox-item__label">粉丝</view>
				</view>
			</view>
		</view> -->

		<view class="accountBox">
			<view class="accountBox-wrapper initTitle">
				<view class="accountBox-title initTitle-wrapper"><view class="accountBox-title__lable initTitle-label">交易账户</view></view>
				<view class="accountBox-messageBox" v-if="bindList.length == 0" @click="$tools.jump('../documentary/documentary_bind')">
					<view class="accountBox-messageBox__plane">
						<view class="accountBox-messageBox__title">绑定您的交易账户</view>
						<view class="accountBox-messageBox__desc">绑定后您可以跟随优秀的交易员，也可以选择交易员入驻，但有人跟随时将获得奖励</view>
					</view>
				</view>
				<swiper
					:indicator-dots="false"
					:interval="2500"
					:duration="1000"
					class="accountBox-swiper"
					display-multiple-items="2"
					previous-margin="30upx"
					next-margin="30upx"
					v-if="bindList.length != 0"
				>
					<swiper-item class="accountBox-swiper__item" v-for="(item, index) in bindList" :key="index" @click="$tools.jump('../apiInfo/apiInfo', item.id)">
						<view class="accountBox-plane">
							<view class="accountBox-header">
								<view class="accountBox-icon"><image :src="item.bourseLogo" mode="widthFix"></image></view>
								<view class="accountBox-info">
									<view class="accountBox-name">{{ item.bourseName }}</view>
									<view class="accountBox-type">{{ item.roleStr }}</view>
								</view>
								<view class="accountBox-status" v-if="item.status == 0">审核中</view>
							</view>
							<view class="accountBox-body">
								<view class="accountBox-itemBox">
									<view class="accountBox-itemBox__item" @click.stop="$tools.jump('../apiInfo/apiInfo_followReward', item.id)">
										<view class="accountBox-itemBox__item-data accountBox-itemBox__item-data--style">{{ item.followerReward | number(4) }}</view>
										<view class="accountBox-itemBox__item-label">{{ item.role == 1 ? '跟随佣金' : '跟随收益' }}</view>
									</view>
									<view class="accountBox-itemBox__item">
										<view class="accountBox-itemBox__item-data">{{ item.followCount }}</view>
										<view class="accountBox-itemBox__item-label">{{ item.role == 1 ? '跟随人数' : '跟随交易员' }}</view>
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item class="accountBox-swiper__item" @click="$tools.jump('../documentary/documentary_bind')">
						<view class="accountBox-plane">
							<view class="accountBox-addBox">
								<view class="accountBox-addBox__icon"><image src="../../static/mine/icon-add.png" mode="widthFix"></image></view>
								<view class="accountBox-addBox__label">添加交易账户</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="listBox-plane">
					<view class="listBox-list" @click="$tools.jump('../assets/assets')">
						<view class="listBox-list__icon"><image src="../../static/mine/icon-item-01.png" mode="widthFix"></image></view>
						<view class="listBox-list__title">我的钱包</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('../safety/safety')">
						<view class="listBox-list__icon"><image src="../../static/mine/icon-item-02.png" mode="widthFix"></image></view>
						<view class="listBox-list__title">安全中心</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('../agent/agent')">
						<view class="listBox-list__icon"><image src="../../static/mine/icon-item-03.png" mode="widthFix"></image></view>
						<view class="listBox-list__title">经纪人</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('../workOrder/workOrder')">
						<view class="listBox-list__icon"><image src="../../static/mine/icon-item-04.png" mode="widthFix"></image></view>
						<view class="listBox-list__title">工单</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('../help/help')">
						<view class="listBox-list__icon"><image src="../../static/mine/icon-item-05.png" mode="widthFix"></image></view>
						<view class="listBox-list__title">帮助中心</view>
					</view>
					<view class="listBox-list" @click="$tools.jump('../about/about')">
						<view class="listBox-list__icon"><image src="../../static/mine/icon-item-06.png" mode="widthFix"></image></view>
						<view class="listBox-list__title">版本信息</view>
						<view class="listBox-list__data">{{ version }}</view>
					</view>
					<!-- <view class="listBox-list" @click="logout()">
						<view class="listBox-list__icon"><image src="../../static/mine/icon-item-07.png" mode="widthFix"></image></view>
						<view class="listBox-list__title">安全退出</view>
					</view> -->
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
			bindList: [],

			activeStatusList: ['未激活', '激活中', '已激活'],

			activeStatus: 0,
			isLogin: false,
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
				this.getUserInfo();
				this.getBindList();
				// this.getAuthInfo();
			}
		},
		getUserInfo() {
			this.$Ajax('/front/user/baseInfo', {}, res => {
				console.log('用户信息：' + JSON.stringify(res));
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
		//账户信息
		getBindList() {
			this.$Ajax('/front/api/bind/list', {}, res => {
				console.log('账户绑定信息：' + JSON.stringify(res));
				if (res.code == 0) {
					this.bindList = res.obj;
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
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/mine';
</style>
