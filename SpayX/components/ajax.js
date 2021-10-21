import webUrl from './url.js';
import messagesCn from './cn';
import messagesEn from './en';

const ajax = (url, data, successCallback,failCallBack,type = "POST") => {
	var token=uni.getStorageSync('token');
	var lang = uni.getStorageSync('initLanguage');
	data.token=token;
	uni.request({
		url: webUrl.webUrl + url,
		data: data,
		method: type || 'POST',
		dataType: 'json',
		header: {
			"x-requested-with":"XMLHttpRequest",
			"content-type": "application/x-www-form-urlencoded",
			'token':token,
			"lang": lang
		},
		success: (res) => {
			// console.log(url+"--->"+JSON.stringify(data)+"--->"+JSON.stringify(res.data));
			var code = res.data.code;
			if (code == 0 || code==-6) {
				successCallback(res.data);
			} else if (code == -2) {
				uni.showToast({
					title: messagesCn.toast.noLogin,
					icon: "none",
					duration: 2000,
					position:'bottom'
				})
				if (getApp().globalData.is_flag) {
					getApp().globalData.is_flag = false;
					console.log('没有登录');
					setTimeout(function() {
						let message;
						if (uni.getStorageSync('initLanguage') == 'cn') {
							message = messagesCn.toast.noLogin;
						} else if (uni.getStorageSync('initLanguage') == 'en') {
							message = messagesEn.toast.noLogin;
						}
						uni.navigateTo({
							url:'../login/first'
						})
						uni.removeStorageSync('token');
					}, 100)
					setTimeout(() => {
						getApp().globalData.is_flag = true;
						console.log(getApp().globalData.is_flag);
					}, 1000)
				}
			} else if (code == -1) {
					  uni.showToast({
					  	title: res.data.msg,
					  	icon: "none",
					  	duration: 2000,
						position:'bottom'
					  })
					  if(failCallBack){
						  failCallBack(res.data);
					  }
			}else if(code==-4){
				uni.showToast({
					title: res.data.msg,
					icon: "none",
					duration: 2000,
					position:'bottom'
				})
			}
		},
		fail: () => {
			// that.$tools.toast('连接失败,请稍后再试');
			uni.showToast({
				title: this.globalData.$t('message').toast.tryAgain,
				icon:"none",
				position:'bottom'
			});
		}
	})
}
export default ajax
