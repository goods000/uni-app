<script>
	import version from './components/url.js';
	export default {
		// 修复了未登录的重复跳转问题
		globalData: {
			is_flag: true,
			/* 修复nvue页面的多语言功能使用 */
			_i18n: '',
			$t: ''
		},
		onLaunch: function() {
			const context = this;
			// 这是原型链上的 $i18n
			this.globalData._i18n = this.$i18n;
			this.globalData.$t = function(str) {
				return context.$t(str);
			};
			
			var needLang = uni.getStorageSync('initLanguage') == 'cn' ? 'zh' : 'en';
			
			uni.request({
				url: version.webUrl + '/search/changeLanauage',
				method: 'POST',
				dataType: 'json',
				data: {
					lang: needLang
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {}
			});
		},
		onShow: function() {
			// setInterval(() => {
			// 	console.log(JSON.stringify(uni.getStorageSync('token')));
			// }, 2000)
			// console.log(JSON.stringify(uni.getStorageSync('token') + '有没有'));
			// if(uni.getStorageSync('token')){
			// 	this.socket();
			// }
			// 锁定屏幕方向
			// plus.screen.lockOrientation('portrait-primary'); //锁定

			let type = 0;
			// const res = uni.getSystemInfoSync();
			uni.getSystemInfo({
				success: function(res) {
					// console.log(JSON.stringify(res));
					if (res.platform == 'android') {
						type = 0;
					} else if (res.platform == 'ios') {
						type = 1;
					}
				}
			});
			console.log(JSON.stringify(type));
			uni.request({
				url: version.webUrl + '/search/appVersion',
				method: 'POST',
				dataType: 'json',
				data: {
					type: type
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					// console.log(JSON.stringify(res));
					var code = res.data.code;
					if (code == 0) {
						var add = res.data.obj.appAddress;
						var currentVersion = res.data.obj.appVersion;
						// console.log(JSON.stringify(add));
						// console.log(JSON.stringify(currentVersion));
						if (version.version != currentVersion) {
							// uni.removeStorageSync('token');
							uni.showModal({
								//提醒用户更新
								title:this.globalData.$t('message').global.updateReminder,
								content: this.globalData.$t('message').global.update_01 + currentVersion + ','+this.globalData.$t('message').global.update_02 + version.version,
								confirmText: this.globalData.$t('message').global.enter,
								showCancel: false,
								closeOnClickModal: false,
								success: res => {
									if (res.confirm) {
										plus.runtime.openURL(add);
									} else {
										console.log(9999999);
									}
								}
							});
						}
					} else if (code == -2) {
						uni.showToast({
							title: this.globalData.$t('message').toast.noLogin,
							icon: 'none',
							duration: 2000
						});
						uni.navigateTo({
							url: '../login/first'
						});
					} else if (code == -1) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						});
					}
				},
				fail: () => {
					uni.showToast({
						title: this.globalData.$t('message').toast.tryAgain
					});
				}
			});
		},
		onHide: function() {

		},
		methods: {

		}
	};
</script>

<style lang="scss">
	* {
		// box-sizing: border-box;
	}

	image {
		height: 0;
		display: block;
	}

	// 背景
	.initBg {
		position: fixed;
		z-index: 0;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;

		&--autoHeight {
			image {
				width: 100%;
			}
		}
	}

	.fullBg {
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
		height: 100vh;
		width: 100vw;

		image {
			width: 100%;
		}
	}

	// 导航条

	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	// 动画
	@import url('common/animate.css');

	.animation-zoom {
		animation-duration: 0.5s;
	}

	@font-face {
		font-family: DIN;
		src: url(./components/font/D-DINExp-Bold.ttf);
	}

	@font-face {
		font-family: DINS;
		src: url(./components/font/D-DINExp.ttf);
	}
	
	@font-face {
		font-family: PingFang SC-Bold;
		src: url(./components/font/PingFang-Bold.ttf);
	}

	uni-page-head .uni-page-head {
		
	}

	.font {
		font-family: DIN !important;
	}

	.fonts {
		font-family: DINS !important;
	}
	.fontss {
		font-family: PingFang SC-Bold !important;
	}
	/* #ifdef APP-PLUS */
	.empty-public {
		// height: var(--status-bar-height);
		height: calc(var(--status-bar-height));
		background-color: #00061A;
		// padding-top: 44px;
		// box-sizing: content-box;
	}
	.empty-publics {
		// height: var(--status-bar-height);
		position: fixed;
		height: calc(var(--status-bar-height));
		background-color: #00061A;
		z-index: 11;
		// padding-top: 44px;
		// box-sizing: content-box;
	}
	.empty-public-my {
		height: calc(var(--status-bar-height));
	}

	/* #endif */
	.empty-seat {
		height: 88rpx;
	}
	
	.full-line{
		width: 100vw;
		height: 10rpx;
		background-color: #F5F5F5;
	}

	.uni-mask {
		position: fixed;
		z-index: 999;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.3);
	}

	.uni-radio-wrapper {
		// margin-bottom: 32%;
		padding-bottom: 45%;
	}

	uni-checkbox .uni-checkbox-wrapper .uni-checkbox-input .uni-checkbox-input-checked:hover {
		border-color: rgb(247, 202, 66) !important;
	}

	.loss {
		color: #2f3033 !important;
	}

	.hot {
		color: #ff6200 !important;
	}

	button::after {
		border: none !important;
	}

	page {
		background-color: #00061A;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}

	/* #ifdef H5 */
	uni-page-head {
		// display: none;
	}

	/* #endif */
	/* 1px */
	.uni-border-t,
	.uni-border-b,
	.uni-border-l,
	.uni-border-r,
	.uni-border-radius {
		position: relative;
	}

	.uni-border-b:before {
		border-bottom: 1px solid #f1f2f3;
		content: '';
		display: block;
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		-webkit-transform-origin: left bottom;
	}

	.formInput.uni-border-b:before {
		border-color: #e9eaeb;
	}

	.uni-border-b.active:before {
		border-color: #2f3033 !important;
	}

	@media screen and (-webkit-min-device-pixel-ratio: 2) {
		.uni-border-b:before {
			-webkit-transform: scaleY(0.5);
		}
	}

	@media screen and (-webkit-min-device-pixel-ratio: 3) {
		.uni-border-b:before {
			-webkit-transform: scaleY(0.3333);
		}
	}

	.uni-border-t:before {
		border-top: 1px solid #f1f2f3;
		content: '';
		display: block;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		-webkit-transform-origin: left top;
	}

	@media screen and (-webkit-min-device-pixel-ratio: 2) {
		.uni-border-t:before {
			-webkit-transform: scaleY(0.5);
		}
	}

	@media screen and (-webkit-min-device-pixel-ratio: 3) {
		.uni-border-t:before {
			-webkit-transform: scaleY(0.3333);
		}
	}

	.uni-border-l:before {
		border-left: 1px solid #f1f2f3;
		content: '';
		display: block;
		bottom: 0;
		position: absolute;
		left: 0;
		top: 0;
		-webkit-transform-origin: left top;
	}

	@media screen and (-webkit-min-device-pixel-ratio: 2) {
		.uni-border-l:before {
			-webkit-transform: scaleX(0.5);
		}
	}

	@media screen and (-webkit-min-device-pixel-ratio: 3) {
		.uni-border-l:before {
			-webkit-transform: scaleX(0.3333);
		}
	}

	.uni-border-r:before {
		border-right: 1px solid #f1f2f3;
		content: '';
		display: block;
		bottom: 0;
		position: absolute;
		right: 0;
		top: 0;
		-webkit-transform-origin: right top;
	}

	@media screen and (-webkit-min-device-pixel-ratio: 2) {
		.uni-border-r:before {
			-webkit-transform: scaleX(0.5);
		}
	}

	@media screen and (-webkit-min-device-pixel-ratio: 3) {
		.uni-border-r:before {
			-webkit-transform: scaleX(0.3333);
		}
	}

	.uni-border-radius:after {
		content: '';
		width: 200%;
		height: 200%;
		position: absolute;
		top: 0;
		left: 0;
		border: 1px solid #d4d7e0;
		-webkit-transform-origin: 0 0;
		padding: 1px;
		-webkit-box-sizing: border-box;
		pointer-events: none;
		z-index: 10;
		border-radius: 16upx;
	}

	@media screen and (-webkit-min-device-pixel-ratio: 2) {
		.uni-border-radius:after {
			width: 200%;
			height: 200%;
			-webkit-transform: scale(0.5);
			// border-radius: 32upx;
		}
	}

	@media screen and (-webkit-min-device-pixel-ratio: 3) {
		.uni-border-radius:after {
			width: 300%;
			height: 300%;
			-webkit-transform: scale(0.3333);
			// border-radius: 32upx;
		}
	}

	.triple:after {
		content: '';
		width: 300%;
		height: 300%;
		position: absolute;
		top: 0;
		left: 0;
		border: 1px solid #d4d7e0;
		-webkit-transform-origin: 0 0;
		padding: 1px;
		-webkit-box-sizing: border-box;
		pointer-events: none;
		z-index: 10;
		border-radius: 144upx;
	}

	@media screen and (-webkit-min-device-pixel-ratio: 2) {
		.triple:after {
			width: 300%;
			height: 300%;
			-webkit-transform: scale(0.5);
		}
	}

	@media screen and (-webkit-min-device-pixel-ratio: 3) {
		.triple:after {
			width: 300%;
			height: 300%;
			-webkit-transform: scale(0.3333);
		}
	}

	.quadruple:after {
		content: '';
		width: 300%;
		height: 300%;
		position: absolute;
		top: 0;
		left: 0;
		border: 1px solid #d4d7e0;
		-webkit-transform-origin: 0 0;
		padding: 1px;
		-webkit-box-sizing: border-box;
		pointer-events: none;
		z-index: 10;
		border-radius: 144upx;
	}

	@media screen and (-webkit-min-device-pixel-ratio: 2) {
		.quadruple:after {
			width: 300%;
			height: 300%;
			-webkit-transform: scale(0.5);
		}
	}

	@media screen and (-webkit-min-device-pixel-ratio: 3) {
		.quadruple:after {
			width: 300%;
			height: 300%;
			-webkit-transform: scale(0.3333);
		}
	}

	// 应用于某些针对性布局
	.magTop30 {
		margin-top: 30upx;
	}
</style>
