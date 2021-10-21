<template>
	<view class="page">
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title"></view>
			<view class="header-empty"></view>
		</view>
		<view class="page-title-cn">{{ i18n.login.Import_wallet }}</view>
		<view class="fill-plate-out">
			<view class="fill-plate">
				<view class="input-plate input-plate__noPadding">
					<view class="input-flex__textarea">
						<textarea placeholder-class="input-flex__textarea--style" :placeholder="i18n.login.enter_01" v-model="words"/>
					</view>
				</view>
			</view>
		</view>
		<view class="fill-plate-out">
			<view class="fill-plate">
				<!-- <view class="input-plate">
					<view class="input-title">{{ i18n.login.Identity_name }}</view>
					<view class="input-flex">
						<input type="text" v-model="phone" value="" :placeholder="i18n.login.enter_02" />
					</view>
				</view> -->
				<view class="input-plate">
					<view class="input-title">{{ i18n.login.Wallet_password }}</view>
					<view class="input-flex">
						<input :password="!eyeShowHideArray[0].show" v-model="password" value="" :placeholder="i18n.login.enter_03" />
						<view class="flex-right-pic" @click="changeShow(0)">
							<image v-if="eyeShowHideArray[0].show" src="../../static/login/open-eye.png" mode=""></image>
							<image v-else src="../../static/login/close-eye.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="input-plate">
					<view class="input-title">{{ i18n.login.confirPwd }}</view>
					<view class="input-flex">
						<input :password="!eyeShowHideArray[1].show" v-model="confirmpassword" value="" :placeholder="i18n.login.enter_04" />
						<view class="flex-right-pic" @click="changeShow(1)">
							<image v-if="eyeShowHideArray[1].show" src="../../static/login/open-eye.png" mode=""></image>
							<image v-else src="../../static/login/close-eye.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="btn btn-border__margin" @click="login()">{{ i18n.login.Import }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				words:'',
				phone:'',
				password:'',
				confirmpassword:'',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }],
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		methods:{
			login(){
				if(this.words==''){
					this.$tools.toast(this.i18n.login.placeholder_06);
				}
				// else if(this.phone==''){
				// 	this.$tools.toast(this.i18n.login.enter_02);
				// }
				else if(this.password==''){
					this.$tools.toast(this.i18n.login.enter_03);
				}else if(this.confirmpassword==''){
					this.$tools.toast(this.i18n.login.enter_04);
				}else if(this.confirmpassword != this.password){
					this.$tools.toast(this.i18n.login.enter_05);
				}else {
					this.$Ajax('/front/login',{
						// account:this.phone,
						data:this.password,
						passphrase:this.words
					},res=>{
						console.log(res);
							this.$tools.toast(res.msg);
						if(res.code==0){
							uni.setStorageSync('token', res.obj.token);
							uni.removeStorageSync('wordList');
							uni.removeStorageSync('sortArr');
							uni.removeStorageSync('wordsArr');
							uni.removeStorageSync('words');
							uni.switchTab({
								url:'../index/index'
							})
						}
						
					})
				}
			},
			Register(){
				uni.navigateTo({
					url:'./register'
				})
			},
			Forget(){
				uni.navigateTo({
					url:'./forget'
				})
			},
			changeShow(index){
				console.log(index);
				this.eyeShowHideArray[index].show = !this.eyeShowHideArray[index].show;
			},
		}
	}
</script>

<style lang="scss">
	.page{
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
		height: 100vh;
		width: 100vw;
		color: #FFFFFF;
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
		.forget-btn{
			width: 100vw;
			text-align: center;
			position: fixed;
			bottom: 5%;
			font-size: 24rpx;
			font-family: PingFang SC-Bold;
			font-weight: 500;
			text{
				color: #00A2FF;
			}
		}
		.login-empty{
			height: 110rpx;
		}
		.page-title-cn{
			font-size: 52rpx;
			font-family: PingFang SC-Bold;
			font-weight: 500;
			padding:20rpx 0 80rpx 60rpx;
		}
		.page-title-en{
			font-size: 20rpx;
			font-family: DIN;
			font-weight: 500;
			padding-left: 30rpx;
		}
		.fill-plate-out{
			padding: 0rpx 30rpx 30rpx;
			.fill-plate{
				background-color: #040D32;
				padding: 15rpx 30rpx;
				.input-plate{
					padding-top: 40rpx;
					.input-title{
						font-size: 28rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						padding-bottom: 30rpx;
					}
					.input-flex__textarea{
						background: #040D32;
						// border: 1px solid #043680;
						display: flex;
						align-items: center;
						justify-content: space-between;
						textarea{
							max-height: 210rpx;
						}
						.input-flex__textarea--style{
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: rgba(255, 255, 255, .1);
						}
					}
					.input-flex{
						height: 104rpx;
						background: #040D32;
						// border: 1px solid #043680;
						border-image: linear-gradient(0deg, #0365B3, #0365B3) 10 10;
						// box-shadow: -4rpx -4rpx 14rpx 14rpx rgba(3, 101, 179, 0.6) inset;
						box-shadow: 0rpx 0rpx 12rpx 7rpx rgba(3, 101, 179, 0.6) inset;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0 30rpx;
						input{
							flex: 1;
							font-size: 32rpx;
							font-family: PingFang SC-Bold;
							font-weight: 400;
						}
						.flex-right-pic{
							width: 34rpx;
							height: 34rpx;
							image{
								width: 34rpx;
								height: 34rpx;
							}
						}
					}
				}
				.model-list{
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 64rpx;
					.item{
						font-size: 24rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						color: #00A2FF;
					}
				}
				.agreement-plate{
					height: 75rpx;
					display: flex;
					align-items: center;
					padding-top: 100rpx;
					.agreement-pic{
						width: 24rpx;
						height: 24rpx;
						image{
							width: 24rpx;
							height: 24rpx;
						}
					}
					.agreement-text{
						font-size: 20rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						padding-left: 10rpx;
						text{
							color: #00A2FF;
						}
					}
				}
				.btn{
					width: 620rpx;
					height: 88rpx;
					background: #FFCF1E;
					box-shadow: 0rpx 4rpx 14rpx 0rpx rgba(255, 207, 30, 0.41);
					border-radius: 44rpx;
					text-align: center;
					line-height: 88rpx;
					margin: auto;
					font-size: 34rpx;
					font-family: PingFang SC-Bold;
					font-weight: bold;
					color: #040D32;
				}
				.btn-border__margin{
					margin: 80upx auto;
				}
				.plate-text{
					height: 130rpx;
					line-height: 130rpx;
					text-align: center;
					font-size: 28rpx;
					font-family: PingFang SC-Bold;
					font-weight: 500;
					color: #00A2FF;
				}
			}
			.input-plate__noPadding{
				padding-top: 20rpx !important;
			}
		}
	}
</style>
