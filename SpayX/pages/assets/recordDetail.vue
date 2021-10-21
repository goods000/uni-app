<template>
	<view class="page">
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.global.record }}{{ i18n.global.details }}</view>
			<view class="header-empty"></view>
		</view>
		<view class="detail-coin-bg">
			<view class="detail-coin-plate">
				<view class="plate-left">
					<view class="coin-line"></view>
					<view class="coin-text">{{ i18n.global.withdraw }}{{currencyName}}</view>
				</view>
				<view class="plate-right">{{quantity | number(2)}}</view>
			</view>
		</view>
		<view class="detail-plate">
			<view class="detail-item">
				<view class="item-title">{{ i18n.global.status }}</view>
				<view class="item-count-text">{{statusStr}}</view>
			</view>
			<view class="detail-item">
				<view class="item-title">{{ i18n.global.withdraw }}{{ i18n.global.address }}</view>
				<view class="item-count-yellow">{{address}}</view>
			</view>
			<view class="detail-item">
				<view class="item-title">{{ i18n.global.Transaction_hash }}</view>
				<view class="item-count">{{hash}}</view>
			</view>
			<view class="detail-item">
				<view class="item-title">{{ i18n.global.serviceCharge }}</view>
				<view class="item-count">{{rate}} {{currencyName}}</view>
			</view>
			<view class="detail-item">
				<view class="item-title">{{ i18n.global.time }}</view>
				<view class="item-count">{{createTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:1,
				currencyName:'',
				quantity:0,
				statusStr:'',
				address:'',
				hash:'',
				createTime:'',
				rate:0,
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			},
		},
		onLoad(option) {
			this.id = option.id;
		},
		onShow() {
			this.getDetail();
		},
		methods:{
			getDetail(){
				this.$Ajax('/front/financial/detailInfo',{
					type:2,
					id:this.id
				},res=>{
					console.log(res);
					this.currencyName = res.obj.currencyName;
					this.quantity = res.obj.quantity;
					this.statusStr = res.obj.statusStr;
					this.address = res.obj.address;
					this.hash = res.obj.hash;
					this.createTime = res.obj.createTime;
					this.rate = res.obj.rate;
				})
			},
		}
	}
</script>

<style lang="scss">
	.page{
		color: #FFFFFF;
		.header-plate{
			height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			.back-pic{
				width: 17rpx;
				height: 31rpx;
				image{
					width: 17rpx;
					height: 31rpx;
				}
			}
			.header-title{
				font-size: 36rpx;
				font-family: PingFang SC-Bold;
				font-weight: bold;
			}
			.header-empty{
				width: 17rpx;
			}
		}
		.detail-coin-bg{
			background-size: 100% 100%;
			background-position: center;
			background-repeat: no-repeat;
			height: 112rpx;
			width: 692rpx;
			background-image: url(../../static/assets/record-detail-bg.png);
			margin: auto;
			.detail-coin-plate{
				height: 112rpx;
				padding: 0 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.plate-left{
					display: flex;
					align-items: center;
					.coin-line{
						width: 8rpx;
						height: 32rpx;
						background: #00A2FF;
					}
					.coin-text{
						font-size: 32rpx;
						font-family: DIN;
						font-weight: 400;
						color: #FFFFFF;
						padding-left: 17rpx;
					}
				}
				.plate-right{
					font-size: 32rpx;
					font-family: DIN;
					font-weight: bold;
					color: #F0C31F;
				}
			}
		}
		.detail-plate{
			padding: 40rpx 30rpx;
			.detail-item{
				height: 75rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.item-title{
					font-size: 28rpx;
					font-family: PingFang SC-Bold;
					font-weight: 400;
					color: #999999;
					flex: 1;
				}
				.item-count{
					font-size: 28rpx;
					font-family: DIN;
					font-weight: 500;
					color: #FFFFFF;
					flex: 1;
					text-align: right;
					word-break: break-all;
				}
				.item-count-text{
					font-size: 28rpx;
					font-family: PingFang SC-Bold;
					font-weight: 500;
					flex: 1;
					text-align: right;
				}
				.item-count-yellow{
					font-size: 28rpx;
					font-family: DIN;
					font-weight: 500;
					color: #F0C31F;
					flex: 1;
					text-align: right;
				}
			}
		}
	}
</style>
