<template>
	<view class="pages contentBg">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">记录详情</view>
			</view> 
		</view> 
		<view class="orderDetails">
			<image v-if="statusName == '通过'" src="../../static/exchange/icon-exchange-success.png" mode="widthFix" class="orderDetails-image"></image>
			<image v-if="statusName == '待审核'"  src="../../static/exchange/icon-exchange-awite.png" mode="widthFix" class="orderDetails-image1"></image>
			<image v-if="statusName == '拒绝'"  src="../../static/exchange/icon-exchange-fail.png" mode="widthFix" class="orderDetails-image1"></image>
			<view class="orderDetails-item" >
				<view class="orderDetails-status">{{ statusName }}</view>
				<view class="orderDetails-title" v-if="statusName == '待审核'">恭喜您已成功提交申请！请耐心等待平台审核。</view>
				<view class="orderDetails-title" v-if="statusName == '通过'">恭喜您已成功通过节点审核，可以购买CNDT。</view>
				<view class="orderDetails-title" v-if="statusName == '拒绝'">非常抱歉您提交的申请！平台已经拒绝</view>
			</view>
		</view>
		<view class="form">
			<view class="formBox">
				<view class="formBox-group">
					<view class="formBox-group__label">姓名</view>
					<input type="text" placeholder-class="formBox-group--input" disabled v-model="name"/>
				</view>
				<view class="formBox-group">
					<view class="formBox-group__label">{{ phone.indexOf('@') <0 ? '手机号' : '邮箱号' }}</view>
					<input type="text" placeholder-class="formBox-group--input" disabled v-model="phone" />
				</view>
				<view class="formBox-group">
					<view class="formBox-group__label">所在区域</view>
					<input type="text" placeholder-class="formBox-group--input" disabled v-model="address" />
				</view>
				<view class="formBox-group">
					<view class="formBox-group__label">质押钱包地址</view>
					<input type="text" placeholder-class="formBox-group--input" disabled v-model="walletAddress" />
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
					name:'',
					phone:'',
					address:'',
					walletAddress:'',
				}
			},
			onLoad(hash) {
				this.statusName = hash.value1;
				this.name = hash.value2;
				this.phone = hash.value3;
				this.address = hash.value4;
				this.walletAddress  = hash.value5;
			},
			onShow() {
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
