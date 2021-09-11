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
				<view class="initTabs-title" :class="{'initTabs-title--active' : tabTitle == 0}" @click="changeTabTitle(0)">进行中</view>
				<view class="initTabs-title" :class="{'initTabs-title--active' : tabTitle == 1}" @click="changeTabTitle(1)">已完成</view>
			</view>
			<view class="recordBox">
				<view class="initNoData" v-if="recordList.length == 0"></view>
				<view class="recordBox-list" v-else v-for="(item, key) in recordList" :key="key">
					<view class="recordBox-list-header">
						<view class="recordBox-list-header-title">
							{{ item.typeStr == '买' ? '收取' : '提供' }}{{ item.currencyName }}
						</view>
						<view class="recordBox-list-header-price" @click="$tools.jump('./releaseDetails',item.id)">
							<view class="recordBox-waysList">
								<image src="../../static/public/icon-bank-show.png" mode="widthFix" v-if="item.yhk == 1"></image>
								<image src="../../static/public/icon-alipay-show.png" mode="widthFix" v-if="item.zfb == 1"></image>
								<image src="../../static/public/icon-wechat-show.png" mode="widthFix" v-if="item.wx == 1"></image>
							</view>
							<image class="recordBox-list-header-price-image" src="../../static/public/icon-arrow-right-grey.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="recordBox-list__num">{{ item.quantity }}{{ item.currencyName }}</view>
					<view class="recordBox-list__operate">
						<view class="recordBox-list__operate-title">单价:{{ item.price | number(2) }}CNY</view>
						<view class="recordBox-list__operate-title">发布时间：{{ item.createTime }}</view>
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
				this.getRecord();
			}
		},
		onShow() {
			this.init();
		},
		methods:{
			init() {
				this.recordList = [];
				this.getRecord();
			},
			getRecord() {
				this.recordList = [];
				this.$Ajax(
					'/front/otc/myOrderList',
					{
						pageSize: this.pageSize,
						pageNum: this.pageNum,
						status: this.tabTitle,
						type:this.tabsActive,
					},
					res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.recordList = this.recordList.concat(res.obj.list);
						}
					}
				);
			},
			deleteOrder(id) {
				this.$Ajax(
					'/front/otc/cancelOrder',
					{
						orderId: id
					},
					res => {
						if (res.code == 0) {
							this.$tools.toast('撤销成功');
							this.getRecord();
						}
					}
				);
			},
			changeTabs(index){
				if(this.tabsActive != index){
					this.tabsActive = index;
					this.recordList = [];
					this.pageNum = 1;
					this.tabTitle = 0;
					this.getRecord();
				}
			},
			changeTabTitle(index){
				if(this.tabTitle != index){
					this.tabTitle = index;
					this.recordList = [];
					this.pageNum = 1;
					this.getRecord();
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '/scss/releaseRecord';
</style>
