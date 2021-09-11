<template>
	<view class="pages">
		<view class="initHeader initHeader--bgWhite initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">实名认证</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="listBox-list" @click="toPrimary()">
					<view class="listBox-list__label">初级认证</view>
					<view class="listBox-list__data">{{ authStatusStr[authInfo.authStatus] }}</view>
				</view>
				<view class="listBox-list" @click="getToken()">
					<view class="listBox-list__label">高级认证</view>
					<view class="listBox-list__data">{{ tradeStatusStr[authInfo.tradeAuthStatus] }}</view>
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
			tokenStr: '',
			authStatusStr: ['未认证', '认证中', '已认证', '认证失败'],
			tradeStatusStr: ['未认证', '已认证', '认证失败']
		};
	},
	onShow() {
		this.init();
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
				}
			});
		},
		getToken() {
			if (this.authInfo.authStatus != 2) {
				return this.$tools.toast('请先进行初级认证');
			}
			if (this.authInfo.tradeAuthStatus != 1) {
				this.$Ajax('/front/uuexOtc/getFaceAuthToken', {}, res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.tokenStr = res.obj;
						this.aliAuth();
					}
				});
			}
		},
		aliAuth() {
			let that = this;
			// #ifdef APP-PLUS
			const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');
			dcRichAlert.show(
				{
					type: '2',
					token: that.tokenStr
				},
				result => {
					if (result.index) {
						that.getCheck();
					}
				}
			);
			// #endif
		},
		//check
		getCheck() {
			this.$Ajax('/front/user/tradeFaceAuthResult', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.$tools.toast(res.obj);
					this.getAuthInfo();
				}
			});
		},
		toPrimary() {
			if (this.authInfo.authStatus != 1 && this.authInfo.authStatus != 2) {
				this.$tools.jump('../setting/setting_authentication_primary');
			}
		}
	}
};
</script>

<style lang="scss" scoped>
page,
.pages {
	background-color: #f7f8fc;
}
.listBox {
	// padding: 0 30upx;
	// padding-top: 92upx;
	&-list {
		@include flexBetween;
		align-items: stretch;
		padding: 30upx;
		font-size: 32upx;
		color: #101010;
		border-bottom: 2upx solid #c6d2e4;
		background-color: #ffffff;

		&--holder {
			margin-bottom: 15upx;

			& + view {
				border-top: 2upx solid #c6d2e4;
			}
		}

		&--btn {
			@include flexCenter;
			margin-top: 60upx;
			border-top: 2upx solid #c6d2e4;
		}

		&__label {
			&--colorRed {
				color: #f75555;
			}
		}

		&__data {
			@include flexCenter;
			color: #bfc0c7;
			padding-right: 30upx;
			background: url(@/static/public/icon-arrow-right-grey.png) no-repeat;
			background-size: 14upx 26upx;
			background-position: right center;
		}
	}
}
</style>
