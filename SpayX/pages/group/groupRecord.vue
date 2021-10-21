<template>
	<view class="page">
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.group.Crowdfunding_record }}</view>
			<view class="header-empty"></view>
		</view>
		<view class="title-plate">
			<view class="title-item" @click="changeTitle(1)">
				<view class="title-text" :class="{titleText:titleActive==1}">{{ i18n.group.Current_crowdfunding }}</view>
				<view class="title-line" :class="{titleLine:titleActive==1}"></view>
			</view>
			<view class="title-item" @click="changeTitle(0)">
				<view class="title-text" :class="{titleText:titleActive==0}">{{ i18n.group.Historical_crowdfunding }}</view>
				<view class="title-line" :class="{titleLine:titleActive==0}"></view>
			</view>
		</view>
		<view class="record-list">
			<view class="record-item" v-for="(item,index) in record" :key="index">
				<view class="coin-plate">
					<view class="coin-text">{{item.name}}{{item.index}}{{ i18n.group.Expect }}</view>
					<view class="coin-pic">
						<image v-if="item.status==1" :src="langType == 'en' ? '../../static/group/group-status-icon-en.png' : '../../static/group/group-status-icon.png'" mode=""></image>
						<image v-if="item.status==2" :src="langType == 'en' ? '../../static/group/group-status-icon1-en.png' : '../../static/group/group-status-icon1.png'" mode=""></image>
						<image v-if="item.status==3" :src="langType == 'en' ? '../../static/group/group-status-icon2-en.png' : '../../static/group/group-status-icon2.png'" mode=""></image>
					</view>
				</view>
				<view class="title-item">
					<view class="item">{{ i18n.global.quantity }}(USDT)</view>
					<view class="item">{{ i18n.group.income }}(SpayX)</view>
					<view class="item">{{ i18n.group.Deposit_time }}</view>
				</view>
				<view class="count-item">
					<view class="item">{{item.quantity}}</view>
					<!-- <view class="item" v-if="titleActive==1">0</view> -->
					<view class="item">{{item.profitPt}}</view>
					<view class="item">{{item.createTime}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleActive:1,
				pageSize:20,
				pageNum:1,
				pages:1,
				record:[],
				langType:''
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
			this.langType = uni.getStorageSync('initLanguage');
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
				this.record = [];
				this.pageNum = 1;
				this.titleActive = titleActive;
				this.getRecord();
			},
			getRecord(){
				this.$Ajax('/front/pdd/join/list',{
					type:this.titleActive,
					pageNum:this.pageNum,
					pageSize:this.pageSize
				},res=>{
					console.log(res);
					this.pages = res.obj.pages;
					this.record = this.record.concat(res.obj.list);
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
				height: 214rpx;
				width: 692rpx;
				background-image: url(../../static/group/group-record-bg.png);
				margin: auto;
				margin-bottom: 20rpx;
				.coin-plate{
					height: 88rpx;
					display: flex;
					align-items: center;
					padding: 0 30rpx;
					.coin-text{
						font-size: 32rpx;
						font-family: DIN;
						font-weight: 500;
						color: #FFFFFF;
						padding-right: 23rpx;
					}
					.coin-pic{
						width: 94rpx;
						height: 30rpx;
						image{
							width: 94rpx;
							height: 30rpx;
						}
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
					flex: 1;
				}
				.title-item>:last-child{
					text-align: right;
					flex: 1.8;
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
					flex: 1;
				}
				.count-item>:last-child{
					text-align: right;
					flex: 1.8;
				}
				.count-item>:nth-child(2){
					text-align: center;
				}
			}
		}
	}
</style>
