<template>
	<view class="pages" @longtap="jieQu()">
		<view class="initHeader initHeader--white initHeader--absolute" v-show="showBackBtn">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>
		<view class="main">
			<view class="bgBox"><!-- <view class="bgBox-wrapper"><image src="../../static/share/icon-bg.png" mode="widthFix"></image></view> --></view>

			<view class="titleBox">
				<view class="titleBox-wrapper"><image src="../../static/share/icon-title.png" mode="widthFix"></image></view>
			</view>

			<view class="planeBox">
				<view class="planeBox-wrapper">
					<view class="planeBox-shareBox">
						<view class="planeBox-shareBox__label">邀请码</view>
						<view class="planeBox-shareBox__data">
							<text>{{ shareCode }}</text>
							<view class="planeBox-shareBox__copy">
								<image src="../../static/public/icon-copy-green.png" mode="widthFix" @click="$tools.copy(shareCode)"></image>
							</view>
						</view>
					</view>

					<view class="planeBox-qrcode">
						<view class="planeBox-qrcode__wrapper">
							<view class="planeBox-qrcode__code"><image class="planeBox-qrcode" v-if="shareImg != ''" :src="shareImg" mode="widthFix" /></view>
							<!-- <view class="planeBox-qrcode__note">
								<text>邀请码：{{ shareCode }}</text>
								<image src="../../static/public/icon-copy-golden.png" mode="widthFix" @click="$tools.copy(shareCode)"></image>
							</view> -->
						</view>
					</view>

					<view class="planeBox-button initButton"><view class="initButton-btn initButton-btn--style" @click="$tools.copy(shareAddress)">复制邀请链接</view></view>
				</view>
			</view>

			<!-- <view class="contentBox">
				<view class="contentBox-wrapper">
					<view class="contentBox-itemBox">
						<view class="contentBox-itemBox__item">
							<view class="contentBox-itemBox__item-icon"><image src="../../static/share/icon-share-item-01.png" mode="widthFix"></image></view>
							<view class="contentBox-itemBox__item-label">分享好友</view>
						</view>
						<view class="contentBox-itemBox__item">
							<view class="contentBox-itemBox__item-icon"><image src="../../static/share/icon-share-item-02.png" mode="widthFix"></image></view>
							<view class="contentBox-itemBox__item-label">好友注册</view>
						</view>
						<view class="contentBox-itemBox__item">
							<view class="contentBox-itemBox__item-icon"><image src="../../static/share/icon-share-item-03.png" mode="widthFix"></image></view>
							<view class="contentBox-itemBox__item-label">获得奖励</view>
						</view>
					</view>
					<view class="contentBox-qrcode">
						<view class="contentBox-qrcode__wrapper">
							<view class="contentBox-qrcode__code"><image class="contentBox-qrcode" v-if="img != ''" :src="img" mode="widthFix" /></view>
							<view class="contentBox-qrcode__note">
								<text>邀请码：{{ shareCode }}</text>
								<image src="../../static/public/icon-copy-golden.png" mode="widthFix" @click="$tools.copy(shareCode)"></image>
							</view>
							<view class="contentBox-qrcode__button initButton">
								<view class="initButton-btn initButton-btn--golden" @click="$tools.copy(val)">复制邀请链接</view>
							</view>
						</view>
					</view>
				</view>
			</view> -->
		</view>
		<!-- <view class="mafu" id="qrcode"><image class="imageMa" v-if="img != ''" :src="img" mode="widthFix" /></view>
		<view class="shareCode">你的邀请码为: {{ shareCode }}</view> -->
	</view>
</template>
<script>
import QR from '../../components/qrcode/qrcode.js';

export default {
	data() {
		return {
			val: '',
			size: 100,
			shareImg: '',
			code: '',
			type: 1,
			shareCode: 0,
			imgSrc: '../../static/share/icon-bg.png',
			showBackBtn: true
		};
	},
	onLoad() {
		this.getCopyLink();
	},
	methods: {
		getCopyLink() {
			this.$Ajax('/front/user/shareAddress', {}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.shareAddress = res.obj.address;
					let codeDate = res.obj.address.split('leaderName=');
					this.shareCode = codeDate[1];
					this.shareImg = this.creatQrcode(this.shareAddress);
				}
			});
		},
		creatQrcode(url) {
			if (url == '') {
				return false;
			}
			let img = QR.createQrCodeImg(url);
			return img;
		}
	}
};
</script>
<style lang="scss" scoped>
.main {
	@include flexCenterColumn;
	height: 100vh;
}

.bgBox {
	text-align: center;
	width: 100%;
	background: url(../../static/share/img-share-01.jpg);
	background-size: 100% auto;
	background-position: center top;
	position: absolute;
	height: 100vh;
	width: 100%;
	left: 0;
	top: 0;

	&-wrapper {
		@include fullImage;
	}
}

.titleBox {
	margin-top: 210upx;
	margin-bottom: 60upx;
	&-wrapper {
		width: 750upx;
		@include fullImage;
	}
}

.planeBox {
	// // position: absolute;
	// bottom: 30upx;
	position: relative;
	width: 100%;
	flex: 1;
	padding: 0 30upx;

	&-wrapper {
		@include flexCenterColumn;
		background-color: #ffffff;
		border-radius: 15upx;
		padding: 60upx;
	}

	&-shareBox {
		text-align: center;
		&__label {
			color: #333333;
			font-size: 32upx;
			margin-bottom: 15upx;
		}

		&__data {
			@include flexCenter;
			color: #333333;
			font-size: 44upx;
			font-weight: 300;
			position: relative;
		}

		&__copy {
			position: absolute;
			right: -50upx;
			top: 50%;
			transform: translateY(-50%);
			width: 40upx;
			@include fullImage;
		}
	}

	&-qrcode {
		width: 100%;
		&__wrapper {
			@include flexCenterColumn;
			background-color: #ffffff;
			padding: 30upx;
			border-radius: 15upx;
		}

		&__code {
			width: 280upx;
			padding: 15upx;
			background-color: #ffffff;
			border-radius: 15upx;
			@include fullImage;
		}

		&__note {
			@include flexCenter;
			color: #ffffff;
			text-align: center;
			font-size: 28upx;
			text {
				margin-right: 15upx;
			}
			image {
				width: 40upx;
			}
		}
	}

	&-button {
		width: 100%;
	}
}
</style>
