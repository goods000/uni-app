<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>
		<view class="logoBox"><image src="../../static/operate/icon-logo.png" mode="widthFix"></image></view>

		<view class="operateBox">
			<view class="operateBox-wrapper">
				<view class="operateBox-list__label">登陆密码</view>
				<view class="operateBox-list">
					<view class="operateBox-list__input" :class="{ 'operateBox-list__input--active': isFocus == 0, showCloseBtn: pwd != '' }">
						<input
							@blur="blurInput(0)"
							@focus="focusInput(0)"
							placeholder-class="operateBox-placeholder"
							placeholder="请设置登录密码"
							:password="!eyeShowHideArray[0].show"
							v-model="pwd"
						/>
						<view class="operateBox-list__fixedBox">
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--clear" @click="clearData('pwd')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--eye" @click="toggleEyeStatus(0)">
								<image :src="eyeShowHideArray[0].show ? eyeShow : eyeHide" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="operateBox-list">
					<view class="operateBox-list__label">交易密码</view>
					<view class="operateBox-list__input" :class="{ 'operateBox-list__input--active': isFocus == 1, showCloseBtn: tradePwd != '' }">
						<input
							@blur="blurInput(1)"
							@focus="focusInput(1)"
							placeholder-class="operateBox-placeholder"
							placeholder="请设置交易密码"
							:password="!eyeShowHideArray[1].show"
							v-model="tradePwd"
						/>
						<view class="operateBox-list__fixedBox">
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--clear" @click="clearData('tradePwd')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--eye" @click="toggleEyeStatus(1)">
								<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="operateBox-list">
					<view class="operateBox-list__label">邀请码</view>
					<view class="operateBox-list__input" :class="{ 'operateBox-list__input--active': isFocus == 2, showCloseBtn: parentName != '' }">
						<input @blur="blurInput(2)" @focus="focusInput(2)" placeholder-class="operateBox-placeholder" placeholder="请输入邀请码" v-model="parentName" />
						<view class="operateBox-list__fixedBox">
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--clear" @click="clearData('parentName')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="operateBox-button">
					<view
						class="operateBox-button__btn operateBox-button__btn--blue"
						:class="{ 'operateBox-button__btn--active': pwd != '' && tradePwd != '' }"
						@click="register()"
					>
						注册
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
			uuid: '',
			phone: '',
			pwd: '',
			tradePwd: '',
			parentName: '',

			// 验证码
			remain: '发送验证码',
			isSend: true,
			time: 60,
			timer: null,

			// 输入框可见及删除
			isFocus: null,
			eyeShow: '../../static/public/icon-eye-open.png',
			eyeHide: '../../static/public/icon-eye-close.png',
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }]
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

		register() {
			if (this.pwd == '') {
				return this.$tools.toast('请设置登录密码');
			}
			if (this.tradePwd == '') {
				return this.$tools.toast('请设置交易密码');
			}
			
			if (this.tradePwd.length != 6) {
				return this.$tools.toast('请输入6位的交易密码');
			}

			// if(this.parentName == ''){
			// 	return this.$tools.toast('请输入邀请码');
			// }

			this.$Ajax(
				'/front/register',
				{
					pwd: this.pwd,
					tradePwd: this.tradePwd,
					parentName: this.parentName,
					phoneEmail: this.phone,
					uuid: this.uuid,
					zone: ''
				},
				res => {
					if (res.code == 0) {
						this.$tools.toastJump('注册成功', '../operate/login');
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/operate';
</style>
