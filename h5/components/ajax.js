import webUrl from './url.js'
import $tools from './tools.js'

const ajax = (url, data, successCallback, failCallBack, type) => {
	var token = uni.getStorageSync('token');
	data.token = token;
	
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
			// console.log(webUrl.webUrl + url);
			var code = res.data.code;
			if (code == 0 || code == -6) {
				successCallback(res.data);
			} else if (code == -2) {
				console.log(url + "--->" + JSON.stringify(data) + "--->" + JSON.stringify(res.data));
				if (getApp().globalData.is_flag) { 
					getApp().globalData.is_flag = false;
					console.log('没有登陆');
					setTimeout(function() {
						$tools.toastJump('您没有登陆', '../videoContent/videoContent');
						uni.removeStorageSync('token');
					}, 100)

					setTimeout(() => {
						getApp().globalData.is_flag = true;
						console.log(getApp().globalData.is_flag);
					}, 1000)

				}

			} else if (code == -1) {
				console.log('此接口有报错：' + url + "--->" + JSON.stringify(data) + "--->" + JSON.stringify(res.data));
				$tools.toast(res.data.msg);
				if (failCallBack) {
					failCallBack(res.data);
				}
			} else if (code == -4) {
				$tools.toast(res.data.msg);
			} else if (code == -6) {
				$tools.toast(res.data.msg);
			}
		},
		fail: () => {
			// this.$tools.toast('连接失败,请稍后再试');
			$tools.toast('请稍后再试');
		}
	})
}
export default ajax
