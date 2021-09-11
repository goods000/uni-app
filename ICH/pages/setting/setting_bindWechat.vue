<template>
	<view class="pages">
		<view class="initHeader initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">微信收款账号</view>
			</view>
		</view>

		<view class="main">
			<view class="uploadBox">
				<view class="uploadBox-wrapper">
					<view class="uploadBox-image">
						<view class="uploadBox-image__photo" @click="uploadImg('src1')"><image :src="src1" mode="widthFix"></image></view>
					</view>
					<view class="uploadBox-form">
						<view class="uploadBox-list">
							<view class="uploadBox-list__label">微信账号</view>
							<view class="uploadBox-list__data"><input placeholder-class="uploadBox-placeholder" placeholder="请输入需要绑定的微信收款账号" v-model="cardId" /></view>
						</view>
						<view class="uploadBox-list">
							<view class="uploadBox-list__label">真实姓名</view>
							<view class="uploadBox-list__data">
								<input placeholder-class="uploadBox-placeholder" placeholder="请输入微信账号实名认证的姓名" v-model="name" />
							</view>
						</view>
					</view>
				</view>
				<view class="uploadBox-button initButton"><view class="initButton-btn initButton-btn--blue" @click="bindFunc()">确认绑定</view></view>
			</view>
		</view>
	</view>
</template>

<script>
import weburl from '../../components/url.js';
export default {
	data() {
		return {
			type: 3, //1银联 2支付宝 3微信
			name: '',
			cardId: '',
			src1: '../../static/payment/img-upload-wechat.png',
			demoSrc: '../../static/payment/img-upload-wechat.png',
			updata:1,
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		init() {
			this.getInfo();
		},
		getInfo() {
			this.$Ajax('/front/user/payInit', {
				'payType' : this.type
			}, res => {
				console.log(JSON.stringify(res));
				if (res.code == 0) {
					console.log(JSON.stringify(res.obj.pic));
					if(res.obj.pic != '' ){
						this.src1 = res.obj.pic;
					}
					this.name = res.obj.name;
					this.cardId = res.obj.no;
				}
			});
		},
		uploadImg(src) {
			// debugger
			this.updata = 0;
					
			uni.setStorageSync('idCardName_wechat', this.name);
			uni.setStorageSync('idCardId_wechat', this.cardId);
			
			uni.chooseImage({
				count: 1, //默认9
				sourceType: ['album'], //从相册选择
				success: res => {
					if (src == 'src1') {
						this.src1 = res.tempFilePaths[0];
					}
				},
				fail: function() {
					console.log('上传图片接口调用失败');
					return;
				},
				complete: function() {
					if(uni.getStorageSync('idCardName_wechat')){
						this.name = uni.getStorageSync('idCardName_wechat');
					}
					
					if(uni.getStorageSync('idCardId_wechat')){
						this.cardId = uni.getStorageSync('idCardId_wechat');
					}
				}
			});
		},

		bindFunc() {
			let that = this;
			if (this.src1 == this.demoSrc) {
				return this.$tools.toast('请上传收款码');
			}
			if (this.cardId == '') {
				return this.$tools.toast('请输入微信账号');
			}
			if (this.name == '') {
				return this.$tools.toast('请输入微信账号实名认证的姓名');
			}

			uni.showLoading({
				title: '上传中',
				mask: true
			});

			var token = uni.getStorageSync('token');
			if(that.updata==1){
				uni.uploadFile({
					url: weburl.webUrl + '/front/user/updatePay',
					header: { 'token': token },
					formData: {
						payType: this.type,
						name: this.name,
						no: this.cardId,
						bankAddress: "",
						bankName: "",
						status: 1
					},
					success: res => {
						var data = JSON.parse(res.data);
						console.log(JSON.stringify(data));
						this.$tools.toast(data.msg);
						if (data.code == 0) {
							setTimeout(function() {
								that.$tools.back(1);
							}, 1000);
						}
					},
					fail(err) {}
				});
			}else {
				uni.uploadFile({
					url: weburl.webUrl + '/front/user/updatePay',
					filePath: that.src1,
					name: 'file',
					header: { 'token': token },
					formData: {
						payType: this.type,
						name: this.name,
						no: this.cardId,
						bankAddress: "",
						bankName: "",
						status: 1
					},
					success: res => {
						var data = JSON.parse(res.data);
						console.log(JSON.stringify(data));
						this.$tools.toast(data.msg);
						if (data.code == 0) {
							setTimeout(function() {
								that.$tools.back(1);
							}, 1000);
						}
					},
					fail(err) {}
				});
			}
			// uni.uploadFile({
			// 	url: weburl.webUrl + '/front/user/updatePay',
			// 	filePath: that.src1,
			// 	name: 'file',
			// 	header: { 'token': token },
			// 	formData: {
			// 		payType: this.type,
			// 		name: this.name,
			// 		no: this.cardId,
			// 		bankAddress: "",
			// 		bankName: "",
			// 		status: 1
			// 	},
			// 	success: res => {
			// 		var data = JSON.parse(res.data);
			// 		console.log(JSON.stringify(data));
			// 		this.$tools.toast(data.msg);
			// 		if (data.code == 0) {
			// 			setTimeout(function() {
			// 				that.$tools.back(1);
			// 			}, 1000);
			// 		}
			// 	},
			// 	fail(err) {}
			// });
			
			uni.hideLoading();
		}
	}
};
</script>

<style lang="scss" scoped>
.uploadBox {
	&-image {
		padding: 60upx 0;

		@include flexCenter;
		&__photo {
			width: 240upx;
			@include fullImage;
		}
	}

	&-form {
		padding: 0 30upx;
	}

	&-list {
		font-size: 28upx;
		border-bottom: 2upx solid #c6d2e4;
		padding: 30upx 0;

		@include flexBetween;

		&__label {
			color: #101010;
			width: 200upx;
		}
		&__data {
			color: #101010;
			font-size: 28upx;
			flex: 1;
		}
	}

	&-button {
		padding: 30upx;
		margin-top: 120upx;
	}

	&-placeholder {
		color: #78849a;
	}
}
</style>
