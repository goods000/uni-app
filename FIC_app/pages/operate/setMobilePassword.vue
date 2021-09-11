<template>
	<view class="login">
		<!-- <view class="header">
			<view class="header-back-1" @click="$tools.back(1)"></view>
		</view> -->
		
		<view class="loginBox"><view class="loginBox-title">设置密码</view></view>
		
		<view class="loginFrom">
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-2.png" mode="widthFix"></image>
				</view>
				<input type="password" placeholder="请设置登录密码(6-18位字母数字组合)" v-model="password" placeholder-style="color:#fff" />
			</view>
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-22.png" mode="widthFix"></image>
				</view>
				<input type="password" placeholder="请确认登录密码" v-model="re_password" placeholder-style="color:#fff" />
			</view>
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-2.png" mode="widthFix"></image>
				</view>
				<input type="password" placeholder="请输入交易密码(6位数字)" v-model="pay_password" placeholder-style="color:#fff" />
			</view>
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-22.png" mode="widthFix"></image>
				</view>
				<input type="password" placeholder="请确认交易密码" v-model="re_pay_password" placeholder-style="color:#fff" />
			</view>
			
			
		</view>
		
		<view class="btn-active-login" @click="edit()">确定</view>
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
				userList: [],
				password: '',
				re_password: '',
				pay_password: '',
				re_pay_password: '',
				code: '',
				// 验证码
				remain: '发送验证码',
				isSend: true,
				time: 60,
				timer: null,
				eyeShow: '../../static/operate/icon-login-see.png',
				eyeHide: '../../static/operate/icon-login-nosee.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }]
			};
		},
		onLoad() {
		},
		onShow() {
			this.userList = uni.getStorageSync('registeData');
			console.log(JSON.stringify(this.userList));
		},
		methods: {
			toggleEyeStatus(index) {
				this.eyeShowHideArray[index].show = !this.eyeShowHideArray[index].show;
			},
			edit(){
				if (this.password == '' ) {
					return this.$tools.toast('请设置登录密码(6-18位字母数字组合)');
				}
				if(!/^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/.test(this.password)) {
					return this.$tools.toast('请设置登录密码(6-18位字母数字组合)');
				}
				if (this.re_password == '' ) {
					return this.$tools.toast('请确认登录密码');
				}
				if (this.password != this.re_password){
					return this.$tools.toast('登录密码两者不一致');
				}
				if (this.pay_password == '') {
					return this.$tools.toast('请输入交易密码(6位数字)');
				}
				if(!/^\d{6}$/.test(this.pay_password)){
					return this.$tools.toast('交易密码为6为数字');
				}
				if (this.re_pay_password == '') {
					return this.$tools.toast('请确认交易密码');
				}
				if (this.pay_password != this.re_pay_password){
					return this.$tools.toast('交易密码两者不一致');
				}
				
				// this.userList = uni.getStorageSync('registeData');
				
				this.$Ajax(
					'/user/register',
					{
						username: this.userList.username,
						pushUserId: this.userList.pushUserId,
						mobile: this.userList.mobile,
						code: this.userList.code,
						password: md5(this.password).toString(),
						payPassword: md5(this.pay_password).toString(),
					},
					res => {
						if (res.code == 0) {
							uni.removeStorageSync('registeData');
							this.$tools.toastJump('手机号注册成功', '../operate/login');
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
