<template>
	<view class="page">
		<!-- 交易密码 -->
		<view class="group-apply-out" v-if="toastStatus">
			<view class="group-toast-bg">
				<view class="group-toast-info">
					<!-- <view class="toast-title">{{ i18n.group.Time_limited }}</view> -->
					<view class="toast-input-title">{{ i18n.global.tradePassword }}：</view>
					<view class="toast-input">
						<input type="password" value="" v-model="pwd" :placeholder="i18n.global.placeholder_password" />
					</view>
					<view class="toast-btn">
						<view class="cancel-btn" @click="cancel()">{{ i18n.global.cancel }}</view>
						<view class="confirm-btn" @click="confirm()">{{ i18n.global.enter }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.user.item_02 }}</view>
			<view class="header-empty"></view>
		</view>
		<view class="menu-list">
			<view class="menu-item-out" @click="changePwd()">
				<view class="menu-item">
					<view class="item-title">{{ i18n.global.tradePassword }}</view>
					<view class="item-right-more">
						<image src="../../static/public/right-more.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="menu-item-out" @click="openToast()">
				<view class="menu-item">
					<view class="item-title">{{ i18n.global.Mnemonic }}</view>
					<view class="item-right-more">
						<image src="../../static/public/right-more.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="menu-item-out" @click="language()">
				<view class="menu-item">
					<view class="item-title">{{ i18n.global.System_language }}</view>
					<view class="item-rightBox">
						<view class="item-right">{{ langType == 'en' ? 'English' : '简体中文' }}</view>
						<view class="item-right-more">
							<image src="../../static/public/right-more.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="menu-item-out" @click="changePwd()">
				<view class="menu-item">
					<view class="item-title">{{ i18n.user.login_password }}</view>
					<view class="item-right-more">
						<image src="../../static/public/right-more.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="menu-item-out" @click="changeTradepwd()">
				<view class="menu-item" style="border-top: 1px solid rgba(230,230,230,.1);">
					<view class="item-title">{{ i18n.global.tradePassword }}</view>
					<view class="item-right-more">
						<image src="../../static/public/right-more.png" mode=""></image>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				langType:'',
				toastStatus: false,
				pwd:'',
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onShow() {
			this.getBaseInfo();
			this.langType = uni.getStorageSync('initLanguage');
		},
		methods:{
			openToast() {
				console.log(666);
				this.toastStatus = true;
			},
			cancel() {
				this.toastStatus = false;
			},
			confirm() {
				if (this.pwd == '') {
					return this.$tools.toast(this.i18n.global.placeholder_password);
				}
				this.$Ajax('/front/passphrase/export/do', {
					pwd: this.pwd
				}, res => {
					console.log(res);
					this.pwd = '';
					if (res.code == 0) {
						this.toastStatus = false;
						uni.navigateTo({
							url: './Mnemonic?passphrase=' + res.obj
						})
					}
				})
			},
			changePwd(){
				uni.navigateTo({
					url:'../login/changePwd'
				})
			},
			changeTradepwd(){
				uni.navigateTo({
					url:'../login/changeTradepwd'
				})
			},
			Mnemonic(){
				uni.navigateTo({
					url:'./Mnemonic'
				})
			},
			language(){
				uni.navigateTo({
					url:'./language'
				})
			},
			getBaseInfo(){
				this.$Ajax('/front/user/baseInfo',{},res=>{
					console.log(res);
					this.phone = res.obj.account.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2');
				})
			},
		}
	}
</script>

<style lang="scss">
	.page{
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
		.menu-list{
			padding-top: 18rpx;
			.menu-item-out{
				height: 110rpx;
				background-color: #040D32;
				padding: 0 40rpx;
				.menu-item{
					height: 110rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.item-title{
						font-size: 32rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
					}
					.item-rightBox{
						display: flex;
						justify-content: flex-end;
						align-items: center;
					}
					.item-right-more{
						width: 14rpx;
						height: 24rpx;
						margin-left: 20rpx;
						image{
							width: 14rpx;
							height: 24rpx;
						}
					}
					.item-right{
						font-size: 32rpx;
						font-family: DIN;
						font-weight: 500;
						color: #00A2FF;
					}
				}
			}
		}
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
					}
		
					.toast-input {
						background-size: 100% 100%;
						background-position: center;
						background-repeat: no-repeat;
						height: 106rpx;
						width: 594rpx;
						background-image: url(../../static/group/group-input-bg.png);
						margin: auto;
		
						input {
							height: 106rpx;
							line-height: 106rpx;
							padding-left: 35rpx;
							font-size: 32rpx;
							font-family: PingFang SC-Bold;
							font-weight: 500;
							color: #FFFFFF;
						}
					}
		
					.toast-btn {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding-top: 30rpx;
		
						.cancel-btn {
							width: 264rpx;
							height: 88rpx;
							line-height: 88rpx;
							text-align: center;
							background: #182447;
							border-radius: 44rpx;
							font-size: 32rpx;
							font-family: PingFang SC-Bold;
							font-weight: 500;
							color: #FFFFFF;
						}
		
						.confirm-btn {
							width: 264rpx;
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
		}
		
	}
</style>
