<template>
	<view class="pages bg_header">
		<view class="initHeader initHeader--line initHeader--fixed initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">我的订单</view>
			</view>
		</view>
		<view class="main">
			<view class="tabsBox">
				<view class="tabsBox-control">
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 1 }" @click="changeTabsActive(1)">待发货</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 2 }" @click="changeTabsActive(2)">已发货</view>
				</view>
			</view>
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="initNoData" v-if="orderList.length == 0">暂无数据</view>
					<view class="listBox__box" v-for="(item, index) in orderList" :key="index" v-else>
						<view  class="listBox-list"  v-for="(subItem, subIndex) in item.details" :key="subIndex">
							<view class="listBox-list-image">
								<image :src="subItem.productPic" mode=""></image>
							</view>
							<view class="listBox-list-news">
								<view class="listBox-list-title">{{ subItem.productName }}</view>
								<view class="listBox-list-tips" v-if="subItem.type == 0"><text>赠送</text>{{ (subItem.cost/TPDPrice/usdtPrice/gPrice) | number(2) }}CLQ积分</view>
								<view class="listBox-list-tips" v-if="subItem.type == 1"><text>赠送</text>{{ subItem.cost/TPDPrice/gPrice | number(2) }}CLQ积分</view>
								
								<view class="listBox-list-txt">价格:</view>
								<view class="listBox-list-operate">
									<view class="operate-wrapper">
										<view class="operate-wrapper-price">{{ subItem.cost }}<text>{{subItem.type == 0 ? 'CNY' : 'USDT'}}</text></view>
									</view>
									<view class="operate-wrapper-num">× {{ subItem.total }}</view>
								</view>
							</view>
						</view>
						<view class="listBox-newsBox" v-if="tabsActive == 1">
							<view class="listBox-newsBox-title listBox-newsBox-top">地址</view>
							<view class="listBox-newsBox-info listBox-newsBox-border">{{item.consigneeAddress}}</view>
						</view>
						<view class="listBox-newsBox" v-else>
							<view class="listBox-newsBox-title listBox-newsBox-top">物流信息</view>
							<view class="listBox-newsBox-info listBox-newsBox-border">{{item.courierCompany}}</view>
						</view>
						<view class="listBox-newsBox" v-if="tabsActive == 1">
							<view class="listBox-newsBox-title">订单号</view>
							<view class="listBox-newsBox-info">
								<text>{{item.orderNo}}</text>
								<image src="../../static/index/icon-index-record.png" mode="widthFix" @click="$tools.copy(item.orderNo)"></image>
							</view>
						</view>
						<view class="listBox-newsBox" v-else>
							<view class="listBox-newsBox-title">物流编号</view>
							<view class="listBox-newsBox-info">
								<text>{{item.courierOrderName}}</text>
								<image src="../../static/index/icon-index-record.png" mode="widthFix" @click="$tools.copy(item.courierOrderName)"></image>
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
			pages: 1,
			pageNum: 1,
			pageSize: 20,

			tabsActive: 1,
			statusList: ['待发货', '待收货', '已收货'],
			orderList: [
				{productPic:'../../static/shop/icon-shop-01.png',productName:'凯撒专柜正品 新款女装 纯色方领 桑蚕丝上衣 真丝衬衫',price:'100',total:'2',tips:'购买赠送等价值的400TPD积分'},
				{productPic:'../../static/shop/icon-shop-02.png',productName:'凯撒专柜正品 新款女装 纯色方领 桑蚕丝上衣 真丝衬衫',price:'100',total:'2',tips:'购买赠送等价值的400TPD积分'},
			],
			cnyToTPD:'',
			TPDPrice:'',
			usdtPrice:'',
			gPrice:'',
		};
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底啦');
		} else {
			this.pageNum++;
			this.getOrderList();
		}
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.recordList = [];
			this.getOrderList();
			this.getTPDPrice();
			this.getUSDTCNY();
			this.getComputeRadio();
		},
		// 我的订单
		getOrderList() {
			this.$Ajax(
				'/front/order/getOrderList',
				{
					orderStatus: this.tabsActive,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					// console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.pages = res.obj.pages;
						this.orderList = this.recordList.concat(res.obj.list);
					}
				}
			);
		},
		// 获取TPD兑换USDT价格
		getTPDPrice() {
			this.$Ajax('/front/mine/getTPDPrice', {}, res => {
				if (res.code == 0) {
					this.TPDPrice = res.obj;
				}
			});
		},
		// 获取USDT-CNY价格
		getUSDTCNY() {
			this.$Ajax('/front/mine/getUSDTCNY', {}, res => {
				if (res.code == 0) {
					this.usdtPrice = res.obj;
				}
			});
		},
		// 获取2价格
		getComputeRadio() {
			this.$Ajax('/front/mine/getComputeRadio', {}, res => {
				if (res.code == 0) {
					this.gPrice = res.obj;
				}
			});
		},
		changeTabsActive(index) {
			if (this.tabsActive != index) {
				this.tabsActive = index;
				this.pageNum = 1;
				this.init();
			}
		},
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/scss/pages/order/order';
</style>
