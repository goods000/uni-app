<template>
	<view class="page">
		<view class="safety">
			
			<view class="header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">修改邮箱绑定</view>
				</view> 
			</view> 
			
			<!-- <view class="safety-list">
				<view class="safety-list-title">账号</view>
				<view class="safety-list-input">
					<input type="text" placeholder="请输入您的账号" placeholder-style="color:#999999" v-model="account"/>
				</view>
			</view> -->
			<view class="safety-list">
				<view class="safety-list-title">邮箱</view>
				<view class="safety-list-input">
					<input type="text" placeholder="请输入您的邮箱号" placeholder-style="color:#999999" v-model="email"/>
				</view>
			</view>
			<view class="safety-list">
				<view class="safety-list-title">邮箱验证码</view>
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
				email: '',
				code: '',
				eyeShow: '../../static/public/icon-login-see.png',
				eyeHide: '../../static/public/icon-login-nosee.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }],
				// 验证码
				remain: '发送验证码',
				isSend: true,
				time: 60,
				timer: null,
				uuid:'',
			}
		},
		onShow() {
			this.getUUID2Fun();
		},
		methods: {
			toggleEyeStatus(index) {
				this.eyeShowHideArray[index].show = !this.eyeShowHideArray[index].show;
			},
			getUUID2Fun() {
				let that = this;
				// #ifdef APP-PLUS
				plus.device.getInfo({
					success: function(e) {
						console.log('getDeviceInfo success: ' + JSON.stringify(e));
						that.uuid = e.uuid;
						console.log('是否有UUID:' + this.uuid);
					},
					fail: function(e) {
						console.log('getDeviceInfo failed: ' + JSON.stringify(e));
					}
				});
				// #endif
				// #ifndef APP-PLUS
				that.uuid = Math.random();
				console.log('是否有UUID:' + this.uuid);
				// #endif
			},
			sendCode() {
				if (this.email == '') {
					return this.$tools.toast('请输入您的邮箱号');
				}
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
				if (this.email == '') {
					return this.$tools.toast('请输入您的邮箱号');
				}
				if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(this.email)){
					return this.$tools.toast('请输入正确的邮箱');
				}
				if (this.code == '') {
					return this.$tools.toast('请输入您的验证码');
				}
				this.$Ajax(
					'/front/user/changeEmail',
					{
						email: this.email,
						code: this.code,
						uuid: this.uuid,
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							that.$tools.toastJump('修改成功', './safety');
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
