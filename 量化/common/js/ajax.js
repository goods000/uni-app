import webUrl from './url.js'
import $tools from './tools.js'
import $store from '../../store/index.js'
import messagesEn from './language/en';
import messagesCn from './language/cn';

const ajax = (url, data, successCallback, failCallBack, type) => {
	var token = uni.getStorageSync('token');
	var lang = uni.getStorageSync('initlanguage');
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
			"token": token,
			"lang": lang,
			"theme": $store.state.pageTheme
		},
		success: (res) => {
			// console.log(webUrl.webUrl + url);
			var code = res.data.code;
			if (code == 0 || code == -6) {
				successCallback(res.data);
			} else if (code == -2) {
				if (getApp().globalData.is_flag) { 
					getApp().globalData.is_flag = false;
					console.log('没有登录');
					setTimeout(function() {
						$tools.toastJump('请先登录', '../operate/login');
						uni.removeStorageSync('token');
					}, 100)

					setTimeout(() => {
						getApp().globalData.is_flag = true;
						console.log(getApp().globalData.is_flag);
					}, 1000)

				}

			} else if (code == -1) {
				console.log('此接口有报错：' + url + "--->" + JSON.stringify(data) + "--->" + JSON.stringify(res.data));
				
				if(res.data.msg == '' || res.data.msg == null){
					$tools.toast('系统异常(空值)');
				}else{
					$tools.toast(res.data.msg);
				}
				
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
			$tools.toast('请稍后重试');
			// $tools.toast(uni.getStorageSync('initlanguage') == 'cn' ? messagesCn.toast.tryAgain : messagesEn.toast.tryAgain);
		}
	})
}
export default ajax
