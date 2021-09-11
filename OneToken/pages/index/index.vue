<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-left">
					<view class="initHeader-imageTitle"><image src="../../static/index/icon-header-logo.png" mode="widthFix"></image></view>
				</view>
				<!-- <view class="initHeader-right"><view class="initHeader-button initHeader-button--serive" @click="$tools.noOpen()"></view></view> -->
			</view>
		</view>

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
				<view class="noticeBox-wrapper" @click="$tools.jump('../notice/notice')">
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
					<uni-swiper-dot :info="etiquetaSlideList" :current="etiquetaSwiperCurrent" :mode="etiquetaDotsMode" :dotsStyles="etiquetaDotsStyles">
						<swiper :indicator-dots="false" :interval="2500" :duration="1000" class="etiquetaBox-swiper" @change="changeEtiquetaSwiper" display-multiple-items="4">
							<swiper-item class="etiquetaBox-swiper__item">
								<view class="etiquetaBox-item" @click="toDocumentary(0)">
									<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-01.png" mode="widthFix"></image></view>
									<view class="etiquetaBox-item__label">合约先锋</view>
								</view>
							</swiper-item>
							<swiper-item class="etiquetaBox-swiper__item">
								<view class="etiquetaBox-item" @click="toInformation(3)">
									<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-02.png" mode="widthFix"></image></view>
									<view class="etiquetaBox-item__label">社区动态</view>
								</view>
							</swiper-item>
							<swiper-item class="etiquetaBox-swiper__item">
								<view class="etiquetaBox-item" @click="$tools.noOpen()">
									<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-03.png" mode="widthFix"></image></view>
									<view class="etiquetaBox-item__label">学院</view>
								</view>
							</swiper-item>
							<swiper-item class="etiquetaBox-swiper__item">
								<view class="etiquetaBox-item" @click="$tools.noOpen()">
									<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-04.png" mode="widthFix"></image></view>
									<view class="etiquetaBox-item__label">身份认证</view>
								</view>
							</swiper-item>
							<swiper-item class="etiquetaBox-swiper__item">
								<view class="etiquetaBox-item" @click="$tools.noOpen()">
									<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-05.png" mode="widthFix"></image></view>
									<view class="etiquetaBox-item__label">余币宝</view>
								</view>
							</swiper-item>
							<swiper-item class="etiquetaBox-swiper__item">
								<view class="etiquetaBox-item" @click="$tools.jump('../help/help')">
									<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-etiqueta-06.png" mode="widthFix"></image></view>
									<view class="etiquetaBox-item__label">帮助中心</view>
								</view>
							</swiper-item>
						</swiper>
					</uni-swiper-dot>
				</view>
			</view>

			<!-- 图标按钮 -->
			<view class="iconItemBox">
				<view class="iconItemBox-wrapper">
					<view class="iconItemBox-item" @click="$tools.jump('../documentary/documentary_bind')">
						<view class="iconItemBox-item__icon"><image src="../../static/index/icon-iconItem-01.png" mode="widthFix"></image></view>
						<view class="iconItemBox-item__content">
							<view class="iconItemBox-item__label">同步跟单</view>
							<view class="iconItemBox-item__data">交易所API接入</view>
						</view>
					</view>
					<view class="iconItemBox-item" @click="toDocumentary(1)">
						<view class="iconItemBox-item__icon"><image src="../../static/index/icon-iconItem-02.png" mode="widthFix"></image></view>
						<view class="iconItemBox-item__content">
							<view class="iconItemBox-item__label">交易员</view>
							<view class="iconItemBox-item__data">社区明星交易员专区</view>
						</view>
					</view>
				</view>
			</view>

			<view class="rankingBox">
				<view class="rankingBox-wrapper">
					<view class="rankingBox-title">
						<view class="rankingBox-title__label">合约交易先锋榜</view>
						<view class="rankingBox-title__more" @click="$tools.switchTab('../documentary/documentary')"></view>
					</view>
					<view class="initNoData" v-if="rankingList.length == 0">暂无数据</view>
					<swiper
						:indicator-dots="false"
						:interval="2500"
						:duration="1000"
						class="rankingBox-swiper"
						display-multiple-items="2"
						previous-margin="30upx"
						next-margin="30upx"
						:disable-touch="rankingList.length <= 2"
						v-else
					>
						<swiper-item class="rankingBox-swiper__item" v-for="(item, index) in rankingList" :key="index" @click="$tools.jump('../userInfo/userInfo', item.traderId)">
							<view class="rankingBox-plane">
								<view class="rankingBox-header">
									<view class="rankingBox-avatar"><image :src="item.userImage" mode="scaleToFill"></image></view>
									<view class="rankingBox-info">
										<view class="rankingBox-name">{{ item.nickName }}</view>
										<view class="rankingBox-row">
											<view class="rankingBox-type">{{ item.bourseName }}{{ item.currencyName }}交易员</view>
											<view class="rankingBox-ranking">NO.{{ index + 1 }}</view>
										</view>
									</view>
								</view>
								<view class="rankingBox-body">
									<view class="rankingBox-itemBox">
										<view class="rankingBox-itemBox__item">
											<view class="rankingBox-itemBox__item-data rankingBox-itemBox__item-data--style">{{ item.profit | number(4) }}</view>
											<view class="rankingBox-itemBox__item-label">收益({{ item.currencyName }})</view>
										</view>
										<view class="rankingBox-itemBox__item">
											<view class="rankingBox-itemBox__item-data">{{ item.followCount }}</view>
											<view class="rankingBox-itemBox__item-label">跟随者</view>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>

			<!-- 链上快讯 -->
			<view class="newsBox">
				<view class="newsBox-wrapper">
					<view class="newsBox-title">
						<view class="newsBox-title__label">链上快讯</view>
						<view class="newsBox-title__more" @click="$tools.switchTab('../information/information')"></view>
					</view>
					<scroll-view scroll-y="true" class="newsBox-content" @scrolltolower="newsListLower">
						<view class="newsBox-list" v-for="(item, index) in choiceList" :key="index" @click="$tools.jump('../information/information_details', item.id)">
							<view class="newsBox-list__content">
								<view class="newsBox-list__title">{{ item.title }}</view>
								<view class="newsBox-list__date">{{ item.timeString }}</view>
							</view>
							<view class="newsBox-list__image"><image :src="item.thumbnail" mode="widthFix"></image></view>
						</view>
					</scroll-view>
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
			choiceList: [], //精选快讯

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
				backgroundColor: '#999999',
				selectedBackgroundColor: '#cb0101'
			},

			pageNum: 1,
			pageSize: 15,
			pageSum: 0,
			scrollTop: 0,
			eyeType: true,

			// 金刚区
			etiquetaSlideList: ['0', '1', '2'],
			etiquetaSwiperCurrent: 0,
			etiquetaDotsMode: 'default',
			etiquetaDotsStyles: {
				bottom: 0,
				backgroundColor: '#999999',
				selectedBackgroundColor: '#cb0101'
			},

			// 金刚区
			rankingSlideList: ['0', '1', '2'],
			rankingSwiperCurrent: 0,
			rankingDotsMode: 'default',
			rankingDotsStyles: {
				bottom: 0,
				backgroundColor: '#999999',
				selectedBackgroundColor: '#cb0101'
			}
		};
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
				//登录后调用的接口
				// this.getUserInfo(); //用户信息
			}
			this.getSlideList(); //轮播图
			this.getNoticeList(); //公告轮播
			// this.getCommTradeList(); //行情数据
			this.getRanking(); //排行榜数据
			this.getChoiceList(); //精选快讯
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
					this.noticeList = res.obj;
				}
			});
		},
		// 行情数据
		getCommTradeList() {
			this.$Ajax('/search/allCommTrade', {}, res => {
				if (res.code == 0) {
					// console.log('行情：' + JSON.stringify(res.obj));
					this.commTradeList = res.obj;
					this.commTradeList.forEach(item => {
						if (Number(item.rise) > 0) {
							item.riseType = 0;
						} else if (Number(item.rise) < 0) {
							item.riseType = 1;
						}
						item.cnyPrice = (item.currentPrice * item.usdtPrice).toFixed(2);
					});
				}
			});
		},

		// 排行榜
		getRanking() {
			this.$Ajax(
				'/search/trader/rank',
				{
					count: 10
				},
				res => {
					console.log('排行：' + JSON.stringify(res.obj));
					if (res.code == 0) {
						this.rankingList = res.obj;
					}
				}
			);
		},
		// 精选快讯
		getChoiceList() {
			this.$Ajax(
				'/info/important/list',
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.choiceList = this.choiceList.concat(res.obj.list);
					}
				}
			);
		},
		toDocumentary(type){
			uni.setStorageSync('documentaryActive', type);
			this.$tools.switchTab('../documentary/documentary')
		},
		toInformation(type){
			uni.setStorageSync('informationActive', type);
			this.$tools.switchTab('../information/information')
		},
		newsListLower(e) {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底了');
			} else {
				this.pageNum++;
				this.getChoiceList();
			}
		},
		changeSwiper(e) {
			this.swiperCurrent = e.detail.current;
		},
		changeEtiquetaSwiper(e) {
			this.etiquetaSwiperCurrent = e.detail.current;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/index';
</style>
