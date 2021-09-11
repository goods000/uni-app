<template>
	<view class="page">
		<view class="safety">
			<view class="header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">修改密码</view>
				</view> 
			</view> 
			
			<!-- <view class="safety-phone" v-if="userList.authType == 0">当前绑定的手机号{{ userList.phone }}</view>
			<view class="safety-phone" v-if="userList.authType == 1">当前绑定的邮箱号{{ userList.email }}</view>
			 -->
			<view class="safety-list">
				<view class="safety-list-title">旧密码</view>
				<view class="safety-list-input">
					<input :password="!eyeShowHideArray[1].show" placeholder="请输入您的旧密码" placeholder-style="color:#999999" v-model="oldPsd"/>
					<view class="safety-list-input-image">
						<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix" @click="toggleEyeStatus(1)"></image>
					</view>
				</view>
			</view>
			<view class="safety-list">
				<view class="safety-list-title">新密码</view>
				<view class="safety-list-input">
					<input :password="!eyeShowHideArray[2].show" placeholder="请输入您的新密码" placeholder-style="color:#999999" v-model="newPsd"/>
					<view class="safety-list-input-image">
						<image :src="eyeShowHideArray[2].show ? eyeShow : eyeHide" mode="widthFix" @click="toggleEyeStatus(2)"></image>
					</view>
				</view>
			</view>
			<view class="safety-list">
				<view class="safety-list-title">确认密码</view>
				<view class="safety-list-input">
					<input :password="!eyeShowHideArray[3].show" placeholder="再次确认您的密码" placeholder-style="color:#999999" v-model="againPsd"/>
					<view class="safety-list-input-image">
						<image :src="eyeShowHideArray[3].show ? eyeShow : eyeHide" mode="widthFix" @click="toggleEyeStatus(3)"></image>
					</view>
				</view>
			</view>
			<!-- <view class="safety-list">
				<view class="safety-list-title">短信验证码</view>
				<view class="safety-list-input">
					<input type="text" placeholder="请输入您的验证码" placeholder-style="color:#999999" v-model="code"/>
					<view class="safety-list-input-image">
						<view class="safety-list-input-all" @click="sendCode()">{{ remain }}</view>
					</view>
				</view>
			</view> -->
			
			<view class="initBtn" @click="submit()">确定</view>
			
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
				code:'',
				eyeShow: '../../static/public/icon-login-see.png',
				eyeHide: '../../static/public/icon-login-nosee.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }],
				// 验证码
				remain: '发送验证码',
				isSend: true,
				time: 60,
				timer: null,
				loginStatus:'',
				userList:[],
				phone:''
			}
		},
		onShow() {
			this.loginStatus = uni.getStorageSync('loginStatus');
			// console.log(this.loginStatus);
			this.init();
		},
		methods: {
			init(){
				this.getUserList(); 
			},
			// 获取用户信息
			getUserList() {
				this.$Ajax('/front/userPassphrase/baseInfo', {}, res => {
						if (res.code == 0) {
							this.userList = res.obj;
							// if(this.userList.phone != null){
							// 	this.userList.phone = this.userList.phone.substring(0,3) + "****" + this.userList.phone.substring(7);
							// 	// console.log(this.userList.phone)
							// }
						}
					}
				);
			},
			toggleEyeStatus(index) {
				this.eyeShowHideArray[index].show = !this.eyeShowHideArray[index].show;
			},
			sendCode() {
				uni.showLoading({
					title: '发送中',
					mask: true
				});
				this.$Ajax('/ajax/sendMyCode',{},res => {
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
			submit(){
				if (this.oldPsd == '') {
					return this.$tools.toast('请输入您的旧密码');
				}
				if (this.newPsd == '') {
					return this.$tools.toast('请输入您的新密码');
				}
				if (this.againPsd == '') {
					return this.$tools.toast('再次确认您的密码');
				}
				if (this.newPsd != this.againPsd) {
					return this.$tools.toast('两次输入的密码不一致');
				}
				// if (this.code == '') {				// 	return this.$tools.toast('请输入您的验证码');				// }
				this.$Ajax(
					'/front/userPassphrase/changeTradePwd',
					{
						tradePassword: this.oldPsd,
						newTradePassword: this.newPsd,
						reNewTradePassword: this.againPsd,
						// code: this.code
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.oldPsd = '';
							this.newPsd = '';
							this.againPsd = '';
							// this.$tools.toastJump('修改成功', './safety');
							this.$tools.toastBack(res.msg, 1);
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/safety/safety';
	.initBtn{margin-top: 40%;position: absolute;bottom: 46upx;left: 0;right: 0;margin: auto;}
</style>
