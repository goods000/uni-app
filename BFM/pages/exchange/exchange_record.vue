<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title initHeader-title--center">{{ currencyTradeName }} 记录</view>
			</view>
		</view>
		<view class="main">
			<view class="tabsBox">
				<view class="tabsBox-control">
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 0 }" @click="changeTabsActive(0)">当前委托</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 1 }" @click="changeTabsActive(1)">历史记录</view>
					<view class="tabsBox-control__item" :class="{ 'tabsBox-control__item--active': tabsActive == 2 }" @click="changeTabsActive(2)">交易记录</view>
				</view>
			</view>
			<view class="ticketBox">
				<view class="ticketBox-wrapper">
					<view class="initNoData" v-if="recordList.length == 0">暂无记录</view>
					<view class="ticketBox-list" v-for="(item, index) in recordList" :key="index" v-else>
						<view class="ticketBox-info">
							<view class="ticketBox-info__type" :class="item.tradeType == 0 ? 'ticketBox-info__type--buy' : 'ticketBox-info__type--sell'">
								{{ item.tradeTypeStr }}
							</view>
							<view class="ticketBox-info__content">
								<view class="ticketBox-info__content-label">{{ tabsActive != 2 ? item.tradeCurrencyName + '/' + item.currencyName : item.tradeName }}</view>
								<view class="ticketBox-info__content-date">{{ item.createTime }}</view>
							</view>
							<view class="ticketBox-info__button" v-show="tabsActive == 0"><view class="ticketBox-info__button-btn" @click="cancelOrder(item.id)">撤单</view></view>
						</view>
						<view class="ticketBox-itemBox">
							<view class="ticketBox-itemBox__wrapper">
								<view class="ticketBox-itemBox__item ticketBox-itemBox__item--long" v-if="tabsActive == 2">
									<view class="ticketBox-itemBox__item-label">时间</view>
									<view class="ticketBox-itemBox__item-data">{{ item.initOrderTime }}</view>
								</view>
								<view class="ticketBox-itemBox__item" v-if="tabsActive == 2">
									<view class="ticketBox-itemBox__item-label">方式</view>
									<view class="ticketBox-itemBox__item-data">限价</view>
								</view>
								<view class="ticketBox-itemBox__item">
									<view class="ticketBox-itemBox__item-label">{{ tabsActive != 2 ? '价格' : '成交价' }}({{ item.currencyName }})</view>
									<view class="ticketBox-itemBox__item-data">{{ tabsActive != 2 ? item.price : item.tradePrice | number(4) }}</view>
								</view>
								<view class="ticketBox-itemBox__item">
									<view class="ticketBox-itemBox__item-label">{{ tabsActive != 2 ? '委托数量' : '成交量' }}({{ item.tradeCurrencyName }})</view>
									<view class="ticketBox-itemBox__item-data">{{ tabsActive != 2 ? item.quantity : item.tradeQuantity | number(4) }}</view>
								</view>
								<view class="ticketBox-itemBox__item">
									<view class="ticketBox-itemBox__item-label">
										{{ tabsActive != 2 ? '实际成交' : '成交额' }}({{ item.tradeType == 0 ? item.currencyName : item.tradeCurrencyName }})
									</view>
									<view class="ticketBox-itemBox__item-data">
										{{ tabsActive != 2 ? item.tradeQuantity : (item.tradePrice * item.tradeQuantity) | number(4) }}
									</view>
								</view>
								<view class="ticketBox-itemBox__item" v-if="tabsActive == 2">
									<view class="ticketBox-itemBox__item-label">手续费({{ item.tradeType == 0 ? item.tradeCurrencyName : item.currencyName }})</view>
									<view class="ticketBox-itemBox__item-data">{{ item.charge }}</view>
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
			tabsActive: 0,
			currencyTradeName: '',
			tradeId: 1,

			recordList: [], //当前委托

			/* 页数控制 */
			pageNum: 1,
			pageSize: 8,
			pages: 0
		};
	},
	onReachBottom() {
		// this.isBottom = true;
		console.log('pageNum：' + this.pageNum + ' pages' + this.pages);
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底啦');
		} else {
			this.pageNum++;
			this.getNowEntrustList();
		}
	},
	onLoad(option) {
		this.currencyTradeName = option.value1;
		this.tradeId = option.value2;
	},
	onShow() {
		this.getRecord();
	},
	methods: {
		getRecord() {
			this.pageNum = 1;
			this.recordList = [];
			this.getNowEntrustList();
		},
		getNowEntrustList() {
			this.$Ajax(
				'/front/trade/infoList',
				{
					tradeId: this.tradeId,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					type: this.tabsActive //0：交易中 1历史记录 2交易记录
				},
				res => {
					if (res.code == 0) {
						console.log(JSON.stringify(res.obj));
						this.pages = res.obj.pages;
						let data = res.obj.list;
						data.forEach((item, index) => {
							let time = item.createTime;
							time = time.replace(/-/g, ':').replace(' ', ':');
							time = time.split(':');
							let itemDate = new Date(time[0], time[1] - 1, time[2], time[3], time[4], time[5]);

							let dataTime = '';
							let date = new Date(itemDate);
							console.log(date);

							let year = date.getFullYear();
							let month_temp = date.getMonth() + 1;
							let month = month_temp < 10 ? '0' + month_temp : month_temp;
							let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
							let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
							let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
							let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

							dataTime = hour + ':' + minute + ' ' + month + '/' + day;

							console.log(dataTime);
							item.initOrderTime = dataTime;

							if (this.tabsActive == 2) {
								let tradeNameData = item.tradeName.split('/');
								item.tradeCurrencyName = tradeNameData[0];
								item.currencyName = tradeNameData[1];
							}
						});

						this.recordList = this.recordList.concat(data);
					}
				}
			);
		},
		changeTabsActive(index) {
			if (this.tabsActive != index) {
				this.tabsActive = index;
				this.getRecord();
			}
		},
		// 撤单
		cancelOrder(id) {
			this.$Ajax(
				'/front/trade/cancel',
				{
					id: id
				},
				res => {
					if (res.code == 0) {
						this.$tools.toast('撤单成功');
						this.getRecord();
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.tabsBox {
	height: 140upx;
	padding: 30upx;
	border-bottom: 1upx solid #333333;
	&-control {
		@include flexLeft;
		align-items: flex-end;
		height: 100%;
		&__item {
			color: #c6c7d2;
			font-size: 32upx;
			margin-right: 15upx;
			@include initTransition(0.2);
			&--active {
				color: #ffffff;
				font-size: 52upx;
			}
		}
	}
}

// 记录总样式
.ticketBox {
	padding: 0 30upx;
	&-noData {
		padding: 30upx 0;
		font-size: 32upx;
		color: #999999;
	}
	&-list {
		padding: 30upx 0;
		border-bottom: 1upx solid #333333;
	}
	&-info {
		@include flexLeft;
		margin-bottom: 15upx;
		&__type {
			color: #FFFFFF;
			font-size: 24upx;
			padding: 15upx;
			border-radius: 8upx;
			margin-right: 15upx;
			font-weight: bold;
			&--buy {
				background-color: $globalColor-green;
			}
			&--sell {
				background-color: $globalColor-red;
			}
		}
		&__content {
			flex: 1;
			&-label {
				font-size: 28upx;
				color: #ffffff;
			}
			&-date {
				font-size: 24upx;
				color: #999b9e;
			}
		}

		&__button {
			margin-left: 15upx;
			&-btn {
				color: $globalColor-style;
				padding: 10upx 15upx;
				font-size: 28upx;
				border: 1upx solid $globalColor-style;
				border-radius: 8upx;
			}
		}
	}

	&-itemBox {
		// padding: 0 30upx;
		&__wrapper {
			@include flexCenter;
			@include calcMargin(15);
			flex-wrap: wrap;
			align-items: stretch;
			padding: 0 15upx;
		}
		&__item {
			// @include justifiedLayout;
			width: calc(100% / 3);
			padding: 15upx;

			text-align: center;

			&:nth-child(3n + 1) {
				text-align: left;
			}

			&:nth-child(3n + 3) {
				text-align: right;
			}

			&-label {
				color: #99999d;
				font-size: 24upx;
			}
			&-data {
				color: #ffffff;
				font-size: 28upx;
			}
		}
	}

	&-button {
		@include flexCenter;
		@include calcMargin(15);
		&__btn {
			@include flexCenter;
			flex: 1;
			background-color: #eef1f6;
			padding: 15upx 0;
			border-radius: 30upx;
			font-size: 32upx;
			margin: 15upx;
			color: #ffffff;

			&--blue {
				background-color: #3a79de;
				box-shadow: 2px 2px 20upx rgba(58, 121, 222, 0.5);
			}

			&--green {
				background-color: #00b8ae;
				box-shadow: 2px 2px 20upx rgba(0, 184, 174, 0.5);
			}
		}
	}
}
</style>
