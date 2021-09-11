<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>
		<view class="titleBox">
			<view class="titleBox-title">修改登录密码</view>
			<view class="titleBox-note">设置6-20位新登录密码</view>
		</view>

		<view class="operateBox operateBox--setting">
			<view class="operateBox-wrapper">
				<view class="operateBox-list">
					<view class="operateBox-list__label">原登录密码</view>
					<view class="operateBox-list__input" :class="{ 'operateBox-list__input--active': isFocus == 0, showCloseBtn: oldPsd != '' }">
						<input
							@blur="blurInput(0)"
							@focus="focusInput(0)"
							maxlength="20"
							placeholder-class="operateBox-placeholder"
							placeholder="当前登陆密码"
							:password="!eyeShowHideArray[0].show"
							v-model="oldPsd"
						/>
						<view class="operateBox-list__fixedBox">
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--clear" @click="clearData('oldPsd')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--eye" @click="toggleEyeStatus(0)">
								<image :src="eyeShowHideArray[0].show ? eyeShow : eyeHide" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="operateBox-list">
					<view class="operateBox-list__label">新登录密码</view>
					<view class="operateBox-list__input" :class="{ 'operateBox-list__input--active': isFocus == 1, showCloseBtn: newPsd != '' }">
						<input
							@blur="blurInput(1)"
							@focus="focusInput(1)"
							maxlength="20"
							placeholder-class="operateBox-placeholder"
							placeholder="设置新登录密码"
							:password="!eyeShowHideArray[1].show"
							v-model="newPsd"
						/>
						<view class="operateBox-list__fixedBox">
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--clear" @click="clearData('newPsd')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--eye" @click="toggleEyeStatus(1)">
								<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="operateBox-list">
					<view class="operateBox-list__label">确认新登录密码</view>
					<view class="operateBox-list__input" :class="{ 'operateBox-list__input--active': isFocus == 2, showCloseBtn: againPsd != '' }">
						<input
							@blur="blurInput(2)"
							@focus="focusInput(2)"
							maxlength="20"
							placeholder-class="operateBox-placeholder"
							placeholder="请再次输入新密码"
							:password="!eyeShowHideArray[2].show"
							v-model="againPsd"
						/>
						<view class="operateBox-list__fixedBox">
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--clear" @click="clearData('againPsd')">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
							<view class="operateBox-list__fixedBox-btn operateBox-list__fixedBox-btn--eye" @click="toggleEyeStatus(2)">
								<image :src="eyeShowHideArray[2].show ? eyeShow : eyeHide" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="operateBox-button">
					<view
						class="operateBox-button__btn operateBox-button__btn--blue"
						:class="{ 'operateBox-button__btn--active': oldPsd != '' && newPsd != '' && againPsd != '' }"
						@click="change()"
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
			oldPsd: '',
			newPsd: '',
			againPsd: '',

			isFocus: null,

			eyeShow: '../../static/public/icon-eye-open.png',
			eyeHide: '../../static/public/icon-eye-close.png',
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }]
		};
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

		change() {
			if (this.newPsd != this.againPsd) {
				return this.$tools.toast('两次输入的密码不一致');
			}
			// uni.showLoading({
			// 	title: '修改中',
			// 	mask: true
			// });
			this.$Ajax(
				'/front/user/changePwd',
				{
					pwd: this.oldPsd,
					newPwd: this.newPsd,
					reNewPwd: this.newPsd,
					code: ''
				},
				res => {
					if (res.code == 0) {
						uni.removeStorageSync('token');
						this.$tools.toastJump('修改成功', '../operate/login');
					}
				}
			);
			// uni.hideLoading();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/operate';
</style>
