<template>
	<view class="pages">
		<view class="initHeader initHeader--fixed initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">财务记录</view>
			</view>
		</view>
		<view class="main">
			<!-- <view class="infoBox">
				<view class="infoBox-wrapper">
					<view class="infoBox-title">{{ currencyInfoList.currencyName }}</view>
					<view class="infoBox-itemBox">
						<view class="infoBox-itemBox__item">
							<view class="infoBox-itemBox__item-label">可用</view>
							<view class="infoBox-itemBox__item-data">{{ currencyInfoList.using | number(4) }}</view>
						</view>
						<view class="infoBox-itemBox__item">
							<view class="infoBox-itemBox__item-label">冻结</view>
							<view class="infoBox-itemBox__item-data">{{ currencyInfoList.freeze | number(4) }}</view>
						</view>
						<view class="infoBox-itemBox__item">
							<view class="infoBox-itemBox__item-label">折合(CNY)</view>
							<view class="infoBox-itemBox__item-data">{{ currencyInfoList.cny | number(2) }}</view>
						</view>
					</view>
				</view>
			</view> -->
			<!-- <view class="infoBox">
				<view class="infoBox-wrapper">
					<view class="infoBox-title">USDT</view>
					<view class="infoBox-itemBox">
						<view class="infoBox-itemBox__item">
							<view class="infoBox-itemBox__item-label">可用</view>
							<view class="infoBox-itemBox__item-data">0.000000</view>
						</view>
						<view class="infoBox-itemBox__item">
							<view class="infoBox-itemBox__item-label">冻结</view>
							<view class="infoBox-itemBox__item-data">0.000000</view>
						</view>
						<view class="infoBox-itemBox__item">
							<view class="infoBox-itemBox__item-label">折合(CNY)</view>
							<view class="infoBox-itemBox__item-data">0.000000</view>
						</view>
					</view>
				</view>
			</view> -->
			<view class="listBox">
				<view class="listBox-wrapper">
					<!-- <view class="listBox-title">财务记录</view> -->
					<view class="initNoData" v-show="currencyLogList.length == 0">暂无记录</view>
					<view class="listBox-list" v-for="(item, index) in currencyLogList" :key="index">
						<view class="listBox-list__title">{{ item.typeStr }}</view>
						<view class="listBox-itemBox">
							<view class="listBox-itemBox__item listBox-itemBox__item--long">
								<view class="listBox-itemBox__item-label">时间</view>
								<view class="listBox-itemBox__item-data">{{ item.createTime }}</view>
							</view>
							<view class="listBox-itemBox__item">
								<view class="listBox-itemBox__item-label">数量</view>
								<view class="listBox-itemBox__item-data">{{ item.money | number(4) }}</view>
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
			parentType: 1, //类型【1币币，2=节点，3=矿池，4=收益】
			currencyInfoList: [],
			currencyLogList: [],
			pageNum: 1,
			pageSize: 20,
			pages: 1
		};
	},
	onLoad(hash) {
		this.currencyId = hash.value1;
		this.parentType = hash.value2;
	},
	onShow() {
		this.init();
	},
	onReachBottom() {
		if (this.pageNum >= this.pages) {
			return this.$tools.toast('到底了');
		}else{
			this.pageNum++;
			this.getCurrencyLog();
		}
	},
	methods: {
		init() {
			this.currencyInfoList =[];
			this.currencyLogList =[];
			
			// this.getCurrencyInfo();
			this.getCurrencyLog();
		},
		getCurrencyInfo() {
			this.$Ajax(
				'/front/financial/assetsByCurrency',
				{
					assetType: this.assetType, //1 币币  2合约
					currencyId: this.currencyId,
					pageSize: this.pageSize,
					pageNum: this.pageNum
				},
				res => {
					if (res.code == 0) {
						console.log(JSON.stringify(res.obj));
						this.currencyInfoList = res.obj.wallet;
					}
				}
			);
		},
		getCurrencyLog() {
			this.$Ajax(
				'/front/financial/getLog',
				{
					currencyId: this.currencyId,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					parentType: this.parentType
				},
				res => {
					console.log(JSON.stringify(res));
					if(res.code == 0){
						this.pages = res.obj.pages;
						this.currencyLogList = this.currencyLogList.concat(res.obj.list);
					}
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
	padding: 30upx;
	&-wrapper {
		padding-bottom: 30upx;
		border-bottom: 1upx solid #333333;
	}
	&-title {
		color: #FFFFFF;
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
				color: #ffffff;
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
	&-wrapper {
		padding: 0 30upx;
	}
	&-title {
		color: #ffffff;
		font-size: 36upx;
		margin-bottom: 15upx;
		@include initBeforeHolder;
	}

	&-noData {
		color: #99999d;
		font-size: 32upx;
	}

	&-list {
		padding: 30upx 0;
		&__title {
			color: #ffffff;
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
				color: #999999;
				font-size: 24upx;
			}

			&-data {
				color: #ffffff;
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
			color: #ffffff;
			font-size: 20upx;
		}
	}
}
</style>
