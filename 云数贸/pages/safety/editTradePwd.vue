<template>
	<view class="contentBg">
		<view class="header_bar header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">修改交易密码</view>
			</view> 
		</view> 
		
		<view class="content">
			<view class="content-phone">
				<!-- 当前绑定手机号:{{ phone.substring(0,3) + "****" + phone.substring(7) }} -->
				初始密码:123456
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
			<view class="content-warpper">
				<view class="content-warpper-title">短信验证码</view>
				<view class="content-warpper-input">
					<input type="text" placeholder="请输入您的验证码" placeholder-class="inputColor" v-model="code"
					@blur="blurInput(2)" @focus="focusInput(2)"/>
					<view class="content-warpper-code" @click="sendCode()" v-if="isSend">{{ remain }}</view>
					<view class="content-warpper-code" v-else>{{ remain }}</view>
				</view>
			</view>
		</view>
		
		<view class="orderBtn">
			<view class="orderBtn-btn" @click="config()">修改交易密码</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				code: '',
				newPassword: '',
				configPassword: '',
				eyeShow: '../../static/operate/icon-login-see.png',
				eyeHide: '../../static/operate/icon-login-nosee.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }],
				zone: '86',
				// 验证码
				remain: '获取验证码',
				isSend: true,
				time: 60,
				timer: null,
			}
		},
		onLoad(hash) {
			this.phone = hash.value1;
			console.log(this.phone)
		},
		onShow() {
			
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
			sendCode() {
				uni.showLoading({
					title: '发送中',
					mask: true
				});
				this.$Ajax(
					'/ajax/sendCode',
					{
						phoneEmail: this.phone,
						zone: this.zone
					},
					res => {
						if (res.code == 0) {
							this.$tools.toast('发送成功 ');
							this.isSend = false;
							this.remain = this.time + 's';
							this.timer = setInterval(() => {
								this.time--;
								this.remain = this.time + 's';
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
			config() {
				if (this.newPassword == '') {
					return this.$tools.toast('请输入您的新密码');
				}
				if (this.configPassword == '') {
					return this.$tools.toast('再次确认您的登录密码');
				}
				if (this.configPassword != this.newPassword) {
					return this.$tools.toast('两者密码不一致');
				}
				if (this.code == '') {
					return this.$tools.toast('请输入您的验证码');
				}
				this.$Ajax('/front/user/changeTradePwd',
					{
						code: this.code,
						tradePwd: this.newPassword,
					},
					res => {
						console.log(JSON.stringify(res.data));
						if (res.code == 0) {
							this.$tools.toastBack('修改成功', 1);
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
