<template>
	<view class="pages">
		<view class="initHeader initHeader--bgWhite initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">设置</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="listBox-list" @click="$tools.jump('../setting/setting_user')">
					<view class="listBox-list__label">个人资料</view>
					<view class="listBox-list__data"></view>
				</view>
				<!-- <view class="listBox-list" @click="$tools.jump('../setting/setting_safety')">
					<view class="listBox-list__label">账户与密码安全</view>
					<view class="listBox-list__data"></view>
				</view> -->
				<view class="listBox-list" @click="$tools.jump('../setting/setting_payment')">
					<view class="listBox-list__label">收款方式</view>
					<view class="listBox-list__data"></view>
				</view>
				<view class="listBox-list listBox-list--holder" @click="$tools.noOpen()">
					<view class="listBox-list__label">语种切换</view>
					<view class="listBox-list__data">中文</view>
				</view>
				<!-- <view class="listBox-list" @click="$tools.jump('../setting/setting_changeTransactionPsd')">
					<view class="listBox-list__label">黑名单管理</view>
					<view class="listBox-list__data"></view>
				</view> -->
				<view class="listBox-list listBox-list--btn" @click="logout()">退出登录</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onShow() {},
	methods: {
		logout() {
			let that = this;
			this.$Ajax('/front/logout', {}, res => {
				uni.removeStorage({
					key: 'token',
					success() {
						that.$tools.toastJump(res.msg, '../operate/login');
					}
				});
			});
		},
	}
};
</script>

<style lang="scss" scoped>
page,.pages {
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
		
		&--btn{
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
