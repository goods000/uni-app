<template>
	<view class="page">
		<view class="fixed-plate-out">
			<view class="fixed-plate">
				<view class="btn" @click="next()">{{ i18n.global.confirm }}</view>
			</view>
		</view>
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.login.changeTradePwd }}</view>
			<view class="header-empty"></view>
		</view>
		<!-- <view class="page-empty"></view> -->
		<view class="fill-plate">
			<view class="input-plate">
				<view class="input-title">{{ i18n.mnemonic.title }}</view>
				<view class="input-flex">
					<input :password="!eyeShowHideArray[0].show" v-model="oldPwd" value="" :placeholder="i18n.login.enter_01" />
					<view class="flex-right-pic" @click="changeShow(0)">
						<image v-if="eyeShowHideArray[0].show" src="../../static/login/open-eye.png" mode=""></image>
						<image v-else src="../../static/login/close-eye.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="input-plate">
				<view class="input-title">{{ i18n.login.newPwd }}</view>
				<view class="input-flex">
					<input :password="!eyeShowHideArray[1].show" v-model="newPwd" value="" :placeholder="i18n.login.placeholder_02" />
					<view class="flex-right-pic" @click="changeShow(1)">
						<image v-if="eyeShowHideArray[1].show" src="../../static/login/open-eye.png" mode=""></image>
						<image v-else src="../../static/login/close-eye.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="input-plate">
				<view class="input-title">{{ i18n.login.confirPwd }}</view>
				<view class="input-flex">
					<input :password="!eyeShowHideArray[2].show" v-model="againNewPwd" value="" :placeholder="i18n.login.placeholder_03" />
					<view class="flex-right-pic" @click="changeShow(2)">
						<image v-if="eyeShowHideArray[2].show" src="../../static/login/open-eye.png" mode=""></image>
						<image v-else src="../../static/login/close-eye.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPwd:'',
				newPwd:'',
				againNewPwd:'',
				eyeShowHideArray: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }],
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		methods:{
			next(){
				let that = this;
				if (this.oldPwd == '') {
					return this.$tools.toast(this.i18n.login.placeholder_01);
				}
				if (this.newPwd == '') {
					return this.$tools.toast(this.i18n.login.placeholder_02);
				}
				if (this.againNewPwd == '') {
					return this.$tools.toast(this.i18n.login.placeholder_03);
				}
				if (this.newPwd != this.againNewPwd) {
					return this.$tools.toast(this.i18n.login.placeholder_04);
				}
				this.$Ajax('/front/user/modify/tradePwd',{
					tradePwd:this.newPwd,
					passphrase:this.oldPwd
				},res=>{
					console.log(res);
					if(res.code==0){
						uni.removeStorage({
							key: 'token',
							success() {
								that.$tools.toast(this.i18n.global.modifySuccess);
								uni.navigateTo({
									url:'./login'
								})
							}
						});
					}
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
		color: #FFFFFF;
		.fixed-plate-out{
			position: fixed;
			bottom: 5%;
			.fixed-plate{
				width: 100vw;
				.btn{
					width: 690rpx;
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
				.forget-btn{
					padding-top: 48rpx;
					font-size: 24rpx;
					font-family: PingFang SC-Bold;
					font-weight: 500;
					text-align: center;
					text{
						color: #00A2FF;
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
		.page-empty{
			height: 86rpx;
		}
		.page-title-blue{
			font-size: 32rpx;
			font-family: PingFang SC-Bold;
			font-weight: bold;
			color: #00A2FF;
			text-align: center;
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
	}
</style>
