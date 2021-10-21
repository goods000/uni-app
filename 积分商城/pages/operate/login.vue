<template>
	<view class="pages bg_header">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>

		<view class="main">
			<view class="titleBox">
				<view class="titleBox-wrapper"><view class="titleBox-title">欢迎登录</view></view>
			</view>

			<view class="operateBox">
				<view class="operateBox-wrapper">
					<view class="operateBox-item">
						<view class="operateBox-item__label">账号</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 0, showCloseBtn: acount != '' }">
								<input
									type="text"
									@blur="blurInput(0)"
									@focus="focusInput(0)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="请输入登录账号"
									v-model="acount"
								/>
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('acount')">
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
									type="text"
									@blur="blurInput(1)"
									@focus="focusInput(1)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="请输入登录密码"
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
						<view class="operateBox-rightButton"><text @click="$tools.jump('../operate/forget')">忘记密码</text></view>
					</view>

					<!-- <view class="operateBox-button"><view class="operateBox-button__btn" @click="login()">登录</view></view> -->

					<!-- <view class="operateBox-textButton"><text @click="$tools.jump('../operate/register')">创建账号&gt;&gt;</text></view> -->
				</view>
			</view>
		</view>

		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="login()">登录</view></view>
				<view class="fixedBox-link">
					还没有账号，
					<view class="fixedBox-link__btn" @click="$tools.jump('../operate/register')">立即注册</view>
					<!-- <view class="fixedBox-link__btn" @click="$tools.switchTab('../index/index')">游客模式</view> -->
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
			zone: '86',
			acount: '',
			password: '',
			deviceId: '',
			isFocus: null,
			eyeShow: '../../static/public/icon-eye-open-white.png',
			eyeHide: '../../static/public/icon-eye-close-white.png',
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }],
			version: ''
		};
	},
	onLoad() {
		this.version = version.version;
	},
	methods: {
		login() {
			if (this.acount == '') {
				return this.$tools.toast('请输入用户名');
			}

			if (this.password == '') {
				return this.$tools.toast('请输入密码');
			}

			this.$Ajax(
				'/front/login',
				{
					name: this.acount,
					password: this.password
				},
				res => {
					console.log(JSON.stringify(res.obj));
					if (res.code == 0) {
						uni.setStorageSync('token', res.obj.token);
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
@import '@/common/scss/pages/operate/operate';
</style>
