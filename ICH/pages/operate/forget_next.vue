<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>
		<view class="logoBox"><image src="../../static/operate/icon-logo.png" mode="widthFix"></image></view>

		<view class="titleBox">
			<view class="titleBox-title">重设密码</view>
			<view class="titleBox-note">密码重设后您的账户将使用新密码登录</view>
		</view>

		<view class="operateBox">
			<view class="operateBox-wrapper">
				<view class="operateBox-list">
					<view class="operateBox-list__label">重设密码</view>
					<view class="operateBox-list__input" :class="{ 'operateBox-list__input--active': isFocus == 0, showCloseBtn: password != '' }">
						<input
							@blur="blurInput(0)"
							@focus="focusInput(0)"
							placeholder-class="operateBox-placeholder"
							placeholder="请输入您的新密码"
							:password="!eyeShowHideArray[0].show"
							v-model="password"
						/>
						<view class="operateBox-list__fixedBox">
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--clear" @click="clearData('password')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--eye" @click="toggleEyeStatus(0)">
								<image :src="eyeShowHideArray[0].show ? eyeShow : eyeHide" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="operateBox-list">
					<view class="operateBox-list__label">确认密码</view>
					<view class="operateBox-list__input" :class="{ 'operateBox-list__input--active': isFocus == 1, showCloseBtn: againPassword != '' }">
						<input
							@blur="blurInput(1)"
							@focus="focusInput(1)"
							placeholder-class="operateBox-placeholder"
							placeholder="请确认您的新密码"
							:password="!eyeShowHideArray[1].show"
							v-model="againPassword"
						/>
						<view class="operateBox-list__fixedBox">
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--clear" @click="clearData('againPassword')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--eye" @click="toggleEyeStatus(1)">
								<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="operateBox-button">
					<view
						class="operateBox-button__btn operateBox-button__btn--blue"
						:class="{ 'operateBox-button__btn--active': password != '' && againPassword != '' }"
						@click="forget()"
					>
						修改
					</view>
				</view>
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
			uuid: '',
			password: '',
			againPassword: '',
			
			remain: '发送验证码',
			isSend: true,
			time: 60,
			timer: null,

			ischecked: false,

			isFocus: null,
			eyeShow: '../../static/public/icon-eye-open.png',
			eyeHide: '../../static/public/icon-eye-close.png',
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }]
		};
	},
	onLoad(option) {
		this.phone = option.value1;
		this.uuid = option.value2;
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

		sendCode() {
			uni.showLoading({
				title: '发送中',
				mask: true
			});
			this.$Ajax(
				'/ajax/sendCode',
				{
					phone: this.phone,
					zone: this.zone
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('发送成功 ');
		
						this.isSend = false;
						this.remain = this.time + 's后重新获取';
						this.timer = setInterval(() => {
							this.time--;
							this.remain = this.time + 's后重新获取';
							if (this.time == 0) {
								clearInterval(this.timer);
								this.remain = '重新获取';
								(this.isSend = true), (this.time = 60);
							}
						}, 1000);
					}
				}
			);
			uni.hideLoading();
		},
		forget(){
			this.$Ajax(
				'/front/forgetPassword',
				{
					phoneEmail: this.phone,
					newPwd: this.password,
					uuid: this.uuid
				},
				res => {
					if (res.code == 0) {
						this.$tools.toastJump('修改成功','../operate/login');
					}
				}
			);
		},	
		
		checkboxChange() {
			this.ischecked = !this.ischecked;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/operate';
</style>
