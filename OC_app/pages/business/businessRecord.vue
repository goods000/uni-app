<template>
	<view class="pages">
		<view class="">
			
			<view class="header_bar header_bg header_fixed">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">交易记录</view>
				</view> 
			</view> 
			
			<view class="release_tabs">
				<view class="release_tabs-list">
					<view class="release_tabs-list-txt" :class="{ 'active': tabsActive == 0 }" @click="changeTabsActive(0)">进行中</view>
					<view class="release_tabs-list-txt" :class="{ 'active': tabsActive == 1 }" @click="changeTabsActive(1)">已完成</view>
					<view class="release_tabs-list-txt" :class="{ 'active': tabsActive == 2 }" @click="changeTabsActive(2)">已取消</view>
					<view class="release_tabs-list-txt" :class="{ 'active': tabsActive == 3 }" @click="changeTabsActive(3)">申诉</view>
				</view>
			</view>
			
			<view class="releaseRecord">
				<view :class="{ initNoData: orderRecord.length == 0 }" v-if="orderRecord.length == 0">暂无记录</view>
				<view class="releaseRecord-box" v-for="(item, index) in orderRecord" :key="index" @click="$tools.jump('../business/businessOrder', item.id)">
					<view class="releaseRecord-box-header">
						<view class="releaseRecord-box-header__title"><text :class="item.buyUserId == userId ? 'buy' : 'sell'">{{ item.buyUserId == userId ? '购买' : '出售' }}</text>{{item.currencyName}}</view>
						<view class="releaseRecord-box-header__status">
							<view class="releaseRecord-box-header__status--end"
							:class="[{ 'releaseRecord-box-header__status--hand': item.status == 1 },{ 'releaseRecord-box-header__status--hand': item.status == 2 }, { 'releaseRecord-box-header__status--appeal': item.status == 5 }]"
							>
								{{ statusList[item.status] }}
								<!-- <text class="">待对方放币</text> -->
							</view>
							<!-- <text class="releaseRecord-box-header__status--end" v-if="tabsActive == 1">交易成功</text>
							<text class="releaseRecord-box-header__status--appeal" v-if="tabsActive == 2">申诉成功</text> -->
						</view>
					</view>
					<view class="releaseRecord-box-price">单价：￥{{ item.price }}</view>
					<view class="releaseRecord-box-info">
						<view class="releaseRecord-box-info__num">数量：{{ item.quantity }}</view>
						<view class="releaseRecord-box-info__time">时间：{{ item.updateTime }}</view>
					</view>
				</view>
				<!-- <view class="releaseRecord-box">
					<view class="releaseRecord-box-header">
						<view class="releaseRecord-box-header__title"><text class="sell">出售</text>OC</view>
					</view>
					<view class="releaseRecord-box-price">￥4200.00</view>
					<view class="releaseRecord-box-info">
						<view class="releaseRecord-box-info__num">数量：2,000.000</view>
						<view class="releaseRecord-box-info__time">时间：2021/01/11 14:00</view>
					</view>
				</view> -->
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderRecord:[
					// {typeShow:0,price:'88.00',quantity:'88.000',updateTime:'2021/01/01 14:00',status:1},
					// {typeShow:1,price:'100.00',quantity:'20.000',updateTime:'2021/01/02 14:00',status:5},
					// {typeShow:1,price:'4200.00',quantity:'2,000.000',updateTime:'2021/01/11 14:00',status:3},
					// {typeShow:0,price:'800.00',quantity:'1,000.000',updateTime:'2021/01/12 14:00',status:4},
					// {typeShow:1,price:'300.00',quantity:'300.000',updateTime:'2021/01/19 14:00',status:2},
					// {typeShow:1,price:'20.00',quantity:'10.000',updateTime:'2021/01/20 14:00',status:0},
				],
				pageTotal: 1,
				pageSize: 20,
				pageNum: 1,
				pages:1,
				statusList: ['待接单', '待支付', '待收款', '已完成', '已取消', '申诉中', '申诉成功', '申诉失败'],
				// 0待接单 1待支付 2待收款 3完成 4取消 5申诉 6申诉成功 7申诉失败
				tabsActive: 0,//0未完成 //1已完成 //2已取消 //3申诉
				userId: '',
				isBuyer: true, //true为买家，false卖家
			}
		},
		onLoad() {
		},
		onShow() {
			this.init();
			this.userId = uni.getStorageSync('userId');
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return false;
			}
			// this.pageNum++;
			// this.getOrderRecord();
			this.pageSize+=20;
			this.init();
		},
		methods: {
			init() {
				this.getOrderRecord();
			},
			getOrderRecord() {
				this.orderRecord = [];
				this.$Ajax(
					'/front/otc/myRecordList',
					{
						status: this.tabsActive,
						pageSize: this.pageSize,
						pageNum: this.pageNum
					},
					res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							this.orderRecord = this.orderRecord.concat(res.obj.list);
							// res.obj.list.forEach((item,index) => {
							// 	console.log(item.buyUserId+' -----' + this.userId);
							// 	this.isBuyer = this.userId == item.buyUserId;
							// 	console.log(' -- 是否买家: ' + this.isBuyer);
							// })
						}
					}
				);
			},
			changeTabsActive(index) {
				// if(this.tabsActive != index){
					this.tabsActive = index;
					this.getOrderRecord();
				// }
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/release/releaseRecord';
	// .header{
	// 	&_fixed + view{
	// 		/* #ifdef H5 */
	// 			padding-top: 120upx;
	// 		/* #endif */
	// 		/* #ifdef APP-PLUS */
	// 			padding-top: 190upx;
	// 			// margin-top: calc(var(--status-bar-height) + #{$global-header-height});
	// 		/* #endif */
	// 	}
	// }
</style>
