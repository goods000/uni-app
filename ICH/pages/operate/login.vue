<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.reLaunch('../index/index')"></view></view>
		</view>
		<view class="logoBox"><image src="../../static/operate/icon-logo.png" mode="widthFix"></image></view>

		<view class="operateBox">
			<view class="operateBox-wrapper">
				<view class="operateBox-list">
					<view class="operateBox-list__label">账号</view>
					<view class="operateBox-list__input" :class="{ 'operateBox-list__input--active': isFocus == 0, showCloseBtn: phone != '' }">
						<input @blur="blurInput(0)" @focus="focusInput(0)" placeholder-class="operateBox-list__placeholder" placeholder="请输入注册手机号/邮箱" v-model="phone" />
						<view class="operateBox-list__fixedBox">
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--clear" @click="clearData('phone')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="operateBox-list">
					<view class="operateBox-list__label">密码</view>
					<view class="operateBox-list__input" :class="{ 'operateBox-list__input--active': isFocus == 1, showCloseBtn: password != '' }">
						<input
							@blur="blurInput(1)"
							@focus="focusInput(1)"
							placeholder-class="operateBox-list__placeholder"
							placeholder="请输入密码"
							:password="!eyeShowHideArray[1].show"
							v-model="password"
						/>
						<view class="operateBox-list__fixedBox">
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--clear" @click="clearData('password')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--eye" @click="toggleEyeStatus(1)">
								<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>

				<view class="operateBox-rightButton"><text @click="$tools.jump('../operate/forget')">忘记密码？</text></view>

				<view class="operateBox-button">
					<view class="operateBox-button__btn operateBox-button__btn--blue" :class="{ 'operateBox-button__btn--active': phone != '' && password != '' }" @click="login()">
						登录
					</view>
				</view>

				<view class="operateBox-textButton"><text @click="$tools.jump('../operate/register')">创建账号&gt;&gt;</text></view>
			</view>
		</view>
	</view>
</template>

<script>
import version from '../../components/url.js';
export default {
	data() {
		return {
			zone: '86',
			phone: '',
			password: '',
			isFocus: null,
			eyeShow: '../../static/public/icon-eye-open.png',
			eyeHide: '../../static/public/icon-eye-close.png',
			eyeShowHideArray: [{ show: false }, { show: false }],
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
			uni.showLoading({
				title: '登陆中',
				mask: true
			});
			this.$Ajax(
				'/front/login',
				{
					name: this.phone,
					password: this.password,
					version: this.version,
					type: 0
				},
				res => {
					if (res.code == 0) {
						uni.setStorageSync('gobalUser', this.phone);
						uni.setStorageSync('gobalPsw', this.password);
						uni.setStorageSync('token', res.obj.token);
						uni.setStorageSync('userId', res.obj.id);

						this.$tools.toastSwitchTab('登陆成功', '../index/index');
					}
				}
			);
			uni.hideLoading();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/operate';
</style>
