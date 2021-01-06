const tools = {};

// 后退
tools.back = (step) => {
	uni.navigateBack({
		delta: step
	});
};

tools.toastBack = (title, step) => {
	uni.showToast({
		title: title,
		icon: "none",
		mask: true,
		duration: 1000,
		position: 'bottom'
	})
	setTimeout(function() {
		uni.navigateBack({
			delta: step
		});
	}, 1000);

};

// 指定返回页面
tools.pathBack = (path) => {
	let pages = getCurrentPages(); //获取页面栈

	let pageIndex = pages.findIndex(findItem => {
		return findItem.route === path /* 需返回的页面路由 */
	})
	
	let prevPage = pages[pageIndex];
	
	uni.navigateBack({
		delta: (pages.length - (pageIndex + 1))
	}) //返回到列表页面
};

// 复制
tools.copy = (val) => {
	uni.setClipboardData({
		data: val,
		success() {
			uni.showToast({
				title: '复制成功',
				duration: 2000,
				icon: "none"
			})
		}

	})
}

// 提示
tools.toast = (title) => {
	uni.showToast({
		title: title,
		icon: "none",
		mask: true,
		duration: 1000,
		position: 'bottom'
	})
}

tools.jump = (path, value1, value2, value3, value4, value5, value6) => {
	var string = '';

	if (value1 != undefined) {
		string += '?=&value1=' + value1;
	}
	if (value2 != undefined) {
		string += '&value2=' + value2;
	}
	if (value3 != undefined) {
		string += '&value3=' + value3;
	}
	if (value4 != undefined) {
		string += '&value4=' + value4;
	}
	if (value5 != undefined) {
		string += '&value5=' + value5;
	}
	if (value6 != undefined) {
		string += '&value6=' + value6;
	}
	uni.navigateTo({
		url: path + string
	})
}

tools.toastJump = (title, path, value1, value2, value3, value4, value5, value6) => {
	uni.showToast({
		title: title,
		icon: "none",
		mask: true,
		duration: 1000,
		position: 'bottom'
	})

	var string = '';

	if (value1 != undefined) {
		string += '?=&value1=' + value1;
	}
	if (value2 != undefined) {
		string += '&value2=' + value2;
	}
	if (value3 != undefined) {
		string += '&value3=' + value3;
	}
	if (value4 != undefined) {
		string += '&value4=' + value4;
	}
	if (value5 != undefined) {
		string += '&value5=' + value5;
	}
	if (value6 != undefined) {
		string += '&value6=' + value6;
	}

	setTimeout(function() {
		uni.navigateTo({
			url: path + string
		})
	}, 1000);
}


tools.redirectTo = (path, value1, value2, value3, value4, value5, value6) => {
	var string = '';

	if (value1 != undefined) {
		string += '?=&value1=' + value1;
	}
	if (value2 != undefined) {
		string += '&value2=' + value2;
	}
	if (value3 != undefined) {
		string += '&value3=' + value3;
	}
	if (value4 != undefined) {
		string += '&value4=' + value4;
	}
	if (value5 != undefined) {
		string += '&value5=' + value5;
	}
	if (value6 != undefined) {
		string += '&value6=' + value6;
	}
	uni.redirectTo({
		url: path + string
	})
}

tools.toastRedirectTo = (title, path, value1, value2, value3, value4, value5, value6) => {
	uni.showToast({
		title: title,
		icon: "none",
		mask: true,
		duration: 1000,
		position: 'bottom'
	})

	var string = '';

	if (value1 != undefined) {
		string += '?=&value1=' + value1;
	}
	if (value2 != undefined) {
		string += '&value2=' + value2;
	}
	if (value3 != undefined) {
		string += '&value3=' + value3;
	}
	if (value4 != undefined) {
		string += '&value4=' + value4;
	}
	if (value5 != undefined) {
		string += '&value5=' + value5;
	}
	if (value6 != undefined) {
		string += '&value6=' + value6;
	}

	setTimeout(function() {
		uni.redirectTo({
			url: path + string
		})
	}, 1000);
}

tools.switchTab = (path) => {
	uni.switchTab({
		url: path
	});
}

tools.toastSwitchTab = (title, path) => {
	uni.showToast({
		title: title,
		icon: "none",
		mask: true,
		duration: 1000,
		position: 'bottom'
	})
	setTimeout(function() {
		uni.switchTab({
			url: path
		});
	}, 1000);
}

tools.reLaunch = (path) => {
	uni.reLaunch({
		url: path
	});
}

tools.formatTime = (value, type) => {
	var dataTime = "";
	var data = new Date();
	data.setTime(value);
	var year = data.getFullYear();
	var month_temp = data.getMonth() + 1;
	var month = month_temp < 10 ? '0' + month_temp : month_temp;
	var day = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
	var hour = data.getHours() < 10 ? '0' + data.getHours() : data.getHours();
	var minute = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes();
	var second = data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds();
	if (type == "YMD") {
		dataTime = year + "/" + month + "/" + day;
	} else if (type == "YMDHMS") {
		dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	} else if (type == "HMS") {
		dataTime = hour + ":" + minute + ":" + second;
	} else if (type == "YM") {
		dataTime = year + "-" + month;
	} else if (type == "HM") {
		dataTime = hour + ":" + minute;
	}
	return dataTime; //将格式化后的字符串输出到前端显示
}

tools.formatTime2 = (value) => {
		var timeValue = value.replace(/-/g, "/");
		var T_pos = timeValue.indexOf('T');
		var year_month_day = timeValue.substr(0, T_pos);
		var hour_minute_second = timeValue.substr(T_pos + 1, 8);
		var new_datetime = year_month_day + " " + hour_minute_second;
		var dateee = new Date(new_datetime).toJSON();
		var sjc = new Date(dateee).getTime();
		var chinaT = sjc + 8 * 3600 * 1000;

		var date = tools.formatTime(chinaT, 'YMDHMS');
		return date;
	},
	tools.number = (value, type) => {
		if (value == null || value == '') {
			value = 0;
		}
		//处理科学计数法
		value = value.toFixed(8);
		var arr = (value + "").split(".");
		var a1 = arr[0];
		var a2 = 0;
		if (arr.length > 1) {
			a2 = arr[1];
			if (a2.length > type) {
				a2 = a2.substring(0, type);
			}
		}
		value = Number(a1 + "." + a2);
		return Number(value).toFixed(type)
	}

// 暂未开放
tools.noOpen = () => {
	uni.showToast({
		title: '敬请期待',
		icon: "none",
		mask: true,
		duration: 1000,
		position: 'bottom'
	})
}
export default tools
