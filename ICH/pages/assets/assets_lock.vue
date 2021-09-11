<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--bgWhite initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">财务记录</view>
			</view>
		</view>
		<view class="main">
			<view class="infoBox">
				<view class="infoBox-wrapper">
					<view class="infoBox-title">{{ currencyInfoList.currencyName }}</view>
					<view class="infoBox-itemBox">
						<view class="infoBox-itemBox__item">
							<view class="infoBox-itemBox__item-label">{{ type == 1 ? '冻结' : '总返还(USDT)' }}</view>
							<view class="infoBox-itemBox__item-data">{{ type == 1 ? currencyInfoList.freeze : currencyInfoList.total }}</view>
						</view>
						<view class="infoBox-itemBox__item">
							<view class="infoBox-itemBox__item-label">{{ type == 1 ? '总量' : '已返还(ICH)' }}</view>
							<view class="infoBox-itemBox__item-data">{{ type == 1 ? currencyInfoList.total : currencyInfoList.release  }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-title">财务记录</view>
					<view class="listBox-noData" v-if="currencyLogList.length == 0">暂无记录</view>
					<view class="listBox-list" v-for="(item, index) in currencyLogList" :key="index" v-else>
						<view class="listBox-list__title">{{ item.typeStr }}</view>
						<view class="listBox-itemBox">
							<view class="listBox-itemBox__item listBox-itemBox__item--long">
								<view class="listBox-itemBox__item-label">时间</view>
								<view class="listBox-itemBox__item-data">{{ item.createTime }}</view>
							</view>
							<!-- <view class="listBox-itemBox__item">
								<view class="listBox-itemBox__item-label">数量</view>
								<view class="listBox-itemBox__item-data">{{ item.money }}</view>
							</view> -->
							<view class="listBox-itemBox__item listBox-itemBox__item--long">
								<view class="listBox-itemBox__item-label">数量</view>
								<view class="listBox-itemBox__item-data">{{ item.quantity }}</view>
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
			assetType: 1,

			currencyInfoList: [],
			currencyLogList: [],
			type: 1,

			pageNum: 1,
			pageSize: 20,
			pages: 1
		};
	},
	onLoad(hash) {
		this.type = hash.value1;
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		console.log('pageNum：' + this.pageNum + ' pages' + this.pages);
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底啦');
		} else {
			this.pageNum++;
			this.getCurrencyLog();
		}
	},
	methods: {
		init() {
			this.getCurrencyInfo();
			this.getCurrencyLog();
		},
		getCurrencyInfo() {
			this.$Ajax(
				'/front/financial/lock',
				{
					type: this.type
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.currencyInfoList = res.obj;
					}
				}
			);
		},
		getCurrencyLog() {
			if (this.type == 1) {
				this.$Ajax(
					'/front/lock/bbRelease',
					{
						pageNum: this.pageNum,
						pageSize: this.pageSize
					},
					res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							var data = res.obj.list;
							this.currencyLogList = this.currencyLogList.concat(data);
						}
					}
				);
			} else {
				this.$Ajax(
					'/front/lock/hyRelease',
					{
						pageNum: this.pageNum,
						pageSize: this.pageSize
					},
					res => {
						if (res.code == 0) {
							this.pages = res.obj.pages;
							var data = res.obj.list;
							this.currencyLogList = this.currencyLogList.concat(data);
						}
					}
				);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.infoBox {
	position: relative;
	z-index: 1;
	padding: 30upx 0;
	border-bottom: 12upx solid #f7f8fc;
	&-wrapper {
		padding: 0 30upx;
	}
	&-title {
		color: #0185f0;
		font-size: 52upx;
		margin-bottom: 30upx;
		font-weight: bold;
	}
	&-itemBox {
		@include flexCenter;

		&__item {
			@include justifiedLayout;
			flex: 1;

			&--long {
				flex: 2;
			}

			&-label {
				color: #99999d;
				font-size: 24upx;
			}

			&-data {
				color: #101010;
				font-size: 28upx;
			}
			&:last-child {
				text-align: right;
			}
		}
	}
}

.listBox {
	position: relative;
	z-index: 1;
	padding: 30upx 0;
	&-wrapper {
		padding: 0 30upx;
	}
	&-title {
		color: #101010;
		font-size: 36upx;
		margin-bottom: 15upx;
	}

	&-noData {
		color: #99999d;
		font-size: 32upx;
	}

	&-list {
		padding: 30upx 0;
		border-bottom: 1upx solid #c6d2e4;
		&__title {
			color: #101010;
			font-size: 32upx;
			margin-bottom: 15upx;
		}
	}

	&-itemBox {
		@include flexCenter;
		&__item {
			@include justifiedLayout;
			flex: 1;

			&--long {
				flex: 2;
			}

			&-label {
				color: #99999d;
				font-size: 24upx;
			}

			&-data {
				color: #101010;
				font-size: 24upx;
			}
			&:last-child {
				text-align: right;
			}
		}
	}
}

.fixedBox {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: #ffffff;
	z-index: 9;
	box-shadow: 0upx 1upx 20upx rgba(0, 0, 0, 0.5);

	&-wrapper {
		@include flexCenter;
	}
	&-item {
		padding: 30upx;
		text-align: center;
		&__icon {
			width: 80upx;
			@include fullImage;
		}

		&__label {
			color: #101010;
			font-size: 20upx;
		}
	}
}
</style>
