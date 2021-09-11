<template>
	<view class="pages">
		<image src="../../static/profit/icon-profit-bg.png" mode="" class="profit-bg"></image>
		<view class="profit">
			<view class="">
				<view class="header_bar header_main">
					<view class="header">
						<view class="header-tabs">
							<view class="header-tabs__title" :class="tabActive == 0 ? 'header-tabs__title--active' : ''" @click="changTabActive(0)">挖矿</view>
							<view class="header-tabs__title" :class="tabActive == 1 ? 'header-tabs__title--active' : ''" @click="changTabActive(1)">创投</view>
							<!-- <view class="header-tabs__title" :class="tabActive == 1 ? 'header-tabs__title--active' : ''" @click="$tools.noOpen()">创投</view> -->
						</view>
						<view class="header-tab">
							<scroll-view id="" class="header-tab-scroll" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
								<!-- <view v-for="(tab,index) in tabBars" :key="index" class="header-tab__item" :class="tabIndex==index ? 'header-tab__item--active' : ''" :id="tab.id" :data-current="index" @click="$tools.noOpen()"> -->
								<view v-for="(tab,index) in tabBars" :key="index" class="header-tab__item" :class="tabIndex==index ? 'header-tab__item--active' : ''" :id="tab.key" :data-current="index" @click="ontabtap(index,tab.key,tab.name)">
									<text class="header-tab__item-title" :class="tabIndex==index ? 'header-tab__item-title--active' : ''">{{tab.name}}</text>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
				
				<view class="profitBox-assets" v-if="tabActive == 0">
					<view class="profitBox-assets__title">
						<text>总收益({{tabsName}})</text>
						<image :src="eyeType ? '../../static/profit/icon-profit-see.png' : '../../static/user/icon-user-nosee.png'" mode="widthFix" @click="toggleAssetsInfo()"></image>
					</view>
					<view class="profitBox-assets__data">{{ eyeType ? (userWallet.lockProfit*1+userWallet.minerProfit*1+userWallet.teamProfit*1) : '***' | number(4)}}</view>
					<view class="profitBox-wrapper">
						<view class="profitBox-assets__item" v-if="tabsName == 'FIL'">
							<view class="profitBox-assets__item-title"><view class="profitBox-assets__item-title__tips profitBox-assets__item-title__tips--1"></view>解锁收益</view>
							<view class="profitBox-assets__item-num">{{ eyeType ? userWallet.unlockProfit : '***' | number(4)}}</view>
						</view>
						<view class="profitBox-assets__item" v-if="tabsName == 'FIL'">
							<view class="profitBox-assets__item-title"><view class="profitBox-assets__item-title__tips profitBox-assets__item-title__tips--2"></view>挖矿收益</view>
							<view class="profitBox-assets__item-num">{{ eyeType ? userWallet.minerProfit : '***' | number(4)}}</view>
						</view>
						<view class="profitBox-assets__item" v-else>
							<view class="profitBox-assets__item-title"><view class="profitBox-assets__item-title__tips profitBox-assets__item-title__tips--1"></view>挖矿收益</view>
							<view class="profitBox-assets__item-num">{{ eyeType ? userWallet.minerProfit : '***' | number(4)}}</view>
						</view>
						<view class="profitBox-assets__item" v-if="tabsName == 'FIL'">
							<view class="profitBox-assets__item-title"><view class="profitBox-assets__item-title__tips profitBox-assets__item-title__tips--4"></view>未解锁收益</view>
							<view class="profitBox-assets__item-num">{{ eyeType ? userWallet.lockProfit : '***' | number(4)}}</view>
						</view>
						<view class="profitBox-assets__item">
							<view class="profitBox-assets__item-title"><view class="profitBox-assets__item-title__tips profitBox-assets__item-title__tips--3"></view>代理收益</view>
							<view class="profitBox-assets__item-num">{{ eyeType ? userWallet.teamProfit : '***' | number(4)}}</view>
						</view>
					</view>
					<view class="profitBox-user" v-if="tabActive == 0 && tabsName == 'FIL'">
						*用户质押：{{ eyeType ? userWallet.pledgeUsing : '***' }}FIL
					</view>
					<!-- <view class="profitBox-user" v-if="tabActive == 1 && tabsName == 'FIL'">
						*抽奖收益：{{ eyeType ? userWallet.pledge : '***' }}FIL
					</view> -->
				</view>
				
				<view class="profitBox-assets" v-if="tabActive == 1">
					<view class="profitBox-assets__VIP" v-if="userDto.vipu == 1">
						<image src="../../static/profit/VIP.png" mode="widthFix" class="profitBox-assets__VIP-image"></image>
					</view>
					<view class="profitBox-assets__title">
						<text>总收益({{tabsName}})</text>
						<image :src="eyeType ? '../../static/profit/icon-profit-see.png' : '../../static/user/icon-user-nosee.png'" mode="widthFix" @click="toggleAssetsInfo()"></image>
					</view>
					<view class="profitBox-assets__data">{{ eyeType ? (venturePro.dongtai*1+venturePro.jingtai*1+venturePro.jili*1) : '***' | number(4)}}</view>
					<view class="profitBox-wrapper">
						<view class="profitBox-assets__item">
							<view class="profitBox-assets__item-title"><view class="profitBox-assets__item-title__tips profitBox-assets__item-title__tips--2"></view>动态收益</view>
							<view class="profitBox-assets__item-num">{{ eyeType ? venturePro.dongtai : '***' | number(4)}}</view>
						</view>
						<view class="profitBox-assets__item">
							<view class="profitBox-assets__item-title"><view class="profitBox-assets__item-title__tips profitBox-assets__item-title__tips--1"></view>静态收益</view>
							<view class="profitBox-assets__item-num">{{ eyeType ? venturePro.jingtai : '***' | number(4)}}</view>
						</view>
						<view class="profitBox-assets__item">
							<view class="profitBox-assets__item-title"><view class="profitBox-assets__item-title__tips profitBox-assets__item-title__tips--3"></view>激励收益</view>
							<view class="profitBox-assets__item-num">{{ eyeType ? venturePro.jili : '***' | number(4)}}</view>
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
				
				<view class="tabs" v-if="tabActive == 0">
					<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
						<!-- <view v-for="(tab,i) in recordBars" :key="i" class="uni-tab-item" :id="tab.key" :data-current="i" @click="$tools.noOpen()"> -->
						<view v-for="(tab,i) in recordBars" :key="i" class="uni-tab-item" :id="tab.key" :data-current="i" @click="changeType(tab.key,i)">
							<text class="uni-tab-item-title" :class="recordIndex==i ? 'uni-tab-item-title-active' : ''">{{ tab.name }}</text>
						</view>
					</scroll-view>
					<view class="profit-list">
						<view class="profit-list-box">
							<view class="initNoData" v-if="newsList.length == 0">暂无数据</view>
							<scroll-view scroll-y="true" class="profit-list-height" @scrolltolower="newsListLower" v-else>
							<view class="profit-list-box-item" v-for="(tab,index1) in newsList" :key="index1">
								<view class="profit-list-box-item-time">{{tab.createTime}}</view>
								<view class="profit-list-box-item-price" v-if="tabsName == 'FIL' && type == 12">{{ tab.averageProfit*1*tab.surplusProfitDays }}</view>
								<view class="profit-list-box-item-price" v-else>{{ tab.money }}</view>
							</view>
							</scroll-view>
						</view>
					</view>
				</view>
				<view class="tabs" v-if="tabActive == 1">
					<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
						<!-- <view v-for="(tab,i) in recordBars" :key="i" class="uni-tab-item" :id="tab.key" :data-current="i" @click="$tools.noOpen()"> -->
						<view v-for="(tab,v_i) in recordBars_3" :key="v_i" class="uni-tab-item" :id="index" :data-current="v_i" @click="changeType_3(v_i)">
							<text class="uni-tab-item-title" :class="tabI==v_i ? 'uni-tab-item-title-active' : ''">{{ tab.name }}</text>
						</view>
					</scroll-view>
					<view class="profit-list" v-if="this.v_i == 0">
						<view class="profit-list-box">
							<view class="initNoData" v-if="dongtaiList.length == 0">暂无数据</view>
							<scroll-view scroll-y="true" class="profit-list-height" @scrolltolower="newsListLower" v-else>
							<view class="profit-list-box-item" v-for="(tab,index1) in dongtaiList" :key="index1">
								<view class="profit-list-box-item-time">{{tab.typeStr}}</view>
								<view class="profit-list-box-item-price">{{ tab.money }}</view>
							</view>
							</scroll-view>
						</view>
					</view>
					<view class="profit-list" v-if="this.v_i == 1">
						<view class="profit-list-box">
							<view class="initNoData" v-if="jingtaiList.length == 0">暂无数据</view>
							<scroll-view scroll-y="true" class="profit-list-height" @scrolltolower="newsListLower" v-else>
							<view class="profit-list-box-item" v-for="(tab,index1) in jingtaiList" :key="index1">
								<view class="profit-list-box-item-time">{{tab.typeStr}}</view>
								<view class="profit-list-box-item-price">{{ tab.money }}</view>
							</view>
							</scroll-view>
						</view>
					</view>
					<view class="profit-list" v-if="this.v_i == 2">
						<view class="profit-list-box">
							<view class="initNoData" v-if="jiliList.length == 0">暂无数据</view>
							<scroll-view scroll-y="true" class="profit-list-height" @scrolltolower="newsListLower" v-else>
							<view class="profit-list-box-item" v-for="(tab,index1) in jiliList" :key="index1">
								<view class="profit-list-box-item-time">{{tab.typeStr}}</view>
								<view class="profit-list-box-item-price">{{ tab.money }}</view>
							</view>
							</scroll-view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
				tabActive: 0,
	            tabIndex: 0,
	            tabI: 0,
	            v_i: 0,
				tabBars:[
					// {name:'FIL'},{name:'ETH'},{name:'BZZ'},{name:'PHA'},
				],
				eyeType: true,
	            newsList: [],
	            recordIndex: 0,
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				recordList: [],
				//   recordBars: [
				// 	{name:'挖矿收益',key:10},{name:'代理收益',key:11},{name:'解锁收益',key:13},
				// ],
				recordBars:[],
				recordBars_1: [
					{name:'挖矿收益',key:10},{name:'代理收益',key:11},{name:'未解锁收益',key:12},{name:'解锁收益',key:13},
				],
				recordBars_2: [
					{name:'挖矿收益',key:10},{name:'代理收益',key:11},
				],
				recordBars_3: [
					{name:'动态收益'},{name:'静态收益'},{name:'激励收益'},
				],
	            scrollInto: "",
	            showTips: false,
	            navigateFlag: false,
	            pulling: false,
				i:0,
				index:0,
				currencyId:'',
				type:'',
				tabsName:'',
				userWallet:{
					using:0,
					freeze:0,
					pledge:0,
					minerProfit:0,
					lockProfit:0,
					teamProfit:0,
				},
				venturePro:{},
				dongtaiList:[],
				jiliList:[],
				jingtaiList:[],
				userDto:{},
			}
	    },
		onShow(){
			this.init();
			this.tabIndex = 0;
			this.currencyId = 3;
			if(this.tabActive == 0){
				if(this.tabsName == "FIL"){
					this.recordBars = this.recordBars_1;
					this.type = this.recordBars_1[0].key;
				}else{
					this.recordBars = this.recordBars_2;
					this.type = this.recordBars_2[0].key;
				}
			}else{
				this.recordBars = this.recordBars_3;
				this.type = this.recordBars_3[0].key;
			}
		},
		onLoad() {
			var eyeType = uni.getStorageSync('eyeType');
			if (eyeType == '' || eyeType == null || eyeType == undefined) {
				uni.setStorageSync('eyeType', true);
			}
		},
	    methods: {
			init(){
				this.newsList = [];
				this.pageNum = 1;
				this.getTabBars();
				// this.getventureProfitLogType();
			},
			changTabActive(index) {
				this.newsList = [];
				this.pageNum = 1;
				if(this.tabActive != index){
					this.tabActive = index;
					if(this.tabActive == 0){
						this.i = 0;
						this.tabIndex = 0;
						this.currencyId = this.tabBars[0].key;
						this.getTabBars();
					}else{
						this.v_i = 0;
						this.tabIndex = 0;
						this.index = 0;
						this.currencyId = this.tabBars[0].key;
						this.getventureProfitLogType();
					}
				}
			},
			// 获取账单记录
			getventureProfitLogType() {
				this.tabIndex = this.index;
				this.$Ajax('/front/venture/ventureProfitLogType', {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					currencyId: this.currencyId,
				}, res => {
						if (res.code == 0) {
							console.log("this.currencyId",this.currencyId);
							this.venturePro = res.obj;
							this.userDto = res.obj.userDto;
							this.dongtaiList = res.obj.dongtaiList;
							this.jiliList = res.obj.jiliList;
							this.jingtaiList = res.obj.jingtaiList;
						}
					}
				);
			},
			//获取矿机类型
			getTabBars() {
				this.$Ajax('/front/miner/currencyList', {
					type: 4,
				}, res => {
						if (res.code == 0) {
							// console.log(JSON.stringify(res.obj))
							this.tabBars = res.obj;
							this.tabsName = this.tabBars[0].name;
							if(this.currencyId == ''){
								this.currencyId = this.tabBars[0].key;
							}
							if(this.tabsName == "FIL"){
								this.recordBars = this.recordBars_1;
								this.type = this.recordBars_1[0].key;
							}else{
								this.recordBars = this.recordBars_2;
								this.type = this.recordBars_2[0].key;
							}
							this.getList(this.tabIndex,this.currencyId,this.type);
						}
					}
				);
			},
			// 获取账单记录
	        getList(index,currencyId,type) {
				this.tabIndex = index;
				this.recordIndex = this.i;
				this.$Ajax('/front/miner/minerProfitLogType', {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					currencyId: currencyId,
					type: type,
				}, res => {
						if (res.code == 0) {
							this.userWallet = res.obj.userWallet;
							this.pages = res.obj.data.pages;
							this.newsList = this.newsList.concat(res.obj.data.list);
						}
					}
				);
	        },
			ontabtap(index,currencyId,name) {
				this.newsList = [];
				this.pageNum = 1;
				// this.index = index;
				this.i = 0;
				this.currencyId = currencyId;
				this.type = 10;
				if(this.tabActive == 0){
					if(this.tabsName == "FIL"){
						this.recordBars = this.recordBars_1;
						this.type = this.recordBars_1[0].key;
					}else{
						this.recordBars = this.recordBars_2;
						this.type = this.recordBars_2[0].key;
					}
				}else{
					this.recordBars = this.recordBars_3;
					this.type = this.recordBars_3[0].key;
				}
				if(name == 'ICP'){
					this.tabIndex = index;
					console.log(this.tabIndex);
					this.$tools.toast('敬请期待');
				}else{
					if(this.tabActive == 0){
						this.tabsName = name;
						this.index = index;
						this.getList(this.index,this.currencyId,this.type);
					}else{
						this.tabsName = name;
						this.index = index;
						this.getventureProfitLogType();
					}
				}
			},
			changeType(type,i) {
				this.newsList = [];
				this.pageNum = 1;
				this.type = type;
				this.i = i;
				this.getList(this.index,this.currencyId,this.type);
			},
			changeType_3(index) {
				if(this.v_i != index){
					this.v_i = index;
					this.tabI = this.v_i;
				}
			},
			//获取收益明细类型
			getRecordBars() {
				this.$Ajax('/front/miner/getLogType', {}, res => {
						if (res.code == 0) {
							res.obj.forEach((item,index) => {
								if(item.key == 10 || item.key == 11 || item.Key == 13){
									this.recordBars.push(item);
								}	
							})
							console.log(JSON.stringify(this.recordBars))
						}
					}
				);
			},
			newsListLower(e) {
				console.log("ddd")
				if (this.pageNum >= this.pages) {
					return this.$tools.toast('到底了');
				} else {
					this.pageNum++;
					console.log("index：",this.index,"currencyId：",this.currencyId,"type：",this.type)
					this.getList(this.index,this.currencyId,this.type);
				}
			},
			toggleAssetsInfo() {
				var eyeType = uni.getStorageSync('eyeType');
				if (eyeType) {
					uni.setStorageSync('eyeType', false);
					this.eyeType = false;
				} else {
					uni.setStorageSync('eyeType', true);
					this.eyeType = true;
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
	.uni-scroll-view-content{
		@include flexBetween;
	}
	.uni-tab-item:nth-child(1){text-align: left;}
	.uni-tab-item:nth-child(3){text-align: right;}
	.uni-tab-item:nth-last-child(1){text-align: right;}
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
		font-weight: bold;
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
	    color: $globalColor-style;
		padding-bottom: 10upx;
		font-weight: bold;
	}
	.uni-tab-item-title-active::before{
		content: '';
		display: inline-block;
		height: 4upx;
		width: 50upx;
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
