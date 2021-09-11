<template>
	<view class="pages">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">链改申请</view>
			</view> 
		</view> 
		<view class="form" v-if="isActive == 0">
			<view class="formBox">
				<view class="formBox-group">
					<input type="text" placeholder="请输入您的企业名称" v-model="username" />
				</view>
				<view class="formBox-group">
					<input type="text" placeholder="请输入企业统一社会信用码" v-model="number" />
				</view>
				<view class="formBox-group">
					<input type="text" placeholder="请输入法人姓名" v-model="name" />
				</view>
				<view class="formBox-group">
					<input type="text" placeholder="请输入公司联系电话" v-model="mobile" />
				</view>
			</view>
			<view class="mt"></view>
			
			<view class="formBox">
				<view class="formBox-input">
					<view class="formBox-input-label">上传营业执照</view>
					<view class="formBox-input-image">
						<view class="formBox-input-image-bg" :style="'background: url( '+ uploadList.src +') no-repeat;background-size: 100% 100%;'">
							<view class="formBox-input-image-bg__photo" @click="chooseImg()">
								<image src="../../static/public/img-upload-1.png" mode="widthFix"></image>
								<!-- <image :src="uploadList.src" mode="widthFix"></image> -->
							</view>
							<view class="formBox-input-image-bg-txt">点击上传</view>
						</view>
					</view>
					<view class="formBox-input-tips" @click="getSecurity()">（上传营业执照）</view>
				</view>
				<view class="formBox-border"></view>
				<view class="formBox-input">
					<view class="formBox-input-label">备注信息（非必填）</view>
					<textarea value="" placeholder="请输入您的备注内容" v-model="remark"/>
				</view>
			</view>
			
			<view class="initBtn" @click="submit()">确定</view>
			
		</view>
		
		<!--  -->
		<view class="chian-status" v-if="isActive == 1">
			<image src="../../static/operate/icon-success.png" mode="widthFix"></image>
			<view class="chian-status-title">链改申请已提交</view>
		</view>
		
		
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	import weburl from '../../common/js/url.js';
	export default {
		data() {
			return {
				username: '',
				number: '',
				name: '',
				mobile: '',
				remark: '',
				isMethod: '',
				password: '',
				uploadList: {src:''},
				isActive:0,
			}
		},
		onShow() {
			console.log(this.isActive)
			console.log(uni.getStorageSync('isActive'))
			if (!uni.getStorageSync('isActive')) {
				this.isActive = 0;
			} else {
				this.isActive = 1;
			}
		},
		methods:{
			chooseImg() {
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
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
					return this.$tools.toast('请输入您的企业名称');
				}
				if(this.number == ''){
					return this.$tools.toast('请输入企业统一社会信用码');
				}
				if (this.name == '') {
					return this.$tools.toast('请输入法人姓名');
				}
				if(this.mobile == ''){
					return this.$tools.toast('请输入公司联系电话');
				}
				if(this.uploadList.src == ''){
					return this.$tools.toast('请上传营业执照');
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
					companyName: this.username,
					creditNo: this.number,
					legalPerson: this.name,
					phone: this.mobile,
					image: this.image == '' ? '' : this.uploadList.src,
					remark:this.remark
				};
				console.log(files);
				uni.uploadFile({
					url: weburl.webUrl + '/front/user/companyChainUpdate',
					files: files,
					header: { token: token },
					formData: data,
					success: res => {
						var data = JSON.parse(res.data);
						console.log(data);
						if (data.code == 0) {
							this.username == '';
							this.number == '';
							this.name == '';
							this.mobile == '';
							this.uploadList.src == '';
							this.isActive = 1;
							uni.setStorageSync('isActive', this.isActive);
							that.$tools.toast('提交成功，请等待审核');
						} else {
							that.$tools.toast(data.msg);
							this.isActive = 0;
							uni.setStorageSync('isActive', this.isActive);
						}
					},
					fail(err) {},
					complete: res => {
						uni.hideLoading();
						this.isActive = 0;
						uni.setStorageSync('isActive', this.isActive);
					}
				});
				uni.hideLoading();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.chian-status{display: none;}
	@import '@/common/scss/pages/setting/setting';
	page{background: #FFFFFF;}
	.formBox{
		&-border{border: 1px dashed #666666;margin: 0 32upx;display: block;width:90%;}
		&-input{
			padding: 24upx 34upx;
			&-label{
				color: $globalColor-fontStyle;
				font-size: 28upx;
				margin-bottom: 22upx;
			}
			&-image{
				background: $globalColor-bgStyle;
				border: 2px solid rgba(221,229,238,0.24);
				border-radius: 8upx;
				max-height: 218upx;
				display: block;
				&-bg{
					border-radius: 8upx;
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
	
	.chian-status{
		@include flexCenterColumn;
		image{
			margin-top: 207upx;
			width: 170upx;
			height: 170upx;
		}
		&-title{
			margin-top: 35upx;
			color: $globalColor-fontStyle;
			font-size: 28upx;
		}
	}

</style>
