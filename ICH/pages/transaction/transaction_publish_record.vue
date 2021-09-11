<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">发布记录</view>
			</view>
		</view>

		<view class="listBox">
			<view class="initNoData" v-if="recordList.length == 0"></view>
			<view class="listBox-list" v-for="(item, index) in recordList" :key="index">
				<!-- @click="$tools.jump('../transaction/transaction_order_details', item.id)" -->
				<view class="listBox-list__header">
					<view class="listBox-list__header-title">{{ item.typeStr }}{{ item.currencyName }}</view>
					<view class="listBox-list__header-date">{{ item.createTime }}</view>
					<view class="listBox-list__header-btn" @click.stop="deleteOrder(item.id)" @touchmove.stop.prevent v-show="item.status != 1">撤销</view>
				</view>
				<view class="listBox-list__content">
					<view class="listBox-list__item">
						<view class="listBox-list__item-title">价格(CNY)</view>
						<view class="listBox-list__item-data">{{ item.price }}</view>
					</view>
					<view class="listBox-list__item">
						<view class="listBox-list__item-title">数量</view>
						<view class="listBox-list__item-data">{{ item.quantity }}</view>
					</view>
					<view class="listBox-list__item">
						<view class="listBox-list__item-title">实际成交</view>
						<view class="listBox-list__item-data">{{ item.tradeQuantity }}</view>
					</view>
					<view class="listBox-list__item">
						<view class="listBox-list__item-title">状态</view>
						<view class="listBox-list__item-data">{{ item.statusStr }}</view>
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
			recordList: [],
			currencyName: '',
			currencyId: '',

			// 页数
			pageSize: 20,
			pageNum: 1,
			pages: 0
		};
	},
	onLoad(option) {
		this.currencyId = option.value1;
		this.currencyName = option.value2;
	},
	onShow(e) {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底了');
		}
		this.pageNum++;
		this.getRecord();
	},
	methods: {
		init() {
			this.getRecord();
		},
		getRecord() {
			this.recordList = [];
			this.$Ajax(
				'/front/otc/myOrderList',
				{
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					status: 0
				},
				res => {
					if (res.code == 0) {
						var list = res.obj.list;
						console.log(list);
						this.recordList = this.recordList.concat(list);
					}
					this.pages = res.obj.pages;
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
		}
	}
};
</script>

<style lang="scss" scoped>
.listBox {
	&-list {
		padding: 30upx;
		&__content {
			display: flex;
			justify-content: space-between;
			border-bottom: 2upx solid #313246;
			padding-bottom: 30upx;
		}
		&__item {
			flex: 1;
			font-size: 24upx;
			text-align: center;
			color: #101010;
			&:first-child {
				text-align: left;
			}
			&:last-child {
				text-align: right;
			}
			&--long {
				flex: 2;
			}

			&-title {
				color: #999999;
				margin-bottom: 15upx;
			}
		}
		&__msg {
			padding: 30upx;
			font-size: 24upx;
			color: #999999;

			text {
				color: #101010;
			}
		}

		&__header {
			@include flexBetween;
			color: #101010;
			margin-bottom: 30upx;
			align-items: flex-end;
			&-title {
				font-size: 32upx;
				margin-right: 15upx;
				font-weight: bold;
			}
			&-date {
				flex: 1;
				font-size: 20upx;
			}
			&-btn {
				color: #27aae1;
				font-size: 22upx;
				margin-left: 15upx;
			}
		}
	}

	.revocation {
		font-size: 28upx;
		color: $globalColor-blue;
		text-align: center;
		padding-bottom: 30upx;
	}
}
</style>
