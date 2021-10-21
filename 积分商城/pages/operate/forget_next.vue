<template>
	<view class="pages bg_header">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>
		<view class="main">
			<view class="titleBox">
				<view class="titleBox-wrapper">
					<view class="titleBox-title">重设密码</view>
					<view class="titleBox-note">密码重置后，下次登录您的账号将使用新密码登录</view>
				</view>
			</view>

			<view class="operateBox">
				<view class="operateBox-wrapper">
					<view class="operateBox-item">
						<view class="operateBox-item__label">新的登录密码</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 0, showCloseBtn: password != '' }">
								<input
									type="text"
									@blur="blurInput(0)"
									@focus="focusInput(0)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="请输入您的登录密码"
									:password="!eyeShowHideArray[0].show"
									v-model="password"
								/>
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('password')">
										<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
									</view>
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--eye" @click="toggleEyeStatus(0)">
										<image :src="eyeShowHideArray[0].show ? eyeShow : eyeHide" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="operateBox-item">
						<view class="operateBox-item__label">确认密码</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 1, showCloseBtn: againPassword != '' }">
								<input
									type="text"
									@blur="blurInput(1)"
									@focus="focusInput(1)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="请再次输入登录密码进行确认"
									:password="!eyeShowHideArray[1].show"
									v-model="againPassword"
								/>
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('againPassword')">
										<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
									</view>
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--eye" @click="toggleEyeStatus(1)">
										<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="forget()">完成</view></view>
				<view class="fixedBox-link"><view class="fixedBox-link__btn">&nbsp;&nbsp;</view></view>
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
			eyeShow: '../../static/public/icon-eye-open-white.png',
			eyeHide: '../../static/public/icon-eye-close-white.png',
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }]
		};
	},
	onLoad(option) {
		this.uuid = option.value1;
	},
	methods: {
		forget() {
			if (this.password == '') {
				return this.$tools.toast('请输入您的登录密码');
			}

			if (this.againPassword == '') {
				return this.$tools.toast('请再次输入登录密码进行确认');
			}
			if (this.password != this.againPassword) {
				return this.$tools.toast('两者密码不一致');
			}
			this.$Ajax(
				'/front/forgetPassword',
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
.titleBox{
	margin-bottom: 75upx;
	&-note{
		margin-top: 35upx;
	}
}
</style>
