<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initTarBarShadow"></view>

		<view class="initHeader initHeader--line initHeader--fixed" :class="pageTheme == 'light' ? 'initHeader--black' : 'initHeader--white'">
			<view class="initHeader-wrapper">
				<view class="initHeader-tabs">
					<view class="initHeader-tabs__wrapper">
						<view class="initHeader-tabs__item" :class="{ 'initHeader-tabs__item--active': quotesTabsActive == 1 }" @click="changeQuotesTabsActive(1)"><text>行情</text></view>
						<view class="initHeader-tabs__item" :class="{ 'initHeader-tabs__item--active': quotesTabsActive == 0 }" @click="changeQuotesTabsActive(0)"><text>自选</text></view>
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
						<view class="initNoData" v-if="(quotesTabsActive == 0 ? chooseTradeList : commTradeList).length == 0">暂无交易对</view>
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
										<view class="quotesBox-cny">≈{{ item.cny | number(2) }}CNY</view>
									</view>
								</view>
							</view>
							<view class="quotesBox-data">
								<view class="quotesBox-button">
									<view
										class="quotesBox-button__btn"
										:class="{
											'quotesBox-button__btn--down': item.rise < 0,
											'quotesBox-button__btn--up': item.rise > 0
										}"
									>
										<text>{{ item.rise | number(2) }}%</text>
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
			checkNum: 0,
			
			/* socket相关 */
			lastSubString: null, //最后一个订阅的数据
			socketOpen: false,
			websocket: '',
			socketUrl: url,
			token: '',

			chooseTradeList: [],
			tempChooseTradeList: [],
			commTradeList: [],
			tempCommTradeList: [],
			popupInfo: [],

			quotesTabsActive: 1,
			
			updateTimer: null,
		};
	},
	onReady() {
		this.$setStatusBarStyle();
		this.$setTarBar();
	},
	onShow() {
		this.$setStatusBarStyle();
		this.$setTarBar();
		this.clearTimer();
		
		this.token = uni.getStorageSync('token');

		this.init();

		// this.subQuotesMessage();
		// this.initSocket();
	},
	onHide() {
		if (this.socketOpen) {
			uni.closeSocket();
			this.socketOpen = false;
		}
		this.clearTimer();
	},
	
	onUnload() {
		//取消订阅
		if (this.socketOpen) {
			uni.closeSocket();
			this.socketOpen = false;
		}
		this.clearTimer();
	},
	methods: {
		init() {
			this.getCurrencyList(); //币种列表
			
			if(this.$store.state.isLogin){
				this.getMyChoose();
			}
			
			this.setUpdateTimer();
			
			this.$nextTick(() => {
				this.initSocket();
			})
		},
		getMyChoose(data) {
			this.$Ajax('/front/market/collect/list', {}, res => {
				// console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.tempChooseTradeList = res.obj;
					this.chooseTradeList = JSON.parse(JSON.stringify(this.tempChooseTradeList));
				}
			});
		},
		getCurrencyList() {
			this.$Ajax('/front/bourse/all/trade', {}, res => {
				// console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.tempCommTradeList = res.obj;
					this.commTradeList = JSON.parse(JSON.stringify(this.tempCommTradeList));
				}
			});
		},
		setUpdateTimer(){
			this.clearTimer();
			
			this.updateTimer = setInterval(()=>{
				//进行深拷贝
				this.chooseTradeList = JSON.parse(JSON.stringify(this.tempChooseTradeList));
				this.commTradeList = JSON.parse(JSON.stringify(this.tempCommTradeList));
			}, 1000);
		},
		// 清除定时器
		clearTimer() {
			if (this.updateTimer != null) {
				clearInterval(this.updateTimer);
				this.updateTimer = null;
			}
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
			
			if(!this.socketOpen){
				uni.connectSocket({
					url: this.socketUrl
				});
				uni.onSocketOpen(res => {
					console.log('WebSocket连接已打开！');
					this.socketOpen = true;
					this.subQuotesMessage();
				});
			}else{
				this.unSubQuotesMessage();
				this.subQuotesMessage();
			}
			
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
				that.$tools.toast('连接失败,请稍后再试');
			});
		},
		setTradeData(data) {
			const filterData = (item) => item.id == data.obj.tradeId;
			let commDataIndex = this.tempCommTradeList.findIndex(filterData);
			let chooseDataIndex = this.tempChooseTradeList.findIndex(filterData);
			
			this.tempCommTradeList[commDataIndex].currentPrice = data.obj.price;
			this.tempCommTradeList[commDataIndex].amount = data.obj.amount;
			this.tempCommTradeList[commDataIndex].rise = data.obj.rise;
			this.tempCommTradeList[commDataIndex].cny = data.obj.cny;

			if (chooseDataIndex != -1) {
				this.tempChooseTradeList[chooseDataIndex].currentPrice = data.obj.price;
				this.tempChooseTradeList[chooseDataIndex].amount = data.obj.amount;
				this.tempChooseTradeList[chooseDataIndex].rise = data.obj.rise;
				this.tempChooseTradeList[chooseDataIndex].cny = data.obj.cny;
			}
		},
		subQuotesMessage() {
			let sendInfo = {};
			sendInfo.method = 'sub';
			sendInfo.type = 2;
			sendInfo.token = this.token;
			this.sendMessage(JSON.stringify(sendInfo));
		},
		unSubQuotesMessage() {
			let sendInfo = {};
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
			uni.sendSocketMessage({
				data: message
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/quotes';
</style>
