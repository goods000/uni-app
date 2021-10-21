<template>
	<view class="page">
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title"></view>
			<view class="header-empty"></view>
		</view>
		<view class="page-title-cn">{{ i18n.mnemonic.tips_01 }}</view>
		<view class="first-title">{{ i18n.mnemonic.tips_02 }}</view>
		<view class="first-tips">{{ i18n.mnemonic.tips_03 }}</view>
		<view class="first-tips">{{ i18n.mnemonic.tips_04 }}</view>
		
		<view class="operateBox-formBox">
			<view class="operateBox-formBox-list operateBox-formBox-list-titleWords">
				<view class="operateBox-formBox-list-words" v-for="(item,index) in wordList" :key="index">
					{{item}}
				</view>
			</view>
		</view>
		
		<view class="first-btn" @click="next()">{{ i18n.mnemonic.tips_05 }}</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wordList:['GLIB','UN','join','onion','jump','rose','clay','cube','brief','forest','void','glare'],
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onShow() {
			if (!uni.getStorageSync('wordList')) {
				// this.getword();
			} else {
				this.wordList = uni.getStorageSync('wordList');
			}
		},
		methods:{
			// getword() {
			// 	this.$Ajax('/front/passphrase/get', {}, res => {
			// 		if (res.code == 0) {
			// 			this.wordList = res.obj;
			// 			console.log(this.wordList);
			// 			uni.setStorageSync('wordList', this.wordList);
			// 		}
			// 	});
			// },
			next(){
				uni.navigateTo({
					url:'./mnemonic'
				})
			},
		}
	}
</script>

<style lang="scss">
	.page{
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
		height: 100vh;
		width: 100vw;
		color: #FFFFFF;
		.operateBox-formBox{
			.operateBox-formBox-list{
				
			}
			.operateBox-formBox-list-titleWords{
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;
				padding: 84upx 65upx;
			}
			.operateBox-formBox-list-words{
				background: url(../../static/login/icon-words-bg.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				width: 30%;
				text-align: center;
				font-size: 32upx;
				font-weight: 500;
				color: #FFFFFF;
				padding: 25upx 0;
				margin: 0 0 32upx;
			}
		}
		.first-btn{
			width: 620rpx;
			height: 88rpx;
			background: #FFCF1E;
			box-shadow: 0rpx 4rpx 14rpx 0rpx rgba(255, 207, 30, 0.41);
			border-radius: 44rpx;
			text-align: center;
			line-height: 88rpx;
			margin: auto;
			font-size: 34rpx;
			font-family: PingFang SC-Bold;
			font-weight: bold;
			color: #040D32;
			// position: absolute;
			// bottom: 200rpx;
			margin: 10% auto;
			right: 0;left: 0;
		}
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
		.page-title-cn{
			font-size: 52rpx;
			font-family: PingFang SC-Bold;
			font-weight: 500;
			padding:20rpx 0 80rpx 60rpx;
		}
		.first-logo{
			padding: 131rpx 0 0;
			image{
				margin: auto;
				width: 218rpx;
			}
		}
		.first-title{
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 60rpx;
			text-align: center;
		}
		.first-tips{
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #00A2FF;
			text-align: center;
		}
		.forget-btn{
			width: 100vw;
			text-align: center;
			position: fixed;
			bottom: 5%;
			font-size: 24rpx;
			font-family: PingFang SC-Bold;
			font-weight: 500;
			text{
				color: #00A2FF;
				margin-left: 10rpx;
			}
		}
		.fill-plate-out{
			.btn{
				width: 620rpx;
				height: 88rpx;
				background: #FFCF1E;
				box-shadow: 0rpx 4rpx 14rpx 0rpx rgba(255, 207, 30, 0.41);
				border-radius: 44rpx;
				text-align: center;
				line-height: 88rpx;
				margin: auto;
				font-size: 34rpx;
				font-family: PingFang SC-Bold;
				font-weight: bold;
				color: #040D32;
			}
			.btn-border{
				width: 620rpx;
				height: 88rpx;
				border-radius: 44rpx;
				text-align: center;
				line-height: 88rpx;
				margin: auto;
				font-size: 34rpx;
				font-family: PingFang SC-Bold;
				font-weight: bold;
				color: #FFCF1E;
				border: 1px solid #FFCF1E;
			}
			.btn-border__margin{
				margin-top: 48upx;
			}
		}
	}
</style>
