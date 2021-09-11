<template>
	<view class="login">
		
		<view class="loginBox"><view class="loginBox-title">找回密码</view></view>
		
		<view class="loginFrom">
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-1.png" mode="widthFix"></image>
				</view>
				<input type="text"  @blur="blurInput(0)" @focus="focusInput(0)" placeholder="请输入您要找回密码的账户" v-model="username" 
				placeholder-style="color:#fff" />
			</view>
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-3.png" mode="widthFix"></image>
				</view>
				<input type="text" placeholder="请输入您的手机号/邮箱" v-model="account" placeholder-style="color:#fff" />
			</view>
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-4.png" mode="widthFix"></image>
				</view>
				<input type="text" placeholder="请输入您的短信验证码" v-model="code" placeholder-style="color:#fff" />
				<view class="codeBox">
					<view class="getCode" @click="sendCode()">{{ remain }}</view>
				</view>
			</view>
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-2.png" mode="widthFix"></image>
				</view>
				<input type="password" placeholder="请输入您的登录密码" v-model="password" placeholder-style="color:#fff" />
			</view>
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-22.png" mode="widthFix"></image>
				</view>
				<input type="password" placeholder="请确认登录密码" v-model="re_password" placeholder-style="color:#fff" />
			</view>
			
			
		</view>
		
		<view class="btn-active-login" @click="forget()">确定</view>
		
		<view class="register-title" @click="$tools.back(1)">
			返回登录
		</view>
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	export default {
		data() {
			return {
				username: '',
				account: '',
				code: '',
				password: '',
				re_password: '',
				// 验证码
				remain: '发送验证码',
				isSend: true,
				time: 60,
				timer: null,
				count: 0,
			};
		},
		onLoad() {
			
		},
		methods: {
			toggleEyeStatus(index) {
				this.eyeShowHideArray[index].show = !this.eyeShowHideArray[index].show;
			},
			sendCode() {
				uni.showLoading({
					title: '发送中',
					mask: true
				});
				if (this.account == '' ) {
					return this.$tools.toast('请输入您的手机号/邮箱');
				}
				this.$Ajax(
					'/code/send',
					{
						busType: 'safety',
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
				if (this.username == '' ) {
					return this.$tools.toast('请输入您要找回密码的账户');
				}
				if (this.account == '' ) {
					return this.$tools.toast('请输入您的手机号/邮箱');
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
						username: this.username,
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
	@import '@/common/js/public.js';
	@import '@/common/css/style.css';
	page{background: #FFFFFF;}
	.header{background: none;}
</style>
