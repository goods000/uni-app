<template>
	<view class="pages contentBg">
		<view class="loginBox">
			<view class="header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title"></view>
				</view> 
			</view> 
			
			<view class="loginBox-warpper">
				<view class="loginBox-warpper-title">密码设置</view>
				<view class="loginBox-warpper-txt">设置您的账户密码，并填写邀请码</view>
			</view>
		</view>
		
		<view class="content">
			<view class="content-warpper">
				<view class="content-warpper-title">登录密码</view>
				<view class="content-warpper-input">
					<input :password="!eyeShowHideArray[0].show" placeholder="请设置登录密码" placeholder-class="inputColor" v-model="newPassword"
					@blur="blurInput(0)" @focus="focusInput(0)"/>
					<image :src="eyeShowHideArray[0].show ? eyeShow : eyeHide" mode="widthFix" class="content-warpper-input__see" @click="toggleEyeStatus(0)"></image>
				</view>
			</view>
			<view class="content-warpper">
				<view class="content-warpper-title">确认密码</view>
				<view class="content-warpper-input">
					<input :password="!eyeShowHideArray[1].show" placeholder="再次确认您的登陆密码" placeholder-class="inputColor" v-model="configPassword"
					@blur="blurInput(1)" @focus="focusInput(1)"/>
					<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix" class="content-warpper-input__see" @click="toggleEyeStatus(1)"></image>
				</view>
			</view>
			<view class="content-warpper">
				<view class="content-warpper-title">邀请码</view>
				<view class="content-warpper-input">
					<input type="text" placeholder="请填写邀请码" placeholder-class="inputColor" v-model="invite"
					@blur="blurInput(1)" @focus="focusInput(1)"/>
				</view>
			</view>
 		</view>
		
		<view class="operateBtn">
			<view class="operateBtn-btn" @click="config()">完 成</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newPassword: '',
				configPassword: '',
				invite: '',
				eyeShow: '../../static/operate/icon-login-see.png',
				eyeHide: '../../static/operate/icon-login-nosee.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }],
				// 验证码
				remain: '发送验证码',
				isSend: true,
				time: 60,
				timer: null,
				uuid:'',
			};
		},
		onLoad(hash) {
			this.uuid = hash.value1;
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
			config() {
				if (this.newPassword == '') {
					return this.$tools.toast('请设置登录密码');
				}
				if (this.configPassword == '') {
					return this.$tools.toast('再次确认您的登陆密码');
				}
				if (this.configPassword != this.newPassword) {
					return this.$tools.toast('两者密码不一致');
				}
				if (this.invite == '') {
					return this.$tools.toast('请填写邀请码');
				}
				this.$Ajax('/front/register',
					{
						pwd: this.newPassword,
						preId: this.invite,
						uuid: this.uuid
					},
					res => {
						console.log(JSON.stringify(res.data));
						if (res.code == 0) {
							this.$tools.toastJump('注册成功', './login');
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/operate/operate';
	.content-warpper-title-mt{
		margin-top: 20upx;
	}
</style>
