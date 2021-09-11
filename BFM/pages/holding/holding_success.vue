<template>
	<view class="pages">
		<view class="initHeader initHeader--black header-color">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">支付成功</view>
			</view>
		</view>
		<view class="contentBox">
			<view class="contentBox_wrapper">
				<image src="../../static/financial/icon-success.png" mode="widthFix"></image>
				<view class="contentBox_wrapper-title">您已存入{{ quota }}BNC</view>
				<view class="contentBox_wrapper-mess">预计收益时间：{{ createTime }}</view>
				<view class="contentBox_wrapper-money">收益金额：{{ estimate | number(4) }}</view>
			</view>
		</view>
		<view class="initButton"><view class="initButton-btn initButton-btn--grad" @click="$tools.switchTab('../financial/financial')">返回挖矿</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			quota: '',
			createTime: '',
			estimate: ''
		};
	},
	onLoad(hash) {
		this.quota = hash.value1;
		this.createTime = hash.value2;
		this.estimate = hash.value3;
	}
};
</script>

<style lang="scss" scoped>
.contentBox {
	&_wrapper {
		position: relative;
		@include flexCenterColumn;
		margin-top: 60upx;
		image {
			width: 110rpx;
			@include fullImage;
			margin: 30upx auto;
		}
		&-title {
			color: #333333;
			font-size: 36rpx;
			margin-bottom: 15upx;
		}
		&-mess {
			font-size: 28rpx;
			color: #999999;
			margin-bottom: 15upx;
		}
		&-money {
			font-size: 28rpx;
			color: #999999;
			margin-bottom: 120upx;
		}
		&-btn {
			width: 650rpx;
			margin: 0 auto;
			font-size: 30rpx;
			color: #ffffff;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			background-color: #29a3ed;
			border-radius: 50rpx;
		}
	}
}

.initButton{
	padding: 30upx;
}
</style>
