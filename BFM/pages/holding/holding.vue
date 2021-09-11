<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<!-- <view class="initHeader-title">公募</view> -->
				<!-- <view class="initHeader-record" @click="$tools.jump('../pledge/pledge_record')"></view> -->
			</view>
		</view>

		<view class="bgBox"><image src="../../static/holding/img-bg-style-01.jpg" mode="widthFix"></image></view>

		<view class="cardBox">
			<view class="cardBox-wrapper">
				<view class="cardBox-title">收益发放规则</view>
				<view class="ruleBox">
					<view class="ruleBox-wrapper">
						<view class="ruleBox-left">
							<view class="ruleBox-label">周期</view>
							<view class="ruleBox-label">利息</view>
						</view>
						<view class="ruleBox-right">
							<view class="ruleBox-list ruleBox-list--header">
								<view class="ruleBox-list__data" v-for="(item, index) in holdingList" :key="index">{{ item.days }}天</view>
							</view>
							<view class="ruleBox-list ruleBox-list--body">
								<view class="ruleBox-list__data" v-for="(item, index) in holdingList" :key="index">{{ item.rate * 100 }}%</view>
							</view>
						</view>
					</view>
				</view>

				<view class="cardBox-title">持币记录</view>

				<view class="recordBox">
					<!-- <view class="recordBox-wrapper"> -->
					<scroll-view class="recordBox-wrapper" scroll-y="true" @scrolltolower="scrolltolower">
						<!-- <view class="recordBox-noData" v-if="orderList.length == 0">暂无记录</view> -->
						<view class="recordBox-list" v-for="(item, index) in 10" :key="index" @click="$tools.jump('../holding/holding_detail')">
							<view class="recordBox-list__info">
								<view class="recordBox-list__content">
									<view class="recordBox-list__title">持币生息3天</view>
									<view class="recordBox-list__status">计息中</view>
								</view>
								<view class="recordBox-list__more"></view>
							</view>
							<view class="recordBox-itemBox">
								<view class="recordBox-itemBox__item recordBox-itemBox__item--long">
									<view class="recordBox-itemBox__item-label">存入时间</view>
									<view class="recordBox-itemBox__item-data">2020.11.10 15:15</view>
								</view>
								<view class="recordBox-itemBox__item">
									<view class="recordBox-itemBox__item-label">存入数量(BK)</view>
									<view class="recordBox-itemBox__item-data recordBox-itemBox__item-data--highlight">1000</view>
								</view>
								<view class="recordBox-itemBox__item">
									<view class="recordBox-itemBox__item-label">累计收益(BK)</view>
									<view class="recordBox-itemBox__item-data recordBox-itemBox__item-data--highlight">54.3724</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<!-- </view> -->
				</view>
			</view>
		</view>

		<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="$tools.jump('../holding/holding_input')">去存入</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			holdingList: [],
			holdingRecord: [],
			
			id: null,
			using: 0,
			amount: '',
			tradePwd: '',

			timer: null,
			time: 1604646791000,
			endTime: 0,
			day: 0,
			hour: 0,
			minute: 0,
			second: 0
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getHoldingList();
			this.getHoldingRecord();
			// this.getUsing();
		},
		getHoldingList() {
			this.$Ajax('/front/deposit/do/selectHoldInterest', {}, res => {
				console.log('持币生息列表：' + JSON.stringify(res));
				if (res.code == 0) {
					this.holdingList = res.obj;
				}
			});
		},
		getHoldingRecord() {
			this.$Ajax('/front/deposit/do/getDepositBK', {
				transType: 8
			}, res => {
				console.log('持币生息记录：' + JSON.stringify(res));
				if (res.code == 0) {
					this.holdingRecord = res.obj;
				}
			});
		},
		getUsing() {
			this.$Ajax(
				'/front/financial/currency/wallet',
				{
					currencyName: 'USDT'
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.using = res.obj.using;
					}
				}
			);
		},
		confirmOrder() {
			if (this.amount == '') {
				return this.$tools.toast('请输入认购数量');
			}
			this.$Ajax(
				'/front/offering/join/do',
				{
					id: this.id,
					amount: this.amount
				},
				res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.$tools.toast('认购成功');
						this.getUsing();
						this.amount = '';
					}
				}
			);
		},
		scrolltolower() {
			console.log('到底了');
		},
		/* 弹出框公用 */
		openPopup(e) {
			this.$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		},
		changePopup(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
			if (!e.show) {
				// this.tradePwd = '';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.bgBox {
	@include fullImage;
	width: 100%;
	overflow: hidden;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 0;
}

.cardBox {
	position: relative;
	z-index: 1;
	padding: 30upx;
	padding-top: 440upx;

	&-wrapper {
		background-color: #142224;
		border-radius: 30upx;
		padding: 30upx;
	}

	&-title {
		@include initBeforeHolder;
		color: #ffffff;
		font-size: 28upx;
		font-weight: bold;
		position: relative;
		margin-bottom: 15upx;
	}
}

.ruleBox {
	// padding: 0 30upx;
	margin-bottom: 30upx;

	&-wrapper {
		@include flexLeft;
		align-items: stretch;
		// padding: 30upx 0;
		// border-bottom: 4upx solid #666666;
		// padding-bottom: 30upx;
	}

	&-left {
		@include flexCenterColumn;
		margin-right: 30upx;
	}

	&-right {
		flex: 1;
	}

	&-label {
		@include flexCenterColumn;
		flex: 1;
		color: #ffffff;
		font-size: 20upx;
	}

	&-list {
		@include flexCenter;
		padding: 15upx 0;

		&--header {
			color: #999999;
			font-size: 20upx;
			@include flexCenter;
		}

		&--body {
			color: $globalColor-style;
			font-size: 30upx;
			@include flexCenter;
		}

		&__data {
			flex: 1;
			text-align: center;
		}
	}
}

.recordBox {
	&-wrapper {
		height: 420upx;
	}

	&-list {
		padding: 30upx 0;
		border-bottom: 1upx solid #666666;

		&:last-child {
			border-bottom: 0;
		}

		&__info {
			@include flexBetween;
			margin-bottom: 30upx;
		}
		&__content {
			@include flexLeft;
		}

		&__title {
			color: #ffffff;
			font-size: 28upx;
			margin-right: 15upx;
			font-weight: bold;
		}

		&__status {
			color: #00080b;
			font-size: 20upx;
			padding: 4upx 12upx;
			border-bottom-left-radius: 20upx;
			border-top-right-radius: 20upx;
			@include initGradBg;
		}

		&__more {
			width: 40upx;
			height: 40upx;
			background: url(../../static/public/icon-listMore-green.png) no-repeat;
			background-size: 40upx 40upx;
			background-position: center center;
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
				margin-bottom: 15upx;
			}

			&-data {
				color: #ffffff;
				font-size: 28upx;
				font-weight: bold;
				&--highlight {
					color: $globalColor-style;
				}
			}
		}
	}
}

.initButton {
	position: relative;
	z-index: 1;
	padding: 0 30upx 30upx;
	margin-top: 60upx;
}
</style>
