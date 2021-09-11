<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">修改登录密码</view>
			</view>
		</view>

		<!-- <view class="titleBox">
			<view class="titleBox-title">修改登录密码</view>
			<view class="titleBox-note">请设置您的新密码</view>
		</view> -->
		<view class="main">
			<view class="operateBox">
				<view class="operateBox-wrapper">
					<view class="operateBox-item">
						<view class="operateBox-item__label">原登录密码</view>
						<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 0, showCloseBtn: oldPsd != '' }">
							<input
								@blur="blurInput(0)"
								@focus="focusInput(0)"
								placeholder-class="operateBox-item__placeholder"
								placeholder="请输入原登录密码"
								:password="!eyeShowHideArray[0].show"
								v-model="oldPsd"
							/>
							<view class="operateBox-item__fixedBox">
								<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('oldPsd')">
									<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
								</view>
								<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--eye" @click="toggleEyeStatus(0)">
									<image :src="eyeShowHideArray[0].show ? eyeShow : eyeHide" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="operateBox-item">
						<view class="operateBox-item__label">新登录密码</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 1, showCloseBtn: newPsd != '' }">
								<input
									@blur="blurInput(1)"
									@focus="focusInput(1)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="请输入新登录密码"
									:password="!eyeShowHideArray[1].show"
									v-model="newPsd"
								/>
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('newPsd')">
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
						<view class="operateBox-item__label">确认新登录密码</view>
						<view class="operateBox-item__list">
							<view class="operateBox-item__input" :class="{ 'operateBox-item__input--active': isFocus == 2, showCloseBtn: againPsd != '' }">
								<input
									@blur="blurInput(2)"
									@focus="focusInput(2)"
									placeholder-class="operateBox-item__placeholder"
									placeholder="请确认新登录密码"
									:password="!eyeShowHideArray[2].show"
									v-model="againPsd"
								/>
								<view class="operateBox-item__fixedBox">
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--clear" @click="clearData('againPsd')">
										<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
									</view>
									<view class="operateBox-item__fixedBox-btn operateBox-item__fixedBox-btn--eye" @click="toggleEyeStatus(2)">
										<image :src="eyeShowHideArray[2].show ? eyeShow : eyeHide" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- <view class="operateBox-button">
						<view
							class="operateBox-button__btn operateBox-button__btn--blue"
							:class="{ 'operateBox-button__btn--active': oldPsd != '' && newPsd != '' && againPsd != '' }"
							@click="change()"
						>
							修改
						</view>
					</view> -->
				</view>
			</view>
		</view>

		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="change()">修改登录密码</view></view>
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

			eyeShow: '../../static/public/icon-eye-open-brown.png',
			eyeHide: '../../static/public/icon-eye-close-brown.png',
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
			let that = this;
			if (this.oldPsd == '') {
				return this.$tools.toast('请输入原登录密码');
			}
			if (this.newPsd == '') {
				return this.$tools.toast('请输入新登录密码');
			}
			if (this.againPsd == '') {
				return this.$tools.toast('请确认新登录密码');
			}
			if (this.newPsd != this.againPsd) {
				return this.$tools.toast('两次输入的密码不一致');
			}
			this.$Ajax(
				'/front/user/changePwd',
				{
					pwd: this.oldPsd,
					newPwd: this.newPsd,
					reNewPwd: this.newPsd,
					code: ''
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
