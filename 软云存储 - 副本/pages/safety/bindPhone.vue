<template>
	<view class="page">
		<view class="safety">
			
			<view class="header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">手机绑定</view>
				</view> 
			</view> 
			
			<!-- <view class="safety-list">
				<view class="safety-list-title">账号</view>
				<view class="safety-list-input">
					<input type="text" placeholder="请输入您的账号" placeholder-style="color:#999999" v-model="account"/>
				</view>
			</view> -->
			<view class="safety-list">
				<view class="safety-list-title">手机</view>
				<view class="safety-list-input">
					<picker @change="bindPickerChange" :value="index" :range="zoneList" range-key="zone" class="safety-list-input-picker">
						<!-- <view class="uni-input">+{{zoneList[index].zone}}</view> -->
						<view class="uni-input">+{{zone}}</view>
					</picker>
					<input type="text" placeholder="请输入您的手机号" placeholder-style="color:#999999" v-model="phone"/>
				</view>
			</view>
			<view class="safety-list">
				<view class="safety-list-title">手机验证码</view>
				<view class="safety-list-input">
					<input type="text" placeholder="请输入您的验证码" placeholder-style="color:#999999" v-model="code"/>
					<view class="safety-list-input-image">
						<view class="safety-list-input-all" @click="sendCode()">{{ remain }}</view>
					</view>
				</view>
			</view>
			
			<view class="initBtn" @click="submit()">确定</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: '',
				phone: '',
				code: '',
				eyeShow: '../../static/public/icon-login-see.png',
				eyeHide: '../../static/public/icon-login-nosee.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }],
				// 验证码
				remain: '发送验证码',
				isSend: true,
				time: 60,
				timer: null,
				zoneList: [],
				zone: '86',
				index: 0,
			}
		},
		onShow() {
			this.getZoneList();
		},
		methods: {
			toggleEyeStatus(index) {
				this.eyeShowHideArray[index].show = !this.eyeShowHideArray[index].show;
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
				if (this.phone == '') {
					return this.$tools.toast('请输入您的手机号');
				}
				uni.showLoading({
					title: '发送中',
					mask: true
				});
				this.$Ajax('/ajax/sendCode',{
					phoneEmail: this.phone,
					zone: this.zone,
				},res => {
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
				// if (this.account == '') {
				// 	return this.$tools.toast('请输入您的账号');
				// }
				if (this.phone == '') {
					return this.$tools.toast('请输入您的手机号');
				}
				if(this.phone.length!=11 || !/^((1[0-9])+\d{9})$/.test(this.phone)){
					return this.$tools.toast('请输入正确的手机');
				}
				if (this.code == '') {
					return this.$tools.toast('请输入您的验证码');
				}
				this.$Ajax(
					'/front/user/phoneAuth',
					{
						// account: this.account,
						phone: this.phone,
						zone: this.zone,
						code: this.code,
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.$tools.toastJump('绑定成功', './safety');
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
	.page{
		background: #F5F6FA;
		height: 100vh;
		overflow: scroll;
	}
</style>
