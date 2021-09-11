<template>
	<view class="login">
		<view class="loginBox"><view class="loginBox-title">欢迎登录！</view></view>
		
		<view class="loginFrom">
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-1.png" mode="widthFix"></image>
				</view>
				<input type="text"  @blur="blurInput(0)" @focus="focusInput(0)"placeholder="请输入您的登录账户/手机号/邮箱号" v-model="acount" 
				placeholder-style="color:#fff" />
			</view>
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-2.png" mode="widthFix"></image>
				</view>
				<input type="password" placeholder="请输入您的登录密码" v-model="password" 
				 @blur="blurInput(1)" @focus="focusInput(1)" placeholder-style="color:#fff" />
			</view>
			<view class="forgetTitle">
				<view class="forgetTitle-txt" @click="$tools.jump('./forget')">忘记密码</view>
			</view>
		</view>
		
		<view class="btn-active-login" @click="login()">确定</view>
		
		<view class="register-title" @click="$tools.jump('./mobileRegister')">
			新用户注册
		</view>
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	
	export default {
		data() {
			return {
				acount: '',
				password: '',
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
			login(e) {
				if (this.acount == '') {
					return this.$tools.toast('请输入您的登录账户/手机号/邮箱号');
				}
			
				if (this.password == '') {
					return this.$tools.toast('请输入密码');
				}
				this.$Ajax(
					'/user/safety/login',
					{
						username: this.acount,
						password: md5(this.password).toString()
					},
					res => {
						console.log(JSON.stringify(res.data));
						if (res.code == 0) {
							// uni.setStorageSync('username', this.acount);
							// uni.setStorageSync('password', this.password);
							uni.setStorageSync('token', res.data.token);
							this.$tools.toastSwitchTab('登录成功', '../index/index');
						}
					}
				);
			}
		}
	}
</script>
	
<style>
	@import '@/common/css/style.css';
	page{background: #FFFFFF;}
	.login{height: 100vh;}
	.btn-active-login{width: 88% !important;}
</style>
