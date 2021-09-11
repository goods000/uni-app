<template>
	<view class="pages" :data-theme="pageTheme">
		<view class="initTarBarShadow"></view>
		<view class="initHeader initHeader--line initHeader--fixed initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-left">
					<view class="initHeader-imageTitle"><image :src="'../../static/index/icon-header-logo-' + pageTheme + '.png'" mode="widthFix"></image></view>
				</view>
				<view class="initHeader-right"><view class="initHeader-button initHeader-button--service" @click="$tools.jump('../service/service')"></view></view>
			</view>
		</view>

		<!-- 背景 -->
		<!-- <view class="bgBox"></view> -->

		<view class="main">
			<!-- 轮播图 -->
			<uni-swiper-dot :info="slideList" :current="swiperCurrent" :mode="dotsMode" :dotsStyles="dotsStyles">
				<view class="swiperBox">
					<view class="swiperBox-wrapper">
						<swiper
							class="swiperBox-swiper"
							:indicator-dots="false"
							:autoplay="true"
							:interval="2500"
							:duration="1000"
							:circular="true"
							:disable-touch="slideList.length <= 1"
							@change="changeSwiper"
						>
							<swiper-item class="swiperBox-swiper__item" v-for="(item, index) in slideList" :key="index">
								<image src="../../static/index/img-banner-demo.png" mode="widthFix"></image>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</uni-swiper-dot>

			<!-- 滚动公告 -->
			<view class="noticeBox">
				<view class="noticeBox-wrapper" @click="$tools.jump('../notice/notice')">
					<view class="noticeBox-icon"><image :src="'../../static/index/icon-notice-' + pageTheme + '.png'" mode="widthFix"></image></view>
					<swiper class="noticeBox-list noticeBox-swiper" vertical="true" autoplay="true" circular="true" interval="3000">
						<swiper-item class="noticeBox-swiper__item" v-for="(item, index) in noticeList" :key="index">
							<view class="noticeBox-swiper__item-label">{{ item.title }}</view>
						</swiper-item>
					</swiper>
					<view class="noticeBox-btn">更多</view>
				</view>
			</view>

			<!-- 金刚区 -->
			<view class="etiquetaBox">
				<view class="etiquetaBox-wrapper">
					<view class="etiquetaBox-item" @click="$tools.jump('../api/api')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-01.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">API授权</view>
					</view>
					<view class="etiquetaBox-item" @click="$tools.jump('../assets/assets')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-02.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">我的资产</view>
					</view>
					<view class="etiquetaBox-item" @click="$tools.jump('../quantification/quantification_rewardRecord')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-03.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">量化收益</view>
					</view>
					<view class="etiquetaBox-item" @click="$tools.jump('../ranking/ranking')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-04.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">排行榜单</view>
					</view>
					<view class="etiquetaBox-item" @click="goLink('https://www.huobi.li/zh-cn/')">
						<view class="etiquetaBox-item__icon"><image :src="'../../static/index/icon-etiqueta-05-' + pageTheme + '.png'" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">火币</view>
					</view>
					<view class="etiquetaBox-item" @click="goLink('https://www.binancezh.co/')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-06.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">币安</view>
					</view>
					<view class="etiquetaBox-item" @click="goLink('https://www.okex.win/')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-07.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">OKEx</view>
					</view>
					<view class="etiquetaBox-item" @click="goLink('https://sg.upbit.com/home')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-08.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">Upbit</view>
					</view>
				</view>
			</view>

			<!-- 一键开启 -->
			<view class="iconBannerBox">
				<view class="iconBannerBox-wrapper" @click="$tools.switchTab('../quantification/quantification')">
					<view class="iconBannerBox-icon"><image src="../../static/index/icon-iconBanner-robot.png" mode="widthFix"></image></view>

					<view class="iconBannerBox-content">
						<view class="iconBannerBox-title">一键开启量化</view>
						<view class="iconBannerBox-desc">智能买卖帮您赚取收益</view>
					</view>
				</view>
			</view>

			<!-- 榜单 -->
			<view class="rankingBox">
				<view class="rankingBox-wrapper">
					<view class="rankingBox-title initTitle">
						<view class="initTitle-wrapper">
							<view class="initTitle-label">量化盈利榜单</view>
							<view class="rankingBox-record" @click="$tools.jump('../ranking/ranking')"></view>
						</view>
					</view>
					<view class="rankingBox-body">
						<view class="initNoData" v-if="rankingList.length == 0">暂无榜单</view>
						<view class="rankingBox-item" v-for="(item, index) in rankingList" :key="index">
							<view class="rankingBox-item__avatar"><image :src="item.pic" mode="scaleToFill"></image></view>
							<view class="rankingBox-item__userName">{{ item.name }}</view>
							<view class="rankingBox-item__data">{{ item.profit | number(2) }}</view>
							<view class="rankingBox-item__label">收益(U)</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 行情 -->
			<view class="quotesBox">
				<view class="quotesBox-wrapper">
					<view class="quotesBox-title initTitle"><view class="initTitle-label">交易对行情</view></view>
					<view class="quotesBox-header">
						<view class="quotesBox-content">
							<view class="quotesBox-data">交易对</view>
							<view class="quotesBox-data">最新价</view>
						</view>
						<view class="quotesBox-data">涨跌幅</view>
					</view>
					<view class="quotesBox-body">
						<view class="initNoData" v-if="Object.keys(commTradeList).length == 0">暂无数据</view>
						<view class="quotesBox-list" v-for="(item, index) in commTradeList" :key="index">
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
	</view>
</template>

<script>
import webUrl from '@/common/js/url.js';
var url = webUrl.websocketUrl + '/websocket/trade';
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
export default {
	components: { uniSwiperDot },
	data() {
		return {
			socketUrl: url,
			socketOpen: false,
			token: '',

			// 容器
			myRobotList: [],
			assetsTotalInfo: [],
			slideList: [],
			noticeList: [],
			rankingList: [],
			commTradeList: [],

			isLogin: false,

			// swiper
			swiperCurrent: 0,
			dotsMode: 'default',
			dotsStyles: {
				bottom: 15,
				backgroundColor: '#ffffff',
				selectedBackgroundColor: '#2537d8'
			},

			live_timer: null,

			refreshType: 0
		};
	},
	onReady() {
		this.$setStatusBarStyle();
		this.$setTarBar();
	},
	onShow() {
		this.$setStatusBarStyle();
		this.$setTarBar();

		this.isLogin = uni.getStorageSync('token') != '';
		this.token = uni.getStorageSync('token');
		this.init();
	},
	onHide() {
		uni.closeSocket();
	},
	methods: {
		init() {
			this.commTradeList = [];

			if (this.isLogin) {
				this.getAllTradeInfo();
				this.subIndexTradeMessage();
				this.initSocket();
			}

			this.getSlideList(); //轮播图
			this.getNoticeList(); //公告轮播图
			this.getRankingList();
		},
		// 轮播图
		getSlideList() {
			this.$Ajax('/search/indexSlides', {}, res => {
				// console.log('轮播图：' + JSON.stringify(res));
				if (res.code == 0) {
					this.slideList = res.obj;
				}
			});
		},
		// 公告轮播
		getNoticeList() {
			this.$Ajax('/search/indexContent', {}, res => {
				// console.log('公告：' + JSON.stringify(res));
				if (res.code == 0) {
					this.noticeList = res.obj.contentList;
				}
			});
		},
		// 排行数据
		getRankingList() {
			this.$Ajax(
				'/front/profit/rank/list',
				{
					type: 3,
					pageNum: 1,
					pageSize: 3
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.rankingList = res.obj.list;
					}
				}
			);
		},
		// 行情数据
		getAllTradeInfo(data) {
			this.$Ajax('/front/bourse/all/trade', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					let needData = {};
					let needArray = res.obj.slice(0, 10);
					needArray.forEach(item => {
						let obj = item;
						needData['currencyId_' + item.id] = obj;
					});
					// console.log(Object.keys(needData));
					this.commTradeList = needData;
				}
			});
		},

		goService() {
			console.log(JSON.stringify(uni.getSystemInfoSync().platform));
			if (uni.getSystemInfoSync().platform == 'android') {
				console.log('走原生');
				// #ifdef APP-PLUS
				const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');
				dcRichAlert.show(
					{
						type: '100',
						url: 'https://tb.53kf.com/code/app/3e755b20ad6f18eafd15ec549ea6b9715/35'
					},
					result => {}
				);
				// #endif
			} else {
				this.$tools.jump('../service/service');
			}
		},
		goLink(url) {
			console.log(url);
			// #ifdef H5
			window.location.href = url;
			// #endif

			// #ifdef APP-PLUS
			plus.runtime.openURL(url);
			// #endif
		},
		changeSwiper(e) {
			this.swiperCurrent = e.detail.current;
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
				this.subIndexTradeMessage();
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
				this.unSubIndexTradeMessage();
			});
		},
		setTradeData(data) {
			if (this.commTradeList['currencyId_' + data.obj.tradeId]) {
				this.commTradeList['currencyId_' + data.obj.tradeId].currentPrice = data.obj.price;
				this.commTradeList['currencyId_' + data.obj.tradeId].amount = data.obj.amount;
			}
		},
		subIndexTradeMessage() {
			var sendInfo = {};
			sendInfo.method = 'sub';
			sendInfo.type = 2;
			sendInfo.token = this.token;
			this.sendMessage(JSON.stringify(sendInfo));
		},
		unSubIndexTradeMessage() {
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
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/index';
</style>
