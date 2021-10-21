<template>
	<view class="page" :style="'background-image:url(' + i18n.image.imgSrc + ')'">
		<view class="share-plate-out">
			<view class="share-plate">
				<view class="pic">
					<image :src="qrcodeImage" mode=""></image>
				</view>
				<view class="title-plate">
					<view class="title-line"></view>
					<view class="title-text">{{ i18n.user.Invitation_code }}</view>
					<view class="title-line"></view>
				</view>
				<view class="count">{{sharecode}}</view>
				<view class="copy-text" @click="$tools.copy(qrcodeAddress)">{{ i18n.global.copy }}</view>
			</view>
		</view>
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title"></view>
			<view class="header-empty"></view>
		</view>
	</view>
</template>

<script>
	import QR from '@/components/qrcode/qrcode.js';	
	export default {
		data() {
			return {
				qrcodeAddress:'64970704',
				qrcodeImage: '',
				sharecode:'',
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onLoad() {
			// this.qrcodeImage = QR.createQrCodeImg(this.qrcodeAddress);
			this.getShareAddress();
		},
		methods:{
			getShareAddress(){
				this.$Ajax('/front/user/shareAddress',{},res=>{
					console.log(res);
					this.qrcodeAddress = res.obj.address;
					this.sharecode = res.obj.inviteCode;
					console.log(this.sharecode);
					this.qrcodeImage = QR.createQrCodeImg(this.qrcodeAddress);
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
		.share-plate-out{
			position: fixed;
			bottom: 100rpx;
			width: 100vw;
			.share-plate{
				width: 612rpx;
				height: 752rpx;
				background-color: #040D32;
				margin: auto;
				.pic{
					padding-top: 100rpx;
					width: 100%;
					image{
						width: 350rpx;
						height: 350rpx;
						margin: auto;
					}
				}
			}
			.title-plate{
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 240rpx;
				margin: auto;
				padding-top: 70rpx;
				.title-line{
					width: 32rpx;
					height: 2rpx;
					background-color: #CCCCCC;
				}
				.title-text{
					font-size: 24rpx;
					font-family: PingFang SC-Bold;
					font-weight: 500;
					color: #999999;
					white-space: nowrap;
				}
			}
			.count{
				font-size: 59rpx;
				font-family: DIN;
				font-weight: bold;
				text-align: center;
			}
			.copy-text{
				font-size: 24rpx;
				font-family: PingFang SC-Bold;
				font-weight: 500;
				text-decoration: underline;
				color: #587BFB;
				text-align: center;
			}
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
	}
</style>
