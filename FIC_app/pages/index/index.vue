<template>
	<view class="content">
		<view class="header_bar header_bg header_fixed">
			<view class="header">
				<view class="header-title">
					<image src="../../static/index/icon-index-logo.png" mode="widthFix"></image>
				</view>
			</view> 
		</view>
		
		<view class="main">
			<view class="index-asset">
				<view class="index-asset-box">
					<view class="index-asset-count">
						<view class="index-asset-top">
							<view class="index-asset-top-image">
								<image src="../../static/index/icon-index-record.png" mode="widthFix"></image>
							</view>
							<view class="index-asset-top-txt">总算力</view>
						</view>
						<view class="insex-asset-top-data">{{userList.levelInvest}}<view class="index-asset-top-t">(T)</view></view>
					</view>
					<view class="index-asset-bottom">
						<view class="index-asset-info">
							<view class="index-asset-info-title">累计收益</view>
							<view class="index-asset-info-txt">{{userList.quietTotal*1 + userList.dynamicTotal*1}}</view>
						</view>
						<view class="index-asset-info">
							<view class="index-asset-info-title">今日收益</view>
							<view class="index-asset-info-txt">{{userList.quietToday*1 + userList.dynamicToday*1}}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 公告 -->
			<view class="example-notice">
				<view class="example-body" @click="$tools.jump('../notice/notice')">
					<view class="example-title">
						<image src="../../static/index/icon-index-notice.png" mode=""></image>
					</view>
					<uni-notice-bar :scrollable="true" :single="true" :show-get-more="true" more-text="查看更多" :text="this.noticeList[0].title" />
				</view>
			</view>
			
			<view class="index-list">
				<view class="index-list-box" @click="$tools.jump('../invite/invite')">
					<view class="index-list-box-image">
						<image src="../../static/index/icon-index-1.png" mode="widthFix"></image>
					</view>
					<view class="index-list-box-txt">邀请好友</view>
				</view>
				<view class="index-list-box" @click="$tools.jump('../mine/mine')">
					<view class="index-list-box-image">
						<image src="../../static/index/icon-index-2.png" mode="widthFix"></image>
					</view>
					<view class="index-list-box-txt">算力购买</view>
				</view>
				<view class="index-list-box" @click="$tools.jump('../team/team')">
					<view class="index-list-box-image">
						<image src="../../static/index/icon-index-3.png" mode="widthFix"></image>
					</view>
					<view class="index-list-box-txt">我的团队</view>
				</view>
			</view>
			
			<!-- 轮播图 -->
			<view class="view-bg mt-5">
				<uni-swiper-dot :info="info" :current="current" :mode="mode">
					<swiper class="swiper-box" :autoplay="true" :interval="5000" :duration="1000" 
					:indicator-dots="false" indicator-color="rgba(204,204,204,1)" indicator-active-color="rgba(50,67,104,1)" @change="changeSwiper">
						<swiper-item v-for="(item, index) in info" :key="index" >
							<view class="swiper-item">
								<image class="image" :src="webUrl + item.path" mode="aspectFill" />
								<!-- <image class="image" :src="item.path" mode="widthFix" /> -->
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>	
			
			<!-- 内容板块 -->
			<!-- <view class="content-section">
				<view class="content-left" @click="$tools.jump('../mine/mine')">
					<view class="content-title">质押挖矿</view>
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
							<view class="content-list-title-tips">快捷买排单币</view>
							<view class="content-list-title-info">QUICK BUY BANK NOTES</view>
						</view>
					</view>
					<view class="content-list" @click="$tools.noOpen()">
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
			</view> -->
			
			<!-- 行情 -->
			<view class="tips_view">
				<view class="s_view"></view>
				<view class="tips-txt">货币行情</view>
			</view>
			<view class="in_ul_box">
				<view class="in_ul">
					<view class="in_li">
						<view class="li_top">名称</view>
						<view class="li_top">最新价</view>
						<view class="li_top">跌涨幅</view>
					</view>
					<view v-for="(item, index) in coinList" :key="index">
						<view class="in_li" v-if="item.curr.toUpperCase() == 'USDT' || item.curr.toUpperCase() == 'FIC'" >
							<view class="coin_title_l">
								<view class="coin_name">
									<view class="introduce">{{ item.curr.toUpperCase() }}</view>
									<view class="coin_b" v-if="item.curr.toUpperCase() == 'USDT'" ></view>
									<view class="coin_b" v-else >/USDT</view>
								</view>
							</view>
							<view class="coin_title_l">
								<view class="title">{{ item.usd }}</view>
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
					content: ''
				}],
				coinList:[],
				content: '',
				// swiper
				current: 0,
				mode: 'dot',
				// dotsStyles: {
				// 	bottom: 15,
				// 	backgroundColor: 'rgba(50,67,104,1)',
				// 	selectedBackgroundColor: 'rgba(204,204,204,1)'
				// },
				userList:[]
				
			}
		},
		onShow() {
			this.getUserList()
			this.getBanner();
			this.getNotice();
			this.getList();
		},
		methods: {
			changeSwiper(e) {
				this.current = e.detail.current;
			},
			// 获取用户信息
			getUserList() {
				this.$Ajax('/user/info', {}, res => {
						if (res.code == 0) {
							this.userList = res.account
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
			// 行情
			getList() {
				this.$Ajax('/pricelog/list', {}, res => {
						if (res.code == 0) {
							this.coinList = res.list
						}
					}
				);
			},
		}
	}
</script>

<style>
	@import '@/common/css/style.css';
</style>
