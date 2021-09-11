<template>
	<view class="pages">
		<view class="">
			
			<view class="header_bar header_bg header_fixed header_border">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">交易明细</view>
				</view> 
			</view> 
			
			<view class="releaseRecord">
				<view class="releaseRecord-box">
					<view class="releaseRecord-box-header">
						<view class="releaseRecord-box-header__title"><text class="buy">买入</text>OC/USDT</view>
					</view>
					<view class="asset-list-box__item--info">
						<view class="asset-list-box__item--content">
							<text class="asset-list-box__item--content-txt">成交数量(OC)</text>
							<text class="asset-list-box__item--content-num">15.25644</text>
						</view>
						<view class="asset-list-box__item--content">
							<text class="asset-list-box__item--content-txt">成交均价(OC)</text>
							<text class="asset-list-box__item--content-num">10.2424</text>
						</view>
					</view>
					<view class="asset-list-box__item--info">
						<view class="asset-list-box__item--content">
							<text class="asset-list-box__item--content-txt">交易手续费(USDT)</text>
							<text class="asset-list-box__item--content-num">10.24</text>
						</view>
						<view class="asset-list-box__item--content">
							<text class="asset-list-box__item--content-txt">成交量(USDT)</text>
							<text class="asset-list-box__item--content-num">5768.25</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- <view class="initNoData">暂无记录</view> -->
			<view class="recordListBox">
				<view class="recordList">
					<view class="recordList-box">
						<view class="recordList-box-title">成交价</view>
						<view class="recordList-box-title">42.255787 USDT</view>
					</view>
					<view class="recordList-box">
						<view class="recordList-box-title">成交量</view>
						<view class="recordList-box-title">2400 OC</view>
					</view>
					<view class="recordList-box">
						<view class="recordList-box-title">手续费</view>
						<view class="recordList-box-title">0.2 USDT</view>
					</view>
					<view class="recordList-box">
						<view class="recordList-box-title">交易时间</view>
						<view class="recordList-box-title">2021/01/11 17:10</view>
					</view>
				</view>
				<view class="recordList">
					<view class="recordList-box">
						<view class="recordList-box-title">成交价</view>
						<view class="recordList-box-title">42.255787 USDT</view>
					</view>
					<view class="recordList-box">
						<view class="recordList-box-title">成交量</view>
						<view class="recordList-box-title">2400 OC</view>
					</view>
					<view class="recordList-box">
						<view class="recordList-box-title">手续费</view>
						<view class="recordList-box-title">0.2 USDT</view>
					</view>
					<view class="recordList-box">
						<view class="recordList-box-title">交易时间</view>
						<view class="recordList-box-title">2021/01/11 17:10</view>
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
	.header_fixed + view {padding-top: 100upx;}
	.releaseRecord-box{border-bottom: none;}
	.recordListBox{margin-top: 14upx;}
	.recordList{
		border-bottom: 1px solid #f5f5f5;
		padding: 10upx 32upx;
		background: $globalColor-white;
		&-box{
			@include flexBetween;
			&-title{
				color: $globalColor-fontStyle;
				font-size: 24upx;
				padding: 15upx 0;
			}
		}
	}
</style>
