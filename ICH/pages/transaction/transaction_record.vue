<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--bgWhite initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">交易记录</view>
			</view>
		</view>
		<view class="main">
			<view class="tabsBox">
				<view class="tabsBox-control">
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 0 }" @click="changeTabsActive(0)">未完成</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 1 }" @click="changeTabsActive(1)">已完成</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 2 }" @click="changeTabsActive(2)">已取消</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 3 }" @click="changeTabsActive(3)">申诉</view>
				</view>
			</view>
			<view class="recordListBox">
				<view class="recordListBox-wrapper">
					<view class="initNoData" v-if="orderRecord.length == 0"></view>
					<view class="recordListBox-list" v-for="(item, index) in orderRecord" :key="index" @click="$tools.jump('../transaction/transaction_order_details', item.id)">
						<view class="recordListBox-list__info">
							<view class="recordListBox-list__type" :class="item.type == 0 ? 'recordListBox-list__type--buy' : 'recordListBox-list__type--sell'">
								{{ item.type == 0 ? '买入' : '卖出' }}
							</view>
							<view class="recordListBox-list__name">{{ item.currencyName }}</view>
							<view class="recordListBox-list__date">{{ item.createTime }}</view>
							<view class="recordListBox-list__status">{{ item.statusStr }}</view>
						</view>
						<view class="recordListBox-list__price">¥{{ item.price }}</view>
						<view class="recordListBox-list__content">
							<view class="recordListBox-list__money">总金额：{{ item.money }}</view>
							<view class="recordListBox-list__quantity">数量：{{ item.quantity }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Vue from 'vue';

export default {
	data() {
		return {
			buttonActive: 0,
			animationData: [],
			rightMenuShow: false,
			/* 根据后台给的配置，默认为0（第一个），不需要根据按钮点击 */
			rightMenuButtonActive_1: '',
			rightMenuButtonActive_2: 0,
			rightMenuButtonActive_3: 0,

			rightMenuButtonSwitch: false,

			tabsActive: 0,

			// 页数
			pageSize: 20,
			pageNum: 1,
			pages: 0,
			orderRecord: [],
			otcList: [],

			userId: ''
			// isPublishUser: null
		};
	},
	onLoad() {
		this.userId = uni.getStorageSync('userId');
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return false;
		}
		// this.pageNum++;
		this.pageSize += 20;
		this.init();
	},
	methods: {
		init() {
			this.getOrderRecord();
		},
		getOrderRecord() {
			let that = this;
			this.orderRecord = [];
			this.$Ajax(
				'/front/otc/myRecordList',
				{
					// tradeType: this.rightMenuButtonActive_1,
					status: this.tabsActive
					// pageSize: this.pageSize,
					// pageNum: this.pageNum
				},
				res => {
					if (res.code == 0) {
						this.orderRecord = res.obj.list;
						console.log(JSON.stringify(this.orderRecord));
						// Vue.$set('')
						// that.orderRecord = res.obj.list;
					}
				}
			);
		},
		changeTabsActive(index) {
			this.tabsActive = index;
			this.getOrderRecord();
		}
	}
};
</script>

<style lang="scss" scoped>
.recordListBox {
	&-wrapper {
		// padding: 30upx;
	}

	&-list {
		// background-color: #1a1b30;
		border-bottom: 1upx solid #c6d2e4;
		padding: 30upx;
		margin-bottom: 30upx;
		font-size: 28upx;

		&__info {
			@include flexBetween;
			margin-bottom: 15upx;
		}

		&__type {
			color: #101010;
			font-size: 32upx;
			padding-left: 30upx;
			position: relative;
			margin-right: 15upx;
			&:before {
				content: '';
				display: inline-block;
				position: absolute;
				width: 12upx;
				border-radius: 15upx;
				height: 100%;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
			}

			&--sell {
				&:before {
					background-color: #00b8ae;
				}
			}

			&--buy {
				&:before {
					background-color: $globalColor-blue;
				}
			}
		}

		&__name {
			color: #101010;
			font-size: 32upx;
			margin-right: 15upx;
		}

		&__date {
			flex: 1;
			font-size: 24upx;
			color: #99999d;
		}

		&__status {
			font-size: 32upx;
			color: #101010;
			margin-left: 15upx;
		}

		&__price {
			color: #101010;
			font-size: 32upx;
			margin-bottom: 15upx;
		}

		&__content {
			@include flexBetween;
		}

		&__quantity,
		&__money {
			color: #99999d;
			font-size: 24upx;
		}
	}
}

.tabsBox {
	&-control {
		@include flexCenter;
		border-bottom: 16upx solid #eef1f6;
		&__item {
			flex: 1;
			text-align: center;
			font-size: 32upx;
			font-weight: bold;
			color: #999999;
			// margin-right: 30upx;
			padding: 30upx 0;
			position: relative;
			@include initTransition(0.4);
			&:after {
				@include initTransition(0.4);
				content: '';
				display: block;
				width: 30upx;
				height: 6upx;
				background-color: transparent;
				position: absolute;
				border-radius: 12upx;
				bottom: -1upx;
				left: 50%;
				transform: translateX(-50%);
			}
			&--active {
				color: $globalColor-blue;
				&:after {
					background-color: $globalColor-blue;
				}
			}
		}
	}
}
</style>
