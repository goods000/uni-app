<template>
	<view class="pages">
		<view class="header_bar header_border">
			<view class="header">
				<view class="header-back" @click="goBack()"></view>
				<view class="header-title" v-if="isActive == 0">上传付款凭证</view>
				<view class="header-title" v-else>上传成功</view>
			</view> 
		</view> 
		
		<view class="upload" v-if="isActive == 0">
			<view class="upload-wrapper">
				<view class="upload-wrapper-item">
					<view class="upload-wrapper-item-title">备注</view>
					<textarea placeholder="请输入..." placeholder-class="inputColor" v-model="remarks"
					class="upload-wrapper-item-textarea"/>
				</view>
			</view>
			<view class="mt-bg"></view>
			<view class="upload-wrapper">
				<view class="upload-wrapper-item">
					<view class="upload-wrapper-item-title">付款凭证: <text>*必需上传付款截图或照片</text></view>
					<view class="upload-wrapper-item__info" :style="'background: url( '+ uploadList.src +') no-repeat;background-size: 100% 100%;'">
						<view class="upload-wrapper-item__photo" @click="chooseImg()">
							<image src="../../static/order/img-upload-1.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
			
			<view class="orderBtn">
				<view class="orderBtn-btn" @click="config()">上传付款凭证</view>
			</view>
		</view>
		
		<view class="upload-status" v-if="isActive == 1">
			<view class="orderDetails">
				<image src="../../static/order/icon-order-success.png" mode="widthFix" class="orderDetails-image"></image>
				<view class="orderDetails-item">
					<view class="orderDetails-status">上传成功</view>
					<view class="orderDetails-title">恭喜您已成功上传付款凭证！请耐心等待平台给您发放股票。</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import weburl from '../../common/js/url.js';
	export default {
		data(){
			return{
				isActive:0,
				remarks:'',
				orderId:'',
				uploadList: {src:''},
			}
		},
		onLoad(hash) {
			this.orderId = hash.value1;
		},
		onShow() {
			// this.init();
		},
		methods: {
			goBack(){
				// this.$tools.jump('./orderDetails',this.orderId);
				this.$tools.back(1)
			},
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
			config() {
				let that = this;
				if(this.remarks == ''){
					return this.$tools.toast('请输入您的备注');
				}
				if(this.uploadList.src == ''){
					return this.$tools.toast('请上传付款凭证');
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
					image: this.image == '' ? '' : this.uploadList.src,
					orderId:this.orderId,
					remark:this.remarks
				};
				console.log(files);
				uni.uploadFile({
					url: weburl.webUrl + '/front/mine/uploadFile',
					files: files,
					header: { token: token },
					formData: data,
					success: res => {
						var data = JSON.parse(res.data);
						console.log(data);
						if (data.code == 0) {
							this.remarks == '';
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
					}
				});
				uni.hideLoading();
			},
			
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/order/orderDetails';
</style>
