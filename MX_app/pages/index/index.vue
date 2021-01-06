<template>
	<view class="content">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-title">首页</view>
				<view class="header-right" @click="scanCode()">
					<image src="../../static/index/icon-index-scan.png" mode=""></image>
				</view> 
			</view> 
		</view>
		
		<view class="main">
			<!-- 轮播图 -->
			<uni-swiper-dot :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles">
				<swiper class="swiper-box">
					<swiper-item v-for="(item, index) in info" :key="index">
						<view :class="item.colorClass" class="swiper-item">
							<image class="image" :src="webUrl + item.path" mode="aspectFill" />
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
			<!-- 公告 -->
			<view class="example-notice">
				<view class="example-body" @click="$tools.jump('../notice/notice')">
					<view class="example-title">公告</view>
					<uni-notice-bar :scrollable="true" :single="true" :show-get-more="true" more-text="查看更多" :text="this.noticeList[0].title" />
				</view>
			</view>
			<!-- 内容板块 -->
			<view class="content-section">
				<view class="content-left" @click="$tools.jump('../mine/mine')">
					<view class="content-title">智能合约交易</view>
					<view class="content-tips">该产品是由MMX APP提供的多款储蓄理财产品，100%保障本息安全。</view>
					<view class="content-image">
						<image src="../../static/index/icon-index-4.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="content-right">
					<view class="content-list" @click="$tools.jump('../buyCurrency/buyCurrency')">
						<view class="content-list-icon">
							<image src="../../static/index/icon-index-1.png" mode=""></image>
						</view>
						<view class="content-list-title">
							<view class="content-list-title-tips">快捷购买SLC</view>
							<view class="content-list-title-info">QUICK BUY BANK NOTES</view>
						</view>
					</view>
					<view class="content-list"  @click="$tools.jump('../transfer/transfer')">
						<view class="content-list-icon">
							<image src="../../static/index/icon-index-2.png" mode=""></image>
						</view>
						<view class="content-list-title">
							<view class="content-list-title-tips">快捷转账</view>
							<view class="content-list-title-info">QUICK TRANSFER</view>
						</view>
					</view>
					<view class="content-list" @click="$tools.jump('../collection/collection')">
						<view class="content-list-icon">
							<image src="../../static/index/icon-index-3.png" mode=""></image>
						</view>
						<view class="content-list-title">
							<view class="content-list-title-tips">我的收款</view>
							<view class="content-list-title-info"> MY COLLECTION</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 行情 -->
			<view class="tips_view mt">
				<view class="tips-txt">主流币行情</view>
			</view>
			<view class="in_ul_box">
				<view class="in_ul">
					<view class="in_li">
						<view class="li_top">名称</view>
						<view class="li_top">最新价</view>
						<view class="li_top">跌涨幅</view>
					</view>
					<view class="in_li" v-for="(item, index) in coinList" :key="index">
						<view class="coin_title_l">
							<view class="coin_name">
								<view class="introduce">{{ item.curr.toUpperCase()}}</view>
								<!-- <view class="coin_b">/USDT</view> -->
							</view>
						</view>
						<view class="coin_title_l">
							<view class="title">$ {{ item.usd }}</view>
							<view class="coin_b">￥{{ item.cny }}</view>
						</view>
						<view class="coin_title_l">
							<view class="coin_state coin_drop" v-if="item.ugain < 0 ">{{ item.ugain }}%</view>
							<view class="coin_state coin_rise" v-else>+{{ item.ugain }}%</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
	import webUrl from '../../common/js/url.js';
	export default {
		components: { uniSwiperDot, uniNoticeBar },
		data() {
			return {
				webUrl: webUrl.webUrl,
				info: [],
				noticeList: [{
					content: ''
				}],
				coinList:[],
				content: '',
				// swiper
				colorClass: 'uni-bg-red',
				current: 0,
				mode: 'default',
				dotsStyles: {
					bottom: 15,
					backgroundColor: 'transparent',
					selectedBackgroundColor: 'transparent'
				},
				t:null
			}
		},
		onShow() {
			this.getBanner();
			this.getNotice();
			this.getList();
			if(this.t != null){
				clearTimeout(this.t)
			}
			// setInterval(this.getList, 5000);
		}, 
		mounted() {
			this.t = setInterval(this.getList, 5000);
			console.log(this.t)
		},
		methods: {
			// 行情
			getList() {
				// uni.request({
				// 	url: webUrl.webUrl + '/pricelog/feixiaohao',
				// 	method: 'GET',
				// 	dataType: 'json',
				// 	data: {},
				// 	header: {
				// 		'content-type': 'application/json'
				// 	},
				// 	success: res => {
				// 			console.log(res.data)
				// 		if (res.data.code == 0) {
				// 			this.coinList = res.data.data
				// 			console.log(this.coinList)
				// 		}
				// 	},
				// });
				// this.$Ajax('/pricelog/feixiaohao', {}, res => {
				this.$Ajax('/pricelog/list', {}, res => {
						if (res.code == 0) {
							this.coinList = res.list
						}
					}
				);
			},
			// 轮播图
			getBanner() {
				this.$Ajax('/banner/list/index', {}, res => {
						if (res.code == 0) {
							this.info = res.list
						}
					}
				);
			},
			// 公告
			getNotice() {
				this.$Ajax('/bulletin/list', {}, res => {
						if (res.code == 0) {
							this.noticeList = res.list
						}
					}
				);
			},
			//扫一扫
			scanCode() {
				uni.scanCode({
					onlyFromCamera: true,
					success: res => {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						let msg = res.result;
						this.addr = msg;
					}
				});
			},
		}
	}
</script>

<style>
	@import '@/common/css/style.css';
</style>
