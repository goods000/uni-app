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
			<view class="header-title">{{ i18n.global.System_language }}</view>
			<view class="header-empty"></view>
		</view>
		<!-- <view class="page-empty"></view> -->
		<view class="fill-plate">
			<view class="input-plate">
				<view class="input-title">{{ i18n.user.language_selection }}</view>
				<view class="input-flex">
					<input type="text" :value="i18n.language.cn" />
					<view class="flex-right-pic" @click="changeShow('cn')">
						<image v-if="langType == 'cn'" src="../../static/my/open-chioce.png" mode=""></image>
						<image v-else src="../../static/my/close-chioce.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="input-plate">
				<view class="input-flex">
					<input type="text" :value="i18n.language.en" />
					<view class="flex-right-pic" @click="changeShow('en')">
						<image v-if="langType == 'en'" src="../../static/my/open-chioce.png" mode=""></image>
						<image v-else src="../../static/my/close-chioce.png" mode=""></image>
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
				langType:'',
				type:'',
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
		onShow() {
			this.langType = uni.getStorageSync('initLanguage');
		},
		methods:{
			changeShow(i){
				this.type = i;
				this.langType = i;
			},
			next(){
				uni.setStorageSync('initLanguage', this.type);
				this.$i18n.locale = this.type;
				this.$store.commit('changeLanguage', this.type);
				var lang = uni.getStorageSync('initLanguage');
				if (lang == 'cn') {
					var needLang = 'zh';
				} else if (lang == 'en') {
					var needLang = 'en';
				}
				this.$Ajax(
					'/search/changeLanauage',
					{
						lang: needLang
					},
					res => {}
				);	
			}
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
