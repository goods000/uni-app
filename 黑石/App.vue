<script>
	console.log('%c代码由%c lowkey %c开发','color: white;font-size: 18px;','color: white;font-size: 24px;','color: white;font-size: 18px;');
	
	import version from './components/url.js';
	export default {
		// 修复了未登录的重复跳转问题
		globalData: {
			is_flag: true
		},
		onLaunch: function() {
			console.log('App Launch')
			
			var lang = uni.getStorageSync('initlanguage');
			if(lang == 'cn'){
				var needLang = 'zh'
			}else if(lang == 'en'){
				var needLang = 'en'
			}
			
			uni.request({
				url: version.webUrl + '/search/changeLanauage',
				method: 'POST',
				dataType: 'json',
				data: {
					lang: needLang,
					appType: 0  //类型0:交易所 1:矿池
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					
				}
			})
		},
		onShow: function() {
			uni.request({
				url: version.webUrl + '/search/appVersion',
				method: 'POST',
				dataType: 'json',
				data: {
					appType: 0  //类型0:交易所 1:矿池
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					var code = res.data.code;
					if (code == 0) {
						let data = res.data.obj.info;
						let address = '';
						let currentVersion = '';
						
						uni.getSystemInfo({
							success: function(infoRes) {
								if (infoRes.platform == 'android') {
									address = data.androidAddress;
									currentVersion = data.androidVersion;
								} else if (infoRes.platform == 'ios') {
									address = data.iosAddress;
									currentVersion = data.iosVersion;
								}
							}
						});
						
						
						console.log(currentVersion, version.version);
						if (version.version != currentVersion) {
							// uni.removeStorageSync('token');
							uni.showModal({ //提醒用户更新
								title:'更新提示',
								content: '检测到新版本' + currentVersion + ',你的版本是' + version.version,
								showCancel: false,
								closeOnClickModal: false,
								confirmText:'确认',
								success: (res) => {
									if (res.confirm) {
										plus.runtime.openURL(address);
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
						title: '请稍后重试'
					});
				}
			});
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>