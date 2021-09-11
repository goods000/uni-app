<template>
	<view class="pages">
		<view class="">
			<view class="header_bar header_bg header_border">
				<view class="header">
					<view class="header-title">行情</view>
				</view>
			</view>

			<view class="indexBox">
				<view class="indexBox_tabs">
					<view class="indexBox_tabs-list">
						<view class="" v-for="(item,index) in areaList" :key="index">
							<view class="indexBox_tabs-list-txt" :class="{ 'active': tabsActive == index }" @click="changeTabsActive(index)">{{item.name}}</view>
						</view>
						<!-- <view class="indexBox_tabs-list-txt" :class="{ 'active': tabsActive == 2 }" @click="changeTabsActive(2)">USDT</view>
						<view class="indexBox_tabs-list-txt" :class="{ 'active': tabsActive == 3 }" @click="changeTabsActive(3)">BTC</view>
						<view class="indexBox_tabs-list-txt" :class="{ 'active': tabsActive == 4 }" @click="changeTabsActive(4)">ETH</view> -->
					</view>
				</view>
				<view class="indexBox">
					<view class="indexBox-price-list">
						<view class="indexBox-price-list-header">
							<view class="indexBox-price-list-header__item">名称</view>
							<view class="indexBox-price-list-header__item">最新价</view>
							<view class="indexBox-price-list-header__item">跌涨幅</view>

							<!-- <view class="indexBox-price-list-header__item" :class="[sort_2 === 0 ? 'indexBox-price-list-header__item_up' : 'indexBox-price-list-header__item_down']" @click="getSubmitList(2)">名称</view>
							<view class="indexBox-price-list-header__item" :class="[sort_1 === 0 ? 'indexBox-price-list-header__item_up' : 'indexBox-price-list-header__item_down']" @click="getSubmitList(1)">最新价</view>
							<view class="indexBox-price-list-header__item" :class="[sort_0 === 0 ? 'indexBox-price-list-header__item_up' : 'indexBox-price-list-header__item_down']" @click="getSubmitList(0)">跌涨幅</view>
						 -->
						</view>
						<view class="initNoData" v-if="coinList.length == 0">暂无交易对</view>
						<view class="indexBox-price-list-box" v-for="(item, index) in coinList" :key="index" @click="goKline(item.tradeId, item.tradeCurrencyName, item.currencyName)">
							<view class="indexBox-price-list-box__item">
								<view class="coin_name">
									<view class="introduce">{{ item.tradeCurrencyName}}</view>
									<view class="coin_b">/{{ item.currencyName}}</view>
								</view>
								<view class="cny">24H量 {{ item.tradeNums}}</view>
							</view>
							<view class="indexBox-price-list-box__item">
								<view class="title">{{ item.currentPrice | number(4) }}</view>
								<view class="cny">￥{{ item.usdtPirce * item.currentPrice | number(4) }}</view>
							</view>
							<view class="indexBox-price-list-box__item">
								<view class="coin_state" :class="item.rise < 0 ? 'coin_drop' : 'coin_rise'">{{ item.rise }}%</view>
								<!-- <view class="coin_state coin_rise" v-else>{{ item.rise }}%</view> -->
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
				areaList: [],
				areaId: null,
				tabsActive: 0,

				coinList: [
					// {id: "29216", curr: "ltc", usd: "163.4", ousd: 0, cny: "1057.6228", ocny: 0, ugain: "-1.26"},
					// {id: "29215", curr: "usdt", usd: "1", ousd: 0, cny: "6.4726", ocny: 0, ugain: "0.03", cgain: "0"},
					// {id: "29214", curr: "eth", usd: "1147", ousd: 0, cny: "7424.0722", ocny: 0, ugain: "-1.07", cgain: "0"},
					// {id: "29213", curr: "btc", usd: "34838", ousd: 0, cny: "225492.4388", ocny: 0, ugain: "-0.26"},
					// {id: "28352", curr: "eos", usd: "3.02", ousd: 0, cny: "19.5424", ocny: 0, ugain: "2.13", cgain: "0"},
				],
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				this.getAreaList();
				// this.getSubmitList(this.index,this.sort);
			},
			// 查询区域
			getAreaList() {
				this.$Ajax('/search/indexArea', {}, res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.areaList = res.obj;
						this.areaId = this.areaList[0].id;
						this.getCurrencyList();
						// this.coin = res.obj
					}
				});
			},
			// 根据区域获取交易对信息
			getCurrencyList() {
				this.$Ajax(
					'/search/indexTrade', {
						areaId: this.areaId
					},
					res => {
						console.log(JSON.stringify(res.obj));
						if (res.code == 0) {
							this.coinList = res.obj;
						}
					}
				);
			},
			// 切换
			changeTabsActive(index) {
				if (this.tabsActive != index) {
					this.tabsActive = index;
					this.areaId = this.areaList[index].id;
					this.getCurrencyList();
				}
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/index/index';

	.indexBox_tabs {
		margin-top: 0upx;
	}

	.indexBox-price-list-header__item {
		color: #999999;
		width: auto;
	}

	// .indexBox-price-list-header__item {
	// 	background: url(../../static/quotation/icon-quotation-1.png) no-repeat;
	// 	background-position: right;
	// 	background-size: 25upx;
	// 	padding-right: 35upx;
	// }

	// .indexBox-price-list-header__item_up {
	// 	background: url(../../static/quotation/icon-quotation-2.png) no-repeat;
	// 	background-position: right;
	// 	background-size: 25upx;
	// 	padding-right: 35upx;
	// }

	// .indexBox-price-list-header__item_down {
	// 	background: url(../../static/quotation/icon-quotation-3.png) no-repeat;
	// 	background-position: right;
	// 	background-size: 25upx;
	// 	padding-right: 35upx;
	// }

	.indexBox-price-list-box {
		padding: 48upx 0;
	}
</style>
