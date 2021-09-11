<template>
	<view class="pages">
		<view class="index">
			<view class="indexBox">
				<view class="indexBox-box">
					<!-- 轮播图 -->
					<uni-swiper-dot :info="info" :current="current" :mode="mode" :dotsStyles="dotsStyles">
						<view class="swiperBox">
							<view class="swiperBox-wrapper">
								<swiper :indicator-dots="false" :autoplay="true" :interval="2500" :duration="1000" :circular="true" class="swiperBox-swiper" @change="changeSwiper">
									<swiper-item class="swiperBox-swiper__item" v-for="(item, index) in info" :key="index">
										<image :src="item.path" mode="widthFix"></image>
									</swiper-item>
								</swiper>
							</view>
						</view>
					</uni-swiper-dot>
					
					<view class="header_bar header_bar--absolute">
						<view class="header">
							<view class="header-left" @click="showDrawer('showLeft')">
								<image src="../../static/user/icon-user-img.png" mode="widthFix"></image>
							</view>
							<!-- <view class="header-title-white">Bocdex.vip</view> -->
						</view> 
					</view>
					
				</view>	
				
				<view class="wrapperBox">
				<!-- 滚动公告 -->
				<view class="noticeBox">
					<view class="noticeBox-wrapper" @click="$tools.jump('../announcement/announcement')">
						<view class="noticeBox-icon">
							<view class="noticeBox-icon-title">公告</view>
							<image src="../../static/index/icon-index-notice.png" mode="widthFix"></image>
							</view>
						<swiper class="noticeBox-list noticeBox-swiper" vertical="true" autoplay="true" circular="true" interval="3000">
							<swiper-item class="noticeBox-swiper__item" v-for="(item, index) in noticeList" :key="index">
								<view class="noticeBox-swiper__item-label">{{ item.title }}</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<view class="indexBox-wrapper">
					<view class="indexBox-dataList">
						<view class="indexBox-dataList-item" v-for="(item,index) in coinList" :key="index" v-if="item.tradeCurrencyName == 'OC' || item.tradeCurrencyName == 'BTC' || item.tradeCurrencyName =='ETH'">
							<view class="indexBox-dataList-item-header">
								<view class="indexBox-dataList-item-header-coin">{{item.tradeCurrencyName}}/{{ item.currencyName}}</view>
								<view class="indexBox-dataList-item-header-status" :class="item.rise < 0 ? 'status_red' : 'status_green'">{{item.rise}}%</view>
							</view>
							<view class="indexBox-dataList-item-main" :class="item.rise < 0 ? 'status_red' : 'status_green'">{{item.currentPrice}}</view>
							<view class="indexBox-dataList-item-yue">≈￥{{ item.usdtPirce * item.currentPrice | number(4) }}</view>
						</view>
					</view>
					<view class="mt"></view>
					<view class="indexBox-list">
						<view class="indexBox-list-item" @click="$tools.jump('../node/node')">
							<image src="../../static/index/icon-index-01.png" mode="widthFix"></image>
							<view class="indexBox-list-item-title">生态节点</view>
						</view>
						<view class="indexBox-list-item" @click="$tools.jump('../chianApply/chianApply')">
							<image src="../../static/index/icon-index-02.png" mode="widthFix"></image>
							<view class="indexBox-list-item-title">链改申请</view>
						</view>
						<view class="indexBox-list-item" @click="$tools.jump('../invite/invite')">
							<image src="../../static/index/icon-index-03.png" mode="widthFix"></image>
							<view class="indexBox-list-item-title">邀请好友</view>
						</view>
						<view class="indexBox-list-item" @click="$tools.jump('../business/business')">
							<image src="../../static/index/icon-index-04.png" mode="widthFix"></image>
							<view class="indexBox-list-item-title">OTC</view>
						</view>
						<view class="indexBox-list-item" @click="$tools.jump('../ITO/ITO')">
							<image src="../../static/index/icon-index-05.png" mode="widthFix"></image>
							<view class="indexBox-list-item-title">ITO</view>
						</view>
						<view class="indexBox-list-item" @click="$tools.noOpen()">
							<image src="../../static/index/icon-index-06.png" mode="widthFix"></image>
							<view class="indexBox-list-item-title">通证抢先购</view>
						</view>
						<view class="indexBox-list-item" @click="$tools.noOpen()">
							<image src="../../static/index/icon-index-07.png" mode="widthFix"></image>
							<view class="indexBox-list-item-title">链改学院</view>
						</view>
						<view class="indexBox-list-item" @click="$tools.noOpen()">
							<image src="../../static/index/icon-index-08.png" mode="widthFix"></image>
							<view class="indexBox-list-item-title">企业论坛</view>
						</view>
					</view>
				</view>
				</view>
				<view class="indexBox-price">
					<view class="indexBox-price-tips">
						<view class="indexBox-price-title">最新行情</view>
					</view>
					<view class="indexBox-price-list">
						<view class="indexBox-price-list-header">
							<view class="indexBox-price-list-header__item">名称</view>
							<view class="indexBox-price-list-header__item">最新价</view>
							<view class="indexBox-price-list-header__item">跌涨幅</view>
						</view>
						
						<view class="indexBox-price-list-box" v-for="(item, index) in coinList" :key="index" @click="goKline(item.tradeId, item.tradeCurrencyName, item.currencyName)">
							<view class="indexBox-price-list-box__item">
								<view class="coin_name">
									<view class="introduce">{{ item.tradeCurrencyName}}</view>
									<view class="coin_b">/{{ item.currencyName}}</view>
								</view>
							</view>
							<view class="indexBox-price-list-box__item">
								<view class="title">{{ item.currentPrice | number(4) }}</view>
							</view>
							<view class="indexBox-price-list-box__item">
								<view class="coin_state coin_drop" v-if="item.rise < 0 ">{{ item.rise }}%</view>
								<view class="coin_state coin_rise" v-else>{{ item.rise }}%</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!--  -->
			<uni-drawer ref="showLeft" mode="left" :width="drawerWidth" @change="change($event,'showLeft')">
				<view class="indexBox-drawer">
					<view class="indexBox-drawer-header">
						<view class="indexBox-drawer-header-image">
							<image src="../../static/operate/logo.png" mode="widthFix"></image>
						</view>
						<view class="indexBox-drawer-header-news">
							<view class="indexBox-drawer-header-news__item">
								<view class="indexBox-drawer-header-news__item__name">{{userList.name}}</view>
								<view class="indexBox-drawer-header-news__item__level" v-if="userList.partnerIf == 1">
									<image src="../../static/user/icon-user-level.png" mode="widthFix"></image>
									股东
								</view>
							</view>
							<view class="indexBox-drawer-header-uid">
								<view class="indexBox-drawer-header-uid__txt">
									UID:{{userList.inviteCode}}
								</view>
								<image src="../../static/user/icon-user-coopy.png" mode="widthFix" @click="$tools.copy(userList.inviteCode)"></image>
							</view>
							<view class="indexBox-drawer-header-info">
								<text :class="userList.teamLevelName == '普通社区' ? '': 'txt--actice'">距离下个等级(V{{userList.nextLevel}})还差{{userList.nextLevelNeedOcNum}}USDT业绩</text>
							</view>
						</view>
					</view>
					<view class="indexBox-drawer-levelBox" v-if="userList.teamLevelName == '普通社区'">
						<view class="indexBox-drawer-levelBox-box">
							<view class="indexBox-drawer-levelBox__left">
								<view class="indexBox-drawer-levelBox__left-img">{{(userList.teamLevelName || '').slice(0,2)}}</view>
								<view class="indexBox-drawer-levelBox__left-title">我的团队</view>
							</view>
							<view class="indexBox-drawer-levelBox__right" @click="$tools.jump('../team/team')">
								<view class="indexBox-drawer-levelBox__right-title">{{userList.teamLevelName}}</view>
							</view>
						</view>
					</view>
					<view class="indexBox-drawer-level" v-else>
						<view class="indexBox-drawer-level-box">
							<view class="indexBox-drawer-level__left">
								<!-- <image src="../../static/user/icon-user-grade.png" mode="widthFix"></image> -->
								<view class="indexBox-drawer-level__left-img">{{(userList.teamLevelName || '').slice(0,2)}}</view>
								<view class="indexBox-drawer-level__left-title">我的团队</view>
							</view>
							<view class="indexBox-drawer-level__right" @click="$tools.jump('../team/team')">
								<view class="indexBox-drawer-level__right-title">{{userList.teamLevelName}}</view>
							</view>
						</view>
					</view>
					<view class="indexBox-drawer-userList">
						<view class="indexBox-drawer-userList__item" @click="toContract('showLeft',0)">
						<!-- <view class="indexBox-drawer-userList__item" @click="$tools.jump('../entrustOrder/entrustOrder')"> -->
							<view class="indexBox-drawer-userList__item--left">
								<image src="../../static/user/icon-user-01.png" mode="widthFix"></image>
								<view class="indexBox-drawer-userList__item--left_txt">委托订单</view>
							</view>
							<view class="indexBox-drawer-userList__item--right">
								<image src="../../static/public/icon-next.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="indexBox-drawer-userList__item" @click="$tools.jump('../invite/invite')">
							<view class="indexBox-drawer-userList__item--left">
								<image src="../../static/user/icon-user-02.png" mode="widthFix"></image>
								<view class="indexBox-drawer-userList__item--left_txt">邀请好友</view>
							</view>
							<view class="indexBox-drawer-userList__item--right">
								<image src="../../static/public/icon-next.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="indexBox-drawer-userList__item" @click="$tools.jump('../nodeOrder/nodeOrder')">
							<view class="indexBox-drawer-userList__item--left">
								<image src="../../static/user/icon-user-03.png" mode="widthFix"></image>
								<view class="indexBox-drawer-userList__item--left_txt">节点订单</view>
							</view>
							<view class="indexBox-drawer-userList__item--right">
								<view class="indexBox-drawer-userList__item--right_txt">
									<image src="../../static/user/icon-user-node.png" mode="widthFix"></image>
									<view class="indexBox-drawer-userList__item--right_txt-chioce">生态节点{{nodeLevel}}</view>
								</view>
								<image src="../../static/public/icon-next.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="indexBox-drawer-userList__item" @click="$tools.jump('../payment/payment')">
							<view class="indexBox-drawer-userList__item--left">
								<image src="../../static/user/icon-user-09.png" mode="widthFix"></image>
								<view class="indexBox-drawer-userList__item--left_txt">收款方式管理</view>
							</view>
							<view class="indexBox-drawer-userList__item--right">
								<image src="../../static/public/icon-next.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="mt"></view>
						<view class="indexBox-drawer-userList__item" @click="$tools.jump('../explorer/explorer')">
							<view class="indexBox-drawer-userList__item--left">
								<image src="../../static/user/icon-user-04.png" mode="widthFix"></image>
								<view class="indexBox-drawer-userList__item--left_txt">区块浏览器</view>
							</view>
							<view class="indexBox-drawer-userList__item--right">
								<image src="../../static/public/icon-next.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="indexBox-drawer-userList__item" @click="openSource()">
						<!-- <view class="indexBox-drawer-userList__item" @click="$tools.jump('../openSource/openSource')"> -->
							<view class="indexBox-drawer-userList__item--left">
								<image src="../../static/user/icon-user-05.png" mode="widthFix"></image>
								<view class="indexBox-drawer-userList__item--left_txt">开源代码</view>
							</view>
							<view class="indexBox-drawer-userList__item--right">
								<image src="../../static/public/icon-next.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="indexBox-drawer-userList__item">
							<view class="indexBox-drawer-userList__item--left">
								<image src="../../static/user/icon-user-06.png" mode="widthFix"></image>
								<view class="indexBox-drawer-userList__item--left_txt">版本信息</view>
							</view>
							<view class="indexBox-drawer-userList__item--right">
								<view class="indexBox-drawer-userList__item--right_txt">当前版本：{{currentVersion}}</view>
								<image src="../../static/user/icon-user-next.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="indexBox-drawer-userList__item" @click="$tools.jump('../destruction/destruction')">
							<view class="indexBox-drawer-userList__item--left">
								<image src="../../static/user/icon-user-07.png" mode="widthFix"></image>
								<view class="indexBox-drawer-userList__item--left_txt">OC销毁池</view>
							</view>
							<view class="indexBox-drawer-userList__item--right">
								<image src="../../static/public/icon-next.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="indexBox-drawer-userList__item" @click="$tools.jump('../workOrder/workOrder')">
							<view class="indexBox-drawer-userList__item--left">
								<image src="../../static/user/icon-user-11.png" mode="widthFix"></image>
								<view class="indexBox-drawer-userList__item--left_txt">工单</view>
							</view>
							<view class="indexBox-drawer-userList__item--right">
								<image src="../../static/public/icon-next.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="indexBox-drawer-userList__item" @click="$tools.jump('../setting/setting')">
							<view class="indexBox-drawer-userList__item--left">
								<image src="../../static/user/icon-user-08.png" mode="widthFix"></image>
								<view class="indexBox-drawer-userList__item--left_txt">安全中心</view>
							</view>
							<view class="indexBox-drawer-userList__item--right">
								<image src="../../static/public/icon-next.png" mode="widthFix"></image>
							</view>
						</view>
						
					</view>
				</view>
			</uni-drawer>
			
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
	
	export default {
		components: { uniSwiperDot, uniNoticeBar,uniDrawer },
		data() {
			return {
				info: [{
					path:'../../static/index/icon-banner-01.png'
				},{
					path:'../../static/index/icon-banner-02.png'
				},{
					path:'../../static/index/icon-banner-03.png'
				}],
				noticeList: [],
				// swiper
				current: 0,
				mode: 'dot',
				dotsStyles: {
					top:100,
					backgroundColor: '#CCCCCC',
					selectedBackgroundColor: '#324368'
				},
				coinList:[],
				userList:[],
				userBase:[],
				nodeLevel:'',
				name:'',
				currentVersion:'',
				Vtype:'',
				drawerWidth: uni.upx2px(600),
				e:'',
				dataList:[
					{currencyName:'EOS/USDT',rise:'-0.04',price:'342127.10',currentPrice:'617.235'},
					{currencyName:'ETH/USDT',rise:'+2.64',price:'342127.10',currentPrice:'2017.235'},
					{currencyName:'BTC/USDT',rise:'+2.64',price:'342127.10',currentPrice:'17.235'},
				],
				url:'https://github.com/OC-OFFICIAL/OC'
			}
		},
		onShow() {
			this.init();
			uni.getSystemInfo({
				success: function(res) {
					if (res.platform == 'android') {
						this.Vtype = 0;
						
					} else if (res.platform == 'ios') {
						this.Vtype = 1;
					}
				}
			});
		},
		methods: {
			// 跳转开源地址
			openSource(){
				plus.runtime.openURL(this.url, function(res) {  
					console.log(res);  
				});  
			},
			changeSwiper(e,type) {
				this.current = e.detail.current;
			},
			init(){
				this.getNotice();
				this.getBanner();
				this.getUserList();
				this.getList();
				this.getVersion();
			},
			// 获取用户信息
			getUserList() {
				this.$Ajax('/front/user/baseInfo', {}, res => {
						if (res.code == 0) {
							this.nodeLevel = res.obj.nodeLevel;
							this.userList = res.obj.user;
							this.userBase = res.obj.userBase;
						}
					}
				);
			},
			// 行情
			getList() {
				this.$Ajax('/search/allCommTradeBB', {}, res => {
				// this.$Ajax('/search/allCommTrade', {}, res => {
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
				this.$Ajax('/search/indexContent', {}, res => {
						if (res.code == 0) {
							this.noticeList = res.obj.contentList;
						}
					}
				);
			},
			// 版本号
			getVersion() {
				this.$Ajax('/search/appVersion', {
					type: this.Vtype
				}, res => {
						if (res.code == 0) {
							this.currentVersion = res.obj.appVersion;
						}
					}
				);
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
			},
			toContract(e,type) {
				uni.setStorageSync('contractActive', type);
				uni.showTabBar();
				this.closeDrawer(e);
				setTimeout(()=>{
					this.$tools.switchTab('../exchange/exchange');
				},300)
				// this.change(e,type)
				
			},
			// 打开窗口
			showDrawer(e) {
				this.getUserList();
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				console.log(e);
				// return;
				this.$refs[e].close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
				if (e) {
					uni.hideTabBar();
				} else {
					uni.showTabBar();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/index/index';
</style>
