<template>
	<view class="pages">
		<view class="main">
			<view class="logoBox">
				<view class="logoBox-img"><image src="../../static/operate/icon-selectType-logo.png" mode="widthFix"></image></view>
				<view class="logoBox-msg">欢迎来到</view>
			</view>
			<!-- <view class="agreementBox" @click="toggleStatus()">
				<view class="agreementBox-wrapper">
					<view class="agreementBox-checkbox" :class="{ 'agreementBox-checkbox--active': agreestatus == true }"></view>
					<view class="agreementBox-message">
						我已阅读并同意
						<text @click.stop="$tools.jump('../about/about_privacyService')">《用户协议》</text>
					</view>
				</view>
			</view> -->
			<view class="buttonBox">
				<view class="buttonBox-wrapper">
					<view class="buttonBox-btn buttonBox-btn--full" @click="$tools.jump('../operate/login')">账号登录</view>
					<view class="buttonBox-btn" @click="$tools.jump('../operate/register')">用户注册</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			agreestatus: false,
			uuid: null
		};
	},
	onShow() {},
	methods: {
		checkJump(url) {
			if (!this.agreestatus) {
				return this.$tools.toast('请先同意用户协议');
			} else {
				this.$tools.jump(url);
			}
		},
		toggleStatus() {
			this.agreestatus = !this.agreestatus;
			console.log(JSON.stringify(this.agreestatus));
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/selectType';
</style>
