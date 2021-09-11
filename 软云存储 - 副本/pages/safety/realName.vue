<template>
	<view class="page">
		<view class="safety">
			<view class="header_bar">
				<view class="header">
					<view class="header-back" @click="$tools.back(1)"></view>
					<view class="header-title">实名认证</view>
				</view> 
			</view> 
			
			<view v-if="authInfo.authStatus == 0 || authInfo.authStatus == 3">
				<view v-show="isShow">
					<view class="safety-list">
						<view class="safety-list-title">姓名</view>
						<view class="safety-list-input">
							<input type="text" placeholder="请输入真实姓名" placeholder-style="color:#999999" v-model="username"/>
						</view>
					</view>
					<view class="safety-list">
						<view class="safety-list-title">证件号码</view>
						<view class="safety-list-input">
							<input type="text" placeholder="请输入您的身份证号码" placeholder-style="color:#999999" v-model="uid"/>
						</view>
					</view>
					<view class="initBtn" @click="next()">下一步</view>
				</view>
				
				<view v-show="!isShow">
					<view class="realName">
						<view class="realName-title">请上传身份证正面照片</view>
						<view class="realName-box">
							<view class="realName-box-bg" :style="'background-image: url( '+ userUploadList[0].src +');'"
							@click="chooseImg(1)">
								<view class="realName-box-bg__photo">
									<image src="../../static/realName/icon-realName-upload.png" mode="scaleToFill"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="realName">
						<view class="realName-title">请上传身份证背面照片</view>
						<view class="realName-box">
							<view class="realName-box-bg" :style="'background-image: url( '+ userUploadList[1].src +');'"
							@click="chooseImg(2)">
								<view class="realName-box-bg__photo">
									<image src="../../static/realName/icon-realName-upload.png" mode="scaleToFill"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="initBtn initBtn_upload" @click="unloadImg()">提交</view>
				</view>
			</view>
			
			<view class="realName-end" v-if="authInfo.authStatus == 1">
				<view class="realName-status">
					<image src="../../static/realName/icon-realname-success.png" mode=""></image>
				</view>
				<view class="realName-result">认证中</view>
				<view class="realName-title">您的资料已提交</view>
				<view class="realName-title">通过平台审核，请放心在平台进行交易</view>
			</view>
			
			<view class="realName-end" v-if="authInfo.authStatus == 2">
				<view class="realName-status">
					<image src="../../static/realName/icon-realname-success.png" mode=""></image>
				</view>
				<view class="realName-result">审核通过</view>
				<view class="realName-title">恭喜您，您的资料已成功</view>
				<view class="realName-title">通过平台审核，请放心在平台进行交易</view>
				<view class="initBtn" @click="$tools.back(1)">确认</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import weburl from '../../common/js/url.js';
	export default {
		data() {
			return {
				isShow:true,
				username: '',
				uid: '',
				uploadList: [{src:'../../static/realName/icon-realName-01.png'},{src:'../../static/realName/icon-realName-02.png'},],
				userUploadList: [{src:'../../static/realName/icon-realName-01.png'},{src:'../../static/realName/icon-realName-02.png'},],
				authInfo:[],
			}
		},
		onShow() {
			this.getAuthInfo();
		},
		methods: {
			getAuthInfo() {
				this.$Ajax('/front/user/authInfo', {}, res => {
					if (res.code == 0) {
						// console.log(JSON.stringify(res.obj))
						this.authInfo = res.obj.auth;
						if (res.obj.auth.image1 != null && res.obj.auth.image1 != '') {
							this.userUploadList.src1 = res.obj.auth.image1;
						}
						if (res.obj.auth.image2 != null && res.obj.auth.image2 != '') {
							this.userUploadList.src2 = res.obj.auth.image2;
						}
						if (res.obj.auth.image3 != null && res.obj.auth.image3 != '') {
							this.userUploadList.src3 = res.obj.auth.image3;
						}
					}
				});
			},
			toggleEyeStatus(index) {
				this.eyeShowHideArray[index].show = !this.eyeShowHideArray[index].show;
			},
			next(){
				if (this.username == '') {
					return this.$tools.toast('请输入真实姓名');
				}
				if (this.uid == '') {
					return this.$tools.toast('请输入您的身份证号码');
				}
				this.$Ajax(
					'/front/user/approveOne',
					{
						realName: this.username,
						idcart: this.uid,
					},
					res => {
						console.log(JSON.stringify(res));
						if (res.code == 0) {
							this.$tools.toast(res.msg);
							this.isShow = false;
						}
					}
				);
			},
			chooseImg(choosePhotoPath) {
				let that = this;
				var token = uni.getStorageSync('token');
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						if (choosePhotoPath == 1) {
							this.userUploadList[0].src = res.tempFilePaths[0];
							console.log("src:",this.userUploadList[0].src)
						} else if (choosePhotoPath == 2) {
							this.userUploadList[1].src = res.tempFilePaths[0];
							console.log("src1:",this.userUploadList[1].src)
						}
					},
					fail: function() {
						console.log('上传图片接口调用失败');
						return;
					}
				});
			},
			unloadImg(choosePhotoPath) {
				let that = this;
				if (this.uploadList[0].src == this.userUploadList[0].src) {
					return this.$tools.toast('请上传身份证正面照');
				}
				if (this.uploadList[1].src == this.userUploadList[1].src) {
					return this.$tools.toast('请上传身份证反面照');
				}
				uni.showLoading({
					title: '上传中',
					mask: true
				});
				let token = uni.getStorageSync('token');
				let files = [];
				files.push({ name: 'file1', uri: this.userUploadList[0].src });
				files.push({ name: 'file2', uri: this.userUploadList[1].src });
				let data = {
					token: token,
					file1: this.userUploadList[0].src,
					file2: this.userUploadList[1].src,
					file3: ' ',
					image1: ' ',
					image2: ' ',
					image3: ' ',
				};
				console.log(files);
				uni.uploadFile({
					url: weburl.webUrl + '/front/user/approveTwo',
					files: files,
					header: { token: token },
					formData: data,
					success: res => {
						var data = JSON.parse(res.data);
						console.log(data);
						if (data.code == 0) {
							that.$tools.toastBack('提交成功，请等待审核', 1);
						} else {
							that.$tools.toast(data.msg);
						}
					},
					fail(err) {},
					complete: res => {
						uni.hideLoading();
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/safety/safety';
	page,.pages{padding-bottom: 2upx;}
	// .initBtn{margin: 20% auto 5%;width: 90%;
	.initBtn{margin-top: 40%;position: absolute;bottom: 46upx;left: 0;right: 0;margin: auto;
		&_upload{
			// position: absolute;
			// bottom: 4%;
			// left: 0;right: 0;
			// margin: auto;
			text-align: center;
			display: block;
		}
	}
	.page{
		background: #F5F6FA;
		height: 100vh;
		overflow: scroll;
	}
</style>
