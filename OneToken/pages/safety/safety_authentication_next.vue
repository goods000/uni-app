<!-- 实名认证 -->
<template>
	<view class="pages">
		<view class="initHeader initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">实名认证</view>
			</view>
		</view>
		<view class="main">
			<view class="imgBox">
				<view class="imgBox-wrapper">
					<view class="imgBox-list">
						<view class="imgBox-list__label">请上传身份证正面照片</view>
						<view class="imgBox-list__photo" @click="chooseImg(1)"><image :src="userUploadList.src1" mode="scaleToFill"></image></view>
					</view>
					<view class="imgBox-list">
						<view class="imgBox-list__label">请上传身份证反面照片</view>
						<view class="imgBox-list__photo" @click="chooseImg(2)"><image :src="userUploadList.src2" mode="scaleToFill"></image></view>
					</view>
					<view class="imgBox-list">
						<view class="imgBox-list__label">请上传手持身份证照片</view>
						<view class="imgBox-list__photo" @click="chooseImg(3)"><image :src="userUploadList.src3" mode="scaleToFill"></image></view>
					</view>
				</view>
			</view>
			<view class="initButton initButton--absolute"><view class="initButton-btn initButton-btn--style" @click="unloadImg()">提交</view></view>
			<!-- <view class="tipsBox">
				<view class="tipsBox-title">温馨提示：</view>
				<view class="tipsBox-list">1.请保证您上传的证件清晰，完整；</view>
				<view class="tipsBox-list">2.身份信息真实可靠，不可盗用他人信息；</view>
				<view class="tipsBox-list">3.JPG/PNG格式，大小不超过4M。</view>
			</view> -->
		</view>
	</view>
</template>
<script>
import weburl from '@/common/js/url.js';
export default {
	data() {
		return {
			authInfo: [],
			uploadList: {
				src1: '../../static/authentication/img-authentication-1.png',
				src2: '../../static/authentication/img-authentication-2.png',
				src3: '../../static/authentication/img-authentication-3.png'
			},
			userUploadList: {
				src1: '../../static/authentication/img-authentication-1.png',
				src2: '../../static/authentication/img-authentication-2.png',
				src3: '../../static/authentication/img-authentication-3.png'
			}
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getAuthInfo();
		},
		getAuthInfo() {
			this.$Ajax('/front/user/authInfo', {}, res => {
				console.log(JSON.stringify(res.obj));
				if (res.code == 0) {
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
		chooseImg(choosePhotoPath) {
			let that = this;
			var token = uni.getStorageSync('token');

			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['camera', 'album'], //从相册选择
				success: res => {
					if (choosePhotoPath == 1) {
						this.userUploadList.src1 = res.tempFilePaths[0];
					} else if (choosePhotoPath == 2) {
						this.userUploadList.src2 = res.tempFilePaths[0];
					} else if (choosePhotoPath == 3) {
						this.userUploadList.src3 = res.tempFilePaths[0];
					}
				},
				fail: function() {
					console.log('上传图片接口调用失败');
					return;
				}
			});

			// console.log(this.size);
			// console.log(this.size2);
		},

		unloadImg(choosePhotoPath) {
			let that = this;

			if (this.uploadList.src1 == this.userUploadList.src1) {
				return this.$tools.toast('请上传身份证正面照');
			}
			if (this.uploadList.src2 == this.userUploadList.src2) {
				return this.$tools.toast('请上传身份证反面照');
			}
			if (this.uploadList.src3 == this.userUploadList.src3) {
				return this.$tools.toast('请上传手持身份证照');
			}
			uni.showLoading({
				title: '上传中',
				mask: true
			});

			let token = uni.getStorageSync('token');
			let files = [];
			files.push({ name: 'file1', uri: this.userUploadList.src1 });
			files.push({ name: 'file2', uri: this.userUploadList.src2 });
			files.push({ name: 'file3', uri: this.userUploadList.src3 });
			let data = {
				token: token,
				image1: this.authInfo.image1 == '' ? '' : this.userUploadList.src1,
				image2: this.authInfo.image2 == '' ? '' : this.userUploadList.src2,
				image3: this.authInfo.image3 == '' ? '' : this.userUploadList.src3
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
						// that.$tools.toast('提交成功，请等待审核');
						// that.$tools.pathBack('../safety/safety');
						that.$tools.toastRedirectTo('提交成功，请等待审核', '../safety/safety');
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
		}
	}
};
</script>
<style lang="scss" scoped>
@import '/scss/safety_authentication_next';
</style>
