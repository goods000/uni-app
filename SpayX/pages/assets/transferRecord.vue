<template>
	<view class="page">
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.global.transfer }}{{ i18n.global.record }}</view>
			<view class="header-empty"></view>
		</view>
		<view class="title-plate">
			<view class="title-item" @click="changeTitle(0)">
				<view class="title-text" :class="{titleText:titleActive==0}">{{ i18n.assets.tranfter_out }}</view>
				<view class="title-line" :class="{titleLine:titleActive==0}"></view>
			</view>
			<view class="title-item" @click="changeTitle(1)">
				<view class="title-text" :class="{titleText:titleActive==1}">{{ i18n.assets.tranfter_enter }}</view>
				<view class="title-line" :class="{titleLine:titleActive==1}"></view>
			</view>
		</view>
		<view class="record-list">
			<view class="record-item" v-for="(item,index) in recordlist" :key="index">
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
					<view class="item">{{ i18n.assets.Successful_transfer }}</view>
				</view>
				<view class="address-out">
					<view class="address" v-if="titleActive==0">{{ i18n.assets.account_01 }}：<text>{{item.targetAccount}}</text></view>
					<view class="address" v-if="titleActive==1">{{ i18n.assets.account_01 }}：<text>{{item.sourceAccount}}</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleActive:0,
				pageNum:1,
				pageSize:20,
				pages:1,
				recordlist:[],
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			},
		},
		onLoad() {
			
		},
		onShow() {
			this.getRecord();
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
			} else {
				this.pageNum++;
				this.getRecord();
			}
		},
		methods:{
			changeTitle(titleActive){
				this.recordlist = [];
				this.pageNum = 1;
				this.titleActive = titleActive;
				this.getRecord();
			},
			getRecord(){
				this.$Ajax('/front/financial/transfer/list',{
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					direction:this.titleActive
				},res=>{
					this.pages = res.obj.pages;
					this.recordlist = this.recordlist.concat(res.obj.list);
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
		.title-plate{
			display: flex;
			align-items: center;
			border-bottom: 1px solid #2B3A5B;
			.title-item{
				flex: 1;
				text-align: center;
				.title-text{
					font-size: 28rpx;
					font-family: PingFang SC-Bold;
					font-weight: 500;
					padding-bottom: 15rpx;
				}
				.titleText{
					color: #FFCF1E;
				}
				.title-line{
					width: 56rpx;
					height: 6rpx;
					margin: auto;
				}
				.titleLine{
					background: #FFCF1E;
				}
			}
		}
		.record-list{
			padding-top: 30rpx;
			.record-item{
				background-size: 100% 100%;
				background-position: center;
				background-repeat: no-repeat;
				height: 262rpx;
				width: 692rpx;
				background-image: url(../../static/assets/withdraw-record-bg.png);
				margin: auto;
				.coin-plate{
					height: 88rpx;
					display: flex;
					align-items: center;
					padding: 0 30rpx;
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
				.title-item{
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 24rpx;
					font-family: PingFang SC-Bold;
					font-weight: 400;
					color: #999999;
					padding: 0 30rpx;
					.item{
						flex: 1;
					}
				}
				.title-item>:first-child{
					flex: 1.7;
				}
				.title-item>:last-child{
					text-align: right;
				}
				.title-item>:nth-child(2){
					text-align: center;
				}
				.count-item{
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 28rpx;
					font-family: PingFang SC-Bold;
					font-weight: 400;
					color: #FFFFFF;
					padding: 0 30rpx;
					.item{
						flex: 1;
					}
				}
				.count-item>:first-child{
					flex: 1.7;
				}
				.count-item>:last-child{
					text-align: right;
				}
				.count-item>:nth-child(2){
					text-align: center;
				}
				.address-out{
					padding: 0 30rpx;
					.address{
						height: 80rpx;
						line-height: 80rpx;
						border-top: 1px dashed rgba(255,255,255,.1);
						font-size: 28rpx;
						font-weight: 400;
						font-family: PingFang SC-Bold;
						color: #666666;
						text{
							font-family: DIN;
							color: #FFFFFF;
						}
					}
				}
			}
		}
	}
</style>
