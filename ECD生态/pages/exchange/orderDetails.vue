<template>
	<view class="pages contentBg">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">下单成功</view>
			</view> 
		</view> 
		<view class="orderDetails">
			<image src="../../static/exchange/icon-exchange-success.png" mode="widthFix" class="orderDetails-image"></image>
			<view class="orderDetails-item" >
				<view class="orderDetails-status">提交成功</view>
				<view class="orderDetails-title">恭喜您，您已成功提交收取订单！请耐心等待提供家给您放币。</view>
			</view>
		</view>
		<view class="orderBox">
			<view class="initTilte">
				<view class="initTilte-title">订单信</view><view class="initTilte-tips">息</view>
			</view>
			<view class="orderBox-list">
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">订单编号：</view>
					<view class="orderBox-list-item-news">{{ (detailsList.record || {}).memo }}</view>
					<view class="orderBox-list-item-copy" @click="$tools.copy((detailsList.record || {}).memo)">复制</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">交易数量：</view>
					<view class="orderBox-list-item-news">{{ (detailsList.record || {}).quantity | number(2) }}{{ (detailsList.record || {}).currencyName }}</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">支付金额：</view>
					<view class="orderBox-list-item-news">{{ (((detailsList.record || {}).quantity)*1 * ((detailsList.record || {}).price)*1) | number(2) }}CNY</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">订单生成时间：</view>
					<view class="orderBox-list-item-news">{{ (detailsList.record || {}).createTime }}</view>
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
					this.$Ajax('/front/otc/getRecord', {
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
	@import '/scss/orderDetails';
</style>
