<template>
	<view class="page">
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.assets.my_assets }}</view>
			<view class="header-empty"></view>
		</view>
		<view class="team-bg-out">
			<view class="team-bg">
				<view class="canuse">{{currencyName}}{{ i18n.global.using }}{{ i18n.global.number }}({{currencyName}})</view>
				<view class="using">{{quantity}}</view>
				<view class="using-cny">≈{{cny}}CNY</view>
				<view class="profit-title-item">
					<view class="profit-title">{{ i18n.assets.tips_01 }}({{currencyName}})</view>
					<view class="profit-title">{{ i18n.assets.tips_02 }}({{currencyName}})</view>
				</view>
				<view class="profit-count-item">
					<view class="profit-count">{{today}}</view>
					<view class="profit-count">{{total}}</view>
				</view>
			</view>
		</view>
		<!-- <view class="bg-empyt" v-if="currencyName!='USDT'"></view>
		<view class="assets-menu-list" v-if="currencyName == 'USDT'"> -->
		<view class="assets-menu-list">
			<view class="menu-item-out" @click="recharge()">
				<view class="menu-item">
					<view class="item-pic">
						<image src="../../static/assets/recharge-icon.png" mode=""></image>
					</view>
					<view class="item-text">{{ i18n.global.recharge }}</view>
				</view>
			</view>
			<view class="menu-item-out" @click="withdraw()">
				<view class="menu-item">
					<view class="item-pic">
						<image src="../../static/assets/withdraw-icon.png" mode=""></image>
					</view>
					<view class="item-text">{{ i18n.global.withdraw }}</view>
				</view>
			</view>
			<view class="menu-item-out" @click="transfer()">
				<view class="menu-item">
					<view class="item-pic">
						<image src="../../static/assets/transfer-icon.png" mode=""></image>
					</view>
					<view class="item-text">{{ i18n.global.transfer }}</view>
				</view>
			</view>
		</view>
		<view class="team-title-plate">
			<view class="team-title">{{ i18n.assets.records }}</view>
		</view>
		<view class="assets-list">
			<view class="assets-item" v-for="(item,index) in recordlist" :key="index">
				<view class="item-left">
					<view class="left-pic">
						<image :src="item.currencyLogo" mode=""></image>
					</view>
					<view class="left-info">
						<view class="info-count">{{item.remark}}</view>
						<view class="info-time">{{item.createTime}}</view>
					</view>
				</view>
				<view class="item-right" v-if="item.money>0">+{{item.money}}</view>
				<view class="item-right" v-if="item.money<0">{{item.money}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currencyName:'',
				currencyId:0,
				pageNum:1,
				pageSize:20,
				pages:1,
				recordlist:[],
				quantity:0,
				cny:0,
				today:0,
				total:0,
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			},
		},
		onLoad(option) {
			this.currencyName = option.currencyName;
			this.currencyId = option.currencyId;
		},
		onShow() {
			this.pageNum = 1;
			this.recordlist = [];
			this.getLog();
			this.getAsset();
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
			} else {
				this.pageNum++;
				this.getLog();
			}
		},
		methods:{
			getAsset(){
				this.$Ajax('/front/financial/single/asset',{
					currencyId:this.currencyId
				},res=>{
					console.log(res);
					this.quantity = res.obj.quantity;
					this.cny = res.obj.cny;
					this.today = res.obj.today;
					this.total = res.obj.total;
				})
			},
			getLog(){
				this.$Ajax('/front/financial/getLog',{
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					currencyId:this.currencyId
				},res=>{
					// this.recordlist = res.obj.list;
					this.pages = res.obj.pages;
					this.recordlist = this.recordlist.concat(res.obj.list);
				})
			},
			recharge(){
				uni.navigateTo({
					url:'./recharge'
				})
			},
			withdraw(){
				uni.navigateTo({
					url:'./withdraw'
				})
			},
			transfer(){
				uni.navigateTo({
					url:'./transfer'
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
		.team-bg-out{
			padding-top: 32rpx;
			.team-bg{
				background-size: 100% 100%;
				background-position: center;
				background-repeat: no-repeat;
				height: 418rpx;
				width: 662rpx;
				background-image: url(../../static/my/team-bg.png);
				margin: auto;
				.canuse{
					font-size: 24rpx;
					font-family: DIN;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
					padding-top: 40rpx;
				}
				.using{
					font-size: 64rpx;
					font-family: DIN;
					font-weight: 500;
					color: #FFCF1E;
					text-align: center;
				}
				.using-cny{
					font-size: 24rpx;
					font-family: PingFang SC-Bold;
					font-weight: 400;
					color: #FFFFFE;
					text-align: center;
				}
				.profit-title-item{
					display: flex;
					align-items: center;
					padding-top: 30rpx;
					.profit-title{
						flex: 1;
						text-align: center;
						font-size: 24rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						color: #999999;
					}
				}
				.profit-count-item{
					display: flex;
					align-items: center;
					.profit-count{
						flex: 1;
						text-align: center;
						font-size: 36rpx;
						font-family: DIN;
						font-weight: 500;
						color: #FFFFFF;
					}
				}
			}
		}
		.bg-empyt{
			height: 66rpx;
		}
		.assets-menu-list{
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.menu-item-out{
				width: 202rpx;
				margin: 40rpx 0;
				border: 2rpx solid #0074C1;
				// border-image: linear-gradient(0deg, #015798, #0074C1) 10 10;
				background: linear-gradient(90deg, #040D32 0%, #1C3056 50%, #024783 100%);
				border-radius: 36rpx;
				.menu-item{
					width: 112rpx;
					height: 72rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: auto;
					.item-pic{
						width: 42rpx;
						height: 42rpx;
						image{
							width: 42rpx;
							height: 42rpx;
						}
					}
					.item-text{
						font-size: 28rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						color: #01A2FE;
					}
				}
			}
		}
		.team-title-plate{
			padding-left: 30rpx;
			.team-title{
				width: 298rpx;
				height: 64rpx;
				background: linear-gradient(90deg, #00A1FE 0%, #1E3869 50%, #00061A 100%);
				font-size: 32rpx;
				font-family: PingFang SC-Bold;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 64rpx;
				padding-left: 22rpx;
			}
		}
		.assets-list{
			padding: 0 30rpx;
			.assets-item{
				padding: 20rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.item-left{
					display: flex;
					align-items: center;
					.left-pic{
						width: 78rpx;
						height: 78rpx;
						border-radius: 50%;
						overflow: hidden;
						image{
							width: 78rpx;
							height: 78rpx;
						}
					}
					.left-info{
						padding-left: 18rpx;
						.info-count{
							font-size: 32rpx;
							font-family: PingFang SC-Bold;
							font-weight: 500;
							color: #FFFFFF;
						}
						.info-time{
							font-size: 24rpx;
							font-family: DIN;
							font-weight: 400;
							color: rgba(255,255,254,.2);
						}
					}
				}
				.item-right{
					font-size: 36rpx;
					font-family: DIN;
					font-weight: 500;
					color: #FFFFFE;
				}
			}
		}
	}
</style>
