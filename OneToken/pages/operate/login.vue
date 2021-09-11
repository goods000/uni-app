<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>

		<!-- 背景 -->
		<!-- <view class="bgBox"></view> -->

		<view class="titleBox">
			<view class="titleBox-wrapper">
				<view class="titleBox-title">欢迎登录</view>
				<view class="titleBox-note">
					还没有账号？
					<text class="titleBox-note--link" @click="$tools.jump('../operate/register')">去创建</text>
				</view>
			</view>
		</view>

		<view class="main">
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
										<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="operateBox-item">
						<view class="operateBox-item__label">密码</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 1, showCloseBtn: password != '' }">
								<input
									@blur="blurInput(1)"
									@focus="focusInput(1)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="请输入密码"
									:password="!eyeShowHideArray[1].show"
									v-model="password"
								/>
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('password')">
										<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
									</view>
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--eye" @click="toggleEyeStatus(1)">
										<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</view>
						<view class="operateBox-rightButton"><text @click="$tools.jump('../operate/forget')">忘记密码？</text></view>
					</view>

					<!-- <view class="operateBox-button">
					<view class="operateBox-button__btn" :class="{ 'operateBox-button__btn--active': phone != '' && password != '' }" @click="login()">登录</view>
				</view> -->

					<!-- <view class="operateBox-textButton"><text @click="$tools.jump('../operate/register')"></text></view> -->

					<!-- <view class="operateBox-moreBox"><text @click="$tools.jump('../operate/register')">游客模式</text></view> -->
				</view>
			</view>
		</view>

		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="login()">登录</view></view>
				<!-- <view class="fixedBox-link" @click="$tools.switchTab('../index/index')"><view class="fixedBox-link__btn">游客模式</view></view> -->
			</view>
		</view>
	</view>
</template>

<script>
import version from '@/common/js/url.js';
export default {
	data() {
		return {
			zone: '86',
			phone: '',
			password: '',
			deviceId: '',
			isFocus: null,
			eyeShow: '../../static/public/icon-eye-open-black.png',
			eyeHide: '../../static/public/icon-eye-close-black.png',
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }],
			version: ''
		};
	},
	onLoad() {
		this.version = version.version;
	},
	methods: {
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
		},
		/* End */

		login() {
			this.$Ajax(
				'/front/login',
				{
					account: this.phone,
					pwd: this.password
				},
				res => {
					if (res.code == 0) {
						uni.setStorageSync('gobalUser', this.phone);
						uni.setStorageSync('gobalPsw', this.password);
						uni.setStorageSync('token', res.obj.token);
						// uni.setStorageSync('userId', res.obj.userId);

						this.$tools.toastSwitchTab('登陆成功', '../index/index');
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/operate';
</style>
