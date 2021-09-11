<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
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

		<!-- <view class="titleBox">
			<view class="titleBox-title">修改交易密码</view>
			<view class="titleBox-note">向绑定的手机号/邮箱发送验证码</view>
		</view> -->
		<view class="main">
			<view class="operateBox">
				<view class="operateBox-wrapper">
					<view class="operateBox-item">
						<view class="operateBox-item__label">新交易密码</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 0, showCloseBtn: newPsd != '' }">
								<input
									@blur="blurInput(0)"
									@focus="focusInput(0)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="请输入新交易密码"
									:password="!eyeShowHideArray[0].show"
									v-model="newPsd"
								/>
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('newPsd')">
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
						<view class="operateBox-item__label">确认新交易密码</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 1, showCloseBtn: againPsd != '' }">
								<input
									@blur="blurInput(1)"
									@focus="focusInput(1)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="请输入新交易密码"
									:password="!eyeShowHideArray[1].show"
									v-model="againPsd"
								/>
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('againPsd')">
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
						<view class="operateBox-item__label">验证码</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 2, showCloseBtn: code != '' }">
								<input @blur="blurInput(2)" @focus="focusInput(2)" placeholder-class="operateBox-item__placeholder" placeholder="请输入验证码" v-model="code" />
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('code')">
										<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
									</view>
								</view>
							</view>
							<view class="operateBox-item__verify" @click="sendCode()">{{ remain }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="change()">修改交易密码</view></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phone: '',
			code: '',
			newPsd: '',
			againPsd: '',
			remain: '发送',
			isSend: true,
			time: 60,
			timer: null,

			isFocus: null,

			eyeShow: '../../static/public/icon-eye-open-brown.png',
			eyeHide: '../../static/public/icon-eye-close-brown.png',
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }]
		};
	},
	onLoad() {
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
			if (this.newPsd == '') {
				return this.$tools.toast('请输入新交易密码');
			}
			if (this.againPsd == '') {
				return this.$tools.toast('请输入新交易密码');
			}
			if (this.newPsd != this.againPsd) {
				return this.$tools.toast('两次输入的密码不一致');
			}

			this.$Ajax(
				'/front/user/findTradePwd',
				{
					newTradePwd: this.newPsd,
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
