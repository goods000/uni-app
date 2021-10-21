<template>
	<view class="pages bg_header">
		<view class="initHeader initHeader--bgStyle initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">我的收益</view>
			</view>
		</view>

		<view class="main">
			<view class="record">
				<view class="recordBox">
					<image src="../../static/record/icon-record-01.png" mode="widthFix" class="recordBox-image"></image>
					<view class="recordBox-header">当前已获得收益</view>
					<view class="recordBox-title">合计</view>
					<view class="recordBox-num">{{ tatistics.total | number(2) }}</view>
					<view class="recordBox-info">今日已获得收益为{{ tatistics.today }}</view>
				</view>
			</view>
			
			<view class="recommendBox">
				<view class="recommendBox-wrapper">
					<view class="recommendBox-wrapper-item">
						<image src="../../static/asset/icon-asset-record1.png" mode="widthFix" class="recommendBox-wrapper-item__image"></image>
						<view class="">
							<view class="recommendBox-title">财务记录</view>
							<view class="recommendBox-txt">FINANCIAL RECORDS</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="tabsBox">
				<view class="tabsBox-wrapper">
					<view class="tabsBox-list" v-for="(item,index) in tabsList" :key="index">
						<view class="tabsBox-list__title" :class="{'tabsBox-list__title--active': index == choice}" @click="changeChoice(index,item.typeStr)">{{item.type}}</view>
					</view>
				</view>
			</view>
			
			<view class="transitionBox">
				<view class="transitionBox-wrapper">
					<view class="initNoData" v-if="recordList.length ==0">暂无记录</view>
					<view class="transitionBox-wrapper__item" v-for="(item,index) in recordList" :key="index" v-else>
						<view class="transitionBox-wrapper__item--box">
							<view class="transitionBox-wrapper__item--title">{{ item.typeStr }}</view>
						</view>
						<view class="transitionBox-wrapper__item--box">
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">数量</view>
								<view class="transitionBox-content-data">{{ item.money }}</view>
							</view>
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">收益来源</view>
								<!-- <view class="transitionBox-content-data">UID:{{ item.userName }}</view> -->
								<view class="transitionBox-content-data">手机号:{{ item.snapshot | conceal(3) }}</view>
							</view>
							<view class="transitionBox-content">
								<view class="transitionBox-content-title">时间</view>
								<view class="transitionBox-content-data">{{ item.createTime }}</view>
							</view>
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
			tabsActive:0,
			selectType: true,
			isFocus: null,
			price:'',
			price:'0.68',
			num:'',
			quota:0,
			charge:0,
			pwd:'',
			recordList:[
				// {typeStr:'直推收益',money:'23.30200',id:'0',createTime:'653.504'},{typeStr:'间推收益',money:'5.2200',id:'0.23',createTime:'21/03/22 12:11'}
			],
			assetList:{},
			tatistics:{},
			// 页数
			pageSize: 20,
			pageNum: 1,
			pages: 0,
			tabsList:[
				{type:'推荐奖励',typeStr:'8,12'},{type:'团队奖励',typeStr:'15'},{type:'分红奖励',typeStr:'16'}
			],
			index:0,
			choice:0,
			typeStr:'8,12'
		};
	},
	onLoad(hash) {
		this.id = hash.value1;
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底啦');
		} else {
			this.pageNum++;
			this.getRecordList();
		}
	},
	methods: {
		init() {
			this.getRevenueStatistics();
			this.getRecordList();
		},
		changeChoice(index,typeStr) {
			if(this.choice != index){
				this.choice = index;
				this.recordList = [];
				this.goodsName = '';
				this.pageNum = 1;
				this.typeStr = typeStr;
				this.getRecordList();
			}
		},
		// 收益统计
		getRevenueStatistics() {
			this.$Ajax('/search/getRevenueStatistics', {
				userId:this.id
			}, res => {
				if (res.code == 0) {
					this.tatistics = res.obj;
				}
			});
		},
		getRecordList() {
			this.$Ajax('/search/getUserWalletRecordList', {
				pageSize: this.pageSize,
				pageNum: this.pageNum,
				typeStr:this.typeStr,
			}, res => {
				if (res.code == 0) {
					this.pages = res.obj.pages;
					this.recordList = this.recordList.concat(res.obj.list);
				}
			});
		},
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/record/record';
.transitionBox-content:nth-child(1){
	width: 18%;
}
</style>
