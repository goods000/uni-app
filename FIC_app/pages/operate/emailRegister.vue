<template>
	<view class="login">
		<view class="loginBox"><view class="loginBox-title">欢迎注册</view></view>
		
		<view class="loginFrom">
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-1.png" mode="widthFix"></image>
				</view>
				<input type="text" placeholder="请设置用户名（少于10字）" v-model="acount" placeholder-style="color:#fff" />
			</view>
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-6.png" mode="widthFix"></image>
				</view>
				<input type="email" placeholder="请输入您的邮箱" v-model="email" placeholder-style="color:#fff" />
			</view>
			<!-- <view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-8.png" mode="widthFix"></image>
				</view>
				<input type="text" placeholder="请输入您的图形验证码" value="" v-model="captcha"/>
				<view class="captchaBox" @click="checkSrc()">
					<image :src="src" mode=""></image>
				</view>
			</view> -->
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
					<image src="../../static/operate/icon-login-5.png" mode="widthFix"></image>
				</view>
				<input type="text" placeholder="请输入您的推荐码" value="" v-model="invite" placeholder-style="color:#fff" />
			</view>
			<view class="forgetTitle">
				<view class="forgetTitle-txt" @click="$tools.jump('./mobileRegister')">手机注册</view>
			</view>
			
		</view>
		
		<view class="btn-active-login" @click="register()">下一步</view>
		
		<view class="register-title" @click="$tools.jump('./login')">
			返回登录
		</view>
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	import webUrl from '../../common/js/url.js';
	export default {
		data() {
			return {
				webUrl: webUrl.webUrl,
				acount: '',
				email: '',
				code: '',
				invite: '',
				captcha: '',
				// 验证码
				remain: '发送验证码',
				isSend: true,
				time: 60,
				timer: null,
				src: webUrl.webUrl + '/code/captcha.jpg',
			};
		},
		onLoad() {
			
		},
		methods: {
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
				if (this.email == '' ) {
					return this.$tools.toast('请输入您的邮箱');
				}
				this.$Ajax(
					'/code/send',
					{
						busType: 'register',
						account: this.email,
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
			register() {
				if (this.acount == ''  || this.acount.length>10) {
					return this.$tools.toast('请设置用户名（少于10字）');
				}
				if (this.email == '' ) {
					return this.$tools.toast('请输入您的邮箱');
				}
				if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(this.email)){
					return this.$tools.toast('请输入正确的邮箱');
				}
				if (this.code == '') {
					return this.$tools.toast('请输入您的短信验证码');
				}
				if (this.invite == '') {
					return this.$tools.toast('请输入您的推荐码');
				}
				const obj = {username: this.acount, email:this.email, code:this.code, pushUserId:this.invite}
				
				uni.setStorageSync('registeData', obj);
				this.$tools.jump('../operate/setEmailPassword');
			}
		}
	}
</script>
	
<style>
	@import '@/common/js/public.js';
	@import '@/common/css/style.css';
	page{background: #FFFFFF;}
</style>
