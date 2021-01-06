<template>
	<view class="login">
		<view class="header_bar">
			<view class="header">
				<view class="header-back-1" @click="$tools.back(1)"></view>
			</view>
		</view>
		
		<view class="loginBox"><view class="loginBox-title">忘记密码</view></view>
		
		<view class="loginFrom">
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-3.png" mode="widthFix"></image>
				</view>
				<input type="text" placeholder="请输入您的手机号/邮箱" v-model="account" />
			</view>
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-8.png" mode="widthFix"></image>
				</view>
				<input type="text" placeholder="请输入您的图形验证码" value="" v-model="captcha"/>
				<view class="captchaBox" @click="checkSrc()">
					<image :src="src" mode=""></image>
				</view>
			</view>
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-4.png" mode="widthFix"></image>
				</view>
				<input type="text" placeholder="请输入您的短信验证码" v-model="code" />
				<view class="codeBox">
					<view class="getCode" @click="sendCode()">{{ remain }}</view>
				</view>
			</view>
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-2.png" mode="widthFix"></image>
				</view>
				<input :password="!eyeShowHideArray[1].show" placeholder="请输入您的登录密码" v-model="password" />
				<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix" class="input-icon-right" @click="toggleEyeStatus(1)"></image>
			</view>
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-2.png" mode="widthFix"></image>
				</view>
				<input :password="!eyeShowHideArray[2].show" placeholder="请确认登录密码" v-model="re_password" />
				<image :src="eyeShowHideArray[2].show ? eyeShow : eyeHide" mode="widthFix" class="input-icon-right" @click="toggleEyeStatus(2)"></image>
			</view>
			
			
		</view>
		
		<view class="btn-active-login" @click="forget()">确定</view>
		
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	import webUrl from '../../common/js/url.js';
	export default {
		data() {
			return {
				account: '',
				captcha: '',
				code: '',
				password: '',
				re_password: '',
				// 验证码
				remain: '发送验证码',
				isSend: true,
				time: 60,
				timer: null,
				count: 0,
				eyeShow: '../../static/operate/icon-login-see.png',
				eyeHide: '../../static/operate/icon-login-nosee.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }],
				src: webUrl.webUrl + '/code/captcha.jpg',
			};
		},
		onLoad() {
			
		},
		methods: {
			toggleEyeStatus(index) {
				this.eyeShowHideArray[index].show = !this.eyeShowHideArray[index].show;
			},
			checkSrc(){
				let newDate = new Date().getTime();
				// console.log(newDate);
				this.src = this.webUrl + "/code/captcha.jpg?t=" + newDate;
			},
			sendCode() {
				uni.showLoading({
					title: '发送中',
					mask: true
				});
				if (this.account == '' ) {
					return this.$tools.toast('请输入您的手机号/邮箱');
				}
				if (this.captcha == '' ) {
					return this.$tools.toast('请输入您的图形验证码');
				}
				this.$Ajax(
					'/code/send',
					{
						busType: 'register',
						account: this.account,
						captcha: this.captcha
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
			forget(){
				if (this.account == '' ) {
					return this.$tools.toast('请输入您的手机号/邮箱');
				}
				if (this.captcha == '' ) {
					return this.$tools.toast('请输入您的图形验证码');
				}
				if (this.code == '' ) {
					return this.$tools.toast('请输入您的验证码');
				}
				if (this.password == '') {
					return this.$tools.toast('请输入您的登录密码');
				}
				if (this.re_password == '') {
					return this.$tools.toast('请确认登录密码');
				}
				if (this.password != this.re_password){
					return this.$tools.toast('登录密码两者不一致');
				}
				this.$Ajax(
					'/user/safety/resetPassword',
					{
						account: this.account,
						code: this.code,
						newPassword: md5(this.password).toString(),
						confirmPassword: md5(this.re_password).toString(),
					},
					res => {
						if (res.code == 0) {
							this.$tools.toastJump('修改成功', '../operate/login');
						}
					}
				);
			}
		}
	}
</script>
	
<style>
	@import '@/common/css/style.css';
	page{background: #FFFFFF !important;}
	.header{background: none;}
</style>
