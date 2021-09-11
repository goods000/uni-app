<template>
	<view class="pages">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">添加{{isMethod}}</view>
			</view> 
		</view> 
		<view class="form">
			<view class="formBox">
				<view class="formBox-group">
					<input type="text" placeholder="请输入姓名" v-model="username" />
				</view>
				<view class="formBox-group">
					<input type="text" :placeholder="'请输入'+ isMethod + '账号'" v-model="account" />
				</view>
			</view>
			<view class="mt"></view>
			
			<view class="formBox">
				<view class="formBox-input">
					<view class="formBox-input-label">收款二维码</view>
					<view class="formBox-input-image">
						<view class="formBox-input-image-bg" :style="'background: url( '+ uploadList.src +') no-repeat;background-size: 100% 100%;'">
							<view class="formBox-input-image-bg__photo" @click="chooseImg()">
								<image src="../../static/public/img-upload-1.png" mode="widthFix"></image>
								<!-- <image :src="uploadList.src" mode="widthFix"></image> -->
							</view>
							<view class="formBox-input-image-bg-txt">点击上传</view>
						</view>
					</view>
					<view class="formBox-input-tips" @click="getSecurity()">（上传收款二维码）</view>
				</view>
			</view>
			
			<view class="initBtn" @click="submit()">确定</view>
			
		</view>
		
		<!-- 安全验证 -->
		<uni-popup ref="securityPopup" type="bottom" :animation="true">
			<view class="oppupBox">
				<view class="header_bar">
					<view class="header">
						<view class="header-title">安全验证</view>
						<view class="header-right" @click="close()">
							<image src="../../static/public/icon-close.png" mode="widthFix"></image>
						</view> 
					</view> 
				</view>
				<view class="oppupBox-form">
					<view class="oppupBox-form-label">钱包密码</view>
					<input type="password" placeholder="请输入您的钱包密码" v-model="password"/>
				</view>
				
				<view class="oppupBox-forget" @click="$tools.jump('../setting/resetPassword')">忘记钱包密码？</view>
				<view class="initBtn">交易</view>
				
			</view>
		</uni-popup>
		
		
		
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	import weburl from '../../common/js/url.js';
	export default {
		data() {
			return {
				username: '',
				account: '',
				isMethod: '',
				password: '',
				uploadList: {src:''},
			}
		},
		onLoad(value1) {
			this.isMethod = value1.value1;
			console.log(this.isMethod)
		},
		onShow() {
			if(this.isMethod == '支付宝'){
				this.type = 2
			}else{
				this.type = 3
			}
		},
		methods:{
			getSecurity() {this.openPopup('securityPopup');},
			close() {this.hidePopup('securityPopup');},
			chooseImg() {
				let that = this;
				var token = uni.getStorageSync('token');
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['camera', 'album'], //从相册选择
					sourceType: ['album'], //从相册选择
					success: res => {
						this.uploadList.src = res.tempFilePaths[0];
					},
					fail: function() {
						console.log('上传图片接口调用失败');
						return;
					}
				});
			},
			submit(choosePhotoPath) {
				let that = this;
				if(this.username == ''){
					return this.$tools.toast('请输入姓名');
				}
				if(this.account == ''){
					return this.$tools.toast('请输入'+ this.isMethod + '账号');
				}
				if (this.uploadList.src == '') {
					return this.$tools.toast('请上传收款二维码');
				}
				uni.showLoading({
					title: '上传中',
					mask: true
				});
							
				let token = uni.getStorageSync('token');
				let files = [];
				files.push({ name: 'file', uri: this.uploadList.src });
				let data = {
					token: token,
					name: this.username,
					account: this.account,
					payType: this.type,
					pic: this.pic == '' ? '' : this.uploadList.src,
					file: this.file == '' ? '' : this.uploadList.src,
				};
				console.log(files);
				uni.uploadFile({
					url: weburl.webUrl + '/front/otc/addPay',
					files: files,
					header: { token: token },
					formData: data,
					success: res => {
						var data = JSON.parse(res.data);
						console.log(data);
						if (data.code == 0) {
							this.username ='',
							this.account ='',
							this.uploadList.src ='',
							this.$tools.toastBack('添加' +this.isMethod+'成功', 2);
						} else {
							that.$tools.toast(data.msg);
						}
					},
					fail(err) {},
					complete: res => {
						uni.hideLoading();
					}
				});
				uni.hideLoading();
			},
			/* 弹出框公用 */
			openPopup(e, item) {
				this.popupInfo = item;
				this.$refs[e].open();
			},
			hidePopup(e) {
				this.$refs[e].close();
			},
			changePopup(e) {
				console.log('popup ' + e.type + ' 状态', e.show);
				if (!e.show) {
					this.pay_password = '';
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/setting/setting';
	.oppupBox .header-title{font-size: 40upx;font-weight: bold;}
	page{background: #FFFFFF;}
	.formBox{
		&-input{
			padding: 24upx 34upx;
			&-label{
				color: $globalColor-fontStyle;
				font-size: 28upx;
				margin-bottom: 22upx;
			}
			&-image{
				background: $globalColor-bgStyle;
				border: 1px solid rgba(221,229,238,0.24);
				border-radius: 8upx;
				max-height: 218upx;
				display: block;
				&-bg{
					background-repeat: no-repeat;
					background-size: 100% 100%;
					&__photo {
						@include fullImage;
						margin: 0 auto;
						padding: 63upx 0 11upx;
						image {
							width: 66upx;
							height: 66upx;
							margin: auto;
						}
						&:last-child {
							margin-bottom: 0;
						}
					}
					&-txt{
						color: #999999;
						font-size: 24upx;
						text-align: center;
						padding-bottom: 44upx;
					}
				}
			}
			&-tips{
				color: #999999;
				font-size: 28upx;
				text-align: center;
				margin-top: 8upx;
			}
		}
	}
</style>
