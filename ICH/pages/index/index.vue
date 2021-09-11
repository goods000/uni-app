<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-menu" @click="showDrawer('menuDrawer')"></view>
				<view class="initHeader-imageTitle"><image src="../../static/index/icon-header-logo.png" mode="widthFix"></image></view>
			</view>
		</view>
		<view class="main">
			<!-- 轮播图 -->
			<view class="swiperBox">
				<view class="swiperBox-wrapper">
					<swiper
						:indicator-dots="true"
						:autoplay="true"
						:interval="2500"
						:duration="1000"
						:circular="true"
						class="swiperBox-swiper"
						indicator-color="#fff"
						indicator-active-color="#a0e3ff"
					>
						<swiper-item class="swiperBox-swiper__item" v-for="(item, index) in slideList" :key="index"><image :src="item.path" mode="widthFix"></image></swiper-item>
					</swiper>
				</view>
			</view>

			<!-- 滚动公告 -->
			<view class="noticeBox">
				<view class="noticeBox-wrapper" @click="$tools.jump('../announcement/announcement')">
					<view class="noticeBox-icon"><image src="../../static/index/icon-notice.png" mode="widthFix"></image></view>
					<swiper class="noticeBox-list noticeBox-swiper" vertical="true" autoplay="true" circular="true" interval="3000">
						<swiper-item class="noticeBox-swiper__item" v-for="(item, index) in noticeList" :key="index">
							<view class="noticeBox-swiper__item-label">{{ item.title }}</view>
						</swiper-item>
					</swiper>
				</view>
			</view>

			<!-- K线轮播图 -->
			<view class="cardBox">
				<view class="cardBox-swiper">
					<view class="cardBox-swiper__wrapper">
						<swiper :circular="true" :interval="3000" :duration="1000" display-multiple-items="3">
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
										<view class="chartBox-money">{{ item.cnyPrice | number(2) }}CNY</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>

			<view class="etiquetaBox">
				<view class="etiquetaBox-wrapper">
					<view class="etiquetaBox-item" @click="$tools.jump('../transaction/transaction')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-01.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">快捷买币</view>
					</view>
					<view class="etiquetaBox-item" @click="$tools.switchTab('../exchange/exchange')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-02.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">币币交易</view>
					</view>
					<!-- @click="toContract(1)" -->
					<view class="etiquetaBox-item" @click="$tools.noOpen()">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-03.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">保险合约</view>
					</view>
					<view class="etiquetaBox-item" @click="toContract(0)">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-04.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">合约交易</view>
					</view>
					<view class="etiquetaBox-item" @click="$tools.jump('../team/team')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-05.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">邀请好友</view>
					</view>
					<view class="etiquetaBox-item" @click="goService()">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-06.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">在线客服</view>
					</view>
					<view class="etiquetaBox-item" @click="$tools.jump('../help/help')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-07.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">常见问题</view>
					</view>
					<view class="etiquetaBox-item" @click="$tools.noOpen()">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-08.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">合约跟单</view>
					</view>
				</view>
			</view>

			<view class="bannerBox">
				<view class="bannerBox-wrapper">
					<view class="bannerBox-image" @click="$tools.jump('../transaction/transaction')"><image src="../../static/index/img-banner.jpg" mode="widthFix"></image></view>
				</view>
			</view>

			<view class="quotesBox">
				<view class="quotesBox-wrapper">
					<view class="quotesBox-tabs">
						<view class="quotesBox-tabs__control">
							<view
								class="quotesBox-tabs__control-item"
								:class="{ 'quotesBox-tabs__control-item--active': quotesTabsActive == 0 }"
								@click="changeQuotesTabsActive(0)"
							>
								涨幅榜
							</view>
							<view
								class="quotesBox-tabs__control-item"
								:class="{ 'quotesBox-tabs__control-item--active': quotesTabsActive == 1 }"
								@click="changeQuotesTabsActive(1)"
							>
								跌幅榜
							</view>
							<view
								class="quotesBox-tabs__control-item"
								:class="{ 'quotesBox-tabs__control-item--active': quotesTabsActive == 2 }"
								@click="changeQuotesTabsActive(2)"
							>
								成交榜
							</view>
						</view>
						<!-- <view class="quotesBox-tabs__wrapper">
							<view class="listBox-header">
								<view class="listBox-list">
									<view class="listBox-list__data listBox-list__data--nav">名称</view>
									<view class="listBox-list__data listBox-list__data--nav">最新价</view>
									<view class="listBox-list__data listBox-list__data--nav">涨幅</view>
								</view>
							</view>
						</view> -->
					</view>
					<view class="quotesBox-listBox listBox">
						<view class="listBox-header">
							<view class="listBox-list">
								<view class="listBox-list__data listBox-list__data--nav listBox-list__data--left">交易对</view>
								<view class="listBox-list__data listBox-list__data--nav listBox-list__data--center">最新价</view>
								<view class="listBox-list__data listBox-list__data--nav listBox-list__data--right">涨跌幅</view>
							</view>
						</view>
						<view class="listBox-wrapper">
							<view class="listBox-list" v-for="(item, index) in rankingList" :key="index" @click="goKline(item.tradeId, item.tradeCurrencyName, item.currencyName)">
								<view class="listBox-list__data listBox-list__data--left">
									<view class="listBox-list__data-name">
										<text class="listBox-list__data-name--highlight">{{ item.tradeCurrencyName }}</text>
										<text>/{{ item.currencyName }}</text>
									</view>
									<view class="listBox-list__data-quantity">24H量 {{ item.tradeNums | number(4) }}</view>
								</view>
								<view class="listBox-list__data listBox-list__data--center">
									<view class="listBox-list__data-price">
										<text class="listBox-list__data-price--highlight">{{ item.currentPrice | number(4) }}</text>
									</view>
									<view class="listBox-list__data-money">￥{{ (item.usdtPirce * item.currentPrice) | number(2) }}CNY</view>
								</view>
								<view class="listBox-list__data listBox-list__data--right">
									<view
										class="listBox-list__data-btn"
										:class="{ 'listBox-list__data-btn--down': item.riseType == 1, 'listBox-list__data-btn--up': item.riseType == 0 }"
									>
										{{ item.rise }}%
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-drawer :width="menuDrawerWidth" ref="menuDrawer" @change="drawerChange($event)">
			<view class="menuDrawerBox">
				<view class="menuDrawerBox-wrapper">
					<view class="menuDrawerBox-userInfo" v-if="isLogin">
						<view class="menuDrawerBox-userInfo__name">HI,{{ userInfo.nickName }}</view>
						<view class="menuDrawerBox-userInfo__data">
							<view class="menuDrawerBox-userInfo__id">UID: {{ userInfo.uuidStr }}</view>
							<view class="menuDrawerBox-userInfo__level"><image :src="'../../static/level/icon-level-' + userInfo.teamLevel + '.png'" mode="widthFix"></image></view>
						</view>
					</view>
					<view class="menuDrawerBox-userInfo" v-else>
						<view class="menuDrawerBox-userInfo__name" @click="$tools.jump('../operate/login')">
							请前往
							<text class="menuDrawerBox-userInfo__name--highlight">登录</text>
						</view>
					</view>
					<view class="menuDrawerBox-listBox">
						<view class="menuDrawerBox-listBox__list" @click="closeDrawerJump('../transaction/transaction_publish')">
							<view class="menuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-item-01.png" mode="widthFix"></image></view>
							<view class="menuDrawerBox-listBox__list-label">订单发布</view>
						</view>
						<view class="menuDrawerBox-listBox__list" @click="toAuthentication()">
							<view class="menuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-item-02.png" mode="widthFix"></image></view>
							<view class="menuDrawerBox-listBox__list-label">身份认证</view>
							<!-- <view class="menuDrawerBox-listBox__list-note" v-if="isLogin">{{ userInfo.authStatusStr }}</view> -->
						</view>
						<view class="menuDrawerBox-listBox__list" @click="closeDrawerJump('../team/team')">
							<view class="menuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-item-03.png" mode="widthFix"></image></view>
							<view class="menuDrawerBox-listBox__list-label">邀请好友</view>
						</view>
						<!-- @click="closeDrawerJumpService()" -->
						<view class="menuDrawerBox-listBox__list" @click="closeDrawerJumpService()">
							<view class="menuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-item-04.png" mode="widthFix"></image></view>
							<view class="menuDrawerBox-listBox__list-label">在线客服</view>
						</view>
						<view class="menuDrawerBox-listBox__list" @click="closeDrawerJump('../setting/setting_safety')">
							<view class="menuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-item-05.png" mode="widthFix"></image></view>
							<view class="menuDrawerBox-listBox__list-label">安全中心</view>
						</view>
						<view class="menuDrawerBox-listBox__list" @click="closeDrawerJump('../setting/setting')">
							<view class="menuDrawerBox-listBox__list-icon"><image src="../../static/menu/icon-item-06.png" mode="widthFix"></image></view>
							<view class="menuDrawerBox-listBox__list-label">更多设置</view>
						</view>
					</view>
					<!-- 	<view class="menuDrawerBox-footer">
						<view class="menuDrawerBox-footer__item" @click="$tools.jump('../help/help')">
							<view class="menuDrawerBox-footer__item-icon"><image src="../../static/menu/icon-help.png" mode="widthFix"></image></view>
							<view class="menuDrawerBox-footer__item-label">帮助中心</view>
						</view>
						<view class="menuDrawerBox-footer__item" @click="$tools.noOpen()">
							<view class="menuDrawerBox-footer__item-icon"><image src="../../static/menu/icon-share.png" mode="widthFix"></image></view>
							<view class="menuDrawerBox-footer__item-label">分享应用</view>
						</view>
					</view> -->
				</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
export default {
	components: { uniDrawer },
	data() {
		return {
			// 容器
			authInfo: [],
			userInfo: [],
			slideList: [],
			noticeList: [],
			commTradeList: [],
			currencyList: [],
			rankingList: [],

			usdtPrice: 0,
			videoContext: null,
			videoPath: '',

			isLogin: false,

			// 行情
			quotesTabsActive: 0,

			//左侧导航栏
			menuDrawerWidth: uni.upx2px(600)
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
				this.getUserInfo(); //用户信息
			}
			this.getSlideList(); //轮播图
			this.getNoticeList(); //公告轮播图
			this.getCommTradeList(); //行情数据
			this.getRanking(0, 0); //排行榜
		},
		getUserInfo() {
			this.$Ajax('/front/user/baseInfo', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.authInfo = res.obj.user;
					this.userInfo = res.obj.userBase;
					this.userInfo.authStatusStr = res.obj.user.authStatusStr;
					this.userInfo.hasAuth = res.obj.user.hasAuth;
					this.userInfo.uuidStr = res.obj.user.uuidStr;
					this.userInfo.teamLevel = res.obj.user.teamLevel;
					this.userInfo.nickName = res.obj.user.nickName;
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
		// 公告轮播图
		getNoticeList() {
			this.$Ajax('/search/indexContent', {}, res => {
				if (res.code == 0) {
					this.noticeList = res.obj.contentList;
				}
			});
		},
		// 行情数据
		getCommTradeList() {
			this.$Ajax('/search/allCommTrade', {}, res => {
				if (res.code == 0) {
					// this.usdtPrice = res.obj.usdtPrice;
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
		// 排行榜
		getRanking(index, sort) {
			this.$Ajax(
				'/search/indexRanking',
				{
					index: index,
					sort: sort
				},
				res => {
					if (res.code == 0) {
						this.rankingList = res.obj;
						this.rankingList.forEach(item => {
							if (Number(item.rise) < 0) {
								item.riseType = 1;
							} else if (Number(item.rise) > 0) {
								item.riseType = 0;
							}
							item.cnyPrice = (item.currentPrice * item.usdtPirce).toFixed(2);
						});
						this._log(res.obj);
					}
				}
			);
		},

		changeQuotesTabsActive(index) {
			this.quotesTabsActive = index;

			if (index == 0) {
				this.getRanking(0, 0);
			} else if (index == 1) {
				this.getRanking(0, 1);
			} else if (index == 2) {
				this.getRanking(1, 0);
			}
		},

		/* 左滑框 */
		showDrawer(e) {
			this.$refs[e].open();
		},
		// 关闭窗口
		closeDrawer(e) {
			this.$refs[e].close();
		},
		drawerChange(e, type) {
			if (e) {
				uni.hideTabBar();
			} else {
				uni.showTabBar();
			}
		},
		closeDrawerJump(url) {
			uni.showTabBar();
			this.closeDrawer('menuDrawer');
			this.$tools.jump(url);
		},
		toContract(type) {
			uni.setStorageSync('contractActive', type);
			this.$tools.switchTab('../contract/contract');
		},
		toAuthentication() {
			this.closeDrawerJump('../setting/setting_authentication');
			// if (this.authInfo.authStatus == 1 || this.authInfo.authStatus == 2) {
			// 	return 
			// } else {
			// 	this.closeDrawerJump('../setting/setting_authentication');
			// }
		},
		closeDrawerJumpService() {
			uni.showTabBar();
			this.closeDrawer('menuDrawer');
			this.goService();
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
						url: 'https://tb.53kf.com/code/app/3e755b20ad6f18eafd15ec549ea6b9715/2'
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
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/index';
</style>
