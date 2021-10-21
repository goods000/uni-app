<template>
	<view class="pages contentBg">
		<view class="header_bar header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">忘记密码</view>
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
						<view class="operateBox-item__label">账号</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 0, showCloseBtn: phone != '' }">
								<input
									@blur="blurInput(0)"
									@focus="focusInput(0)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="请输入您的手机号/邮箱"
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
						<view class="operateBox-item__label">验证码</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 1, showCloseBtn: code != '' }">
								<input @blur="blurInput(1)" @focus="focusInput(1)" placeholder-class="operateBox-item__placeholder" placeholder="请输入您的验证码" v-model="code" />
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('code')">
										<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
									</view>
								</view>
								<view class="operateBox-item__verify" @click="sendCode()">{{ remain }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="next()">下一步</view></view>
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
			code: '',

			// 验证码
			remain: '获取验证码',
			isSend: true,
			time: 60,
			timer: null,

			// 勾选框
			ischecked: false,

			// 输入框可见及删除
			isFocus: null,
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }]
		};
	},
	onShow() {
		this.$setStatusBarStyle();
	},
	methods: {
		sendCode() {
			if (!this.isSend) {
				return false;
			}

			if (this.phone == '') {
				return this.$tools.toast('请输入您的手机号/邮箱');
			}
			this.$Ajax(
				'/ajax/sendCode',
				{
					account: this.phone,
					zone: this.zone
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('发送成功');

						this.isSend = false;
						this.remain = this.time + 's';
						this.timer = setInterval(() => {
							this.time--;
							this.remain = this.time + 's';
							if (this.time == 0) {
								clearInterval(this.timer);
								this.remain = '重新获取';
								(this.isSend = true), (this.time = 60);
							}
						}, 1000);
					}
				}
			);
		},

		next() {
			if (this.phone == '') {
				return this.$tools.toast('请输入手机号');
			}
			if (this.code == '') {
				return this.$tools.toast('请输入验证码');
			}

			this.$Ajax(
				'/front/forget/one',
				{
					account: this.phone,
					code: this.code
				},
				res => {
					if (res.code == 0) {
						console.log(JSON.stringify(res));
						this.$tools.jump('../operate/forget_next', res.obj);
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
