<template>
	<view class="page">
		<view class="coin-list-out" v-if="showStatus">
			<view class="coin-list">
				<view class="coin-item" v-for="(item,index) in currencylist" :key="index" @click="changeCoin(item.currencyId,item.currencyName)">{{item.currencyName}}</view>
				<view class="coin-cancel" @click="cancel()">{{ i18n.global.cancel }}</view>
			</view>
		</view>
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.global.recharge }}</view>
			<view class="header-record" @click="rechargeRecord()">
				<image src="../../static/public/record-icon.png" mode=""></image>
			</view>
		</view>
		<view class="coin-name-plate" @click="openShow()">
			<view class="coin-name">{{currencyName}}</view>
			<view class="plate-pic">
				<image src="../../static/assets/down-icon.png" mode=""></image>
			</view>
		</view>
		<view class="recharge-body">
			<view class="body-title"></view>
			<view class="code-bg">
				<view class="code-pic">
					<image :src="qrcodeImage" mode=""></image>
				</view>
			</view>
			<view class="body-line"></view>
			<view class="address-title">{{ i18n.assets.wallet_address }}</view>
			<view class="address-text">{{address}}</view>
			<view class="copy-btn" @click="$tools.copy(address)">{{ i18n.global.copy }}</view>
		</view>
	</view>
</template>

<script>
	import QR from '@/components/qrcode/qrcode.js';
	export default {
		data() {
			return {
				address:'',
				qrcodeImage:'',
				showStatus:false,
				currencylist:[],
				currencyName:'',
				currencyId:0,
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
					type:1
				},res=>{
					console.log(res);
					this.currencylist = res.obj;
					this.currencyName = this.currencylist[0].currencyName;
					this.currencyId = this.currencylist[0].currencyId;
					this.getAddress();
				})
			},
			getAddress(){
				this.$Ajax('/front/financial/recharge/address',{
					currencyId:this.currencyId
				},res=>{
					console.log(res);
					this.address = res.obj.address[0].address;
					this.qrcodeImage = QR.createQrCodeImg(this.address);
				})
			},
			changeCoin(currencyId,currencyName){
				this.currencyName = currencyName;
				this.currencyId = currencyId;
				this.showStatus = false;
				this.getAddress();
			},
			rechargeRecord(){
				uni.navigateTo({
					url:'./rechargeRecord?currencyId=' + this.currencyId
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
		.recharge-body{
			width: 690rpx;
			height: 73vh;
			background-color: #040D32;
			margin: auto;
			text-align: center;
			padding-top: 30rpx;
			.body-title{
				font-size: 28rpx;
				font-family: PingFang SC-Bold;
				font-weight: 400;
				color: #FFFFFF;
				height: 166rpx;
				line-height: 166rpx;
			}
			.code-bg{
				width: 400rpx;
				height: 400rpx;
				background-size: 100% 100%;
				background-position: center;
				background-repeat: no-repeat;
				background-image: url(../../static/assets/code-bg.png);
				margin: auto;
				.code-pic{
					width: 334rpx;
					margin: auto;
					padding-top: 33rpx;
					image{
						width: 334rpx;
						height: 334rpx;
					}
				}
			}
			.body-line{
				width: 570rpx;
				height: 2rpx;
				background: linear-gradient(90deg, #040D32 0%, #00ACFF 50%, #040D32 100%);
				margin: auto;
				margin-top: 100rpx;
			}
			.address-title{
				font-size: 28rpx;
				font-family: PingFang SC-Bold;
				font-weight: 400;
				color: #FFFFFF;
				height: 145rpx;
				line-height: 145rpx;
			}
			.address-text{
				width: 415rpx;
				font-size: 32rpx;
				font-family: DIN;
				font-weight: 500;
				color: #FFFFFF;
				margin: auto;
				text-align: center;
				word-break: break-all;
			}
			.copy-btn{
				width: 208rpx;
				height: 78rpx;
				border-image: linear-gradient(0deg, #015798, #0074C1) 10 10;
				background: linear-gradient(90deg, #040D32 0%, #1C3056 50%, #024783 100%);
				border-radius: 39rpx;
				line-height: 78rpx;
				font-size: 28rpx;
				font-family: PingFang SC-Bold;
				font-weight: 500;
				color: #00A2FF;
				margin: auto;
				margin-top: 40rpx;
			}
		}
	}
</style>
