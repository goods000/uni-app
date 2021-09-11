<template>
	<view class="page">
		<view class="safety">
			<view class="header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">{{ i18n.global.modify }}{{ i18n.safety.list_02 }}</view>
				</view> 
			</view> 
			
			<view class="safety-phone" v-if="userList.authType == 0">{{ i18n.password.binding }}{{ i18n.global.phone }}{{ userList.phone }}</view>
			<view class="safety-phone" v-if="userList.authType == 1">{{ i18n.password.binding }}{{ i18n.global.email }}{{ userList.email }}</view>
			
			<view class="safety-list">
				<view class="safety-list-title">{{ i18n.password.oldPassword }}</view>
				<view class="safety-list-input">
					<input :password="!eyeShowHideArray[0].show" :placeholder="i18n.password.placeholder_01" placeholder-style="color:#999999" v-model="oldPsd"/>
					<view class="safety-list-input-image">
						<image :src="eyeShowHideArray[0].show ? eyeShow : eyeHide" mode="widthFix" @click="toggleEyeStatus(0)"></image>
					</view>
				</view>
			</view>
			<view class="safety-list">
				<view class="safety-list-title">{{ i18n.password.newPassword }}</view>
				<view class="safety-list-input">
					<input :password="!eyeShowHideArray[1].show" :placeholder="i18n.password.placeholder_02" placeholder-style="color:#999999" v-model="newPsd"/>
					<view class="safety-list-input-image">
						<image :src="eyeShowHideArray[1].show ? eyeShow : eyeHide" mode="widthFix" @click="toggleEyeStatus(1)"></image>
					</view>
				</view>
			</view>
			<view class="safety-list">
				<view class="safety-list-title">{{ i18n.password.cinfigPassword }}</view>
				<view class="safety-list-input">
					<input :password="!eyeShowHideArray[2].show" :placeholder="i18n.password.placeholder_03" placeholder-style="color:#999999" v-model="againPsd"/>
					<view class="safety-list-input-image">
						<image :src="eyeShowHideArray[2].show ? eyeShow : eyeHide" mode="widthFix" @click="toggleEyeStatus(2)"></image>
					</view>
				</view>
			</view>
			<view class="safety-list">
				<view class="safety-list-title">{{ i18n.password.code }}</view>
				<view class="safety-list-input">
					<input type="text" :placeholder="i18n.password.placeholder_04" placeholder-style="color:#999999" v-model="code"/>
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
				oldPsd: '',
				newPsd: '',
				againPsd: '',
				code: '',
				eyeShow: '../../static/public/icon-login-see.png',
				eyeHide: '../../static/public/icon-login-nosee.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }],
				// 验证码
				remain: this.$t('message').global.sendCode,
				isSend: true,
				time: 60,
				timer: null,
				loginStatus:'',
				userList:[],
			}
		},
		computed: {
			i18n() {
				return this.$t('message');
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
				this.$Ajax('/front/user/baseInfo', {}, res => {
						if (res.code == 0) {
							this.userList = res.obj;
							if(this.userList.phone != null){
								this.userList.phone = this.userList.phone.substring(0,3) + "****" + this.userList.phone.substring(7);
								// console.log(this.userList.phone)
							}
						}
					}
				);
			},
			toggleEyeStatus(index) {
				this.eyeShowHideArray[index].show = !this.eyeShowHideArray[index].show;
			},
			sendCode() {
				uni.showLoading({
					title: this.i18n.global.sending,
					mask: true
				});
				this.$Ajax('/ajax/sendMyCode',{},res => {
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
				if (this.oldPsd == '') {
					return this.$tools.toast(this.i18n.password.toast_01);
				}
				if (this.newPsd == '') {
					return this.$tools.toast(this.i18n.password.toast_02);
				}
				if (this.againPsd == '') {
					return this.$tools.toast(this.i18n.password.toast_03);
				}
				if (this.newPsd != this.againPsd) {
					return this.$tools.toast(this.i18n.password.toast_04);
				}
				if (this.code == '') {
					return this.$tools.toast(this.i18n.password.toast_05);
				}
				let that = this;
				this.$Ajax(
					'/front/user/changePwd',
					{
						pwd: this.oldPsd,
						newPwd: this.newPsd,
						reNewPwd: this.againPsd,
						code: this.code,
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							uni.removeStorage({
								key: 'token',
								success() {
									that.$tools.toastJump(this.i18n.global.modifySuccess, '../operate/login');
								}
							})
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
