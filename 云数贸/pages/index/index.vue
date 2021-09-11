<template>
	<view class="pages">
		<view class="index">
			<view class="main">
				<view class="mainTop">
					<image src="../../static/index/icon-index-logo.png" mode="widthFix" class="mainTop__image"></image>
				</view>
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
				<!-- 滚动公告 -->
				<view class="noticeBox">
					<view class="noticeBox-wrapper" @click="$tools.jump('../notice/notice')">
						<view class="noticeBox-title"><image src="../../static/index/icon-index-notice.png" mode="widthFix"></image></view>
						<swiper class="noticeBox-list noticeBox-swiper" vertical="true" autoplay="true" circular="true" interval="3000">
							<swiper-item class="noticeBox-swiper__item" v-for="(item, index) in noticeList" :key="index">
								<view class="noticeBox-swiper__item-label" v-if="item.status == 1">{{ item.title }}</view>
							</swiper-item>
						</swiper>
						<view class="noticeBox-more">更多</view>
					</view>
				</view>
			</view>
			
			<view class="indexBox">
				<view class="indexBox-header">
					<view class="indexBox-header-image">
						<image src="../../static/index/icon-index-data.png" mode="widthFix"></image>
					</view>
					<view class="indexBox-title">个人数据统计</view>
				</view>
				<view class="tipsBox">
					<view class="tipsBox-title">
						<view class="tipsBox-title__label">我的资产</view>
					</view>
				</view>
				<view class="indexBox-wrapper">
					<view class="indexBox-top">
						<view class="indexBox-top-txt">我的总资产(CNY)</view>
						<view class="indexBox-top-count">{{ assetList.totalAll }}</view>
					</view>
					<view class="indexBox-bottom">
						<view class="indexBox-bottom-item">
							<view class="indexBox-bottom-item__title">股票总额</view>
							<view class="indexBox-bottom-item__num">{{ assetList.shares }}</view>
						</view>
						<view class="indexBox-bottom-line"></view>
						<view class="indexBox-bottom-item">
							<view class="indexBox-bottom-item__title">佣金总额</view>
							<view class="indexBox-bottom-item__num">{{ assetList.commission }}</view>
						</view>
					</view>
				</view>
				<view class="indexBox-btnBox">
					<view class="indexBox-btnBox_btn" @click="$tools.jump('../transfer/transfer')">转 账</view>
					<view class="indexBox-btnBox_btn" @click="$tools.jump('../withdrawal/withdrawal')">提 现</view>
				</view>
			</view>
			
			<view class="indexBox">
				<view class="indexBox-header">
					<view class="indexBox-header-image">
						<image src="../../static/index/icon-index-news.png" mode="widthFix"></image>
					</view>
					<view class="indexBox-title">股种信息表</view>
				</view>
				<view class="indexBox-tableBox">
					<view class="tableBox-list">
						<view class="tableBox-list__item">
							<view class="tableBox-list__item-title">股种</view>
							<view class="tableBox-list__item-title">最新价</view>
							<view class="tableBox-list__item-title">发行价</view>
							<view class="tableBox-list__item-title">库存股数</view>
						</view>
						<view class="initNoData" v-if="SharesList.length == 0">暂无数据</view>
						<scroll-view :scroll-y="true" class="tableBox-height">
							<view class="tableBox-list__item" v-for="(item,index) in  SharesList" :key="index">
								<view class="tableBox-list__item-title tableBox-list__item-data">{{ item.name }}</view>
								<view class="tableBox-list__item-title tableBox-list__item-data active">￥{{ item.newest }}</view>
								<view class="tableBox-list__item-title tableBox-list__item-data">￥{{ item.price }}</view>
								<view class="tableBox-list__item-title tableBox-list__item-data" v-if="item.surplus >= 10000 && item.surplus <= 10000000">{{ ((item.surplus/10000).toFixed(0)) + '万' }}股</view>
								<view class="tableBox-list__item-title tableBox-list__item-data" v-else-if="item.surplus > 10000000">{{ ((item.surplus/100000000).toFixed(0))+ '亿' }}股</view>
								<view class="tableBox-list__item-title tableBox-list__item-data" v-else>{{ item.surplus }}股</view>
							</view>
						</scroll-view>	
					</view>
				</view>
			</view>
			
		</view>
		
		<!-- 公告框 -->
		<uni-popup ref="noticePopup" type="center" :animation="true" @change="changePopup($event,'noticePopup')">
			<view class="oppupBox-popup" >
				<view class="oppupBox">
					<view class="oppupBox-header">
						<image src="../../static/index/icon-index-noticeBg.png" mode=""></image>
						<view class="oppupBox-header__title">公 告</view>
					</view>
					<scroll-view :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto" class="oppupBox-height">
						<view class="oppupBox-title" v-html="notice"></view>
					</scroll-view>	
				</view>
				<view class="oppupBox-btn">
					<image src="../../static/index/icon-index-close.png" mode="" @click="hidePopup('noticePopup')"></image>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data(){
			return{
				userList: [],
				num:'',
				assetList:{},
				noticeList:'',
				scrollInto: "",
				// 容器
				slideList: [{path:'../../static/index/icon-index-banner.png'},{path:'../../static/index/icon-index-banner.png'},{path:'../../static/index/icon-index-banner.png'}],
				notice: [{title:'这里是系统公告展示，具体内容见正式上线……'}],
				noticeStatus: '',
				// swiper
				swiperCurrent: 0,
				dotsMode: 'default',
				dotsStyles: {
					bottom: 10,
					backgroundColor: '#FFFFFF',
					selectedBackgroundColor: '#FF2E2E'
				},
				SharesList:[
					{name:'YSM原始股',price:'￥500',newest:'￥1',surplus:'100万股'},{name:'夏威夷',price:'￥20',newest:'￥1',surplus:'90万'},{name:'中国石油',price:'￥24',newest:'￥1',surplus:'100万股'},{name:'YSM工业',price:'￥24',newest:'￥1',surplus:'30万股'},
				],
				surplus:'',
			}
		},
		onShow() {
			this.init();
			uni.showTabBar();
			let statusPopup = uni.getStorageSync('statusPopup');
			console.log("statusPopup:",statusPopup);
			if (statusPopup != 1) {
				uni.setStorageSync('statusPopup', 1);
				this.$nextTick(() => {
					this.openPopup('noticePopup');
				})
			}
			console.log("surplus：",this.surplus);
		},	
		methods: {
			init(){
				this.getSharesList();
				this.getStatistics();
				this.getNoticeTitle();
				this.getSlideList(); //轮播图
				this.getNoticeList(); //公告轮播图
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
				this.$Ajax('/search/getContent', {}, res => {
					if (res.code == 0) {
						this.noticeList = res.obj.list;
					}
				});
			},
			// 获取公告
			getNoticeTitle() {
				this.$Ajax('/search/getContentInfo', {
					id:1
				}, res => {
					if (res.code == 0) {
						this.notice = res.obj.content.content;
						this.noticeStatus = res.obj.content.status;
					}
				});
			},
			// 获取用户所有钱包信息
			getStatistics() {
				this.$Ajax('/front/mine/getStatistics', {}, res => {
					if (res.code == 0) {
						this.assetList = res.obj;
					}
				});
			},
			// 获取股票列表
			getSharesList() {
				this.$Ajax('/front/shares/getSharesList', {}, res => {
					if (res.code == 0) {
						this.SharesList = res.obj;
					}
				});
			},
			
			changeSwiper(e) {
				this.swiperCurrent = e.detail.current;
			},
			/* 弹出框公用 */
			openPopup(e) {
				this.$refs[e].open();
				uni.hideTabBar();
			},
			hidePopup(e) {
				this.$refs[e].close();
				uni.showTabBar();
			},
			changePopup(e) {
				console.log('popup ' + e.type + ' 状态', e.show);
				if (e.show) {
					uni.hideTabBar();
				} else {
					uni.showTabBar();
				}
			},
			// 打开窗口
			showDrawer(e) {
				let that = this;
				that.$refs.showLeft.open()
			},
			// 关闭窗口
			closeDrawer(e) {
				let that = this;
				that.$refs.showLeft.close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				let that = this;
				that[type] = e
				if (e) {
					uni.hideTabBar();
				} else {
					uni.showTabBar();
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/index/index';
</style>
