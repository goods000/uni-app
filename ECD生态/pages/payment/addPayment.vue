<template>
	<view class="pages">
		<view class="">
			
			<view class="header_bar header_bg header_border">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">添加</view>
				</view> 
			</view>
			
			<view class="indexBox-drawer-userList">
				<view class="indexBox-drawer-userList__item" @click="$tools.jump('./addBank')">
					<view class="indexBox-drawer-userList__item--left">
						<!-- <image src="../../static/payment/icon-payment-bank.png" mode="widthFix"></image> -->
						<view class="indexBox-drawer-userList__item--left_txt">银行卡</view>
					</view>
					<view class="indexBox-drawer-userList__item--right">
						<image src="../../static/public/icon-next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="indexBox-drawer-userList__item" @click="$tools.jump('./addMethods','支付宝')">
					<view class="indexBox-drawer-userList__item--left">
						<!-- <image src="../../static/payment/icon-payment-alipay.png" mode="widthFix"></image> -->
						<view class="indexBox-drawer-userList__item--left_txt">支付宝</view>
					</view>
					<view class="indexBox-drawer-userList__item--right">
						<image src="../../static/public/icon-next.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="indexBox-drawer-userList__item" @click="$tools.jump('./addMethods','微信')">
					<view class="indexBox-drawer-userList__item--left">
						<!-- <image src="../../static/payment/icon-payment-weChat.png" mode="widthFix"></image> -->
						<view class="indexBox-drawer-userList__item--left_txt">微信</view>
					</view>
					<view class="indexBox-drawer-userList__item--right">
						<image src="../../static/public/icon-next.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				
			}
		},
		onShow() {
	
		},
		methods: {
	
		}
	}
</script>

<style lang="scss" scoped>
	@import '/scss/payment';
	.indexBox-drawer-userList__item{margin: 0;padding: 36upx 32upx;}
</style>
