<template>
	<view class="pages">
		<view class="loginBox">
			<view class="header_bar">
				<view class="header">
					<!-- <view class="header-back" @click="$tools.back(1)"></view> -->
					<view class="header-title"></view>
				</view> 
			</view> 
			
			<view class="loginBox-warpper">
				<view class="loginBox-warpper-title">欢迎登录</view>
				<view class="loginBox-warpper-txt">欢迎来到云数贸</view>
			</view>
		</view>
		
		<view class="content">
			<view class="content-warpper">
				<view class="content-warpper-title">账号</view>
				<view class="content-warpper-input">
					<input type="text" placeholder="请输入您的登录账号" placeholder-class="inputColor" v-model="account"
					@blur="blurInput(0)" @focus="focusInput(0)"/>
				</view>
			</view>
			<view class="content-warpper">
				<view class="content-warpper-title">密码</view>
				<view class="content-warpper-input">
					<input :password="!eyeShowHideArray[1].show" placeholder="请输入登录密码" placeholder-class="inputColor" v-model="password"
					@blur="blurInput(1)" @focus="focusInput(1)"/>
					<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix" class="content-warpper-input__see" @click="toggleEyeStatus(1)"></image>
				</view>
			</view>
			<view class="content-forgetTitle">
				<view class="content-forgetTitle-txt" @click="$tools.jump('./forget')">忘记密码？</view>
			</view>
		</view>
		
		<view class="operateBtn">
			<view class="operateBtn-btn" @click="login()">登 录</view>
			<view class="operateBtn-title">还没有账号？<text @click="$tools.jump('./register')">注册</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: '',
				password: '',
				eyeShow: '../../static/operate/icon-login-see.png',
				eyeHide: '../../static/operate/icon-login-nosee.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }]
			};
		},
		onLoad() {
			
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
			login() {
				if (this.account == '') {
					return this.$tools.toast('请输入您的登录账号');
				}
				if (this.password == '') {
					return this.$tools.toast('请输入登录密码');
				}
				this.$Ajax('/front/login',
					{
						name: this.account,
						password: this.password
					},
					res => {
						console.log(JSON.stringify(res.data));
						if (res.code == 0) {
							// uni.setStorageSync('username', this.acount);
							// uni.setStorageSync('password', this.password);
							uni.setStorageSync('token', res.obj.token);
							this.$tools.toastSwitchTab('登录成功', '../index/index');
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/operate/operate';
</style>
