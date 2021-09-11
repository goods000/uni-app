<template>
	<view class="pages">
		<view class="initHeader initHeader--bgWhite initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">合约设置</view>
			</view>
		</view>
		<view class="main">
			<view class="formBox">
				<view class="formBox-wrapper">
					<view class="formBox-list">
						<view class="formBox-list__label">限价委托下单确认</view>
						<view class="formBox-list__switch"><switch :checked="limiPopupShow" @change="switchChange2limi" style="transform: scale(0.7);" color="#2989fd" /></view>
					</view>
					<view class="formBox-list">
						<view class="formBox-list__label">市价委托下单确认</view>
						<view class="formBox-list__switch"><switch :checked="marketPopupShow" @change="switchChange2market" style="transform: scale(0.7);" color="#2989fd" /></view>
					</view>
					<!-- <view class="formBox-list formBox-list--dataList">
						<view class="formBox-list__label">杠杆倍数</view>
						<view class="formBox-list__data">20.00X</view>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			limiPopupShow: true,
			marketPopupShow: true,
		};
	},
	onShow() {
		this.limiPopupShow = uni.getStorageSync('limiPopupShow');
		this.marketPopupShow = uni.getStorageSync('marketPopupShow');  
	},
	methods: {
		switchChange2limi(e) {
			console.log('switch1 发生 change 事件，携带值为', e.target.value);
			uni.setStorageSync('limiPopupShow', e.target.value);
		},
		switchChange2market(e) {
			console.log('switch2 发生 change 事件，携带值为', e.target.value);
			uni.setStorageSync('marketPopupShow', e.target.value);
		}
	}
};
</script>

<style lang="scss" scoped>
page,.pages {
	background-color: #f7f8fc;
}
.formBox {
	&-list {
		@include flexBetween;
		padding: 30upx;
		border-bottom: 1upx solid #c6d2e4;
		background-color: #FFFFFF;
		&__label {
			font-size: 32upx;
			color: #101010;
		}
		&__switch {
			@include flexRight;
			transform: translateX(15upx);
		}
		&__data {
			background-position: right center;
			background-repeat: no-repeat;
			background-size: 14upx 26upx;
			background-image: url(../../static/public/icon-arrow-right-grey.png);
			color: #99999d;
			font-size: 28upx;
			padding-right: 30upx;
		}
		&--dataList {
			margin-top: 15upx;
			border-top: 1upx solid #c6d2e4;
		}
	}
}
</style>
