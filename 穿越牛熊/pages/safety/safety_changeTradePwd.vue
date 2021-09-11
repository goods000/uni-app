<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--line" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">修改交易密码</view>
			</view>
		</view>

		<view class="infoBox">
			<view class="infoBox-wrapper">
				<view class="infoBox-desc">当前绑定账号：{{ phone }}</view>
			</view>
		</view>

		<view class="main">
			<view class="initFormBox">
				<view class="initFormBox-wrapper">
					<view class="initFormBox-item">
						<view class="initFormBox-item__label">新交易密码</view>
						<view class="initFormBox-item__list">
							<view class="initFormBox-item__input" :class="{ 'initFormBox-item__input--active': isFocus == 0, showCloseBtn: newPwd != '' }">
								<input
									@blur="blurInput(0)"
									@focus="focusInput(0)"
									placeholder-class="initFormBox-item__placeholder"
									placeholder="请输入新交易密码"
									:password="!eyeShowHideArray[0].show"
									v-model="newPwd"
								/>
								<view class="initFormBox-item__fixedBox">
									<view class="initFormBox-item__fixedBox-btn initFormBox-item__fixedBox-btn--clear" @click="clearData('newPwd')">
										<image :src="$store.state.inputClear" mode="widthFix"></image>
									</view>
									<view class="initFormBox-item__fixedBox-btn initFormBox-item__fixedBox-btn--eye" @click="toggleEyeStatus(0)">
										<image :src="eyeShowHideArray[0].show ? $store.state.eyeShow : $store.state.eyeHide" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="initFormBox-item">
						<view class="initFormBox-item__label">确认新交易密码</view>
						<view class="initFormBox-item__list">
							<view class="initFormBox-item__input" :class="{ 'initFormBox-item__input--active': isFocus == 1, showCloseBtn: againPwd != '' }">
								<input
									@blur="blurInput(1)"
									@focus="focusInput(1)"
									placeholder-class="initFormBox-item__placeholder"
									placeholder="请输入新交易密码"
									:password="!eyeShowHideArray[1].show"
									v-model="againPwd"
								/>
								<view class="initFormBox-item__fixedBox">
									<view class="initFormBox-item__fixedBox-btn initFormBox-item__fixedBox-btn--clear" @click="clearData('againPwd')">
										<image :src="$store.state.inputClear" mode="widthFix"></image>
									</view>
									<view class="initFormBox-item__fixedBox-btn initFormBox-item__fixedBox-btn--eye" @click="toggleEyeStatus(1)">
										<image :src="eyeShowHideArray[1].show ? $store.state.eyeShow : $store.state.eyeHide" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="initFormBox-item">
						<view class="initFormBox-item__label">验证码</view>
						<view class="initFormBox-item__list">
							<view class="initFormBox-item__input" :class="{ 'initFormBox-item__input--active': isFocus == 2, showCloseBtn: code != '' }">
								<input @blur="blurInput(2)" @focus="focusInput(2)" placeholder-class="initFormBox-item__placeholder" placeholder="请输入验证码" v-model="code" />
								<view class="initFormBox-item__fixedBox">
									<view class="initFormBox-item__fixedBox-btn initFormBox-item__fixedBox-btn--clear" @click="clearData('code')">
										<image :src="$store.state.inputClear" mode="widthFix"></image>
									</view>
								</view>
								<view class="initFormBox-item__verify" @click="sendCode()">{{ remain }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="initButton initButton--fixed"><view class="initButton-btn initButton-btn--style" @click="change()">修改交易密码</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phone: '',
			code: '',
			newPwd: '',
			againPwd: '',
			remain: '发送',
			isSend: true,
			time: 60,
			timer: null,

			isFocus: null,
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }]
		};
	},
	onShow() {
		this.$setStatusBarStyle();
		this.phone = uni.getStorageSync('gobalUser');
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
			if (!this.isSend) {
				return false;
			}

			this.$Ajax('/ajax/sendMyCode', {}, res => {
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
			});
		},

		change() {
			if (this.code == '') {
				return this.$tools.toast('请输入验证码');
			}
			if (this.newPwd == '') {
				return this.$tools.toast('请输入新交易密码');
			}
			if (this.againPwd == '') {
				return this.$tools.toast('请输入新交易密码');
			}
			if (this.newPwd != this.againPwd) {
				return this.$tools.toast('两次输入的密码不一致');
			}

			this.$Ajax(
				'/front/user/modify/tradePwd',
				{
					tradePwd: this.newPwd,
					code: this.code
				},
				res => {
					if (res.code == 0) {
						this.$tools.toastBack('修改成功', 1);
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/safety_changeTradePwd';
</style>
