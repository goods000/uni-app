<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--fixed initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">记录详情</view>
			</view>
		</view>
		<view class="main">
			<view class="listBox">
				<view class="listBox-wrapper">
					<view class="listBox-title">+00046568</view>
					<view class="listBox-list">
						<view class="listBox-list__label">类型</view>
						<view class="listBox-list__data">买入</view>
					</view>
					<view class="listBox-list">
						<view class="listBox-list__label">状态</view>
						<view class="listBox-list__data">已完成</view>
					</view>
					<view class="listBox-list">
						<view class="listBox-list__label">时间</view>
						<view class="listBox-list__data">2020.07.16 11:51</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad(option) {},
	onShow() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.listBox {
	position: relative;
	z-index: 1;
	padding: 30upx 0;
	&-wrapper {
		padding: 0 30upx;
	}
	&-title {
		color: #0185f0;
		font-size: 52upx;
		border-bottom: 1upx solid #c6d2e4;
		padding: 30upx 0;
	}

	&-list {
		@include flexBetween;
		padding: 30upx 0;
		border-bottom: 1upx solid #c6d2e4;
		font-size: 32upx;
		&__label {
			color: #c2c3cf;
		}
		
		&__data{
			color: #101010;
		}
	}
}
</style>
