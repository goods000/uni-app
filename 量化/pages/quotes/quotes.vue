<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initTarBarShadow"></view>

		<view class="initHeader initHeader--line initHeader--fixed" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-tabs">
					<view class="initHeader-tabs__wrapper">
						<view class="initHeader-tabs__item" :class="{ 'initHeader-tabs__item--active': quotesTabsActive == 0 }" @click="changeQuotesTabsActive(0)">自选</view>
						<view class="initHeader-tabs__item" :class="{ 'initHeader-tabs__item--active': quotesTabsActive == 1 }" @click="changeQuotesTabsActive(1)">行情</view>
					</view>
				</view>
			</view>
		</view>

		<view class="main">
			<view class="quotesBox">
				<view class="quotesBox-wrapper">
					<view class="quotesBox-header">
						<view class="quotesBox-content">
							<view class="quotesBox-data">交易对</view>
							<view class="quotesBox-data">最新价</view>
						</view>
						<view class="quotesBox-data">涨跌幅</view>
					</view>
					<view class="quotesBox-body">
						<view class="initNoData" v-if="Object.keys(quotesTabsActive == 0 ? chooseTradeList : commTradeList).length == 0">暂无交易对</view>
						<view class="quotesBox-list" v-for="(item, index) in quotesTabsActive == 0 ? chooseTradeList : commTradeList" :key="index" @click="openPopup(item)">
							<view class="quotesBox-content">
								<view class="quotesBox-data quotesBox-data--flex2">
									<view class="quotesBox-icon"><image :src="item.pic" mode="scaleToFill"></image></view>
									<view class="quotesBox-left">
										<view class="quotesBox-row">
											<text class="quotesBox-tradeCurrencyName">{{ item.quotaCurrency }}</text>
											<text class="quotesBox-currencyName">/{{ item.baseCurrency }}</text>
										</view>
										<view class="quotesBox-quantity">24H量{{ item.amount | number(4) }}</view>
									</view>
								</view>
								<view class="quotesBox-data">
									<view class="quotesBox-right">
										<view class="quotesBox-price">{{ item.currentPrice | number(4) }}</view>
										<view class="quotesBox-cny">≈{{ (item.usdtPrice * item.currentPrice) | number(2) }}CNY</view>
									</view>
								</view>
							</view>
							<view class="quotesBox-data">
								<view class="quotesBox-button">
									<view
										class="quotesBox-button__btn"
										:class="{
											'quotesBox-button__btn--down': (item.currentPrice - item.openPrice) / item.openPrice < 0,
											'quotesBox-button__btn--up': (item.currentPrice - item.openPrice) / item.openPrice > 0
										}"
									>
										<text>{{ (((item.currentPrice - item.openPrice) / item.openPrice) * 100) | number(2) }}%</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 添加自选 -->
		<uni-popup ref="doCollectPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">温馨提示</view>
					<view class="initPopup-desc">将{{ popupInfo.quotaCurrency }}添加到自选列表？</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('doCollectPopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="doCollect()">确认</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 删除子轩 -->
		<uni-popup ref="cancelCollectPopup" type="center" :animation="true" @change="changePopup">
			<view class="initPopup">
				<view class="initPopup-wrapper">
					<view class="initPopup-title">温馨提示</view>
					<view class="initPopup-desc">将{{ popupInfo.quotaCurrency }}移除自选列表？</view>
					<view class="initPopup-buttonBox">
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--cancel" @click="hidePopup('cancelCollectPopup')">取消</view>
						<view class="initPopup-buttonBox__btn initPopup-buttonBox__btn--confirm" @click="cancelCollect()">确认</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import webUrl from '@/common/js/url.js';
var url = webUrl.websocketUrl + '/websocket/trade';
export default {
	data() {
		return {
			socketUrl: url,
			socketOpen: false,
			token: '',

			chooseTradeList: [],
			commTradeList: [],
			popupInfo: [],

			quotesTabsActive: 0
		};
	},
	onReady() {
		this.$setStatusBarStyle();
		this.$setTarBar();
	},
	onShow() {
		this.$setStatusBarStyle();
		this.$setTarBar();
		
		this.token = uni.getStorageSync('token');

		this.init();

		this.subQuotesMessage();
		this.initSocket();
	},
	onHide() {
		uni.closeSocket();
	},
	methods: {
		init() {
			this.getMyChoose();
			this.getCurrencyList(); //币种列表
		},
		getMyChoose(data) {
			this.$Ajax('/front/market/collect/list', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					let needData = {};
					res.obj.forEach(item => {
						let obj = item;
						needData['currencyId_' + item.id] = obj;
					});
					// console.log(Object.keys(needData));
					this.chooseTradeList = needData;
				}
			});
		},

		getCurrencyList() {
			this.$Ajax('/front/bourse/all/trade', {}, res => {
				// console.log(JSON.stringify(res));
				if (res.code == 0) {
					let needData = {};
					res.obj.forEach(item => {
						let obj = item;
						needData['currencyId_' + item.id] = obj;
					});
					this.commTradeList = needData;
				}
			});
		},
		doCollect() {
			this.$Ajax(
				'/front/market/do/collect',
				{
					id: this.popupInfo.id
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('添加成功');
						this.hidePopup('doCollectPopup');
						this.getMyChoose();
					}
				}
			);
		},
		cancelCollect() {
			this.$Ajax(
				'/front/market/cancel/collect',
				{
					id: this.popupInfo.id
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('删除成功');
						this.hidePopup('cancelCollectPopup');
						this.getMyChoose();
					}
				}
			);
		},

		changeQuotesTabsActive(index) {
			if (this.quotesTabsActive != index) {
				this.quotesTabsActive = index;
			}
		},

		/* 弹出框公用 */
		openPopup(item) {
			this.popupInfo = item;
			uni.hideTabBar();

			if (this.quotesTabsActive == 0) {
				this.$refs['cancelCollectPopup'].open();
			} else if (this.quotesTabsActive == 1) {
				this.$refs['doCollectPopup'].open();
			}
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		changePopup(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
			if (!e.show) {
				uni.showTabBar();
			}
		},

		/* Socket连接 */
		initSocket() {
			var that = this;
			uni.connectSocket({
				url: this.socketUrl
			});
			uni.onSocketOpen(res => {
				this.socketOpen = true;
				console.log('WebSocket连接已打开！');
				this.subQuotesMessage();
				// this.setTradeMessage();
			});
			uni.onSocketMessage(res => {
				var message = this.parseJSONorNot(res);
				message = this.parseJSONorNot(message.data);
				message = this.parseJSONorNot(message);
				// console.log(message);

				if (message.code == 3) {
					this.setTradeData(message);
				}
			});
			uni.onSocketError(res => {
				this.socketOpen = false;
				this.initSocket();
			});
			uni.onSocketClose(res => {
				console.log('WebSocket 已关闭！');
				this.unSubQuotesMessage();
			});
		},
		setTradeData(data) {
			this.commTradeList['currencyId_' + data.obj.tradeId].currentPrice = data.obj.price;
			this.commTradeList['currencyId_' + data.obj.tradeId].amount = data.obj.amount;

			if (this.chooseTradeList['currencyId_' + data.obj.tradeId]) {
				this.chooseTradeList['currencyId_' + data.obj.tradeId].currentPrice = data.obj.price;
				this.chooseTradeList['currencyId_' + data.obj.tradeId].amount = data.obj.amount;
			}
		},
		subQuotesMessage() {
			var sendInfo = {};
			sendInfo.method = 'sub';
			sendInfo.type = 2;
			sendInfo.token = this.token;
			this.sendMessage(JSON.stringify(sendInfo));
		},
		unSubQuotesMessage() {
			var sendInfo = {};
			sendInfo.method = 'unsub';
			sendInfo.type = 2;
			sendInfo.token = this.token;
			this.sendMessage(JSON.stringify(sendInfo));
		},
		parseJSONorNot(mayBeJSON) {
			if (typeof mayBeJSON === 'string') {
				return JSON.parse(mayBeJSON);
			} else {
				return mayBeJSON;
			}
		},
		sendMessage(message) {
			if (this.socketOpen) {
				uni.sendSocketMessage({
					data: message
				});
			}
		},

		goKline(tradeId, currencyTradeName, currencyName) {
			let that = this;
			uni.setStorageSync('tradeId', tradeId);

			// #ifdef H5
			that.$tools.switchTab('../contract/contract');
			// #endif

			// #ifdef APP-PLUS
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
					that.$tools.switchTab('../contract/contract');
				}
			);
			// #endif
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/quotes';
</style>
