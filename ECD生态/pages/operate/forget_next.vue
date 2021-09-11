<template>
	<view class="pages contentBg">
		<view class="header_bar header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">重设密码</view>
			</view>
		</view>
		<view class="titleBox">
			<view class="titleBox-wrapper">
				<view class="titleBox-msg">
					在这里可以重新设置您的
					<br />
					登录密码
				</view>
			</view>
		</view>

		<view class="main">
			<view class="operateBox">
				<view class="operateBox-wrapper">
					<view class="operateBox-item">
						<view class="operateBox-item__label">新密码</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 0, showCloseBtn: pwd != '' }">
								<input
									@blur="blurInput(0)"
									@focus="focusInput(0)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="重新设置您的密码"
									:password="!eyeShowHideArray[0].show"
									v-model="pwd"
								/>
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('pwd')">
										<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
									</view>
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--eye" @click="toggleEyeStatus(0)">
										<image :src="eyeShowHideArray[0].show ? '../../static/public/icon-eyeShow.png' : '../../static/public/icon-eyeHide.png'" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="operateBox-item">
						<view class="operateBox-item__label">确认密码</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 1, showCloseBtn: againPwd != '' }">
								<input
									@blur="blurInput(1)"
									@focus="focusInput(1)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="再次确认您的登录密码"
									:password="!eyeShowHideArray[1].show"
									v-model="againPwd"
								/>
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('againPwd')">
										<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
									</view>
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--eye" @click="toggleEyeStatus(1)">
										<image :src="eyeShowHideArray[1].show ? '../../static/public/icon-eyeShow.png' : '../../static/public/icon-eyeHide.png'" mode="widthFix"></image>
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
			pwd: '',
			againPwd: '',

			remain: '发送验证码',
			isSend: true,
			time: 60,
			timer: null,

			ischecked: false,

			isFocus: null,
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }]
		};
	},
	onLoad(hash) {
		this.uuid = hash.value1;
	},
	onShow() {
	},
	methods: {
		forget() {
			if (this.pwd == '') {
				return this.$tools.toast('请输入登录密码');
			}

			if (this.pwd != this.againPwd) {
				return this.$tools.toast('两次输入的密码不相同');
			}
			this.$Ajax(
				'/front/forget/two',
				{
					pwd: this.pwd,
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
@import '/scss/operate';
</style>
