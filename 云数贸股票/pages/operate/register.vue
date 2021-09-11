<template>
	<view class="pages">
		<view class="loginBox">
			<view class="header_bar">
				<view class="header">
					<!-- <view class="header-back" @click="$tools.back(1)"></view> -->
					<view class="header-title"></view>
				</view> 
			</view> 
			
			<view class="loginBox-warpper">
				<view class="loginBox-warpper-title">欢迎注册</view>
				<view class="loginBox-warpper-txt">欢迎来到云数贸</view>
			</view>
		</view>
		
		<view class="content">
			<view class="content__title">手机注册</view>
			<view class="content-warpper">
				<view class="content-warpper-title content-warpper-title-mt">手机号</view>
				<view class="content-warpper-input">
					<picker @change="bindPickerChange" :value="index" :range="zoneList" range-key="zone" class="content-warpper-input-picker">
						<!-- <view class="uni-input">+{{zoneList[index].zone}}</view> -->
						<view class="uni-input">+{{zone}}</view>
					</picker>
					<input type="text" placeholder="请输入注册手机号" placeholder-class="inputColor" v-model="mobile"
					@blur="blurInput(0)" @focus="focusInput(0)"/>
				</view>
			</view>
			<view class="content-warpper content-warpper-mt">
				<view class="content-warpper-input">
					<input type="text" placeholder="请输入您的短信验证码" placeholder-class="inputColor" v-model="code"
					@blur="blurInput(1)" @focus="focusInput(1)"/>
					<view class="content-warpper-code" @click="sendCode()">{{ remain }}</view>
				</view>
			</view>
		</view>
		
		<view class="operateBtn">
			<view class="operateBtn-btn" @click="next()">下一步</view>
			<view class="operateBtn-title">已有账号，<text @click="$tools.jump('./login')">登录</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				eyeShow: '../../static/operate/icon-login-see.png',
				eyeHide: '../../static/operate/icon-login-nosee.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }],
				// 验证码
				remain: '发送验证码',
				isSend: true,
				time: 60,
				timer: null,
				zoneList: [],
				zone: '86',
				index: 0,
			};
		},
		onShow() {
			this.init();
		},
		methods: {
			init(){
				this.getZoneList();
			},
			focusInput(index) {
				this.isFocus = index;
			},
			blurInput(index) {
				this.isFocus = null;
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				let index = e.detail.value;
				this.zone = this.zoneList[index].zone
				console.log(this.zone)
			},
			// 获取区号
			getZoneList() {
				this.$Ajax('/ajax/zoneList',{},
					res => {
						if (res.code == 0) {
							this.zoneList = res.obj;
						}
					}
				);
				uni.hideLoading();
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
				this.$Ajax('/ajax/sendCode',{
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
					return this.$tools.toast('请输入您的短信验证码');
				}
				this.$Ajax('/front/registerOne',{
						phoneEmail: this.mobile,
						code: this.code
					},
					res => {
						console.log(JSON.stringify(res.data));
						if (res.code == 0) {
							this.$tools.jump('./register_next',res.obj);
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
