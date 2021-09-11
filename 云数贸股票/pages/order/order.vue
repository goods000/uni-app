<template>
	<view class="pages">
		<view class="header_bar header_bg header_fixed">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">我的订单</view>
			</view> 
			<view class="headerOrder">
				<view class="headerOrder_wrapper" :class="{ 'headerOrder_wrapper_orderActive': tabsActive == 0 }" @click="changeTabsActive(0)">待付款</view>
				<view class="headerOrder_wrapper" :class="{ 'headerOrder_wrapper_orderActive': tabsActive == 1 }" @click="changeTabsActive(1)">待发放</view>
				<view class="headerOrder_wrapper" :class="{ 'headerOrder_wrapper_orderActive': tabsActive == 2 }" @click="changeTabsActive(2)">已完成</view>
			</view>
		</view> 
		
		<view class="orderBox">
			<view class="orderBox-wrapper">
				<view class="initNoData" v-if="recordList.length == 0">暂无相关内容</view>
				<view class="orderBox-wrapper-item" v-for="(item,index) in recordList" :key="index" v-else
				@click="$tools.jump('./orderDetails',item.id,1)">
					<view class="tipsBox">
						<view class="tipsBox-title">
							<view class="tipsBox-title__label">{{ item.num }}  股 </view>
						</view>
						<view class="tipsBox-right"></view>
					</view>
					<view class="orderBox-wrapper-item-list">
						<view class="orderBox-list">
							<view class="orderBox-list-title">时间</view>
							<view class="orderBox-list-num">{{ item.createTime }}</view>
						</view>
						<view class="orderBox-list">
							<view class="orderBox-list-title">单价(CNY)</view>
							<view class="orderBox-list-num">{{ item.unitPrice }}</view>
						</view>
						<view class="orderBox-list">
							<view class="orderBox-list-title">总价(CNY)</view>
							<view class="orderBox-list-num">{{ item.totalPrice }}</view>
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
					tabsActive:0,
					recordList: [
						{createTime:'2021.02.22 14:47',unitPrice:'500',totalPrice:'1000'},{createTime:'2021.02.23 22:18',unitPrice:'100',totalPrice:'1000'},{createTime:'2021.02.24 15:4',unitPrice:'500',totalPrice:'1000'},
						{createTime:'2021.02.22 14:47',unitPrice:'500',totalPrice:'1000'},{createTime:'2021.02.23 22:18',unitPrice:'100',totalPrice:'1000'},{createTime:'2021.02.24 15:4',unitPrice:'500',totalPrice:'1000'},
						{createTime:'2021.02.22 14:47',unitPrice:'500',totalPrice:'1000'},{createTime:'2021.02.23 22:18',unitPrice:'100',totalPrice:'1000'},{createTime:'2021.02.24 15:4',unitPrice:'500',totalPrice:'1000'},
						{createTime:'2021.02.22 14:47',unitPrice:'500',totalPrice:'1000'},{createTime:'2021.02.23 22:18',unitPrice:'100',totalPrice:'1000'},{createTime:'2021.02.24 15:4',unitPrice:'500',totalPrice:'1000'},
						{createTime:'2021.02.22 14:47',unitPrice:'500',totalPrice:'1000'},{createTime:'2021.02.23 22:18',unitPrice:'100',totalPrice:'1000'},{createTime:'2021.02.24 15:4',unitPrice:'500',totalPrice:'1000'},
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
					this.$Ajax('/front/mine/getOrderList', {
						status: this.tabsActive,
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
	page,.pages{
		background: #EDEDF2;
		height: 100vh;
	}
	.header_fixed + view{
		/* #ifdef H5 */
		padding-top: 180upx;
		/* #endif */
		/* #ifdef APP-PLUS */
		padding-top: 240upx;
		/* #endif */
		}
</style>
