<template>
	<view class="pages contentBg">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">上传付款凭证</view>
			</view> 
		</view> 
		<view class="orderDetails">
			<view class="orderDetails-item" >
				<view class="orderDetails-status">{{ quantity*cndtCnyPrice | number(2) }}</view>
				<view class="orderDetails-title">购买金额(CNY)</view>
			</view>
		</view>
		<view class="uploadBox">
			<view class="initTilte">
				<view class="initTilte-style">收款银联信息</view>
			</view>
			<view class="orderBox-list">
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">收款方户名：</view>
					<view class="orderBox-list-item-news">{{ bankName }}</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">收款方开户行:</view>
					<view class="orderBox-list-item-news">{{ name }}</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">收款方开户地址:</view>
					<view class="orderBox-list-item-news">{{ bankAddress }}</view>
				</view>
				<view class="orderBox-list-item">
					<view class="orderBox-list-item-title">收款方户名：</view>
					<view class="orderBox-list-item-news">{{ account }}</view>
					<view class="orderBox-list-item-copy" @click="$tools.copy(account)">复制</view>
				</view>
			</view>
		</view>
		<view class="orderBox">
			<view class="initTilte">
				<view class="initTilte-style">上传付款凭证</view>
			</view>
			<view class="textareaBox">
				<textarea value="" v-model="remark" placeholder="请输入您的备注..." placeholder-class="textareaBox-style"/>
			</view>
			<view class="textareaBox-upload__image">
				<view class="textareaBox-upload__image-bg" :style="'background: url( '+ uploadList.src +') no-repeat;background-size: 100% 100%;'" @click="chooseImg()">
					<image src="../../static/exchange/icon-exchange-upload.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		
		<view class="initBtn initBtn--bottom" @click="upload()">提交</view>
	</view>
</template>

<script>
	import weburl from '../../common/js/url.js';
	export default {
			data(){
				return{
					remark:'',
					uploadList: {src:''},
					asset:{},
				}
			},
			onLoad(hash) {
				this.currencyId = hash.value1;
				this.currencyName = hash.value2;
				this.cndtCnyPrice = hash.value3;
				this.quantity = hash.value4;
				this.bankName = hash.value5;
				this.name = hash.value6;
				this.bankAddress = hash.value7;
				this.account = hash.value8;
			},
			onShow() {
				this.init();
			},
			methods: {
				init(){
				},
				upload() {
					const that = this;
					if(that.remark == ''){
						return that.$tools.toast("请输入您的备注");
					}
					if(that.uploadList.src == ''){
						return that.$tools.toast("请上传付款凭证");
					}
					uni.showLoading({
						title: '上传中',
						mask: true
					});
					let token = uni.getStorageSync('token');
					let files = [];
					files.push({ name: 'file', uri: that.uploadList.src });
					let data = {
						token: token,
						currencyId:this.currencyId,
						quantity:this.quantity,
						price:this.cndtCnyPrice,
						totalMoney:this.quantity*this.cndtCnyPrice,
						remark:this.remark,
						file: that.uploadList.src,
					};
					console.log(data);
					uni.uploadFile({
						url: weburl.webUrl + '/front/node/approveNodeBuyRecord',
						files: files,
						header: { token: token },
						formData: data,
						success: res => {
							var data = JSON.parse(res.data);
							console.log(data);
							if (data.code == 0) {
								// this.$tools.toastJump(data.msg,'./nodeRecord');
								this.$tools.toastBack(data.msg,1);
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
			},
		}
	</script>

<style lang="scss" scoped>
	@import '/scss/nodeDetails';
	.uploadBox{
		padding-bottom: 30upx;
		.initTilte{
			margin-top: 0;
			margin-bottom: 15upx;
		}
	}
	.orderDetails{
		&-status{
			font-size: 68upx;
			font-family: DINPro;
			font-weight: bold;
			margin-top: 0;
		}
		&-item{
			width: 100%;
		}
	}
	.textareaBox{
		margin: 30upx;
		textarea{
			width: 100%;
			background: #F3F3F3;
			border: 1px solid #CCCCCC;
			border-radius: 12upx;
			padding: 35upx;
			height: 168upx;
		}
		&-style{
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #CCCCCC;
		}
		&-upload{
			padding: 30upx;
			&__title{
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: $globalColor-fontStyle;
				line-height: 38upx;
				text{
					color: #E13B37;
					font-size: 24upx;
				}
			}
			&__image{
				border: 1px solid #F0F0F0;
				background: #F0F0F0;
				width: 162upx;
				height: 162upx;
				margin: 30upx;
				&-bg{
					text-align: center;
					width: 100%;
					height: 100%;
					background-size: 100% 100% !important;
					background-repeat: no-repeat !important;
					background-position: center center !important;
					position: relative;
					image{
						width: 70upx;
						height: 70upx;
						position: absolute;
						top: 50%;right: 46upx;
						transform: translate(0%,-50%);
					}
				}
			}
		}
	}
</style>
