<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-imageTitle"><image src="../../static/index/icon-header-logo.png" mode="widthFix"></image></view>
			</view>
		</view>
		
		<!-- 背景 -->
		<!-- <view class="bgBox"></view> -->
		
		<view class="main">
			<!-- 轮播图 -->
			<uni-swiper-dot :info="slideList" :current="swiperCurrent" :mode="dotsMode" :dotsStyles="dotsStyles">
				<view class="swiperBox">
					<view class="swiperBox-wrapper">
						<swiper :indicator-dots="false" :autoplay="true" :interval="2500" :duration="1000" :circular="true" class="swiperBox-swiper" @change="changeSwiper">
							<swiper-item class="swiperBox-swiper__item" v-for="(item, index) in slideList" :key="index">
								<image :src="item.path" mode="widthFix"></image>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</uni-swiper-dot>

			<!-- 滚动公告 -->
			<view class="noticeBox">
				<view class="noticeBox-wrapper" @click="$tools.jump('../announcement/announcement')">
					<view class="noticeBox-icon"><image src="../../static/index/icon-notice.png" mode="widthFix"></image></view>
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
					<view class="etiquetaBox-item" @click="$tools.jump('../share/share')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-01.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">邀请好友</view>
					</view>
					<view class="etiquetaBox-item" @click="$tools.noOpen()">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-02.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">IPFS</view>
					</view>
					<view class="etiquetaBox-item" @click="$tools.noOpen()">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-03.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">DEFI</view>
					</view>
					<view class="etiquetaBox-item" @click="$tools.jump('../assets/assets_exchange')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-04.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">闪兑</view>
					</view>
				</view>
			</view>
			
			<!-- 副Banner -->
			<view class="bannerBox">
				<view class="bannerBox-image" @click="$tools.noOpen()">
					<image src="../../static/index/img-subBanner.png" mode="widthFix"></image>
				</view>
			</view>
			
			<!-- K线轮播图 -->
			<view class="cardBox">
				<view class="cardBox-swiper">
					<view class="cardBox-swiper__wrapper">
						<swiper :circular="true" :interval="3000" :duration="1000" display-multiple-items="3" :disable-touch="commTradeList.length <= 3">
							<swiper-item class="swiper-item" v-for="(item, index) in commTradeList" :key="index">
								<view
									class="cardBox-swiper__item"
									:class="[{ 'cardBox-swiper__item--red': item.riseType == 1 }, { 'cardBox-swiper__item--green': item.riseType == 0 }]"
									@click="goKline(item.tradeId, item.tradeCurrencyName, item.currencyName)"
								>
									<view class="chartBox">
										<view class="chartBox-title">
											<text class="chartBox-title__left">{{ item.tradeCurrencyName }}</text>
											<text class="chartBox-title__right">/{{ item.currencyName }}</text>
										</view>
										<view class="chartBox-data">{{ item.currentPrice | number(4) }}</view>
										<view class="chartBox-gain">
											<text>{{ item.rise }}%</text>
										</view>
										<view class="chartBox-money">≈{{ (item.usdtPirce * item.currentPrice) | number(2) }}CNY</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			
			<!-- 行情 -->
			<view class="quotesBox">
				<view class="quotesBox-wrapper">
					<view class="quotesBox-title">
						<view class="quotesBox-title__label">行情</view>
						<!-- <view class="quotesBox-title__more" @click="$tools.switchTab('../quotes/quotes')">更多&gt;&gt;</view> -->
					</view>
					<!-- <view class="quotesBox-header">
						<view class="quotesBox-data quotesBox-data--2">交易对</view>
						<view class="quotesBox-data quotesBox-data--3">最新价</view>
						<view class="quotesBox-data">涨跌幅</view>
					</view> -->
					<view class="quotesBox-list" v-for="(item, index) in commTradeList" :key="index" @click="goKline(item.tradeId, item.tradeCurrencyName, item.currencyName)">
						<view class="quotesBox-data quotesBox-data--2">
							<view class="quotesBox-info">
								<view class="quotesBox-info__title">
									<text class="hidelight">{{ item.tradeCurrencyName }}</text>
									<text>/{{ item.currencyName }}</text>
								</view>
							</view>
						</view>
						<view class="quotesBox-data quotesBox-data--3">
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
	</view>
</template>

<script>
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
export default {
	components: { uniSwiperDot },
	data() {
		return {
			// 容器
			userInfo: [],
			slideList: [],
			noticeList: [],
			commTradeList: [],
			currencyList: [],
			rankingList: [],
			newsList: [],
			miningInfo: [],

			usdtPrice: 0,
			videoContext: null,
			videoPath: '',

			isLogin: false,

			// 行情
			quotesTabsActive: 0,

			//左侧导航栏
			menuDrawerWidth: uni.upx2px(600),

			// swiper
			swiperCurrent: 0,
			dotsMode: 'default',
			dotsStyles: {
				bottom: 15,
				backgroundColor: '#adafcd',
				selectedBackgroundColor: '#ffffff'
			},

			newsPageNum: 1,
			newsPageSize: 15,
			newsPages: 0,
			scrollTop: 0,
			eyeType: true,
		};
	},
	onLoad() {
		console.log(uni.getStorageSync('token'));
		console.log(uni.getStorageSync('token') != '');
		// debugger
	},
	onShow() {
		this.isLogin = uni.getStorageSync('token') != '';
		this.init();
	},
	methods: {
		_log(data) {
			console.log(JSON.stringify(data));
		},
		init() {
			this.getSlideList(); //轮播图
			this.getNoticeList(); //公告轮播图
			this.getCommTradeList(); //行情数据
		},
		// 轮播图
		getSlideList() {
			this.$Ajax('/search/indexSlides', {
				type: 0  //类型【0交易所 1矿池】
			}, res => {
				if (res.code == 0) {
					this.slideList = res.obj;
				}
			});
		},
		// 公告轮播
		getNoticeList() {
			this.$Ajax('/search/indexContent', {
				type: 0  //类型【0交易所 1矿池】
			}, res => {
				if (res.code == 0) {
					this.noticeList = res.obj.contentList;
				}
			});
		},
		// 行情数据
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
						item.cnyPrice = (item.currentPrice * item.usdtPirce).toFixed(2);
					});
				}
			});
		},

		goKline(tradeId, currencyTradeName, currencyName) {
			let that = this;
			uni.setStorageSync('tradeId', tradeId);
			
			// #ifdef H5
			that.$tools.switchTab('../exchange/exchange');
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
					that.$tools.switchTab('../exchange/exchange');
				}
			);
			// #endif
		},
		changeSwiper(e) {
			this.swiperCurrent = e.detail.current;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/index';
</style>
