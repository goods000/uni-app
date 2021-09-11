<script>
	import version from './common/js/url.js';
	export default {
		// 修复了未登录的重复跳转问题
		globalData: {
			is_flag: true
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			let v_url = '';
			uni.getSystemInfo({
				success: function(res) {
					if (res.platform == 'android') {
						v_url = '/version/android';
						
					} else if (res.platform == 'ios') {
						v_url = '/version/ios';
					}
				}
			});
			
			uni.request({
				url: version.webUrl + v_url,
				method: 'POST',
				dataType: 'json',
				data: {},
				header: {
					'content-type': 'application/json'
				},
				success: res => {
					var code = res.data.code;
					if (code == 0) {
						var add = res.data.item.versionUrl;
						var currentVersion = res.data.item.versionNo;
						console.log(currentVersion, version.version);
						if (version.version != currentVersion) {
							uni.showModal({ //提醒用户更新
								title:'更新提示',
								content: '检测到新版本' + currentVersion + ',你的版本是' + version.version,
								showCancel: false,
								closeOnClickModal: false,
								confirmText:'确认',
								success: (res) => {
									if (res.confirm) {
										plus.runtime.openURL(add);
									} else {
										console.log(9999999);
									}
								}
							})
							console.log(res.data.msg);
							uni.setStorageSync('version', res.data.msg);
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

<style>
	/*每个页面公共css */
	page{
		background: #E9E9E9;
	}
</style>
