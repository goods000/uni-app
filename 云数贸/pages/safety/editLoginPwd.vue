<template>
	<view class="contentBg">
		<view class="header_bar header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">修改登录密码</view>
			</view> 
		</view> 
		
		<view class="content">
			<view class="content-warpper">
				<view class="content-warpper-title">旧密码</view>
				<view class="content-warpper-input">
					<input :password="!eyeShowHideArray[2].show" placeholder="请输入您的旧密码" placeholder-class="inputColor" v-model="oldPassword"
					@blur="blurInput(2)" @focus="focusInput(2)"/>
					<image :src="eyeShowHideArray[2].show ? eyeShow : eyeHide" mode="widthFix" class="content-warpper-input__see" @click="toggleEyeStatus(2)"></image>
				</view>
			</view>
			<view class="content-warpper">
				<view class="content-warpper-title">新密码</view>
				<view class="content-warpper-input">
					<input :password="!eyeShowHideArray[0].show" placeholder="请输入您的新密码" placeholder-class="inputColor" v-model="newPassword"
					@blur="blurInput(0)" @focus="focusInput(0)"/>
					<image :src="eyeShowHideArray[0].show ? eyeShow : eyeHide" mode="widthFix" class="content-warpper-input__see" @click="toggleEyeStatus(0)"></image>
				</view>
			</view>
			<view class="content-warpper">
				<view class="content-warpper-title">确认密码</view>
				<view class="content-warpper-input">
					<input :password="!eyeShowHideArray[1].show" placeholder="再次确认您的登录密码" placeholder-class="inputColor" v-model="configPassword"
					@blur="blurInput(1)" @focus="focusInput(1)"/>
					<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix" class="content-warpper-input__see" @click="toggleEyeStatus(1)"></image>
				</view>
			</view>
		</view>
		
		<view class="orderBtn">
			<view class="orderBtn-btn" @click="config()">修改登录密码</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				oldPassword: '',
				newPassword: '',
				configPassword: '',
				eyeShow: '../../static/operate/icon-login-see.png',
				eyeHide: '../../static/operate/icon-login-nosee.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }],
			}
		},
		onShow() {
			// this.init();
		},
		methods: {
			focusInput(index) {
				this.isFocus = index;
			},
			blurInput(index) {
				this.isFocus = null;
			},
			toggleEyeStatus(index) {
				this.eyeShowHideArray[index].show = !this.eyeShowHideArray[index].show;
			},
			config() {
				if (this.oldPassword == '') {
					return this.$tools.toast('请输入您的旧密码');
				}
				if (this.newPassword == '') {
					return this.$tools.toast('请输入您的新密码');
				}
				if (this.configPassword == '') {
					return this.$tools.toast('再次确认您的登录密码');
				}
				if (this.configPassword != this.newPassword) {
					return this.$tools.toast('两者密码不一致');
				}
				this.$Ajax('/front/user/changePwd',
					{
						pwd: this.oldPassword,
						newPwd: this.newPassword,
						reNewPwd: this.configPassword,
					},
					res => {
						console.log(JSON.stringify(res.data));
						if (res.code == 0) {
							uni.removeStorage({
								key: 'token',
								success() {
									uni.removeStorageSync('statusPopup');
									this.$tools.toastJump('修改成功', '../operate/login');
								}
							})
						}
					}
				);
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/safety/safety';
</style>
