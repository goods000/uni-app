<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-title">生态</view>
			</view>
		</view>
		<view class="otherBox">
			<view class="otherBox-wrapper">
				<view class="otherBox-item" @click="$tools.jump('../cloudMining/cloudMining')">
					<view class="otherBox-item__icon"><image src="../../static/ecology/icon-item-01.png" mode="widthFix"></image></view>
					<view class="otherBox-item__label">BNC算力</view>
				</view>
				<view class="otherBox-item" @click="$tools.noOpen()">
					<view class="otherBox-item__icon"><image src="../../static/ecology/icon-item-02.png" mode="widthFix"></image></view>
					<view class="otherBox-item__label">波卡生态</view>
				</view>
				<view class="otherBox-item" @click="$tools.noOpen()">
					<view class="otherBox-item__icon"><image src="../../static/ecology/icon-item-03.png" mode="widthFix"></image></view>
					<view class="otherBox-item__label">社交</view>
				</view>
				<view class="otherBox-item" @click="$tools.noOpen()">
					<view class="otherBox-item__icon"><image src="../../static/ecology/icon-item-04.png" mode="widthFix"></image></view>
					<view class="otherBox-item__label">支付</view>
				</view>
				<view class="otherBox-item" @click="$tools.noOpen()">
					<view class="otherBox-item__icon"><image src="../../static/ecology/icon-item-05.png" mode="widthFix"></image></view>
					<view class="otherBox-item__label">旅游</view>
				</view>
				<view class="otherBox-item" @click="$tools.noOpen()">
					<view class="otherBox-item__icon"><image src="../../static/ecology/icon-item-06.png" mode="widthFix"></image></view>
					<view class="otherBox-item__label">酒店</view>
				</view>
				<view class="otherBox-item" @click="$tools.noOpen()">
					<view class="otherBox-item__icon"><image src="../../static/ecology/icon-item-07.png" mode="widthFix"></image></view>
					<view class="otherBox-item__label">商城</view>
				</view>
				<view class="otherBox-item" @click="$tools.noOpen()">
					<view class="otherBox-item__icon"><image src="../../static/ecology/icon-item-08.png" mode="widthFix"></image></view>
					<view class="otherBox-item__label">机票</view>
				</view>
				<view class="otherBox-item" @click="$tools.noOpen()">
					<view class="otherBox-item__icon"><image src="../../static/ecology/icon-item-09.png" mode="widthFix"></image></view>
					<view class="otherBox-item__label">话费</view>
				</view>
				<view class="otherBox-item" @click="$tools.noOpen()">
					<view class="otherBox-item__icon"><image src="../../static/ecology/icon-item-10.png" mode="widthFix"></image></view>
					<view class="otherBox-item__label">油卡</view>
				</view>
				<view class="otherBox-item" @click="$tools.noOpen()">
					<view class="otherBox-item__icon"><image src="../../static/ecology/icon-item-11.png" mode="widthFix"></image></view>
					<view class="otherBox-item__label">合约</view>
				</view>
				<view class="otherBox-item" @click="$tools.noOpen()">
					<view class="otherBox-item__icon"><image src="../../static/ecology/icon-item-12.png" mode="widthFix"></image></view>
					<view class="otherBox-item__label">借贷</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.otherBox {
	&-wrapper {
		@include flexLeft;
		flex-wrap: wrap;
		// padding: 30upx;
	}
	&-item {
		width: 33.33%;
		padding: 30upx 0 60upx;
		@include flexCenterColumn;
		&__icon {
			width: 72upx;
			margin-bottom: 15upx;
			@include fullImage;
		}
		&__label {
			color: $globalColor-fontStyle;
			font-size: 26upx;
		}
	}
}
</style>
