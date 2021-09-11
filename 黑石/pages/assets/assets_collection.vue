<template>
	<view class="pages">
		<view class="initHeader initHeader--white">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">收款</view>
				<view class="initHeader-record" @click="$tools.jump('../assets/assets_transfer_record')"></view>
			</view>
		</view>
		<view class="bgBox"></view>
		<!-- <view class="logoBox">
			<image src="../../static/public/icon-logo.png" mode="widthFix"></image>
		</view> -->
		<view class="cardBox">
			<view class="cardBox-wrapper">
				<view class="cardBox-qrcode">
					<view class="cardBox-qrcode__img"><image v-if="img != ''" :src="img" mode="widthFix"></image></view>
				</view>
				<view class="cardBox-content">
					<view class="cardBox-label">钱包地址</view>
					<view class="cardBox-data">{{ walletInfo.address }}</view>
					<view class="cardBox-copy" @click="$tools.copy(walletInfo.address)"><image src="../../static/public/icon-copy-green.png" mode="widthFix"></image></view>
				</view>
			</view>
		</view>
		<!-- <view class="buttonIconBox">
			<view class="buttonIconBox-wrapper">
				<view class="buttonIconBox-item">
					<view class="buttonIconBox-item__icon"><image src="../../static/recharge/icon-scan.png" mode="widthFix"></image></view>
					<view class="buttonIconBox-item__label">扫一扫</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
import QR from '@/components/qrcode/qrcode.js';
export default {
	data() {
		return {
			walletInfo: [],

			img: '',
			val: 'www.baidu.com',
			add: 's5H3PJKBDnxSmJjjGFeU7yydWE1dsL1e',
			walletadd: '',
			showappPop: false,
			activepassword: '',
			activemodel: false,
			showtimer: null
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getWalletInfo();
		},
		getWalletInfo() {
			this.$Ajax('/front/user/baseInfo', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.walletInfo = res.obj;
					this.img = QR.createQrCodeImg(this.walletInfo.address);
				}
			});
		},
		// getWalletInfo() {
		// 	this.$Ajax('/front/address/get/display', {}, res => {
		// 		console.log(JSON.stringify(res));
		// 		if (res.code == 0) {
		// 			this.walletInfo = res.obj;
		// 			this.img = QR.createQrCodeImg(this.walletInfo.address);
		// 			// this.creatQrcode();
		// 		}
		// 	});
		// },
		scanCode() {
			uni.scanCode({
				onlyFromCamera: true,
				success: res => {
					let msg = res.result;
					this.siteMsg = msg;
					console.log(JSON.stringify(this.siteMsg));
				}
			});
		},
		creatQrcode() {
			console.log(JSON.stringify(this.walletInfo.address));
			this.img = QR.createQrCodeImg(this.walletInfo.address);
		}
	}
};
</script>

<style lang="scss" scoped>
page,
.pages {
	// background-color: #002fa7;
	min-height: 100vh;
}

.bgBox {
	background: url(@/static/collection/img-collection-bg.jpg) no-repeat;
	background-position: center;
	background-size: cover;
	
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
}

.logoBox {
	width: 160upx;
	margin: 60upx auto 0;
	@include fullImage;
}

.cardBox {
	padding: 60upx;
	// margin-top: 60upx;
	@include flexCenterColumn;
	position: relative;
	z-index: 1;
	&-wrapper {
		width: 100%;
		overflow: hidden;
		border-radius: 60upx;
	}

	&-qrcode {
		padding: 120upx 60upx;
		background-color: #ffffff;
		border-bottom: 1upx dashed #666666;
		position: relative;

		&::before {
			content: '';
			display: inline-block;
			width: 30upx;
			height: 30upx;
			border-radius: 50%;
			position: absolute;
			bottom: -15upx;
			left: -15upx;
			background-color: #1dc593;
		}

		&::after {
			content: '';
			display: inline-block;
			width: 30upx;
			height: 30upx;
			border-radius: 50%;
			position: absolute;
			bottom: -15upx;
			right: -15upx;
			background-color: #1dc593;
		}

		&__img {
			width: 380upx;
			margin: 0 auto;
			@include fullImage;
		}
	}

	&-content {
		padding: 60upx;
		background-color: #ffffff;
		text-align: center;
	}

	&-label {
		color: #101010;
		font-size: 28upx;
		margin-bottom: 15upx;
	}

	&-data {
		color: #101010;
		font-size: 24upx;
		margin-bottom: 15upx;
	}

	&-copy {
		width: 40upx;
		margin: 0 auto;
		@include fullImage;
	}
}

.buttonIconBox {
	position: relative;
	z-index: 1;
	&-wrapper {
		@include flexCenter;
	}

	&-item {
		text-align: center;
		&__icon {
			width: 100upx;
			margin-bottom: 15upx;
			@include fullImage;
		}

		&__label {
			color: #101010;
			font-size: 28upx;
		}
	}
}
</style>
