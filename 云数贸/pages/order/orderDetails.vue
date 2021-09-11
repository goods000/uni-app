<template>
	<view class="pages contentBg">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">订单详情</view>
			</view> 
		</view> 
		<view class="orderDetails">
			<image src="../../static/order/icon-order-status01.png" mode="widthFix" class="orderDetails-image" v-if="orderInfo.status == 0 || orderInfo.status == 3"></image>
			<image src="../../static/order/icon-order-success.png" mode="widthFix" class="orderDetails-image" v-if="orderInfo.status == 2"></image>
			
			<!-- <view class="orderDetails-item" v-if="orderInfo.status == 0">
				<view class="orderDetails-status">待付款</view>
				<view class="orderDetails-title">请按以下的银联信息打款，并上传付款凭证。</view>
			</view> -->
			<view class="orderDetails-item" v-if="orderInfo.status == 0">
				<view class="orderDetails-status">待发放</view>
				<view class="orderDetails-title">恭喜您已成功上传付款凭证！请耐心等待平台给您发放股票。</view>
			</view>
			<view class="orderDetails-item" v-if="orderInfo.status == 2">
				<view class="orderDetails-status">已完成</view>
				<view class="orderDetails-title">恭喜您交易已完成！股数已发放。</view>
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
					<view class="tipsBox-title__label">订单信息</view>
				</view>
			</view>
			<view class="orderBox-list">
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">购买股种：</view>
					<view class="orderBox-list-item-news">{{ orderInfo.sharesName }}</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">股种单价:</view>
					<view class="orderBox-list-item-news">{{ orderInfo.unitPrice }}CNY</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">购买数量:</view>
					<view class="orderBox-list-item-news">{{ orderInfo.num }}</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">购买金额:</view>
					<view class="orderBox-list-item-news">{{ orderInfo.totalPrice }}CNY</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">下单时间：</view>
					<view class="orderBox-list-item-news">{{ orderInfo.createTime }}</view>
				</view>
				<view class="orderBox-list-item" v-if="orderInfo.status == 0 || orderInfo.status == 3">
					<view class="orderBox-list-item-title">完成时间：</view>
					<view class="orderBox-list-item-news">/</view>
				</view>
				<view class="orderBox-list-item" v-if="orderInfo.status == 2">
					<view class="orderBox-list-item-title">完成时间：</view>
					<view class="orderBox-list-item-news">{{ orderInfo.updateTime }}</view>
				</view>
			</view>
		</view>
		
		
		<!-- <view class="orderBtn" v-if="orderInfo.status == 0">
			<view class="orderBtn-btn" @click="$tools.jump('./upload',orderId)">上传付款凭证</view>
		</view> -->
	</view>
</template>

<script>
	export default {
			data(){
				return{
					orderId:'',
					assetInfo:{
						bank_name:'张赢川',bank_bank:'招商银行',bank_address:'梅龙支行',bank_no:'6214 8552 5124 9815',creatTime:'2021.04.27 14:04'
					},
					orderInfo:{
						status:0
					},
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
					this.$Ajax('/front/shares/getOrderInfo', {
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
