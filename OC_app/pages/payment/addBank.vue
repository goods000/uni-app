<template>
	<view class="pages">
		<view class="header_bar header_bg header_border">
			<view class="header">
				<view class="header-back" @click="$tools.back(1)"></view>
				<view class="header-title">添加银行卡</view>
			</view> 
		</view> 
		<view class="form">
			<view class="formBox">
				<view class="formBox-group">
					<input type="text" placeholder="请输入开户人姓名" v-model="username" />
				</view>
				<view class="formBox-group">
					<input type="text" placeholder="请输入开户银行" v-model="bank" />
				</view>
				<view class="formBox-group">
					<input type="text" placeholder="请输入银行卡号码" v-model="num" />
				</view>
			</view>
			<view class="mt"></view>
			<!-- <view class="formBox">
				<view class="formBox-input">
					<view class="formBox-input-label">上传图片</view>
					<view class="formBox-input-image">
						<view class="formBox-input-image-bg" :style="'background: url( '+ uploadList.src +') no-repeat;background-size: 100% 100%;'">
							<view class="formBox-input-image-bg__photo" @click="chooseImg()">
								<image src="../../static/public/img-upload-1.png" mode="widthFix"></image>
							</view>
							<view class="formBox-input-image-bg-txt">点击上传</view>
						</view>
					</view>
					<view class="formBox-input-tips" @click="getSecurity()">（上传图片）</view>
				</view>
			</view> -->
			<view class="initBtn" @click="submit()">确定</view>
			
		</view>
	</view>
</template>

<script>
	import md5 from '../../common/js/md5.js';
	export default {
		data() {
			return {
				username: '',
				bank: '',
				num: '',
				uploadList: {src:''},
			}
		},
		onLoad() {
		},
		methods:{
			chooseImg() {
				let that = this;
				var token = uni.getStorageSync('token');
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //从相册选择
					success: res => {
						this.uploadList.src = res.tempFilePaths[0];
					},
					fail: function() {
						console.log('上传图片接口调用失败');
						return;
					}
				});
			},
			submit() {
				if(this.username == ''){
					return this.$tools.toast('请输入开户人姓名');
				}
				if(this.bank == ''){
					return this.$tools.toast('请输入开户银行');
				}
				if(this.num == ''){
					return this.$tools.toast('请输入银行卡号码');
				}
				this.$Ajax('/front/otc/addPay', {
					name: this.username,
					bankAddress: this.bank,
					account: this.num,
					payType:1,
					pic:''
				}, res => {
					if (res.code == 0) {
						this.username ='',
						this.bank ='',
						this.num ='',
						this.uploadList.src ='',
						this.$tools.toastBack(res.msg,2);
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/scss/pages/setting/setting';
	page{background: #FFFFFF;}
	.formBox{
		&-input{
			padding: 24upx 34upx;
			&-label{
				color: $globalColor-fontStyle;
				font-size: 28upx;
				margin-bottom: 22upx;
			}
			&-image{
				background: $globalColor-bgStyle;
				border: 1px solid rgba(221,229,238,0.24);
				border-radius: 8upx;
				max-height: 218upx;
				display: block;
				&-bg{
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
</style>
