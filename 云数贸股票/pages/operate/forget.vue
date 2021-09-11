<template>
	<view class="pages">
		<view class="loginBox">
			<view class="header_bar">
				<view class="header">
					<view class="header-white" @click="$tools.back(1)"></view>
					<view class="header-title"></view>
				</view> 
			</view> 
			
			<view class="loginBox-warpper">
				<view class="loginBox-warpper-title">忘记密码</view>
				<view class="loginBox-warpper-txt">在这里可以重新设置您的登录密码</view>
			</view>
		</view>
		
		<view class="content">
			<view class="content-warpper">
				<view class="content-warpper-title content-warpper-title-mt">注册手机号</view>
				<view class="content-warpper-input">
					<input type="text" placeholder="请输入注册手机号" placeholder-class="inputColor" v-model="mobile"
					@blur="blurInput(0)" @focus="focusInput(0)"/>
				</view>
			</view>
			<view class="content-warpper">
				<view class="content-warpper-title">短信验证码</view>
				<view class="content-warpper-input">
					<input type="text" placeholder="请输入您的验证码" placeholder-class="inputColor" v-model="code"
					@blur="blurInput(1)" @focus="focusInput(1)"/>
					<view class="content-warpper-code" @click="sendCode()">{{ remain }}</view>
				</view>
			</view>
 		</view>
		
		<view class="operateBtn">
			<view class="operateBtn-btn" @click="next()">下一步</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				zone: '86',
				mobile: '',
				code: '',
				// 验证码
				remain: '发送验证码',
				isSend: true,
				time: 60,
				timer: null,
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
			sendCode() {
				uni.showLoading({
					title: '发送中',
					mask: true
				});
				if (this.mobile == '' ) {
					return this.$tools.toast('请输入您的手机号');
				}
				if (this.mobile.length!=11 || !/^((1[0-9])+\d{9})$/.test(this.mobile)){
					return this.$tools.toast('请输入正确的手机号');
				}
				this.$Ajax('/ajax/sendCode',
					{
						zone: this.zone,
						phoneEmail: this.mobile,
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
			next() {
				if (this.mobile == '') {
					return this.$tools.toast('请输入注册手机号');
				}
				if (this.mobile.length!=11 || !/^((1[0-9])+\d{9})$/.test(this.mobile)){
					return this.$tools.toast('请输入正确的手机号');
				}
				if (this.code == '') {
					return this.$tools.toast('请输入您的验证码');
				}
				this.$Ajax('/front/forgetPasswordOne',
					{
						phoneEmail: this.mobile,
						code: this.code
					},
					res => {
						console.log(JSON.stringify(res.data));
						if (res.code == 0) {
							this.$tools.jump('./forget_next',res.obj);
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
