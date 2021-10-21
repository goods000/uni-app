<template>
	<view class="page">
		<view class="coin-list-out" v-if="showStatus">
			<view class="coin-list">
				<view class="coin-item" v-for="(item,index) in currencylist" :key="index" @click="changeCoin(item.id,item.name)">{{item.name}}</view>
				<view class="coin-cancel" @click="cancel()">{{ i18n.global.cancel }}</view>
			</view>
		</view>
		<view class="tips-btn-out">
			<view class="tips-btn" @click="apply()">
				<view class="btn">{{ i18n.global.transfer }}</view>
			</view>
		</view>
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.global.transfer }}</view>
			<view class="header-record" @click="transferRecord()">
				<image src="../../static/public/record-icon.png" mode=""></image>
			</view>
		</view>
		<view class="coin-name-plate" @click="openShow()">
			<view class="coin-name">{{currencyName}}</view>
			<view class="plate-pic">
				<image src="../../static/assets/down-icon.png" mode=""></image>
			</view>
		</view>
		<view class="input-plate">
			<view class="input-title">{{ i18n.assets.account }}</view>
			<view class="input-flex">
				<input type="text" v-model="uid" value="" :placeholder="i18n.assets.placeholder_01" />
			</view>
		</view>
		<view class="canuse">{{ i18n.assets.tranfter_tips }}</view>
		<view class="input-plate">
			<view class="input-title">{{ i18n.global.quantity }}</view>
			<view class="input-flex">
				<input type="text" v-model="quantity" value="" :placeholder="i18n.assets.placeholder_02" />
				<view class="right-flex">
					<view class="flex-coin">{{currencyName}}</view>
					<view class="flex-line"></view>
					<view class="flex-all" @click="All()">{{ i18n.global.all }}</view>
				</view>
			</view>
		</view>
		<view class="canuse">*{{ i18n.assets.Quantity_Available }} {{using}}</view>
		<view class="input-plate">
			<view class="input-title">{{ i18n.global.tradePassword }}</view>
			<view class="input-flex">
				<input type="password" v-model="tradePwd" value="" :placeholder="i18n.global.placeholder_password" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid:'',
				quantity:'',
				tradePwd:'',
				showStatus:false,
				currencylist:[],
				currencyName:'',
				currencyId:0,
				using:0,
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
			this.getCurrencyList();
		},
		methods:{
			getCurrencyList(){
				this.$Ajax('/search/currencyList',{
					type:3
				},res=>{
					console.log(res);
					this.currencylist = res.obj;
					this.currencyName = this.currencylist[0].name;
					this.currencyId = this.currencylist[0].id;
					this.getBalance();
				})
			},
			getBalance(){
				this.$Ajax('/front/financial/get/balance',{
					currencyName:this.currencyName,
					walletType:1
				},res=>{
					this.using = res.obj;
				})
			},
			changeCoin(currencyId,currencyName){
				this.currencyName = currencyName;
				this.currencyId = currencyId;
				this.showStatus = false;
				this.quantity = '';
				this.getBalance();
			},
			All(){
				this.quantity = this.using;
			},
			apply(){
				this.$Ajax('/front/financial/do/transfer',{
					account:this.uid,
					tradePwd:this.tradePwd,
					quantity:this.quantity,
					currencyId:this.currencyId
				},res=>{
					console.log(res);
					this.$tools.toast(res.msg);
					if(res.code==0){
						this.uid = '';
						this.quantity = '';
						this.tradePwd = '';
						this.getCurrencyList();
					}
				})
			},
			transferRecord(){
				uni.navigateTo({
					url:'./transferRecord'
				})
			},
			openShow(){
				this.showStatus = true;
			},
			cancel(){
				this.showStatus = false;
			},
		}
	}
</script>

<style lang="scss">
	.page{
		color: #FFFFFF;
		.coin-list-out{
			width: 100vw;
			height: 100vh;
			position: fixed;
			background-color: rgba(0, 0, 0, .48);
			z-index: 2;
			.coin-list{
				background: #040D32;
				box-shadow: 0px 5rpx 12rpx 0px rgba(147, 147, 147, 0.55);
				border-radius: 12rpx;
				position: fixed;
				bottom: 0;
				width: 100%;
				.coin-item{
					height: 110rpx;
					line-height: 110rpx;
					text-align: center;
					border-bottom: 1px solid #091335;
					font-size: 36rpx;
					font-family: DIN;
					font-weight: 500;
				}
				.coin-cancel{
					height: 110rpx;
					line-height: 110rpx;
					text-align: center;
					font-size: 36rpx;
					font-family: DIN;
					font-weight: 500;
				}
			}
		}
		.tips-btn-out{
			width: 100vw;
			position: fixed;
			bottom: 2%;
			.tips-btn{
				width: 100%;
				.tips-plate{
					padding: 40rpx 30rpx;
					.tips-title{
						font-size: 32rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
					}
					.tips-text{
						font-size: 22rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						word-break: break-all;
					}
				}
				.btn{
					width: 690rpx;
					height: 88rpx;
					background: #FFCF1E;
					box-shadow: 0px 4rpx 14rpx 0px rgba(255, 207, 30, 0.41);
					border-radius: 44rpx;
					margin: auto;
					text-align: center;
					line-height: 88rpx;
					font-size: 32rpx;
					font-family: PingFang SC-Bold;
					font-weight: bold;
					color: #00061A;
				}
			}
		}
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
				padding-left: 20rpx;
			}
			.header-record{
				width: 38rpx;
				height: 38rpx;
				image{
					width: 38rpx;
					height: 38rpx;
				}
			}
		}
		.coin-name-plate{
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			.coin-name{
				font-size: 52rpx;
				font-family: DIN;
				font-weight: bold;
				color: #F0C31F;
				padding-right: 18rpx;
			}
			.plate-pic{
				width: 28rpx;
				height: 28rpx;
				image{
					width: 28rpx;
					height: 28rpx;
				}
			}
		}
		.input-plate{
			padding: 0 30rpx;
			padding-top: 40rpx;
			.input-title{
				font-size: 28rpx;
				font-family: PingFang SC-Bold;
				font-weight: 500;
				padding-bottom: 30rpx;
			}
			.input-flex{
				height: 104rpx;
				background: #040D32;
				// border: 1px solid #043680;
				border-image: linear-gradient(0deg, #0365B3, #0365B3) 10 10;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 30rpx;
				box-shadow: 0rpx 0rpx 12rpx 8rpx rgba(3, 101, 179, 0.6) inset;
				input{
					flex: 1;
					font-size: 32rpx;
					font-family: PingFang SC-Bold;
					font-weight: 400;
				}
				.flex-right-pic{
					width: 26rpx;
					height: 26rpx;
					image{
						width: 26rpx;
						height: 26rpx;
					}
				}
				.flex-right{
					font-size: 32rpx;
					font-family: PingFang SC-Bold;
					font-weight: 400;
					text-decoration: underline;
					color: #00A2FF;
				}
				.right-flex{
					display: flex;
					align-items: center;
					justify-content: space-between;
					.flex-coin{
						font-size: 32rpx;
						font-family: DIN;
						font-weight: 500;
						color: #FFFFFF;
						padding-right: 20rpx;
					}
					.flex-line{
						width: 2rpx;
						height: 33rpx;
						background: #FFFFFF;
						opacity: 0.1;
						border-radius: 1px;
					}
					.flex-all{
						font-size: 32rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						text-decoration: underline;
						color: #00ACFF;
						padding-left: 20rpx;
					}
				}
			}
		}
		.canuse{
			padding-left: 30rpx;
			font-size: 24rpx;
			font-family: PingFang SC-Bold;
			font-weight: 500;
			color: #999999;
			padding-top: 20rpx;
			word-break: break-word;
		}
	}
</style>
