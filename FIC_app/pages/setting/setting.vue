<template>
	<view class="pages">
		<view class="">
			<view class="header_bar header_bg">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">安全中心</view>
				</view> 
			</view> 
			
			<view class="user-list">
				<!-- <view class="user-list-type"  @click="$tools.jump('../setting/settingCode')"> -->
				<view class="user-list-type user-mt"  @click="$tools.jump('../setting/editLogin')">
					<view class="user-list-left">
						<view class="user-list-name">修改登录密码</view>
					</view>
					<image src="../../static/public/icon-next.png" class="next_img">
				</view>
				<view class="user-list-type user-mt" @click="$tools.jump('../setting/editPay')">
					<view class="user-list-left">
						<view class="user-list-name">修改交易密码</view>
					</view>
					<image src="../../static/public/icon-next.png" class="next_img">
				</view>
			</view>
			
			<view class="btn-active-login" @click="logout()">安全退出</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
	
		},
		methods: {
			logout() {
				let that = this;
				this.$Ajax('/user/safety/logout', {}, res => {
					uni.removeStorage({
						key: 'token',
						success() {
							that.$tools.toastJump('退出成功', '../operate/login');
						}
					})
				});
			}
		}
	}
</script>


<style>
	@import '@/common/css/style.css';
	.btn-active-login{margin: 35% auto 8% !important;}
</style>
