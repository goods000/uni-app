<!-- 初级认证 -->
<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back()"></view>
				<view class="initHeader-title">初级认证</view>
			</view>
		</view>
		<view class="main">
			<view class="formBox">
				<view class="formBox-wrapper">
					<view class="formBox-list">
						<view class="formBox-list__label">真实姓名</view>
						<view class="formBox-list__data">
							<input type="text" placeholder-class="formBox-list__placeholder" placeholder="请输入您的真实姓名" v-model="idCardName" />
						</view>
					</view>
					<view class="formBox-list">
						<view class="formBox-list__label">证件号码</view>
						<view class="formBox-list__data">
							<input type="text" placeholder-class="formBox-list__placeholder" maxlength="18" placeholder="请输入您的身份证号" v-model="idCardId" />
						</view>
					</view>
				</view>
			</view>
			<view class="initButton">
				<view class="initButton-btn initButton-btn--blue" @click="uploadData()">提交审核</view>
			</view>
		</view>
	</view>
</template>
<script>
import weburl from '../../components/url.js';
export default {
	data() {
		return {
			authInfo: [],
			idCardName: '',
			idCardId: '',
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
				if (res.code == 0) {
					console.log(JSON.stringify(res.obj));
					this.idCardName = res.obj.auth.realName;
					this.idCardId = res.obj.auth.idcart;
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
		uploadData(){
			if (this.idCardName == '') {
				return this.$tools.toast('请输入您的真实姓名');
			}
			if (this.idCardId == '') {
				return this.$tools.toast('请输入您的身份证号');
			}
			
			this.$Ajax('/front/user/approveOne', {
				realName: this.idCardName,
				idcart: this.idCardId,
			}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					this.$tools.toastBack('提交成功', 1);
				}
			});
		},
		
		chooseImg(choosePhotoPath) {
			let that = this;
			var token = uni.getStorageSync('token');
			// 暂时解决chooseImage API 再安卓机会触发页面刷新的Bug
			uni.setStorageSync('fixBug_idCardName', this.idCardName);
			uni.setStorageSync('fixBug_idCardId', this.idCardId);

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
					this.idCardName = uni.getStorageSync('fixBug_idCardName');
					this.idCardId = uni.getStorageSync('fixBug_idCardId');
					
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

			if (this.idCardName == '') {
				return this.$tools.toast(this.i18n.authentication_primary_toast_1);
			}
			if (this.idCardId == '') {
				return this.$tools.toast(this.i18n.authentication_primary_toast_2);
			}

			// if (this.uploadList.src1 == this.userUploadList.src1) {
			// 	return this.$tools.toast(this.i18n.authentication_primary_toast_3);
			// }
			// if (this.uploadList.src2 == this.userUploadList.src2) {
			// 	return this.$tools.toast(this.i18n.authentication_primary_toast_4);
			// }
			// if (this.uploadList.src3 == this.userUploadList.src3) {
			// 	return this.$tools.toast(this.i18n.authentication_primary_toast_5);
			// }
			// uni.showLoading({
			// 	title: '上传中',
			// 	mask: true
			// });

			let token = uni.getStorageSync('token');
			let files = [];
			files.push({ name: 'file1', uri: this.userUploadList.src1 });
			files.push({ name: 'file2', uri: this.userUploadList.src2 });
			files.push({ name: 'file3', uri: this.userUploadList.src3 });
			let data = {
				token: token,
				realName: this.idCardName,
				idcart: this.idCardId,
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
						that.$tools.toast(this.i18n.authentication_primary_toast_6);
						setTimeout(() => {
							that.$tools.reLaunch('../index/index');
						}, 1000);
					} else {
						that.$tools.toast(data.msg);
					}
				},
				fail(err) {},
				complete: res => {
					// uni.hideLoading();
				}
			});
			uni.hideLoading();
		}
	}
};
</script>
<style lang="scss" scoped>
.formBox {
	// border-bottom: 16upx solid #f7f8fc;
	&-wrapper {
		padding: 30upx;
	}
	&-list {
		margin-bottom: 30upx;
		@include clearLastMargin;
		&__label {
			margin-bottom: 15upx;
			color: #101010;
			font-size: 28upx;
		}

		&__data {
			color: #101010;
			font-size: 32upx;
			border-bottom: 1upx solid #c6d2e4;
			padding: 15upx 0;
			input {
				font-size: inherit;
				width: 100%;
			}
		}

		&-placeholder {
			font-size: 32upx;
			color: #bfc0c7;
		}
	}
}

.imgBox {
	padding: 30upx;
	&-list {
		margin-bottom: 30upx;
		@include clearLastMargin;
		&__label {
			font-size: 28upx;
			color: #101010;
			margin-bottom: 30upx;
		}
		&__photo {
			@include fullImage;
			width: 400upx;
			height: 260upx;
			margin: 0 auto;
			margin-bottom: 30upx;
			image {
				height: 100%;
			}
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}

.initButton {
	padding: 30upx;
}

.tipsBox {
	font-size: 24upx;
	padding: 30upx;
	margin-top: 30upx;
	&-title {
		color: #333333;
	}
	&-list {
		color: #999999;
	}
}
</style>
