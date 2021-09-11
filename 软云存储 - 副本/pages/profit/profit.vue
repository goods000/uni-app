<template>
	<view class="pages content">
		<view class="profit">
			<view class="">
				<view class="profitBox">
					<view class="profitBox-header">尊享全新FIL收益</view>
					<view class="profitBox-tips">总收益(FIL)</view>
					<view class="profitBox-totls">{{ ProfitRecord.unlockProfit + ProfitRecord.lockProfit + ProfitRecord.teamProfit }}</view>
				</view>
				
				<view class="profitBox-assets">
					<view class="profitBox-assets__item">
						<view class="profitBox-charts">
							<image src="../../static/profit/icon-img-bg.png" mode="widthFix"></image>
						</view>
						<view class="profitBox-assets__item--data">
							<view class="profitBox-assets__item--data-title">解锁收益(FIL)</view>
							<view class="profitBox-assets__item--data-num">{{ ProfitRecord.unlockProfit == null ? '0' : ProfitRecord.unlockProfit }}</view>
						</view>
					</view>
					<view class="profitBox-assets__item">
						<view class="profitBox-charts">
							<image src="../../static/profit/icon-img-bg.png" mode="widthFix"></image>
						</view>
						<view class="profitBox-assets__item--data">
							<view class="profitBox-assets__item--data-title">锁仓收益(FIL)</view>
							<view class="profitBox-assets__item--data-num">{{ ProfitRecord.lockProfit == null ? '0' : ProfitRecord.lockProfit }}</view>
						</view>
					</view>
					<view class="profitBox-assets__item">
						<view class="profitBox-charts">
							<image src="../../static/profit/icon-img-bg.png" mode="widthFix"></image>
						</view>
						<view class="profitBox-assets__item--data">
							<view class="profitBox-assets__item--data-title">用户质押(FIL)</view>
							<view class="profitBox-assets__item--data-num">{{ ProfitRecord.pledge == null ? '0' : ProfitRecord.pledge }}</view>
						</view>
					</view>
					<view class="profitBox-assets__item">
						<view class="profitBox-charts">
							<image src="../../static/profit/icon-img-bg.png" mode="widthFix"></image>
						</view>
						<view class="profitBox-assets__item--data">
							<view class="profitBox-assets__item--data-title">代理收益(FIL)</view>
							<view class="profitBox-assets__item--data-num">{{ ProfitRecord.teamProfit == null ? '0' : ProfitRecord.teamProfit }}</view>
						</view>
					</view>
				</view>
				
				<view class="tipsBox">
					<view class="tipsBox-wrapper">
						<view class="tipsBox-title">
							<view class="tipsBox-title__label">收益明细</view>
						</view>
					</view>
				</view>
				
				<view class="tabs">
					<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
						<view v-for="(tab,index) in tabBars" :key="index" class="uni-tab-item" :id="tab.key" :data-current="index" @click="ontabtap(index,tab.key)">
							<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
						</view>
					</scroll-view>
				   <!-- <swiper :current="tabIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange" v-else>
				        <swiper-item class="swiper-item"> -->
							<view class="profit-list">
								<view class="profit-list-box">
									<view class="initNoData" v-if="newsList.length == 0">暂无数据</view>
									<scroll-view scroll-y="true" class="profit-list-height" @scrolltolower="newsListLower" v-else>
									<view class="profit-list-box-item" v-for="(tab,index1) in newsList" :key="index1">
										<view class="profit-list-box-item-time">{{tab.createTime}}</view>
										<view class="profit-list-box-item-price">{{ tab.money }}</view>
									</view>
									</scroll-view>
								</view>
							</view>
				        <!-- </swiper-item>
				    </swiper> -->
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            newsList: [],
	            cacheTab: [],
	            tabIndex: 0,
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				recordList: [],
	            tabBars: [],
	            scrollInto: "",
	            showTips: false,
	            navigateFlag: false,
	            pulling: false,
				index:0,
				type:20,
				ProfitRecord:'',
			}
	    },
		onShow(){
			this.init();
		},
	    methods: {
			init(){
				this.getProfitInfo();
				this.getTabBars();
				this.newsList = [];
				this.index = 0;
				this.type = 20;
				this.getList(this.index,this.type);
			},
			// 获取收益信息(FIL)
			getProfitInfo() {
				this.$Ajax('/front/financial/profit/info', {}, res => {
						if (res.code == 0) {
							this.ProfitRecord = res.obj;
						}
					}
				);
			},
			// 获取账单记录类型
			getTabBars(){
				this.$Ajax('/front/financial/getProfitLogType', {}, res => {
						if (res.code == 0) {
							this.tabBars = res.obj;
							// res.obj.forEach((item,index) => {
							// 	console.log(item.key)
							// 	this.type = item.key
							// })
						}
					}
				);
			},
			// 获取账单记录
	        getList(index,type) {
				this.tabIndex = index
				this.$Ajax('/front/financial/getLog', {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					type: type,
				}, res => {
						if (res.code == 0) {
							// this.newsList = res.obj.list;
							this.pages = res.obj.pages;
							this.newsList = this.newsList.concat(res.obj.list);
							console.log(this.newsList)
						}
					}
				);
	        },
	        ontabtap(index,type) {
				this.newsList = [];
				this.pageNum = 1;
				this.index = index;
				this.type = type;
	            this.getList(this.index,this.type);
	        },
			newsListLower(e) {
				console.log("ddd")
				if (this.pageNum >= this.pages) {
					return this.$tools.toast('到底了');
				} else {
					this.pageNum++;
					console.log("index：",this.index)
					console.log("type：",this.type)
					this.getList(this.index,this.type);
				}
			},
	    }
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/profit/profit';
	/* #ifndef APP-PLUS */
	page {
	    width: 100%;
	    min-height: 100%;
	    display: flex;
	}
	
	/* #endif */
	
	.tabs {
	    flex: 1;
	    flex-direction: column;
	    overflow: hidden;
	    /* #ifdef MP-ALIPAY || MP-BAIDU */
	    height: 100vh;
	    /* #endif */
	}
	
	.scroll-h {
	    width: 750rpx;
	    // height: 80rpx;
		display: flex;
	    flex-direction: row;
		white-space: nowrap;
	    flex-wrap: nowrap;
	    /* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
	}
	
	.uni-tab-item {
	    display: inline-block;
	    flex-wrap: nowrap;
	    // padding-left: 34rpx;
	    // padding-right: 34rpx;
		width: 25%;
		text-align: center;
	}
	
	.uni-tab-item-title {
	    color: $globalColor-fontStyle;
	    font-size: 30rpx;
	    height: 80rpx;
	    line-height: 80rpx;
	    flex-wrap: nowrap;
	    /* #ifndef APP-PLUS */
	    white-space: nowrap;
	    /* #endif */
		position: relative;
	}
	
	.uni-tab-item-title-active {
	    color: $globalColor-fontStyle;
		padding-bottom: 10upx;
	}
	.uni-tab-item-title-active::before{
		content: '';
		display: inline-block;
		height: 4upx;
		width: 60upx;
		border-radius: 8upx;
		position: absolute;
		left: 0;
		right:0;
		bottom: 0;
		// transform: translateY(-50%);
		margin: auto;
		background-color: $globalColor-style;
	}
	
	.swiper-box {
	    flex: 1;
		min-height: 800upx;
	}
	
	.swiper-item {
	    flex: 1;
	    flex-direction: row;
		overflow: auto;
	}
	
	.scroll-v {
	    flex: 1;
	    /* #ifndef MP-ALIPAY */
	    flex-direction: column;
	    /* #endif */
	    width: 750rpx;
	}

	
</style>
