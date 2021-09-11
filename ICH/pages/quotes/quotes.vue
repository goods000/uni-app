<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper"><view class="initHeader-title" @click="$tools.jump('../quotes/demo')">市场行情</view></view>
		</view>

		<view class="quotesBox">
			<view class="quotesBox-wrapper">
				<view class="quotesBox-header">
					<view class="quotesBox-data quotesBox-data--long"><text>交易对</text></view>
					<view class="quotesBox-data">最新价</view>
					<view class="quotesBox-data">涨跌幅</view>
				</view>
				<view class="quotesBox-list" v-for="(item, index) in commTradeList" :key="index" @click="goKline(item.tradeId, item.tradeCurrencyName, item.currencyName)">
					<view class="quotesBox-data quotesBox-data--long">
						<view class="quotesBox-icon"><image :src="item.pic" mode="widthFix"></image></view>
						<view class="quotesBox-info">
							<view class="quotesBox-info__title">
								<text class="hidelight">{{ item.tradeCurrencyName }}</text>
								<text>/{{ item.currencyName }}</text>
							</view>
							<view class="quotesBox-info__data">24H量 {{ item.tradeNums | number(4) }}</view>
						</view>
					</view>
					<view class="quotesBox-data">
						<view class="quotesBox-info">
							<view class="quotesBox-info__title">
								<text class="hidelight">{{ item.currentPrice | number(4) }}</text>
							</view>
							<view class="quotesBox-info__data">￥{{ item.usdtPirce * item.currentPrice | number(2) }}CNY</view>
						</view>
					</view>
					<view class="quotesBox-data">
						<view class="quotesBox-button">
							<view class="quotesBox-button__btn" :class="{ 'quotesBox-button__btn--down': item.riseType == 1, 'quotesBox-button__btn--up': item.riseType == 0 }">
								<text>{{ item.rise }}%</text>
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
			commTradeList: [],
			usdtPrice: 0
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getCommTradeList();
		},
		getCommTradeList() {
			this.$Ajax('/search/allCommTradeBB', {}, res => {
					// console.log(JSON.stringify(res.obj));
				if (res.code == 0) {
					this.commTradeList = res.obj;
					this.commTradeList.forEach(item => {
						if (Number(item.rise) > 0) {
							item.riseType = 0;
						} else if (Number(item.rise) < 0) {
							item.riseType = 1;
						}
						item.cnyPrice = (item.currentPrice * this.usdtPrice).toFixed(2);
					});
				}
			});
		},
		goKline(tradeId, currencyTradeName, currencyName) {
			let that = this;
			
			// #ifdef H5
			uni.setStorageSync('tradeId', tradeId);
			that.$tools.switchTab('../exchange/exchange');
			// #endif
			
			// #ifdef APP-PLUS
			uni.setStorageSync('tradeId', tradeId);
			const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');
			dcRichAlert.show(
				{
					type: '1',
					isbb: '1',
					tradeId: tradeId,
					title: currencyTradeName,
					currencyName: currencyName
				},
				result => {
					// that.$tools.toast('接受回调');
					that.$tools.switchTab('../exchange/exchange');
				}
			);
			// #endif
		}
	}
};
</script>

<style lang="scss" scoped>
.quotesBox {
	border-top: 12upx solid #eef1f6;

	&-wrapper {
		padding: 0 30upx;
	}

	&-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #acb1b0;
		font-size: 20upx;
		padding: 15upx 0;

		.quotesBox-data--long {
			text {
				padding-left: 70upx;
			}
		}
	}
	&-data {
		flex: 1;
		text-align: center;
		padding: 15upx 0;
		display: flex;
		font-size: 24upx;
		justify-content: flex-start;
		align-items: center;

		&--long {
			flex: 2;
		}

		&:first-child {
			text-align: left;
			justify-content: flex-start;
		}

		&:last-child {
			text-align: right;
			justify-content: flex-end;
		}
	}

	&-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15upx 0;
		border-bottom: 1upx solid #c6d2e4;
	}

	&-icon {
		margin-right: 10upx;
		image {
			width: 60upx;
		}
	}

	&-info {
		text-align: left;

		&__title {
			color: #898d8c;
			font-size: 24upx;
			.hidelight {
				color: #101010;
				font-size: 28upx;
			}
		}
		&__data {
			color: #898d8c;
			font-size: 24upx;
		}
	}
	&-button {
		// width: 100%;
		@include flexRight;
		&__btn {
			@include flexCenter;
			padding: 15upx 30upx;
			border-radius: 10upx;
			color: #ffffff;
			font-size: 28upx;
			width: 160upx;
			background-color: #999999;
			&--up {
				background-color: $globalColor-green;
			}
			&--down {
				background-color: $globalColor-red;
			}
		}
	}
}
</style>
