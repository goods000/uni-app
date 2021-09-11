<template>
	<view class="pages">
		<view class="">
			
			<view class="header_bar header_bg header_fixed header_border">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">委托订单</view>
				</view> 
			</view> 
			
			<view class="release_tabs">
				<view class="release_tabs-list">
					<view class="release_tabs-list-txt" :class="{ 'active': tabsActive == 0 }" @click="changeTabsActive(0)">全部委托</view>
					<view class="release_tabs-list-txt" :class="{ 'active': tabsActive == 1 }" @click="changeTabsActive(1)">当前委托</view>
				</view>
			</view>
			
			<view class="releaseRecord">
				<view class="releaseRecord-box">
					<view class="releaseRecord-box-header">
						<view class="releaseRecord-box-header__title"><text class="buy">买入</text>OC/USDT</view>
						<view class="releaseRecord-box-header__status" @click="$tools.jump('./entrustRecord')">
							<text class="releaseRecord-box-header__status--end">已成交</text>
							<!-- <text class="releaseRecord-box-header__status--end">已撤销</text> -->
						</view>
					</view>
					<view class="asset-list-box__item--info">
						<view class="asset-list-box__item--content">
							<text class="asset-list-box__item--content-txt">时间</text>
							<text class="asset-list-box__item--content-num">15:22 9/16</text>
						</view>
						<view class="asset-list-box__item--content">
							<text class="asset-list-box__item--content-txt">委托价(USDT)</text>
							<text class="asset-list-box__item--content-num">市价</text>
						</view>
						<view class="asset-list-box__item--content">
							<text class="asset-list-box__item--content-txt">交易额(OC)</text>
							<text class="asset-list-box__item--content-num">0.245754</text>
						</view>
					</view>
					<view class="asset-list-box__item--info">
						<view class="asset-list-box__item--content">
							<text class="asset-list-box__item--content-txt">成交总额(USDT)</text>
							<text class="asset-list-box__item--content-num">214.57</text>
						</view>
						<view class="asset-list-box__item--content">
							<text class="asset-list-box__item--content-txt">成交均价(USDT)</text>
							<text class="asset-list-box__item--content-num">0.0234</text>
						</view>
						<view class="asset-list-box__item--content">
							<text class="asset-list-box__item--content-txt">成交量(OC)</text>
							<text class="asset-list-box__item--content-num">100.00</text>
						</view>
					</view>
				</view>
				<view class="releaseRecord-box">
					<view class="releaseRecord-box-header">
						<view class="releaseRecord-box-header__title"><text class="sell">卖出</text>OC/USDT</view>
						<view class="releaseRecord-box-header__status">
							<text class="releaseRecord-box-header__status--end">已撤销</text>
						</view>
					</view>
					<view class="asset-list-box__item--info">
						<view class="asset-list-box__item--content">
							<text class="asset-list-box__item--content-txt">时间</text>
							<text class="asset-list-box__item--content-num">15:22 9/16</text>
						</view>
						<view class="asset-list-box__item--content">
							<text class="asset-list-box__item--content-txt">委托价(USDT)</text>
							<text class="asset-list-box__item--content-num">市价</text>
						</view>
						<view class="asset-list-box__item--content">
							<text class="asset-list-box__item--content-txt">交易额(OC)</text>
							<text class="asset-list-box__item--content-num">0.245754</text>
						</view>
					</view>
					<view class="asset-list-box__item--info">
						<view class="asset-list-box__item--content">
							<text class="asset-list-box__item--content-txt">成交总额(USDT)</text>
							<text class="asset-list-box__item--content-num">214.57</text>
						</view>
						<view class="asset-list-box__item--content">
							<text class="asset-list-box__item--content-txt">成交均价(USDT)</text>
							<text class="asset-list-box__item--content-num">0.0234</text>
						</view>
						<view class="asset-list-box__item--content">
							<text class="asset-list-box__item--content-txt">成交量(OC)</text>
							<text class="asset-list-box__item--content-num">100.00</text>
						</view>
					</view>
				</view>
				
				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabsActive: 0,
				
			}
		},
		onShow() {
	
		},
		methods: {
			changeTabsActive(index) {
				if(this.tabsActive != index){
					this.tabsActive = index;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/asset/asset';
	@import '@/common/scss/pages/release/releaseRecord';
	.release_tabs{margin-bottom: 0;}
	.asset-list-box__item--content:nth-last-child(2){align-items: center;}
</style>
