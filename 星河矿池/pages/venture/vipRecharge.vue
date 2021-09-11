<template>
	<view class="pages">
		<view class="bgBox"></view>
		<view class="header_bar">
			<view class="header">
				<view class="header-goBack" @click="$tools.back(1)"></view>
				<view class="header-title-white">VIP充值</view>
			</view> 
		</view> 
		
		<view class="productBox">
			<view class="ventureBox">
				<view class="ventureBox-wrapper">
					<view class="ventureBox-headerTitle">支付金额</view>
					<view class="ventureBox-form-item-input" :class="{ 'ventureBox-form-item-input--active': isFocus == 1, showCloseBtn: num != '' }">
						<input placeholder="" placeholder-style="color:#CCCCCC" v-model="num" disabled="disabled"
						type="text"
						@blur="blurInput(0)"
						@focus="focusInput(0)"/>
						<text class="ventureBox-form-item-b">USDT</text>
						<view class="ventureBox-form-item-image">
							<!-- <view class="ventureBox-form-item-image__clear ventureBox-form-item-image__clear--active" @click="clearData('num')"> -->
							<view class="ventureBox-form-item-image__clear ventureBox-form-item-image__clear--active">
								<image src="../../static/public/icon-clear.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<view class="ventureBox-using">可用数量：{{using}}USDT</view>
					<view class="ventureBox-tips">现在充值VIP将享受会员创投{{vipRadio.vipRadio*100}}%的流水收益，且赠送{{vipRadio.vipEnlarge}}枚LM币进行锁仓释放</view>
				</view>
			</view>
		</view>
		
		<view class="initBtn" @click="config()">确定</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:'',
				password:'',
				name:'',
				isFocus: null,
				eyeShow: '../../static/public/icon-eye-open.png',
				eyeHide: '../../static/public/icon-eye-close.png',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }],
				using:'',
				vipRadio:{},
			}
		},
		onShow() {
			this.init();
		},
		methods:{
			init(){
				this.getTotalList();
				this.getVipRadio();
			},
			// 账户总资产(BTC)
			getVipRadio() {
				this.$Ajax('/front/venture/getVipRadio', {}, res => {
						if (res.code == 0) {
							this.vipRadio = res.obj;
							this.num = this.vipRadio.vipBuy
						}
					}
				);
			},
			// 账户总资产(BTC)
			getTotalList() {
				this.$Ajax('/front/userPassphrase/assets/total', {}, res => {
						if (res.code == 0) {
							this.assetList = res.obj.assetList;
							this.assetList.forEach((item,index) => {
								if(item.currencyName == 'USDT'){
									this.using = item.using;
								}
							})
						}
					}
				);
			},
			config(){
				this.$Ajax('/front/userPassphrase/upgradeVip',{},
					res => {
						if (res.code == 0) {
							this.$tools.toast('VIP充值成功');
						}
					}
				);
			},
			/* clear & eye */
			focusInput(index) {
				this.isFocus = index;
			},
			blurInput(index) {
				this.isFocus = null;
			},
			clearData(keyName) {
				for (var key in this.$data) {
					if (key == keyName) {
						this.$data[key] = '';
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/venture/venture';
	.initBtn{
		position: absolute;
		bottom: 40upx;
		left: 0;right: 0;
		margin: auto;
	}
	.productBox{
		position: absolute;
		top: 20%;
		z-index: 9;
	}
	.ventureBox{
		&-form{
			&-item{
				&-input{
					input{
						width: 18%;
					}
				}
			}
		}
	}		
</style>
