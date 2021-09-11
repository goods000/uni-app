<template>
	<view class="pages">
		<view class="header_bar header_bg header_fixed" v-show="showBackBtn">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">充币</view>
				<view class="header-right" @click="$tools.jump('./rechargeRecord')">充币记录</view> 
			</view> 
		</view> 
		
		<view class="recharge">
			<view class="recharge-box">
				<view class="recharge-cion">USDT(TRC20)</view>
				<view class="recharge-cion-t">充币类型</view>
				<view class="recharge-qrcode">
					<image class="qrcode" v-if="img != ''" :src="img" mode="" />
				</view>
				<view class="qrcode-btn" @click="down()">保存到相册</view>
				<view class="qrcode-code">{{ val }}</view>
				<view class="qecode-code-btn" @click="$tools.copy(val)">
					<image src="../../static/public/icon-recharge.copy.png" mode="widthFix"></image>
				</view>
			</view>
			
			<view class="recharge-bottom">
				<view class="buy-details-tips">
					<view class="buy-details-tips-title">注意：</view>
					<view class="buy-details-tips-content">请勿向上述地址充值任何非USDT资产，否则资产将不可找回。您充值到上述地址后，需要网络节点确认。您的充值地址不会经常改变，可以重复充值；如有更改我们将通过网站公告或邮件通知您。</view>
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
				val: '',
				size: 100,
				img: '',
				userList:[],
				showBackBtn: true
			}
		},
		onLoad() {
			this.getrecharge();
		},
		methods: {
			getrecharge() {
				this.$Ajax('/import/user', {}, res => {
					if (res.code == 0) {
						this.userList = res.account;
						this.val = res.account.trxAddress;
						console.log(this.val)
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
			down(){
				var that = this;
				that.showBackBtn = false;
				var pages = getCurrentPages();  
				var page = pages[pages.length - 1];  
				console.log("当前页"+pages.length-1);
				var bitmap=null;  
				var currentWebview = page.$getAppWebview();
				bitmap = new plus.nativeObj.Bitmap('amway_img');  
				// 将webview内容绘制到Bitmap对象中  
				currentWebview.draw(bitmap,function(){  
					console.log('截屏绘制图片成功');  
					bitmap.save( "_doc/a.jpg"  
					,{}  
					,function(i){  
						console.log('保存图片成功：'+JSON.stringify(i));  
						uni.saveImageToPhotosAlbum({  
							filePath: i.target,  
							success: function () {  
								bitmap.clear(); //销毁Bitmap图片  
								setTimeout(() => {
									that.showBackBtn = true;
									uni.hideLoading();
									uni.showToast({
										title: '保存图片成功',
										mask: false,  
										duration: 1500,
										icon: 'none'
									});
								}, 2000);
								
							}  
						});  
					}  
					,function(e){  
						console.log('保存图片失败：'+JSON.stringify(e));  
					});  
				},function(e){  
					console.log('截屏绘制图片失败：'+JSON.stringify(e));  
				},
				{
					check: true, // 设置为检测白屏
					clip: {
						top: '0',
						left: '0',
						height: '100%',
						width: '100%'
					} // 设置截屏区域
				});  
			}  
		}
	}
</script>

<style>
	@import '@/common/css/style.css';
	page{background: #FFFFFF;}
</style>
