<template>
	<view class="page" :style="'background-image:url(' + imgSrc + ')'">
		<view class="forget-btn" @click="langVisible = true">{{ i18n.login.Current_language }}:{{ i18n.global.language }}<text>{{ i18n.login.switch }}</text></view>
		<view class="first-logo">
			<image src="../../static/login/login-logo.png" mode="widthFix"></image>
		</view>
		<view class="first-title">{{ i18n.login.tips_03 }}</view>
		<view class="fill-plate-out">
			<view class="fill-plate">
				<view class="btn" @click="Register()">{{ i18n.login.btn_01 }}</view>
				<view class="btn-border btn-border__margin" @click="login()">{{ i18n.login.btn_02 }}</view>
			</view>
		</view>
		
		<!-- 语种选择 -->
		<w-picker :visible.sync="langVisible" mode="selector" ref="langPicker" :options="langArray" @confirm="onPickerConfirm($event, 'langPicker')"></w-picker>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgSrc:'../../static/my/mine-bg.png',
				langVisible: false,
				langLabel: '',
				langVal: null,
			};
		},
		computed: {
			i18n() {
				return this.$t('message');
			},
			langArray() {
				return [
					{
						label: this.i18n.language.cn,
						value: 'cn'
					},
					{
						label: this.i18n.language.en,
						value: 'en'
					}
				];
			},
		},
		methods:{
			login(){
				uni.navigateTo({
					url:'./login'
				})
			},
			Register(){
				uni.navigateTo({
					url:'./register'
				})
			},
			onPickerConfirm(res, type) {
				console.log('当前控制的Picker是：' + type + ';当前值是' + res.obj.value);
			
				if (type == 'langPicker') {
					uni.setStorageSync('initLanguage', res.obj.value);
					this.$i18n.locale = res.obj.value;
					this.langVal = res.obj.value;
					this.$store.commit('changeLanguage', res.obj.value);
			
					this.langArray.forEach(item => {
						if (this.langVal == item.value) {
							this.langLabel = item.label;
						}
					});
					var lang = uni.getStorageSync('initLanguage');
					
					if (lang == 'cn') {
						var needLang = 'zh';
					} else if (lang == 'en') {
						var needLang = 'en';
					}
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
					this.$Ajax(
						'/search/changeLanauage',
						{
							lang: needLang
						},
						res => {}
					);
				}
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
		.first-logo{
			padding: 259rpx 0 0;
			image{
				margin: auto;
				width: 199rpx;
			}
		}
		.first-title{
			font-size: 26rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #FFFFFF;
			text-align: center;
			padding: 266rpx 0 202rpx;
			@media screen and (max-height: 810px) {
				padding: 16% 0 12%;
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
				margin-left: 10rpx;
			}
		}
		.fill-plate-out{
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
			.btn-border{
				width: 620rpx;
				height: 88rpx;
				border-radius: 44rpx;
				text-align: center;
				line-height: 88rpx;
				margin: auto;
				font-size: 34rpx;
				font-family: PingFang SC-Bold;
				font-weight: bold;
				color: #FFCF1E;
				border: 1px solid #FFCF1E;
			}
			.btn-border__margin{
				margin-top: 48upx;
			}
		}
	}
	.w-picker-header,.w-picker-item{
		color: #040D32 !important;
	}
</style>
