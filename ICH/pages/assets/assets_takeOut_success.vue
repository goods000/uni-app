<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper"><view class="initHeader-title">提交成功</view></view>
		</view>
		<view class="contentBox">
			<view class="contentBox-icon"><image src="../../static/public/icon-success-blue.png" mode="widthFix"></image></view>
			<view class="contentBox-title">您的 {{ price }} {{ currencyName }} 提现已发起</view>
			<view class="contentBox-msg">提现已提交，请等待审核</view>
			<view class="initButton" @click="$tools.reLaunch('../assets/assets')"><view class="initButton-btn initButton-btn--blue">查看</view></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return{
			price: '',
			currencyName: '',
		}
	},
	onLoad(option){
		this.price = option.value1;
		this.currencyName = option.currencyName;
	}
};
</script>

<style lang="scss" scoped>

.contentBox {
	padding: 200upx 60upx;
	text-align: center;
	@include flexCenterColumn;
	
	&-icon{
		@include fullImage;
		width: 100upx;
		margin-bottom: 60upx;
	}
	
	&-title {
		font-size: 32upx;
		color: #FFFFFF;
		margin-bottom: 30upx;
	}
	&-msg {
		font-size: 28upx;
		color: #999999;
		margin-bottom: 60upx;
	}
}

.initButton{
	width: 100%;
}

.infoBox {
	margin-top: 30upx;
	padding: 30upx;
	border-top: 12upx solid red;
	.infoBox-list {
		display: flex;
		.infoBox-list__label {
			width: 160upx;
			color: #898d8c;
		}
		.infoBox-list__data {
			flex: 1;
		}
	}
}
</style>
