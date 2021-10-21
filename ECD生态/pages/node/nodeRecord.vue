<template>
	<view class="pages">
		<view class="header_bar header_fixed header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">
					<view class="header-title__type" :class="{'header-title__type--active' : tabsActive == 0}" @click="changeTabs(0)">订单记录</view>
					<view class="header-title__type" :class="{'header-title__type--active' : tabsActive == 1}" @click="changeTabs(1)">申请记录</view>
				</view>
			</view> 
		</view> 
		<view class="record">
			<view class="initTabs" v-if="tabsActive == 0">
				<view class="initTabs-title" :class="{'initTabs-title--active' : tabTitle == 1}" @click="changeTabTitle(1)">待发放</view>
				<view class="initTabs-title" :class="{'initTabs-title--active' : tabTitle == 2}" @click="changeTabTitle(2)">已完成</view>
			</view>
			<view class="recordBox" v-if="tabsActive == 0">
				<view class="initNoData" v-if="recordList.length == 0"></view>
				<view class="recordBox-list" v-else v-for="(item, key) in recordList" :key="key"
				@click="$tools.jump('./buyRecordsDetails',item.status,item.id,item.quantity,item.priceCny,item.currencyName,item.createTime,item.putTime)">
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
						<view class="recordBox-list__operate-title">单价:{{item.priceCny}}CNY/1{{item.currencyName}}</view>
						<view class="recordBox-list__operate-title">总额:{{item.quantity*item.priceCny | number(2)}}CNY</view>
						<view class="recordBox-list__operate-title">状态:{{ item.statusName }}</view>
					</view>
				</view>
			</view>
			<view class="recordBox" v-if="tabsActive == 1">
				<view class="initNoData" v-if="applyRecordList.length == 0"></view>
				<view class="recordBox-list" v-else v-for="(item, key) in applyRecordList" :key="key"
				@click="$tools.jump('./nodeRecordsDetails',item.statusName,item.name,item.phone,item.address,item.walletAddress)">
					<view class="recordBox-list-header">
						<view class="recordBox-list-header-title">
							{{ item.name }}
						</view>
						<view class="recordBox-list-header-price">
							<image class="recordBox-list-header-price-image" src="../../static/public/icon-arrow-right-grey.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="recordBox-list__statusBox">
						<view class="recordBox-list__num">{{ item.statusName }}</view>
						<view class="recordBox-list__time">{{ item.createTime }}</view>
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
				applyRecordList:[],
				tabsActive: 0,
				tabTitle: 1,
				statusList: ['待接单', '待支付', '待收款', '已完成', '已取消', '申诉中', '申诉成功', '申诉失败'],
			}
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
			this.tabsActive = 0;
			this.tabTitle = 1;
			this.applyRecordList = [];
			this.recordList = [];
			this.getList();
		},
		methods:{
			getList() {
				this.$Ajax('/front/node/getNodeBuyRecord', {
					// tradeType:this.tabsActive,
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
			// 节点申请记录
			getNodeApplyRecord() {
				this.$Ajax('/front/node/getNodeApplyRecord', {
					status: '4',
					pageSize: this.pageSize,
					pageNum: this.pageNum,
				}, res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.applyRecordList = this.applyRecordList.concat(res.obj.list);
						}
					}
				);
			},
			changeTabs(index){
				if(this.tabsActive != index){
					this.tabsActive = index;
					this.recordList = [];
					this.tabTitle = 1;
					this.pageNum = 1;
					if(this.tabsActive == 0){
						this.getList();
					}else{
						this.getNodeApplyRecord();
					}
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
	@import '/scss/nodeRecord';
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
