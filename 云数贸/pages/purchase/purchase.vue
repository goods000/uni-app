<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-title">股权购买</view>
			</view> 
		</view> 
		
		<view class="indexBox">
			<view class="indexBox-header">
				<view class="indexBox-header-image">
					<image src="../../static/index/icon-index-news.png" mode="widthFix"></image>
				</view>
				<view class="indexBox-title">股权数据统计</view>
			</view>
			<view class="tipsBox">
				<view class="tipsBox-title">
					<view class="tipsBox-title__txt">我的资产</view>
				</view>
				<view class="tipsBox-operate">
					<view class="tipsBox-operate-title">{{assetList.totalAll}}CNY</view>
				</view>
			</view>
			<view class="tipsBox">
				<view class="tipsBox-title">
					<view class="tipsBox-title__txt">已购股种：</view>
				</view>
				<view class="tipsBox-operate">
					<view class="tipsBox-operate-title" v-if="arr.length == 0">暂无</view>
				</view>
				<view class="tipsBox-operate">
					<!-- <view class="tipsBox-operate-title">YSM原始股 / 夏威夷 / 中国石油 / YSM工业 / YSM共享 </view> -->
					<view class="tipsBox-operate-title" v-for="(item,index) in arr" :key="index" >
					 <text v-if="index==0">{{item.substring(1)}}</text>
					 <text v-else>{{item}}</text>
					</view>
					<!-- <view class="tipsBox-operate-title">{{item.sharesName=='YSM原始股'?'YSM原始股 ':''}}</view> -->
				</view>
			</view>
		</view>
		
		<view class="indexBox">
			<view class="indexBox-header">
				<view class="indexBox-header-image">
					<image src="../../static/index/icon-index-news.png" mode="widthFix"></image>
				</view>
				<view class="indexBox-title">在售股种</view>
			</view>
			<view class="indexBox-tableBox">
				<view class="tableBox-list">
					<view class="tableBox-list__item">
						<view class="tableBox-list__item-title">股种</view>
						<view class="tableBox-list__item-title">最新价</view>
						<view class="tableBox-list__item-title">月涨幅</view>
						<view class="tableBox-list__item-title">库存股数</view>
					</view>
					<view class="initNoData" v-if="SharesList.length == 0">暂无数据</view>
					<scroll-view :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto" class="tableBox-height">
					<view class="tableBox-list__item" v-for="(item,index) in  SharesList" :key="index">
						<view class="tableBox-list__item-title tableBox-list__item-data">{{ item.name }}</view>
						<view class="tableBox-list__item-title tableBox-list__item-data active">￥{{ item.newest }}</view>
						<view class="tableBox-list__item-title tableBox-list__item-data">{{ item.up }}%</view>
						<view class="tableBox-list__item-title tableBox-list__item-data" v-if="item.surplus >= 10000 && item.surplus <= 10000000">{{ ((item.surplus/10000).toFixed(0)) + '万' }}股</view>
						<view class="tableBox-list__item-title tableBox-list__item-data" v-else-if="item.surplus > 10000000">{{ ((item.surplus/100000000).toFixed(0))+ '亿' }}股</view>
						<view class="tableBox-list__item-title tableBox-list__item-data" v-else>{{ item.surplus }}股</view>
					</view>
					</scroll-view>	
				</view>
			</view>
		</view>
		
		<view class="initBtn" @click="$tools.jump('./buy')">购买股权</view>
		
	</view>
</template>

<script>
	export default {
			data(){
				return{
					scrollInto: "",
					SharesList:[
						{name:'YSM原始股',price:'￥500',newest:'￥1',surplus:'100万股'},{name:'夏威夷',price:'￥20',newest:'￥1',surplus:'90万'},{name:'中国石油',price:'￥24',newest:'￥1',surplus:'100万股'},{name:'YSM工业',price:'￥24',newest:'￥1',surplus:'30万股'},
					],
					assetList:{},
					// 页数
					pageSize: 20,
					pageNum: 1,
					pages: 0,
					recordList:[],
					arr:[],
				}
			},
			onShow() {
				this.init();
			},
			methods: {
				init(){
					this.getStatistics();
					this.getSharesList();// 获取股票列表
					this.getList();// 获取购买股票列表
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
				getList() {
					this.recordList = [];
					this.$Ajax('/front/shares/getOrderList', {
						status: 2,
						pageSize: this.pageSize,
						pageNum: this.pageNum,
					}, res => {
						if (res.code == 0) {
							// console.log(JSON.stringify(res.obj))
							this.pages = res.obj.pages;
							this.recordList = this.recordList.concat(res.obj.list);
							let a = [];
							this.recordList.forEach((item,index) => {
								if(item.sharesName != ''){
									let sharesName = item.sharesName;
									a.push('/'+sharesName);
								}
							})
							// console.log("a:",a);
							this.arr = Array.from(new Set(a));
							// console.log("arr:",this.arr);
						}
					});
				},
				
			},
		}
	</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/index/index';
	.tipsBox{
		&-operate{
			@include flexRight;
			flex-wrap: wrap;
		}
	}
</style>
