<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">订单详情</view>
			</view> 
		</view> 
		<view class="orderDetails">
			<image src="../../static/order/icon-order-status01.png" mode="widthFix" class="orderDetails-image" v-if="orderInfo.status == 0 || orderInfo.status == 1"></image>
			<image src="../../static/order/icon-order-success.png" mode="widthFix" class="orderDetails-image" v-if="orderInfo.status == 2"></image>
			
			<view class="orderDetails-item" v-if="orderInfo.status == 0">
				<view class="orderDetails-status">待付款</view>
				<view class="orderDetails-title">请按以下的银联信息打款，并上传付款凭证。</view>
			</view>
			<view class="orderDetails-item" v-if="orderInfo.status == 1">
				<view class="orderDetails-status">待发放</view>
				<view class="orderDetails-title">恭喜您已成功上传付款凭证！请耐心等待平台给您发放股票。</view>
			</view>
			<view class="orderDetails-item" v-if="orderInfo.status == 2">
				<view class="orderDetails-status">已完成</view>
				<view class="orderDetails-title">恭喜您已成功上传付款凭证！请耐心等待平台给您发放股票。</view>
			</view>
			<view class="orderDetails-item" v-if="orderInfo.status == 3">
				<view class="orderDetails-status">已拒绝</view>
				<view class="orderDetails-title">可联系客服查看拒绝详情</view>
			</view>
			<!-- <view class="orderDetails-item" v-if="orderInfo.status == 0">
				<view class="orderDetails-status">提交成功</view>
				<view class="orderDetails-title">恭喜您，您已成功提交认购订单！请按以下的银联信息打款，并上传付款凭证。</view>
			</view> -->
		</view>
		<view class="mt-bg"></view>
		<view class="orderBox">
			<view class="tipsBox">
				<view class="tipsBox-title">
					<view class="tipsBox-title__label">银联信息</view>
				</view>
			</view>
			<view class="orderBox-list">
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">收款方户名：</view>
					<view class="orderBox-list-item-news">{{ bankInfo.bank_name }}</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">收款方开户行:</view>
					<view class="orderBox-list-item-news">{{ bankInfo.bank_bank }}</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">收款方开户地址:</view>
					<view class="orderBox-list-item-news">{{ bankInfo.bank_address }}</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">银行卡账号：</view>
					<view class="orderBox-list-item-news">{{ bankInfo.bank_no }}</view>
					<view class="orderBox-list-item-copy" @click="$tools.copy(bankInfo.bank_no)">复制</view>
				</view>
				
			</view>
		</view>
		
		
		<view class="orderBtn" v-if="orderInfo.status == 0">
			<view class="orderBtn-btn" @click="$tools.jump('./upload',orderId)">上传付款凭证</view>
		</view>
	</view>
</template>

<script>
	export default {
			data(){
				return{
					orderId:'',
					bankInfo:{},
					orderInfo:{},
				}
			},
			onLoad(hash) {
				this.orderId = hash.value1;
			},
			onShow() {
				this.init();
			},
			methods: {
				init(){
					this.getBankInfo();
					this.getOrderInfo();
				},
				// 获取收款信息
				getBankInfo() {
					this.$Ajax('/front/mine/getBankInfo', {}, res => {
						if (res.code == 0) {
							this.bankInfo = res.obj;
						}
					});
				},
				getOrderInfo() {
					this.$Ajax('/front/mine/getOrderInfo', {
						orderId:this.orderId,
					}, res => {
						if (res.code == 0) {
							this.orderInfo = res.obj;
						}
					});
				},
				
			},
		}
	</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/order/orderDetails';
</style>
