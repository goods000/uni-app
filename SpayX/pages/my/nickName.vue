<template>
	<view class="page">
		<view class="tips-btn-out">
			<view class="tips-btn" @click="apply()">
				<view class="btn">{{ i18n.global.modify }}</view>
			</view>
		</view>
		<view class="empty-public"></view>
		<view class="header-plate">
			<view class="back-pic" @click="$tools.back(1)">
				<image src="../../static/public/back-icon-white.png" mode=""></image>
			</view>
			<view class="header-title">{{ i18n.user.change_username }}</view>
			<view class="header-empty"></view>
		</view>
		<view class="fill-plate">
			<view class="input-plate">
				<view class="input-title">{{ i18n.user.Nick_name }}</view>
				<view class="input-flex">
					<input type="text" v-model="nickname" value="" :placeholder="i18n.user.enter_05" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname:'',
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		methods:{
			apply(){
				this.$Ajax('/front/user/modify/name',{
					name:this.nickname
				},res=>{
					this.$tools.toast(res.msg);
					if(res.code==0){
						uni.switchTab({
							url:'./my'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.page{
		color: #FFFFFF;
		.tips-btn-out{
			width: 100vw;
			position: fixed;
			bottom: 2%;
			.tips-btn{
				width: 100%;
				.tips-plate{
					padding: 40rpx 30rpx;
					.tips-title{
						font-size: 32rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
					}
					.tips-text{
						font-size: 22rpx;
						font-family: PingFang SC-Bold;
						font-weight: 500;
						word-break: break-all;
					}
				}
				.btn{
					width: 690rpx;
					height: 88rpx;
					background: #FFCF1E;
					box-shadow: 0px 4rpx 14rpx 0px rgba(255, 207, 30, 0.41);
					border-radius: 44rpx;
					margin: auto;
					text-align: center;
					line-height: 88rpx;
					font-size: 32rpx;
					font-family: PingFang SC-Bold;
					font-weight: bold;
					color: #00061A;
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
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 30rpx;
					box-shadow: 0rpx 0rpx 12rpx 8rpx rgba(3, 101, 179, 0.6) inset;
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
