import webUrl from './url.js'
import $tools from './tools.js'

const ajax = (url, data, successCallback, failCallBack, type) => {
	var token = uni.getStorageSync('token');
	data.token = token;
	// console.log(data);
	// manifest.json 配置地址

	uni.request({
		url: webUrl.webUrl + url,
		data: data,
		method: type || 'POST',
		dataType: 'json',
		header: {
			"x-requested-with": "XMLHttpRequest",
			"content-type": "application/x-www-form-urlencoded",
			"token": token
		},
		success: (res) => {
			var code = res.data.code;
			if (code == 0) {
				successCallback(res.data);
			} else if (code == -2) {
				if (getApp().globalData.is_flag) { 
					getApp().globalData.is_flag = false;
					console.log('没有登录');
					setTimeout(function() {
						// $tools.jump('../index/index');
						$tools.jump('../operate/first');
						uni.removeStorageSync('token');
					}, 100)
					setTimeout(() => {
						getApp().globalData.is_flag = true;
						console.log(getApp().globalData.is_flag);
					}, 1000)
				}
			}  else {
				$tools.toast(res.data.msg);
				uni.removeStorageSync('address');
				uni.removeStorageSync('wordsList');
				uni.removeStorageSync('sortArr');
				uni.removeStorageSync('wordsArr');
			} 
		},
		fail: () => {
			// console.log(webUrl.webUrl + url);
			$tools.toast('连接失败,请稍后再试');
			// $tools.toast('请稍后再试');
		}
	})
}
export default ajax
