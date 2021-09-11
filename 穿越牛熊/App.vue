<script>
console.log('%c代码由%c lowkey %c开发', 'color: white;font-size: 18px;', 'color: white;font-size: 24px;', 'color: white;font-size: 18px;');

import version from '@/common/js/url.js';
export default {
	// 修复了未登录的重复跳转问题
	globalData: {
		is_flag: true,
		/* 修复nvue页面的多语言功能使用 */
		_i18n: '',
		$t: ''
	},
	onLaunch() {
		const context = this;
		// 这是原型链上的 $i18n
		this.globalData._i18n = this.$i18n;
		this.globalData.$t = function(str) {
			return context.$t(str);
		};

		var needLang = uni.getStorageSync('initlanguage') == 'cn' ? 'zh' : 'en';

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

		if (uni.getStorageSync('pageTheme') == null || uni.getStorageSync('pageTheme') == undefined || uni.getStorageSync('pageTheme') == '') {
			uni.setStorageSync('pageTheme', 'light');
			this.$store.commit('changePageTheme', 'light');
		}

		uni.onTabBarMidButtonTap(() => {
			this.$tools.jump('../quantification/quantification');
		});
		/* 设置默认主题风格 */
		// window.document.documentElement.setAttribute( "data-theme", 'light' );
	},
	onShow() {
		uni.setTabBarItem({
			index: 0,
			iconPath: 'static/tarbar/icon-tarbar-1-' + this.pageTheme + '.png',
			selectedIconPath: 'static/tarbar/icon-tarbar-1-active-' + this.pageTheme + '.png'
		});
		uni.setTabBarItem({
			index: 1,
			iconPath: 'static/tarbar/icon-tarbar-2-' + this.pageTheme + '.png',
			selectedIconPath: 'static/tarbar/icon-tarbar-2-active-' + this.pageTheme + '.png'
		});
		uni.setTabBarItem({
			index: 2,
			iconPath: 'static/tarbar/icon-tarbar-midButton.png',
			selectedIconPath: 'static/tarbar/icon-tarbar-midButton.png'
		});
		uni.setTabBarItem({
			index: 3,
			iconPath: 'static/tarbar/icon-tarbar-4-' + this.pageTheme + '.png',
			selectedIconPath: 'static/tarbar/icon-tarbar-4-active-' + this.pageTheme + '.png'
		});
		uni.setTabBarItem({
			index: 4,
			iconPath: 'static/tarbar/icon-tarbar-5-' + this.pageTheme + '.png',
			selectedIconPath: 'static/tarbar/icon-tarbar-5-active-' + this.pageTheme + '.png'
		});

		uni.setTabBarStyle({
			color: this.pageTheme == 'light' ? '#757F8D' : '#FFFFFF',
			selectedColor: this.pageTheme == 'light' ? '#EC6B00' : '#EC6B00',
			backgroundColor: this.pageTheme == 'light' ? '#FFFFFF' : '#292F3C',
			borderStyle: this.pageTheme == 'light' ? 'white' : 'black'
		});

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
						uni.showModal({
							//提醒用户更新
							title: '更新提示',
							content: '检测到新版本' + currentVersion + ',你的版本是' + version.version,
							showCancel: false,
							closeOnClickModal: false,
							confirmText: '确认',
							success: res => {
								if (res.confirm) {
									plus.runtime.openURL(add);
								} else {
									console.log(9999999);
								}
							}
						});
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
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
page {
	background-color: #FFFFFF;
}
</style>
