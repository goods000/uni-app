<template>
	<view class="pages">
		<view class="header_bar">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">购买</view>
			</view> 
		</view> 
		
		<view class="productBuy">
			<view class="productBuyBox">
				<view class="tipsBox">
					<view class="tipsBox-wrapper">
						<view class="tipsBox-title">
							<view class="tipsBox-title__label">{{name}}</view>
							<view class="tipsBox-right-title">{{singeTb | number(2)}}TB</view>
						</view>
					</view>
				</view>
				<view class="productBuyBox-list-data">
					<view class="productBuyBox-list-data-title">
						<view class="productBuyBox-list-data-yellow"></view>
						算力单价
					</view>
					<!-- <view class="productBuyBox-list-data-price yellow">{{singeMoney * usdtcny | number(2) }}CNY/{{singeMoney | number(4) }}USDT</view> -->
					<view class="productBuyBox-list-data-price yellow">{{singeMoney | number(4) }}USDT</view>
				</view>
				<view class="productBuyBox-list-data">
					<view class="productBuyBox-list-data-title">
						<view class="productBuyBox-list-data-yellow"></view>
						合约周期
					</view>
					<view class="productBuyBox-list-data-price">{{contractDays}}天</view>
				</view>
			</view>
			
			<view class="productBuyBox-from">
				<view class="productBuyBox-from-box">
					<view class="productBuyBox-from-box-lable">购买份数</view>
					<input type="text" placeholder="请输入购买份数" value="" v-model="num" placeholder-style="color:#CCCCCC"/>
				</view>
				<view class="productBuyBox-from-box">
					<view class="productBuyBox-from-box-lable">交易密码</view>
					<input type="password" placeholder="请输入您的交易密码" value="" v-model="password" placeholder-style="color:#CCCCCC"/>
				</view>
				
				<view class="productBuyBox-data">
					<view class="productBuyBox-data-bold">到手存力</view>
					<view class="productBuyBox-data-bold">{{singeTb*num | number(2)}}TB</view>
				</view>
				<!-- <view class="productBuyBox-data">
					<view class="productBuyBox-data-title">手续费</view>
					<view class="productBuyBox-data-title">0.00 USDT</view>
				</view> -->
			</view>
			
		</view>
		
		<view class="productBuyBtn">
			<view class="productBuyBtn-title">
				<view class="productBuyBtn-title-name">合计：</view>
				<view class="productBuyBtn-title-total">{{singeMoney*num | number(2)}}USDT</view>
			</view>
			<view class="productBuyBtn-btn" @click="config()">
				确认支付
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				singeTb:'',
				contractDays:'',
				num:'',
				password:'',
				usdtcny:'',
				name:'',
			}
		},
		onLoad(value) {
			this.ipfsId = value.value1;
			this.singeTb = value.value2;
			this.contractDays = value.value3;
			this.singeMoney = value.value4;
			this.usdtcny = value.value5;
			this.name = value.value6;
		},
		onShow() {
		},
		methods:{
			config(){
				if (this.num == '' ) {
					return this.$tools.toast('请输入购买份数');
				}
				if (!/^[1-9]\d*$/.test(this.num)) {
					return this.$tools.toast('请输入购买整数T');
				}
				if (this.password == '' ) {
					return this.$tools.toast('请输入您的交易密码');
				}
				this.$Ajax(
					'/front/user/buyProduct',
					{
						ipfsId: this.ipfsId,
						num: this.num,
						pwd: this.password,
					},
					res => {
						if (res.code == 0) {
							this.num = '';
							this.password = '';
							this.$tools.toastBack(res.msg, 1);
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/product/productBuy';
</style>
