<template>
	<view class="pages">
		<view class="bg_header">
			<view class="initHeader initHeader--bgStyle initHeader--white">
				<view class="initHeader-wrapper">
					<view class="initHeader-title">米需新零售商城</view>
					<view class="initHeader-right initHeader-right--text" @click="$tools.jump('../order/order')">我的订单</view>
				</view>
			</view>
		
			<view class="main">
				<!-- 轮播图 -->
				<uni-swiper-dot :info="slideList" :current="swiperCurrent" :mode="dotsMode" :dotsStyles="dotsStyles">
					<view class="swiperBox" @click="$tools.switchTab('../transaction/transaction')">
						<view class="swiperBox-wrapper">
							<swiper
								:indicator-dots="false"
								:autoplay="true"
								:interval="2500"
								:duration="1000"
								:circular="true"
								class="swiperBox-swiper"
								:disable-touch="slideList.length <= 1"
							>
								<swiper-item class="swiperBox-swiper__item" v-for="(item, index) in slideList" :key="index">
									<image :src="item.path" mode="widthFix"></image>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</uni-swiper-dot>
		
				<view class="recommendBox">
					<view class="recommendBox-wrapper">
						<view class="recommendBox-wrapper-item">
							<image src="../../static/shop/icon-shop-tips.png" mode="widthFix" class="recommendBox-wrapper-item__image"></image>
							<view class="">
								<view class="recommendBox-title">商品推荐</view>
								<view class="recommendBox-txt">RECOMMENDATION</view>
							</view>
						</view>
						
						<view class="searchBox">
							<view class="searchBox-wrapper">
								<image src="../../static/shop/icon-search.png" mode="widthFix" class="searchBox-wrapper-image"></image>
								<input type="text" placeholder="请输入您要搜索的内容" v-model="goodsName" placeholder-class="searchBox-wrapper-input"/>
								<view class="searchBox-wrapper-btn" @click="searchBtn()">搜索</view>
							</view>
						</view>
						
						<view class="titleBox">
							<view class="titleBox-wrapper"><view class="titleBox-title--no" :class="{'titleBox-title--active': tabsActive == 0 }" @click="changeTabsActive(0)">CNY购买</view></view>
							<view class="titleBox-wrapper"><view class="titleBox-title--no" :class="{'titleBox-title--active': tabsActive == 1 }" @click="changeTabsActive(1)">USDT购买</view></view>
						</view>
						
						<view class="tabsBox">
							<view class="tabsBox-wrapper">
								<view class="tabsBox-list" v-for="(item,index) in tabsList" :key="index">
									<view class="tabsBox-list__title" :class="{'tabsBox-list__title--active': index == choice}" @click="changeChoice(index,item.id)">{{item.name}}</view>
								</view>
							</view>
						</view>
				
						<view class="recommendBox-body">
							<view class="goodsBox">
								<view class="initNoData" v-if="recordList.length == 0">暂无数据</view>
								<view class="goodsBox-wrapper" v-else>
									<view class="goodsBox-item" v-for="(item, index) in recordList" :key="index" @click="$tools.jump('../shop/shop_detail', item.id,tabsActive)">
										<view class="goodsBox-item__plane">
											<view class="goodsBox-item__image" :style="'background-image:url(' + item.titelPic + ' )'"></view>
											<view class="goodsBox-item__content">
												<view class="goodsBox-item__title">{{ item.name }}</view>
												<view class="goodsBox-item__prititle">价格：</view>
												<view class="goodsBox-item__price" v-if="tabsActive == 0">
													<text class="goodsBox-item__price--highlight" >{{ item.cost }}</text>CNY
												</view>
												<view class="goodsBox-item__price" v-if="tabsActive == 1">
													<text class="goodsBox-item__price--highlight" >{{ item.using }}</text>USDT
												</view>
												<view class="goodsBox-item__note" v-if="tabsActive == 0"><text>赠送</text>{{ (item.cost/TPDPrice/usdtPrice/gPrice) | number(2) }}CLQ积分</view>
												<view class="goodsBox-item__note" v-if="tabsActive == 1"><text>赠送</text>{{ item.using/TPDPrice/gPrice | number(2) }}CLQ积分</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		<!-- <h1 v-for="(item,index) in 10" :key="index">{{item}}</h1> -->
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
			slideList: [{path:'../../static/shop/icon-shop-banner.png'}],
			// swiper
			swiperCurrent: 0,
			dotsMode: 'default',
			dotsStyles: {
				bottom: 15,
				backgroundColor: '#040100',
				selectedBackgroundColor: '#040100'
			},
			tabsActive:0,
			// 页数
			pageSize: 20,
			pageNum: 1,
			pages: 0,
			recordList: [],
			cnyToTPD:'',
			usdtToTPD:'',
			goodsName:'',
			TPDPrice:'',
			usdtPrice:'',
			gPrice:'',
			tabsList:[
				{name:'爆款推荐'},{name:'家具电器'},{name:'数码产品'},{name:'优质女装'},{name:'优选水果'},{name:'家具电器'},{name:'爆款推荐'},{name:'优质女装'},{name:'优选水果'},{name:''},
			],
			index:0,
			choice:0,
			typeId:'',
		};
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底啦');
		} else {
			this.pageNum++;
			this.getList();
		}
	},
	methods: {
		init() {
			this.recordList = [];
			this.pageNum = 1;
			this.getProductTypeList();
			this.getTPDPrice();
			this.getUSDTCNY();
			this.getComputeRadio();
			// this.getcnyToTPD();
			// this.getusdtToTPD();
		},
		changeTabsActive(index) {
			if(this.tabsActive != index){
				this.tabsActive = index;
				this.recordList = [];
				this.goodsName = '';
				this.index = 0;
				this.choice = 0;
				this.typeId = this.tabsList[0].id;
				console.log("this.typeId",this.typeId)
				this.getList();
			}
		},
		changeChoice(index,typeId) {
			if(this.choice != index){
				this.choice = index;
				this.recordList = [];
				this.goodsName = '';
				this.pageNum = 1;
				this.typeId = typeId;
				this.getList();
			}
		},
		// 获取商品分类列表信息
		getProductTypeList() {
			this.$Ajax('/search/getProductTypeList', {}, res => {
				if (res.code == 0) {
					this.tabsList = res.obj;
					if(this.typeId == ''){
						this.typeId = this.tabsList[0].id;
					}
					this.getList();
				}
			});
		},
		getList() {
			if(this.tabsActive == 0){
				// CNY
				this.$Ajax('/search/getPointProductList', {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					typeId:this.typeId,
				}, res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.recordList = this.recordList.concat(res.obj.list);
						}
					}
				);
			}else{
				// USDT
				this.$Ajax('/search/getVoucherProductList', {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					typeId:this.typeId,
				}, res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.recordList = this.recordList.concat(res.obj.list);
						}
					}
				);
			}
		},
		// CNY商品搜索
		searchBtn() {
			if (this.goodsName == '' ) {
				return this.$tools.toast('请输入您要搜索的内容');
			}
			if(this.tabsActive == 0){
				this.recordList = [];
				this.$Ajax('/search/findPointProductList', {
					goodsName : this.goodsName,
					pageSize: this.pageSize,
					pageNum: this.pageNum,
				}, res => {
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.recordList = this.recordList.concat(res.obj.list);
					}
				});
			}else{
				this.recordList = [];
				this.$Ajax('/search/findVoucherProductList', {
					goodsName : this.goodsName,
					pageSize: this.pageSize,
					pageNum: this.pageNum,
				}, res => {
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.recordList = this.recordList.concat(res.obj.list);
					}
				});
			}
		},
		// 获取TPD兑换USDT价格
		getTPDPrice() {
			this.$Ajax('/front/mine/getTPDPrice', {}, res => {
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
		// 获取2价格
		getComputeRadio() {
			this.$Ajax('/front/mine/getComputeRadio', {}, res => {
				if (res.code == 0) {
					this.gPrice = res.obj;
				}
			});
		},
		getcnyToTPD() {
			this.$Ajax('/front/order/cnyToTPD', {
				amount : 0
			}, res => {
				if (res.code == 0) {
					this.cnyToTPD = res.obj;
					console.log("结果",this.cnyToTPD);
				}
			});
		},
		getusdtToTPD() {
			this.$Ajax('/front/order/usdtToTPD', {
				amount : 0
			}, res => {
				if (res.code == 0) {
					this.usdtToTPD = res.obj;
					console.log("结果",this.usdtToTPD);
				}
			});
		},
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/shop/shop';
</style>
