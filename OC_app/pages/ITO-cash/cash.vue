<template>
	<view class="pages">
		<view class="">
			<view class="header_bar header_bg">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">闪兑</view>
					<view class="header-right"@click="$tools.jump('./cashRecord')">闪兑记录</view>
				</view> 
			</view> 
			<view class="form">
				<view class="form-wrapper__1">
					<view class="form-wrapper-label">兑换方式</view>
					<view class="form-wrapper__image">
						<view class="form-wrapper__image-oc">
							<image src="../../static/ITO/OC.png" mode="widthFix"></image>
							<text>OC</text>
						</view>
						<image class="form-wrapper__image-img" src="../../static/ITO/icon-ITO-arrow.png" mode=""></image>
						<view class="form-wrapper__image-oc">
							<image src="../../static/ITO/XZ.png" mode="widthFix"></image>
							<text>XZ</text>
						</view>
					</view>
				</view>
				<view class="form-wrapper">
					<view class="form-wrapper-label">当前实时价格</view>
					<input type="text" :value="1+' OC = '+ (ocUsdtPrice/exchangePrice) +' XZ'" placeholder-style="color:#999999" />
				</view>
				<view class="form-wrapper">
					<view class="form-wrapper-label">闪兑数量</view>
					<input type="text" :placeholder="'请输入闪兑的XZ数量,当前XZ剩余'+xzusing" v-model="num" placeholder-style="color:#999999" />
					<view class="form-wrapper-txt">XZ</view>
				</view>
				<view class="form-wrapper">
					<view class="form-wrapper-label">闪兑金额</view>
					<input type="text" :value="money" placeholder-style="color:#999999" disabled style="color: #999999;"/>
					<view class="form-wrapper-txt">{{ currency }}</view>
				</view>
				<view class="form-item">余额 {{ using }} {{ currency }}</view>
				<!-- <view class="form-wrapper">
					<view class="form-wrapper-label">钱包密码</view>
					<input type="password" placeholder="请输入您的钱包密码" v-model="password" placeholder-style="color:#999999" />
				</view> -->
				<view class="initBtn" @click="submit()">闪兑</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	
	export default {
		data() {
			return {
				num:'',
				password:'',
				selectType:1,
				money: 0,
				currencyList:[],
				using: 0,
				xzusing: 0,
				currency: 'OC',
				currencyId: '',
				ocUsdtPrice:'',
			}
		},
		onLoad(hash){
			this.ruleId = hash.value1;
			this.exchangePrice = hash.value2;
		},
		onShow() {
			this.init();
		},
		watch:{
			num(){
				if(this.num == ''){
					this.money = 0
				}else{
					this.money = (this.num / (this.ocUsdtPrice/this.exchangePrice)).toFixed(2);
				}
			}
		},
		methods: {
			init(){
				this.getTradeUsdtAndOc();
				this.getAssetsTotal();
			},
			// 获取资产
			getAssetsTotal() {
				this.$Ajax('/front/financial/assetsTotal', {}, res => {
					if (res.code == 0) {
						// this.assetsTotalList = res.obj;
						this.currencyList = res.obj.assetList;
						res.obj.assetList.forEach((item,index) => {
							if(item.currencyName == 'OC'){
								this.using = item.using;
							}
							if(item.currencyName == 'XZ'){
								this.xzusing = item.using;
							}
						})
					}
				});
			},
			// 获取币种
			getTradeUsdtAndOc() {
				this.$Ajax('/front/user/tradeUsdtAndOc', {}, res => {
					if (res.code == 0) {
						this.ocUsdtPrice = res.obj;
					}
				});
			},
			submit(){
				if(this.num == ''){
					return this.$tools.toast('请输入闪兑数量');
				}
				// if(this.password == ''){
				// 	return this.$tools.toast('请输入您的钱包密码');
				// }
				this.$Ajax('/front/user/doExchange', {
					money:this.num,
					num:this.money,
					ocUsdtPrice: this.ocUsdtPrice,
					ruleId: this.ruleId,
					// tradePwd: this.password,
				}, res => {
						if (res.code == 0) {
							this.num = '',
							this.$tools.toast(res.msg);
						}
					}
				);
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/withdraw/withdraw';
	page{background: #FFFFFF;}
	.initBtn{
		position: absolute;
		bottom: 20upx;
		left: 0;right: 0;
	}
	.form{
		&-wrapper__1{
			position: relative;
			margin:  32upx 32upx 0;
			border-bottom: 1px solid rgba(0,0,0,0.10);
		}
		&-wrapper{
			&__image{
				@include flexLeft;
				margin: 30upx 0 26upx;
				&-oc{
					@include flexLeft;
					text{
						font-size: 28upx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						text-align: left;
						color: $globalColor-fontStyle;
					}
					image{
						width: 44upx;
						margin-right: 12upx;
					}
				}
				&-img{
					width: 74upx;
					height: 27upx;
					margin:  0 82upx;
				}
			}
		}
	}
</style>
