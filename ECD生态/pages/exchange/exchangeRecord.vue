<template>
	<view class="pages">
		<view class="header_bar header_fixed header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">
					<view class="header-title__type" :class="{'header-title__type--active' : tabsActive == 0}" @click="changeTabs(0)">我要收取</view>
					<view class="header-title__type" :class="{'header-title__type--active' : tabsActive == 1}" @click="changeTabs(1)">我要提供</view>
				</view>
			</view> 
		</view> 
		<view class="record">
			<view class="initTabs">
				<view class="initTabs-title" :class="{'initTabs-title--active' : tabTitle == 0}" @click="changeTabTitle(0)">未完成</view>
				<view class="initTabs-title" :class="{'initTabs-title--active' : tabTitle == 1}" @click="changeTabTitle(1)">已完成</view>
				<view class="initTabs-title" :class="{'initTabs-title--active' : tabTitle == 2}" @click="changeTabTitle(2)">取消</view>
				<view class="initTabs-title" :class="{'initTabs-title--active' : tabTitle == 3}" @click="changeTabTitle(3)">申诉</view>
			</view>
			<view class="recordBox">
				<view class="initNoData" v-if="recordList.length == 0"></view>
				<view class="recordBox-list" v-else v-for="(item, key) in recordList" :key="key"
				@click="addPay(item.id,item.buyUserId,item.status)">
					<view class="recordBox-list-header">
						<view class="recordBox-list-header-title">
							{{item.createTime}}
						</view>
						<view class="recordBox-list-header-price">
							<image class="recordBox-list-header-price-image" src="../../static/public/icon-arrow-right-grey.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="recordBox-list__num">{{item.quantity | number(2)}}{{item.currencyName}}</view>
					<view class="recordBox-list__operate">
						<view class="recordBox-list__operate-title">单价:{{item.price}}CNY/1{{item.currencyName}}</view>
						<view class="recordBox-list__operate-title">金额:{{item.quantity*item.price | number(2)}}CNY</view>
						<view class="recordBox-list__operate-title">状态:{{ statusList[item.status] }}</view>
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
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				selectType:'',
				recordList: [
					{id:1,currencyName:'CNDT 7天理财',createTime:'2122-2-23 23:23',quantity:12,statusStr:'EDD'}
				],
				tabsActive: 0,
				tabTitle: 0,
				statusList: ['待接单', '待支付', '待收款', '已完成', '已取消', '申诉中', '申诉成功', '申诉失败'],
			}
		},
		onLoad(option) {
			this.currencyId = option.value1;
			this.selectType = option.value2;
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast('到底啦');
			} else {
				this.pageNum++;
				this.getList();
			}
		},
		onShow() {
			this.userId = uni.getStorageSync('userId');
			this.recordList = [];
			this.getList();
		},
		methods:{
			addPay(id,buyUserId,status){
				console.log("this.tabTitle ",this.tabTitle )
				if(this.tabTitle == 0 && this.userId == buyUserId && status == 1){
					this.$tools.jump('./confirmOrder',id);
				}else{
					this.$tools.jump('./exchangeDetails',id);
				}
			},
			getList() {
				this.$Ajax('/front/otc/myRecordList', {
					tradeType:this.tabsActive,
					status: this.tabTitle,
					pageSize: this.pageSize,
					pageNum: this.pageNum,
				}, res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.recordList = this.recordList.concat(res.obj.list);
						}
					}
				);
			},
			changeTabs(index){
				if(this.tabsActive != index){
					this.tabsActive = index;
					this.recordList = [];
					this.tabTitle = 0;
					this.pageNum = 1;
					this.getList();
				}
			},
			changeTabTitle(index){
				if(this.tabTitle != index){
					this.tabTitle = index;
					this.recordList = [];
					this.pageNum = 1;
					this.getList();
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '/scss/releaseRecord';
	.initTabs{
		&-title{
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #999999;
			&--active{
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: $globalColor-style;
			}
		}
	}
</style>
