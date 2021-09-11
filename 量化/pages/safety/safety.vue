<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--line initHeader--bgStyle" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">安全中心</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<!-- <view class="listBox-list listBox-list--holder" @click="$tools.jump('../safety/safety_authentication')">
					<view class="listBox-list__label">实名认证</view>
					<view class="listBox-list__data"></view>
				</view> -->
				<view class="listBox-list" @click="$tools.jump('../safety/safety_changeLoginPwd')">
					<view class="listBox-list__label">登录密码</view>
					<view class="listBox-list__data">去修改</view>
				</view>
				<view class="listBox-list" @click="$tools.jump('../safety/safety_changeTradePwd')">
					<view class="listBox-list__label">交易密码</view>
					<view class="listBox-list__data">去修改</view>
				</view>
				<!-- <view class="listBox-list" @click="$tools.jump('../api/api')">
					<view class="listBox-list__label">API管理</view>
					<view class="listBox-list__data"></view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			authInfo: [],
			userInfo: [],
			authStatusStr: ['未认证', '认证中', '已认证', '认证失败']
		};
	},
	onShow() {
		this.$setStatusBarStyle();
		// this.init();
	},
	methods: {
		init() {
			this.getAuthInfo();
			// this.getCheck();
		},
		getAuthInfo() {
			this.$Ajax('/front/user/authInfo', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.authInfo = res.obj.auth;
					this.userInfo = res.obj.user;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/safety';
</style>
