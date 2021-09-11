<template>
	<view class="pages">
		<view class="header_bar header_bg header_fixed">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">我的钱包</view>
			</view> 
			<view class="headerOrder">
				<view class="headerOrder_wrapper" :class="{ 'headerOrder_wrapper_orderActive': tabsActive == 0 }" @click="changeTabsActive(0)">资金账户</view>
				<view class="headerOrder_wrapper" :class="{ 'headerOrder_wrapper_orderActive': tabsActive == 1 }" @click="changeTabsActive(1)">佣金账户</view>
			</view>
		</view> 
		
		<view class="teamBox">
			<view class="teamBox-wrapper" v-if="tabsActive == 0">
				<view class="initNoData" v-if="recordList.length == 0">暂无相关内容</view>
				<view class="teamBox-wrapper-item" v-for="(item,index) in recordList" :key="index"
				@click="$tools.jump('./orderDetails',item.id,1)" v-if="item.currencyName != '佣金'">
					<view class="tipsBox">
						<view class="tipsBox-title">
							<view class="tipsBox-title__label">{{ item.currencyName }}</view>
						</view>
						<view class="tipsBox-operate--active">{{ item.total }}</view>
					</view>
					<view class="teamBox-wrapper-item-list">
						<view class="teamBox-list">
							<view class="teamBox-list-title">持有股数</view>
							<view class="teamBox-list-num">{{ item.using }}</view>
						</view>
						<view class="teamBox-list">
							<view class="teamBox-list-title">涨幅率</view>
							<view class="teamBox-list-num">{{ item.up }}%</view>
						</view>
					</view>
				</view>
			</view>
			<view class="teamBox-wrapper" v-if="tabsActive == 1">
				<view class="teamBox-wrapper-item">
					<view class="tipsBox">
						<view class="tipsBox-title">
							<view class="tipsBox-title__label">佣金</view>
						</view>
						<view class="tipsBox-operate--active">{{ teamList.commission }}</view>
					</view>
					<view class="teamBox-wrapper-item-list">
						<view class="teamBox-list">
							<view class="teamBox-list-title">今日收益</view>
							<view class="teamBox-list-num">{{ teamList.today }}</view>
						</view>
						<view class="teamBox-list">
							<view class="teamBox-list-title">团队人数</view>
							<view class="teamBox-list-num">{{ teamList.teamSize }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="initBtnBox">
			<view class="initBtn" v-if="tabsActive == 0">
				<view class="initBtn-btn" @click="$tools.jump('../transfer/transfer')">转 账</view>
			</view>
			
			<view class="initBtnBox-type" v-if="tabsActive == 1">
				<view class="initBtn">
					<view class="initBtn-btn" @click="$tools.jump('../withdrawal/withdrawal')">提现</view>
				</view>
				<view class="initBtn">
					<view class="initBtn-btn" @click="$tools.jump('../purchase/buy')">购买股权</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: { uniPopup },
			data(){
				return{
					tabsActive:0,
					recordList: [
						{createTime:'2021.02.22 14:47',balance:'500',totalPrice:'1000'},{createTime:'2021.02.23 22:18',balance:'100',totalPrice:'1000'},{createTime:'2021.02.24 15:4',balance:'500',totalPrice:'1000'},
						{createTime:'2021.02.22 14:47',balance:'500',totalPrice:'1000'},{createTime:'2021.02.23 22:18',balance:'100',totalPrice:'1000'},{createTime:'2021.02.24 15:4',balance:'500',totalPrice:'1000'},
						{createTime:'2021.02.22 14:47',balance:'500',totalPrice:'1000'},{createTime:'2021.02.23 22:18',balance:'100',totalPrice:'1000'},{createTime:'2021.02.24 15:4',balance:'500',totalPrice:'1000'},
						{createTime:'2021.02.22 14:47',balance:'500',totalPrice:'1000'},{createTime:'2021.02.23 22:18',balance:'100',totalPrice:'1000'},{createTime:'2021.02.24 15:4',balance:'500',totalPrice:'1000'},
						{createTime:'2021.02.22 14:47',balance:'500',totalPrice:'1000'},{createTime:'2021.02.23 22:18',balance:'100',totalPrice:'1000'},{createTime:'2021.02.24 15:4',balance:'500',totalPrice:'1000'},
					],
					teamList:{},
					// 页数
					pageSize: 20,
					pageNum: 1,
					pages: 0,
				}
			},
			onShow() {
				this.init();
			},
			methods: {
				init(){
					this.recordList = [];
					this.getList();
					this.getRecordList();
				},
				recordListLower() {
					if (this.pageNum >= this.pages) {
						return this.$tools.toast('到底了');
					} else {
						if(this.tabsActive == 0){
							this.pageNum++;
							this.getList();
						}
					}
				},
				// 资金账户
				getList() {
					this.$Ajax('/front/mine/getAssetsAll', {}, res => {
						if (res.code == 0) {
							this.recordList = res.obj;
						}
					});
				},
				// 佣金账户
				getRecordList() {
					this.$Ajax('/front/mine/getCommissionAccount', {}, res => {
						if (res.code == 0) {
							this.teamList = res.obj;
						}
					});
				},
				changeTabsActive(index) {
					// this.list = [];
					this.recordList = [];
					if (this.tabsActive != index) {
						this.tabsActive = index;
					}
					if(index == 0){
						this.pageNum = 1;
						this.getList();
					}
					if(index == 1){
						this.getRecordList();
					}
				},
			},
		}
	</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/wallet/wallet';
	.header{
		&_fixed{
			& + view{
				/* #ifdef H5 */
				padding-top: 180upx;
				/* #endif */
				/* #ifdef APP-PLUS */
				padding-top: 240upx;
				/* #endif */
			}
		}
	} 
</style>
