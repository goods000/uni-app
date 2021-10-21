<template>
	<view class="pages bg_header">
		<view class="initHeader initHeader--bgStyle initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-title">首页</view>
			</view>
		</view>

		<view class="main">
			<!-- 轮播图 -->
			<uni-swiper-dot :info="slideList" :current="swiperCurrent" :mode="dotsMode" :dotsStyles="dotsStyles">
				<view class="swiperBox">
					<view class="swiperBox-wrapper">
						<swiper
							:indicator-dots="false"
							:autoplay="true"
							:interval="2500"
							:duration="1000"
							:circular="true"
							class="swiperBox-swiper"
							@change="changeSwiper"
							:disable-touch="slideList.length <= 1"
						>
							<swiper-item class="swiperBox-swiper__item" v-for="(item, index) in slideList" :key="index">
								<image :src="item.path" mode="widthFix"></image>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</uni-swiper-dot>

			<!-- 金刚区 -->
			<view class="etiquetaBox">
				<view class="etiquetaBox-wrapper">
					<view class="etiquetaBox-item" @click="$tools.jump('../share/share')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-index-01.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">邀请好友</view>
					</view>
					<view class="etiquetaBox-item" @clic @click="$tools.jump('../recharge/recharge')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-index-02.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">充值</view>
					</view>
					<view class="etiquetaBox-item" @clic @click="$tools.jump('../withdraw/withdraw')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-index-03.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">提现</view>
					</view>
					<view class="etiquetaBox-item" @clic @click="$tools.jump('../service/service')">
						<view class="etiquetaBox-item__icon"><image src="../../static/index/icon-index-04.png" mode="widthFix"></image></view>
						<view class="etiquetaBox-item__label">联系客服</view>
					</view>
				</view>
			</view>
			
			<!-- 滚动公告 -->
			<view class="noticeBox">
				<view class="noticeBox-wrapper" @click="$tools.jump('../notice/notice')">
					<view class="noticeBox-title">公告</view>
					<swiper class="noticeBox-list noticeBox-swiper" vertical="true" autoplay="true" circular="true" interval="3000">
						<swiper-item class="noticeBox-swiper__item" v-for="(item, index) in noticeList" :key="index">
							<view class="noticeBox-swiper__item-label">{{ item.title }}</view>
						</swiper-item>
					</swiper>
					<!-- <view class="noticeBox-more">更多</view> -->
				</view>
			</view>

			<view class="recommendBox">
				<view class="recommendBox-wrapper">
					<view class="recommendBox-wrapper-item">
						<image src="../../static/index/icon-index-tips.png" mode="widthFix" class="recommendBox-wrapper-item__image"></image>
						<view class="">
							<view class="recommendBox-title">CLQ积分价格走势图<view class="recommendBox-title-tips">(左右滑动查看每日价格)</view></view>
							<view class="recommendBox-txt">CLQ PRICE CHART</view>
						</view>
						<!-- <view class="recommendBox-wrapper-right">(左右滑动查看每日价格)</view> -->
					</view>

					<view class="recommendBox-body">
						<view class="recommendBox-body-title">CLQ 今日价格为</view>
						<view class="recommendBox-body-scale">1 CLQ ={{ TPDPrice }} USDT (折合{{TPDPrice*usdtPrice | number(4)}}CNY)</view>
					</view>
					<!-- <chartList ref="son"></chartList> -->
					<chartList :showChartRam="showChartRam"></chartList>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
import chartList from '../echart/chartList.vue';
	
export default {
	components: { uniSwiperDot,chartList },
	data() {
		return {
			// 容器
			slideList: [{path:'../../static/index/icon-index-banner.png'},{path:'../../static/index/icon-index-banner.png'},{path:'../../static/index/icon-index-banner.png'}],
			noticeList: [],
			isLogin: false,
			// swiper
			swiperCurrent: 0,
			dotsMode: 'default',
			dotsStyles: {
				bottom: 5,
				backgroundColor: '#F5D279',
				selectedBackgroundColor: '#FFFFFF'
			},
			TPDPrice:'',
			usdtPrice:'',
			showChartRam: ''
		};
	},
	onShow() {
		this.showChartRam = Math.random();
		console.log("this.showChartRam",this.showChartRam);
		this.init();
		// this.$refs.son.getServerData();
	},
	methods: {
		init() {
			this.getSlideList(); //轮播图
			this.getNoticeList(); //公告轮播图
			this.getTPDPrice(); //获取TPD兑换USDT价格
			this.getUSDTCNY(); 
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
		// 获取TPD兑换USDT价格
		getTPDPrice() {
			this.$Ajax('/front/mine/getTPDPrice', {}, res => {
				// console.log(JSON.stringify(res.obj));
				if (res.code == 0) {
					this.TPDPrice = res.obj;
				}
			});
		},
		// 获取USDT-CNY价格
		getUSDTCNY() {
			this.$Ajax('/front/mine/getUSDTCNY', {}, res => {
				if (res.code == 0) {
					this.usdtPrice = res.obj;
				}
			});
		},
		// goService() {
		// 	console.log(JSON.stringify(uni.getSystemInfoSync().platform));
		// 	if (uni.getSystemInfoSync().platform == 'android') {
		// 		console.log('走原生');
		// 		// #ifdef APP-PLUS
		// 		const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');
		// 		dcRichAlert.show(
		// 			{
		// 				type: '100',
		// 				url: 'https://tb.53kf.com/code/app/b1ca6cececc0768d7862562e467111aa5/2'
		// 			},
		// 			result => {}
		// 		);
		// 		// #endif
		// 	} else {
		// 		this.$tools.jump('../service/service');
		// 	}
		// },
		changeSwiper(e) {
			this.swiperCurrent = e.detail.current;
		},
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/index/index';
</style>
