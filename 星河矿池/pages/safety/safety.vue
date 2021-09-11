<template>
	<view class="page">
		<view class="setting">
			
			<view class="header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">安全中心</view>
				</view> 
			</view> 
			
			<view class="setting-box">
				<view class="setting-box-item" @click="$tools.jump('./editPayPassword')">
					<view class="setting-box-item-title">密码</view>
					<view class="setting-box-item-edit">去修改</view>
				</view>
			</view>
			
			<view class="setting-box">
				<view class="setting-box-item" @click="$tools.jump('./realName')">
					<view class="setting-box-item-title">实名认证</view>
					<view class="setting-box-item-edit chioce">{{activStr}}</view>
				</view>
			</view>
			
			<!-- <view class="setting-box">
				<view class="setting-box-item" @click="$tools.jump('./editPassword')">
					<view class="setting-box-item-title">登录密码</view>
					<view class="setting-box-item-edit">去修改</view>
				</view>
				<view class="setting-box-item" @click="$tools.jump('./editPayPassword')">
					<view class="setting-box-item-title">交易密码</view>
					<view class="setting-box-item-edit">去修改</view>
				</view>
			</view>
			
			<view class="setting-box">
				<view class="setting-box-item" v-if="userList.phone == null || userList.phone == '' " @click="$tools.jump('./bindPhone')">
					<view class="setting-box-item-title">手机号码</view>
					<view class="setting-box-item-edit">未绑定</view>
				</view>
				<view class="setting-box-item" v-else @click="$tools.jump('./editPhone')">
					<view class="setting-box-item-title">手机号码</view>
					<view class="setting-box-item-edit hava">{{ userList.phone }}</view>
				</view>
				<view class="setting-box-item" v-if="userList.email == null || userList.email == '' " @click="$tools.jump('./bindEmail')">
					<view class="setting-box-item-title">邮箱</view>
					<view class="setting-box-item-edit">未绑定</view>
				</view>
				<view class="setting-box-item" v-else @click="$tools.jump('./editEmail')">
					<view class="setting-box-item-title">邮箱</view>
					<view class="setting-box-item-edit hava">{{ userList.email }}</view>
				</view>
			</view> -->
			
			
			<!-- <view class="initBtn" @click="logout()">退出登录</view> -->
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginStatus:'',
				activStr:'',
				authList:[],
				userList:[],
			}
		},
		onShow() {
			this.loginStatus = uni.getStorageSync('loginStatus');
			console.log(this.loginStatus);
			this.init();
		},
		onLoad(hash) {
		},
		methods: {
			init(){
				this.getUserList(); 
			},
			// 获取实名认证信息
			getUserList() {
				this.$Ajax('/front/userPassphrase/userAuthInfo', {}, res => {
						if (res.code == 0) {
							this.activStr = res.obj.authStatusStr;
						}
					}
				);
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/safety/safety';
	.initBtn{margin-top: 30%;};
</style>
