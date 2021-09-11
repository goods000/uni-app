<template>
	<view class="page">
		<view class="setting">
			
			<view class="header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">{{ i18n.user.list_03 }}</view>
				</view> 
			</view> 
			
			<!-- <view class="setting-box">
				<view class="setting-box-item" @click="$tools.jump('./realName')">
					<view class="setting-box-item-title">{{ i18n.safety.list_01 }}</view>
					<view class="setting-box-item-edit chioce" v-if="authList.authStatus == 0">{{ i18n.status.authStatus_01 }}</view>
					<view class="setting-box-item-edit chioce" v-if="authList.authStatus == 1">{{ i18n.status.authStatus_02 }}</view>
					<view class="setting-box-item-edit chioce" v-if="authList.authStatus == 2">{{ i18n.status.authStatus_03 }}</view>
					<view class="setting-box-item-edit chioce" v-if="authList.authStatus == 3">{{ i18n.status.authStatus_04 }}</view>
				</view>
			</view> -->
			
			<view class="setting-box">
				<view class="setting-box-item" @click="$tools.jump('./editPassword')">
					<view class="setting-box-item-title">{{ i18n.safety.list_02 }}</view>
					<view class="setting-box-item-edit">{{ i18n.safety.toEdit }}</view>
				</view>
				<view class="setting-box-item" @click="$tools.jump('./editPayPassword')">
					<view class="setting-box-item-title">{{ i18n.safety.list_03 }}</view>
					<view class="setting-box-item-edit">{{ i18n.safety.toEdit }}</view>
				</view>
			</view>
			
			<view class="setting-box">
				<!-- <view class="setting-box-item" v-if="userList.phone == null || userList.phone == '' " @click="$tools.jump('./bindPhone')">
					<view class="setting-box-item-title">{{ i18n.safety.list_04 }}</view>
					<view class="setting-box-item-edit">{{ i18n.safety.noBind }}</view>
				</view>
				<view class="setting-box-item" v-else @click="$tools.jump('./editPhone')">
					<view class="setting-box-item-title">{{ i18n.safety.list_04 }}</view>
					<view class="setting-box-item-edit hava">{{ userList.phone }}</view>
				</view> -->
				<view class="setting-box-item" v-if="userList.email == null || userList.email == '' " @click="$tools.jump('./bindEmail')">
					<view class="setting-box-item-title">{{ i18n.safety.list_05 }}</view>
					<view class="setting-box-item-edit">{{ i18n.safety.noBind }}</view>
				</view>
				<view class="setting-box-item" v-else @click="$tools.jump('./editEmail')">
					<view class="setting-box-item-title">{{ i18n.safety.list_05 }}</view>
					<view class="setting-box-item-edit hava">{{ userList.email }}</view>
				</view>
			</view>
			
			
			<view class="initBtn" @click="logout()">{{ i18n.global.signOut }}</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginStatus:'',
				authList:[],
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
			console.log(this.loginStatus);
			this.init();
		},
		methods: {
			init(){
				this.getUserList(); 
			},
			// 获取用户信息
			getUserList() {
				this.$Ajax('/front/user/authInfo', {}, res => {
						if (res.code == 0) {
							this.authList = res.obj.auth;
							this.userList = res.obj.user;
							if(this.userList.phone != null){
								this.userList.phone = this.userList.phone.substring(0,3) + "****" + this.userList.phone.substring(7);
								// console.log(this.userList.phone)
							}
						}
					}
				);
			},
			logout() {
				// console.log(this.i18n.global.safeExitSuccess);
				let that = this;
				this.$Ajax('/front/logout', {}, res => {
					uni.removeStorage({
						key: 'token',
						success() {
							// that.$tools.toastJump(this.i18n.global.safeExitSuccess, '../operate/first');
							uni.setStorageSync('initlanguage','en');
							// uni.removeStorageSync('initlanguage');
							that.$tools.jump('../operate/first');
						}
					});
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/safety/safety';
	.initBtn{margin-top: 30%};
	.page{
		background: #F5F6FA;
		height: 100vh;
		overflow: scroll;
	}
</style>
