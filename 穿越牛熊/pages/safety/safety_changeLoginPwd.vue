<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initHeader initHeader--line" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">修改登录密码</view>
			</view>
		</view>
		
		<view class="main">
			<view class="initFormBox">
				<view class="initFormBox-wrapper">
					<view class="initFormBox-item">
						<view class="initFormBox-item__label">原登录密码</view>
						<view class="initFormBox-item__input" :class="{ 'initFormBox-item__input--active': isFocus == 0, showCloseBtn: oldPwd != '' }">
							<input
								@blur="blurInput(0)"
								@focus="focusInput(0)"
								placeholder-class="initFormBox-item__placeholder"
								placeholder="请输入原登录密码"
								:password="!eyeShowHideArray[0].show"
								v-model="oldPwd"
							/>
							<view class="initFormBox-item__fixedBox">
								<view class="initFormBox-item__fixedBox-btn initFormBox-item__fixedBox-btn--clear" @click="clearData('oldPwd')">
									<image :src="$store.state.inputClear" mode="widthFix"></image>
								</view>
								<view class="initFormBox-item__fixedBox-btn initFormBox-item__fixedBox-btn--eye" @click="toggleEyeStatus(0)">
									<image :src="eyeShowHideArray[0].show ? $store.state.eyeShow : $store.state.eyeHide" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="initFormBox-item">
						<view class="initFormBox-item__label">新登录密码</view>
						<view class="initFormBox-item__list">
							<view class="initFormBox-item__input" :class="{ 'initFormBox-item__input--active': isFocus == 1, showCloseBtn: newPwd != '' }">
								<input
									@blur="blurInput(1)"
									@focus="focusInput(1)"
									placeholder-class="initFormBox-item__placeholder"
									placeholder="请输入新登录密码"
									:password="!eyeShowHideArray[1].show"
									v-model="newPwd"
								/>
								<view class="initFormBox-item__fixedBox">
									<view class="initFormBox-item__fixedBox-btn initFormBox-item__fixedBox-btn--clear" @click="clearData('newPwd')">
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
						<view class="initFormBox-item__label">确认新登录密码</view>
						<view class="initFormBox-item__list">
							<view class="initFormBox-item__input" :class="{ 'initFormBox-item__input--active': isFocus == 2, showCloseBtn: againPwd != '' }">
								<input
									@blur="blurInput(2)"
									@focus="focusInput(2)"
									placeholder-class="initFormBox-item__placeholder"
									placeholder="请确认新登录密码"
									:password="!eyeShowHideArray[2].show"
									v-model="againPwd"
								/>
								<view class="initFormBox-item__fixedBox">
									<view class="initFormBox-item__fixedBox-btn initFormBox-item__fixedBox-btn--clear" @click="clearData('againPwd')">
										<image :src="$store.state.inputClear" mode="widthFix"></image>
									</view>
									<view class="initFormBox-item__fixedBox-btn initFormBox-item__fixedBox-btn--eye" @click="toggleEyeStatus(2)">
										<image :src="eyeShowHideArray[2].show ? $store.state.eyeShow : $store.state.eyeHide" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="initButton initButton--fixed"><view class="initButton-btn initButton-btn--style" @click="change()">修改登录密码</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			oldPwd: '',
			newPwd: '',
			againPwd: '',

			isFocus: null,
			eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }]
		};
	},
	onShow() {
		this.$setStatusBarStyle();
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
			let that = this;
			if (this.oldPwd == '') {
				return this.$tools.toast('请输入原登录密码');
			}
			if (this.newPwd == '') {
				return this.$tools.toast('请输入新登录密码');
			}
			if (this.againPwd == '') {
				return this.$tools.toast('请确认新登录密码');
			}
			if (this.newPwd != this.againPwd) {
				return this.$tools.toast('两次输入的密码不一致');
			}
			this.$Ajax(
				'/front/user/modify/pwd',
				{
					oldPwd: this.oldPwd,
					pwd: this.newPwd
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						uni.removeStorage({
							key: 'token',
							success() {
								that.$tools.toastJump('修改成功', '../operate/login');
							}
						});
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/safety_changeLoginPwd';
</style>
