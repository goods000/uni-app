<template>
	<view class="page">
		<view class="safety">
			
			<view class="header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">{{ i18n.binding.bindEmail }}</view>
				</view> 
			</view> 
			
			<!-- <view class="safety-list">
				<view class="safety-list-title">账号</view>
				<view class="safety-list-input">
					<input type="text" placeholder="请输入您的账号" placeholder-style="color:#999999" v-model="account"/>
				</view>
			</view> -->
			<view class="safety-list">
				<view class="safety-list-title">{{ i18n.safety.list_05 }}</view>
				<view class="safety-list-input">
					<input type="text" :placeholder="i18n.binding.placeholder_02" placeholder-style="color:#999999" v-model="email"/>
				</view>
			</view>
			<view class="safety-list">
				<view class="safety-list-title">{{ i18n.safety.list_05 }}{{ i18n.global.code }}</view>
				<view class="safety-list-input">
					<input type="text" :placeholder="i18n.global.placeholder_code" placeholder-style="color:#999999" v-model="code"/>
					<view class="safety-list-input-image">
						<view class="safety-list-input-all" @click="sendCode()">{{ remain }}</view>
					</view>
				</view>
			</view>
			
			<view class="initBtn" @click="submit()">{{ i18n.global.enter }}</view>
			
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
				remain: this.$t('message').global.sendCode,
				isSend: true,
				time: 60,
				timer: null,
			}
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onShow() {
		},
		methods: {
			toggleEyeStatus(index) {
				this.eyeShowHideArray[index].show = !this.eyeShowHideArray[index].show;
			},
			sendCode() {
				if (this.email == '') {
					return this.$tools.toast(this.i18n.binding.placeholder_02);
				}
				uni.showLoading({
					title: this.i18n.global.sending,
					mask: true
				});
				this.$Ajax('/ajax/sendCode',{
					phoneEmail: this.email,
					zone: this.zone,
				},res => {
						if (res.code == 0) {
							this.$tools.toast(this.i18n.global.sendSuccess);
							this.isSend = false;
							this.remain = this.time + this.i18n.global.reacquire;
							this.timer = setInterval(() => {
								this.time--;
								this.remain = this.time + this.i18n.global.reacquire;
								if (this.time == 0) {
									clearInterval(this.timer);
									this.remain = this.i18n.global.reacquire_01;
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
				if (this.email == '') {
					return this.$tools.toast(this.i18n.binding.placeholder_02);
				}
				if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(this.email)){
					return this.$tools.toast(this.i18n.global.placeholder_04);
				}
				if (this.code == '') {
					return this.$tools.toast(this.i18n.global.placeholder_code);
				}
				this.$Ajax(
					'/front/user/emailAuth',
					{
						// account: this.account,
						email: this.email,
						code: this.code,
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.$tools.toastJump(this.i18n.binding.bindSuccess, './safety');
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
