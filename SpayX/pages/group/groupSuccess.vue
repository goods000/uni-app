<template>
	<view class="page">
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="goIndex()">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.group.Successful_crowdfunding }}</view>
			<view class="header-empty"></view>
		</view>
		<view class="success-body">
			<view class="success-pic">
				<image src="../../static/group/success-icon.png" mode=""></image>
			</view>
			<view class="success-title">{{ i18n.group.Successful_crowdfunding }}</view>
			<view class="success-tips">{{ i18n.group.tips_01 }}</view>
			<view class="success-tips">{{ i18n.group.tips_02 }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			},
		},
		onLoad() {
			
		},
		methods:{
			goIndex(){
				uni.switchTab({
					url:'../index/index'
				})
			},
		}
	}
</script>

<style lang="scss">
	.page{
		color: #FFFFFF;
		.header-plate{
			height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			.back-pic{
				width: 17rpx;
				height: 31rpx;
				image{
					width: 17rpx;
					height: 31rpx;
				}
			}
			.header-title{
				font-size: 36rpx;
				font-family: PingFang SC-Bold;
				font-weight: bold;
			}
			.header-empty{
				width: 17rpx;
			}
		}
		.success-body{
			padding-top: 250rpx;
			.success-pic{
				width: 152rpx;
				height: 152rpx;
				margin: auto;
				image{
					width: 152rpx;
					height: 152rpx;
				}
			}
			.success-title{
				font-size: 40rpx;
				font-family: PingFang SC-Bold;
				font-weight: bold;
				color: #00A2FF;
				text-align: center;
				padding: 38rpx 0 68rpx 0;
			}
			.success-tips{
				font-size: 28rpx;
				font-family: PingFang SC-Bold;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
			}
		}
	}
</style>
