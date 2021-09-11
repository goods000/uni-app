<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">修改交易密码</view>
			</view> 
		</view> 
		<view class="form">
			<view class="form-box">
				<view class=" user-mt-b"></view>
				<view class="form-group">
					<view class="form-label">绑定号码</view>
					<input type="text" v-if="userList.mobile == null" v-model="userList.email" disabled/>
					<input type="text" v-if="userList.email == null" v-model="userList.mobile" disabled/>
				</view>
				<view class=" user-mt-b"></view>
				<view class="form-group">
					<view class="form-label">验证码</view>
					<input type="text" placeholder="请输入验证码" v-model="code" />
					<view class="codeBox">
						<view class="getCode" @click="sendCode()">{{ remain }}</view>
					</view>
				</view>
				<view class=" user-mt-b"></view>
				<view class="form-group">
					<view class="form-label">新登录密码</view>
					<input type="password" placeholder="请输入新交易密码" v-model="password" />
				</view>
				<view class=" user-mt-b"></view>
				<view class="form-group">
					<view class="form-label">确认密码</view>
					<input type="password" placeholder="请再次输入交易密码" v-model="re_password" />
				</view>
			</view>
			
			<view class="mt-mb"></view>
			<view class="btn-active-login" @click="submit()">确定</view>
		</view>
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	export default {
		data() {
			return {
				userList:{
					email:'',
					mobile:''
				},
				password: '',
				re_password: '',
				code: '',
				// 验证码
				remain: '发送验证码',
				isSend: true,
				time: 60,
				timer: null
			}
		},
		onShow() {
			this.getUserList()
		},
		methods:{
			// 获取用户信息
			getUserList() {
				this.$Ajax('/user/info', {}, res => {
						if (res.code == 0) {
							this.userList = res.user
						}
					}
				);
			},
			sendCode() {
				uni.showLoading({
					title: '发送中',
					mask: true
				});
				this.$Ajax(
					'/code/auth/send',
					{
						busType: 'safety'
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
			submit() {
				if(this.password == ''){
					return this.$tools.toast('请输入新交易密码');
				}
				if(this.code == ''){
					return this.$tools.toast('请输入验证码');
				}
				if(!/^\d{6}$/.test(this.password)){
					return this.$tools.toast('新交易密码为6为数字');
				}
				if(this.re_password == ''){
					return this.$tools.toast('请再次输入交易密码');
				}
				if(this.password != this.re_password){
					return this.$tools.toast('两者密码不一致');
				}
				this.$Ajax('/user/safety/payPassword', {
					newPayPassword: md5(this.password).toString(),
					confirmPayPassword: md5(this.re_password).toString(),
					code: this.code
				}, res => {
					if (res.code == 0) {
						this.password ='',
						this.re_password ='',
						this.code ='',
						this.$tools.toast(res.msg);
					}
				});
			}
		}
	}
</script>

<style>
	@import '@/common/css/style.css';
	page{background: #fff;}
</style>
