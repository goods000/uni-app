<template>
	<view class="page">
		<view class="header_bar header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">上传付款凭证</view>
			</view> 
		</view> 
		
		<view class="upload">
			<view class="upload__image">
				<view class="upload__image-bg" :style="'background: url( '+ uploadList.src +') no-repeat;background-size: 100% 100%;'" @click="chooseImg()">
				</view>
			</view>
			<view class="upload-title">上传付款凭证</view>
		</view>
		
		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="initButton"><view class="initButton-btn initButton-btn--style" @click="upload()">上传</view></view>
			</view>
		</view>
	</view>
</template>

<script>
	import weburl from '../../common/js/url.js';
	export default {
			data(){
				return{
					uploadList: {src:'../../static/public/img-upload-2.png'},
				}
			},
			onShow() {
				// this.init();
			},
			methods: {
				init(){
					this.getUserList();
				},
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
				upload(){
					if (this.uploadList.src == '../../static/public/img-upload-2.png') {
						return this.$tools.toast('请上传付款凭证');
					}
					uni.showLoading({
						title: '上传中',
						mask: true
					});
					let token = uni.getStorageSync('token');
					let files = [];
					files.push({ name: 'file1', uri: this.userUploadList[0].src });
					let data = {
						token: token,
						// file1: this.userUploadList[0].src,
					};
					console.log(files);
					uni.uploadFile({
						url: weburl.webUrl + '',
						files: files,
						header: { token: token },
						formData: data,
						success: res => {
							var data = JSON.parse(res.data);
							if (data.code == 0) {
								that.$tools.toast('提交成功');
							} else {
								that.$tools.toast(data.msg);
							}
						},
						fail(err) {},
						complete: res => {
							uni.hideLoading();
						}
					});
				},
				// 
				getUserList() {
					this.$Ajax('', {}, res => {
						if (res.code == 0) {
							this.userList = res.user;
						}
					});
				},
				
			},
		}
	</script>

<style lang="scss" scoped>
	page{
		background: $globalColor-white;
	}
	.upload{
		@include flexCenterColumn;
		margin-top: 409upx;
		&__image{
			border: 1px solid #F0F0F0;
			// background: #F0F0F0;
			width: 236upx;
			height: 236upx;
			margin: 30upx 0;
			&-bg{
				text-align: center;
				width: 100%;
				height: 100%;
				background-size: 100% 100% !important;
				background-repeat: no-repeat !important;
				background-position: center center !important;
				position: relative;
			}
		}
		&-title{
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
		}
	}
</style>
