<template>
	<view class="pages first">
		<view class="logo">
			<view class="logoBox">
				<image src="../../static/public/logo_1.png" mode="widthFix" class="logo-image"></image>
			</view>
			
			<view class="btn-login" @click="$tools.jump('../operate/login')">账号登录</view>
			<view class="btn-register" @click="$tools.jump('../operate/mobileRegister')">用户注册</view>
			
			<view class="first-title">安全可靠,为您的数字交易保驾护航</view>
			<view class="first-title-1">SAFE AND RELIABLE, FOR YOUR DIGITAL TRANSACTION ESCORT</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	@import '@/common/css/style.css';
	page{background: #FFFFFF !important;}
</style>
