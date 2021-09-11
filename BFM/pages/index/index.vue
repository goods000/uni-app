<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-imageTitle"><image src="../../static/index/icon-header-logo.png" mode="widthFix"></image></view>
			</view>
		</view>
		
		<!-- 背景 -->
		<view class="bgBox"></view>
		
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
					<!-- <view class="noticeBox-btn">更多</view> -->
				</view>
			</view>
			
			<!-- 金刚区 -->
			<view class="etiquetaBox">
				<view class="etiquetaBox-wrapper">
					<view class="etiquetaBox-item" @click="$tools.jump('../entrust/entrust')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-01.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">一键委托</view>
					</view>
					<view class="etiquetaBox-item" @click="$tools.jump('../miningPool/miningPool')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-02.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">BFM矿池</view>
					</view>
					<view class="etiquetaBox-item" @click="$tools.noOpen()">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-03.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">最新活动</view>
					</view>
					<view class="etiquetaBox-item" @click="$tools.jump('../ipfs/ipfs')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-04.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">FIL算力</view>
					</view>
					<view class="etiquetaBox-item" @click="$tools.jump('../destruction/destruction', 0)">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-05.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">BFM销毁</view>
					</view>
					<view class="etiquetaBox-item" @click="goService()">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-06.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">在线客服</view>
					</view>
					<view class="etiquetaBox-item" @click="$tools.jump('../destruction/destruction', 1)">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-07.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">BLJ销毁</view>
					</view>
					<view class="etiquetaBox-item" @click="$tools.noOpen()">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-08.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">上币申请</view>
					</view>
				</view>
			</view>
			
			<!-- K线轮播图 -->
			<view class="cardBox">
				<view class="cardBox-swiperBox">
					<view class="cardBox-swiperBox__wrapper">
						<swiper class="cardBox-swiperBox__swiper" :circular="true" :interval="3000" :duration="1000" display-multiple-items="3" :disable-touch="commTradeList.length <= 3">
							<swiper-item class="cardBox-swiperBox__item" v-for="(item, index) in commTradeList" :key="index">
								<view
									class="cardBox-swiperBox__content"
									:class="[{ 'cardBox-swiperBox__content--red': item.riseType == 1 }, { 'cardBox-swiperBox__content--green': item.riseType == 0 }]"
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
			console.log(this.isLogin);
			if (this.isLogin) {
				// this.getUserInfo(); //用户信息
			}
			this.getSlideList(); //轮播图
			this.getNoticeList(); //公告轮播图
			this.getCommTradeList(); //行情数据
			// this.getMiningInfo();
			// this.getRanking(0, 0); //排行榜
			// this.getNewsInfo();
		},
		getUserInfo() {
			this.$Ajax('/front/user/baseInfo', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.userInfo = res.obj.userBase;
					// this.userInfo.hasAuth = res.obj.user.hasAuth;
					// this.userInfo.uuidStr = res.obj.user.uuidStr;
					// this.userInfo.teamLevel = res.obj.user.teamLevel;
				}
			});
		},
		// 轮播图
		getSlideList() {
			this.$Ajax('/search/indexSlides', {}, res => {
				if (res.code == 0) {
					this.slideList = res.obj;
				}
			});
		},
		// 公告轮播
		getNoticeList() {
			this.$Ajax('/search/indexContent', {}, res => {
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
		goService() {
			console.log(JSON.stringify(uni.getSystemInfoSync().platform));
			if (uni.getSystemInfoSync().platform == 'android') {
				console.log('走原生');
				// #ifdef APP-PLUS
				const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');
				dcRichAlert.show(
					{
						type: '100',
						url: 'https://tb.53kf.com/code/app/3e755b20ad6f18eafd15ec549ea6b9715/11'
					},
					result => {}
				);
				// #endif
			} else {
				this.$tools.jump('../service/service');
			}
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
		},
		toggleAssetsInfo() {
			var eyeType = uni.getStorageSync('eyeType');
			if (eyeType) {
				uni.setStorageSync('eyeType', false);
				this.eyeType = false;
			} else {
				uni.setStorageSync('eyeType', true);
				this.eyeType = true;
			}
		},
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/index';
</style>
