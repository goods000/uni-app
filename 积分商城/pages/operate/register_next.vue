<template>
	<view class="pages bg_header">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>

		<view class="main">
			<view class="titleBox">
				<view class="titleBox-wrapper">
					<view class="titleBox-title">密码设置</view>
					<view class="titleBox-note">设置您的账号密码,并填写邀请码</view>
				</view>
			</view>

			<view class="operateBox">
				<view class="operateBox-wrapper">
					<view class="operateBox-item">
						<view class="operateBox-item__label">登录密码</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 0, showCloseBtn: pwd != '' }">
								<input
									type="text"
									@blur="blurInput(0)"
									@focus="focusInput(0)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="请输入您的登录密码"
									:password="!eyeShowHideArray[0].show"
									v-model="pwd"
								/>
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('pwd')">
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
						<view class="operateBox-item__label">交易密码</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 1, showCloseBtn: tradePwd != '' }">
								<input
									type="text"
									@blur="blurInput(1)"
									@focus="focusInput(1)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="请输入您的交易密码"
									:password="!eyeShowHideArray[1].show"
									v-model="tradePwd"
								/>
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('tradePwd')">
										<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
									</view>
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--eye" @click="toggleEyeStatus(1)">
										<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="operateBox-item">
						<view class="operateBox-item__label">邀请码</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 2, showCloseBtn: preId != '' }">
								<input
									type="text"
									@blur="blurInput(2)"
									@focus="focusInput(2)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="请输入邀请码"
									v-model="preId"
								/>
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('preId')">
										<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
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
				<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="register()">完成</view></view>
				<view class="fixedBox-link"><view class="fixedBox-link__btn">&nbsp;&nbsp;</view></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			uuid: '',
			pwd: '',
			tradePwd: '',
			preId: '',

			// 验证码
			remain: '发送验证码',
			isSend: true,
			time: 60,
			timer: null,

			// 输入框可见及删除
			isFocus: null,
			eyeShow: '../../static/public/icon-eye-open-white.png',
			eyeHide: '../../static/public/icon-eye-close-white.png',
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }]
		};
	},
	onLoad(hash) {
		this.uuid = hash.value1;
	},
	methods: {
		register() {
			if (this.pwd == '') {
				return this.$tools.toast('请输入您的登录密码');
			}

			if (this.tradePwd == '') {
				return this.$tools.toast('请输入您的交易密码');
			}

			if (this.preId == '') {
				return this.$tools.toast('请输入邀请码');
			}


			this.$Ajax('/front/register',{
					pwd: this.pwd,
					tradePwd: this.tradePwd,
					preId: this.preId,
					uuid: this.uuid
				},
				res => {
					if (res.code == 0) {
						this.$tools.toastJump('注册成功', '../operate/login');
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
.titleBox{
	margin-bottom: 75upx;
	&-note{
		margin-top: 35upx;
	}
}
</style>
