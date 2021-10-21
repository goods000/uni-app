<template>
	<view class="contentBg">
		<view class="header_bar header_bg">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">
					<view class="header-title__type" :class="{'header-title__type--active' : tabsActive == 0}" @click="changeTabs(0)">购买</view>
					<view class="header-title__type" :class="{'header-title__type--active' : tabsActive == 1}" @click="$tools.jump('./nodeRecord')">记录</view>
				</view>
				<!-- <view class="header-wrapper">
					<view class="header-item" :class="{'header-item--active' : tabsActive == 0}" @click="changeTabs(0)">购买</view>
					<view class="header-item" :class="{'header-item--active' : tabsActive == 1}" @click="$tools.jump('./nodeRecord')">记录</view>
				</view> -->
			</view>
		</view> 
		
		<view class="product-image" @click="getApply()">
			<image src="../../static/node/icon-node-bg.png" mode="widthFix"></image>
		</view>
		<view class="product" v-if="asset.userCanBuy">
			<view class="initTilte">
				<view class="initTilte-title">{{ asset.currencyName }}购</view><view class="initTilte-tips">买</view>
			</view>
			<view class="nodeBox">
				<view class="initTilte">
					<view class="initTilte-style">单价：</view><view class="initTilte-tips">{{ asset.cndtCnyPrice }}CNY/1{{ asset.currencyName }}</view>
				</view>
				<view class="initTilte">
					<view class="initTilte-style">购买数量</view>
				</view>
				<view class="safety-list">
					<view class="safety-list-input">
						<input type="text" placeholder="请输入购买数量" placeholder-style="color:#999999" v-model="quantity" />
						<view class="safety-list-input__fixedBox">{{ asset.currencyName }}</view>
					</view>
				</view>
				<view class="nodeBox-tips">
					<view class="nodeBox-tips__title">当前价格</view>
					<view class="nodeBox-tips__price">{{ asset.cndtCnyPrice*quantity }}CNY</view>
				</view>
			</view>
			<view class="product-checkboxBox">
				
				<view class="initButton">
					<view class="initButton-btn initButton-btn--style" v-if="asset.userCanBuy" @click="submit()">确认</view>
					<view class="initButton-btn initButton-btn--disable" v-else @click="submit()">确认</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
			data(){
				return{
					tabsActive: 0,
					navigateFlag: false,
					quantity:'',
					asset:{},
					authInfo:{},
				}
			},
			onShow() {
				this.init();
				this.tabsActive = 0;
				this.navigateFlag = false;
				this.quantity = '';
			},
			methods: {
				init(){
					this.getBaseInfo();
					this.getAuthInfo();
				},
				// 申请生态节点
				getApply(){
					if(this.authInfo.authStatus == 2){
						this.$tools.jump('./apply',this.authInfo.realName);
					}else{
						this.$tools.toast('请先完成实名认证！！！');
					}
				},
				submit(){
					if(this.quantity == ''){
						return this.$tools.toast('请输入购买数量');
					}
					// this.$tools.jump('./upload',this.asset,this.asset.cndtCnyPrice*this.quantity)
					this.$tools.jump('./upload',this.asset.currencyId,this.asset.currencyName,this.asset.cndtCnyPrice, this.quantity, this.asset.bankName, this.asset.name, this.asset.bankAddress, this.asset.account)
				},
				// 生态节点购买cndt收款方信息+价格
				getBaseInfo() {
					this.$Ajax('/front/node/baseInfo', {}, res => {
						if (res.code == 0) {
							this.asset = res.obj;
						}
					});
				},
				// 实名认证
				getAuthInfo() {
					this.$Ajax('/front/user/authInfo', {}, res => {
						if (res.code == 0) {
							// console.log(JSON.stringify(res.obj))
							this.authInfo = res.obj;
						}
					});
				},
			},
		}
	</script>

<style lang="scss" scoped>
	@import '/scss/node';
	@import '../safety/scss/safety';
	.product-image{
		margin: 0;
	}
	.header-wrapper{
		width: 90%;
		justify-content: center;
	}
</style>
