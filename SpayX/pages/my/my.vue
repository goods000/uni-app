<template>
	<view class="page" :style="'background-image:url(' + imgSrc + ')'">
		<view class="empty-public"></view>
		<view class="my-header-title">{{ i18n.tarbar.item_04 }}</view>
		<view class="my-header-info">
			<view class="info-left">
				<view class="left-pic">
					<image :src="pic" mode=""></image>
				</view>
				<view class="left-text">
					<view class="text-top">
						<view class="text-title">Hi, {{name}}</view>
						<view class="text-pic" @click="nickName()">
							<image src="../../static/my/edit-icon.png" mode=""></image>
						</view>
					</view>
					<view class="text-bottom">UID:{{inviteCode}}</view>
				</view>
			</view>
			<view class="info-right-flex">
				<view class="info-right">
					<image :src="langType == 'en' ? levelEnglish : level" mode=""></image>
				</view>
				<view class="info-right-icon" v-if="comm==2">
					<image :src="langType == 'en' ? '../../static/my/type-1-en.png' : '../../static/my/type-1.png'" mode=""></image>
				</view>
				<view class="info-right-icon" v-if="comm==1">
					<image :src="langType == 'en' ? '../../static/my/type-2-en.png' : '../../static/my/type-2.png'" mode=""></image>
				</view>
			</view>
		</view>
		<view class="list-empty"></view>
		<!-- <view class="menu-list">
			<view class="menu-item" @click="Certification()">
				<view class="menu-left">
					<view class="left-pic">
						<image src="../../static/my/my-menu-1.png" mode=""></image>
					</view>
					<view class="left-text">{{ i18n.user.item_01 }}</view>
				</view>
				<view class="menu-right">
					<text v-if="authobj==0">未认证</text>
					<text v-if="authobj==1">认证中</text>
					<text v-if="authobj==2">认证成功</text>
					<text v-if="authobj==3">认证失败</text>
					<image src="../../static/my/more-icon.png" mode=""></image>
				</view>
			</view>
		</view> -->
		<view class="menu-list">
			<view class="menu-item" @click="Safety()">
				<view class="menu-left">
					<view class="left-pic">
						<image src="../../static/my/my-menu-2.png" mode=""></image>
					</view>
					<view class="left-text">{{ i18n.user.item_02 }}</view>
				</view>
				<view class="menu-right">
					<image src="../../static/my/more-icon.png" mode=""></image>
				</view>
			</view>
			<view class="menu-item" @click="myTeam()">
				<view class="menu-left">
					<view class="left-pic">
						<image src="../../static/my/my-menu-3.png" mode=""></image>
					</view>
					<view class="left-text">{{ i18n.user.item_03 }}</view>
				</view>
				<view class="menu-right">
					<image src="../../static/my/more-icon.png" mode=""></image>
				</view>
			</view>
			<view class="menu-item" @click="teamShare()">
				<view class="menu-left">
					<view class="left-pic">
						<image src="../../static/my/my-menu-4.png" mode=""></image>
					</view>
					<view class="left-text">{{ i18n.user.item_04 }}</view>
				</view>
				<view class="menu-right">
					<image src="../../static/my/more-icon.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="menu-list">
			<view class="menu-item" @click="goService()">
				<view class="menu-left">
					<view class="left-pic">
						<image src="../../static/my/my-menu-5.png" mode=""></image>
					</view>
					<view class="left-text">{{ i18n.user.item_05 }}</view>
				</view>
				<view class="menu-right">
					<image src="../../static/my/more-icon.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="menu-list">
			<view class="menu-item">
				<view class="menu-left">
					<view class="left-pic">
						<image src="../../static/my/my-menu-6.png" mode=""></image>
					</view>
					<view class="left-text">{{ i18n.user.item_06 }}</view>
				</view>
				<view class="menu-right-text">{{appVersion}}</view>
			</view>
		</view>
		<view class="menu-list">
			<view class="menu-item" @click="Out()">
				<view class="menu-left">
					<view class="left-pic">
						<image src="../../static/my/my-menu-7.png" mode=""></image>
					</view>
					<view class="left-text">{{ i18n.user.item_07 }}</view>
				</view>
				<view class="menu-right">
					<image src="../../static/my/more-icon.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgSrc:'../../static/my/mine-bg.png',
				inviteCode:'',
				pic:'',
				name:'',
				level:'',
				levelEnglish:'',
				authobj:0,
				appVersion:'',
				serviceUrl:'',
				comm:'',
				reason:'',
				langType:'',
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onShow() {
			this.getBaseInfo();
			this.getAuth();
			this.getVersion();
			this.getLink();
			this.langType = uni.getStorageSync('initLanguage');
			uni.setTabBarItem({
				index: 0,
				text: this.$t('message').tarbar.item_01
			});
			uni.setTabBarItem({
				index: 1,
				text: this.$t('message').tarbar.item_02
			});
			uni.setTabBarItem({
				index: 2,
				text: this.$t('message').tarbar.item_03
			});
			uni.setTabBarItem({
				index: 3,
				text: this.$t('message').tarbar.item_04
			});
		},
		methods: {
			getLink(){
				this.$Ajax('/search/service/link',{},res=>{
					console.log(res);
					this.serviceUrl = res.obj;
				})
			},
			getVersion(){
				this.$Ajax('/search/appVersion',{
					type:0
				},res=>{
					console.log(res);
					this.appVersion = res.obj.appVersion;
				})
			},
			nickName(){
				uni.navigateTo({
					url:'./nickName'
				})
			},
			Certification(){
				if(this.authobj==0){
					uni.navigateTo({
						url:'./certification?authobj=' + this.authobj
					})
				}else if(this.authobj==1){
					this.$tools.toast(this.i18n.user.auth_progress);
				}else if(this.authobj==2){
					this.$tools.toast(this.i18n.user.auth_verified);
				}else if(this.authobj==3){
					uni.navigateTo({
						url:'./certification?reason=' + this.reason + '&authobj=' + this.authobj
					})
				}
			},
			Safety(){
				uni.navigateTo({
					url:'./safety'
				})
			},
			myTeam(){
				uni.navigateTo({
					url:'./myTeam'
				})
			},
			teamShare(){
				uni.navigateTo({
					url:'./teamShare'
				})
			},
			goService(){
				uni.setStorageSync('serviceUrl', this.serviceUrl);
				uni.navigateTo({
					url: './service'
				})
			},
			Out() {
				uni.showTabBar();
				let that = this;
				this.$Ajax('/front/logout', {}, res => {
					uni.removeStorage({
						key: 'token',
						success() {
							return that.$tools.toastJump(that.i18n.global.safeExitSuccess,'../login/first');
						}
					});
					this.personalShow = false;
				});
			},
			getBaseInfo(){
				this.$Ajax('/front/user/baseInfo',{},res=>{
					console.log(res);
					this.pic = res.obj.pic;
					this.inviteCode = res.obj.inviteCode;
					this.name = res.obj.name;
					this.level = res.obj.level;
					this.levelEnglish = res.obj.levelEnglish;
					this.comm = res.obj.comm;
				})
			},
			getAuth(){
				this.$Ajax('/front/user/query/auth',{},res=>{
					console.log(res);
					this.authobj = res.obj.status;
					this.reason = res.obj.reason;
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
		height: 100vh;
		width: 100vw;
		.my-header-title{
			height: 88rpx;
			line-height: 88rpx;
			padding: 0 40rpx;
			font-size: 38rpx;
			font-family: PingFang SC-Bold;
			font-weight: bold;
			color: #FFFFFF;
		}
		.my-header-info{
			padding: 25rpx 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.info-left{
				display: flex;
				align-items: center;
				.left-pic{
					width: 94rpx;
					height: 94rpx;
					border-radius: 50%;
					overflow: hidden;
					image{
						width: 94rpx;
						height: 94rpx;
					}
				}
				.left-text{
					padding-left: 20rpx;
					.text-top{
						display: flex;
						align-items: center;
						.text-title{
							padding-right: 16rpx;
							font-size: 32rpx;
							font-family: DIN;
							font-weight: 500;
							color: #FFFFFF;
						}
						.text-pic{
							width: 28rpx;
							height: 28rpx;
							image{
								width: 28rpx;
								height: 28rpx;
							}
						}
					}
					.text-bottom{
						font-size: 24rpx;
						font-family: DIN;
						font-weight: 400;
						color: #FFFFFF;
					}
				}
			}
			.info-right-flex{
				display: flex;
				align-items: center;
				height: 44rpx;
				.info-right{
					width: 126rpx;
					height: 44rpx;
					image{
						width: 126rpx;
						height: 44rpx;
					}
				}
				.info-right-icon{
					padding-left: 30rpx;
					height: 40rpx;
					image{
						width: 122rpx;
						height: 40rpx;
					}
				}
			}
		}
		.list-empty{
			height: 40rpx;
		}
		.menu-list{
			margin-top: 18rpx;
			.menu-item{
				padding: 0 20rpx 0 40rpx;
				height: 110rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 2rpx;
				background-color: #040D32;
				.menu-left{
					display: flex;
					align-items: center;
					.left-pic{
						width: 50rpx;
						height: 50rpx;
						image{
							width: 50rpx;
							height: 50rpx;
						}
					}
					.left-text{
						font-size: 30rpx;
						font-family: PingFang SC-Bold;
						font-weight: bold;
						color: #FFFFFF;
						padding-left: 30rpx;
					}
				}
				.menu-right{
					display: flex;
					align-items: center;
					text{
						font-size: 32rpx;
						font-family: DIN;
						font-weight: 500;
						color: #FFFFFF;
					}
					// width: 50rpx;
					// height: 50rpx;
					image{
						width: 50rpx;
						height: 50rpx;
					}
				}
				.menu-right-text{
					text-align: right;
					font-size: 28rpx;
					font-family: DIN;
					font-weight: 500;
					color: #FFFFFF;
					padding-right: 20rpx;
				}
			}
		}
	}
</style>
