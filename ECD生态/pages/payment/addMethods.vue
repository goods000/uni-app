<template>
	<view class="page contentBg">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">添加{{isMethod}}</view>
			</view> 
		</view> 
		
		<view class="safety-list">
			<view class="safety-list-title">姓名</view>
			<view class="safety-list-input">
				<input type="text" placeholder="请输入您的姓名" placeholder-style="color:#999999" v-model="username"/>
			</view>
		</view>
		<view class="safety-list">
			<view class="safety-list-title">{{isMethod}}账号</view>
			<view class="safety-list-input">
				<input type="text" :placeholder="'请输入您的'+isMethod+'账号'" placeholder-style="color:#999999" v-model="account"/>
			</view>
		</view>
		<view class="safety-list">
			<view class="safety-list-title">添加收款二维码</view>
			<view class="safety-list__image">
				<view class="safety-list__image-bg" :style="'background: url( '+ uploadList.src +') no-repeat;background-size: 100% 100%;'"
				 @click="chooseImg()">
				</view>
			</view>
		</view>
		
		<view class="initBtn" @click="submit()">确认绑定</view>
		
	</view>
</template>

<script>
	import weburl from '../../common/js/url.js';
	export default {
		data() {
			return {
				username: '',
				account: '',
				isMethod: '',
				password: '',
				uploadList: {src:'../../static/public/img-upload-1.png'},
			}
		},
		onLoad(hash) {
			this.isMethod = hash.value1;
			this.username = hash.value2;
			this.account = hash.value3;
			this.uploadList.src = hash.value4;
			if(hash.value4 == ""){
				this.uploadList.src = '../../static/public/img-upload-1.png'
			}else{
				this.uploadList.src = hash.value4;
			}
			console.log(this.isMethod,this.username,this.account,this.uploadList.src)
		},
		onShow() {
			if(this.isMethod == '支付宝'){
				this.type = 2
			}else{
				this.type = 3
			}
		},
		methods:{
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
					return this.$tools.toast('请输入您的姓名');
				}
				if(!/^([\u4e00-\u9fa5]{1,10}|[a-zA-Z\.\s]{1,10})$/.test(this.username)){
					return this.$tools.toast('请输入正确的姓名1-10位');
				}
				if(this.account == ''){
					return this.$tools.toast('请输入您的'+ this.isMethod + '账号');
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
					no: this.account,
					payType: this.type,
					status: 1,
					pic: this.pic == '' ? '' : this.uploadList.src,
					file: this.file == '' ? '' : this.uploadList.src,
				};
				console.log(files);
				uni.uploadFile({
					url: weburl.webUrl + '/front/user/updatePay',
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
							this.$tools.toastBack('添加' +this.isMethod+'成功', 1);
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
		}
	}
</script>

<style lang="scss" scoped>
	@import '../safety/scss/safety';
	@import '/scss/payment';
</style>
