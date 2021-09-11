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
					<view class="infoBox-title">{{ assetType != 3 && assetType != 4 ? currencyInfoList.currencyName : 'USDT' }}</view>
					<view class="infoBox-itemBox">
						<view class="infoBox-itemBox__item">
							<view class="infoBox-itemBox__item-label">可用</view>
							<view class="infoBox-itemBox__item-data" v-if="assetType != 4">{{ assetType != 3 && assetType != 4 ? currencyInfoList.using : currencyInfoList.otcUsing | number(4) }}</view>
							<view class="infoBox-itemBox__item-data" v-else>{{ currencyInfoList.bondUsing | number(4) }}</view>
						</view>
						<view class="infoBox-itemBox__item">
							<view class="infoBox-itemBox__item-label">冻结</view>
							<view class="infoBox-itemBox__item-data">
								{{ assetType != 3 && assetType != 4 ? currencyInfoList.freeze : currencyInfoList.otcFreeze | number(4) }}
							</view>
						</view>
						<view class="infoBox-itemBox__item">
							<view class="infoBox-itemBox__item-label">折合(CNY)</view>
							<view class="infoBox-itemBox__item-data">{{ currencyInfoList.cny | number(2) }}</view>
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
							<view class="listBox-itemBox__item">
								<view class="listBox-itemBox__item-label">数量</view>
								<view class="listBox-itemBox__item-data">{{ item.money }}</view>
							</view>
							<!-- <view class="listBox-itemBox__item listBox-itemBox__item--long">
								<view class="listBox-itemBox__item-label">备注</view>
								<view class="listBox-itemBox__item-data">{{ item.remark }}</view>
							</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="fixedBox-item">
					<view class="fixedBox-item__icon"><image src="../../static/assets/icon-info-exchange.png" mode="widthFix"></image></view>
					<view class="fixedBox-item__label">划转</view>
				</view>
				<view class="fixedBox-item">
					<view class="fixedBox-item__icon"><image src="../../static/assets/icon-info-transaction.png" mode="widthFix"></image></view>
					<view class="fixedBox-item__label">法币交易</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			assetType: 1,

			currencyInfoList: [],
			currencyLogList: [],
			pageNum: 1,
			pageSize: 20,
			pages: 1
		};
	},
	onLoad(hash) {
		this.currencyId = hash.value1;
		this.assetType = hash.value2;
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底了');
		}
		this.pageNum++;
		this.getCurrencyLog();
	},
	methods: {
		init() {
			console.log(this.assetType);

			if (this.assetType != 3 && this.assetType != 4) {
				this.getCurrencyInfo();
			} else {
				var type = 1;
				if(this.assetType == 3){
					type = 1;
				}else if(this.assetType == 4){
					type = 2;
				}
				this.getOtherAssetsList(type);
			}
			
			if(this.assetType != 4){
				this.getCurrencyLog();
			}
		},
		getCurrencyInfo() {
			console.log('币币合约');
			this.$Ajax(
				'/front/financial/assetsByCurrency',
				{
					assetType: this.assetType, //1 币币  2合约
					currencyId: this.currencyId,
					pageSize: this.pageSize,
					pageNum: this.pageNum
				},
				res => {
					console.log(JSON.stringify(res.obj));
					if (res.code == 0) {
						this.currencyInfoList = res.obj.wallet;
					}
				}
			);
		},
		getOtherAssetsList(type) {
			console.log('法币矿池');
			this.$Ajax(
				'/front/financial/other/assets',
				{
					type: type
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.currencyInfoList = res.obj.list[0];
						// this.otherAssetsList = res.obj;
						// this.currencyList = res.obj.list;
					}
				}
			);
		},
		getCurrencyLog() {
			this.$Ajax(
				'/front/financial/getLog',
				{
					assetType: this.assetType, //1 币币  2合约
					currencyId: this.currencyId,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				res => {
					if (res.code == 0) {
						var list = res.obj.list;
						console.log(JSON.stringify(res.obj));
						this.currencyLogList = this.currencyLogList.concat(list);
					}
					this.pages = res.obj.pages;
				}
			);
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
