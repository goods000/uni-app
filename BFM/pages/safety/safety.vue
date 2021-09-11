<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
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
				<view class="listBox-list" @click="$tools.jump('../safety/safety_changeLoginPsw')">
					<view class="listBox-list__label">登录密码</view>
					<view class="listBox-list__data">去修改</view>
				</view>
				<view class="listBox-list" @click="$tools.jump('../safety/safety_changeTradePsw')">
					<view class="listBox-list__label">交易密码</view>
					<view class="listBox-list__data">去修改</view>
				</view>
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
.listBox {
	&-list {
		@include flexBetween;
		align-items: stretch;
		padding: 30upx;
		font-size: 32upx;

		&__label {
			color: #FFFFFF;
		}

		&__data {
			@include flexCenter;
			color: #666666;
			padding-right: 30upx;
			background: url(@/static/public/icon-arrow-right-grey.png) no-repeat;
			background-size: 14upx 26upx;
			background-position: right center;

			&--white{
				color: #FFFFFF;
			}
			
			&--black{
				color: #000000;
			}
			
			&--style{
				color: $globalColor-style;
			}
			
			&--noArrow {
				background: none;
				padding-right: 0;
			}
		}
	}
}
</style>
