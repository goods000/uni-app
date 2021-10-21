<template>
	<view class="pages contentBg">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">支付成功</view>
			</view> 
		</view> 
		<view class="orderDetails">
			<image src="../../static/exchange/icon-exchange-success.png" mode="widthFix" class="orderDetails-image"></image>
			<view class="orderDetails-item" >
				<view class="orderDetails-status">提交成功</view>
				<view class="orderDetails-title">恭喜您，您已成功提交购买订单！
				请耐心等待平台给您放币。</view>
			</view>
		</view>
		<view class="orderBox">
			<view class="initTilte">
				<view class="initTilte-style">订单信</view><view class="initTilte-tips">息</view>
			</view>
			<view class="orderBox-list">
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">订单编号：</view>
					<view class="orderBox-list-item-news">1433446167399908845</view>
					<view class="orderBox-list-item-copy" @click="$tools.copy(1433446167399908845)">复制</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">交易数量：</view>
					<view class="orderBox-list-item-news">600.00CNDT</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">单价：</view>
					<view class="orderBox-list-item-news">4CNY/1CNDT</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">支付金额：</view>
					<view class="orderBox-list-item-news">2400.00CNY</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">下单时间：</view>
					<view class="orderBox-list-item-news">2021.10.12 15:40</view>
				</view>
			</view>
		</view>
		
		<view class="initBtn initBtn--bottom" @click="$tools.jump('./exchangeDetails',recordId,1)">确定</view>
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
				this.recordId = hash.value1;
			},
			onShow() {
				this.init();
			},
			methods: {
				init(){
					this.getOrderDetails();
				},
				// 订单详情
				getOrderDetails() {
					this.$Ajax('', {
						recordId: this.recordId
					}, res => {
						if (res.code == 0) {
							this.detailsList = res.obj;
							this.buyInfo = res.obj.buyInfo;
						}
					});
				},
			},
		}
	</script>

<style lang="scss" scoped>
	@import '/scss/nodeDetails';
</style>
