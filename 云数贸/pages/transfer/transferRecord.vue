<template>
	<view class="pages">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">转账记录</view>
			</view> 
		</view> 
		
		<view class="orderBox">
			<view class="orderBox-wrapper">
				<view class="initNoData" v-if="recordList.length == 0">暂无相关内容</view>
				<view class="orderBox-wrapper-item" v-for="(item,index) in recordList" :key="index" v-else
				@click="$tools.jump('./orderDetails',item.id,1)">
					<view class="tipsBox">
						<view class="tipsBox-title">
							<view class="tipsBox-title__label">{{ item.currencyName }} </view>
						</view>
					</view>
					<view class="orderBox-wrapper-item-list">
						<view class="orderBox-list">
							<view class="orderBox-list-title">股数</view>
							<view class="orderBox-list-num">{{ item.amount }}</view>
						</view>
						<view class="orderBox-list">
							<view class="orderBox-list-title">对方手机号</view>
							<view class="orderBox-list-num">{{ item.toAddress }}</view>
						</view>
						<view class="orderBox-list">
							<view class="orderBox-list-title">时间</view>
							<view class="orderBox-list-num">{{ item.createTime }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
			data(){
				return{
					tabsActive:1,
					recordList: [
						{createTime:'2021.02.22 14:47',toAddress:'500',amount:'1000'},{createTime:'2021.02.23 22:18',toAddress:'100',amount:'1000'},{createTime:'2021.02.24 15:4',toAddress:'500',amount:'1000'},
						{createTime:'2021.02.22 14:47',toAddress:'500',amount:'1000'},{createTime:'2021.02.23 22:18',toAddress:'100',amount:'1000'},{createTime:'2021.02.24 15:4',toAddress:'500',amount:'1000'},
						{createTime:'2021.02.22 14:47',toAddress:'500',amount:'1000'},{createTime:'2021.02.23 22:18',toAddress:'100',amount:'1000'},{createTime:'2021.02.24 15:4',toAddress:'500',amount:'1000'},
						{createTime:'2021.02.22 14:47',toAddress:'500',amount:'1000'},{createTime:'2021.02.23 22:18',toAddress:'100',amount:'1000'},{createTime:'2021.02.24 15:4',toAddress:'500',amount:'1000'},
						{createTime:'2021.02.22 14:47',toAddress:'500',amount:'1000'},{createTime:'2021.02.23 22:18',toAddress:'100',amount:'1000'},{createTime:'2021.02.24 15:4',toAddress:'500',amount:'1000'},
					],
					// 页数
					pageSize: 20,
					pageNum: 1,
					pages: 0,
				}
			},
			onShow() {
				this.init();
			},
			onReachBottom() {
				if (this.pageNum >= this.pages) {
					return this.$tools.toast('到底啦');
				} else {
					this.pageNum++;
					this.getUserList();
				}
			},
			methods: {
				init(){
					this.getList();
				},
				changeTabsActive(index) {
					if (this.tabsActive != index) {
						this.tabsActive = index;
						this.getList()
					}
				},
				// 
				getList() {
					this.recordList = [];
					this.$Ajax('/front/mine/getTransferRecord', {
						pageSize: this.pageSize,
						pageNum: this.pageNum,
					}, res => {
						if (res.code == 0) {
							// console.log(JSON.stringify(res.obj))
							this.pages = res.obj.pages;
							this.recordList = this.recordList.concat(res.obj.list);
						}
					});
				},
				
			},
		}
	</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/order/order';
	.header_fixed + view{
		/* #ifdef H5 */
		padding-top: 180upx;
		/* #endif */
		/* #ifdef APP-PLUS */
		padding-top: 240upx;
		/* #endif */
		}
</style>
