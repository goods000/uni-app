<template>
	<view class="pages">
		<view class="">
			
			<view class="asset-header">
				<view class="header_bar header_bar--absolute">
					<view class="header">
						<view class="header-title-white">资产</view>
					</view> 
				</view>
				
				<view class="asset-header-title">总账户资产折合(USDT)</view>
				<view class="asset-header-num">
					<text class="asset-header-num__data">{{assetsTotalList.totalUSDT | number(4) }}</text>
					<text class="asset-header-num__cny">≈￥{{assetsTotalList.totalUSDT * assetsTotalList.usdtPrice | number(4) }}</text>
				</view>
				<view class="asset-header-btn">
					<view class="asset-header-btn__item" @click="$tools.jump('../recharge/recharge')">充币</view>
					<view class="asset-header-btn__item" @click="$tools.jump('../conversion/conversion')">划转</view>
					<view class="asset-header-btn__item" @click="$tools.jump('../withdraw/withdraw')">提币</view>
					<view class="asset-header-btn__item" @click="$tools.jump('../transfer/transfer')">转账</view>
				</view>
			</view>
			
			<view class="asset-total">
				<view class="asset_tabs">
					<view class="asset_tabs-list">
						<view class="asset_tabs-list-txt" :class="{ 'active': assetType == 1 }" @click="changeTabsActive(1)">币币账户</view>
						<view class="asset_tabs-list-txt" :class="{ 'active': assetType == 4 }" @click="changeTabsActive(4)">法币账户</view>
						<view class="asset_tabs-list-txt" :class="{ 'active': assetType == 2 }" @click="changeTabsActive(2)">节点账户</view>
						<view class="asset_tabs-list-txt" :class="{ 'active': assetType == 3 }" @click="changeTabsActive(3)">股东账户</view>
					</view>
				</view>
			</view>
			
			<view class="asset-wrapper">
				<view class="">
					<view class="asset-total-box">
						<view class="asset-total-box__item">
							<view class="asset-total-box__item--title">总账户资产折合(USDT)</view>
							<view class="asset-total-box__item--data">
								<text class="asset-total-box__item--data__data" v-if="assetType == 1">{{assetsTotalList.totalBbUSDT | number(4) }}</text>
								<text class="asset-total-box__item--data__data" v-if="assetType == 2">{{assetsTotalList.totalNodeUSDT | number(4) }}</text>
								<text class="asset-total-box__item--data__data" v-if="assetType == 3">{{assetsTotalList.totalPartnerUSDT | number(4) }}</text>
								<text class="asset-total-box__item--data__data" v-if="assetType == 4">{{assetsTotalList.totalOtcUSDT | number(4) }}</text>
								<text class="asset-total-box__item--data__cny" v-if="assetType == 1">≈￥{{ assetsTotalList.totalBbUSDT * assetsTotalList.usdtPrice | number(4) }}</text>
								<text class="asset-total-box__item--data__cny" v-if="assetType == 2">≈￥{{ assetsTotalList.totalNodeUSDT * assetsTotalList.usdtPrice | number(4) }}</text>
								<text class="asset-total-box__item--data__cny" v-if="assetType == 3">≈￥{{ assetsTotalList.totalPartnerUSDT * assetsTotalList.usdtPrice | number(4) }}</text>
								<text class="asset-total-box__item--data__cny" v-if="assetType == 4">≈￥{{ assetsTotalList.totalOtcUSDT * assetsTotalList.usdtPrice | number(4) }}</text>
							</view>
						</view>
						<image src="../../static/business/icon-business-img.png" mode="widthFix"></image>
					</view>
					<view class="asset-list asset-listP">
						<view class="asset-list-header">我的资产</view>
						<view class="asset-list-box" v-for="(item, index) in currencyList" :key="index">
							<view class="asset-list-box__item" v-if="assetType == 1" @click="$tools.jump('./assetRecord',item.currencyName, item.currencyId, item.using, item.freeze, ((item.using + item.freeze) * item.price * assetsTotalList.usdtPrice), assetType)">
								<view class="asset-list-box__item--title asset-list-box__item--title--next">{{ item.currencyName }}</view>
								<view class="asset-list-box__item--info">
									<view class="asset-list-box__item--content">
										<text class="asset-list-box__item--content-txt">可用</text>
										<text class="asset-list-box__item--content-num">{{item.using}}</text>
									</view>
									<view class="asset-list-box__item--content">
										<text class="asset-list-box__item--content-txt">冻结</text>
										<text class="asset-list-box__item--content-num">{{item.freeze}}</text>
									</view>
									<view class="asset-list-box__item--content">
										<text class="asset-list-box__item--content-txt">折合(CNY)</text>
										<text class="asset-list-box__item--content-num">{{(item.using + item.freeze) * item.price * assetsTotalList.usdtPrice  | number(4) }}</text>
									</view>
								</view>
							</view>
							<view class="asset-list-box__item" v-if="assetType == 4 && item.currencyName == 'USDT'"
							@click="$tools.jump('./assetRecord',item.currencyName, item.currencyId, item.otcUsing, item.otcFreeze, ((item.otcUsing + item.otcFreeze) * item.price * assetsTotalList.usdtPrice), assetType)">
								<view class="asset-list-box__item--title asset-list-box__item--title--next">{{ item.currencyName }}</view>
								<view class="asset-list-box__item--info">
									<view class="asset-list-box__item--content">
										<text class="asset-list-box__item--content-txt">可用</text>
										<text class="asset-list-box__item--content-num">{{item.otcUsing}}</text>
									</view>
									<view class="asset-list-box__item--content">
										<text class="asset-list-box__item--content-txt">冻结</text>
										<text class="asset-list-box__item--content-num">{{item.otcFreeze}}</text>
									</view>
									<view class="asset-list-box__item--content">
										<text class="asset-list-box__item--content-txt">折合(CNY)</text>
										<text class="asset-list-box__item--content-num">{{(item.otcUsing + item.otcFreeze) * item.price * assetsTotalList.usdtPrice | number(4) }}</text>
									</view>
								</view>
							</view>
							<view class="asset-list-box__item" v-if="assetType == 2 && item.currencyName == 'OC'"
							 @click="$tools.jump('./assetRecord',item.currencyName, item.currencyId, item.nodeUsing, item.freeze, (item.nodeUsing * item.price * assetsTotalList.usdtPrice), assetType)">
								<view class="asset-list-box__item--title asset-list-box__item--title--next">{{ item.currencyName }}</view>
								<view class="asset-list-box__item--info">
									<view class="asset-list-box__item--content">
										<text class="asset-list-box__item--content-txt">可用</text>
										<text class="asset-list-box__item--content-num">{{item.nodeUsing}}</text>
									</view>
									<view class="asset-list-box__item--content">
										<text class="asset-list-box__item--content-txt">冻结</text>
										<text class="asset-list-box__item--content-num">0</text>
									</view>
									<view class="asset-list-box__item--content">
										<text class="asset-list-box__item--content-txt">折合(CNY)</text>
										<text class="asset-list-box__item--content-num">{{item.nodeUsing * item.price * assetsTotalList.usdtPrice | number(4) }}</text>
									</view>
								</view>
							</view>
							<view class="asset-list-box__item" v-if="assetType == 3 && item.currencyName == 'OC'"
							@click="$tools.jump('./assetRecord',item.currencyName, item.currencyId, item.partnerUsing, item.freeze, (item.partnerUsing * item.price * assetsTotalList.usdtPrice), assetType)">
								<view class="asset-list-box__item--title asset-list-box__item--title--next">{{ item.currencyName }}</view>
								<view class="asset-list-box__item--info">
									<view class="asset-list-box__item--content">
										<text class="asset-list-box__item--content-txt">可用</text>
										<text class="asset-list-box__item--content-num">{{item.partnerUsing}}</text>
									</view>
									<view class="asset-list-box__item--content">
										<text class="asset-list-box__item--content-txt">冻结</text>
										<text class="asset-list-box__item--content-num">0</text>
									</view>
									<view class="asset-list-box__item--content">
										<text class="asset-list-box__item--content-txt">折合(CNY)</text>
										<text class="asset-list-box__item--content-num">{{ item.partnerUsing * item.price * assetsTotalList.usdtPrice | number(4) }}</text>
									</view>
								</view>
							</view>
							
						</view>
					</view>
				</view>
				
				
				<!-- <view class="">
					<view class="asset-total-box">
						<view class="asset-total-box__item">
							<view class="asset-total-box__item--title">总账户资产折合(OC)</view>
							<view class="asset-total-box__item--data">
								<text class="asset-total-box__item--data__data">10.12615</text>
								<text class="asset-total-box__item--data__cny">≈￥100.12615</text>
							</view>
						</view>
						<image src="../../static/business/icon-business-img.png" mode="widthFix"></image>
					</view>
					<view class="asset-list asset-listP">
						<view class="asset-list-header">我的资产</view>
						<view class="asset-list-box">
							<view class="asset-list-box__item" @click="$tools.jump('./assetRecord')">
								<view class="asset-list-box__item--title asset-list-box__item--title--next">OC</view>
								<view class="asset-list-box__item--info">
									<view class="asset-list-box__item--content">
										<text class="asset-list-box__item--content-txt">可用</text>
										<text class="asset-list-box__item--content-num">0.0000</text>
									</view>
									<view class="asset-list-box__item--content">
										<text class="asset-list-box__item--content-txt">折合(CNY)</text>
										<text class="asset-list-box__item--content-num">0.0111111</text>
									</view>
								</view>
							</view>
							<view class="asset-list-box__item">
								<view class="asset-list-box__item--title asset-list-box__item--title--next">USDT</view>
								<view class="asset-list-box__item--info">
									<view class="asset-list-box__item--content">
										<text class="asset-list-box__item--content-txt">可用</text>
										<text class="asset-list-box__item--content-num">0.0000</text>
									</view>
									<view class="asset-list-box__item--content">
										<text class="asset-list-box__item--content-txt">折合(CNY)</text>
										<text class="asset-list-box__item--content-num">0.0111111</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view> -->
				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				assetsTotalList: [],
				assetsList: [],
				otherAssetsList: [],
				currencyList: [],
				tabsActive:1,
				assetType:1,
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				this.getAssetsTotal();
			},
			getAssetsTotal() {
				this.$Ajax('/front/financial/assetsTotal', {}, res => {
					if (res.code == 0) {
						this.assetsTotalList = res.obj;
						this.currencyList = res.obj.assetList;
						// console.log(JSON.stringify(this.currencyList));
					}
				});
			},
			
			changeTabsActive(index) {
				if(this.assetType != index){
					this.assetType = index;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/asset/asset';
</style>
