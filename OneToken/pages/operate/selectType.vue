<template>
	<view class="pages">
		<view class="main">
			<view class="logoBox">
				<view class="logoBox-img"><image src="../../static/firstPage/icon-logo.png" mode="widthFix"></image></view>
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
			<view class="contentBox">
				<view class="contentBox-wrapper">
					<view class="contentBox-title">ONETOKEN</view>
					<view class="contentBox-desc">
						一站式智投先锋社区
						<br />
						赋予生态，携手共识
					</view>
				</view>
			</view>
			<view class="buttonBox">
				<view class="buttonBox-wrapper">
					<view class="buttonBox-btn buttonBox-btn--orange" @click="$tools.jump('../operate/login')">账号登录</view>
					<view class="buttonBox-btn buttonBox-btn--white" @click="$tools.jump('../operate/register')">用户注册</view>
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
