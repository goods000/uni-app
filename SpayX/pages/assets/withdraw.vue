<template>
	<view class="page">
		<view class="coin-list-out" v-if="showStatus">
			<view class="coin-list">
				<view class="coin-item" v-for="(item,index) in currencylist" :key="index" @click="changeCoin(item.currencyId,item.currencyName)">{{item.currencyName}}</view>
				<view class="coin-cancel" @click="cancel()">{{ i18n.global.cancel }}</view>
			</view>
		</view>
		<!-- <view class="tips-btn-out">
			<view class="tips-btn">
				<view class="tips-plate">
					<view class="tips-title">温馨提示</view>
					<view class="tips-text">1.请确认目标提币地址是否存在且被激活，否则将会导致提币失败，且资产不可找回。</view>
					<view class="tips-text">2.为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。</view>
				</view>
				<view class="btn" @click="apply()">提币</view>
			</view>
		</view> -->
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.global.withdraw }}</view>
			<view class="header-record" @click="withdrawRecord()">
				<image src="../../static/public/record-icon.png" mode=""></image>
			</view>
		</view>
		<view class="coin-name-plate" @click="openShow()">
			<view class="coin-name">{{currencyName}}</view>
			<view class="plate-pic">
				<image src="../../static/assets/down-icon.png" mode=""></image>
			</view>
		</view>
		<view class="chain-list-plate">
			<view class="chain-list">
				<view class="chain-item" :class="{chainItem:indexs==index}" v-for="(item,index) in chainlist" :key="index" @click="changeChain(index,item.id,item.percentage,item.rate)">{{item.name}}</view>
			</view>
		</view>
		<view class="input-plate">
			<view class="input-title">{{ i18n.global.withdraw }}{{ i18n.global.address }}</view>
			<view class="input-flex">
				<input type="text" v-model="address" value="" :placeholder="i18n.assets.placeholder_03" />
			</view>
		</view>
		<view class="input-plate">
			<view class="input-title">{{ i18n.global.quantity }}</view>
			<view class="input-flex">
				<input type="number" v-model="quantity" value="" :placeholder="i18n.assets.placeholder_04" />
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
		<view class="actual-item">
			<view class="item">{{ i18n.global.actualReceipt }}</view>
			<view class="item">{{actual}} {{currencyName}}</view>
		</view>
		<view class="fee-item">
			<view class="item">{{ i18n.global.serviceCharge }}</view>
			<view class="item">{{ratevalue}} {{currencyName}}</view>
		</view>
		<view class="tips-btn-out">
			<view class="tips-btn">
				<view class="tips-plate">
					<view class="tips-title">{{ i18n.global.reminder }}</view>
					<view class="tips-text">1.{{ i18n.assets.with_tips_01 }}</view>
					<view class="tips-text">2.{{ i18n.assets.with_tips_02 }}</view>
				</view>
				<view class="btn" @click="apply()">{{ i18n.global.withdraw }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address:'',
				quantity:'',
				tradePwd:'',
				showStatus:false,
				currencylist:[],
				currencyName:'',
				currencyId:0,
				using:0,
				ratevalue:0,
				rate:0,
				chainlist:[],
				indexs:0,
				configId:0,
				percentage:0,
				actual:0,
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
		watch:{
			quantity(val){
				if(val>0){
					if(this.percentage==0){
						this.ratevalue = this.rate;
					}else{
						this.ratevalue = this.quantity*this.rate;
					}
					this.actual = val-this.ratevalue;
				}else{
					this.actual = 0;
				}
			},
		},
		methods:{
			getCurrencyList(){
				this.$Ajax('/search/currencyList',{
					type:2
				},res=>{
					console.log(res);
					this.currencylist = res.obj;
					this.currencyName = this.currencylist[0].currencyName;
					this.currencyId = this.currencylist[0].currencyId;
					this.getBalance();
					this.getExtractInit();
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
			getExtractInit(){
				this.$Ajax('/front/financial/extractInit',{
					currencyId:this.currencyId
				},res=>{
					console.log(res);
					this.chainlist = res.obj.configList;
					this.configId = this.chainlist[0].id;
					this.percentage = this.chainlist[0].percentage;
					this.rate = this.chainlist[0].rate;
					if(this.percentage==0){
						this.ratevalue = this.rate;
					}else{
						this.ratevalue = this.quantity*this.rate;
					}
				})
			},
			changeChain(index,configId,percentage,rate){
				this.indexs = index;
				this.configId = configId;
				this.percentage = percentage;
				this.rate = rate;
				this.quantity = '';
				if(this.percentage==0){
					this.ratevalue = this.rate;
				}else{
					this.ratevalue = this.quantity*this.rate;
				}
			},
			All(){
				this.quantity = this.using;
			},
			changeCoin(currencyId,currencyName){
				this.currencyName = currencyName;
				this.currencyId = currencyId;
				this.showStatus = false;
				this.getBalance();
				this.getExtractInit();
			},
			apply(){
				this.$Ajax('/front/financial/apply',{
					configId:this.configId,
					quantity:this.quantity,
					address:this.address,
					tradePwd:this.tradePwd
				},res=>{
					console.log(res);
					this.$tools.toast(res.msg);
					if(res.code==0){
						this.address = '';
						this.quantity = '';
						this.tradePwd = '';
						this.getCurrencyList();
					}
				})
			},
			withdrawRecord(){
				uni.navigateTo({
					url:'./withdrawRecord?currencyId=' + this.currencyId
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
			padding-bottom: 10%;
			// position: fixed;
			// bottom: 2%;
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
		.chain-list-plate{
			padding: 30rpx;
			.chain-list{
				display: flex;
				align-items: center;
				height: 88rpx;
				.chain-item{
					height: 75rpx;
					line-height: 75rpx;
					margin-right: 20rpx;
					font-size: 36rpx;
					font-family: DIN;
					font-weight: bold;
					background-color: rgba(199,237,255,.1);
					padding: 0 20rpx;
					border-radius: 14rpx;
				}
				.chainItem{
					background-color: #F0C31F;
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
		}
		.actual-item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			height: 75rpx;
			.item{
				font-size: 28rpx;
				font-family: DIN;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
		.actual-item>:first-child{
			font-family: PingFang SC-Bold;
		}
		.fee-item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			.item{
				font-size: 24rpx;
				font-family: DIN;
				font-weight: 400;
				color: #999999;
			}
		}
		.fee-item>:first-child{
			font-family: PingFang SC-Bold;
		}
	}
</style>
