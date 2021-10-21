<template>
	<view class="pages">
		<view class="header_bar header_fixed header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">委托记录</view>
			</view> 
		</view> 
		<view class="record">
			<view class="initTabs">
				<view class="initTabs-title" v-for="(item,index) in curList" :class="{'initTabs-title--active' : tabTitle == index}" @click="changeTabTitle(index,item.id)">{{item.name}}</view>
				<!-- <view class="initTabs-title" :class="{'initTabs-title--active' : tabTitle == 1}" @click="changeTabTitle(1)">USDT</view> -->
			</view>
			<view class="recordBox">
				<view class="initNoData" v-if="recordList.length == 0"></view>
				<view class="recordBox-list" v-else v-for="(item, key) in recordList" :key="key"
				 @click="$tools.jump('./recordDetails',item.id,item.fclName,item.quantity,item.interest,item.accEarnings,item.createTime,item.finclStatus)">
					<view class="recordBox-list-header">
						<view class="recordBox-list-header-title">
							{{item.currencyName}}
							<view class="recordBox-list-header--status">{{item.finclStatusStr}}</view>
						</view>
						<view class="recordBox-list-header-price">
						<!-- <view class="recordBox-list-header-price"> -->
							<image src="../../static/public/icon-arrow-right-grey.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="recordBox-list-box">
						<view class="recordBox-list-item">
							<view class="recordBox-list-item-title">委托时间</view>
							<view class="recordBox-list-item-status">{{ item.createTime }}</view>
						</view>
						<view class="recordBox-list-item">
							<view class="recordBox-list-item-title">委托数量</view>
							<view class="recordBox-list-item-status">{{ item.quantity | number(2)}}</view>
						</view>
						<view class="recordBox-list-item">
							<view class="recordBox-list-item-title">累计收益</view>
							<view class="recordBox-list-item-status">{{item.accEarnings}}</view>
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
				// 页数
				pageSize: 20,
				pageNum: 1,
				pages: 0,
				currencyId:'',
				selectType:'',
				curList:[],
				recordList: [
					{currency_id:1,currencyName:'CNDT 7天理财',createTime:'2122-2-23 23:23',quantity:12,statusStr:'EDD'}
				],
				tabTitle: 0,
			}
		},
		onLoad() {
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
			this.recordList = [];
			this.getFinancialCurList();
		},
		methods:{
			// 理财相关[理财币种列表]
			getFinancialCurList() {
				this.$Ajax('/front/regular/getFinancialCurList', {}, res => {
					if (res.code == 0) {
						this.curList = res.obj;
						if(this.currencyId == ''){
							this.currencyId = this.curList[0].id;
						}
						if(this.selectType == ''){
							this.selectType = this.curList[0].name;
						}
						console.log("this.currencyId",this.currencyId,"this.selectType",this.selectType);
						this.getList();
					}
				});
			},
			getList() {
				this.$Ajax('/front/regular/getFinancialOrderList', {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					currencyId: this.currencyId,
				}, res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.recordList = this.recordList.concat(res.obj.data);
						}
					}
				);
			},
			changeTabTitle(index,currencyId){
				if(this.tabTitle != index){
					this.tabTitle = index;
					this.currencyId = currencyId;
					this.recordList = [];
					this.getList();
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '/scss/productRecord';
</style>
