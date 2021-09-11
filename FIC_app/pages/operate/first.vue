<template>
	<view class="pages first">
		<view class="logo">
			<view class="logoBox">
				<image src="../../static/public/logo_1.png" mode="widthFix" class="logo-image"></image>
				<view class="logo-title">FIC云算力</view>
				<view class="logo-txt">区 块 金 融    如 此 简 单</view>
			</view>
			
			<view class="btn-login" @click="$tools.jump('../operate/mobileRegister')">用户注册</view>
			<view class="btn-register" @click="$tools.jump('../operate/login')">登录已有账号</view>
			
			<view class="first-title-1">SAFE AND RELIABLE, FOR YOUR DIGITAL TRANSACTION ESCORT</view>
		</view>
	</view>
</template>

<script>
	
</script>

<style>
	@import '@/common/css/style.css';
	.first{background-image: url(../../static/public/firstPage_bg.png) !important;background-position: center;background-repeat: no-repeat;}
</style>
