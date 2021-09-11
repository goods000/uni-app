<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>

		<!-- <view class="bgBox"></view> -->

		<view class="titleBox">
			<view class="titleBox-title">重设密码</view>
			<view class="titleBox-note">密码重设后，您的账户将使用新密码登录</view>
		</view>

		<view class="operateBox">
			<view class="operateBox-wrapper">
				<view class="operateBox-list">
					<view class="operateBox-list__label">重设密码</view>
					<view class="operateBox-list__input" :class="{ 'operateBox-list__input--active': isFocus == 0, showCloseBtn: password != '' }">
						<input
							@blur="blurInput(0)"
							@focus="focusInput(0)"
							placeholder-class="operateBox-list__placeholder"
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
							placeholder-class="operateBox-list__placeholder"
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
				<!-- <view class="operateBox-button">
					<view
						class="operateBox-button__btn operateBox-button__btn--blue"
						:class="{ 'operateBox-button__btn--active': password != '' && againPassword != '' }"
						@click="forget()"
					>
						修改
					</view>
				</view> -->
			</view>
		</view>
		
		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="forget()">修改</view></view>
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
			eyeShow: '../../static/public/icon-eye-open-black.png',
			eyeHide: '../../static/public/icon-eye-close-black.png',
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }]
		};
	},
	onLoad(hash) {
		this.uuid = hash.value1;
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
		
		forget() {
			if (this.password == '') {
				return this.$tools.toast('请输入登录密码');
			}
			
			if (this.password != this.againPassword) {
				return this.$tools.toast('两次输入的密码不相同');
			}
			this.$Ajax(
				'/front/forget/two',
				{
					pwd: this.password,
					uuid: this.uuid
				},
				res => {
					if (res.code == 0) {
						this.$tools.toastJump('修改成功', '../operate/login');
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
