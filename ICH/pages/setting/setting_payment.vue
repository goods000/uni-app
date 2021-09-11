<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">收款方式</view>
			</view>
		</view>
		<view class="main">
			<view class="paymentBox">
				<view class="paymentBox-wrapper">
					<view class="paymentBox-list" >
						<view class="paymentBox-list__icon">
							<image src="../../static/payment/icon-wechat-large.png" mode="widthFix"></image>
						</view>
						<view class="paymentBox-list__content" @click="$tools.jump('../setting/setting_bindWechat')">
							<view class="paymentBox-list__title">微信收款码</view>
							<view class="paymentBox-list__info">{{ statusList.wx ? '已绑定' : '未绑定' }}</view>
							<!-- <view class="paymentBox-list__info">已绑定</view> -->
						</view>
						<view class="paymentBox-list__status" v-show="statusList.wx">
							<image src="../../static/payment/icon-verified.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="paymentBox-list">
						<view class="paymentBox-list__icon">
							<image src="../../static/payment/icon-alipay-large.png" mode="widthFix"></image>
						</view>
						<view class="paymentBox-list__content" @click="$tools.jump('../setting/setting_bindAlipay')">
							<view class="paymentBox-list__title">支付宝收款码</view>
							<view class="paymentBox-list__info">{{ statusList.zfb ? '已绑定' : '未绑定' }}</view>
							<!-- <view class="paymentBox-list__info">未绑定</view> -->
						</view>
						<view class="paymentBox-list__status" v-show="statusList.zfb">
							<image src="../../static/payment/icon-verified.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="paymentBox-list">
						<view class="paymentBox-list__icon">
							<image src="../../static/payment/icon-unionpay-large.png" mode="widthFix"></image>
						</view>
						<view class="paymentBox-list__content" @click="$tools.jump('../setting/setting_bindUnionpay')">
							<view class="paymentBox-list__title">银联收款码</view>
							<view class="paymentBox-list__info">{{ statusList.yhk ? '已绑定' : '未绑定' }}</view>
							<!-- <view class="paymentBox-list__info">未绑定</view> -->
						</view>
						<view class="paymentBox-list__status" v-show="statusList.yhk">
							<image src="../../static/payment/icon-verified.png" mode="widthFix"></image>
						</view>
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
			statusList: [],
			wechat:0,
			al:0,
			bank:0,
			wx:0,
			zfb:0,
			yhk:0,
			gesture1:false,
			gesture2:false,
			gesture3:false,
			status:0,
			payType:0,
			bindStatus:0,
		};
	},
	onShow(){
		this.init();
	},
	methods:{
		init(){
			this.getPaymentInfo();
		},
		getPaymentInfo(){
			this.$Ajax('/front/user/toPayStatus', {}, res => {
				console.log(JSON.stringify(res));
				if(res.code == 0){
					this.statusList = res.obj;
				}
			});
			
		}
	}
};
</script>

<style lang="scss" scoped>
.paymentBox{
	padding: 30upx;
	&-list{
		@include flexCenter;
		// background-color: $globalColor-blue;
		border: 1upx solid #c6d2e4;
		margin-bottom: 30upx;
		padding: 30upx;
		border-radius: 15upx;
		
		&__icon{
			width: 80upx;
			@include fullImage;
			margin-right: 60upx;
		}
		
		&__content{
			flex: 1;
			text-align: left;
		}
		
		&__title{
			color: #101010;
			font-size: 32upx;
		}
		
		&__info{
			color: $globalColor-blue;
			font-size: 24upx;
		}
		
		&__status{
			width: 60upx;
			@include fullImage;
		}
	}
}
</style>
