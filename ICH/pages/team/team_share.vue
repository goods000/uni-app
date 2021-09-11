<template>
	<view class="pages" @longtap="jieQu()">
		<view class="initHeader initHeader--white initHeader--absolute" v-show="showBackBtn">
			<view class="initHeader-wrapper"><view class="initHeader-back" @click="$tools.back(1)"></view></view>
		</view>
		<view class="main">
			<view class="bgBox">
				<view class="bgBox-wrapper"><image :src="imgSrc" mode="widthFix"></image></view>
			</view>
			<view class="contentBox">
				<view class="contentBox-left">
					<view class="contentBox-title">
						<text class="contentBox-text">邀请码</text>
						<text class="contentBox-number">{{ shareCode }}</text>
					</view>
					<view class="contentBox-info">邀请注册BEX</view>
				</view>
				<view class="contentBox-right"><image class="contentBox-qrcode" v-if="img != ''" :src="img" mode="widthFix" /></view>
			</view>
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
			img: '',
			code: '',
			type: 1,
			shareCode: 0,
			imgSrc: '../../static/team/img-share-bg.jpg',
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
					this.val = res.obj.address;
					console.log(this.val);
					let codeDate = res.obj.address.split('leaderName=');
					this.shareCode = codeDate[1];
					console.log(this.shareCode);
					// console.log(this.val);
					// this.val = 'http://47.112.117.332:8160/register.html?leaderName=MTgjA=';
					// this.code = res.code;
					this.creatQrcode();
				}
			});
		},
		creatQrcode() {
			let val = String(this.val);
			if (val == '') {
				return false;
			}
			let img = QR.createQrCodeImg(val, {
				size: parseInt(this.size)
			});
			this.img = img;
		},
		jieQu() {
			this.showBackBtn = false;
			this.baocun();
		},
		baocun() {
			var that = this;
			uni.showLoading({
				title: '加载中',
				mask: true
			});

			var ws = null;
			ws = this.$mp.page.$getAppWebview();

			var bitmap = null;
			bitmap = new plus.nativeObj.Bitmap('test');
			// 将webview内容绘制到Bitmap对象中
			ws.draw(
				bitmap,
				function() {
					console.log('截屏绘制图片成功');
					var bitmaps = plus.nativeObj.Bitmap.getItems();
					console.log(JSON.stringify(bitmaps), 'Bitmap对象中2');
					bitmap.save(
						'_doc/a.jpg',
						{},
						function(i) {
							console.log('保存图片成功：' + JSON.stringify(i));

							uni.saveImageToPhotosAlbum({
								filePath: i.target,
								success: function() {
									bitmap.clear();
									setTimeout(() => {
										uni.hideLoading();
										uni.showToast({
											title: '保存成功',
											icon: 'none'
										});
										that.showBackBtn = true;
									}, 2000);
								}
							});
						},
						function(e) {
							console.log('保存图片失败：' + JSON.stringify(e));
						}
					);
				},
				function(e) {
					console.log('截屏绘制图片失败：' + JSON.stringify(e));
				},
				{
					check: true, // 设置为检测白屏
					clip: {
						top: '0',
						left: '0',
						height: '100%',
						width: '100%'
					} // 设置截屏区域
				}
			);
		}
	}
};
</script>
<style lang="scss" scoped>
.main{
	@include flexCenterColumn;
	height: 100vh;
}
	
.bgBox {
	width: 100%;
	&-wrapper {
		width: 100%;
		@include fullImage;
	}
}

.contentBox {
	@include flexBetween;
	width: 100%;
	flex: 1;
	padding: 30upx;
	box-sizing: border-box;
	background-color: #ffffff;
	&-left {
		display: flex;
		align-items: flex-start;
		// padding: 0 30upx;
		flex-direction: column;
		justify-content: center;
		padding-left: 15upx;
	}

	&-title {
		// 兼容
		font-size: 0;
		margin-bottom: 15upx;
	}

	&-text {
		font-size: 32upx;
		color: #000000;
		font-weight: bold;
	}

	&-number {
		font-size: 40upx;
		color: $globalColor-blue;
		margin-left: 15upx;
		font-weight: bold;
	}

	&-info {
		font-size: 28upx;
		color: #999999;
		font-weight: bold;
	}

	&-qrcode {
		width: 160upx;
	}
}

.shareCode {
	position: fixed;
	bottom: 30upx;
	left: 46upx;
	color: #000000;
	z-index: 9;
	font-size: 24upx;
	letter-spacing: 4upx;
	font-family: 'Microsoft YaHei';
}
</style>
