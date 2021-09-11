<template>
	<view class="pages">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">申诉</view>
			</view> 
		</view> 
		
		<view class="release">
			<view class="release-textarea">
				<textarea  placeholder="请描述您遇到的情况" maxlength="200" placeholder-class="release-textarea--input" v-model="text"/>
			</view>
		</view>
		
		<view class="releaseBox">
			<view class="release__image">
				<view class="release__image-bg" :style="'background: url( '+ upload +') no-repeat;background-size: 100% 100%;'"
				 @click="chooseImg()">
				</view>
			</view>
		</view>
		
		<view class="fixedBox">
			<view class="fixedBox-wrapper">
				<view class="initButton">
					<view class="initButton-btn initButton-btn--style" @click="submit()">申诉</view>
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
					recordId:'',
					text:'',
					upload: [
						'../../static/public/img-upload-2.png'
					],
				}
			},
			onLoad(hash) {
				this.recordId = hash.value1;
			},
			onShow() {
				
			},
			methods: {
				chooseImg() {
					let that = this;
					var token = uni.getStorageSync('token');
					uni.chooseImage({
						count: 9, //默认9
						sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
						// sourceType: ['camera', 'album'], //从相册选择
						sourceType: ['album'], //从相册选择
						success: res => {
							console.log(res.tempFilePaths);
							this.upload = res.tempFilePaths[0];
						},
						fail: function() {
							console.log('上传图片接口调用失败');
							return;
						}
					});
				},
				submit() {
					let that = this;
					if(this.text == ''){
						return this.$tools.toast('请描述您遇到的情况');
					}
					if (this.upload == '../../static/public/img-upload-2.png') {
						return this.$tools.toast('请上传申诉图片');
					}
					uni.showLoading({
						title: '上传中',
						mask: true
					});
					let token = uni.getStorageSync('token');
					let files = [];
					files.push({ name: 'file1', uri: this.upload});
					let data = {
						token: token,
						recordId: this.recordId,
						content: this.text,
						// file1: this.upload,
					};
					console.log("files",files);
					console.log("data",data);
					uni.uploadFile({
						url: weburl.webUrl + '/front/otc/appeal',
						files: files,
						header: { token: token },
						formData: data,
						success: res => {
							var data = JSON.parse(res.data);
							console.log(data);
							if (data.code == 0) {
								this.text ='',
								that.$tools.toastBack('申诉成功', 1);
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
			},
		}
	</script>

<style lang="scss" scoped>
	@import '../release/scss/release';
</style>
