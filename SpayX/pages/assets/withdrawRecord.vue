<template>
	<view class="page">
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.global.withdraw }}{{ i18n.global.record }}</view>
			<view class="header-empty"></view>
		</view>
		<view class="record-list">
			<view class="record-item" v-for="(item,index) in recordlist" :key="index" @click="recordDetail(item.id)">
				<view class="coin-plate">
					<view class="coin-line"></view>
					<view class="coin-text">{{item.currencyName}}</view>
				</view>
				<view class="title-item">
					<view class="item">{{ i18n.global.time }}</view>
					<view class="item">{{ i18n.global.quantity }}</view>
					<view class="item">{{ i18n.global.status }}</view>
				</view>
				<view class="count-item">
					<view class="item">{{item.createTime}}</view>
					<view class="item">{{item.quantity | number(2)}}</view>
					<view class="item">{{item.statusStr}}</view>
				</view>
				<view class="address-out">
					<view class="address">{{item.address}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordlist:[],
				pageNum:1,
				pageSize:20,
				pages:1,
				currencyId:0,
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			},
		},
		onLoad(option) {
			this.currencyId = option.currencyId;
		},
		onShow() {
			this.recordlist = [];
			this.getExtractlist();
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
			} else {
				this.pageNum++;
				this.getExtractlist();
			}
		},
		methods: {
			recordDetail(id) {
				uni.navigateTo({
					url: './recordDetail?id=' + id
				})
			},
			getExtractlist(){
				this.$Ajax('/front/financial/extractList',{
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					currencyId:this.currencyId
				},res=>{
					console.log(res);
					this.pages = res.obj.pages;
					this.recordlist = this.recordlist.concat(res.obj.list);
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {
		color: #FFFFFF;

		.header-plate {
			height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;

			.back-pic {
				width: 17rpx;
				height: 31rpx;

				image {
					width: 17rpx;
					height: 31rpx;
				}
			}

			.header-title {
				font-size: 36rpx;
				font-family: PingFang SC-Bold;
				font-weight: bold;
			}

			.header-empty {
				width: 17rpx;
			}
		}

		.record-list {
			.record-item {
				background-size: 100% 100%;
				background-position: center;
				background-repeat: no-repeat;
				height: 262rpx;
				width: 692rpx;
				background-image: url(../../static/assets/withdraw-record-bg.png);
				margin: auto;
				margin-top: 20rpx;
				.coin-plate {
					height: 88rpx;
					display: flex;
					align-items: center;
					padding: 0 30rpx;

					.coin-line {
						width: 8rpx;
						height: 32rpx;
						background: #00A2FF;
					}

					.coin-text {
						font-size: 32rpx;
						font-family: DIN;
						font-weight: 400;
						color: #FFFFFF;
						padding-left: 17rpx;
					}
				}

				.title-item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 24rpx;
					font-family: PingFang SC-Bold;
					font-weight: 400;
					color: #999999;
					padding: 0 30rpx;

					.item {
						flex: 1;
					}
				}

				.title-item>:first-child {
					flex: 1.7;
				}

				.title-item>:last-child {
					text-align: right;
				}

				.title-item>:nth-child(2) {
					text-align: center;
				}

				.count-item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 28rpx;
					font-family: PingFang SC-Bold;
					font-weight: 400;
					color: #FFFFFF;
					padding: 0 30rpx;

					.item {
						flex: 1;
					}
				}

				.count-item>:first-child {
					flex: 1.7;
				}

				.count-item>:last-child {
					text-align: right;
				}

				.count-item>:nth-child(2) {
					text-align: center;
				}

				.address-out {
					padding: 0 30rpx;

					.address {
						height: 80rpx;
						line-height: 80rpx;
						border-top: 1px dashed rgba(255, 255, 255, .1);
						font-size: 28rpx;
						font-family: DIN;
						font-weight: 400;
					}
				}
			}
		}
	}
</style>
