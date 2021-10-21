<template>
	<view class="page">
		<view class="empty-publics"></view>
		<view class="assets-bg-out">
			<view class="assets-bg">
				<view class="bg-top">{{ i18n.assets.title }}(CNY)</view>
				<view class="bg-middle">{{cnyQty | number(2)}}</view>
				<view class="bg-bottom">+{{todayProfit | number(2)}}<text>({{ i18n.assets.tips_01 }})</text></view>
			</view>
		</view>
		<view class="assets-title-out">
			<view class="assets-title">{{ i18n.assets.account_assets }}</view>
		</view>
		<view class="assets-block-list">
			<view class="assets-block-item" v-for="(item,index) in coinlist" :key="index" @click="myAssets(item.currencyId,item.currencyName)">
				<view class="item-top">
					<view class="top-pic">
						<image :src="item.currencyLogo" mode=""></image>
					</view>
					<view class="top-text">{{item.currencyName}}</view>
				</view>
				<view class="item-middle">{{item.quantity | number(2)}}</view>
				<view class="item-bottom">≈{{item.cnyQty | number(2)}}CNY</view>
			</view>
		</view>
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
		<view class="assets-title-out">
			<view class="assets-title">{{ i18n.assets.records }}</view>
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
				<view class="item-right" v-if="item.money<0">{{item.money | number(2)}}</view>
				<view class="item-right" v-if="item.money>0">+{{item.money | number(2)}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				coinlist:[],
				todayProfit:0,
				cnyQty:0,
				pageSize:20,
				pageNum:1,
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
			this.pageNum = 1;
			this.recordlist = [];
			this.getAssets();
			this.getLog();
			uni.setTabBarItem({
				index: 0,
				text: this.$t('message').tarbar.item_01
			});
			uni.setTabBarItem({
				index: 1,
				text: this.$t('message').tarbar.item_02
			});
			uni.setTabBarItem({
				index: 2,
				text: this.$t('message').tarbar.item_03
			});
			uni.setTabBarItem({
				index: 3,
				text: this.$t('message').tarbar.item_04
			});
		},
		onReachBottom() {
			if (this.pageNum >= this.pages) {
				return this.$tools.toast(this.i18n.global.atLast);
			} else {
				this.pageNum++;
				this.getLog();
			}
		},
		watch:{
			
		},
		methods: {
			getLog(){
				this.$Ajax('/front/financial/getLog',{
					pageNum:this.pageNum,
					pageSize:this.pageSize
				},res=>{
					// this.recordlist = res.obj.list;
					this.pages = res.obj.pages;
					this.recordlist = this.recordlist.concat(res.obj.list);
				})
			},
			getAssets(){
				this.$Ajax('/front/financial/get/asset',{},res=>{
					console.log(res);
					this.coinlist = res.obj.list;
					this.todayProfit = res.obj.todayProfit;
					this.cnyQty = res.obj.cnyQty;
				})
			},
			myAssets(currencyId,currencyName){
				uni.navigateTo({
					url:'./myAssets?currencyId=' + currencyId + '&currencyName=' + currencyName
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
	.page {
		.assets-bg-out{
			padding: 100rpx 0 50rpx 0;
			.assets-bg{
				width: 662rpx;
				height: 240rpx;
				margin: auto;
				background-size: 100% 100%;
				background-position: center;
				background-repeat: no-repeat;
				background-image: url(../../static/assets/assets-header-bg.png);
				text-align: center;
				.bg-top{
					font-size: 24rpx;
					font-family: PingFang SC-Bold;
					font-weight: 400;
					color: #FFFFFF;
					padding-top: 20rpx;
				}
				.bg-middle{
					font-size: 64rpx;
					font-family: PingFang SC-Bold;
					font-weight: 400;
					color: #FFCF1E;
				}
				.bg-bottom{
					font-size: 24rpx;
					font-family: PingFang SC-Bold;
					font-weight: 400;
					color: #FFCF1E;
					text{
						color: #FFFFFF;
					}
				}
			}
		}
		.assets-title-out{
			padding: 30rpx;
			.assets-title{
				width: 298rpx;
				height: 64rpx;
				background: linear-gradient(90deg, #00A1FE 0%, #1E3869 50%, #00061A 100%);
				padding-left: 20rpx;
				line-height: 64rpx;
				font-size: 32rpx;
				font-family: PingFang SC-Bold;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
		.assets-block-list{
			display: flex;
			align-items: center;
			overflow-x: scroll;
			overflow-y: hidden;
			padding-left: 30rpx;
			.assets-block-item{
				min-width: 304rpx;
				height: 300rpx;
				background-size: 100% 100%;
				background-position: center;
				background-repeat: no-repeat;
				background-image: url(../../static/assets/assets-block-bg.png);
				margin-right: 60rpx;
				.item-top{
					display: flex;
					align-items: center;
					padding: 38rpx 0 0 30rpx;
					.top-pic{
						width: 78rpx;
						height: 78rpx;
						border-radius: 50%;
						overflow: hidden;
						image{
							width: 78rpx;
							height: 78rpx;
						}
					}
					.top-text{
						padding-left: 20rpx;
						font-size: 32rpx;
						font-family: DIN;
						font-weight: 500;
						color: #FFFFFF;
					}
				}
				.item-middle{
					font-size: 36rpx;
					font-family: DIN;
					font-weight: 500;
					color: #FFFFFF;
					padding: 50rpx 0 0 30rpx;
				}
				.item-bottom{
					font-size: 24rpx;
					font-family: PingFang SC-Bold;
					font-weight: 400;
					color: #FFFFFE;
					padding: 0 0 0 30rpx;
				}
			}
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
					// width: 112rpx;
					height: 72rpx;
					display: flex;
					align-items: center;
					justify-content: center;
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
						margin-left: 20rpx;
					}
				}
			}
		}
		.assets-list{
			padding: 0 30rpx 120rpx;
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
						// overflow: hidden;
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
