<template>
	<view class="pages bg_header">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>

		<view class="main">
			<view class="titleBox">
				<view class="titleBox-wrapper"><view class="titleBox-title--no" :class="{'titleBox-title--active': tabsActive == 0 }" @click="changeTabsActive(0)">手机找回</view></view>
				<view class="titleBox-wrapper"><view class="titleBox-title--no" :class="{'titleBox-title--active': tabsActive == 1 }" @click="changeTabsActive(1)">邮箱找回</view></view>
			</view>

			<view class="operateBox">
				<view class="operateBox-wrapper">
				<!-- 	<view class="operateBox-item">
						<view class="operateBox-item__label">用户名</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 0, showCloseBtn: acount != '' }">
								<input
									type="text"
									@blur="blurInput(0)"
									@focus="focusInput(0)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="请输入用户名"
									v-model="acount"
								/>
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('acount')">
										<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</view>
					</view> -->
					<view class="operateBox-item">
						<view class="operateBox-item__label">{{tabsActive == 0 ? '手机号' : '邮箱账号'}}</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 1, showCloseBtn: phone != '' }">
								<input
									type="text"
									@blur="blurInput(1)"
									@focus="focusInput(1)"
									placeholder-class="operateBox-item__placeholder"
									:placeholder="'请输入注册' + (tabsActive == 0 ? '手机号' : '邮箱账号')"
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
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 2, showCloseBtn: code != '' }">
								<input
									type="text"
									@blur="blurInput(2)"
									@focus="focusInput(2)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="请输入验证码"
									v-model="code"
								/>
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('code')">
										<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
									</view>
								</view>
								<view class="operateBox-item__verify" @click="sendCode()" v-if="isSend">{{ remain }}</view>
								<view class="operateBox-item__verify" v-else>{{ remain }}</view>
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
			eyeShow: '../../static/public/icon-eye-open-white.png',
			eyeHide: '../../static/public/icon-eye-close-white.png',
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }],
			isActive : true,
			tabsActive:0,
		};
	},
	methods: {
		changeTabsActive(index) {
			this.tabsActive = index;
			this.phone = ''
		},
		sendCode() {
			uni.showLoading({
				title: '发送中',
				mask: true
			});
			if (this.phone == '' ) {
				return this.$tools.toast('请输入注册' + (this.tabsActive == 0 ? '手机号' : '邮箱账号'));
			}
			if(this.tabsActive == 0){
				if (this.phone.length!=11 || !/^((1[0-9])+\d{9})$/.test(this.phone)){
					return this.$tools.toast('请输入正确的手机号');
				}
			}
			if(this.tabsActive == 1){
				if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(this.phone)){
					return this.$tools.toast('请输入正确的邮箱');
				}
			}
			this.$Ajax(
				'/ajax/sendCode',
				{
					phoneEmail: this.phone,
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

		next() {
			if (this.phone == '') {
				return this.$tools.toast('请输入注册' + (this.tabsActive == 0 ? '手机号' : '邮箱账号'));
			}
			if (this.code == '') {
				return this.$tools.toast('请输入验证码');
			}
			this.$Ajax(
				'/front/forgetPasswordOne',
				{
					phoneEmail: this.phone,
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
@import '@/common/scss/pages/operate/operate';
</style>
