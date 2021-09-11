<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-left">
					<view class="initHeader-tabs">
						<view class="initHeader-tabs__control">
							<view
								class="initHeader-tabs__control-item"
								:class="{ 'initHeader-tabs__control-item--active': headerTabsActive == 0 }"
								@click="changeHeaderTabsActive(0)"
							>
								链上
							</view>
							<view
								class="initHeader-tabs__control-item"
								:class="{ 'initHeader-tabs__control-item--active': headerTabsActive == 1 }"
								@click="changeHeaderTabsActive(1)"
							>
								多空
							</view>
							<view
								class="initHeader-tabs__control-item"
								:class="{ 'initHeader-tabs__control-item--active': headerTabsActive == 2 }"
								@click="changeHeaderTabsActive(2)"
							>
								持仓
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="chainBox" v-show="headerTabsActive == 0">
				<view class="chainBox-wrapper">
					<view class="currencyBox">
						<view class="currencyBox-wrapper">
							<view
								class="currencyBox-item"
								:class="{ 'currencyBox-item--active': currencyValue == index }"
								@click="changeCurrencyValue(index)"
								v-for="(item, index) in currencyArray"
								:key="index"
							>
								{{ item }}
							</view>
						</view>
					</view>

					<view class="flowBox">
						<view class="flowBox-wrapper">
							<view class="flowBox-itemBox">
								<view class="flowBox-itemBox__item">
									<view class="flowBox-itemBox__item-label">24小时交易所流入</view>
									<view class="flowBox-itemBox__item-data">{{ dayFlowData.in24 | number(2) }}</view>
								</view>
								<view class="flowBox-itemBox__item">
									<view class="flowBox-itemBox__item-label">24小时交易所流出</view>
									<view class="flowBox-itemBox__item-data">{{ dayFlowData.out24 | number(2) }}</view>
								</view>
							</view>
							<view class="flowBox-echarts"><chain-flow v-if="headerTabsActive == 0" :currencyName="currencyName"></chain-flow></view>
						</view>
					</view>

					<view class="initTitle">
						<view class="initTitle-wrapper"><view class="initTitle-label">交易所数据</view></view>
					</view>

					<view class="initButtonTabs">
						<view class="initButtonTabs-control">
							<view class="initButtonTabs-control__aniBg" :style="[{ left: (100 / 3) * recordTabsActive + '%' }, { width: 100 / 3 + '%' }]"></view>
							<view
								class="initButtonTabs-control__item"
								:class="{ 'initButtonTabs-control__item--active': recordTabsActive == 0 }"
								@click="changeRecordTabsActive(0)"
							>
								链上大额转账
							</view>
							<view
								class="initButtonTabs-control__item"
								:class="{ 'initButtonTabs-control__item--active': recordTabsActive == 1 }"
								@click="changeRecordTabsActive(1)"
							>
								24h数据
							</view>
							<view
								class="initButtonTabs-control__item"
								:class="{ 'initButtonTabs-control__item--active': recordTabsActive == 2 }"
								@click="changeRecordTabsActive(2)"
							>
								历史数据
							</view>
						</view>
					</view>
					<view class="tradeRecordBox" v-show="recordTabsActive == 0">
						<view class="tradeRecordBox-wrapper">
							<view class="tradeRecordBox-item" v-for="(item, index) in largeTradeRecordData" :key="index">
								<view class="tradeRecordBox-item__header">
									<view class="tradeRecordBox-item__title">{{ item.title }}</view>
									<view class="tradeRecordBox-item__date">{{ item.timeString }}</view>
								</view>
								<view class="tradeRecordBox-item__price">{{ item.amount }}</view>
								<view class="tradeRecordBox-item__list">
									<view class="tradeRecordBox-item__list-label">转出地址：</view>
									<view class="tradeRecordBox-item__list-data">{{ item.outAddress }}</view>
								</view>
								<view class="tradeRecordBox-item__list">
									<view class="tradeRecordBox-item__list-label">转入地址：</view>
									<view class="tradeRecordBox-item__list-data">{{ item.inAddress }}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="exchangeDayRecordBox" v-show="recordTabsActive == 1">
						<view class="exchangeDayRecordBox-wrapper">
							<view class="exchangeDayRecordBox-header">
								<view class="exchangeDayRecordBox-data">交易所</view>
								<view class="exchangeDayRecordBox-data">24h流入</view>
								<view class="exchangeDayRecordBox-data">24h流出</view>
								<view class="exchangeDayRecordBox-data">24h净流入</view>
								<view class="exchangeDayRecordBox-data">1周净流入</view>
							</view>
							<view class="exchangeDayRecordBox-body">
								<view class="exchangeDayRecordBox-row" v-for="(item, index) in exchangeDayRecordData" :key="index">
									<view class="exchangeDayRecordBox-data">
										<view class="exchangeDayRecordBox-icon"><image :src="item.logo" mode="widthFix"></image></view>
										<view class="exchangeDayRecordBox-name">{{ item.abbrName }}</view>
									</view>
									<view class="exchangeDayRecordBox-data">{{ (item.flowIn / 10000) | number(2) }}万</view>
									<view class="exchangeDayRecordBox-data">{{ (item.flowOut / 10000) | number(2) }}万</view>
									<view
										class="exchangeDayRecordBox-data"
										:class="[{ 'exchangeDayRecordBox-data--green': item.flowNet > 0 }, { 'exchangeDayRecordBox-data--red': item.flowNet < 0 }]"
									>
										{{ (item.flowNet / 10000) | number(2) }}万
									</view>
									<view
										class="exchangeDayRecordBox-data"
										:class="[{ 'exchangeDayRecordBox-data--green': item.weekNet > 0 }, { 'exchangeDayRecordBox-data--red': item.weekNet < 0 }]"
									>
										{{ (item.weekNet / 10000) | number(2) }}万
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="exchangeHistoryBox" v-show="recordTabsActive == 2">
						<view class="exchangeHistoryBox-wrapper">
							<view class="exchangeHistoryBox-header">
								<view class="exchangeHistoryBox-data">时间</view>
								<view class="exchangeHistoryBox-data">收盘价(＄)</view>
								<view class="exchangeHistoryBox-data">流入</view>
								<view class="exchangeHistoryBox-data">流出</view>
								<view class="exchangeHistoryBox-data">净流入</view>
							</view>
							<view class="exchangeHistoryBox-body">
								<view class="exchangeHistoryBox-row" v-for="(item, index) in exchangeHistoryRecordData" :key="index">
									<view class="exchangeHistoryBox-data">{{ item.timeString }}</view>
									<view class="exchangeHistoryBox-data">{{ item.closePrice | number(2) }}</view>
									<view class="exchangeHistoryBox-data">{{ (item.inAmount / 10000) | number(2) }}万</view>
									<view
										class="exchangeHistoryBox-data"
										:class="[{ 'exchangeHistoryBox-data--green': item.outAmount > 0 }, { 'exchangeHistoryBox-data--red': item.outAmount < 0 }]"
									>
										{{ (item.outAmount / 10000) | number(2) }}万
									</view>
									<view
										class="exchangeHistoryBox-data"
										:class="[{ 'exchangeHistoryBox-data--green': item.netAmount > 0 }, { 'exchangeHistoryBox-data--red': item.netAmount < 0 }]"
									>
										{{ (item.netAmount / 10000) | number(2) }}万
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="holdingBox" v-show="headerTabsActive == 1">
				<view class="holdingBox-wrapper">
					<view class="coinSelectBox">
						<view class="coinSelectBox-wrapper">
							<scroll-view scroll-x="true" class="coinSelectBox-scroll">
								<view
									class="coinSelectBox-item"
									:class="{ 'coinSelectBox-item--active': coinSelectActive == index }"
									v-for="(item, index) in holdCoinList"
									:key="index"
									@click="changeCoinSelectActive(index)"
								>
									{{ item.name }}
								</view>
							</scroll-view>
						</view>
					</view>

					<view class="dateSelectBox">
						<view class="dateSelectBox-wrapper">
							<view class="dateSelectBox-lable">周期：</view>
							<view class="dateSelectBox-tabs">
								<view class="dateSelectBox-tabs__control">
									<view
										class="dateSelectBox-tabs__control-item"
										:class="{ 'dateSelectBox-tabs__control-item--active': dateTabsActive == 1 }"
										@click="changeDateTabsActive(1)"
									>
										5M
									</view>
									<view
										class="dateSelectBox-tabs__control-item"
										:class="{ 'dateSelectBox-tabs__control-item--active': dateTabsActive == 2 }"
										@click="changeDateTabsActive(2)"
									>
										1H
									</view>
									<view
										class="dateSelectBox-tabs__control-item"
										:class="{ 'dateSelectBox-tabs__control-item--active': dateTabsActive == 3 }"
										@click="changeDateTabsActive(3)"
									>
										4H
									</view>
								</view>
							</view>
						</view>
					</view>

					<view class="initTitle">
						<view class="initTitle-wrapper">
							<view class="initTitle-label">{{ holdCoinCurrencyName }}合约</view>
						</view>
					</view>
					<view class="progressBox">
						<view class="progressBox-wrapper">
							<view class="progressBox-header">
								<view class="progressBox-item progressBox-item--1">
									<view class="progressBox-item__lable">多</view>
									<view class="progressBox-item__data">{{ (currencyContractRatioInfoData.buyRate * 100) | number(2) }}%</view>
								</view>
								<view class="progressBox-item progressBox-item--2">
									<view class="progressBox-item__lable">空</view>
									<view class="progressBox-item__data">{{ (currencyContractRatioInfoData.sellRate * 100) | number(2) }}%</view>
								</view>
							</view>
							<view class="progressBox-body">
								<view class="progressBox-progress">
									<view class="progressBox-progress__data" :style="{ width: currencyContractRatioInfoData.buyRate * 100 + '%' }"></view>
									<view class="progressBox-progress__line"></view>
								</view>
							</view>
						</view>
					</view>

					<view class="progressTabelBox">
						<view class="progressTabelBox-wrapper">
							<view class="progressTabelBox-body">
								<view class="progressTabelBox-row" v-for="(item, index) in currencyContractRatioListData" :key="index">
									<view class="progressTabelBox-name">{{ item.exchange }} {{ item.futureType == 'swap' ? '永续' : '季度' }}</view>
									<view class="progressTabelBox-progressBox">
										<view class="progressTabelBox-progressBox__item progressTabelBox-progressBox__item--highlight">
											多 {{ (item.buyRate * 100) | number(2) }}%
										</view>
										<view class="progressTabelBox-progressBox__progress">
											<view class="progressTabelBox-progressBox__progress-data" :style="{ width: item.buyRate * 100 + '%'  }"></view>
											<view class="progressTabelBox-progressBox__progress-line"></view>
										</view>
										<view class="progressTabelBox-progressBox__item">空 {{ (item.sellRate * 100) | number(2) }}%</view>
									</view>
								</view>
							</view>
						</view>
					</view>

					<!-- <view class="echartsBox">
						<view class="echartsBox-wrapper">
							<longshort-all
								v-if="headerTabsActive == 1"
								:title="holdCoinCurrencyName + '综合多空'"
								:currencyName="holdCoinCurrencyName"
								:dateTabsActive="dateTabsActive"
								exchange="all"
								contractType="all"
							></longshort-all>
						</view>
					</view> -->

					<!-- <view class="echartsBox">
						<view class="echartsBox-wrapper">
							<longshort-kline
								v-if="headerTabsActive == 1"
								:title="'Okex季度' + holdCoinCurrencyName + '多空'"
								:currencyName="holdCoinCurrencyName"
								:dateTabsActive="dateTabsActive"
								exchange="Okex"
								contractType="quarter"
								:needData.sync='(longshortDefaultData[1] || {}).data'
							></longshort-kline>
						</view>
					</view> -->

					<view class="echartsBox" v-for="(item,index) in longshortDefaultData" :key="index">
						<view class="echartsBox-wrapper">
							<longshort-kline
								v-if="headerTabsActive == 1"
								:title="item.title"
								:currencyName="holdCoinCurrencyName"
								:dateTabsActive="dateTabsActive"
								:exchange="item.exChange"
								:contractType="item.futureType"
								:needData='item.data'
							></longshort-kline>
						</view>
					</view>
					
				</view>
			</view>

			<view class="holdingBox" v-show="headerTabsActive == 2">
				<view class="holdingBox-wrapper">
					<view class="coinSelectBox">
						<view class="coinSelectBox-wrapper">
							<scroll-view scroll-x="true" class="coinSelectBox-scroll">
								<view
									class="coinSelectBox-item"
									:class="{ 'coinSelectBox-item--active': coinSelectActive == index }"
									v-for="(item, index) in holdCoinList"
									:key="index"
									@click="changeCoinSelectActive(index)"
								>
									{{ item.name }}
								</view>
							</scroll-view>
						</view>
					</view>

					<view class="initTitle">
						<view class="initTitle-wrapper"><view class="initTitle-label">全网实盘持仓量</view></view>
					</view>

					<view class="networkRealHolding">
						<view class="networkRealHolding-wrapper">
							<view class="networkRealHolding-header">
								<view class="networkRealHolding-data">交易所</view>
								<view class="networkRealHolding-data">持仓量($)</view>
								<view class="networkRealHolding-data"></view>
								<view class="networkRealHolding-data">24h变化</view>
							</view>
							<view class="networkRealHolding-body">
								<view class="networkRealHolding-row" v-for="(item, index) in networkRealHoldingData" :key="index">
									<view class="networkRealHolding-data">{{ item.exchange }}</view>
									<view class="networkRealHolding-data">
										<view class="networkRealHolding-quantity">＄{{ (item.amount / 100000000) | number(2) }}亿</view>
									</view>
									<view class="networkRealHolding-data">
										<view class="networkRealHolding-progress">
											<view class="networkRealHolding-progress__data" :style="{ width: item.ratio * 100 + '%' }"></view>
											<view class="networkRealHolding-progress__line"></view>
										</view>
									</view>
									<view class="networkRealHolding-data">{{ (item.dayChanges * 100) | number(2) }}%</view>
								</view>
							</view>
						</view>
					</view>

					<view class="initTitle">
						<view class="initTitle-wrapper"><view class="initTitle-label">全网持仓量(USD)</view></view>
					</view>

					<view class="echartsBox">
						<view class="echartsBox-wrapper"><network-holding v-if="headerTabsActive == 2" :currencyName="holdCoinCurrencyName"></network-holding></view>
					</view>

					<view class="initTitle">
						<view class="initTitle-wrapper"><view class="initTitle-label">Huobi交易所持仓量(USD)</view></view>
					</view>

					<view class="echartsBox">
						<view class="echartsBox-wrapper"><huobi-holding v-if="headerTabsActive == 2" :currencyName="holdCoinCurrencyName"></huobi-holding></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import chainFlow from '../echart/chain/chainFlow.vue';

import longshortAll from '../echart/chain/longshortAll.vue';
import longshortKline from '../echart/chain/longshortKline.vue';

import networkHolding from '../echart/chain/networkHolding.vue';
import huobiHolding from '../echart/chain/huobiHolding.vue';
export default {
	components: {
		chainFlow,
		longshortAll,
		longshortKline,
		networkHolding,
		huobiHolding
	},
	data() {
		return {
			dayFlowData: [], //24小时流水
			largeTradeRecordData: [], //链上大额转账
			exchangeDayRecordData: [], //24H数据
			exchangeHistoryRecordData: [], //历史数据

			currencyContractRatioInfoData: [],
			currencyContractRatioListData: [],
			longshortDefaultData: [],

			networkRealHoldingData: [], //全网实盘持仓量

			headerTabsActive: 0,
			recordTabsActive: 0,
			dateTabsActive: 1,
			coinSelectActive: 0,

			/* 流水选择币种 */
			currencyArray: ['BTC', 'ETH', 'USDT'],
			currencyName: 'BTC',
			currencyValue: 0,

			holdCoinList: [
				{
					type: 0,
					name: 'BTC'
				},
				{
					type: 1,
					name: 'ETH'
				},
				{
					type: 2,
					name: 'EOS'
				},
				{
					type: 3,
					name: 'LTC'
				},
				{
					type: 4,
					name: 'BCH'
				},
				{
					type: 5,
					name: 'XRP'
				},
				{
					type: 6,
					name: 'BSV'
				},
				{
					type: 7,
					name: 'TRX'
				},
				{
					type: 8,
					name: 'ETC'
				}
			],
			holdCoinCurrencyName: 'BTC',

			pages: 1,
			pageNum: 1,
			pageSize: 20
		};
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底啦');
		} else {
			this.pageNum++;
			this.getDataTabsRecord();
		}
	},
	methods: {
		init() {
			this.pageNum = 1;
			this.largeTradeRecordData = [];
			this.exchangeDayRecordData = [];
			if(this.headerTabsActive == 0){
				this.getDayFlowData();
				this.getDataTabsRecord();
			}else if(this.headerTabsActive == 1){
				this.getCurrencyContractRatioData();
				this.getLongshortDefaultData();
			}else if(this.headerTabsActive == 2){
				this.getNetworkRealHoldingData();
			}
		},
		getDayFlowData() {
			this.$Ajax(
				'/front/data/chain/24h/line',
				{
					currencyName: this.currencyName
				},
				res => {
					// console.log('24小时数据：' + JSON.stringify(res));
					if (res.code == 0) {
						this.dayFlowData = res.obj;
					}
				}
			);
		},
		getDataTabsRecord() {
			if (this.recordTabsActive == 0) {
				this.getLargeTradeRecord();
			} else if (this.recordTabsActive == 1) {
				this.getExchangeDayRecord();
			} else if (this.recordTabsActive == 2) {
				this.getExchangeHistorylist();
			}
		},
		getLargeTradeRecord() {
			this.$Ajax(
				'/front/data/chain/large/tx',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					currencyName: this.currencyName
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.largeTradeRecordData = this.largeTradeRecordData.concat(res.obj.list);
					}
				}
			);
		},
		//24H交易所数据
		getExchangeDayRecord() {
			this.$Ajax(
				'/front/data/exchange/24h/data',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					currencyName: this.currencyName
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.exchangeDayRecordData = this.exchangeDayRecordData.concat(res.obj.list);
					}
				}
			);
		},

		//交易所历史数据
		getExchangeHistorylist() {
			this.$Ajax(
				'/front/data/exchange/history/data',
				{
					currencyName: this.currencyName
				},
				res => {
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.exchangeHistoryRecordData = this.exchangeHistoryRecordData.concat(res.obj.list);
					}
				}
			);
		},

		//币种合约比例数据
		getCurrencyContractRatioData() {
			this.$Ajax(
				'/front/data/contract/currency/ratio',
				{
					type: this.dateTabsActive, //时间类型[1=4小时，2=1小时，3=5分钟]
					currencyName: this.holdCoinCurrencyName
				},
				res => {
					// console.log(JSON.stringify(res.obj));
					if (res.code == 0) {
						this.currencyContractRatioInfoData = res.obj[0].allTrades;
						this.currencyContractRatioListData = res.obj[0].exchangeTrades;
					}
				}
			);
		},
		// 多空默认数据
		getLongshortDefaultData() {
			this.$Ajax(
				'/front/data/contract/currency/kdata',
				{
					type: this.dateTabsActive, //时间类型[1=5分钟，2=1小时，3=4小时]
					currencyName: this.holdCoinCurrencyName,
					exchange: '', //交易所[综合传all，其他传对应交易所名称]
					contractType: '', //合约类型[综合传all，其他传对应交易所类型]
					kType: 1 //K线时间类型[1=1天/2小时，2=1周/6小时]
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.longshortDefaultData = res.obj;
					}
				}
			);
		},

		//全网实盘持仓量
		getNetworkRealHoldingData() {
			this.$Ajax(
				'/front/data/all/hold/data',
				{
					currencyName: this.holdCoinCurrencyName
				},
				res => {
					if (res.code == 0) {
						this.networkRealHoldingData = res.obj;
					}
				}
			);
		},

		changeHeaderTabsActive(index) {
			if (this.headerTabsActive != index) {
				this.coinSelectActive = 0;
				this.headerTabsActive = index;
				this.init();
			}
		},
		changeCurrencyValue(index) {
			if (this.currencyValue != index) {
				this.currencyValue = index;
				this.currencyName = this.currencyArray[index];
				this.init();
			}
		},
		changeRecordTabsActive(index) {
			if (this.recordTabsActive != index) {
				this.recordTabsActive = index;
				this.init();
			}
		},
		changeDateTabsActive(index) {
			if (this.dateTabsActive != index) {
				this.dateTabsActive = index;
				this.getCurrencyContractRatioData();
				this.getLongshortDefaultData();
			}
		},
		changeCoinSelectActive(index) {
			if (this.coinSelectActive != index) {
				this.coinSelectActive = index;
				this.holdCoinCurrencyName = this.holdCoinList[index].name;
				this.init();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/chain';
</style>
