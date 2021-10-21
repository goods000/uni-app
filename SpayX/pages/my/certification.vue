<template>
	<view class="page">
		<view class="group-apply-out" v-if="authStatus">
			<view class="group-toast-bg">
				<view class="group-toast-info">
					<view class="toast-title">{{ i18n.user.auth_failed }}</view>
					<view class="toast-input-title">{{ i18n.user.Reason_failure }}：{{reason}}</view>
					<view class="toast-btn" @click="closeAuth()">{{ i18n.user.knowledge }}</view>
				</view>
			</view>
		</view>
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.user.item_01 }}</view>
			<view class="header-empty"></view>
		</view>
		<view class="fill-plate">
			<view class="input-plate">
				<view class="input-title">{{ i18n.user.name }}</view>
				<view class="input-flex">
					<input type="text" v-model="name" value="" :placeholder="i18n.user.placeholder_01" />
				</view>
			</view>
			<view class="input-plate">
				<view class="input-title">{{ i18n.user.number }}</view>
				<view class="input-flex">
					<input type="text" v-model="card" value="" :placeholder="i18n.user.placeholder_02" />
				</view>
			</view>
		</view>
		<view class="upload-plate">
			<view class="plate-item">
				<view class="item-title">{{ i18n.user.tips_01 }}</view>
				<view class="pic-bg">
					<view class="item-pic" @click="chooseImg(1)">
						<image :src="userUploadList.src1" mode=""></image>
					</view>
				</view>
			</view>
			<view class="plate-item">
				<view class="item-title">{{ i18n.user.tips_02 }}</view>
				<view class="pic-bg">
					<view class="item-pic" @click="chooseImg(2)">
						<image :src="userUploadList.src2" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="unloadImg()">{{ i18n.global.sumbit }}</view>
	</view>
</template>

<script>
	import weburl from '../../components/url.js';
	export default {
		data() {
			return {
				reason:'',
				authobj:0,
				authStatus:false,
				name:'',
				card:'',
				authInfo: {},
				uploadList: {
					src1: this.$t('message').image.certification_01,
					src2: this.$t('message').image.certification_02
				},
				userUploadList: {
					src1: this.$t('message').image.certification_01,
					src2: this.$t('message').image.certification_02
				},
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onLoad(option) {
			this.reason = option.reason;
			this.authobj = option.authobj;
			if(this.authobj==3){
				this.authStatus = true;
			}
		},
		methods:{
			closeAuth(){
				this.authStatus = false;
			},
			chooseImg(choosePhotoPath) {
				let that = this;
				var token = uni.getStorageSync('token');
				// 暂时解决chooseImage API 再安卓机会触发页面刷新的Bug
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original','compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						if (choosePhotoPath == 1) {
							this.userUploadList.src1 = res.tempFilePaths[0];
						} else if (choosePhotoPath == 2) {
							this.userUploadList.src2 = res.tempFilePaths[0];
						}
						// console.log(JSON.stringify(this.userUploadList.src3));
					},
					fail: function() {
						console.log('上传图片接口调用失败');
						return;
					}
				});
			},
			unloadImg(choosePhotoPath) {
				let that = this;
				if(this.idCardName==''){
					return this.$tools.toast(this.i18n.user.enter_01);
				}
				if(this.idCardId==''){
					return this.$tools.toast(this.i18n.user.enter_02);
				}
				if (this.uploadList.src1 == this.userUploadList.src1) {
					return this.$tools.toast(this.i18n.user.enter_03);
				}
				if (this.uploadList.src2 == this.userUploadList.src2) {
					return this.$tools.toast();
				}
				uni.showLoading({
					title: this.i18n.user.uploading,
					mask: true
				});
				let token = uni.getStorageSync('token');
				let files = [];
				files.push({
					name: 'file1',
					uri: this.userUploadList.src1
				});
				files.push({
					name: 'file2',
					uri: this.userUploadList.src2
				});
				// console.log(JSON.stringify(this.userUploadList.src3));
				let data = {
					token: token,
					realName: this.name,
					idCard: this.card,
					file1: this.authInfo.image1 == '' ? '' : this.userUploadList.src1,
					file2: this.authInfo.image2 == '' ? '' : this.userUploadList.src2,
					// image3: this.authInfo.image3 == '' ? '' : this.userUploadList.src3
				};
				// console.log(JSON.stringify(this.userUploadList.src3));
				console.log(files);
				console.log(JSON.stringify(data));
				uni.uploadFile({
					url: weburl.webUrl + '/front/user/do/auth',
					files: files,
					header: {
						token: token
					},
					formData: data,
					success: res => {
						var data = JSON.parse(res.data);
						console.log(data);
						if (data.code == 0) {
							uni.hideLoading();
							that.$tools.toast(this.i18n.user.placeholder_03);
							setTimeout(() => {
								uni.switchTab({
									url:'./my'
								})
							}, 1000);
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

<style lang="scss">
	.page{
		color: #FFFFFF;
		.group-apply-out {
			width: 100vw;
			height: 100vh;
			position: fixed;
			background-color: rgba(0, 0, 0, .48);
			z-index: 2;
			padding-top: 30vh;
		
			.group-toast-bg {
				background-size: 100% 100%;
				background-position: center;
				background-repeat: no-repeat;
				height: 538rpx;
				width: 692rpx;
				background-image: url(../../static/group/group-toast-bg.png);
				margin: auto;
		
				.group-toast-info {
					padding: 60rpx 50rpx;
		
					.toast-title {
						text-align: center;
						font-size: 32rpx;
						font-family: PingFang SC-Bold;
						font-weight: bold;
						color: #FFFFFF;
					}
		
					.toast-input-title {
						font-size: 28rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						color: #FFFFFF;
						padding: 57rpx 0 38rpx 0;
						word-break: break-all;
					}
		
					.toast-btn {
						width: 100%;
						height: 88rpx;
						line-height: 88rpx;
						text-align: center;
						background: #FFCF1E;
						box-shadow: 0px 4rpx 14rpx 0px rgba(255, 207, 30, 0.41);
						border-radius: 44rpx;
						font-size: 32rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						color: #00061A;
					}
				}
			}
		}
		.header-plate{
			height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			.back-pic{
				width: 17rpx;
				height: 31rpx;
				image{
					width: 17rpx;
					height: 31rpx;
				}
			}
			.header-title{
				font-size: 36rpx;
				font-family: PingFang SC-Bold;
				font-weight: bold;
			}
			.header-empty{
				width: 17rpx;
			}
		}
		.fill-plate{
			padding: 15rpx 30rpx;
			.input-plate{
				padding-top: 40rpx;
				.input-title{
					font-size: 28rpx;
					font-family: PingFang SC-Bold;
					font-weight: 500;
					padding-bottom: 30rpx;
				}
				.input-flex{
					height: 104rpx;
					background: #040D32;
					// border: 1px solid #043680;
					border-image: linear-gradient(0deg, #0365B3, #0365B3) 10 10;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 30rpx;
					box-shadow: 0rpx 0rpx 12rpx 8rpx rgba(3, 101, 179, 0.6) inset;
					input{
						flex: 1;
						font-size: 32rpx;
						font-family: PingFang SC-Bold;
						font-weight: 400;
					}
					.flex-right-pic{
						width: 26rpx;
						height: 26rpx;
						image{
							width: 26rpx;
							height: 26rpx;
						}
					}
					.flex-right{
						font-size: 32rpx;
						font-family: PingFang SC-Bold;
						font-weight: 400;
						text-decoration: underline;
						color: #00A2FF;
					}
				}
			}
		}
		.upload-plate{
			padding: 0 30rpx;
			.plate-item{
				.item-title{
					height: 100rpx;
					line-height: 100rpx;
					font-size: 28rpx;
					font-family: PingFang SC-Bold;
					font-weight: 500;
				}
				.pic-bg{
					width: 484rpx;
					height: 274rpx;
					background-size: 100% 100%;
					background-position: center;
					background-repeat: no-repeat;
					background-image: url(../../static/my/certification-bg.png);
					margin: auto;
					.item-pic{
						// width: 326rpx;
						// height: 184rpx;
						width: 100%;
						padding-top: 45rpx;
						image{
							width: 326rpx;
							height: 184rpx;
							margin: auto;
						}
					}
				}
				
			}
		}
		.btn{
			width: 92vw;
			text-align: center;
			height: 88rpx;
			line-height: 88rpx;
			margin: auto;
			background: #FFCF1E;
			box-shadow: 0rpx 4rpx 14rpx 0rpx rgba(255, 207, 30, 0.41);
			border-radius: 44rpx;
			font-size: 32rpx;
			font-family: PingFang SC-Bold;
			font-weight: bold;
			color: #00061A;
			margin-top: 80rpx;
		}
	}
</style>
