<template>
	<view class="content">
		<view class="header_bar">
			<view class="header">
				<view class="header-left">
					<image src="../../static/index/icon-logo-index.png" mode="widthFix"></image>
				</view> 
			</view> 
		</view> 
		
		<view class="main">
			<!-- 轮播图 -->
			<uni-swiper-dot :info="info" :current="current" mode="false">
				<view class="swiperBox">
					<view class="swiperBox-wrapper">
						<swiper :indicator-dots="false" :autoplay="true" :interval="2500" :duration="1000" :circular="true" class="swiperBox-swiper" @change="changeSwiper">
							<swiper-item class="swiperBox-swiper__item" v-for="(item, index) in info" :key="index">
								<image :src="item.path" mode="widthFix" @click="openSource()"></image>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</uni-swiper-dot>
			
			<!-- 滚动公告 -->
			<view class="noticeBox">
				<view class="noticeBox-wrapper" @click="$tools.jump('../announcement/announcement')">
					<view class="noticeBox-icon"><image src="../../static/index/icon-index-notice.png" mode="widthFix"></image></view>
					<swiper class="noticeBox-list noticeBox-swiper" vertical="true" autoplay="true" circular="true" interval="3000">
						<swiper-item class="noticeBox-swiper__item" v-for="(item, index) in noticeList" :key="index">
							<!-- <view class="noticeBox-swiper__item-label" v-if="item.statusStr != '不显示'">{{ item.title }}</view> -->
							<view class="noticeBox-swiper__item-label">{{ item.title }}</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			
			
			<!-- 运营数据 -->
			<view class="indexBox">
				<view class="indexBox-header">
					<view class="indexBox-header-image">
						<image src="../../static/index/icon-index-01.png" mode="widthFix"></image>
					</view>
					<view class="indexBox-title">矿池运营数据</view>
				</view>
				<view class="tipsBox">
					<view class="tipsBox-wrapper">
						<view class="tipsBox-title">
							<view class="tipsBox-title__label">FIL矿池</view>
						</view>
					</view>
				</view>
				<view class="indexBox-table">
					<view class="indexBox-table-item">
						<view class="indexBox-table-item-title">全网总算力</view>
						<view class="indexBox-table-item-data">{{PoolList.pledgeSum}}EiB</view>
					</view>
					<view class="indexBox-table-item">
						<view class="indexBox-table-item-title">RYCC矿池总算力 </view>
						<view class="indexBox-table-item-data">{{PoolList.pledgeSLZG}}PiB </view>
					</view>
					<view class="indexBox-table-item">
						<view class="indexBox-table-item-title">矿池产出</view>
						<view class="indexBox-table-item-data">{{PoolList.pledgeBase}}FIL/T</view>
					</view>
					<view class="indexBox-table-item">
						<view class="indexBox-table-item-title">封存质押</view>
						<view class="indexBox-table-item-data">{{PoolList.pledgeNum}}FIL/T</view>
					</view>
					<view class="indexBox-table-item">
						<view class="indexBox-table-item-title">新增封存Gas</view>
						<view class="indexBox-table-item-data">{{PoolList.pledgeNewnum}}FIL/T</view>
					</view>
					<view class="indexBox-table-item">
						<view class="indexBox-table-item-title">存储维护Gas</view>
						<view class="indexBox-table-item-data">{{PoolList.pledgeGAS}}FIL/T</view>
					</view>
				</view>
				<view class="tipsBox">
					<view class="tipsBox-wrapper">
						<view class="tipsBox-title">
							<view class="tipsBox-title__label">软云存储矿池运营数据</view>
						</view>
					</view>
					<view class="chartsBox">
						<view class="chartsBox-list">
							<image src="../../static/index/icon-yuan.png" mode="widthFix" class="chartsBox-list-charts"></image>
						</view>
						<view class="chartsBox-list">
							<view class="chartsBox-list-item">
								<view class="chartsBox-list-item-tips orange"></view>
								<view class="chartsBox-list-item-name">合约周期</view>
								<view class="chartsBox-list-item-name chartsBox-list-item-tips1">{{poolData.contractDays}}</view>
								<view class="chartsBox-list-item-name">天</view>
							</view>
							<view class="chartsBox-list-item">
								<view class="chartsBox-list-item-tips green"></view>
								<view class="chartsBox-list-item-name">结算周期</view>
								<view class="chartsBox-list-item-name chartsBox-list-item-tips3">{{poolData.settlementInterval}}</view>
							</view>
						</view>
						<view class="chartsBox-list">
							<view class="chartsBox-list-item">
								<view class="chartsBox-list-item-tips blue"></view>
								<view class="chartsBox-list-item-name">封装时间</view>
								<view class="chartsBox-list-item-name chartsBox-list-item-tips2">{{poolData.packageDays}}</view>
								<view class="chartsBox-list-item-name">天</view>
							</view>
							<view class="chartsBox-list-item">
								<view class="chartsBox-list-item-tips yellow"></view>
								<view class="chartsBox-list-item-name">技术服务费</view>
								<view class="chartsBox-list-item-name chartsBox-list-item-tips4">{{(poolData.skillFee) * 100}}%</view>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			
			
			<!-- 行情 -->
			<view class="indexBox">
				<view class="tipsBox-wrapper">
					<view class="tipsBox-title">
						<view class="tipsBox-title__label">FIL行情价格</view>
					</view>
				</view>
				<view class="priceBox">
					<view class="priceBox-list">
						<view class="priceBox-list-item" v-for="(item,index) in coinList" :key="index">
							<view class="priceBox-list-item-image" v-if="index == 1">
								<image src="../../static/public/Huobi.png" mode="widthFix"></image>
								<view class="priceBox-list-item-name">Huobi</view>
							</view>
							<view class="priceBox-list-item-image" v-if="index == 4">
								<image src="../../static/public/Binance.png" mode="widthFix"></image>
								<view class="priceBox-list-item-name">Binance</view>
							</view>
							<view class="priceBox-list-item-image" v-if="index == 3">
								<image src="../../static/public/OKEx.png" mode="widthFix"></image>
								<view class="priceBox-list-item-name">OKEx</view>
							</view>
							<view class="priceBox-list-item-image" v-if="index == 2">
								<image src="../../static/public/zhongbi.png" mode="widthFix"></image>
								<view class="priceBox-list-item-name">中币</view>
							</view>
							<view class="priceBox-list-item-price">${{item.priceUSDT}}</view>
							<view class="priceBox-list-item-priceCny">￥{{item.priceYNC}}</view>
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
				info: [{
					path:'../../static/index/icon-banner.png'
				},{
					path:'../../static/index/icon-banner.png'
				}],
				noticeList: [{
					title: '软云存储发布手机APP V2.6.7.beta版本的公告...'
				}],
				coinList:[],
				content: '',
				// swiper
				current: 0,
				// mode: 'default',
				PoolList:[],
				poolData:[],
				pages: 1, //总页数
				pageNum: 1, //当前页数
				pageSize: 20, //请求记录
			}
		},
		onShow() {
			this.init();
			if(this.t != null){
				clearTimeout(this.t)
			}
		},
		mounted() {
			this.t = setInterval(this.getList, 5000);
			// console.log(this.t)
		},
		methods: {
			changeSwiper(e) {
				this.current = e.detail.current;
			},
			init(){
				this.getNotice();
				this.getBanner();
				this.getList();
				this.getPoolData();
			},
			// 跳转合作平台
			openSource(){
				this.$Ajax(
					'/search/indexContent',
					{
						num: 1,
						type: 3
					},
					res => {
						if (res.code == 0) {
							this.url = res.obj.contentList;
						}
					}
				);
				console.log(this.url);
				plus.runtime.openURL(this.url, function(res) {  
					console.log(res);  
				});  
			},
			//矿池运营数据
			getPoolData() {
				this.$Ajax('/search/filPoolData', {}, res => {
						if (res.code == 0) {
							this.PoolList = res.obj
							res.obj.poolData.forEach((item,index) =>{
								this.poolData = item;
							})
						}
					}
				);
			},
			// 行情
			getList() {
				this.$Ajax('/search/filPrice', {}, res => {
						if (res.code == 0) {
							this.coinList = res.obj
						}
					}
				);
			},
			// 轮播图
			getBanner() {
				this.$Ajax('/search/indexSlides', {}, res => {
						if (res.code == 0) {
							this.info = res.obj
						}
					}
				);
			},
			// 公告
			getNotice() {
				// 一条首页轮播
				// this.$Ajax('/search/indexContent', {
				this.$Ajax('/search/getContent', {
					// num:1,
					type:0,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				}, res => {
						if (res.code == 0) {
							// this.noticeList = res.obj.contentList;
							this.noticeList = res.obj.list;
						}
					}
				);
			},
		}
	}
</script>


<style lang="scss" scoped>
	@import '@/common/scss/pages/index/index';
</style>
