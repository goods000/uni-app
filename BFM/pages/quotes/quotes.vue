<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper"><view class="initHeader-title">行情</view></view>
		</view>
		<view class="quotesBox">
			<view class="quotesBox-wrapper">
				<view class="quotesBox-header">
					<view class="quotesBox-data quotesBox-data--long"><text>名称</text></view>
					<view class="quotesBox-data">最新价</view>
					<view class="quotesBox-data">涨跌幅</view>
				</view>
				<view class="quotesBox-list" v-for="(item, index) in commTradeList" :key="index" @click="goKline(item.tradeId, item.tradeCurrencyName, item.currencyName)">
					<view class="quotesBox-data quotesBox-data--long">
						<view class="quotesBox-icon"><image :src="item.pic" mode="widthFix"></image></view>
						<view class="quotesBox-info">
							<view class="quotesBox-info__title">
								<text class="hidelight">{{ item.tradeCurrencyName }}</text>
								<text>/{{ item.currencyName }}</text>
							</view>
							<view class="quotesBox-info__data">24H量{{ item.tradeNums | number(4) }}</view>
						</view>
					</view>
					<view class="quotesBox-data">
						<view class="quotesBox-info">
							<view class="quotesBox-info__price">
								<text class="hidelight">{{ item.currentPrice | number(4) }}</text>
							</view>
							<view class="quotesBox-info__data">≈{{ (item.usdtPirce * item.currentPrice) | number(2) }}CNY</view>
						</view>
					</view>
					<view class="quotesBox-data">
						<view class="quotesBox-button">
							<view class="quotesBox-button__btn" :class="{ 'quotesBox-button__btn--down': item.riseType == 1, 'quotesBox-button__btn--up': item.riseType == 0 }">
								<text>{{ item.rise }}%</text>
							</view>
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
			commTradeList: [],
			usdtPrice: 0
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getCommTradeList();
		},
		getCommTradeList() {
			this.$Ajax('/search/indexCommTrade', {}, res => {
				if (res.code == 0) {
					console.log(JSON.stringify(res.obj));
					this.commTradeList = res.obj;
					this.commTradeList.forEach(item => {
						if (Number(item.rise) > 0) {
							item.riseType = 0;
						} else if (Number(item.rise) < 0) {
							item.riseType = 1;
						}
						item.cnyPrice = (item.currentPrice * this.usdtPrice).toFixed(2);
					});
				}
			});
		},
		goKline(tradeId, currencyTradeName, currencyName) {
			let that = this;
			
			// #ifdef H5
			uni.setStorageSync('tradeId', tradeId);
			that.$tools.switchTab('../exchange/exchange');
			// #endif
			
			// #ifdef APP-PLUS
			uni.setStorageSync('tradeId', tradeId);
			const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');
			dcRichAlert.show(
				{
					type: '1',
					isbb: '1',
					tradeId: tradeId,
					title: currencyTradeName,
					currencyName: currencyName
				},
				result => {
					// that.$tools.toast('接受回调');
					that.$tools.switchTab('../exchange/exchange');
				}
			);
			// #endif
		},
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/quotes';
</style>
