<template>
	<view class="page">
		<view class="header_bar">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">{{ i18n.productBuy.title }}</view>
			</view> 
		</view> 
		
		<view class="productBuy">
			<view class="productBuyBox">
				<view class="tipsBox">
					<view class="tipsBox-wrapper">
						<view class="tipsBox-title">
							<view class="tipsBox-title__label" v-if="langType == 'cn'">{{name}}</view>
							<view class="tipsBox-title__label" v-if="langType == 'en'">{{remarks}}</view>
							<view class="tipsBox-right-title">{{singeTb | number(2)}}TB</view>
						</view>
					</view>
				</view>
				<view class="productBuyBox-list-data">
					<view class="productBuyBox-list-data-title">
						<view class="productBuyBox-list-data-yellow"></view>
						{{ i18n.productBuy.single_price }}
					</view>
					<view class="productBuyBox-list-data-price yellow">{{singeMoney | number(4) }}USDT</view>
				</view>
				<view class="productBuyBox-list-data">
					<view class="productBuyBox-list-data-title">
						<view class="productBuyBox-list-data-yellow"></view>
						{{ i18n.productBuy.contract_day }}
					</view>
					<view class="productBuyBox-list-data-price">{{contractDays}}{{ i18n.product.days }}</view>
				</view>
			</view>
			
			<view class="productBuyBox-from">
				<view class="productBuyBox-from-box">
					<view class="productBuyBox-from-box-lable">{{ i18n.productBuy.buy_share }}</view>
					<input type="text" :placeholder="i18n.productBuy.toast_01" value="" v-model="num" placeholder-style="color:#CCCCCC"/>
				</view>
				<view class="productBuyBox-from-box">
					<view class="productBuyBox-from-box-lable">{{ i18n.global.tradePassword }}</view>
					<input type="password" :placeholder="i18n.productBuy.toast_02" value="" v-model="password" placeholder-style="color:#CCCCCC"/>
				</view>
				
				<view class="productBuyBox-data">
					<view class="productBuyBox-data-bold">{{ i18n.productBuy.in_hand }}</view>
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
				<view class="productBuyBtn-title-name">{{ i18n.productBuy.total }}：</view>
				<view class="productBuyBtn-title-total">{{singeMoney*num | number(2)}}USDT</view>
			</view>
			<view class="productBuyBtn-btn" @click="config()">
				{{ i18n.productBuy.config }}
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
				remarks:'',
				langType:'',
			}
		},
		onLoad(value) {
			this.ipfsId = value.value1;
			this.singeTb = value.value2;
			this.contractDays = value.value3;
			this.singeMoney = value.value4;
			this.usdtcny = value.value5;
			this.name = value.value6;
			this.remarks = value.value7;
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onShow() {
			this.langType = uni.getStorageSync('initlanguage');
		},
		methods:{
			config(){
				if (this.num == '' ) {
					return this.$tools.toast(this.i18n.productBuy.toast_01);
				}
				if (!/^[1-9]\d*$/.test(this.num)) {
					return this.$tools.toast(this.i18n.productBuy.toast_03);
				}
				if (this.password == '' ) {
					return this.$tools.toast(this.i18n.productBuy.toast_02);
				}
				this.$Ajax(
					'/front/miner/buyProduct',
					{
						ipfsId: this.ipfsId,
						num: this.num,
						pwd: this.password,
					},
					res => {
						if (res.code == 0) {
							this.$tools.jump('./success',this.num,this.name,this.remarks);
							// this.$tools.toastBack(res.msg, 1);
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
