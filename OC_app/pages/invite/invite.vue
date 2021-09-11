<template>
	<view class="pages" @longtap="jieQu()">
		<view class="invite">
			
			<view class="header_bar header_bar--absolute" v-show="showBackBtn">
				<view class="header">
					<view class="header-white" @click="$tools.back(1)"></view>
					<view class="header-title-white">邀请好友</view>
				</view> 
			</view> 
			
			<view class="invite-title">邀好友共创财富</view>
			<view class="invite-txt">INVITE FRIENDS TO CREATE WEALTH</view>
			
			<view class="invite-code">
				<view class="invite-code-qrcode">
					<image class="qrcode" v-if="img != ''" :src="img" mode="" />
				</view>
			</view>
			
			<view class="invite-bottom">
				<view class="invite-bottom-title">Bcdex</view>
				<view class="invite-bottom-txt">安全/可靠/诚心为您服务</view>
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
				showBackBtn: true,
			}
		},
		onShow() {
			this.init();
			console.log("this.basePthURL:",this.basePthURL)
		},
		methods: {
			init(){
				this.getCopyLink();
				// this.getUserList();
			},
			// 获取用户信息
			getUserList() {
				this.$Ajax('/front/user/baseInfo', {}, res => {
						if (res.code == 0) {
							this.userList = res.obj.user
							// this.val = this.webUrl+'/oc/index.html?parentName='+ res.obj.user.inviteCode;
							this.val = this.basePthURL+'/oc?parentName='+ res.obj.user.inviteCode;
							console.log(this.val)
							this.creatQrcode();
						}
					}
				);
			},
			getCopyLink() {
				this.$Ajax('/front/user/shareAddress', {}, res => {
					console.log(JSON.stringify(res));
					if (res.code == 0) {
						this.val = res.obj.address;
						// console.log(this.val)
						let codeDate = res.obj.address.split('leaderName=');
						this.shareCode = codeDate[1];
						this.img = this.creatQrcode(this.val);
					}
				});
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
</style>
