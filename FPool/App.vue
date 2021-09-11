<script>
	
	import version from './common/js/url.js';
	export default {
		// 修复了未登录的重复跳转问题
		globalData: {
			is_flag: true,
			/* 修复nvue页面的多语言功能使用 */
			_i18n: '',
			$t: ''
		},
		onLaunch: function() {
			console.log('App Launch');
			
			const context = this
			// 这是原型链上的 $i18n
			this.globalData._i18n = this.$i18n
			this.globalData.$t = function(str) {
			  return context.$t(str)
			}
			
			// var lang = uni.getStorageSync('initlanguage');
			// if(lang == 'cn'){
			// 	var needLang = 'zh'
			// }else if(lang == 'en'){
			// 	var needLang = 'en'
			// }
			
			uni.request({
				url: version.webUrl + '/search/changeLanauage',
				method: 'POST',
				dataType: 'json',
				data: {
					// lang: needLang
					lang: 'en'
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					
				}
			})
		},
		onShow: function() {
			let type = 0;
			uni.getSystemInfo({
				success: function(res) {
					if (res.platform == 'android') {
						type = 0;
						
					} else if (res.platform == 'ios') {
						type = 1;
					}
				}
			});
			
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
					var code = res.data.code;
					if (code == 0) {
						var add = res.data.obj.appAddress;
						var currentVersion = res.data.obj.appVersion;
						console.log(currentVersion, version.version);
						if (version.version != currentVersion) {
							// uni.removeStorageSync('token');
							uni.showModal({ //提醒用户更新
								title:this.globalData.$t('message').global.updateReminder,
								content: this.globalData.$t('message').global.update_01 + currentVersion + ','+this.globalData.$t('message').global.update_02 + version.version,
								showCancel: false,
								closeOnClickModal: false,
								confirmText: this.globalData.$t('message').global.enter,
								success: (res) => {
									if (res.confirm) {
										plus.runtime.openURL(add);
									} else {
										console.log(9999999);
									}
								}
							})
							console.log(res.data.obj);
							uni.setStorageSync('version', res.data.obj);
						}
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
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	
</style>
