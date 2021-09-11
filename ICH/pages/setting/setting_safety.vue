<template>
	<view class="pages">
		<view class="initHeader initHeader--bgWhite initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">安全中心</view>
			</view>
		</view>
		<view class="listBox">
			<view class="listBox-wrapper">
				<view class="listBox-list" @click="$tools.jump('../setting/setting_changeLoginPsw')">
					<view class="listBox-list__label">修改登陆密码</view>
					<view class="listBox-list__data">去修改</view>
				</view>
				<view class="listBox-list listBox-list--holder" @click="$tools.jump('../setting/setting_changeTransactionPsd')">
					<view class="listBox-list__label">修改交易密码</view>
					<view class="listBox-list__data">去修改</view>
				</view>
				<view class="listBox-list" @click="$tools.noOpen()">
					<view class="listBox-list__label">谷歌验证</view>
					<view class="listBox-list__data">去验证</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	onShow() {
		
	},
	methods: {
		
	}
};
</script>

<style lang="scss" scoped>
page,.pages {
	background-color: #f7f8fc;
}
.listBox {
	// padding: 0 30upx;
	// padding-top: 92upx;
	&-list {
		@include flexBetween;
		align-items: stretch;
		padding: 30upx;
		font-size: 32upx;
		color: #101010;
		border-bottom: 2upx solid #c6d2e4;
		background-color: #FFFFFF;
		
		&--holder{
			margin-bottom: 15upx;
			
			&+ view{
				border-top: 2upx solid #c6d2e4;
			}
		}

		&__label {
			&--colorRed {
				color: #f75555;
			}
		}

		&__data {
			@include flexCenter;
			color: #bfc0c7;
			padding-right: 30upx;
			background: url(@/static/public/icon-arrow-right-grey.png) no-repeat;
			background-size: 14upx 26upx;
			background-position: right center;
		}
	}
}
</style>
