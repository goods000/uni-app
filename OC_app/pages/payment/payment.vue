<template>
	<view class="pages">
		<view class="">
			
			<view class="header_bar header_bg header_border">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">收款方式管理</view>
					<view class="header-right" @click="$tools.jump('./addPayment')">添加</view> 
				</view> 
			</view>
			
			<view class="payment">
				<view class="initNoData" v-if="payList.length == 0">暂无收款方式</view>
				<view class="paymentBox" v-for="(item,index) in payList" :key="index" v-else>
					<view class="paymentBox-list">
						<view class="paymentBox-list__item">
							<view class="paymentBox-list__item--operate">
								<image src="../../static/payment/icon-payment-alipay.png" mode="widthFix" v-if="item.payTypeStr == '支付宝'"></image>
								<image src="../../static/payment/icon-payment-bank.png" mode="widthFix" v-if="item.payTypeStr == '银行卡'"></image>
								<image src="../../static/payment/icon-payment-weChat.png" mode="widthFix" v-if="item.payTypeStr == '微信'"></image>
								<view class="paymentBox-list__item--operate-name">{{item.payTypeStr}}</view>
							</view>
							<image src="../../static/payment/icon-del.png" mode="widthFix" class="paymentBox-list__item--operate-del" @click="del(item.id)"></image>
						</view>
						<view class="paymentBox-list__info">
							<view class="paymentBox-list__info--username">{{item.name}}</view>
							<view class="paymentBox-list__info--number">{{item.no}}</view>
						</view>
					</view>
					
					<!-- <view class="paymentBox-list">
						<view class="paymentBox-list__item">
							<view class="paymentBox-list__item--operate">
								<image src="../../static/payment/icon-payment-bank.png" mode="widthFix"></image>
								<view class="paymentBox-list__item--operate-name">中国建设银行</view>
							</view>
							<image src="../../static/payment/icon-del.png" mode="widthFix" class="paymentBox-list__item--operate-del"></image>
						</view>
						<view class="paymentBox-list__info">
							<view class="paymentBox-list__info--username">肖笑笑</view>
							<view class="paymentBox-list__info--number">6266 **** **** **** 888</view>
						</view>
					</view> -->
				</view>
				
				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNum: 1,
				pageSize: 20,
				pages: 1,
				pageSum: 0,
				payList:[],
			}
		},
		onShow() {
			this.init();
		},
		onReachBottom() {
			if (this.page >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.page++;
				this.getList();
			}
		},
		methods: {
			init(){
				this.getList();
			},
			getList() {
				this.$Ajax('/front/otc/publishPay', {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				}, res => {
						if (res.code == 0) {
							this.payList = res.obj;
						}
					}
				);
			},
			// 删除
			del(uid) {
				this.$Ajax('/front/otc/deletePayById', {
					id: uid,
				}, res => {
						if (res.code == 0) {
							this.getList();
						}
					}
				);
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/payment/payment';
</style>
