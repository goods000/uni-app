<template>
	<view class="pages" @longtap="jieQu()">
		<view class="invite">
			<view class="header_bar" v-show="showBackBtn">
				<view class="invite-top">
					<view class="header">
						<view class="header-back" @click="$tools.back(1)"></view>
						<view class="header-title">邀请好友</view>
					</view> 
				</view> 
			</view>
			
			<view class="invite-image">
				<image src="../../static/invite/icon-invite-title.png" mode="widthFix"></image>
			</view>
			
			<view class="invite-box">
				<view class="invite-cion">您的邀请码为</view>
				<view class="invite-code"> {{userList.userId}} </view>
				<view class="invite-cion-txt">好友也可在注册时直接填写邀请码</view>
				<view class="invite-qrcode">
					<image class="qrcode" v-if="img != ''" :src="img" mode="" />
				</view>
				<view class="invite-cion-t">长按图片既可保存个人专属二维码</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import basePthURL from '../../common/js/url.js';
	import QR from '../../components/qrcode/qrcode.js';
	
	export default {
		data() {
			return {
				basePthURL: basePthURL.basePthURL,
				val: '',
				size: 100,
				img: '',
				userList:[],
				showBackBtn: true
			}
		},
		onShow() {
			console.log(basePthURL);
		},
		onLoad() {
			this.getUserList();
		},
		methods: {
			// 获取用户信息
			getUserList() {
				this.$Ajax('/user/info', {}, res => {
						if (res.code == 0) {
							this.userList = res.user
							this.val = this.basePthURL+'/register.html?invite='+ res.user.userId;
							console.log(this.val)
							this.creatQrcode();
						}
					}
				);
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
								uni.saveImageToPhotosAlbum({
									filePath: i.target,
									success: function() {
										bitmap.clear();
										setTimeout(() => {
											uni.hideLoading();
											uni.showToast({
												title: '保存图片成功',
												mask: false,  
												duration: 1500,
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

<style>
	@import '@/common/css/style.css';
	.header{background: none !important;}
</style>
