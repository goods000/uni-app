<template>
	<view class="login">
		<view class="header">
			<view class="header-back-1" @click="$tools.back(1)"></view>
		</view>
		
		<view class="loginBox"><view class="loginBox-title">设置密码</view></view>
		
		<view class="loginFrom">
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-2.png" mode="widthFix"></image>
				</view>
				<input :password="!eyeShowHideArray[0].show" placeholder="请设置登录密码(6-18位字母数字组合)" v-model="password" />
				<image :src="eyeShowHideArray[0].show ? eyeShow : eyeHide" mode="widthFix" class="input-icon-right" @click="toggleEyeStatus(0)"></image>
			</view>
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-2.png" mode="widthFix"></image>
				</view>
				<input :password="!eyeShowHideArray[1].show" placeholder="请确认登录密码" v-model="re_password" />
				<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix" class="input-icon-right" @click="toggleEyeStatus(1)"></image>
			</view>
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-7.png" mode="widthFix"></image>
				</view>
				<input :password="!eyeShowHideArray[2].show" placeholder="请输入交易密码(6位数字)" v-model="pay_password" />
				<image :src="eyeShowHideArray[2].show ? eyeShow : eyeHide" mode="widthFix" class="input-icon-right" @click="toggleEyeStatus(2)"></image>
			</view>
			<view class="loginFrom-box">
				<view class="loginFrom-icon">
					<image src="../../static/operate/icon-login-7.png" mode="widthFix"></image>
				</view>
				<input :password="!eyeShowHideArray[3].show" placeholder="请确认交易密码" v-model="re_pay_password" />
				<image :src="eyeShowHideArray[3].show ? eyeShow : eyeHide" mode="widthFix" class="input-icon-right" @click="toggleEyeStatus(3)"></image>
			</view>
			
			
		</view>
		
		<view class="btn-active-login" @click="edit()">确定</view>
		
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
				this.$Ajax(
					'/user/register',
					{
						username: this.userList.username,
						pushUserId: this.userList.pushUserId,
						email: this.userList.email,
						code: this.userList.code,
						password: md5(this.password).toString(),
						payPassword: md5(this.pay_password).toString(),
					},
					res => {
						if (res.code == 0) {
							this.$tools.toastJump('邮箱号注册成功', '../operate/login');
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
