<template>
	<view class="pages" @longtap="jieQu()">
		<view class="invite">
		<image src="../../static/invite/icon-invite-bg.png" mode="widthFix" class="invite_bg"></image>
			<view class="" v-show="showBackBtn">
				<view class="header">
					<view class="header-white" @click="$tools.back(1)"></view>
				</view> 
			</view> 
			
			<view class="inviteBox">
				<image src="../../static/invite/icon-invite-title.png" mode="widthFix" class="inviteBox-image"></image>
				<view class="inviteBox-item">
					<view class="inviteBox-item-qrcode">
						<image v-if="img != ''" :src="img" mode="" class="inviteBox-item-qrcode-code"></image>
						<image src="../../static/pack/Icon-1024.png" mode="widthFix" class="inviteBox-item-qrcode-logo"></image>
					</view>
					<view class="inviteBox-item-coin">邀请码</view>
					<view class="inviteBox-item-code"> {{ code }} </view>
					<view class="inviteBox-item-btn" @click="$tools.copy(code)">复制</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import QR from '../../components/qrcode/qrcode.js';
	
	export default {
		data() {
			return {
				code:'',
				size: 100,
				img: '',
				userList:[],
				showBackBtn: true,
			}
		},
		onShow() {
			this.getUserList();
		},
		methods: {
			// 获取用户信息
			getUserList() {
				this.$Ajax('/front/user/shareAddress', {}, res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.address = res.obj.address;
							console.log(this.address)
							this.code = this.address.split('?uid=')[1];
							this.img = this.creatQrcode(this.address);
						}
					}
				);
			},
			creatQrcode(url) {
				if (url == '') {
					return false;
				}
				let img = QR.createQrCodeImg(url);
				return img;
			},
			jieQu() {
				this.showBackBtn = false;
				this.baocun();
			},
			baocun() {
				var that = this;
				uni.showLoading({
					title: '截图中',
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
												title: '截取成功',
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
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/invite/invite';
	.header{
		/* #ifdef H5 */
		top: 0;
		/* #endif */
		/* #ifdef APP-PLUS */
		top: 60upx;
		/* #endif */
	}
</style>
