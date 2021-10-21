<template>
	<view class="pages contentBg">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">记录详情</view>
			</view> 
		</view> 
		<view class="orderDetails">
			<image v-if="status == 2" src="../../static/exchange/icon-exchange-success.png" mode="widthFix" class="orderDetails-image"></image>
			<image v-if="status == 1"  src="../../static/exchange/icon-exchange-awite.png" mode="widthFix" class="orderDetails-image1"></image>
			<!-- <image v-if="status == '拒绝'"  src="../../static/exchange/icon-exchange-fail.png" mode="widthFix" class="orderDetails-image1"></image> -->
			<view class="orderDetails-item" >
				<view class="orderDetails-status">{{ status == 2 ? '已完成' : '待发放' }}</view>
				<view class="orderDetails-title" v-if="status == 1">恭喜您已成功提交订单！请耐心等待平台审核后给您放币。</view>
				<view class="orderDetails-title" v-if="status == 2" style="width: 100%;">恭喜您交易完成！平台已放币。</view>
				<!-- <view class="orderDetails-title" v-if="status == '拒绝'">拒绝</view> -->
			</view>
		</view>
		<view class="orderBox">
			<view class="initTilte">
				<view class="initTilte-style">订单信</view><view class="initTilte-tips">息</view>
			</view>
			<view class="orderBox-list">
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">订单编号：</view>
					<view class="orderBox-list-item-news">{{ id }}</view>
					<view class="orderBox-list-item-copy" @click="$tools.copy(id)">复制</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">交易数量：</view>
					<view class="orderBox-list-item-news">{{ quantity }}{{ currencyName }}</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">单价：</view>
					<view class="orderBox-list-item-news">{{ priceCny }}CNY/1{{ currencyName }}</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">支付金额：</view>
					<view class="orderBox-list-item-news">{{ quantity*priceCny }}CNY</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">下单时间：</view>
					<view class="orderBox-list-item-news">{{ createTime }}</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">放币时间：</view>
					<view class="orderBox-list-item-news">{{ status == 2 ? putTime : '/' }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
			data(){
				return{
					detailsList:[],
					buyInfo:{},
				}
			},
			onLoad(hash) {
				this.status = hash.value1;
				this.id = hash.value2;
				this.quantity = hash.value3;
				this.priceCny = hash.value4;
				this.currencyName = hash.value5;
				this.createTime  = hash.value6;
				this.putTime  = hash.value7;
			},
		}
	</script>

<style lang="scss" scoped>
	@import '/scss/nodeDetails';
	@import '../payment/scss/payment';
	.form{
		border-top: 20upx solid #F5F5F5;
	}
</style>
