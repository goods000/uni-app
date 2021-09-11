<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--black"><view class="initHeader-wrapper"></view></view>

		<!-- 背景 -->
		<view class="initBg"><image src="../../static/operate/img-bg.jpg" mode="widthFix"></image></view>

		<view class="titleBox">
			<view class="titleBox-wrapper">
				<view class="titleBox-title">欢迎登录</view>
				<view class="titleBox-note">欢迎来到GG</view>
			</view>
		</view>

		<view class="main">
			<view class="planeBox">
				<view class="planeBox-wrapper">
					<view class="operateBox">
						<view class="operateBox-wrapper">
							<view class="operateBox-item">
								<view class="operateBox-item__label">账号</view>
								<view class="operateBox-item__list">
									<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 0, showCloseBtn: phone != '' }">
										<input
											@blur="blurInput(0)"
											@focus="focusInput(0)"
											placeholder-class="operateBox-item__placeholder"
											placeholder="请输入手机号/邮箱"
											v-model="phone"
										/>
										<view class="operateBox-item__fixedBox">
											<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('phone')">
												<image :src="$store.state.inputClear" mode="widthFix"></image>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="operateBox-item">
								<view class="operateBox-item__label">密码</view>
								<view class="operateBox-item__list">
									<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 1, showCloseBtn: pwd != '' }">
										<input
											@blur="blurInput(1)"
											@focus="focusInput(1)"
											placeholder-class="operateBox-item__placeholder"
											placeholder="请输入密码"
											:password="!eyeShowHideArray[1].show"
											v-model="pwd"
										/>
										<view class="operateBox-item__fixedBox">
											<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('pwd')">
												<image :src="$store.state.inputClear" mode="widthFix"></image>
											</view>
											<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--eye" @click="toggleEyeStatus(1)">
												<image :src="eyeShowHideArray[1].show ? $store.state.eyeShow : $store.state.eyeHide" mode="widthFix"></image>
											</view>
										</view>
									</view>
								</view>
								<view class="operateBox-row">
									<view class="operateBox-linkBtn"><text @click="$tools.switchTab('../index/index')">游客模式</text></view>
									<view class="operateBox-linkBtn"><text @click="$tools.jump('../operate/forget')">忘记密码？</text></view>
								</view>

								<view class="operateBox-btn initButton"><view class="initButton-btn initButton-btn--style" @click="login()">登录</view></view>

								<view class="operateBox-textButton">
									还没有账号？
									<text class="operateBox-textButton--style" @click="$tools.jump('../operate/register')">点击注册</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="copyrightBox">
			<view class="copyrightBox-wrapper">
				<!-- <view class="copyrightBox-logo"><image src="../../static/operate/icon-copyright-logo.png" mode="widthFix"></image></view> -->
				<view class="copyrightBox-title">打造区块链顶级量化交易机器人</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			zone: '86',
			phone: '',
			pwd: '',

			isFocus: null,
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }]
		};
	},
	methods: {
		login() {
			this.$Ajax(
				'/front/login',
				{
					account: this.phone,
					pwd: this.pwd
				},
				res => {
					if (res.code == 0) {
						uni.setStorageSync('gobalUser', this.phone);
						uni.setStorageSync('gobalPsw', this.pwd);
						uni.setStorageSync('token', res.obj.token);
						// uni.setStorageSync('userId', res.obj.userId);

						this.$tools.toastSwitchTab('登录成功', '../index/index');
					}
				}
			);
		},
		/* clear & eye */
		focusInput(index) {
			this.isFocus = index;
		},
		blurInput(index) {
			this.isFocus = null;
		},
		clearData(keyName) {
			for (var key in this.$data) {
				if (key == keyName) {
					this.$data[key] = '';
				}
			}
		},
		toggleEyeStatus(index) {
			this.eyeShowHideArray[index].show = !this.eyeShowHideArray[index].show;
		}
		/* End */
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/operate';

[data-theme='light'] {
	background-color: #f5f5f5;
}

[data-theme='dark'] {
	background-color: #0d1625;
}

</style>
