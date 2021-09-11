<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--bgWhite initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title initHeader-title--left">我的订单</view>
			</view>
		</view>
		<view class="main">
			<view class="initTabs">
				<view class="initTabs-wrapper">
					<view class="initTabs-control">
						<view class="initTabs-control__item" :class="{'initTabs-control__item--active': tabsActive == 0}" @click="changeTabsActive(0)">进行中</view>
						<view class="initTabs-control__item" :class="{'initTabs-control__item--active': tabsActive == 1}" @click="changeTabsActive(1)">已完成</view>
						<view class="initTabs-control__item" :class="{'initTabs-control__item--active': tabsActive == 2}" @click="changeTabsActive(2)">已取消</view>
						<view class="initTabs-control__item" :class="{'initTabs-control__item--active': tabsActive == 3}" @click="changeTabsActive(3)">申诉</view>
					</view>
				</view>
			</view>
			<view class="initOrder">
				<view class="initOrder-wrapper">
					<view :class="{ initNoData: orderRecord.length == 0 }" v-if="orderRecord.length == 0"></view>
					<view class="initOrder-list" v-for="(item, index) in orderRecord" :key="index" @click="$tools.jump('../transaction/transaction_order_details', item.id)">
						<view class="initOrder-list__top">
							<view class="initOrder-list__info">
								<view class="initOrder-list__type" :class="item.typeShow == 1 ? 'initOrder-list__type--sell' : 'initOrder-list__type--buy'">
									{{ item.typeShow == 1 ? '卖' : '买' }}
								</view>
								<view class="initOrder-list__title">{{ item.currencyName }}</view>
								<view class="initOrder-list__date">{{ item.updateTime }}</view>
							</view>
							<view
								class="initOrder-list__status"
								:class="[{ 'initOrder-list__status--green': item.status == 3 }, { 'initOrder-list__status--grey': item.status == 4 }, { 'initOrder-list__status--red': item.status != 3 && item.status != 4  }]"
							>
								{{ statusList[item.status] }}
							</view>
						</view>
						<view class="initOrder-list__bottom">
							<view class="initOrder-itemBox">
								<view class="initOrder-itemBox__item">
									<view class="initOrder-itemBox__item-label">单价(USD)</view>
									<view class="initOrder-itemBox__item-data">{{ item.price }}</view>
								</view>
								<view class="initOrder-itemBox__item">
									<view class="initOrder-itemBox__item-label">数量</view>
									<view class="initOrder-itemBox__item-data">{{ item.quantity }}</view>
								</view>
								<view class="initOrder-itemBox__item">
									<view class="initOrder-itemBox__item-label">总额(CNY)</view>
									<view class="initOrder-itemBox__item-data">{{ item.money }}</view>
								</view>
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
			orderRecord: [],
			pageTotal: 1,
			pageSize: 20,
			pageNum: 1,
			pages:1,
			statusList: ['待接单', '待支付', '待收款', '已完成', '已取消', '申诉中', '申诉成功', '申诉失败'],
			// 0待接单 1待支付 2待收款 3完成 4取消 5申诉 6申诉成功 7申诉失败
			tabsActive: 0  //0未完成 //1已完成 //2已取消 //3申诉
		};
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return false;
		}
		// this.pageNum++;
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
						this.orderRecord = res.obj.list;
					}
				}
			);
		},
		changeTabsActive(index){
			this.tabsActive = index;
			this.getOrderRecord();
		}
	}
};
</script>

<style lang="scss" scoped>

.initTabs{
	&-control{
		font-size: 28upx;
		// background-color: #FFFFFF;
		&__item{
			color: #999999;
			position: relative;
			@include initTransition(0.4);
			padding: 30upx 0;
			&:after {
				content: '';
				display: inline-block;
				width: 40upx;
				height: 4upx;
				background-color: #ffffff;
				position: absolute;
				left: 50%;
				bottom: 10upx;
				transform: translateX(-50%);
				@include initTransition(0.4);
			}
			
			&--active{
				color: $globalColor-green;
				&:after {
					background-color: $globalColor-green;
				}
			}
		}
	}
}

.infoBox {
	padding: 30upx;
	border-bottom: 10upx solid #fcfcfc;
	background-color: #ffffff;
	&-wrapper {
		@include flexCenter;
	}

	&-item {
		flex: 1;
		color: #333333;
		@include justifiedLayout;
		&__title {
			font-size: 24upx;
		}
		&__data {
			font-size: 28upx;
			font-weight: bold;
		}
	}
}

.ticketBox {
	&-left {
		flex: 1;
		padding-right: 30upx;
	}

	&-right {
		text-align: right;
	}

	&-list {
		@include flexBetween;
		background-color: #ffffff;
		font-size: 28upx;
		padding: 30upx;
		border-bottom: 10upx solid #fcfcfc;
	}

	&-title {
		font-size: 30upx;
		font-weight: bold;
		margin-bottom: 10upx;
	}

	&-subTitle {
		color: #999999;
		font-size: 24upx;
		margin-bottom: 10upx;
	}

	&-info {
		color: #999999;
		font-size: 24upx;
		margin-bottom: 10upx;
	}

	&-price {
		color: $globalColor-green;
		font-size: 34upx;
		margin-bottom: 10upx;
		font-weight: bold;
	}

	&-payment {
		margin-top: 20upx;
		@include flexLeft;
		&__icon {
			@include fullImage;
			&--wechat,
			&--alipay {
				width: 30upx;
				margin-right: 10upx;
			}
			&--unionpay {
				width: 48upx;
			}
		}
	}

	&-button {
		@include flexCenter;
		&__btn {
			background-color: $globalColor-green;
			font-size: 26upx;
			color: #ffffff;
			padding: 10upx 20upx;
			border-radius: 10upx;
		}
	}
}
</style>
